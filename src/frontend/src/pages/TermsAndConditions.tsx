import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, FileText, MessageSquare } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import FeedbackModal from "../components/FeedbackModal";
import LiveLocationBar from "../components/LiveLocationBar";

const TERMS_SECTIONS = [
  {
    number: "01",
    title: "Acceptance of Terms",
    content:
      "By registering as a delivery partner on the Shopport platform, you agree to be bound by these Terms & Conditions. These terms constitute a legally binding agreement between you and Shopport. If you do not agree to these terms, you may not register or continue using the platform. Shopport reserves the right to update these terms at any time with reasonable notice.",
  },
  {
    number: "02",
    title: "Eligibility Requirements",
    content:
      "You must be at least 18 years of age to register as a delivery partner. You must possess a valid government-issued identity document (Aadhaar Card mandatory). If operating a motorized vehicle (Bike/Car), you must hold a valid driving license, vehicle registration certificate (RC), and valid insurance. Walking and cycle partners are exempt from vehicle document requirements.",
  },
  {
    number: "03",
    title: "Delivery Responsibilities",
    content:
      "As a delivery partner, you are responsible for timely pickup and delivery of all assigned orders. You must handle all packages with care to prevent damage or loss. You are expected to maintain professional conduct with customers, shop owners, and Shopport staff. You must follow the assigned delivery route and update order status accurately at each stage (Accepted → Picked Up → Out for Delivery → Delivered).",
  },
  {
    number: "04",
    title: "Earnings & Payment Policy",
    content:
      "Base delivery earnings are ₹5 for the first kilometer, with incremental rates for additional distance. Multi-shop orders attract an additional ₹2 per extra shop. Rain and night-time deliveries attract higher per-km rates (₹8/km for rain; ₹10/km for night, 11 PM–5 AM). Earnings are calculated automatically and paid out weekly. Deductions may apply for order cancellations (₹25 per cancellation) or verified complaints. COD amounts collected must be fully deposited and reconciled.",
  },
  {
    number: "05",
    title: "Code of Conduct",
    content:
      "All delivery partners must maintain respectful and professional behavior at all times. Harassment, verbal abuse, or inappropriate conduct toward customers, shopkeepers, or other partners is strictly prohibited and may result in immediate account suspension. You must follow all applicable traffic laws, speed limits, and road safety regulations. Shopport has a zero-tolerance policy for reckless driving or endangering public safety.",
  },
  {
    number: "06",
    title: "Safety Guidelines",
    content:
      "Delivery partners are personally responsible for their own safety during deliveries. If you operate a Bike or Car, wearing a helmet and seatbelt respectively is mandatory. You must follow all applicable health guidelines, especially during adverse weather or health emergencies. Shopport strongly recommends that all partners enroll in government-approved personal accident insurance schemes (e.g., PMSBY – Pradhan Mantri Suraksha Bima Yojana). Do not undertake deliveries when medically unfit.",
  },
  {
    number: "07",
    title: "Privacy & Data Usage",
    content:
      "Shopport collects and processes your personal data, including name, contact details, Aadhaar information, and real-time GPS location data, to facilitate the delivery service. Location tracking is active during your working hours and active deliveries. Your data will not be sold to third parties. By accepting these terms, you consent to the collection, storage, and use of your data as described in the Shopport Privacy Policy. You may request deletion of your data upon account termination.",
  },
  {
    number: "08",
    title: "Insurance Coverage",
    content:
      "Shopport strongly encourages all delivery partners to apply for the Pradhan Mantri Suraksha Bima Yojana (PMSBY), a government-backed personal accident insurance scheme offering coverage of up to ₹2 lakh for accidental death and permanent disability at a nominal annual premium. Shopport does not currently provide employer-provided insurance; partners are independent contractors. The in-app insurance application feature is currently coming soon and will be made available in a future update.",
  },
  {
    number: "09",
    title: "Account Suspension & Termination",
    content:
      "Shopport reserves the right to suspend or permanently terminate a delivery partner's account for violations of these terms, including but not limited to: fraudulent activity, repeated order cancellations without valid reason, verified customer complaints, submission of false documents, or breach of code of conduct. Partners who believe their account was suspended in error may appeal by contacting Shopport support within 14 days. Shopport will review appeals and communicate the outcome within 7 business days.",
  },
  {
    number: "10",
    title: "Dispute Resolution",
    content:
      "In the event of a dispute regarding earnings, order assignment, customer complaints, or account suspension, partners should first contact Shopport Support through the Help & Support section of the app. If unresolved, the matter may be escalated to the Shopport Grievance Officer. Shopport aims to resolve all disputes within 5–7 business days. For unresolved disputes, parties agree to seek resolution through binding arbitration under Indian law. These terms are governed by the laws of India.",
  },
];

export default function TermsAndConditions() {
  const [showFeedback, setShowFeedback] = useState(false);
  const router = useRouter();

  return (
    <div className="min-h-dvh bg-background">
      {/* Header */}
      <header className="px-4 pt-12 pb-4 flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          data-ocid="terms.secondary_button"
          onClick={() => router.navigate({ to: "/profile" })}
          className="w-9 h-9 rounded-xl"
        >
          <ArrowLeft size={18} />
        </Button>
        <div className="flex-1">
          <p className="text-xs text-muted-foreground">Legal</p>
          <h1 className="text-lg font-display font-bold">Terms & Conditions</h1>
        </div>
        <div className="w-9 h-9 bg-amber-500/10 rounded-xl flex items-center justify-center">
          <FileText size={18} className="text-amber-400" />
        </div>
      </header>
      <LiveLocationBar />

      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-4 mb-5"
      >
        <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-500/20 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-orange-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
              <BookOpen size={22} className="text-orange-400" />
            </div>
            <div>
              <h2 className="font-display font-bold text-base">
                Shopport Delivery Partner Agreement
              </h2>
              <p className="text-xs text-muted-foreground">
                Last updated: January 2025
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Please read these terms carefully before using the Shopport Delivery
            Partner platform. By continuing to use our services, you agree to be
            bound by these terms.
          </p>
        </div>
      </motion.div>

      {/* Terms Sections */}
      <div data-ocid="terms.panel" className="px-4 pb-8 space-y-4">
        {TERMS_SECTIONS.map((section, idx) => (
          <motion.div
            key={section.number}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.03 }}
            className="bg-card border border-border rounded-2xl p-5"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-display font-bold text-orange-400">
                  {section.number}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-display font-bold text-sm mb-2">
                  {section.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {section.content}
                </p>
              </div>
            </div>
          </motion.div>
        ))}

        <Separator className="bg-border" />

        {/* Footer note */}
        <div className="bg-muted rounded-2xl p-4">
          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            By continuing to use Shopport as a delivery partner, you acknowledge
            that you have read, understood, and agreed to these Terms &
            Conditions. For questions, contact{" "}
            <span className="text-primary font-medium">
              support@shopport.in
            </span>
          </p>
        </div>

        {/* Feedback */}
        <div className="flex justify-center py-2">
          <button
            type="button"
            onClick={() => setShowFeedback(true)}
            data-ocid="terms.feedback.button"
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            <MessageSquare size={13} />
            Give Feedback
          </button>
        </div>

        <p className="text-center text-muted-foreground text-xs pb-2">
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
        screenName="Terms & Conditions"
      />
    </div>
  );
}
