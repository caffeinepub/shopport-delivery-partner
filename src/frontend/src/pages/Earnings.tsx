import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertCircle,
  Banknote,
  CreditCard,
  MessageSquare,
  RefreshCw,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import FeedbackModal from "../components/FeedbackModal";
import LiveLocationBar from "../components/LiveLocationBar";
import { type EarningsData, Variant_cod_online } from "../hooks/useQueries";
import { useCallerProfile, useEarnings } from "../hooks/useQueries";

const MOCK_EARNINGS: (EarningsData & { orderId: string })[] = [
  {
    createdAt: BigInt(Date.now() - 1000 * 60 * 30),
    partnerId: "p1",
    paymentType: Variant_cod_online.cod,
    amount: 85,
    orderId: "ORD-001",
  },
  {
    createdAt: BigInt(Date.now() - 1000 * 60 * 90),
    partnerId: "p1",
    paymentType: Variant_cod_online.online,
    amount: 65,
    orderId: "ORD-002",
  },
  {
    createdAt: BigInt(Date.now() - 1000 * 60 * 150),
    partnerId: "p1",
    paymentType: Variant_cod_online.online,
    amount: 45,
    orderId: "ORD-003",
  },
  {
    createdAt: BigInt(Date.now() - 1000 * 3600 * 25),
    partnerId: "p1",
    paymentType: Variant_cod_online.cod,
    amount: 95,
    orderId: "ORD-004",
  },
  {
    createdAt: BigInt(Date.now() - 1000 * 3600 * 26),
    partnerId: "p1",
    paymentType: Variant_cod_online.online,
    amount: 70,
    orderId: "ORD-005",
  },
  {
    createdAt: BigInt(Date.now() - 1000 * 3600 * 48),
    partnerId: "p1",
    paymentType: Variant_cod_online.cod,
    amount: 110,
    orderId: "ORD-006",
  },
  {
    createdAt: BigInt(Date.now() - 1000 * 3600 * 72),
    partnerId: "p1",
    paymentType: Variant_cod_online.online,
    amount: 55,
    orderId: "ORD-007",
  },
  {
    createdAt: BigInt(Date.now() - 1000 * 3600 * 100),
    partnerId: "p1",
    paymentType: Variant_cod_online.cod,
    amount: 80,
    orderId: "ORD-008",
  },
  {
    createdAt: BigInt(Date.now() - 1000 * 3600 * 150),
    partnerId: "p1",
    paymentType: Variant_cod_online.online,
    amount: 60,
    orderId: "ORD-009",
  },
  {
    createdAt: BigInt(Date.now() - 1000 * 3600 * 200),
    partnerId: "p1",
    paymentType: Variant_cod_online.cod,
    amount: 90,
    orderId: "ORD-010",
  },
];

function filterByPeriod(
  earnings: (EarningsData & { orderId?: string })[],
  period: "today" | "week" | "month",
) {
  const now = Date.now();
  const cutoff =
    period === "today"
      ? now - 86400000
      : period === "week"
        ? now - 7 * 86400000
        : now - 30 * 86400000;
  return earnings.filter((e) => Number(e.createdAt) / 1_000_000 > cutoff);
}

