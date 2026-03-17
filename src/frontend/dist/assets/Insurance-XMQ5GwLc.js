import { c as createLucideIcon, r as reactExports, u as useRouter, j as jsxRuntimeExports } from "./index-B3_d8K7p.js";
import { B as Badge } from "./badge-C5jueLTW.js";
import { B as Button, m as motion, M as MessageSquare, l as FeedbackModal } from "./FeedbackModal-BEp6JX0A.js";
import { L as LiveLocationBar } from "./LiveLocationBar-D8fAafa0.js";
import { A as ArrowLeft } from "./arrow-left-eMRVGrfy.js";
import { S as Shield } from "./shield-BbjRY6ly.js";
import { S as ShieldCheck } from "./shield-check-Bk73G7K_.js";
import { R as RefreshCw } from "./refresh-cw-DzkWfctO.js";
import { C as CircleCheck } from "./circle-check-B0CUjM_R.js";
import "./map-pin-C7ft-ZHa.js";
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
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
      key: "3c2336"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const BadgeCheck = createLucideIcon("badge-check", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z", key: "1b4qmf" }],
  ["path", { d: "M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2", key: "i71pzd" }],
  ["path", { d: "M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2", key: "10jefs" }],
  ["path", { d: "M10 6h4", key: "1itunk" }],
  ["path", { d: "M10 10h4", key: "tcdvrf" }],
  ["path", { d: "M10 14h4", key: "kelpxr" }],
  ["path", { d: "M10 18h4", key: "1ulq68" }]
];
const Building2 = createLucideIcon("building-2", __iconNode$1);
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
      d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",
      key: "18etb6"
    }
  ],
  ["path", { d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4", key: "xoc0q4" }]
];
const Wallet = createLucideIcon("wallet", __iconNode);
function Insurance() {
  const [showFeedback, setShowFeedback] = reactExports.useState(false);
  const router = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "insurance.page", className: "min-h-dvh bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "px-4 pt-12 pb-4 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "icon",
          onClick: () => router.history.back(),
          className: "w-9 h-9 rounded-xl",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 18 })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold", children: "Insurance" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(LiveLocationBar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 space-y-4 pb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          className: "relative overflow-hidden bg-primary rounded-2xl p-6 shadow-glow",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute inset-0 opacity-10",
                style: {
                  backgroundImage: "radial-gradient(circle at 80% 20%, white 0%, transparent 60%)"
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 40, className: "text-primary-foreground/80 mb-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-bold text-primary-foreground", children: "Protect Yourself on the Road" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/70 text-sm mt-1", children: "Affordable government-backed insurance for delivery partners" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.1 },
          className: "bg-card border border-border rounded-2xl p-5",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { size: 18, className: "text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-primary font-semibold", children: "Government Scheme" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-base leading-tight", children: "Pradhan Mantri Suraksha Bima Yojana" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mt-0.5", children: "(PMSBY)" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-green-500/10 border border-green-500/30 rounded-xl px-3 py-1.5 ml-3 flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-green-400 font-bold text-sm", children: "₹20/yr" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-semibold uppercase tracking-wider", children: "Coverage" }),
              [
                { label: "Accidental Death Cover", amount: "₹2,00,000" },
                { label: "Permanent Disability Cover", amount: "₹2,00,000" },
                { label: "Partial Disability Cover", amount: "₹1,00,000" }
              ].map(({ label, amount }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center justify-between py-2 border-b border-border last:border-0",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        ShieldCheck,
                        {
                          size: 14,
                          className: "text-primary flex-shrink-0"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: label })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-foreground", children: amount })
                  ]
                },
                label
              ))
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted rounded-xl p-4 mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2", children: "How to Apply" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "space-y-2", children: [
                "Visit any bank branch near you",
                "Fill the PMSBY enrollment form",
                "Pay ₹20 annual premium"
              ].map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 h-5 rounded-full bg-primary/20 text-primary flex-shrink-0 flex items-center justify-center text-xs font-bold", children: i + 1 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: step })
              ] }, step)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  "data-ocid": "insurance.primary_button",
                  disabled: true,
                  className: "w-full bg-primary text-primary-foreground font-semibold h-12 opacity-60",
                  children: "Apply Now"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-amber-500 text-white border-0 text-xs font-bold px-3 py-1", children: "🚀 Coming Soon" }) })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.2 },
          className: "bg-card border border-border rounded-2xl p-5",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold mb-4", children: "Why Get Insured?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [
              {
                icon: Wallet,
                label: "Affordable",
                desc: "Only ₹20 per year – less than a cup of tea"
              },
              {
                icon: Building2,
                label: "Government Backed",
                desc: "Managed under Government of India scheme"
              },
              {
                icon: RefreshCw,
                label: "Auto-Renewal",
                desc: "Automatically renews each year from your bank"
              },
              {
                icon: CircleCheck,
                label: "Easy Claims",
                desc: "Simple claim process through your bank branch"
              }
            ].map(({ icon: Icon, label, desc }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 16, className: "text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: desc })
              ] })
            ] }, label)) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-muted-foreground text-xs pb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            "data-ocid": "insurance.open_modal_button",
            onClick: () => setShowFeedback(true),
            className: "flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors mb-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { size: 12 }),
              "Give Feedback"
            ]
          }
        ),
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
        screenName: "Insurance"
      }
    )
  ] });
}
export {
  Insurance as default
};
