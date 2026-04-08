import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useRouter } from "@tanstack/react-router";
import {
  Car,
  ChevronRight,
  Edit2,
  FileText,
  Globe,
  HelpCircle,
  LogOut,
  MapPin,
  MessageSquare,
  Settings,
  Shield,
  Star,
  User,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import FeedbackModal from "../components/FeedbackModal";
import { useCallerProfile } from "../hooks/useQueries";
import { getUserProfile } from "../lib/userStore";

const RATING_PERIODS = [
  { label: "Today", value: 4.8, deliveries: 7, color: "text-yellow-400" },
  {
    label: "This Month",
    value: 4.7,
    deliveries: 142,
    color: "text-yellow-400",
  },
  {
    label: "This Year",
    value: 4.6,
    deliveries: 1204,
    color: "text-yellow-400",
  },
  {
    label: "All Time Best",
    value: 5.0,
    deliveries: 2850,
    color: "text-green-400",
  },
];

export default function Profile() {
  const [showFeedback, setShowFeedback] = useState(false);
  const router = useRouter();
  const { data: profile } = useCallerProfile();
  const { clear } = useInternetIdentity();
  const storedProfile = getUserProfile();

  const name = storedProfile.name ?? profile?.name ?? "Delivery Partner";
  const partnerId = profile?.partnerId ?? "SP-001";
  const storedVehicle = storedProfile.vehicleType ?? "Bike";
  const storedVehicleNumber = storedProfile.vehicleNumber;
  const storedFuelType = storedProfile.fuelType;
  const initials = name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  const avgRating = 4.8;

  const handleLogout = () => {
    clear();
    window.location.href = "/auth";
  };

  return (
    <div className="min-h-dvh bg-background">
      <header className="px-4 pt-12 pb-4">
        <h1 className="text-2xl font-display font-bold">Profile</h1>
      </header>

      <div className="px-4 space-y-4 pb-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-2xl p-5"
        >
          <div className="flex items-center gap-4">
            {storedProfile.profilePhoto ? (
              <img
                src={storedProfile.profilePhoto}
                alt="Profile"
                className="w-16 h-16 rounded-2xl object-cover flex-shrink-0 shadow-lg border-2 border-primary/30"
              />
            ) : (
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground text-xl font-display font-bold flex-shrink-0 shadow-lg">
                {initials}
              </div>
            )}
            <div className="flex-1">
              <h2 className="text-lg font-display font-bold">{name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <Badge
                  variant="outline"
                  className="text-xs border-green-500/40 text-green-400"
                >
                  Active
                </Badge>
                <div className="flex items-center gap-1 text-xs text-yellow-400">
                  <Star size={12} className="fill-yellow-400" />
                  {avgRating}
                </div>
              </div>
            </div>
          </div>
          <Separator className="my-4 bg-border" />
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <User size={16} className="text-muted-foreground flex-shrink-0" />
              <span className="text-muted-foreground">Partner ID:</span>
              <span className="font-mono text-xs text-foreground">
                {partnerId}
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Car size={16} className="text-muted-foreground flex-shrink-0" />
              <span className="text-muted-foreground">Vehicle:</span>
              <span className="text-foreground capitalize">
                {storedVehicle}
              </span>
              {storedFuelType && (
                <Badge
                  variant="outline"
                  className="text-xs border-primary/40 text-primary ml-1"
                >
                  <Zap size={10} className="mr-1" />
                  {storedFuelType}
                </Badge>
              )}
            </div>
            {storedVehicleNumber && (
              <div className="flex items-center gap-3 text-sm">
                <Car
                  size={16}
                  className="text-muted-foreground flex-shrink-0 opacity-0"
                />
                <span className="text-muted-foreground">Reg. No:</span>
                <span className="font-mono text-xs text-foreground tracking-wider">
                  {storedVehicleNumber}
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Personal Details & Documents Card */}
        {(storedProfile.phone ||
          storedProfile.address ||
          storedProfile.aadhaarDoc ||
          storedProfile.drivingLicenseDoc ||
          storedProfile.rcDoc) && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.03 }}
            className="bg-card border border-border rounded-2xl p-5 space-y-3"
          >
            <h3 className="font-display font-bold text-sm">My Details</h3>
            {storedProfile.phone && (
              <div className="flex items-center gap-3 text-sm">
                <User
                  size={15}
                  className="text-muted-foreground flex-shrink-0"
                />
                <span className="text-muted-foreground">Phone:</span>
                <span className="text-foreground">{storedProfile.phone}</span>
              </div>
            )}
            {storedProfile.address && (
              <div className="flex items-start gap-3 text-sm">
                <MapPin
                  size={15}
                  className="text-muted-foreground flex-shrink-0 mt-0.5"
                />
                <span className="text-muted-foreground flex-shrink-0">
                  Address:
                </span>
                <span className="text-foreground text-xs leading-relaxed">
                  {storedProfile.address}
                </span>
              </div>
            )}
            {(storedProfile.aadhaarDoc ||
              storedProfile.drivingLicenseDoc ||
              storedProfile.rcDoc) && (
              <div className="space-y-2 pt-1 border-t border-border">
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">
                  Documents
                </p>
                {storedProfile.aadhaarDoc && (
                  <div className="flex items-center gap-2 text-xs">
                    <FileText size={13} className="text-primary" />
                    <span className="text-foreground">Aadhaar:</span>
                    <span className="text-muted-foreground truncate">
                      {storedProfile.aadhaarDoc}
                    </span>
                  </div>
                )}
                {storedProfile.drivingLicenseDoc && (
                  <div className="flex items-center gap-2 text-xs">
                    <FileText size={13} className="text-primary" />
                    <span className="text-foreground">Driving License:</span>
                    <span className="text-muted-foreground truncate">
                      {storedProfile.drivingLicenseDoc}
                    </span>
                  </div>
                )}
                {storedProfile.rcDoc && (
                  <div className="flex items-center gap-2 text-xs">
                    <FileText size={13} className="text-primary" />
                    <span className="text-foreground">RC / Insurance:</span>
                    <span className="text-muted-foreground truncate">
                      {storedProfile.rcDoc}
                    </span>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}

        {/* Customer Ratings */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.04 }}
          className="bg-card border border-border rounded-2xl p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <Star size={16} className="text-yellow-400 fill-yellow-400" />
            <h3 className="font-display font-bold">Customer Ratings</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {RATING_PERIODS.map((r) => (
              <div
                key={r.label}
                className="bg-muted rounded-xl p-3 flex flex-col gap-1"
              >
                <p className="text-xs text-muted-foreground">{r.label}</p>
                <div className="flex items-center gap-1">
                  <Star size={14} className={`${r.color} fill-current`} />
                  <span className={`text-xl font-display font-bold ${r.color}`}>
                    {r.value}
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground">
                  {r.deliveries} deliveries
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Navigation Menu */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06 }}
          className="bg-card border border-border rounded-2xl overflow-hidden"
        >
          <button
            type="button"
            data-ocid="profile.edit_button"
            onClick={() => router.navigate({ to: "/profile/edit" })}
            className="w-full flex items-center gap-4 px-4 py-4 hover:bg-muted/50 transition-colors"
          >
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Edit2 size={18} className="text-primary" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-semibold">Edit Profile</p>
              <p className="text-xs text-muted-foreground">
                Update your personal details & documents
              </p>
            </div>
            <ChevronRight size={16} className="text-muted-foreground" />
          </button>
          <Separator className="bg-border mx-4" />
          <button
            type="button"
            data-ocid="profile.settings_button"
            onClick={() => router.navigate({ to: "/profile/edit" })}
            className="w-full flex items-center gap-4 px-4 py-4 hover:bg-muted/50 transition-colors"
          >
            <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center flex-shrink-0">
              <Settings size={18} className="text-muted-foreground" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-semibold">Settings</p>
              <p className="text-xs text-muted-foreground">
                Vehicle, fuel type & app preferences
              </p>
            </div>
            <ChevronRight size={16} className="text-muted-foreground" />
          </button>
          <Separator className="bg-border mx-4" />
          <button
            type="button"
            data-ocid="profile.secondary_button"
            onClick={() => router.navigate({ to: "/profile/language" })}
            className="w-full flex items-center gap-4 px-4 py-4 hover:bg-muted/50 transition-colors"
          >
            <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Globe size={18} className="text-blue-400" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-semibold">Language</p>
              <p className="text-xs text-muted-foreground">
                Select your preferred language
              </p>
            </div>
            <ChevronRight size={16} className="text-muted-foreground" />
          </button>
          <Separator className="bg-border mx-4" />
          <button
            type="button"
            data-ocid="profile.secondary_button"
            onClick={() => router.navigate({ to: "/profile/help" })}
            className="w-full flex items-center gap-4 px-4 py-4 hover:bg-muted/50 transition-colors"
          >
            <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <HelpCircle size={18} className="text-emerald-400" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-semibold">Help & Support</p>
              <p className="text-xs text-muted-foreground">
                Contact us for assistance
              </p>
            </div>
            <ChevronRight size={16} className="text-muted-foreground" />
          </button>
          <Separator className="bg-border mx-4" />
          <button
            type="button"
            data-ocid="profile.secondary_button"
            onClick={() => setShowFeedback(true)}
            className="w-full flex items-center gap-4 px-4 py-4 hover:bg-muted/50 transition-colors"
          >
            <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <MessageSquare size={18} className="text-purple-400" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-semibold">Feedback</p>
              <p className="text-xs text-muted-foreground">
                Share your experience with us
              </p>
            </div>
            <ChevronRight size={16} className="text-muted-foreground" />
          </button>
          <Separator className="bg-border mx-4" />
          <button
            type="button"
            data-ocid="profile.secondary_button"
            onClick={() => router.navigate({ to: "/profile/terms" })}
            className="w-full flex items-center gap-4 px-4 py-4 hover:bg-muted/50 transition-colors"
          >
            <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <FileText size={18} className="text-amber-400" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-semibold">Terms & Conditions</p>
              <p className="text-xs text-muted-foreground">
                Read our delivery partner agreement
              </p>
            </div>
            <ChevronRight size={16} className="text-muted-foreground" />
          </button>
        </motion.div>

        {/* Insurance Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
        >
          <button
            type="button"
            onClick={() => router.navigate({ to: "/insurance" })}
            className="w-full bg-card border border-border rounded-2xl p-4 flex items-center gap-4 hover:border-primary/40 transition-colors"
            data-ocid="profile.card"
          >
            <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Shield size={20} className="text-primary" />
            </div>
            <div className="flex-1 text-left">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-sm">Insurance</p>
                <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-xs border px-2 py-0">
                  Coming Soon
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                View details & apply for coverage
              </p>
            </div>
            <ChevronRight
              size={16}
              className="text-muted-foreground flex-shrink-0"
            />
          </button>
        </motion.div>

        <Button
          data-ocid="profile.delete_button"
          variant="outline"
          onClick={handleLogout}
          className="w-full border-destructive text-destructive hover:bg-destructive/10 font-semibold h-12 rounded-2xl"
        >
          <LogOut size={16} className="mr-2" /> Sign Out
        </Button>

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
        screenName="Profile"
      />
    </div>
  );
}
