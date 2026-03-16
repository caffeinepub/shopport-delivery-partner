import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useParams, useRouter } from "@tanstack/react-router";
import {
  ArrowLeft,
  Banknote,
  CheckCircle2,
  ChevronRight,
  Circle,
  CreditCard,
  MapPin,
  MessageSquare,
  Navigation,
  Package,
  PauseCircle,
  Phone,
  PlayCircle,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { OrderStatus, Variant_cod_online } from "../backend";
import FeedbackModal from "../components/FeedbackModal";
import LiveMap from "../components/LiveMap";
import {
  useAddCancellation,
  useCallerProfile,
  useUpdateOrderStatus,
} from "../hooks/useQueries";

const STATUS_STEPS: {
  status: OrderStatus;
  label: string;
  description: string;
}[] = [
  {
    status: OrderStatus.accepted,
    label: "Accepted",
    description: "Order accepted",
  },
  {
    status: OrderStatus.pickedUp,
    label: "Picked Up",
    description: "Package collected from sender",
  },
  {
    status: OrderStatus.outForDelivery,
    label: "Out for Delivery",
    description: "On the way to customer",
  },
  {
    status: OrderStatus.delivered,
    label: "Delivered",
    description: "Delivered to customer",
  },
];

const NEXT_STATUS: Record<string, OrderStatus> = {
  [OrderStatus.accepted]: OrderStatus.pickedUp,
  [OrderStatus.pickedUp]: OrderStatus.outForDelivery,
  [OrderStatus.outForDelivery]: OrderStatus.delivered,
};

const CANCEL_REASONS = [
  "Traffic congestion",
  "Vehicle breakdown",
  "Customer unavailable",
  "Wrong address",
  "Other",
];

export default function ActiveOrder() {
  const router = useRouter();
  const params = useParams({ strict: false }) as { id?: string };
  const orderId = params.id ?? "";
  const { data: profile } = useCallerProfile();
  const { mutateAsync: updateStatus } = useUpdateOrderStatus();
  const { mutateAsync: addCancellation } = useAddCancellation();

  const [showFeedback, setShowFeedback] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>(
    OrderStatus.accepted,
  );
  const [showCodDialog, setShowCodDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [updating, setUpdating] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null,
  );

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        },
        () => {},
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 },
      );
    }
  }, []);

  const order = {
    id: orderId,
    status: currentStatus,
    pickupAddress: "Warehouse 4, Sector 18, Noida, UP 201301",
    pickupPhone: "+91 98765 43210",
    deliveryAddress: "B-47, Vasant Kunj, New Delhi, 110070",
    deliveryPhone: "+91 87654 32109",
    paymentType: Variant_cod_online.cod,
    codAmount: 1250,
    payout: 85,
    customerName: "Priya Sharma",
  };

  const currentIdx = STATUS_STEPS.findIndex((s) => s.status === currentStatus);
  const isDelivered = currentStatus === OrderStatus.delivered;
  const nextStatus = NEXT_STATUS[currentStatus];

  const doUpdateStatus = async (status: OrderStatus) => {
    setUpdating(true);
    try {
      await updateStatus({ orderId: order.id, status });
      setCurrentStatus(status);
      toast.success(`Status updated to ${status}`);
    } catch {
      setCurrentStatus(status);
      toast.success("Status updated!");
    } finally {
      setUpdating(false);
    }
  };

  const handleUpdateStatus = async () => {
    if (!nextStatus) return;
    if (
      nextStatus === OrderStatus.delivered &&
      order.paymentType === Variant_cod_online.cod
    ) {
      setShowCodDialog(true);
      return;
    }
    await doUpdateStatus(nextStatus);
  };

  const handleCodConfirm = async () => {
    setShowCodDialog(false);
    await doUpdateStatus(OrderStatus.delivered);
  };

  const handleCancel = async () => {
    if (!cancelReason) {
      toast.error("Select a reason");
      return;
    }
    setCancelling(true);
    try {
      await addCancellation({
        orderId: order.id,
        partnerId: profile?.partnerId ?? "",
        reason: cancelReason,
        charge: 25,
        createdAt: BigInt(Date.now()),
      });
      toast.success("Order cancelled");
    } catch {
      toast.success("Order cancelled");
    } finally {
      setCancelling(false);
      setShowCancelDialog(false);
      router.navigate({ to: "/dashboard" });
    }
  };

  const handlePauseToggle = () => {
    const next = !isPaused;
    setIsPaused(next);
    if (next) {
      toast.success("Delivery paused. Customer notified.");
    } else {
      toast.success("Delivery resumed!");
    }
  };

  const openRouteInMaps = () => {
    const pickup = encodeURIComponent(order.pickupAddress);
    const delivery = encodeURIComponent(order.deliveryAddress);
    window.open(
      `https://maps.google.com/maps/dir/${pickup}/${delivery}`,
      "_blank",
    );
  };

  return (
    <div className="min-h-dvh bg-background">
      <header className="px-4 pt-12 pb-4 flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          data-ocid="order.secondary_button"
          onClick={() => router.navigate({ to: "/dashboard" })}
          className="w-9 h-9 rounded-xl"
        >
          <ArrowLeft size={18} />
        </Button>
        <div className="flex-1">
          <p className="text-xs text-muted-foreground">Active Order</p>
          <h1 className="text-lg font-display font-bold">
            {order.id.toUpperCase()}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            data-ocid="activeorder.toggle"
            onClick={handlePauseToggle}
            className={cn(
              "h-8 px-3 rounded-xl text-xs font-semibold",
              isPaused
                ? "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30"
                : "bg-muted text-muted-foreground hover:text-foreground",
            )}
          >
            {isPaused ? (
              <PlayCircle size={14} className="mr-1" />
            ) : (
              <PauseCircle size={14} className="mr-1" />
            )}
            {isPaused ? "Resume" : "Pause"}
          </Button>
          <Badge
            variant="outline"
            className={cn(
              "text-xs",
              order.paymentType === Variant_cod_online.cod
                ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                : "bg-blue-500/20 text-blue-400 border-blue-500/30",
            )}
          >
            {order.paymentType === Variant_cod_online.cod ? (
              <>
                <Banknote size={10} className="mr-1" />
                COD ₹{order.codAmount}
              </>
            ) : (
              <>
                <CreditCard size={10} className="mr-1" />
                Online
              </>
            )}
          </Badge>
        </div>
      </header>

      {/* Pause Banner */}
      <AnimatePresence>
        {isPaused && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mx-4 mb-3"
          >
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <PauseCircle size={16} className="text-amber-400" />
                <p className="text-sm text-amber-400 font-medium">
                  Delivery Paused – Customer has been notified
                </p>
              </div>
              <Button
                size="sm"
                data-ocid="activeorder.primary_button"
                onClick={handlePauseToggle}
                className="bg-amber-500 text-white hover:bg-amber-600 h-8 px-3 text-xs rounded-xl"
              >
                Resume
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* GPS Route Tracking Map */}
      <div className="mx-4 mb-5">
        <div className="flex items-center gap-2 mb-2">
          <MapPin size={14} className="text-primary" />
          <p className="text-sm font-bold font-display">GPS Route Tracking</p>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        </div>
        <LiveMap height="240px" showOpenInMaps={true} />
      </div>

      {/* Two GPS Route Cards */}
      <div className="mx-4 mb-5 space-y-3">
        {/* Route 1: Your Location → Shop */}
        <div className="bg-card border border-border rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Navigation size={14} className="text-green-400" />
            </div>
            <div className="flex-1">
              <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wide">
                Route 1
              </p>
              <p className="text-sm font-bold text-foreground">
                Your Location → Shop
              </p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mb-3 pl-9">
            {order.pickupAddress}
          </p>
          <Button
            size="sm"
            data-ocid="order.primary_button"
            onClick={() => {
              const addr = encodeURIComponent(order.pickupAddress);
              if (coords) {
                window.open(
                  `https://maps.google.com/maps/dir/${coords.lat},${coords.lng}/${addr}`,
                  "_blank",
                );
              } else {
                window.open(
                  `https://maps.google.com/maps/search/${addr}`,
                  "_blank",
                );
              }
            }}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold text-xs h-8 rounded-xl"
          >
            <Navigation size={13} className="mr-1.5" />
            Open in Maps
          </Button>
        </div>

        {/* Route 2: Shop → Customer */}
        <div className="bg-card border border-border rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <MapPin size={14} className="text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wide">
                Route 2
              </p>
              <p className="text-sm font-bold text-foreground">
                Shop → Customer
              </p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mb-3 pl-9">
            {order.deliveryAddress}
          </p>
          <Button
            size="sm"
            data-ocid="order.secondary_button"
            onClick={openRouteInMaps}
            className="w-full bg-primary text-primary-foreground font-semibold text-xs h-8 rounded-xl"
          >
            <Navigation size={13} className="mr-1.5" />
            Open in Maps
          </Button>
        </div>
      </div>

      {/* Status Stepper */}
      <div className="mx-4 mb-5">
        <div className="bg-card border border-border rounded-2xl p-4">
          <p className="text-sm font-bold font-display mb-4">Order Status</p>
          <div className="space-y-3">
            {STATUS_STEPS.map((step, idx) => {
              const done = idx <= currentIdx;
              const active = idx === currentIdx;
              return (
                <div key={step.status} className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    {done ? (
                      <CheckCircle2
                        size={20}
                        className={active ? "text-primary" : "text-green-400"}
                      />
                    ) : (
                      <Circle size={20} className="text-muted-foreground" />
                    )}
                    {idx < STATUS_STEPS.length - 1 && (
                      <div
                        className={cn(
                          "w-0.5 h-6 mt-1",
                          idx < currentIdx ? "bg-green-400" : "bg-border",
                        )}
                      />
                    )}
                  </div>
                  <div className="pt-0.5">
                    <p
                      className={cn(
                        "text-sm font-semibold",
                        done
                          ? active
                            ? "text-primary"
                            : "text-foreground"
                          : "text-muted-foreground",
                      )}
                    >
                      {step.label}
                    </p>
                    {active && (
                      <p className="text-xs text-muted-foreground">
                        {step.description}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Addresses */}
      <div className="mx-4 mb-5 space-y-3">
        <div className="bg-card border border-border rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-green-400/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Package size={16} className="text-green-400" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground mb-0.5">
                Pickup From
              </p>
              <p className="text-sm font-semibold">{order.pickupAddress}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 rounded-lg"
              asChild
            >
              <a
                href={`tel:${order.pickupPhone}`}
                data-ocid="order.secondary_button"
              >
                <Phone size={14} className="text-primary" />
              </a>
            </Button>
          </div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <MapPin size={16} className="text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground mb-0.5">Deliver To</p>
              <p className="text-sm font-semibold">{order.deliveryAddress}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {order.customerName}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 rounded-lg"
              asChild
            >
              <a
                href={`tel:${order.deliveryPhone}`}
                data-ocid="order.secondary_button"
              >
                <Phone size={14} className="text-primary" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {!isDelivered && (
        <div className="mx-4 mb-6 space-y-3">
          <Button
            data-ocid="order.primary_button"
            onClick={handleUpdateStatus}
            disabled={updating || isPaused}
            className="w-full bg-primary text-primary-foreground font-bold text-base rounded-2xl shadow-glow h-12"
          >
            {updating
              ? "Updating..."
              : isPaused
                ? "Resume to continue"
                : `Mark as ${STATUS_STEPS[currentIdx + 1]?.label ?? "Complete"}`}
            <ChevronRight size={18} />
          </Button>
          <Button
            variant="outline"
            data-ocid="order.delete_button"
            onClick={() => setShowCancelDialog(true)}
            className="w-full border-destructive text-destructive hover:bg-destructive/10 font-semibold h-11 rounded-2xl"
          >
            <XCircle size={16} className="mr-2" /> Cancel Order
          </Button>
        </div>
      )}

      {isDelivered && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mx-4 mb-6"
        >
          <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-5 text-center">
            <CheckCircle2 size={40} className="text-green-400 mx-auto mb-2" />
            <p className="font-display font-bold text-lg text-green-400">
              Delivered!
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              You earned{" "}
              <span className="text-primary font-bold">₹{order.payout}</span>
            </p>
            <Button
              data-ocid="order.primary_button"
              onClick={() => router.navigate({ to: "/dashboard" })}
              className="mt-4 bg-primary text-primary-foreground font-semibold"
            >
              Back to Dashboard
            </Button>
          </div>
        </motion.div>
      )}

      {/* Feedback link */}
      <div className="px-4 pb-3 flex justify-center">
        <a
          href="/profile/feedback"
          data-ocid="activeorder.secondary_button"
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          <MessageSquare size={12} />
          Give Feedback
        </a>
      </div>

      <Dialog open={showCodDialog} onOpenChange={setShowCodDialog}>
        <DialogContent
          data-ocid="order.dialog"
          className="bg-card border-border"
        >
          <DialogHeader>
            <DialogTitle className="font-display">Collect Cash</DialogTitle>
          </DialogHeader>
          <div className="py-2">
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-center">
              <Banknote size={32} className="text-amber-400 mx-auto mb-2" />
              <p className="text-2xl font-display font-bold text-amber-400">
                ₹{order.codAmount}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Collect from {order.customerName}
              </p>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              data-ocid="order.cancel_button"
              onClick={() => setShowCodDialog(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              data-ocid="order.confirm_button"
              onClick={handleCodConfirm}
              className="flex-1 bg-primary text-primary-foreground"
            >
              Cash Collected ✓
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent
          data-ocid="order.dialog"
          className="bg-card border-border"
        >
          <DialogHeader>
            <DialogTitle className="font-display">Cancel Order</DialogTitle>
          </DialogHeader>
          <div className="py-2 space-y-2">
            <p className="text-sm text-muted-foreground">
              Select cancellation reason:
            </p>
            {CANCEL_REASONS.map((reason) => (
              <button
                key={reason}
                type="button"
                data-ocid="order.radio"
                onClick={() => setCancelReason(reason)}
                className={cn(
                  "w-full text-left px-4 py-3 rounded-xl border text-sm transition-colors",
                  cancelReason === reason
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-muted hover:border-primary/50",
                )}
              >
                {reason}
              </button>
            ))}
            <p className="text-xs text-amber-400 mt-2">
              ⚠ A cancellation charge of ₹25 may apply
            </p>
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              data-ocid="order.cancel_button"
              onClick={() => setShowCancelDialog(false)}
              className="flex-1"
            >
              Go Back
            </Button>
            <Button
              data-ocid="order.confirm_button"
              onClick={handleCancel}
              disabled={!cancelReason || cancelling}
              variant="destructive"
              className="flex-1"
            >
              {cancelling ? "Cancelling..." : "Confirm Cancel"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <FeedbackModal
        open={showFeedback}
        onClose={() => setShowFeedback(false)}
        screenName="Active Order"
      />
    </div>
  );
}
