import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "@tanstack/react-router";
import {
  Banknote,
  ChevronRight,
  Clock,
  Coffee,
  CreditCard,
  MapPin,
  MessageSquare,
  Navigation2,
  Package,
  Pause,
  RotateCcw,
  Star,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { OrderStatus, Variant_cod_online } from "../backend";
import type { OrderData } from "../backend";
import FeedbackModal from "../components/FeedbackModal";
import LiveMap from "../components/LiveMap";
import {
  useAvailableOrders,
  useCallerProfile,
  useUpdateOrderStatus,
} from "../hooks/useQueries";

const MOCK_ORDERS: (OrderData & {
  pickupAddress: string;
  deliveryAddress: string;
  distance: string;
  payout: number;
  paymentType: Variant_cod_online;
  estimatedTime: string;
  shopName: string;
})[] = [
  {
    id: "ord_001",
    status: OrderStatus.accepted,
    createdAt: BigInt(Date.now()),
    orderType: "standard",
    partnerId: "",
    updatedAt: BigInt(Date.now()),
    charges: 0,
    pickupAddress: "Warehouse 4, Sector 18, Noida",
    deliveryAddress: "B-47, Vasant Kunj, New Delhi",
    distance: "12.3 km",
    payout: 85,
    paymentType: Variant_cod_online.cod,
    estimatedTime: "35 min",
    shopName: "Fresh Mart",
  },
  {
    id: "ord_002",
    status: OrderStatus.accepted,
    createdAt: BigInt(Date.now()),
    orderType: "express",
    partnerId: "",
    updatedAt: BigInt(Date.now()),
    charges: 0,
    pickupAddress: "Store #12, Lajpat Nagar Market",
    deliveryAddress: "C-22, Greater Kailash Part 2",
    distance: "6.8 km",
    payout: 65,
    paymentType: Variant_cod_online.online,
    estimatedTime: "20 min",
    shopName: "Quick Shop",
  },
  {
    id: "ord_003",
    status: OrderStatus.accepted,
    createdAt: BigInt(Date.now()),
    orderType: "standard",
    partnerId: "",
    updatedAt: BigInt(Date.now()),
    charges: 0,
    pickupAddress: "HUB-3, Dwarka Sector 10",
    deliveryAddress: "A-103, Uttam Nagar West",
    distance: "3.2 km",
    payout: 45,
    paymentType: Variant_cod_online.online,
    estimatedTime: "12 min",
    shopName: "Daily Needs",
  },
  {
    id: "ord_004",
    status: OrderStatus.accepted,
    createdAt: BigInt(Date.now()),
    orderType: "express",
    partnerId: "",
    updatedAt: BigInt(Date.now()),
    charges: 0,
    pickupAddress: "Depot 7, Rohini Sector 5",
    deliveryAddress: "Plot 88, Pitampura North",
    distance: "4.1 km",
    payout: 55,
    paymentType: Variant_cod_online.cod,
    estimatedTime: "15 min",
    shopName: "Super Store",
  },
];

const CUSTOMER_RATINGS = [
  { label: "Today", value: 4.8, icon: "⭐", sub: "7 deliveries" },
  { label: "This Month", value: 4.7, icon: "⭐", sub: "142 deliveries" },
  { label: "This Year", value: 4.6, icon: "⭐", sub: "1,204 deliveries" },
  { label: "All Time Best", value: 5.0, icon: "🌟", sub: "Best rating" },
];

const BREAK_OPTIONS = [
  {
    label: "Tea Break",
    minutes: 10,
    icon: Coffee,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    label: "Lunch Break",
    minutes: 30,
    icon: UtensilsCrossed,
    color: "text-green-400",
    bg: "bg-green-500/10",
  },
  {
    label: "Short Break",
    minutes: 15,
    icon: Pause,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
];

function getIST() {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const ist = new Date(utc + 5.5 * 3600000);
  return ist.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}

function useISTTime() {
  const [time, setTime] = useState(getIST);
  useEffect(() => {
    const id = setInterval(() => setTime(getIST()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

type OrderType = (typeof MOCK_ORDERS)[0];

export default function Dashboard() {
  const router = useRouter();
  const { data: profile } = useCallerProfile();
  const { data: apiOrders, isLoading } = useAvailableOrders();
  const { mutateAsync: updateStatus } = useUpdateOrderStatus();
  const [isOnline, setIsOnline] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);
  const [accepting, setAccepting] = useState<string | null>(null);
  const [detailOrder, setDetailOrder] = useState<OrderType | null>(null);
  const [rejectedIds, setRejectedIds] = useState<Set<string>>(new Set());
  const [breakSheetOpen, setBreakSheetOpen] = useState(false);
  const [activeBreak, setActiveBreak] = useState<{
    label: string;
    endsAt: number;
  } | null>(null);
  const [breakRemaining, setBreakRemaining] = useState(0);
  const [liveAddress, setLiveAddress] = useState<string | null>(null);
  const [radiusKm, setRadiusKm] = useState(5);
  const [showReturnOrder, setShowReturnOrder] = useState(false);

  // Dynamic radius: scale so 10km = ~85% of container width
  const radiusCircleSize = `${Math.min(85, Math.max(15, (radiusKm / 10) * 85))}%`;
  const istTime = useISTTime();

  // Break countdown
  useEffect(() => {
    if (!activeBreak) return;
    const tick = () => {
      const rem = Math.max(
        0,
        Math.ceil((activeBreak.endsAt - Date.now()) / 1000),
      );
      setBreakRemaining(rem);
      if (rem === 0) setActiveBreak(null);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [activeBreak]);

  const startBreak = (minutes: number, label: string) => {
    setActiveBreak({ label, endsAt: Date.now() + minutes * 60 * 1000 });
    setBreakSheetOpen(false);
    toast.success(`${label} started!`);
  };

  const endBreak = () => {
    setActiveBreak(null);
    toast.success("Break ended. Back to work!");
  };

  const formatBreakTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const firstName = profile?.name?.split(" ")[0] ?? "Partner";
  const rawOrders =
    apiOrders && apiOrders.length > 0
      ? apiOrders.map((o) => ({
          ...o,
          pickupAddress: "Warehouse, Sector 18",
          deliveryAddress: "Customer Address",
          distance: "8.0 km",
          payout: Math.max(40, o.charges),
          paymentType: Variant_cod_online.online,
          estimatedTime: "25 min",
          shopName: "Local Store",
        }))
      : MOCK_ORDERS;

  const orders = rawOrders.filter((o) => !rejectedIds.has(o.id));

  const handleAccept = async (order: OrderType) => {
    setDetailOrder(null);
    setAccepting(order.id);
    try {
      await updateStatus({ orderId: order.id, status: OrderStatus.accepted });
    } catch {
      // proceed anyway
    }
    toast.success("Order accepted!");
    router.navigate({ to: "/order/$id", params: { id: order.id } });
    setAccepting(null);
  };

  const handleReject = (order: OrderType) => {
    setDetailOrder(null);
    setRejectedIds((prev) => new Set([...prev, order.id]));
    toast.success("Order rejected");
  };

  return (
    <div className="min-h-dvh bg-background pb-36">
      <header className="px-4 pt-12 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-sm">Good morning,</p>
            <h1 className="text-2xl font-display font-bold text-foreground">
              {firstName} 👋
            </h1>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="text-xs font-mono text-primary font-semibold">
              {istTime} IST
            </div>
            <div className="flex items-center gap-2 bg-card border border-border rounded-full px-3 py-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  isOnline ? "bg-green-400" : "bg-muted-foreground"
                }`}
              />
              <span className="text-xs font-medium">
                {isOnline ? "Online" : "Offline"}
              </span>
              <Switch
                data-ocid="dashboard.toggle"
                checked={isOnline}
                onCheckedChange={setIsOnline}
                className="scale-75"
              />
            </div>
          </div>
        </div>
        {/* Take a Break button in header */}
        <div className="flex items-center gap-2 mt-3">
          <button
            type="button"
            data-ocid="dashboard.secondary_button"
            onClick={() => setBreakSheetOpen(true)}
            className="flex items-center gap-1.5 bg-amber-500/15 border border-amber-500/40 text-amber-400 text-xs font-semibold px-3 py-2 rounded-xl hover:bg-amber-500/25 transition-colors"
          >
            <Coffee size={14} />☕ Take a Break
          </button>
          <button
            type="button"
            data-ocid="dashboard.open_modal_button"
            onClick={() => setShowFeedback(true)}
            className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors px-2 py-2"
          >
            <MessageSquare size={14} />
            Feedback
          </button>
        </div>
      </header>

      {/* Active Break Banner */}
      {activeBreak && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-4 mb-4"
        >
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
                <Coffee size={18} className="text-amber-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-amber-300">
                  {activeBreak.label}
                </p>
                <p className="text-xs text-amber-400/70">
                  Resumes in {formatBreakTime(breakRemaining)}
                </p>
              </div>
            </div>
            <Button
              size="sm"
              data-ocid="dashboard.secondary_button"
              onClick={endBreak}
              className="bg-amber-500 text-white font-semibold h-8 text-xs rounded-xl px-3"
            >
              End Break
            </Button>
          </div>
        </motion.div>
      )}

      {/* Live Location Map */}
      <div className="px-4 mb-2">
        {/* KM Radius Input */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs text-muted-foreground font-medium flex-shrink-0">
            Delivery radius:
          </span>
          <div className="flex items-center gap-1.5 flex-1">
            <input
              type="number"
              data-ocid="dashboard.input"
              min={1}
              max={50}
              value={radiusKm}
              onChange={(e) => {
                const v = Number(e.target.value);
                if (v >= 1 && v <= 50) setRadiusKm(v);
              }}
              onKeyDown={(e) =>
                e.key === "Enter" &&
                (e.currentTarget as HTMLInputElement).blur()
              }
              className="w-16 text-center text-sm font-bold bg-card border border-primary rounded-lg px-2 py-1 text-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <span className="text-xs text-primary font-bold">KM</span>
          </div>
          <div className="flex gap-1">
            {[1, 3, 5, 10].map((km) => (
              <button
                key={km}
                type="button"
                data-ocid="dashboard.toggle"
                onClick={() => setRadiusKm(km)}
                className={`text-xs font-bold px-2 py-0.5 rounded-full border transition-colors ${
                  radiusKm === km
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-muted/60 text-muted-foreground border-border hover:border-primary/50"
                }`}
              >
                {km}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <MapPin size={14} className="text-primary" />
          <p className="text-sm font-bold font-display">My Live Location</p>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="ml-auto text-xs font-bold bg-primary/15 text-primary px-2 py-0.5 rounded-full border border-primary/30">
            {orders.length} orders nearby
          </span>
        </div>

        <div className="relative">
          <LiveMap
            height="200px"
            showOpenInMaps={true}
            hidePermissionOverlay={true}
            onAddressChange={setLiveAddress}
          />
          {/* Dynamic KM radius circle overlay */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center rounded-2xl overflow-hidden">
            <div
              style={{
                width: radiusCircleSize,
                paddingTop: radiusCircleSize,
                position: "relative",
                borderRadius: "50%",
                border: "2px solid rgba(34,197,94,0.55)",
                background: "rgba(34,197,94,0.07)",
                transition: "width 0.4s ease, padding-top 0.4s ease",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  bottom: "-20px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontSize: "10px",
                  color: "rgba(34,197,94,0.9)",
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                  background: "rgba(0,0,0,0.5)",
                  padding: "1px 6px",
                  borderRadius: "4px",
                }}
              >
                {radiusKm} KM Radius
              </span>
            </div>
          </div>
        </div>

        {/* GPS Icon Button below map */}
        <div className="flex justify-center -mt-5 mb-1 relative z-10">
          <button
            type="button"
            data-ocid="dashboard.map_marker"
            onClick={() => {
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                  () => {},
                  () => {},
                  { enableHighAccuracy: true },
                );
              }
            }}
            title="Detect my live location"
            className="w-12 h-12 rounded-full bg-primary shadow-lg flex items-center justify-center hover:bg-primary/90 active:scale-95 transition-all border-4 border-background"
          >
            <Navigation2 size={20} className="text-primary-foreground" />
          </button>
        </div>

        {/* Location details card below map */}
        {
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2"
          >
            {liveAddress ? (
              <div
                className="bg-green-500/10 border border-green-500/30 rounded-xl px-3 py-2.5 flex items-center justify-between gap-2"
                data-ocid="dashboard.success_state"
              >
                <div className="flex items-start gap-2 flex-1 min-w-0">
                  <span className="text-base leading-none mt-0.5 flex-shrink-0">
                    📍
                  </span>
                  <p className="text-xs text-green-300 font-medium truncate">
                    {liveAddress}
                  </p>
                </div>
                <button
                  type="button"
                  data-ocid="dashboard.confirm_button"
                  className="flex-shrink-0 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                >
                  <span>✓</span> Confirm
                </button>
              </div>
            ) : (
              <div
                className="bg-muted/60 border border-border rounded-xl px-3 py-2.5 flex items-center gap-2"
                data-ocid="dashboard.loading_state"
              >
                <div className="w-3 h-3 border border-primary border-t-transparent rounded-full animate-spin flex-shrink-0" />
                <p className="text-xs text-muted-foreground">
                  Detecting your location...
                </p>
              </div>
            )}
          </motion.div>
        }
      </div>

      {/* Today's Performance */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mx-4 mb-4 mt-3"
      >
        <div className="bg-primary rounded-2xl p-5 shadow-lg">
          <p className="text-primary-foreground/70 text-sm font-medium mb-3">
            Today's Performance
          </p>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-primary-foreground text-2xl font-display font-bold">
                7
              </p>
              <p className="text-primary-foreground/70 text-xs">Deliveries</p>
            </div>
            <div>
              <p className="text-primary-foreground text-2xl font-display font-bold">
                ₹490
              </p>
              <p className="text-primary-foreground/70 text-xs">Earned</p>
            </div>
            <div className="flex items-center gap-1">
              <Star size={14} className="text-yellow-300 fill-yellow-300" />
              <div>
                <p className="text-primary-foreground text-2xl font-display font-bold">
                  4.8
                </p>
                <p className="text-primary-foreground/70 text-xs">Rating</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Customer Ratings Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mx-4 mb-5"
      >
        <div className="bg-card border border-border rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Star size={15} className="text-yellow-400 fill-yellow-400" />
            <h2 className="font-display font-bold text-sm">Customer Ratings</h2>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {CUSTOMER_RATINGS.map((r) => (
              <div key={r.label} className="bg-muted rounded-xl p-3">
                <p className="text-[10px] text-muted-foreground mb-1">
                  {r.label}
                </p>
                <div className="flex items-center gap-1">
                  <span className="text-sm">{r.icon}</span>
                  <span
                    className={`text-lg font-display font-bold ${
                      r.value === 5.0 ? "text-green-400" : "text-yellow-400"
                    }`}
                  >
                    {r.value}
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  {r.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Available Orders */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-display font-bold">Available Orders</h2>
          <Badge
            variant="outline"
            className="text-xs border-primary text-primary"
          >
            {orders.length} nearby
          </Badge>
        </div>

        {isLoading ? (
          <div className="space-y-3" data-ocid="dashboard.loading_state">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-32 w-full rounded-xl" />
            ))}
          </div>
        ) : !isOnline ? (
          <div
            data-ocid="dashboard.empty_state"
            className="flex flex-col items-center py-16 text-center"
          >
            <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mb-4">
              <Package size={28} className="text-muted-foreground" />
            </div>
            <p className="font-display font-bold text-lg">You're Offline</p>
            <p className="text-muted-foreground text-sm mt-1">
              Go online to see available orders
            </p>
          </div>
        ) : orders.length === 0 ? (
          <div
            data-ocid="dashboard.empty_state"
            className="flex flex-col items-center py-16 text-center"
          >
            <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mb-4">
              <Package size={28} className="text-muted-foreground" />
            </div>
            <p className="font-display font-bold text-lg">No orders nearby</p>
            <p className="text-muted-foreground text-sm mt-1">
              New orders will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-3 pb-4">
            {orders.map((order, idx) => (
              <motion.div
                key={order.id}
                data-ocid={`dashboard.item.${idx + 1}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.05 }}
                className="bg-card border border-border rounded-2xl p-4 shadow-sm cursor-pointer"
                onClick={() => setDetailOrder(order)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Package size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        {order.shopName}
                      </p>
                      <p className="text-sm font-bold font-display">
                        {order.id.toUpperCase()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      className={`text-xs ${
                        order.paymentType === Variant_cod_online.cod
                          ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                          : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                      }`}
                      variant="outline"
                    >
                      {order.paymentType === Variant_cod_online.cod ? (
                        <>
                          <Banknote size={10} className="mr-1" />
                          COD
                        </>
                      ) : (
                        <>
                          <CreditCard size={10} className="mr-1" />
                          Online
                        </>
                      )}
                    </Badge>
                    <span className="text-primary font-bold font-display">
                      ₹{order.payout}
                    </span>
                  </div>
                </div>
                <div className="space-y-1.5 mb-3">
                  <div className="flex items-start gap-2 text-xs">
                    <div className="w-4 h-4 mt-0.5 flex-shrink-0 flex items-center justify-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                    </div>
                    <span className="text-muted-foreground">
                      {order.pickupAddress}
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-xs">
                    <MapPin
                      size={14}
                      className="text-primary flex-shrink-0 mt-0.5"
                    />
                    <span className="text-muted-foreground">
                      {order.deliveryAddress}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock size={12} />
                    {order.distance} · {order.estimatedTime}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      data-ocid={`dashboard.item.${idx + 1}.delete_button`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReject(order);
                      }}
                      className="border-destructive/50 text-destructive hover:bg-destructive/10 h-8 text-xs rounded-xl px-3"
                    >
                      <X size={12} className="mr-1" /> Reject
                    </Button>
                    <Button
                      size="sm"
                      data-ocid={`dashboard.item.${idx + 1}.primary_button`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAccept(order);
                      }}
                      disabled={accepting === order.id}
                      className="bg-primary text-primary-foreground font-semibold px-4 h-8 text-xs rounded-xl"
                    >
                      {accepting === order.id ? "Accepting..." : "Accept"}
                      <ChevronRight size={14} />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Return Order Section */}
      <div className="mx-4 mb-4">
        <button
          type="button"
          data-ocid="dashboard.return_order_button"
          onClick={() => setShowReturnOrder(!showReturnOrder)}
          className="w-full flex items-center justify-between bg-card border border-border rounded-2xl p-4 hover:bg-muted/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-amber-500/10 rounded-xl flex items-center justify-center">
              <RotateCcw size={16} className="text-amber-400" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold">Return Order</p>
              <p className="text-xs text-muted-foreground">
                Mark a delivery as returned
              </p>
            </div>
          </div>
          <ChevronRight
            size={16}
            className={`text-muted-foreground transition-transform ${showReturnOrder ? "rotate-90" : ""}`}
          />
        </button>
        {showReturnOrder && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 bg-card border border-border rounded-2xl p-4 space-y-3"
          >
            <p className="text-xs text-muted-foreground">
              Select the order to return:
            </p>
            {MOCK_ORDERS.slice(0, 2).map((o) => (
              <div
                key={o.id}
                className="flex items-center justify-between bg-muted rounded-xl p-3"
              >
                <div>
                  <p className="text-sm font-semibold">{o.id.toUpperCase()}</p>
                  <p className="text-xs text-muted-foreground">
                    {o.shopName} · {o.distance}
                  </p>
                </div>
                <Button
                  size="sm"
                  data-ocid={`dashboard.return.${o.id}.button`}
                  onClick={() => {
                    toast.success(
                      `Order ${o.id.toUpperCase()} marked as returned`,
                    );
                    setShowReturnOrder(false);
                  }}
                  className="bg-amber-500 hover:bg-amber-600 text-white text-xs h-8 rounded-xl px-3"
                >
                  <RotateCcw size={12} className="mr-1" />
                  Return
                </Button>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Feedback link */}
      <div className="px-4 pb-6 pt-2 flex justify-center">
        <button
          type="button"
          data-ocid="dashboard.secondary_button"
          onClick={() => setShowFeedback(true)}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          <MessageSquare size={12} />
          Give Feedback
        </button>
      </div>

      {/* Break Time Sheet */}
      <Sheet open={breakSheetOpen} onOpenChange={setBreakSheetOpen}>
        <SheetContent
          side="bottom"
          data-ocid="dashboard.sheet"
          className="bg-card border-border rounded-t-3xl pb-8"
        >
          <SheetHeader className="mb-5">
            <SheetTitle className="font-display flex items-center gap-2">
              <Coffee size={18} className="text-amber-400" />
              Take a Break
            </SheetTitle>
          </SheetHeader>
          <div className="space-y-3">
            {BREAK_OPTIONS.map((opt) => {
              const Icon = opt.icon;
              return (
                <button
                  key={opt.label}
                  type="button"
                  data-ocid={`dashboard.item.${opt.label.replace(" ", "_").toLowerCase()}.button`}
                  onClick={() => startBreak(opt.minutes, opt.label)}
                  className="w-full flex items-center justify-between bg-muted rounded-2xl p-4 hover:bg-muted/80 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 ${opt.bg} rounded-xl flex items-center justify-center`}
                    >
                      <Icon size={18} className={opt.color} />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-sm">{opt.label}</p>
                      <p className="text-xs text-muted-foreground">
                        {opt.minutes} minutes
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-muted-foreground" />
                </button>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>

      {/* Order Detail Sheet */}
      <Sheet
        open={!!detailOrder}
        onOpenChange={(o) => !o && setDetailOrder(null)}
      >
        <SheetContent
          side="bottom"
          data-ocid="dashboard.sheet"
          className="bg-card border-border rounded-t-3xl pb-8"
        >
          {detailOrder && (
            <>
              <SheetHeader className="mb-4">
                <SheetTitle className="font-display flex items-center gap-2">
                  <Package size={18} className="text-primary" />
                  Order {detailOrder.id.toUpperCase()}
                </SheetTitle>
              </SheetHeader>
              <div className="space-y-3 mb-5">
                <div className="flex items-start gap-3 bg-muted rounded-xl p-3">
                  <div className="w-7 h-7 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2.5 h-2.5 bg-green-400 rounded-full" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Pickup From</p>
                    <p className="text-sm font-semibold">
                      {detailOrder.pickupAddress}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {detailOrder.shopName}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-muted rounded-xl p-3">
                  <MapPin
                    size={18}
                    className="text-primary flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <p className="text-xs text-muted-foreground">Deliver To</p>
                    <p className="text-sm font-semibold">
                      {detailOrder.deliveryAddress}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-muted rounded-xl p-3 text-center">
                    <p className="text-xs text-muted-foreground mb-1">
                      Distance
                    </p>
                    <p className="font-bold text-sm">{detailOrder.distance}</p>
                  </div>
                  <div className="bg-muted rounded-xl p-3 text-center">
                    <p className="text-xs text-muted-foreground mb-1">
                      Est. Time
                    </p>
                    <p className="font-bold text-sm">
                      {detailOrder.estimatedTime}
                    </p>
                  </div>
                  <div className="bg-muted rounded-xl p-3 text-center">
                    <p className="text-xs text-muted-foreground mb-1">Payout</p>
                    <p className="font-bold text-sm text-primary">
                      ₹{detailOrder.payout}
                    </p>
                  </div>
                </div>
                <div className="bg-muted rounded-xl p-3 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Payment Type
                  </span>
                  <Badge
                    variant="outline"
                    className={
                      detailOrder.paymentType === Variant_cod_online.cod
                        ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                        : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                    }
                  >
                    {detailOrder.paymentType === Variant_cod_online.cod
                      ? "Cash on Delivery"
                      : "Online Payment"}
                  </Badge>
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  data-ocid="dashboard.cancel_button"
                  onClick={() => handleReject(detailOrder)}
                  className="flex-1 border-destructive text-destructive hover:bg-destructive/10 font-semibold h-12 rounded-2xl"
                >
                  <X size={16} className="mr-2" /> Reject
                </Button>
                <Button
                  data-ocid="dashboard.confirm_button"
                  onClick={() => handleAccept(detailOrder)}
                  disabled={accepting === detailOrder.id}
                  className="flex-1 bg-primary text-primary-foreground font-bold h-12 rounded-2xl"
                >
                  {accepting === detailOrder.id
                    ? "Accepting..."
                    : "Accept Order"}
                  <ChevronRight size={16} />
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <FeedbackModal
        open={showFeedback}
        onClose={() => setShowFeedback(false)}
        screenName="Dashboard"
      />
    </div>
  );
}
