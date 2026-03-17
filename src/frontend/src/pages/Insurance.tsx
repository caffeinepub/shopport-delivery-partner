import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "@tanstack/react-router";
import {
  ArrowLeft,
  BadgeCheck,
  Building2,
  CheckCircle2,
  MessageSquare,
  RefreshCw,
  Shield,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import FeedbackModal from "../components/FeedbackModal";
import LiveLocationBar from "../components/LiveLocationBar";

export default function Insurance() {
  const [showFeedback, setShowFeedback] = useState(false);
  const router = useRouter();

  return (
    <div data-ocid="insurance.page" className="min-h-dvh bg-background">
      <header className="px-4 pt-12 pb-4 flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.history.back()}
          className="w-9 h-9 rounded-xl"
        >
          <ArrowLeft size={18} />
        </Button>
        <h1 className="text-2xl font-display font-bold">Insurance</h1>
      </header>
      <LiveLocationBar />

      <div className="px-4 space-y-4 pb-8">
        {/* Hero card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden bg-primary rounded-2xl p-6 shadow-glow"
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 80% 20%, white 0%, transparent 60%)",
            }}
          />
          <Shield size={40} className="text-primary-foreground/80 mb-3" />
          <h2 className="text-xl font-display font-bold text-primary-foreground">
            Protect Yourself on the Road
          </h2>
          <p className="text-primary-foreground/70 text-sm mt-1">
            Affordable government-backed insurance for delivery partners
          </p>
        </motion.div>

        {/* PMSBY Scheme Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-2xl p-5"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <BadgeCheck size={18} className="text-primary" />
                <span className="text-xs text-primary font-semibold">
                  Government Scheme
                </span>
              </div>
              <h3 className="font-display font-bold text-base leading-tight">
                Pradhan Mantri Suraksha Bima Yojana
              </h3>
              <p className="text-muted-foreground text-xs mt-0.5">(PMSBY)</p>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl px-3 py-1.5 ml-3 flex-shrink-0">
              <p className="text-green-400 font-bold text-sm">₹20/yr</p>
            </div>
          </div>

          <div className="space-y-3 mb-5">
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
              Coverage
            </p>
            {[
              { label: "Accidental Death Cover", amount: "₹2,00,000" },
              { label: "Permanent Disability Cover", amount: "₹2,00,000" },
              { label: "Partial Disability Cover", amount: "₹1,00,000" },
            ].map(({ label, amount }) => (
              <div
                key={label}
                className="flex items-center justify-between py-2 border-b border-border last:border-0"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck
                    size={14}
                    className="text-primary flex-shrink-0"
                  />
                  <span className="text-sm">{label}</span>
                </div>
                <span className="text-sm font-bold text-foreground">
                  {amount}
                </span>
              </div>
            ))}
          </div>

          <div className="bg-muted rounded-xl p-4 mb-5">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              How to Apply
            </p>
            <ol className="space-y-2">
              {[
                "Visit any bank branch near you",
                "Fill the PMSBY enrollment form",
                "Pay ₹20 annual premium",
              ].map((step, i) => (
                <li key={step} className="flex items-start gap-2 text-sm">
                  <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex-shrink-0 flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </span>
                  <span className="text-muted-foreground">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Apply Now - Coming Soon */}
          <div className="relative">
            <Button
              data-ocid="insurance.primary_button"
              disabled
              className="w-full bg-primary text-primary-foreground font-semibold h-12 opacity-60"
            >
              Apply Now
            </Button>
            <div className="absolute inset-0 flex items-center justify-center">
              <Badge className="bg-amber-500 text-white border-0 text-xs font-bold px-3 py-1">
                🚀 Coming Soon
              </Badge>
            </div>
          </div>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-2xl p-5"
        >
          <h3 className="font-display font-bold mb-4">Why Get Insured?</h3>
          <div className="space-y-3">
            {[
              {
                icon: Wallet,
                label: "Affordable",
                desc: "Only ₹20 per year – less than a cup of tea",
              },
              {
                icon: Building2,
                label: "Government Backed",
                desc: "Managed under Government of India scheme",
              },
              {
                icon: RefreshCw,
                label: "Auto-Renewal",
                desc: "Automatically renews each year from your bank",
              },
              {
                icon: CheckCircle2,
                label: "Easy Claims",
                desc: "Simple claim process through your bank branch",
              },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex items-start gap-3">
                <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{label}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <p className="text-center text-muted-foreground text-xs pb-2">
          <button
            type="button"
            data-ocid="insurance.open_modal_button"
            onClick={() => setShowFeedback(true)}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors mb-3"
          >
            <MessageSquare size={12} />
            Give Feedback
          </button>
          © {new Date().getFullYear()} Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            className="text-primary hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            caffeine.ai
          </a>
        </p>
      </div>

      <FeedbackModal
        open={showFeedback}
        onClose={() => setShowFeedback(false)}
        screenName="Insurance"
      />
    </div>
  );
}