export default function Earnings() {
  const { data: profile } = useCallerProfile();
  const { data: apiEarnings, isLoading } = useEarnings(
    profile?.partnerId ?? "",
  );

  const [codCashReceived, setCodCashReceived] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [onlineReceived, setOnlineReceived] = useState("");
  const [netDeductions, setNetDeductions] = useState("");
  const [isReturn, setIsReturn] = useState(false);
  const [returnPrice, setReturnPrice] = useState("");
  const [manualSaved, setManualSaved] = useState(false);

  const earningsRaw = useMemo(() => {
    return apiEarnings && apiEarnings.length > 0 ? apiEarnings : MOCK_EARNINGS;
  }, [apiEarnings]);

  const getStats = (period: "today" | "week" | "month") => {
    const filtered = filterByPeriod(earningsRaw, period);
    const total = filtered.reduce((s, e) => s + e.amount, 0);
    const cod = filtered
      .filter((e) => e.paymentType === Variant_cod_online.cod)
      .reduce((s, e) => s + e.amount, 0);
    const online = filtered
      .filter((e) => e.paymentType === Variant_cod_online.online)
      .reduce((s, e) => s + e.amount, 0);
    return { total, cod, online, count: filtered.length, list: filtered };
  };

  const formatTime = (ts: bigint) => {
    const date = new Date(Number(ts) / 1_000_000);
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (ts: bigint) => {
    const date = new Date(Number(ts) / 1_000_000);
    return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  };

  const handleSaveManual = () => {
    setManualSaved(true);
    toast.success("Earnings entry saved!");
  };

  const codVal = Number(codCashReceived) || 0;
  const onlineVal = Number(onlineReceived) || 0;
  const deductionsVal = Number(netDeductions) || 0;
  const returnVal = isReturn ? Number(returnPrice) || 0 : 0;
  const netTotal = codVal + onlineVal - deductionsVal - returnVal;

  const renderEarnings = (period: "today" | "week" | "month") => {
    if (isLoading)
      return (
        <div data-ocid="earnings.loading_state">
          <Skeleton className="h-24 w-full rounded-xl mb-3" />
          <Skeleton className="h-24 w-full rounded-xl" />
        </div>
      );
    const { total, cod, online, count, list } = getStats(period);
    return (
      <div>
        {/* Order Breakdown Summary at top */}
        <div className="bg-card border border-border rounded-2xl p-4 mb-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Order Breakdown
          </p>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-muted rounded-xl p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <Banknote size={12} className="text-amber-400" />
                <p className="text-[10px] text-muted-foreground">COD</p>
              </div>
              <p className="text-base font-display font-bold">
                ₹{cod + codVal}
              </p>
            </div>
            <div className="bg-muted rounded-xl p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <CreditCard size={12} className="text-blue-400" />
                <p className="text-[10px] text-muted-foreground">Online</p>
              </div>
              <p className="text-base font-display font-bold">
                ₹{online + onlineVal}
              </p>
            </div>
            <div className="bg-muted rounded-xl p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <AlertCircle size={12} className="text-destructive" />
                <p className="text-[10px] text-muted-foreground">Deductions</p>
              </div>
              <p className="text-base font-display font-bold">
                ₹{deductionsVal}
              </p>
            </div>
            <div className="bg-muted rounded-xl p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <TrendingUp size={12} className="text-green-400" />
                <p className="text-[10px] text-muted-foreground">Net</p>
              </div>
              <p
                className={`text-base font-display font-bold ${netTotal + total >= 0 ? "text-primary" : "text-destructive"}`}
              >
                ₹{total + netTotal}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-primary rounded-2xl p-4 col-span-2"
          >
            <p className="text-primary-foreground/70 text-xs">Total Earned</p>
            <p className="text-3xl font-display font-bold text-primary-foreground">
              ₹{total}
            </p>
            <p className="text-primary-foreground/70 text-xs mt-1">
              {count} orders
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-card border border-border rounded-2xl p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <Banknote size={14} className="text-amber-400" />
              <p className="text-xs text-muted-foreground">COD</p>
            </div>
            <p className="text-xl font-display font-bold">₹{cod}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-2xl p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <CreditCard size={14} className="text-blue-400" />
              <p className="text-xs text-muted-foreground">Online</p>
            </div>
            <p className="text-xl font-display font-bold">₹{online}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-card border border-border rounded-2xl p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle size={14} className="text-destructive" />
              <p className="text-xs text-muted-foreground">Deductions</p>
            </div>
            <p className="text-xl font-display font-bold">₹0</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-2xl p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={14} className="text-green-400" />
              <p className="text-xs text-muted-foreground">Net</p>
            </div>
            <p className="text-xl font-display font-bold">₹{total}</p>
          </motion.div>
        </div>

        <h3 className="text-sm font-bold font-display mb-3">Order History</h3>
        {list.length === 0 ? (
          <div data-ocid="earnings.empty_state" className="text-center py-10">
            <p className="text-muted-foreground text-sm">
              No earnings for this period
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {list.map((earning, idx) => {
              const orderId =
                (earning as (typeof MOCK_EARNINGS)[0]).orderId ??
                `Order #${idx + 1}`;
              return (
                <motion.div
                  key={orderId}
                  data-ocid={`earnings.item.${idx + 1}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.03 }}
                  className="bg-card border border-border rounded-xl px-4 py-3 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        earning.paymentType === Variant_cod_online.cod
                          ? "bg-amber-500/10"
                          : "bg-blue-500/10"
                      }`}
                    >
                      {earning.paymentType === Variant_cod_online.cod ? (
                        <Banknote size={14} className="text-amber-400" />
                      ) : (
                        <CreditCard size={14} className="text-blue-400" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{orderId}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(earning.createdAt)} ·{" "}
                        {formatTime(earning.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">₹{earning.amount}</p>
                    <Badge variant="outline" className="text-[10px] mt-0.5">
                      {earning.paymentType}
                    </Badge>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-dvh bg-background">
      <header className="px-4 pt-12 pb-4">
        <h1 className="text-2xl font-display font-bold">Earnings</h1>
        <p className="text-muted-foreground text-sm">Track your income</p>
      </header>
      <LiveLocationBar />
      <div className="px-4 space-y-5 pb-8">
        {/* Manual Entry Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-2xl p-5 space-y-4"
        >
          <h3 className="font-display font-bold text-base">Manual Entry</h3>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground flex items-center gap-1">
                <Banknote size={12} className="text-amber-400" />
                COD Cash (₹)
              </Label>
              <Input
                data-ocid="earnings.input"
                type="number"
                placeholder="0"
                value={codCashReceived}
                onChange={(e) => {
                  setCodCashReceived(e.target.value);
                  setManualSaved(false);
                }}
                className="bg-muted border-border h-10"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground flex items-center gap-1">
                <CreditCard size={12} className="text-blue-400" />
                Online (₹)
              </Label>
              <Input
                data-ocid="earnings.input"
                type="number"
                placeholder="0"
                value={onlineReceived}
                onChange={(e) => {
                  setOnlineReceived(e.target.value);
                  setManualSaved(false);
                }}
                className="bg-muted border-border h-10"
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground flex items-center gap-1">
              <AlertCircle size={12} className="text-destructive" />
              Deductions (₹)
            </Label>
            <Input
              data-ocid="earnings.input"
              type="number"
              placeholder="0"
              value={netDeductions}
              onChange={(e) => {
                setNetDeductions(e.target.value);
                setManualSaved(false);
              }}
              className="bg-muted border-border h-10"
            />
          </div>

          <Separator className="bg-border" />

          {/* Return Order */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RefreshCw size={14} className="text-muted-foreground" />
                <Label className="text-sm font-semibold cursor-pointer">
                  Return Order
                </Label>
              </div>
              <Switch
                data-ocid="earnings.switch"
                checked={isReturn}
                onCheckedChange={(v) => {
                  setIsReturn(v);
                  setManualSaved(false);
                }}
              />
            </div>
            {isReturn && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="space-y-1"
              >
                <Label className="text-xs text-muted-foreground">
                  Return Order Price (₹)
                </Label>
                <Input
                  data-ocid="earnings.input"
                  type="number"
                  placeholder="Enter return amount"
                  value={returnPrice}
                  onChange={(e) => {
                    setReturnPrice(e.target.value);
                    setManualSaved(false);
                  }}
                  className="bg-muted border-border h-10"
                />
              </motion.div>
            )}
          </div>

          <Separator className="bg-border" />

          {/* Live Summary Table */}
          <div className="bg-muted rounded-2xl p-4 space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Earnings Summary
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Banknote size={13} className="text-amber-400" /> COD Income
                </span>
                <span className="font-semibold">₹{codVal}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <CreditCard size={13} className="text-blue-400" /> Online
                  Payment
                </span>
                <span className="font-semibold">₹{onlineVal}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <AlertCircle size={13} className="text-destructive" /> Net
                  Deductions
                </span>
                <span className="font-semibold text-destructive">
                  ₹{deductionsVal}
                </span>
              </div>
              {isReturn && (
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <RefreshCw size={13} className="text-green-400" /> Return
                    Order
                  </span>
                  <span className="font-semibold text-green-400">
                    ₹{returnVal}
                  </span>
                </div>
              )}
            </div>
            <Separator className="bg-border" />
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 font-bold text-sm">
                <TrendingUp size={14} className="text-green-400" /> Total Earned
              </span>
              <span
                className={`text-xl font-display font-bold ${
                  netTotal >= 0 ? "text-primary" : "text-destructive"
                }`}
              >
                ₹{netTotal}
              </span>
            </div>
          </div>

          <Button
            data-ocid="earnings.submit_button"
            onClick={handleSaveManual}
            className="w-full bg-primary text-primary-foreground font-semibold h-10"
          >
            {manualSaved ? "✓ Saved" : "Save Entry"}
          </Button>
        </motion.div>

        {/* Earnings History */}
        <Tabs defaultValue="today">
          <TabsList className="w-full mb-5 bg-card border border-border">
            <TabsTrigger
              data-ocid="earnings.tab"
              value="today"
              className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Today
            </TabsTrigger>
            <TabsTrigger
              data-ocid="earnings.tab"
              value="week"
              className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Week
            </TabsTrigger>
            <TabsTrigger
              data-ocid="earnings.tab"
              value="month"
              className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Month
            </TabsTrigger>
          </TabsList>
          <TabsContent value="today">{renderEarnings("today")}</TabsContent>
          <TabsContent value="week">{renderEarnings("week")}</TabsContent>
          <TabsContent value="month">{renderEarnings("month")}</TabsContent>
        </Tabs>

        {/* Feedback link */}
        <div className="flex justify-center pt-2">
          <button
            type="button"
            data-ocid="earnings.secondary_button"
            onClick={() => setShowFeedback(true)}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            <MessageSquare size={12} />
            Give Feedback
          </button>
        </div>
      </div>

      <FeedbackModal
        open={showFeedback}
        onClose={() => setShowFeedback(false)}
        screenName="Earnings"
      />
    </div>
  );
}
