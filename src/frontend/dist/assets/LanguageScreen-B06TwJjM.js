import { u as useRouter, r as reactExports, j as jsxRuntimeExports, f as ue } from "./index-BfFIGM8q.js";
import { B as Button } from "./button-DO-wLprV.js";
import { A as ArrowLeft } from "./arrow-left-DnJb_Udw.js";
import { G as Globe } from "./globe-B0MIOF_d.js";
import { m as motion } from "./proxy-Cw8eKml-.js";
import { C as Check } from "./check-ETN4BgNZ.js";
const LANGUAGES = [
  "Hindi",
  "Bengali",
  "Telugu",
  "Marathi",
  "Tamil",
  "Urdu",
  "Gujarati",
  "Kannada",
  "Odia",
  "Malayalam",
  "Punjabi",
  "Assamese",
  "Maithili",
  "Sanskrit",
  "Konkani",
  "Sindhi",
  "Dogri",
  "Kashmiri",
  "Manipuri",
  "Bodo",
  "Santali",
  "Nepali"
];
function LanguageScreen() {
  const router = useRouter();
  const [selected, setSelected] = reactExports.useState("English");
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
          onClick: () => setSelected(lang),
          className: `flex items-center justify-between px-4 py-3 rounded-2xl border text-sm font-medium transition-colors ${selected === lang ? "border-primary bg-primary/20 text-primary" : "border-border bg-card text-foreground hover:border-primary/50"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: lang }),
            selected === lang && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 14, className: "text-primary" })
          ]
        },
        lang
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-0 left-0 right-0 px-4 pb-8 pt-4 bg-background border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        "data-ocid": "language.save_button",
        onClick: handleSave,
        className: "w-full bg-primary text-primary-foreground font-bold h-12 rounded-2xl max-w-[430px] mx-auto block",
        children: "Save Language"
      }
    ) })
  ] });
}
export {
  LanguageScreen as default
};
