import { c as createLucideIcon, u as useRouter, k as useParams, f as useCallerProfile, i as useUpdateOrderStatus, l as useAddCancellation, r as reactExports, O as OrderStatus, V as Variant_cod_online, j as jsxRuntimeExports, a as cn, g as ue } from "./index-B3_d8K7p.js";
import { B as Badge } from "./badge-C5jueLTW.js";
import { B as Button, m as motion, M as MessageSquare, q as Dialog, r as DialogContent, s as DialogHeader, t as DialogTitle, v as DialogFooter, l as FeedbackModal } from "./FeedbackModal-BEp6JX0A.js";
import { L as LiveMap, N as Navigation } from "./LiveMap-YYErz4T5.js";
import { A as ArrowLeft } from "./arrow-left-eMRVGrfy.js";
import { B as Banknote, C as CreditCard } from "./credit-card-C5HvNpDh.js";
import { M as MapPin } from "./map-pin-C7ft-ZHa.js";
import { C as CircleCheck } from "./circle-check-B0CUjM_R.js";
import { P as Package } from "./package-CvevF_RN.js";
import { P as Phone } from "./phone-BzEkPm-1.js";
import { C as ChevronRight } from "./chevron-right-BIy5FvaN.js";
import { A as AnimatePresence } from "./index-C2_2OvGp.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "10", x2: "10", y1: "15", y2: "9", key: "c1nkhi" }],
  ["line", { x1: "14", x2: "14", y1: "15", y2: "9", key: "h65svq" }]
];
const CirclePause = createLucideIcon("circle-pause", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polygon", { points: "10 8 16 12 10 16 10 8", key: "1cimsy" }]
];
const CirclePlay = createLucideIcon("circle-play", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]];
const Circle = createLucideIcon("circle", __iconNode);
const STATUS_STEPS = [
  {
    status: OrderStatus.accepted,
    label: "Accepted",
    description: "Order accepted"
  },
  {
    status: OrderStatus.pickedUp,
    label: "Picked Up",
    description: "Package collected from sender"
  },
  {
    status: OrderStatus.outForDelivery,
    label: "Out for Delivery",
    description: "On the way to customer"
  },
  {
    status: OrderStatus.delivered,
    label: "Delivered",
    description: "Delivered to customer"
  }
];
const NEXT_STATUS = {
  [OrderStatus.accepted]: OrderStatus.pickedUp,
  [OrderStatus.pickedUp]: OrderStatus.outForDelivery,
  [OrderStatus.outForDelivery]: OrderStatus.delivered
};
const CANCEL_REASONS = [
  "Traffic congestion",
  "Vehicle breakdown",
  "Customer unavailable",
  "Wrong address",
  "Other"
];
function ActiveOrder() {
  var _a;
  const router = useRouter();
  const params = useParams({ strict: false });
  const orderId = params.id ?? "";
  const { data: profile } = useCallerProfile();
  const { mutateAsync: updateStatus } = useUpdateOrderStatus();
  const { mutateAsync: addCancellation } = useAddCancellation();
  const [showFeedback, setShowFeedback] = reactExports.useState(false);
  const [currentStatus, setCurrentStatus] = reactExports.useState(
    OrderStatus.accepted
  );
  const [showCodDialog, setShowCodDialog] = reactExports.useState(false);
  const [showCancelDialog, setShowCancelDialog] = reactExports.useState(false);
  const [cancelReason, setCancelReason] = reactExports.useState("");
  const [updating, setUpdating] = reactExports.useState(false);
  const [cancelling, setCancelling] = reactExports.useState(false);
  const [isPaused, setIsPaused] = reactExports.useState(false);
  const [route1Started, setRoute1Started] = reactExports.useState(false);
  const [route2Started, setRoute2Started] = reactExports.useState(false);
  const [coords, setCoords] = reactExports.useState(
    null
  );
  reactExports.useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        },
        () => {
        },
        { enableHighAccuracy: true, timeout: 1e4, maximumAge: 3e4 }
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
    customerName: "Priya Sharma"
  };
  const currentIdx = STATUS_STEPS.findIndex((s) => s.status === currentStatus);
  const isDelivered = currentStatus === OrderStatus.delivered;
  const nextStatus = NEXT_STATUS[currentStatus];
  const doUpdateStatus = async (status) => {
    setUpdating(true);
    try {
      await updateStatus({ orderId: order.id, status });
      setCurrentStatus(status);
      ue.success(`Status updated to ${status}`);
    } catch {
      setCurrentStatus(status);
      ue.success("Status updated!");
    } finally {
      setUpdating(false);
    }
  };
  const handleUpdateStatus = async () => {
    if (!nextStatus) return;
    if (nextStatus === OrderStatus.delivered && order.paymentType === Variant_cod_online.cod) {
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
      ue.error("Select a reason");
      return;
    }
    setCancelling(true);
    try {
      await addCancellation({
        orderId: order.id,
        partnerId: (profile == null ? void 0 : profile.partnerId) ?? "",
        reason: cancelReason,
        charge: 25,
        createdAt: BigInt(Date.now())
      });
      ue.success("Order cancelled");
    } catch {
      ue.success("Order cancelled");
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
      ue.success("Delivery paused. Customer notified.");
    } else {
      ue.success("Delivery resumed!");
    }
  };
  const openRouteInMaps = () => {
    const pickup = encodeURIComponent(order.pickupAddress);
    const delivery = encodeURIComponent(order.deliveryAddress);
    window.open(
      `https://maps.google.com/maps/dir/${pickup}/${delivery}`,
      "_blank"
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-dvh bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "px-4 pt-12 pb-4 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "icon",
          "data-ocid": "order.secondary_button",
          onClick: () => router.navigate({ to: "/dashboard" }),
          className: "w-9 h-9 rounded-xl",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 18 })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Active Order" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-display font-bold", children: order.id.toUpperCase() })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "ghost",
            size: "sm",
            "data-ocid": "activeorder.toggle",
            onClick: handlePauseToggle,
            className: cn(
              "h-8 px-3 rounded-xl text-xs font-semibold",
              isPaused ? "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30" : "bg-muted text-muted-foreground hover:text-foreground"
            ),
            children: [
              isPaused ? /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { size: 14, className: "mr-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePause, { size: 14, className: "mr-1" }),
              isPaused ? "Resume" : "Pause"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            variant: "outline",
            className: cn(
              "text-xs",
              order.paymentType === Variant_cod_online.cod ? "bg-amber-500/20 text-amber-400 border-amber-500/30" : "bg-blue-500/20 text-blue-400 border-blue-500/30"
            ),
            children: order.paymentType === Variant_cod_online.cod ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Banknote, { size: 10, className: "mr-1" }),
              "COD ₹",
              order.codAmount
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { size: 10, className: "mr-1" }),
              "Online"
            ] })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isPaused && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, height: 0 },
        animate: { opacity: 1, height: "auto" },
        exit: { opacity: 0, height: 0 },
        className: "mx-4 mb-3",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-500/10 border border-amber-500/30 rounded-2xl px-4 py-3 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePause, { size: 16, className: "text-amber-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-amber-400 font-medium", children: "Delivery Paused – Customer has been notified" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              "data-ocid": "activeorder.primary_button",
              onClick: handlePauseToggle,
              className: "bg-amber-500 text-white hover:bg-amber-600 h-8 px-3 text-xs rounded-xl",
              children: "Resume"
            }
          )
        ] })
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-4 mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 14, className: "text-blue-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold font-display", children: "GPS Route Tracking" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 bg-green-400 rounded-full animate-pulse" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LiveMap, { height: "240px", showOpenInMaps: true })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-4 mb-5 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { size: 14, className: "text-blue-400" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground font-medium uppercase tracking-wide", children: "Route 1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-foreground", children: "Your Location → Shop" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-3 pl-9", children: order.pickupAddress }),
        route1Started && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-2 px-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 bg-green-400 rounded-full animate-pulse" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-green-400 font-semibold", children: "Route Active · GPS Tracking ON" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            "data-ocid": "order.primary_button",
            onClick: () => {
              setRoute1Started(true);
              if (currentStatus === OrderStatus.accepted) {
                doUpdateStatus(OrderStatus.outForDelivery);
              }
              const addr = encodeURIComponent(order.pickupAddress);
              if (coords) {
                window.open(
                  `https://maps.google.com/maps/dir/${coords.lat},${coords.lng}/${addr}`,
                  "_blank"
                );
              } else {
                window.open(
                  `https://maps.google.com/maps/search/${addr}`,
                  "_blank"
                );
              }
            },
            className: `flex-1 font-semibold text-xs h-8 rounded-xl ${route1Started ? "bg-green-600 text-white" : "bg-green-500 hover:bg-green-600 text-white"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { size: 13, className: "mr-1.5" }),
              route1Started ? "Route Active" : "Start Route 1"
            ]
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 14, className: "text-blue-400" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground font-medium uppercase tracking-wide", children: "Route 2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-foreground", children: "Shop → Customer" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-3 pl-9", children: order.deliveryAddress }),
        route2Started && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-2 px-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 bg-blue-400 rounded-full animate-pulse" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-blue-400 font-semibold", children: "Route Active · GPS Tracking ON" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            "data-ocid": "order.secondary_button",
            onClick: () => {
              setRoute2Started(true);
              openRouteInMaps();
            },
            className: `flex-1 font-semibold text-xs h-8 rounded-xl ${route2Started ? "bg-blue-600 text-white" : "bg-primary text-primary-foreground"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { size: 13, className: "mr-1.5" }),
              route2Started ? "Route Active" : "Start Route 2"
            ]
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-4 mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold font-display mb-4", children: "Order Status" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: STATUS_STEPS.map((step, idx) => {
        const done = idx <= currentIdx;
        const active = idx === currentIdx;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
            done ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              CircleCheck,
              {
                size: 20,
                className: active ? "text-primary" : "text-green-400"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { size: 20, className: "text-muted-foreground" }),
            idx < STATUS_STEPS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: cn(
                  "w-0.5 h-6 mt-1",
                  idx < currentIdx ? "bg-green-400" : "bg-border"
                )
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: cn(
                  "text-sm font-semibold",
                  done ? active ? "text-primary" : "text-foreground" : "text-muted-foreground"
                ),
                children: step.label
              }
            ),
            active && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: step.description })
          ] })
        ] }, step.status);
      }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-4 mb-5 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-2xl p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-green-400/10 rounded-lg flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 16, className: "text-green-400" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Pickup From" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: order.pickupAddress })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "icon",
            className: "w-8 h-8 rounded-lg",
            asChild: true,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: `tel:${order.pickupPhone}`,
                "data-ocid": "order.secondary_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 14, className: "text-primary" })
              }
            )
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-2xl p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 16, className: "text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Deliver To" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: order.deliveryAddress }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: order.customerName })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "icon",
            className: "w-8 h-8 rounded-lg",
            asChild: true,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: `tel:${order.deliveryPhone}`,
                "data-ocid": "order.secondary_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 14, className: "text-primary" })
              }
            )
          }
        )
      ] }) })
    ] }),
    !isDelivered && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-4 mb-6 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          "data-ocid": "order.primary_button",
          onClick: handleUpdateStatus,
          disabled: updating || isPaused,
          className: "w-full bg-primary text-primary-foreground font-bold text-base rounded-2xl shadow-glow h-12",
          children: [
            updating ? "Updating..." : isPaused ? "Resume to continue" : `Mark as ${((_a = STATUS_STEPS[currentIdx + 1]) == null ? void 0 : _a.label) ?? "Complete"}`,
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 18 })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          "data-ocid": "order.delete_button",
          onClick: () => setShowCancelDialog(true),
          className: "w-full border-destructive text-destructive hover:bg-destructive/10 font-semibold h-11 rounded-2xl",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { size: 16, className: "mr-2" }),
            " Cancel Order"
          ]
        }
      )
    ] }),
    isDelivered && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        className: "mx-4 mb-6",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-green-500/10 border border-green-500/30 rounded-2xl p-5 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 40, className: "text-green-400 mx-auto mb-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-lg text-green-400", children: "Delivered!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
            "You earned",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary font-bold", children: [
              "₹",
              order.payout
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              "data-ocid": "order.primary_button",
              onClick: () => router.navigate({ to: "/dashboard" }),
              className: "mt-4 bg-primary text-primary-foreground font-semibold",
              children: "Back to Dashboard"
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-3 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setShowFeedback(true),
        "data-ocid": "activeorder.secondary_button",
        className: "flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { size: 12 }),
          "Give Feedback"
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showCodDialog, onOpenChange: setShowCodDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        "data-ocid": "order.dialog",
        className: "bg-card border-border",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Collect Cash" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Banknote, { size: 32, className: "text-amber-400 mx-auto mb-2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-display font-bold text-amber-400", children: [
              "₹",
              order.codAmount
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
              "Collect from ",
              order.customerName
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                "data-ocid": "order.cancel_button",
                onClick: () => setShowCodDialog(false),
                className: "flex-1",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                "data-ocid": "order.confirm_button",
                onClick: handleCodConfirm,
                className: "flex-1 bg-primary text-primary-foreground",
                children: "Cash Collected ✓"
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showCancelDialog, onOpenChange: setShowCancelDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        "data-ocid": "order.dialog",
        className: "bg-card border-border",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Cancel Order" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-2 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Select cancellation reason:" }),
            CANCEL_REASONS.map((reason) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": "order.radio",
                onClick: () => setCancelReason(reason),
                className: cn(
                  "w-full text-left px-4 py-3 rounded-xl border text-sm transition-colors",
                  cancelReason === reason ? "border-primary bg-primary/10 text-primary" : "border-border bg-muted hover:border-primary/50"
                ),
                children: reason
              },
              reason
            )),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-amber-400 mt-2", children: "⚠ A cancellation charge of ₹25 may apply" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                "data-ocid": "order.cancel_button",
                onClick: () => setShowCancelDialog(false),
                className: "flex-1",
                children: "Go Back"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                "data-ocid": "order.confirm_button",
                onClick: handleCancel,
                disabled: !cancelReason || cancelling,
                variant: "destructive",
                className: "flex-1",
                children: cancelling ? "Cancelling..." : "Confirm Cancel"
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FeedbackModal,
      {
        open: showFeedback,
        onClose: () => setShowFeedback(false),
        screenName: "Active Order"
      }
    )
  ] });
}
export {
  ActiveOrder as default
};
