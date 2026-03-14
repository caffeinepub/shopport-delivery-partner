import { c as createLucideIcon, u as useRouter, r as reactExports, j as jsxRuntimeExports } from "./index-BfFIGM8q.js";
import { B as Button } from "./button-DO-wLprV.js";
import { S as Separator } from "./separator-cVgJJOQM.js";
import { A as ArrowLeft } from "./arrow-left-DnJb_Udw.js";
import { C as CircleHelp } from "./circle-help-BBvVt3cq.js";
import { m as motion } from "./proxy-Cw8eKml-.js";
import { P as Phone } from "./phone-DkgBj4u2.js";
import { C as ChevronRight } from "./chevron-right-DAgDSjZ9.js";
import { M as MessageSquare } from "./message-square-CnrJ0oHT.js";
import { C as ChevronDown } from "./chevron-down-CLofRrvW.js";
import "./index-Fw19xUpH.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
  ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" }]
];
const Mail = createLucideIcon("mail", __iconNode);
const FAQS = [
  {
    q: "How are delivery earnings calculated?",
    a: "Base rate is ₹5 for the first km, then increases incrementally. Additional charges apply for rain (+₹3/km), night deliveries (₹10/km), multi-shop (+₹2/shop), and multi-product orders."
  },
  {
    q: "What should I do if a customer is unavailable?",
    a: "Wait at least 10 minutes and try calling the customer. If still unavailable, mark the order and contact support. A cancellation fee may apply to the customer."
  },
  {
    q: "How do I update my vehicle or documents?",
    a: "Go to Profile → Edit Profile → scroll down to the Documents section to upload or update your documents."
  },
  {
    q: "When will I receive my earnings?",
    a: "Earnings are processed and transferred to your registered bank account every Monday for the previous week's deliveries."
  },
  {
    q: "How do I report a safety incident?",
    a: "Call our 24/7 support line immediately at 1800-XXX-XXXX. For emergencies, please call 112 first."
  }
];
function HelpSupport() {
  const router = useRouter();
  const [openFaq, setOpenFaq] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-dvh bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "px-4 pt-12 pb-4 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "icon",
          "data-ocid": "help.secondary_button",
          onClick: () => router.navigate({ to: "/profile" }),
          className: "w-9 h-9 rounded-xl",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 18 })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleHelp, { size: 18, className: "text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-display font-bold", children: "Help & Support" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-8 space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          className: "bg-card border border-border rounded-2xl overflow-hidden",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-4 pt-4 pb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Contact Us" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: "tel:18001234567",
                "data-ocid": "help.link",
                className: "flex items-center gap-4 px-4 py-4 hover:bg-muted/50 transition-colors",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 18, className: "text-green-400" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: "Call Support" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "1800-123-4567 (Toll Free)" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16, className: "text-muted-foreground" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border mx-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: "mailto:support@shopport.in",
                "data-ocid": "help.link",
                className: "flex items-center gap-4 px-4 py-4 hover:bg-muted/50 transition-colors",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 18, className: "text-blue-400" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: "Email Support" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "support@shopport.in" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16, className: "text-muted-foreground" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border mx-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: "https://wa.me/918001234567",
                target: "_blank",
                rel: "noreferrer",
                "data-ocid": "help.link",
                className: "flex items-center gap-4 px-4 py-4 hover:bg-muted/50 transition-colors",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { size: 18, className: "text-emerald-400" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: "WhatsApp" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Chat with us on WhatsApp" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16, className: "text-muted-foreground" })
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.1 },
          className: "bg-card border border-border rounded-2xl overflow-hidden",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-4 pt-4 pb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Frequently Asked Questions" }),
            FAQS.map((faq, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              idx > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border mx-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  "data-ocid": `help.item.${idx + 1}`,
                  onClick: () => setOpenFaq(openFaq === idx ? null : idx),
                  className: "w-full flex items-start gap-3 px-4 py-4 text-left hover:bg-muted/50 transition-colors",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: faq.q }),
                      openFaq === idx && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.p,
                        {
                          initial: { opacity: 0, height: 0 },
                          animate: { opacity: 1, height: "auto" },
                          className: "text-xs text-muted-foreground mt-2 leading-relaxed",
                          children: faq.a
                        }
                      )
                    ] }),
                    openFaq === idx ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ChevronDown,
                      {
                        size: 16,
                        className: "text-muted-foreground flex-shrink-0 mt-0.5"
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ChevronRight,
                      {
                        size: 16,
                        className: "text-muted-foreground flex-shrink-0 mt-0.5"
                      }
                    )
                  ]
                }
              )
            ] }, faq.q))
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          "data-ocid": "help.secondary_button",
          onClick: () => router.navigate({ to: "/profile/feedback" }),
          className: "w-full flex items-center gap-4 bg-card border border-border rounded-2xl p-4 hover:border-primary/40 transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { size: 18, className: "text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-left", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: "Give Feedback" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Share your experience with us" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16, className: "text-muted-foreground" })
          ]
        }
      )
    ] })
  ] });
}
export {
  HelpSupport as default
};
