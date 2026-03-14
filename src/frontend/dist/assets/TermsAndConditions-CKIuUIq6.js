import { c as createLucideIcon, u as useRouter, j as jsxRuntimeExports } from "./index-D6tMSB7_.js";
import { B as Button } from "./button-CWUV2Zdc.js";
import { S as Separator } from "./separator-B1pW7Y9t.js";
import { A as ArrowLeft } from "./arrow-left-CNIWvNcq.js";
import { F as FileText } from "./file-text-DUM94Liv.js";
import { m as motion } from "./proxy-C48a_TBy.js";
import "./index-n-tr9aeL.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 7v14", key: "1akyts" }],
  [
    "path",
    {
      d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
      key: "ruj8y"
    }
  ]
];
const BookOpen = createLucideIcon("book-open", __iconNode);
const TERMS_SECTIONS = [
  {
    number: "01",
    title: "Acceptance of Terms",
    content: "By registering as a delivery partner on the Shopport platform, you agree to be bound by these Terms & Conditions. These terms constitute a legally binding agreement between you and Shopport. If you do not agree to these terms, you may not register or continue using the platform. Shopport reserves the right to update these terms at any time with reasonable notice."
  },
  {
    number: "02",
    title: "Eligibility Requirements",
    content: "You must be at least 18 years of age to register as a delivery partner. You must possess a valid government-issued identity document (Aadhaar Card mandatory). If operating a motorized vehicle (Bike/Car), you must hold a valid driving license, vehicle registration certificate (RC), and valid insurance. Walking and cycle partners are exempt from vehicle document requirements."
  },
  {
    number: "03",
    title: "Delivery Responsibilities",
    content: "As a delivery partner, you are responsible for timely pickup and delivery of all assigned orders. You must handle all packages with care to prevent damage or loss. You are expected to maintain professional conduct with customers, shop owners, and Shopport staff. You must follow the assigned delivery route and update order status accurately at each stage (Accepted → Picked Up → Out for Delivery → Delivered)."
  },
  {
    number: "04",
    title: "Earnings & Payment Policy",
    content: "Base delivery earnings are ₹5 for the first kilometer, with incremental rates for additional distance. Multi-shop orders attract an additional ₹2 per extra shop. Rain and night-time deliveries attract higher per-km rates (₹8/km for rain; ₹10/km for night, 11 PM–5 AM). Earnings are calculated automatically and paid out weekly. Deductions may apply for order cancellations (₹25 per cancellation) or verified complaints. COD amounts collected must be fully deposited and reconciled."
  },
  {
    number: "05",
    title: "Code of Conduct",
    content: "All delivery partners must maintain respectful and professional behavior at all times. Harassment, verbal abuse, or inappropriate conduct toward customers, shopkeepers, or other partners is strictly prohibited and may result in immediate account suspension. You must follow all applicable traffic laws, speed limits, and road safety regulations. Shopport has a zero-tolerance policy for reckless driving or endangering public safety."
  },
  {
    number: "06",
    title: "Safety Guidelines",
    content: "Delivery partners are personally responsible for their own safety during deliveries. If you operate a Bike or Car, wearing a helmet and seatbelt respectively is mandatory. You must follow all applicable health guidelines, especially during adverse weather or health emergencies. Shopport strongly recommends that all partners enroll in government-approved personal accident insurance schemes (e.g., PMSBY – Pradhan Mantri Suraksha Bima Yojana). Do not undertake deliveries when medically unfit."
  },
  {
    number: "07",
    title: "Privacy & Data Usage",
    content: "Shopport collects and processes your personal data, including name, contact details, Aadhaar information, and real-time GPS location data, to facilitate the delivery service. Location tracking is active during your working hours and active deliveries. Your data will not be sold to third parties. By accepting these terms, you consent to the collection, storage, and use of your data as described in the Shopport Privacy Policy. You may request deletion of your data upon account termination."
  },
  {
    number: "08",
    title: "Insurance Coverage",
    content: "Shopport strongly encourages all delivery partners to apply for the Pradhan Mantri Suraksha Bima Yojana (PMSBY), a government-backed personal accident insurance scheme offering coverage of up to ₹2 lakh for accidental death and permanent disability at a nominal annual premium. Shopport does not currently provide employer-provided insurance; partners are independent contractors. The in-app insurance application feature is currently coming soon and will be made available in a future update."
  },
  {
    number: "09",
    title: "Account Suspension & Termination",
    content: "Shopport reserves the right to suspend or permanently terminate a delivery partner's account for violations of these terms, including but not limited to: fraudulent activity, repeated order cancellations without valid reason, verified customer complaints, submission of false documents, or breach of code of conduct. Partners who believe their account was suspended in error may appeal by contacting Shopport support within 14 days. Shopport will review appeals and communicate the outcome within 7 business days."
  },
  {
    number: "10",
    title: "Dispute Resolution",
    content: "In the event of a dispute regarding earnings, order assignment, customer complaints, or account suspension, partners should first contact Shopport Support through the Help & Support section of the app. If unresolved, the matter may be escalated to the Shopport Grievance Officer. Shopport aims to resolve all disputes within 5–7 business days. For unresolved disputes, parties agree to seek resolution through binding arbitration under Indian law. These terms are governed by the laws of India."
  }
];
function TermsAndConditions() {
  const router = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-dvh bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "px-4 pt-12 pb-4 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "icon",
          "data-ocid": "terms.secondary_button",
          onClick: () => router.navigate({ to: "/profile" }),
          className: "w-9 h-9 rounded-xl",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 18 })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Legal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-display font-bold", children: "Terms & Conditions" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 bg-amber-500/10 rounded-xl flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 18, className: "text-amber-400" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        className: "mx-4 mb-5",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-br from-green-500/10 to-amber-500/10 border border-green-500/20 rounded-2xl p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { size: 22, className: "text-green-400" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-base", children: "Shopport Delivery Partner Agreement" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Last updated: January 2025" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: "Please read these terms carefully before using the Shopport Delivery Partner platform. By continuing to use our services, you agree to be bound by these terms." })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "terms.panel", className: "px-4 pb-8 space-y-4", children: [
      TERMS_SECTIONS.map((section, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: idx * 0.03 },
          className: "bg-card border border-border rounded-2xl p-5",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-display font-bold text-green-400", children: section.number }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-sm mb-2", children: section.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: section.content })
            ] })
          ] })
        },
        section.number
      )),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted rounded-2xl p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-center leading-relaxed", children: [
        "By continuing to use Shopport as a delivery partner, you acknowledge that you have read, understood, and agreed to these Terms & Conditions. For questions, contact",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-medium", children: "support@shopport.in" })
      ] }) }),
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
    ] })
  ] });
}
export {
  TermsAndConditions as default
};
