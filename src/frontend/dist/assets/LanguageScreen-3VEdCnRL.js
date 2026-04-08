import { u as useRouter, r as reactExports, j as jsxRuntimeExports, g as ue } from "./index-CKfxK87D.js";
import { B as Button, m as motion, M as MessageSquare, l as FeedbackModal } from "./FeedbackModal-CgQPc10J.js";
import { A as ArrowLeft } from "./arrow-left-D4cmFF-o.js";
import { G as Globe } from "./globe-F-Nw-VCI.js";
import { C as Check } from "./check-BbXg3b6M.js";
const LANGUAGES = [
  { native: "हिन्दी", english: "Hindi" },
  { native: "বাংলা", english: "Bengali" },
  { native: "తెలుగు", english: "Telugu" },
  { native: "मराठी", english: "Marathi" },
  { native: "தமிழ்", english: "Tamil" },
  { native: "اردو", english: "Urdu" },
  { native: "ગુજરાતી", english: "Gujarati" },
  { native: "ಕನ್ನಡ", english: "Kannada" },
  { native: "ଓଡ଼ିଆ", english: "Odia" },
  { native: "മലയാളം", english: "Malayalam" },
  { native: "ਪੰਜਾਬੀ", english: "Punjabi" },
  { native: "অসমীয়া", english: "Assamese" },
  { native: "मैथिली", english: "Maithili" },
  { native: "संस्कृतम्", english: "Sanskrit" },
  { native: "कोंकणी", english: "Konkani" },
  { native: "سنڌي", english: "Sindhi" },
  { native: "डोगरी", english: "Dogri" },
  { native: "كشميري", english: "Kashmiri" },
  { native: "মৈতৈলোন্", english: "Manipuri" },
  { native: "बड़ो", english: "Bodo" },
  { native: "ᱥᱟᱱᱛᱟᱲᱤ", english: "Santali" },
  { native: "नेपाली", english: "Nepali" }
];
function LanguageScreen() {
  const router = useRouter();
  const [selected, setSelected] = reactExports.useState("Hindi");
  const [showFeedback, setShowFeedback] = reactExports.useState(false);
  const handleSave = () => {
    ue.success(`Language set to ${selected}`);
    router.navigate({ to: "/profile" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-dvh bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "px-4 pt-12 pb-4 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "icon",
          "data-ocid": "language.secondary_button",
          onClick: () => router.navigate({ to: "/profile" }),
          className: "w-9 h-9 rounded-xl",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 18 })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { size: 18, className: "text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-display font-bold", children: "Select Language" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Choose your preferred language for the app" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: LANGUAGES.map((lang, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.button,
        {
          type: "button",
          "data-ocid": `language.item.${idx + 1}`,
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: idx * 0.02 },
          onClick: () => setSelected(lang.english),
          className: `flex flex-col items-start justify-between px-4 py-3 rounded-2xl border text-left transition-colors ${selected === lang.english ? "border-primary bg-primary/20 text-primary" : "border-border bg-card text-foreground hover:border-primary/50"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between w-full", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold leading-tight", children: lang.native }),
              selected === lang.english && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 14, className: "text-primary flex-shrink-0" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs opacity-70 mt-0.5", children: lang.english })
          ]
        },
        lang.english
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setShowFeedback(true),
        className: "flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { size: 13 }),
          "Give Feedback"
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-0 left-0 right-0 px-4 pb-8 pt-4 bg-background border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        "data-ocid": "language.save_button",
        onClick: handleSave,
        className: "w-full bg-primary text-primary-foreground font-bold h-12 rounded-2xl max-w-[430px] mx-auto block",
        children: "Save Language"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FeedbackModal,
      {
        open: showFeedback,
        onClose: () => setShowFeedback(false),
        screenName: "Language Selection"
      }
    )
  ] });
}
export {
  LanguageScreen as default
};
