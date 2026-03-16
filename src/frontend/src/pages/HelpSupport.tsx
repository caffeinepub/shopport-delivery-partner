import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "@tanstack/react-router";
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  HelpCircle,
  Mail,
  MessageSquare,
  Phone,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import FeedbackModal from "../components/FeedbackModal";

const FAQS = [
  {
    q: "How are delivery earnings calculated?",
    a: "Base rate is ₹5 for the first km, then increases incrementally. Additional charges apply for rain (+₹3/km), night deliveries (₹10/km), multi-shop (+₹2/shop), and multi-product orders.",
  },
  {
    q: "What should I do if a customer is unavailable?",
    a: "Wait at least 10 minutes and try calling the customer. If still unavailable, mark the order and contact support. A cancellation fee may apply to the customer.",
  },
  {
    q: "How do I update my vehicle or documents?",
    a: "Go to Profile → Edit Profile → scroll down to the Documents section to upload or update your documents.",
  },
  {
    q: "When will I receive my earnings?",
    a: "Earnings are processed and transferred to your registered bank account every Monday for the previous week's deliveries.",
  },
  {
    q: "How do I report a safety incident?",
    a: "Call our 24/7 support line immediately at 1800-XXX-XXXX. For emergencies, please call 112 first.",
  },
];

export default function HelpSupport() {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  return (
    <div className="min-h-dvh bg-background">
      <header className="px-4 pt-12 pb-4 flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          data-ocid="help.secondary_button"
          onClick={() => router.navigate({ to: "/profile" })}
          className="w-9 h-9 rounded-xl"
        >
          <ArrowLeft size={18} />
        </Button>
        <div className="flex items-center gap-2">
          <HelpCircle size={18} className="text-primary" />
          <h1 className="text-xl font-display font-bold">Help & Support</h1>
        </div>
      </header>

      <div className="px-4 pb-8 space-y-5">
        {/* Contact Options */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-2xl overflow-hidden"
        >
          <p className="px-4 pt-4 pb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Contact Us
          </p>
          <a
            href="tel:18001234567"
            data-ocid="help.link"
            className="flex items-center gap-4 px-4 py-4 hover:bg-muted/50 transition-colors"
          >
            <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Phone size={18} className="text-orange-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">Call Support</p>
              <p className="text-xs text-muted-foreground">
                1800-123-4567 (Toll Free)
              </p>
            </div>
            <ChevronRight size={16} className="text-muted-foreground" />
          </a>
          <Separator className="bg-border mx-4" />
          <a
            href="mailto:support@shopport.in"
            data-ocid="help.link"
            className="flex items-center gap-4 px-4 py-4 hover:bg-muted/50 transition-colors"
          >
            <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Mail size={18} className="text-blue-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">Email Support</p>
              <p className="text-xs text-muted-foreground">
                support@shopport.in
              </p>
            </div>
            <ChevronRight size={16} className="text-muted-foreground" />
          </a>
          <Separator className="bg-border mx-4" />
          <a
            href="https://wa.me/918001234567"
            target="_blank"
            rel="noreferrer"
            data-ocid="help.link"
            className="flex items-center gap-4 px-4 py-4 hover:bg-muted/50 transition-colors"
          >
            <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <MessageSquare size={18} className="text-emerald-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">WhatsApp</p>
              <p className="text-xs text-muted-foreground">
                Chat with us on WhatsApp
              </p>
            </div>
            <ChevronRight size={16} className="text-muted-foreground" />
          </a>
        </motion.div>

        {/* FAQs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-2xl overflow-hidden"
        >
          <p className="px-4 pt-4 pb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Frequently Asked Questions
          </p>
          {FAQS.map((faq, idx) => (
            <div key={faq.q}>
              {idx > 0 && <Separator className="bg-border mx-4" />}
              <button
                type="button"
                data-ocid={`help.item.${idx + 1}`}
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-start gap-3 px-4 py-4 text-left hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <p className="text-sm font-semibold">{faq.q}</p>
                  {openFaq === idx && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="text-xs text-muted-foreground mt-2 leading-relaxed"
                    >
                      {faq.a}
                    </motion.p>
                  )}
                </div>
                {openFaq === idx ? (
                  <ChevronDown
                    size={16}
                    className="text-muted-foreground flex-shrink-0 mt-0.5"
                  />
                ) : (
                  <ChevronRight
                    size={16}
                    className="text-muted-foreground flex-shrink-0 mt-0.5"
                  />
                )}
              </button>
            </div>
          ))}
        </motion.div>

        {/* Feedback Link */}
        <button
          type="button"
          data-ocid="help.secondary_button"
          onClick={() => setShowFeedback(true)}
          className="w-full flex items-center gap-4 bg-card border border-border rounded-2xl p-4 hover:border-primary/40 transition-colors"
        >
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <MessageSquare size={18} className="text-primary" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-semibold">Give Feedback</p>
            <p className="text-xs text-muted-foreground">
              Share your experience with us
            </p>
          </div>
          <ChevronRight size={16} className="text-muted-foreground" />
        </button>
      </div>

      <FeedbackModal
        open={showFeedback}
        onClose={() => setShowFeedback(false)}
        screenName="Help & Support"
      />
    </div>
  );
}
