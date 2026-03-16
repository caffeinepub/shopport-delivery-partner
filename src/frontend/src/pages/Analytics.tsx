import { Badge } from "@/components/ui/badge";
import {
  Award,
  CheckCircle,
  MessageSquare,
  Package,
  Star,
  Target,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import FeedbackModal from "../components/FeedbackModal";

const weeklyData = [
  { day: "Mon", deliveries: 8, earnings: 560 },
  { day: "Tue", deliveries: 12, earnings: 840 },
  { day: "Wed", deliveries: 6, earnings: 420 },
  { day: "Thu", deliveries: 14, earnings: 980 },
  { day: "Fri", deliveries: 10, earnings: 700 },
  { day: "Sat", deliveries: 18, earnings: 1260 },
  { day: "Sun", deliveries: 9, earnings: 630 },
];

const stats = [
  {
    label: "Total Deliveries",
    value: "247",
    icon: Package,
    color: "text-primary",
  },
  {
    label: "Completion Rate",
    value: "96.8%",
    icon: CheckCircle,
    color: "text-green-400",
  },
  { label: "Avg Rating", value: "4.8★", icon: Star, color: "text-yellow-400" },
  {
    label: "Total Earned",
    value: "₹17,290",
    icon: TrendingUp,
    color: "text-primary",
  },
];

const badges = [
  {
    icon: Award,
    label: "Top Performer",
    desc: "Top 5% this month",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10 border-yellow-400/20",
  },
  {
    icon: Target,
    label: "Consistency King",
    desc: "7 days streak",
    color: "text-primary",
    bg: "bg-primary/10 border-primary/20",
  },
  {
    icon: Star,
    label: "5-Star Driver",
    desc: "100% 5-star week",
    color: "text-blue-400",
    bg: "bg-blue-400/10 border-blue-400/20",
  },
];

export default function Analytics() {
  const [showFeedback, setShowFeedback] = useState(false);
  return (
    <div className="min-h-dvh bg-background">
      <header className="px-4 pt-12 pb-4">
        <h1 className="text-2xl font-display font-bold">Analytics</h1>
        <p className="text-muted-foreground text-sm">
          Your performance overview
        </p>
      </header>

      <div className="px-4 space-y-5 pb-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              data-ocid={`analytics.item.${idx + 1}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-card border border-border rounded-2xl p-4"
            >
              <stat.icon size={20} className={`${stat.color} mb-2`} />
              <p className={`text-2xl font-display font-bold ${stat.color}`}>
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Weekly Chart */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-2xl p-4"
        >
          <p className="text-sm font-bold font-display mb-4">
            Weekly Deliveries
          </p>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart
              data={weeklyData}
              margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(0.28 0.034 252)"
                vertical={false}
              />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 11, fill: "oklch(0.58 0.04 252)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "oklch(0.58 0.04 252)" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(0.2 0.034 252)",
                  border: "1px solid oklch(0.28 0.034 252)",
                  borderRadius: "8px",
                  color: "oklch(0.95 0.01 252)",
                  fontSize: 12,
                }}
              />
              <Bar
                dataKey="deliveries"
                fill="oklch(0.7 0.19 39)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Earnings Chart */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-card border border-border rounded-2xl p-4"
        >
          <p className="text-sm font-bold font-display mb-4">
            Weekly Earnings (₹)
          </p>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart
              data={weeklyData}
              margin={{ top: 0, right: 0, left: -10, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(0.28 0.034 252)"
                vertical={false}
              />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 11, fill: "oklch(0.58 0.04 252)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "oklch(0.58 0.04 252)" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(0.2 0.034 252)",
                  border: "1px solid oklch(0.28 0.034 252)",
                  borderRadius: "8px",
                  color: "oklch(0.95 0.01 252)",
                  fontSize: 12,
                }}
              />
              <Bar
                dataKey="earnings"
                fill="oklch(0.65 0.15 195)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Badges */}
        <div>
          <p className="text-sm font-bold font-display mb-3">
            Performance Badges
          </p>
          <div className="space-y-2">
            {badges.map((badge, idx) => (
              <motion.div
                key={badge.label}
                data-ocid={`analytics.item.${idx + 5}`}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.05 }}
                className={`flex items-center gap-3 p-3 rounded-xl border ${badge.bg}`}
              >
                <badge.icon size={20} className={badge.color} />
                <div>
                  <p className="text-sm font-semibold">{badge.label}</p>
                  <p className="text-xs text-muted-foreground">{badge.desc}</p>
                </div>
                <Badge
                  className="ml-auto text-xs bg-card border-border"
                  variant="outline"
                >
                  Earned
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <div className="px-4 pb-6 pt-2 flex justify-center">
        <button
          type="button"
          data-ocid="analytics.open_modal_button"
          onClick={() => setShowFeedback(true)}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          <MessageSquare size={12} />
          Give Feedback
        </button>
      </div>

      <FeedbackModal
        open={showFeedback}
        onClose={() => setShowFeedback(false)}
        screenName="Analytics"
      />
    </div>
  );
}
