import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, MessageSquare, Star } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const CATEGORIES = [
  "App Experience",
  "Order Issues",
  "Payment",
  "Earnings",
  "Other",
];

export default function FeedbackScreen() {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating === 0) {
      toast.error("Please select a star rating");
      return;
    }
    setSubmitted(true);
    toast.success("Thank you for your feedback!");
  };

  return (
    <div className="min-h-dvh bg-background">
      <header className="px-4 pt-12 pb-4 flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          data-ocid="feedback.secondary_button"
          onClick={() => router.history.back()}
          className="w-9 h-9 rounded-xl"
        >
          <ArrowLeft size={18} />
        </Button>
        <div className="flex items-center gap-2">
          <MessageSquare size={18} className="text-primary" />
          <h1 className="text-xl font-display font-bold">Feedback</h1>
        </div>
      </header>

      <div className="px-4 pb-8 space-y-5">
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center py-20 text-center"
            data-ocid="feedback.success_state"
          >
            <CheckCircle2 size={56} className="text-green-400 mb-4" />
            <h2 className="text-xl font-display font-bold mb-2">Thank You!</h2>
            <p className="text-muted-foreground text-sm mb-6">
              Your feedback helps us improve the app for all delivery partners.
            </p>
            <Button
              data-ocid="feedback.primary_button"
              onClick={() => router.history.back()}
              className="bg-primary text-primary-foreground font-semibold"
            >
              Go Back
            </Button>
          </motion.div>
        ) : (
          <>
            {/* Star Rating */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border rounded-2xl p-5"
            >
              <p className="text-sm font-semibold mb-4 text-center">
                How would you rate your experience?
              </p>
              <div className="flex justify-center gap-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    data-ocid={`feedback.toggle.${star}`}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition-transform active:scale-90"
                  >
                    <Star
                      size={36}
                      className={
                        (hoverRating || rating) >= star
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-muted-foreground"
                      }
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="text-center text-xs text-muted-foreground mt-2">
                  {rating === 1
                    ? "Very Poor"
                    : rating === 2
                      ? "Poor"
                      : rating === 3
                        ? "Average"
                        : rating === 4
                          ? "Good"
                          : "Excellent!"}
                </p>
              )}
            </motion.div>

            {/* Category */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="bg-card border border-border rounded-2xl p-5"
            >
              <p className="text-sm font-semibold mb-3">Category</p>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    data-ocid="feedback.toggle"
                    onClick={() => setCategory(cat)}
                    className={`px-3 py-2 rounded-xl text-sm border transition-colors ${
                      category === cat
                        ? "border-primary bg-primary/20 text-primary font-semibold"
                        : "border-border bg-muted text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Message */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card border border-border rounded-2xl p-5"
            >
              <p className="text-sm font-semibold mb-3">Tell us more</p>
              <Textarea
                data-ocid="feedback.textarea"
                placeholder="Share your thoughts, suggestions, or issues..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-muted border-border min-h-[120px] resize-none"
              />
            </motion.div>

            <Button
              data-ocid="feedback.submit_button"
              onClick={handleSubmit}
              className="w-full bg-primary text-primary-foreground font-bold h-12 rounded-2xl"
            >
              Submit Feedback
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
