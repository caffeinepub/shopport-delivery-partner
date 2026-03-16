import { c as createLucideIcon, j as jsxRuntimeExports, a as cn, u as useRouter, f as useCallerProfile, h as useAvailableOrders, i as useUpdateOrderStatus, r as reactExports, V as Variant_cod_online, O as OrderStatus, g as ue } from "./index-CwnI3Qka.js";
import { B as Badge } from "./badge-Bcq3t94K.js";
import { n as Root, o as Content, p as Close, X, T as Title, q as Portal, O as Overlay, M as MessageSquare, m as motion, B as Button, l as FeedbackModal } from "./FeedbackModal-B7BHAAbR.js";
import { S as Switch, a as Skeleton } from "./switch-CiEILTCM.js";
import { M as MapPin, L as LiveMap } from "./LiveMap-DgumFYHG.js";
import { N as Navigation2 } from "./navigation-2-DWNz_1n5.js";
import { S as Star } from "./star-C9tjSI3M.js";
import { P as Package } from "./package-DFVoNZ1l.js";
import { B as Banknote, C as CreditCard } from "./credit-card-CblypM_D.js";
import { C as Clock } from "./clock-SOSSDgP7.js";
import { C as ChevronRight } from "./chevron-right-CTdaWqm6.js";
import "./index-B0T50Ky9.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M10 2v2", key: "7u0qdc" }],
  ["path", { d: "M14 2v2", key: "6buw04" }],
  [
    "path",
    {
      d: "M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1",
      key: "pwadti"
    }
  ],
  ["path", { d: "M6 2v2", key: "colzsn" }]
];
const Coffee = createLucideIcon("coffee", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { x: "14", y: "4", width: "4", height: "16", rx: "1", key: "zuxfzm" }],
  ["rect", { x: "6", y: "4", width: "4", height: "16", rx: "1", key: "1okwgv" }]
];
const Pause = createLucideIcon("pause", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8", key: "n7qcjb" }],
  [
    "path",
    { d: "M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7", key: "d0u48b" }
  ],
  ["path", { d: "m2.1 21.8 6.4-6.3", key: "yn04lh" }],
  ["path", { d: "m19 5-7 7", key: "194lzd" }]
];
const UtensilsCrossed = createLucideIcon("utensils-crossed", __iconNode);
function Sheet({ ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { "data-slot": "sheet", ...props });
}
function SheetPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { "data-slot": "sheet-portal", ...props });
}
function SheetOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay,
    {
      "data-slot": "sheet-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function SheetContent({
  className,
  children,
  side = "right",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetPortal, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SheetOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Content,
      {
        "data-slot": "sheet-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          side === "right" && "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          side === "left" && "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          side === "top" && "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          side === "bottom" && "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          className
        ),
        ...props,
        children: [
          children,
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      }
    )
  ] });
}
function SheetHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "sheet-header",
      className: cn("flex flex-col gap-1.5 p-4", className),
      ...props
    }
  );
}
function SheetTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title,
    {
      "data-slot": "sheet-title",
      className: cn("text-foreground font-semibold", className),
      ...props
    }
  );
}
const MOCK_ORDERS = [
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
    shopName: "Fresh Mart"
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
    shopName: "Quick Shop"
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
    shopName: "Daily Needs"
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
    shopName: "Super Store"
  }
];
const CUSTOMER_RATINGS = [
  { label: "Today", value: 4.8, icon: "⭐", sub: "7 deliveries" },
  { label: "This Month", value: 4.7, icon: "⭐", sub: "142 deliveries" },
  { label: "This Year", value: 4.6, icon: "⭐", sub: "1,204 deliveries" },
  { label: "All Time Best", value: 5, icon: "🌟", sub: "Best rating" }
];
const BREAK_OPTIONS = [
  {
    label: "Tea Break",
    minutes: 10,
    icon: Coffee,
    color: "text-amber-400",
    bg: "bg-amber-500/10"
  },
  {
    label: "Lunch Break",
    minutes: 30,
    icon: UtensilsCrossed,
    color: "text-green-400",
    bg: "bg-green-500/10"
  },
  {
    label: "Short Break",
    minutes: 15,
    icon: Pause,
    color: "text-blue-400",
    bg: "bg-blue-500/10"
  }
];
function getIST() {
  const now = /* @__PURE__ */ new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 6e4;
  const ist = new Date(utc + 5.5 * 36e5);
  return ist.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
}
function useISTTime() {
  const [time, setTime] = reactExports.useState(getIST);
  reactExports.useEffect(() => {
    const id = setInterval(() => setTime(getIST()), 1e3);
    return () => clearInterval(id);
  }, []);
  return time;
}
function Dashboard() {
  var _a;
  const router = useRouter();
  const { data: profile } = useCallerProfile();
  const { data: apiOrders, isLoading } = useAvailableOrders();
  const { mutateAsync: updateStatus } = useUpdateOrderStatus();
  const [isOnline, setIsOnline] = reactExports.useState(true);
  const [showFeedback, setShowFeedback] = reactExports.useState(false);
  const [accepting, setAccepting] = reactExports.useState(null);
  const [detailOrder, setDetailOrder] = reactExports.useState(null);
  const [rejectedIds, setRejectedIds] = reactExports.useState(/* @__PURE__ */ new Set());
  const [breakSheetOpen, setBreakSheetOpen] = reactExports.useState(false);
  const [activeBreak, setActiveBreak] = reactExports.useState(null);
  const [breakRemaining, setBreakRemaining] = reactExports.useState(0);
  const [liveAddress, setLiveAddress] = reactExports.useState(null);
  const [radiusKm, setRadiusKm] = reactExports.useState(5);
  const RADIUS_OPTIONS = [1, 2, 3, 5, 10];
  const radiusToWidth = {
    1: "30%",
    2: "45%",
    3: "55%",
    5: "72%",
    10: "90%"
  };
  const istTime = useISTTime();
  reactExports.useEffect(() => {
    if (!activeBreak) return;
    const tick = () => {
      const rem = Math.max(
        0,
        Math.ceil((activeBreak.endsAt - Date.now()) / 1e3)
      );
      setBreakRemaining(rem);
      if (rem === 0) setActiveBreak(null);
    };
    tick();
    const id = setInterval(tick, 1e3);
    return () => clearInterval(id);
  }, [activeBreak]);
  const startBreak = (minutes, label) => {
    setActiveBreak({ label, endsAt: Date.now() + minutes * 60 * 1e3 });
    setBreakSheetOpen(false);
    ue.success(`${label} started!`);
  };
  const endBreak = () => {
    setActiveBreak(null);
    ue.success("Break ended. Back to work!");
  };
  const formatBreakTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };
  const firstName = ((_a = profile == null ? void 0 : profile.name) == null ? void 0 : _a.split(" ")[0]) ?? "Partner";
  const rawOrders = apiOrders && apiOrders.length > 0 ? apiOrders.map((o) => ({
    ...o,
    pickupAddress: "Warehouse, Sector 18",
    deliveryAddress: "Customer Address",
    distance: "8.0 km",
    payout: Math.max(40, o.charges),
    paymentType: Variant_cod_online.online,
    estimatedTime: "25 min",
    shopName: "Local Store"
  })) : MOCK_ORDERS;
  const orders = rawOrders.filter((o) => !rejectedIds.has(o.id));
  const handleAccept = async (order) => {
    setDetailOrder(null);
    setAccepting(order.id);
    try {
      await updateStatus({ orderId: order.id, status: OrderStatus.accepted });
    } catch {
    }
    ue.success("Order accepted!");
    router.navigate({ to: "/order/$id", params: { id: order.id } });
    setAccepting(null);
  };
  const handleReject = (order) => {
    setDetailOrder(null);
    setRejectedIds((prev) => /* @__PURE__ */ new Set([...prev, order.id]));
    ue.success("Order rejected");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-dvh bg-background pb-36", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "px-4 pt-12 pb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Good morning," }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-display font-bold text-foreground", children: [
            firstName,
            " 👋"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-mono text-primary font-semibold", children: [
            istTime,
            " IST"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-card border border-border rounded-full px-3 py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `w-2 h-2 rounded-full ${isOnline ? "bg-green-400" : "bg-muted-foreground"}`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium", children: isOnline ? "Online" : "Offline" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Switch,
              {
                "data-ocid": "dashboard.toggle",
                checked: isOnline,
                onCheckedChange: setIsOnline,
                className: "scale-75"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            "data-ocid": "dashboard.secondary_button",
            onClick: () => setBreakSheetOpen(true),
            className: "flex items-center gap-1.5 bg-amber-500/15 border border-amber-500/40 text-amber-400 text-xs font-semibold px-3 py-2 rounded-xl hover:bg-amber-500/25 transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Coffee, { size: 14 }),
              "☕ Take a Break"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            "data-ocid": "dashboard.open_modal_button",
            onClick: () => setShowFeedback(true),
            className: "ml-auto flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors px-2 py-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { size: 14 }),
              "Feedback"
            ]
          }
        )
      ] })
    ] }),
    activeBreak && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0 },
        className: "mx-4 mb-4",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Coffee, { size: 18, className: "text-amber-400" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-amber-300", children: activeBreak.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-amber-400/70", children: [
                "Resumes in ",
                formatBreakTime(breakRemaining)
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              "data-ocid": "dashboard.secondary_button",
              onClick: endBreak,
              className: "bg-amber-500 text-white font-semibold h-8 text-xs rounded-xl px-3",
              children: "End Break"
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium", children: "Delivery radius:" }),
        RADIUS_OPTIONS.map((km) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            "data-ocid": "dashboard.toggle",
            onClick: () => setRadiusKm(km),
            className: `text-xs font-bold px-2.5 py-1 rounded-full border transition-colors ${radiusKm === km ? "bg-primary text-primary-foreground border-primary" : "bg-muted/60 text-muted-foreground border-border hover:border-primary/50"}`,
            children: [
              km,
              " km"
            ]
          },
          km
        ))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 14, className: "text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold font-display", children: "My Live Location" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 bg-green-400 rounded-full animate-pulse" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-xs font-bold bg-primary/15 text-primary px-2 py-0.5 rounded-full border border-primary/30", children: [
          orders.length,
          " orders nearby"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          LiveMap,
          {
            height: "200px",
            showOpenInMaps: true,
            hidePermissionOverlay: true,
            onAddressChange: setLiveAddress
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 pointer-events-none flex items-center justify-center rounded-2xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              width: radiusToWidth[radiusKm],
              paddingTop: radiusToWidth[radiusKm],
              position: "relative",
              borderRadius: "50%",
              border: "2px solid rgba(34,197,94,0.55)",
              background: "rgba(34,197,94,0.07)",
              transition: "width 0.4s ease, padding-top 0.4s ease"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                style: {
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
                  borderRadius: "4px"
                },
                children: [
                  radiusKm,
                  " KM Radius"
                ]
              }
            )
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center -mt-5 mb-1 relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "data-ocid": "dashboard.map_marker",
          onClick: () => {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                () => {
                },
                () => {
                },
                { enableHighAccuracy: true }
              );
            }
          },
          title: "Detect my live location",
          className: "w-12 h-12 rounded-full bg-primary shadow-lg flex items-center justify-center hover:bg-primary/90 active:scale-95 transition-all border-4 border-background",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation2, { size: 20, className: "text-primary-foreground" })
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 6 },
          animate: { opacity: 1, y: 0 },
          className: "mt-2",
          children: liveAddress ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-green-500/10 border border-green-500/30 rounded-xl px-3 py-2.5 flex items-center justify-between gap-2",
              "data-ocid": "dashboard.success_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base leading-none mt-0.5 flex-shrink-0", children: "📍" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-green-300 font-medium truncate", children: liveAddress })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "dashboard.confirm_button",
                    className: "flex-shrink-0 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "✓" }),
                      " Confirm"
                    ]
                  }
                )
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-muted/60 border border-border rounded-xl px-3 py-2.5 flex items-center gap-2",
              "data-ocid": "dashboard.loading_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 border border-primary border-t-transparent rounded-full animate-spin flex-shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Detecting your location..." })
              ]
            }
          )
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.1 },
        className: "mx-4 mb-4 mt-3",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary rounded-2xl p-5 shadow-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/70 text-sm font-medium mb-3", children: "Today's Performance" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground text-2xl font-display font-bold", children: "7" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/70 text-xs", children: "Deliveries" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground text-2xl font-display font-bold", children: "₹490" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/70 text-xs", children: "Earned" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 14, className: "text-yellow-300 fill-yellow-300" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground text-2xl font-display font-bold", children: "4.8" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/70 text-xs", children: "Rating" })
              ] })
            ] })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.15 },
        className: "mx-4 mb-5",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 15, className: "text-yellow-400 fill-yellow-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-sm", children: "Customer Ratings" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: CUSTOMER_RATINGS.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted rounded-xl p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mb-1", children: r.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: r.icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-lg font-display font-bold ${r.value === 5 ? "text-green-400" : "text-yellow-400"}`,
                  children: r.value
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: r.sub })
          ] }, r.label)) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-display font-bold", children: "Available Orders" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Badge,
          {
            variant: "outline",
            className: "text-xs border-primary text-primary",
            children: [
              orders.length,
              " nearby"
            ]
          }
        )
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "dashboard.loading_state", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 w-full rounded-xl" }, i)) }) : !isOnline ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "dashboard.empty_state",
          className: "flex flex-col items-center py-16 text-center",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 28, className: "text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-lg", children: "You're Offline" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Go online to see available orders" })
          ]
        }
      ) : orders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "dashboard.empty_state",
          className: "flex flex-col items-center py-16 text-center",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 28, className: "text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-lg", children: "No orders nearby" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "New orders will appear here" })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 pb-4", children: orders.map((order, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          "data-ocid": `dashboard.item.${idx + 1}`,
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.1 + idx * 0.05 },
          className: "bg-card border border-border rounded-2xl p-4 shadow-sm cursor-pointer",
          onClick: () => setDetailOrder(order),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 16, className: "text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: order.shopName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold font-display", children: order.id.toUpperCase() })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    className: `text-xs ${order.paymentType === Variant_cod_online.cod ? "bg-amber-500/20 text-amber-400 border-amber-500/30" : "bg-blue-500/20 text-blue-400 border-blue-500/30"}`,
                    variant: "outline",
                    children: order.paymentType === Variant_cod_online.cod ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Banknote, { size: 10, className: "mr-1" }),
                      "COD"
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { size: 10, className: "mr-1" }),
                      "Online"
                    ] })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary font-bold font-display", children: [
                  "₹",
                  order.payout
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 mt-0.5 flex-shrink-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 bg-green-400 rounded-full" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: order.pickupAddress })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  MapPin,
                  {
                    size: 14,
                    className: "text-primary flex-shrink-0 mt-0.5"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: order.deliveryAddress })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 12 }),
                order.distance,
                " · ",
                order.estimatedTime
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    "data-ocid": `dashboard.item.${idx + 1}.delete_button`,
                    onClick: (e) => {
                      e.stopPropagation();
                      handleReject(order);
                    },
                    className: "border-destructive/50 text-destructive hover:bg-destructive/10 h-8 text-xs rounded-xl px-3",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 12, className: "mr-1" }),
                      " Reject"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    "data-ocid": `dashboard.item.${idx + 1}.primary_button`,
                    onClick: (e) => {
                      e.stopPropagation();
                      handleAccept(order);
                    },
                    disabled: accepting === order.id,
                    className: "bg-primary text-primary-foreground font-semibold px-4 h-8 text-xs rounded-xl",
                    children: [
                      accepting === order.id ? "Accepting..." : "Accept",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 14 })
                    ]
                  }
                )
              ] })
            ] })
          ]
        },
        order.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-6 pt-2 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        "data-ocid": "dashboard.secondary_button",
        onClick: () => setShowFeedback(true),
        className: "flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { size: 12 }),
          "Give Feedback"
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open: breakSheetOpen, onOpenChange: setBreakSheetOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      SheetContent,
      {
        side: "bottom",
        "data-ocid": "dashboard.sheet",
        className: "bg-card border-border rounded-t-3xl pb-8",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SheetHeader, { className: "mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetTitle, { className: "font-display flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Coffee, { size: 18, className: "text-amber-400" }),
            "Take a Break"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: BREAK_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "data-ocid": `dashboard.item.${opt.label.replace(" ", "_").toLowerCase()}.button`,
                onClick: () => startBreak(opt.minutes, opt.label),
                className: "w-full flex items-center justify-between bg-muted rounded-2xl p-4 hover:bg-muted/80 transition-colors",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: `w-10 h-10 ${opt.bg} rounded-xl flex items-center justify-center`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 18, className: opt.color })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm", children: opt.label }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                        opt.minutes,
                        " minutes"
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16, className: "text-muted-foreground" })
                ]
              },
              opt.label
            );
          }) })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Sheet,
      {
        open: !!detailOrder,
        onOpenChange: (o) => !o && setDetailOrder(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          SheetContent,
          {
            side: "bottom",
            "data-ocid": "dashboard.sheet",
            className: "bg-card border-border rounded-t-3xl pb-8",
            children: detailOrder && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SheetHeader, { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetTitle, { className: "font-display flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 18, className: "text-primary" }),
                "Order ",
                detailOrder.id.toUpperCase()
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 mb-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 bg-muted rounded-xl p-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2.5 h-2.5 bg-green-400 rounded-full" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Pickup From" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: detailOrder.pickupAddress }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: detailOrder.shopName })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 bg-muted rounded-xl p-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    MapPin,
                    {
                      size: 18,
                      className: "text-primary flex-shrink-0 mt-0.5"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Deliver To" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: detailOrder.deliveryAddress })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted rounded-xl p-3 text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Distance" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm", children: detailOrder.distance })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted rounded-xl p-3 text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Est. Time" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm", children: detailOrder.estimatedTime })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted rounded-xl p-3 text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Payout" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-sm text-primary", children: [
                      "₹",
                      detailOrder.payout
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted rounded-xl p-3 flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Payment Type" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "outline",
                      className: detailOrder.paymentType === Variant_cod_online.cod ? "bg-amber-500/20 text-amber-400 border-amber-500/30" : "bg-blue-500/20 text-blue-400 border-blue-500/30",
                      children: detailOrder.paymentType === Variant_cod_online.cod ? "Cash on Delivery" : "Online Payment"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "outline",
                    "data-ocid": "dashboard.cancel_button",
                    onClick: () => handleReject(detailOrder),
                    className: "flex-1 border-destructive text-destructive hover:bg-destructive/10 font-semibold h-12 rounded-2xl",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16, className: "mr-2" }),
                      " Reject"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    "data-ocid": "dashboard.confirm_button",
                    onClick: () => handleAccept(detailOrder),
                    disabled: accepting === detailOrder.id,
                    className: "flex-1 bg-primary text-primary-foreground font-bold h-12 rounded-2xl",
                    children: [
                      accepting === detailOrder.id ? "Accepting..." : "Accept Order",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16 })
                    ]
                  }
                )
              ] })
            ] })
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FeedbackModal,
      {
        open: showFeedback,
        onClose: () => setShowFeedback(false),
        screenName: "Dashboard"
      }
    )
  ] });
}
export {
  Dashboard as default
};
