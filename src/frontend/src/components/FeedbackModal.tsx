import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MessageSquare, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "admin";
  timestamp: string;
}

interface FeedbackModalProps {
  open: boolean;
  onClose: () => void;
  screenName?: string;
}

function getMessages(): ChatMessage[] {
  try {
    return JSON.parse(
      localStorage.getItem("shopport_feedback_messages") || "[]",
    );
  } catch {
    return [];
  }
}

function saveMessages(msgs: ChatMessage[]) {
  localStorage.setItem("shopport_feedback_messages", JSON.stringify(msgs));
}

function formatTime(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return "";
  }
}

async function sendToAdmin(screenName: string | undefined, message: string) {
  // Silently send feedback to admin email in background — user never sees this
  const subject = encodeURIComponent(
    `Shopport Feedback${screenName ? ` - ${screenName}` : ""}`,
  );
  const body = encodeURIComponent(message);
  try {
    const link = document.createElement("a");
    link.href = `mailto:shopportapp@gmail.com?subject=${subject}&body=${body}`;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch {
    // silently ignore
  }
}

export default function FeedbackModal({
  open,
  onClose,
  screenName,
}: FeedbackModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(getMessages);
  const [inputText, setInputText] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Load admin replies from localStorage and merge as admin messages
  useEffect(() => {
    if (!open) return;
    const adminReplies = (() => {
      try {
        return JSON.parse(
          localStorage.getItem("shopport_admin_replies") || "[]",
        ) as Array<{ id?: string; message: string; date: string }>;
      } catch {
        return [];
      }
    })();
    if (adminReplies.length > 0) {
      setMessages((prev) => {
        const existingIds = new Set(prev.map((m) => m.id));
        const newAdminMsgs: ChatMessage[] = adminReplies
          .filter((r) => !existingIds.has(`admin_${r.id ?? r.date}`))
          .map((r) => ({
            id: `admin_${r.id ?? r.date}`,
            text: r.message,
            sender: "admin" as const,
            timestamp: r.date,
          }));
        if (newAdminMsgs.length === 0) return prev;
        const merged = [...prev, ...newAdminMsgs].sort(
          (a, b) =>
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
        );
        saveMessages(merged);
        return merged;
      });
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      setTimeout(
        () => bottomRef.current?.scrollIntoView({ behavior: "smooth" }),
        100,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleSend = async () => {
    const text = inputText.trim();
    if (!text || sending) return;
    setSending(true);
    const msg: ChatMessage = {
      id: `user_${Date.now()}`,
      text,
      sender: "user",
      timestamp: new Date().toISOString(),
    };
    const updated = [...messages, msg];
    setMessages(updated);
    saveMessages(updated);
    setInputText("");
    // Send to admin silently in background
    sendToAdmin(screenName, text);
    await new Promise((r) => setTimeout(r, 300));
    setSending(false);
    setTimeout(
      () => bottomRef.current?.scrollIntoView({ behavior: "smooth" }),
      100,
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClose = () => {
    setInputText("");
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
        className="bg-card border-border max-w-sm w-full rounded-2xl p-0 overflow-hidden flex flex-col"
        style={{ maxHeight: "85dvh" }}
      >
        {/* Header */}
        <div className="bg-primary/10 border-b border-border px-4 pt-4 pb-3 flex-shrink-0">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-primary/20 flex items-center justify-center">
                  <MessageSquare size={16} className="text-primary" />
                </div>
                <div>
                  <DialogTitle className="text-sm font-display font-bold leading-tight">
                    Support Chat
                  </DialogTitle>
                  {screenName && (
                    <p className="text-[10px] text-muted-foreground">
                      {screenName}
                    </p>
                  )}
                </div>
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
          </DialogHeader>
        </div>

        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-[200px]"
          style={{ maxHeight: "50dvh" }}
        >
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full py-8 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <MessageSquare size={20} className="text-primary" />
              </div>
              <p className="text-sm font-semibold text-foreground">
                Send us a message
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                We usually reply within 24 hours
              </p>
            </div>
          )}
          {messages.map((msg) => (
            <div
              key={msg.id}
              data-ocid={
                msg.sender === "user"
                  ? "feedback.success_state"
                  : "feedback.panel"
              }
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] px-3 py-2 rounded-2xl ${
                  msg.sender === "user"
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-primary/15 text-foreground border border-primary/20 rounded-bl-sm"
                }`}
              >
                {msg.sender === "admin" && (
                  <p className="text-[10px] font-bold text-primary mb-1">
                    Shopport Team
                  </p>
                )}
                <p className="text-sm leading-relaxed">{msg.text}</p>
                <p
                  className={`text-[10px] mt-1 ${
                    msg.sender === "user"
                      ? "text-primary-foreground/60"
                      : "text-muted-foreground"
                  }`}
                >
                  {formatTime(msg.timestamp)}
                </p>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t border-border px-3 py-3 flex-shrink-0">
          <div className="flex items-end gap-2">
            <textarea
              ref={inputRef}
              data-ocid="feedback.textarea"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              rows={1}
              className="flex-1 bg-background border border-border rounded-xl px-3 py-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary transition-all text-foreground placeholder:text-muted-foreground"
              style={{ maxHeight: "80px", overflowY: "auto" }}
            />
            <Button
              data-ocid="feedback.submit_button"
              size="icon"
              onClick={handleSend}
              disabled={!inputText.trim() || sending}
              className="w-9 h-9 rounded-xl bg-primary text-primary-foreground flex-shrink-0 disabled:opacity-50"
            >
              {sending ? (
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send size={15} />
              )}
            </Button>
          </div>
          <p className="text-[10px] text-muted-foreground mt-1.5 text-center">
            Message sent to support team
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
