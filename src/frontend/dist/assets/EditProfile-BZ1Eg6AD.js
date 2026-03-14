import { r as reactExports, j as jsxRuntimeExports, a as cn, u as useRouter, g as useCallerProfile, E as ExternalBlob, f as ue } from "./index-D6tMSB7_.js";
import { B as Button } from "./button-CWUV2Zdc.js";
import { L as Label, I as Input } from "./label-DR94nvc3.js";
import { c as createContextScope } from "./index-DUU5iqYD.js";
import { P as Primitive } from "./index-n-tr9aeL.js";
import { S as Shield } from "./shield-FX3Sw5nN.js";
import { F as FileText } from "./file-text-DUM94Liv.js";
import { C as Car } from "./car-CTmXMssA.js";
import { A as ArrowLeft } from "./arrow-left-CNIWvNcq.js";
import { m as motion } from "./proxy-C48a_TBy.js";
import { C as Camera, L as LoaderCircle, U as Upload } from "./upload-BI6xibEc.js";
import { C as CircleCheckBig } from "./circle-check-big-BZcmwTrC.js";
import { C as Clock } from "./clock-C_xy2syA.js";
var PROGRESS_NAME = "Progress";
var DEFAULT_MAX = 100;
var [createProgressContext] = createContextScope(PROGRESS_NAME);
var [ProgressProvider, useProgressContext] = createProgressContext(PROGRESS_NAME);
var Progress$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeProgress,
      value: valueProp = null,
      max: maxProp,
      getValueLabel = defaultGetValueLabel,
      ...progressProps
    } = props;
    if ((maxProp || maxProp === 0) && !isValidMaxNumber(maxProp)) {
      console.error(getInvalidMaxError(`${maxProp}`, "Progress"));
    }
    const max = isValidMaxNumber(maxProp) ? maxProp : DEFAULT_MAX;
    if (valueProp !== null && !isValidValueNumber(valueProp, max)) {
      console.error(getInvalidValueError(`${valueProp}`, "Progress"));
    }
    const value = isValidValueNumber(valueProp, max) ? valueProp : null;
    const valueLabel = isNumber(value) ? getValueLabel(value, max) : void 0;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressProvider, { scope: __scopeProgress, value, max, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "aria-valuemax": max,
        "aria-valuemin": 0,
        "aria-valuenow": isNumber(value) ? value : void 0,
        "aria-valuetext": valueLabel,
        role: "progressbar",
        "data-state": getProgressState(value, max),
        "data-value": value ?? void 0,
        "data-max": max,
        ...progressProps,
        ref: forwardedRef
      }
    ) });
  }
);
Progress$1.displayName = PROGRESS_NAME;
var INDICATOR_NAME = "ProgressIndicator";
var ProgressIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeProgress, ...indicatorProps } = props;
    const context = useProgressContext(INDICATOR_NAME, __scopeProgress);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": getProgressState(context.value, context.max),
        "data-value": context.value ?? void 0,
        "data-max": context.max,
        ...indicatorProps,
        ref: forwardedRef
      }
    );
  }
);
ProgressIndicator.displayName = INDICATOR_NAME;
function defaultGetValueLabel(value, max) {
  return `${Math.round(value / max * 100)}%`;
}
function getProgressState(value, maxValue) {
  return value == null ? "indeterminate" : value === maxValue ? "complete" : "loading";
}
function isNumber(value) {
  return typeof value === "number";
}
function isValidMaxNumber(max) {
  return isNumber(max) && !isNaN(max) && max > 0;
}
function isValidValueNumber(value, max) {
  return isNumber(value) && !isNaN(value) && value <= max && value >= 0;
}
function getInvalidMaxError(propValue, componentName) {
  return `Invalid prop \`max\` of value \`${propValue}\` supplied to \`${componentName}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${DEFAULT_MAX}\`.`;
}
function getInvalidValueError(propValue, componentName) {
  return `Invalid prop \`value\` of value \`${propValue}\` supplied to \`${componentName}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${DEFAULT_MAX} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var Root = Progress$1;
var Indicator = ProgressIndicator;
function Progress({
  className,
  value,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "progress",
      className: cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Indicator,
        {
          "data-slot": "progress-indicator",
          className: "bg-primary h-full w-full flex-1 transition-all",
          style: { transform: `translateX(-${100 - (value || 0)}%)` }
        }
      )
    }
  );
}
const VEHICLE_TYPES = ["Bike", "Car", "Walking", "Cycle"];
const GENDERS = ["Male", "Female", "Other"];
const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal"
];
const INITIAL_DOCS = [
  { label: "ID Proof (Aadhaar/PAN)", icon: Shield, status: "pending" },
  { label: "Driving License", icon: FileText, status: "pending" },
  { label: "Vehicle RC", icon: Car, status: "pending" },
  { label: "Insurance Certificate", icon: FileText, status: "pending" }
];
function EditProfile() {
  const router = useRouter();
  const { data: profile } = useCallerProfile();
  const [name, setName] = reactExports.useState((profile == null ? void 0 : profile.name) ?? "");
  const [gender, setGender] = reactExports.useState("Male");
  const [vehicleType, setVehicleType] = reactExports.useState("Bike");
  const [houseNo, setHouseNo] = reactExports.useState("");
  const [street, setStreet] = reactExports.useState("");
  const [city, setCity] = reactExports.useState("");
  const [district, setDistrict] = reactExports.useState("");
  const [state, setState] = reactExports.useState("");
  const [photoUrl, setPhotoUrl] = reactExports.useState(null);
  const [docs, setDocs] = reactExports.useState(INITIAL_DOCS);
  const photoRef = reactExports.useRef(null);
  const fileRefs = reactExports.useRef([]);
  const needsDocs = vehicleType === "Bike" || vehicleType === "Car";
  const handlePhotoChange = (e) => {
    var _a;
    const f = (_a = e.target.files) == null ? void 0 : _a[0];
    if (f) {
      const url = URL.createObjectURL(f);
      setPhotoUrl(url);
    }
  };
  const handleDocUpload = async (idx, file) => {
    setDocs(
      (prev) => prev.map(
        (d, i) => i === idx ? { ...d, status: "uploading", progress: 0 } : d
      )
    );
    const bytes = new Uint8Array(await file.arrayBuffer());
    const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
      setDocs(
        (prev) => prev.map((d, i) => i === idx ? { ...d, progress: pct } : d)
      );
    });
    blob.getDirectURL();
    setDocs(
      (prev) => prev.map(
        (d, i) => i === idx ? { ...d, status: "uploaded", progress: 100 } : d
      )
    );
    ue.success(`${docs[idx].label} uploaded!`);
  };
  const handleSave = () => {
    ue.success("Profile updated successfully!");
    router.navigate({ to: "/profile" });
  };
  const initials = (name || (profile == null ? void 0 : profile.name) || "DP").split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-dvh bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "px-4 pt-12 pb-4 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "icon",
          "data-ocid": "editprofile.secondary_button",
          onClick: () => router.navigate({ to: "/profile" }),
          className: "w-9 h-9 rounded-xl",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 18 })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-display font-bold", children: "Edit Profile" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-24 space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          className: "bg-card border border-border rounded-2xl p-5 flex flex-col items-center gap-3",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 rounded-full overflow-hidden bg-primary flex items-center justify-center text-primary-foreground text-2xl font-display font-bold shadow-lg", children: photoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: photoUrl,
                alt: "Profile",
                className: "w-full h-full object-cover"
              }
            ) : initials }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                ref: photoRef,
                type: "file",
                accept: "image/*",
                className: "hidden",
                onChange: handlePhotoChange
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                "data-ocid": "editprofile.upload_button",
                onClick: () => {
                  var _a;
                  return (_a = photoRef.current) == null ? void 0 : _a.click();
                },
                className: "flex items-center gap-2 border-primary text-primary hover:bg-primary/10",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { size: 14 }),
                  " Change Photo"
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
          transition: { delay: 0.05 },
          className: "bg-card border border-border rounded-2xl p-5 space-y-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold", children: "Personal Information" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Full Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  "data-ocid": "editprofile.input",
                  value: name,
                  onChange: (e) => setName(e.target.value),
                  placeholder: "Enter your full name",
                  className: "bg-muted border-border"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Gender" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: GENDERS.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "editprofile.radio",
                  onClick: () => setGender(g),
                  className: `flex-1 py-2 px-3 rounded-xl border text-sm font-medium transition-colors ${gender === g ? "border-primary bg-primary/20 text-primary" : "border-border bg-muted text-muted-foreground"}`,
                  children: g
                },
                g
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Vehicle Type" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-2", children: VEHICLE_TYPES.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "editprofile.radio",
                  onClick: () => setVehicleType(v),
                  className: `py-2 px-2 rounded-xl border text-xs font-medium transition-colors ${vehicleType === v ? "border-primary bg-primary/20 text-primary" : "border-border bg-muted text-muted-foreground"}`,
                  children: v
                },
                v
              )) })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.1 },
          className: "bg-card border border-border rounded-2xl p-5 space-y-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold", children: "Address" }),
            [
              {
                label: "House / Door Number",
                val: houseNo,
                set: setHouseNo,
                ph: "e.g. 42B"
              },
              {
                label: "Street / Road Name",
                val: street,
                set: setStreet,
                ph: "e.g. MG Road"
              },
              { label: "City", val: city, set: setCity, ph: "e.g. Mumbai" },
              {
                label: "District",
                val: district,
                set: setDistrict,
                ph: "e.g. Mumbai Suburban"
              }
            ].map((field) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: field.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  "data-ocid": "editprofile.input",
                  value: field.val,
                  onChange: (e) => field.set(e.target.value),
                  placeholder: field.ph,
                  className: "bg-muted border-border"
                }
              )
            ] }, field.label)),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "State" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  "data-ocid": "editprofile.select",
                  value: state,
                  onChange: (e) => setState(e.target.value),
                  className: "w-full h-10 px-3 rounded-xl bg-muted border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select State" }),
                    INDIAN_STATES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: s }, s))
                  ]
                }
              )
            ] })
          ]
        }
      ),
      needsDocs && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.15 },
          className: "bg-card border border-border rounded-2xl p-5 space-y-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold", children: "Documents" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "Required for ",
              vehicleType,
              " riders"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: docs.map((doc, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": `editprofile.item.${idx + 1}`,
                className: "flex items-center gap-3 p-3 bg-muted rounded-xl",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 bg-card rounded-lg flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(doc.icon, { size: 16, className: "text-muted-foreground" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium truncate", children: doc.label }),
                    doc.status === "uploading" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: doc.progress, className: "h-1" }) }),
                    doc.status === "uploaded" && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-green-400 flex items-center gap-1 mt-0.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 10 }),
                      " Uploaded"
                    ] }),
                    doc.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1 mt-0.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 10 }),
                      " Not uploaded"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      ref: (el) => {
                        fileRefs.current[idx] = el;
                      },
                      type: "file",
                      accept: "image/*,.pdf",
                      className: "hidden",
                      onChange: (e) => {
                        var _a;
                        const f = (_a = e.target.files) == null ? void 0 : _a[0];
                        if (f) handleDocUpload(idx, f);
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      variant: doc.status === "uploaded" ? "outline" : "default",
                      "data-ocid": `editprofile.upload_button.${idx + 1}`,
                      disabled: doc.status === "uploading",
                      onClick: () => {
                        var _a;
                        return (_a = fileRefs.current[idx]) == null ? void 0 : _a.click();
                      },
                      className: `text-xs px-3 flex-shrink-0 ${doc.status === "uploaded" ? "border-green-500/40 text-green-400 hover:bg-green-500/10" : "bg-primary text-primary-foreground"}`,
                      children: doc.status === "uploading" ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 12, className: "animate-spin" }) : doc.status === "uploaded" ? "Re-upload" : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { size: 12, className: "mr-1" }),
                        "Upload"
                      ] })
                    }
                  )
                ]
              },
              doc.label
            )) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-0 left-0 right-0 px-4 pb-8 pt-4 bg-background border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        "data-ocid": "editprofile.save_button",
        onClick: handleSave,
        className: "w-full bg-primary text-primary-foreground font-bold h-12 rounded-2xl max-w-[430px] mx-auto block",
        children: "Save Changes"
      }
    ) })
  ] });
}
export {
  EditProfile as default
};
