import { c as createLucideIcon, r as reactExports, u as useRouter, f as useCallerProfile, d as useInternetIdentity, j as jsxRuntimeExports, U as User } from "./index-CKfxK87D.js";
import { B as Badge } from "./badge-DE2SuZtv.js";
import { m as motion, M as MessageSquare, B as Button, l as FeedbackModal } from "./FeedbackModal-CgQPc10J.js";
import { S as Separator } from "./separator-Bieflhhj.js";
import { g as getUserProfile, C as Car } from "./userStore-D5hkDQ9p.js";
import { S as Star } from "./star-C2J9E_4K.js";
import { M as MapPin } from "./map-pin-B0Yh0AFJ.js";
import { F as FileText } from "./file-text-CPvH6OV0.js";
import { C as ChevronRight } from "./chevron-right-CaQhUWVo.js";
import { G as Globe } from "./globe-F-Nw-VCI.js";
import { C as CircleHelp } from "./circle-help-xrzfctt6.js";
import { S as Shield } from "./shield-CJm7xR2y.js";
import "./index-DgQ28NPZ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
];
const LogOut = createLucideIcon("log-out", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
];
const Pen = createLucideIcon("pen", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
      key: "1qme2f"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Settings = createLucideIcon("settings", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
const RATING_PERIODS = [
  { label: "Today", value: 4.8, deliveries: 7, color: "text-yellow-400" },
  {
    label: "This Month",
    value: 4.7,
    deliveries: 142,
    color: "text-yellow-400"
  },
  {
    label: "This Year",
    value: 4.6,
    deliveries: 1204,
    color: "text-yellow-400"
  },
  {
    label: "All Time Best",
    value: 5,
    deliveries: 2850,
    color: "text-green-400"
  }
];
function Profile() {
  const [showFeedback, setShowFeedback] = reactExports.useState(false);
  const router = useRouter();
  const { data: profile } = useCallerProfile();
  const { clear } = useInternetIdentity();
  const storedProfile = getUserProfile();
  const name = storedProfile.name ?? (profile == null ? void 0 : profile.name) ?? "Delivery Partner";
  const partnerId = (profile == null ? void 0 : profile.partnerId) ?? "SP-001";
  const storedVehicle = storedProfile.vehicleType ?? "Bike";
  const storedVehicleNumber = storedProfile.vehicleNumber;
  const storedFuelType = storedProfile.fuelType;
  const initials = name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  const avgRating = 4.8;
  const handleLogout = () => {
    clear();
    window.location.href = "/auth";
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-dvh bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "px-4 pt-12 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold", children: "Profile" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 space-y-4 pb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          className: "bg-card border border-border rounded-2xl p-5",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
              storedProfile.profilePhoto ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: storedProfile.profilePhoto,
                  alt: "Profile",
                  className: "w-16 h-16 rounded-2xl object-cover flex-shrink-0 shadow-lg border-2 border-primary/30"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground text-xl font-display font-bold flex-shrink-0 shadow-lg", children: initials }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-display font-bold", children: name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "outline",
                      className: "text-xs border-green-500/40 text-green-400",
                      children: "Active"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-yellow-400", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 12, className: "fill-yellow-400" }),
                    avgRating
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-4 bg-border" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 16, className: "text-muted-foreground flex-shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Partner ID:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-foreground", children: partnerId })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { size: 16, className: "text-muted-foreground flex-shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Vehicle:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground capitalize", children: storedVehicle }),
                storedFuelType && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Badge,
                  {
                    variant: "outline",
                    className: "text-xs border-primary/40 text-primary ml-1",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 10, className: "mr-1" }),
                      storedFuelType
                    ]
                  }
                )
              ] }),
              storedVehicleNumber && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Car,
                  {
                    size: 16,
                    className: "text-muted-foreground flex-shrink-0 opacity-0"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Reg. No:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-foreground tracking-wider", children: storedVehicleNumber })
              ] })
            ] })
          ]
        }
      ),
      (storedProfile.phone || storedProfile.address || storedProfile.aadhaarDoc || storedProfile.drivingLicenseDoc || storedProfile.rcDoc) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.03 },
          className: "bg-card border border-border rounded-2xl p-5 space-y-3",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-sm", children: "My Details" }),
            storedProfile.phone && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                User,
                {
                  size: 15,
                  className: "text-muted-foreground flex-shrink-0"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Phone:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: storedProfile.phone })
            ] }),
            storedProfile.address && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                MapPin,
                {
                  size: 15,
                  className: "text-muted-foreground flex-shrink-0 mt-0.5"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground flex-shrink-0", children: "Address:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground text-xs leading-relaxed", children: storedProfile.address })
            ] }),
            (storedProfile.aadhaarDoc || storedProfile.drivingLicenseDoc || storedProfile.rcDoc) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 pt-1 border-t border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-semibold uppercase tracking-wide", children: "Documents" }),
              storedProfile.aadhaarDoc && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 13, className: "text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "Aadhaar:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground truncate", children: storedProfile.aadhaarDoc })
              ] }),
              storedProfile.drivingLicenseDoc && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 13, className: "text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "Driving License:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground truncate", children: storedProfile.drivingLicenseDoc })
              ] }),
              storedProfile.rcDoc && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 13, className: "text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "RC / Insurance:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground truncate", children: storedProfile.rcDoc })
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.04 },
          className: "bg-card border border-border rounded-2xl p-5",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 16, className: "text-yellow-400 fill-yellow-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold", children: "Customer Ratings" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: RATING_PERIODS.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "bg-muted rounded-xl p-3 flex flex-col gap-1",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: r.label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 14, className: `${r.color} fill-current` }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xl font-display font-bold ${r.color}`, children: r.value })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground", children: [
                    r.deliveries,
                    " deliveries"
                  ] })
                ]
              },
              r.label
            )) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.06 },
          className: "bg-card border border-border rounded-2xl overflow-hidden",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "data-ocid": "profile.edit_button",
                onClick: () => router.navigate({ to: "/profile/edit" }),
                className: "w-full flex items-center gap-4 px-4 py-4 hover:bg-muted/50 transition-colors",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { size: 18, className: "text-primary" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-left", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: "Edit Profile" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Update your personal details & documents" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16, className: "text-muted-foreground" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border mx-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "data-ocid": "profile.settings_button",
                onClick: () => router.navigate({ to: "/profile/edit" }),
                className: "w-full flex items-center gap-4 px-4 py-4 hover:bg-muted/50 transition-colors",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 bg-muted rounded-xl flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { size: 18, className: "text-muted-foreground" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-left", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: "Settings" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Vehicle, fuel type & app preferences" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16, className: "text-muted-foreground" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border mx-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "data-ocid": "profile.secondary_button",
                onClick: () => router.navigate({ to: "/profile/language" }),
                className: "w-full flex items-center gap-4 px-4 py-4 hover:bg-muted/50 transition-colors",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { size: 18, className: "text-blue-400" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-left", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: "Language" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Select your preferred language" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16, className: "text-muted-foreground" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border mx-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "data-ocid": "profile.secondary_button",
                onClick: () => router.navigate({ to: "/profile/help" }),
                className: "w-full flex items-center gap-4 px-4 py-4 hover:bg-muted/50 transition-colors",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleHelp, { size: 18, className: "text-emerald-400" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-left", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: "Help & Support" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Contact us for assistance" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16, className: "text-muted-foreground" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border mx-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "data-ocid": "profile.secondary_button",
                onClick: () => setShowFeedback(true),
                className: "w-full flex items-center gap-4 px-4 py-4 hover:bg-muted/50 transition-colors",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { size: 18, className: "text-purple-400" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-left", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: "Feedback" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Share your experience with us" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16, className: "text-muted-foreground" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border mx-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "data-ocid": "profile.secondary_button",
                onClick: () => router.navigate({ to: "/profile/terms" }),
                className: "w-full flex items-center gap-4 px-4 py-4 hover:bg-muted/50 transition-colors",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 18, className: "text-amber-400" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-left", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: "Terms & Conditions" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Read our delivery partner agreement" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16, className: "text-muted-foreground" })
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.08 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => router.navigate({ to: "/insurance" }),
              className: "w-full bg-card border border-border rounded-2xl p-4 flex items-center gap-4 hover:border-primary/40 transition-colors",
              "data-ocid": "profile.card",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 20, className: "text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-left", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm", children: "Insurance" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-amber-500/20 text-amber-400 border-amber-500/30 text-xs border px-2 py-0", children: "Coming Soon" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "View details & apply for coverage" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ChevronRight,
                  {
                    size: 16,
                    className: "text-muted-foreground flex-shrink-0"
                  }
                )
              ]
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          "data-ocid": "profile.delete_button",
          variant: "outline",
          onClick: handleLogout,
          className: "w-full border-destructive text-destructive hover:bg-destructive/10 font-semibold h-12 rounded-2xl",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { size: 16, className: "mr-2" }),
            " Sign Out"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-muted-foreground text-xs pb-2", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Built with love using",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`,
            className: "text-primary hover:underline",
            target: "_blank",
            rel: "noreferrer",
            children: "caffeine.ai"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FeedbackModal,
      {
        open: showFeedback,
        onClose: () => setShowFeedback(false),
        screenName: "Profile"
      }
    )
  ] });
}
export {
  Profile as default
};
