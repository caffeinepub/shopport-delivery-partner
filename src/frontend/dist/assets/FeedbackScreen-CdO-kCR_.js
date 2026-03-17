import { j as jsxRuntimeExports, a as cn, u as useRouter, r as reactExports, g as ue } from "./index-B3_d8K7p.js";
import { B as Button, M as MessageSquare, m as motion, l as FeedbackModal } from "./FeedbackModal-BEp6JX0A.js";
import { A as ArrowLeft } from "./arrow-left-eMRVGrfy.js";
import { C as CircleCheck } from "./circle-check-B0CUjM_R.js";
import { S as Star } from "./star-BgCsLRd7.js";
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}
const CATEGORIES = [
  "App Experience",
  "Order Issues",
  "Payment",
  "Earnings",
  "Other"
];
function FeedbackScreen() {
  const router = useRouter();
  const [rating, setRating] = reactExports.useState(0);
  const [showFeedback, setShowFeedback] = reactExports.useState(false);
  const [hoverRating, setHoverRating] = reactExports.useState(0);
  const [category, setCategory] = reactExports.useState("");
  const [message, setMessage] = reactExports.useState("");
  const [submitted, setSubmitted] = reactExports.useState(false);
  const handleSubmit = () => {
    if (rating === 0) {
      ue.error("Please select a star rating");
      return;
    }
    setSubmitted(true);
    ue.success("Thank you for your feedback!");
    const subject = encodeURIComponent(
      `Shopport Feedback: ${category || "General"} - ${rating} Stars`
    );
    const body = encodeURIComponent(
      `Rating: ${rating}/5 stars
Category: ${category || "Not specified"}

Message:
${message || "No message provided"}`
    );
    window.open(`mailto:shopportapp@gmail.com?subject=${subject}&body=${body}`);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-dvh bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "px-4 pt-12 pb-4 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "icon",
          "data-ocid": "feedback.secondary_button",
          onClick: () => router.history.back(),
          className: "w-9 h-9 rounded-xl",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 18 })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { size: 18, className: "text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-display font-bold", children: "Feedback" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-8 space-y-5", children: submitted ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        className: "flex flex-col items-center py-20 text-center",
        "data-ocid": "feedback.success_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 56, className: "text-orange-400 mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-bold mb-2", children: "Thank You!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6", children: "Your feedback helps us improve the app for all delivery partners." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              "data-ocid": "feedback.primary_button",
              onClick: () => router.history.back(),
              className: "bg-primary text-primary-foreground font-semibold",
              children: "Go Back"
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          className: "bg-card border border-border rounded-2xl p-5",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold mb-4 text-center", children: "How would you rate your experience?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center gap-3", children: [1, 2, 3, 4, 5].map((star) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": `feedback.toggle.${star}`,
                onClick: () => setRating(star),
                onMouseEnter: () => setHoverRating(star),
                onMouseLeave: () => setHoverRating(0),
                className: "transition-transform active:scale-90",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Star,
                  {
                    size: 36,
                    className: (hoverRating || rating) >= star ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"
                  }
                )
              },
              star
            )) }),
            rating > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground mt-2", children: rating === 1 ? "Very Poor" : rating === 2 ? "Poor" : rating === 3 ? "Average" : rating === 4 ? "Good" : "Excellent!" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.05 },
          className: "bg-card border border-border rounded-2xl p-5",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold mb-3", children: "Category" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": "feedback.toggle",
                onClick: () => setCategory(cat),
                className: `px-3 py-2 rounded-xl text-sm border transition-colors ${category === cat ? "border-primary bg-primary/20 text-primary font-semibold" : "border-border bg-muted text-muted-foreground hover:border-primary/50"}`,
                children: cat
              },
              cat
            )) })
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold mb-3", children: "Tell us more" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                "data-ocid": "feedback.textarea",
                placeholder: "Share your thoughts, suggestions, or issues...",
                value: message,
                onChange: (e) => setMessage(e.target.value),
                className: "bg-muted border-border min-h-[120px] resize-none"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          "data-ocid": "feedback.submit_button",
          onClick: handleSubmit,
          className: "w-full bg-primary text-primary-foreground font-bold h-12 rounded-2xl",
          children: "Submit Feedback"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FeedbackModal,
      {
        open: showFeedback,
        onClose: () => setShowFeedback(false),
        screenName: "Feedback"
      }
    )
  ] });
}
export {
  FeedbackScreen as default
};
