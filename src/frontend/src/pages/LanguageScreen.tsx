import { Button } from "@/components/ui/button";
import { useRouter } from "@tanstack/react-router";
import { ArrowLeft, Check, Globe, MessageSquare } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import FeedbackModal from "../components/FeedbackModal";

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
  "Nepali",
];

export default function LanguageScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState("English");
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSave = () => {
    toast.success(`Language set to ${selected}`);
    router.navigate({ to: "/profile" });
  };

  return (
    <div className="min-h-dvh bg-background">
      <header className="px-4 pt-12 pb-4 flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          data-ocid="language.secondary_button"
          onClick={() => router.navigate({ to: "/profile" })}
          className="w-9 h-9 rounded-xl"
        >
          <ArrowLeft size={18} />
        </Button>
        <div className="flex items-center gap-2">
          <Globe size={18} className="text-primary" />
          <h1 className="text-xl font-display font-bold">Select Language</h1>
        </div>
      </header>

      <div className="px-4 pb-24">
        <p className="text-sm text-muted-foreground mb-4">
          Choose your preferred language for the app
        </p>
        <div className="grid grid-cols-2 gap-2">
          {LANGUAGES.map((lang, idx) => (
            <motion.button
              key={lang}
              type="button"
              data-ocid={`language.item.${idx + 1}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.02 }}
              onClick={() => setSelected(lang)}
              className={`flex items-center justify-between px-4 py-3 rounded-2xl border text-sm font-medium transition-colors ${
                selected === lang
                  ? "border-primary bg-primary/20 text-primary"
                  : "border-border bg-card text-foreground hover:border-primary/50"
              }`}
            >
              <span>{lang}</span>
              {selected === lang && (
                <Check size={14} className="text-primary" />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Feedback link */}
      <div className="flex justify-center pb-4">
        <button
          type="button"
          onClick={() => setShowFeedback(true)}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          <MessageSquare size={13} />
          Give Feedback
        </button>
      </div>

      <div className="fixed bottom-0 left-0 right-0 px-4 pb-8 pt-4 bg-background border-t border-border">
        <Button
          data-ocid="language.save_button"
          onClick={handleSave}
          className="w-full bg-primary text-primary-foreground font-bold h-12 rounded-2xl max-w-[430px] mx-auto block"
        >
          Save Language
        </Button>
      </div>

      <FeedbackModal
        open={showFeedback}
        onClose={() => setShowFeedback(false)}
        screenName="Language Selection"
      />
    </div>
  );
}
