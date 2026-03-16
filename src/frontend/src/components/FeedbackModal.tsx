import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, MessageSquare, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface AdminReply {
  id: string;
  message: string;
  date: string;
}

interface FeedbackModalProps {
  open: boolean;
  onClose: () => void;
  screenName?: string;
}

export default function FeedbackModal({
  open,
  onClose,
  screenName,
}: FeedbackModalProps) {
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const adminReplies: AdminReply[] = (() => {
    try {
      return JSON.parse(localStorage.getItem("shopport_admin_replies") || "[]");
    } catch {
      return [];
    }
  })();

  const handleSubmit = async () => {
    if (!message.trim()) return;
    setSubmitting(true);
    // Silently attempt to open mail client without exposing email to UI
    const subject = encodeURIComponent(
      `Shopport Feedback${screenName ? ` - ${screenName}` : ""}`,
    );
    const body = encodeURIComponent(message.trim());
    try {
      const link = document.createElement("a");
      link.href = `mailto:shopportapp@gmail.com?subject=${subject}&body=${body}`;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      // ignore
    }
    await new Promise((r) => setTimeout(r, 500));
    setSubmitting(false);
    setSubmitted(true);
    toast.success("Feedback sent successfully! We'll get back to you soon.");
  };

  const handleClose = () => {
    setMessage("");
    setSubmitted(false);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) handleClose();
      }}
    >
      <DialogContent
        data-ocid="feedback.dialog"
        className="bg-card border-border max-w-sm w-full rounded-2xl p-0 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-primary/10 border-b border-border px-5 pt-5 pb-4">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-primary/20 flex items-center justify-center">
                  <MessageSquare size={16} className="text-primary" />
                </div>
                <DialogTitle className="text-base font-display font-bold">
                  Give Feedback
                </DialogTitle>
              </div>
              <button
                type="button"
                data-ocid="feedback.close_button"
                onClick={handleClose}
                className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
              >
                <X size={14} className="text-muted-foreground" />
              </button>
            </div>
            {screenName && (
              <p className="text-xs text-muted-foreground mt-1 ml-10">
                {screenName}
              </p>
            )}
          </DialogHeader>
        </div>

        <div className="px-5 py-4 space-y-4">
          {submitted ? (
            <div
              data-ocid="feedback.success_state"
              className="flex flex-col items-center gap-3 py-6 text-center"
            >
              <div className="w-14 h-14 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
                <CheckCircle2 size={28} className="text-green-500" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Feedback Sent!</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Thank you. We'll review your feedback and get back to you
                  soon.
                </p>
              </div>
              <Button
                data-ocid="feedback.close_button"
                onClick={handleClose}
                className="bg-primary text-primary-foreground px-8"
              >
                Done
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <Label
                  htmlFor="feedback-message"
                  className="text-sm font-medium text-foreground"
                >
                  Your Message
                </Label>
                <Textarea
                  id="feedback-message"
                  data-ocid="feedback.textarea"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us how we can improve..."
                  className="bg-background border-border resize-none min-h-[100px]"
                  rows={4}
                />
              </div>
              <Button
                data-ocid="feedback.submit_button"
                onClick={handleSubmit}
                disabled={!message.trim() || submitting}
                className="w-full bg-primary text-primary-foreground font-semibold"
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <MessageSquare size={15} />
                    Send Feedback
                  </span>
                )}
              </Button>
            </>
          )}

          {/* Admin replies section */}
          {adminReplies.length > 0 && (
            <div className="border-t border-border pt-4">
              <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
                Replies from Shopport Team
              </p>
              <div className="space-y-3">
                {adminReplies.map((reply, i) => (
                  <div
                    key={reply.id || i}
                    data-ocid={`feedback.item.${i + 1}`}
                    className="bg-primary/8 border border-primary/20 rounded-xl px-3.5 py-3"
                  >
                    <p className="text-sm text-foreground">{reply.message}</p>
                    <p className="text-[10px] text-muted-foreground mt-1.5">
                      {reply.date}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
