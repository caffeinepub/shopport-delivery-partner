import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "@tanstack/react-router";
import {
  ArrowLeft,
  Camera,
  Car,
  CheckCircle,
  Clock,
  FileText,
  Loader2,
  MessageSquare,
  Shield,
  Upload,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { ExternalBlob } from "../backend";
import FeedbackModal from "../components/FeedbackModal";
import { useCallerProfile } from "../hooks/useQueries";

const VEHICLE_TYPES = ["Bike", "Car", "Walking", "Cycle"];
const GENDERS = ["Male", "Female", "Other"];
const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

interface DocState {
  label: string;
  icon: typeof FileText;
  status: "pending" | "uploaded" | "uploading";
  progress?: number;
}

const INITIAL_DOCS: DocState[] = [
  { label: "ID Proof (Aadhaar/PAN)", icon: Shield, status: "pending" },
  { label: "Driving License", icon: FileText, status: "pending" },
  { label: "Vehicle RC", icon: Car, status: "pending" },
  { label: "Insurance Certificate", icon: FileText, status: "pending" },
];

export default function EditProfile() {
  const router = useRouter();
  const { data: profile } = useCallerProfile();
  const [name, setName] = useState(profile?.name ?? "");
  const [showFeedback, setShowFeedback] = useState(false);
  const [gender, setGender] = useState("Male");
  const [vehicleType, setVehicleType] = useState("Bike");
  const [houseNo, setHouseNo] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [docs, setDocs] = useState<DocState[]>(INITIAL_DOCS);
  const photoRef = useRef<HTMLInputElement>(null);
  const fileRefs = useRef<(HTMLInputElement | null)[]>([]);

  const needsDocs = vehicleType === "Bike" || vehicleType === "Car";

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      const url = URL.createObjectURL(f);
      setPhotoUrl(url);
    }
  };

  const handleDocUpload = async (idx: number, file: File) => {
    setDocs((prev) =>
      prev.map((d, i) =>
        i === idx ? { ...d, status: "uploading" as const, progress: 0 } : d,
      ),
    );
    const bytes = new Uint8Array(await file.arrayBuffer());
    const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
      setDocs((prev) =>
        prev.map((d, i) => (i === idx ? { ...d, progress: pct } : d)),
      );
    });
    blob.getDirectURL();
    setDocs((prev) =>
      prev.map((d, i) =>
        i === idx ? { ...d, status: "uploaded" as const, progress: 100 } : d,
      ),
    );
    toast.success(`${docs[idx].label} uploaded!`);
  };

  const handleSave = () => {
    toast.success("Profile updated successfully!");
    router.navigate({ to: "/profile" });
  };

  const initials = (name || profile?.name || "DP")
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-dvh bg-background">
      <header className="px-4 pt-12 pb-4 flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          data-ocid="editprofile.secondary_button"
          onClick={() => router.navigate({ to: "/profile" })}
          className="w-9 h-9 rounded-xl"
        >
          <ArrowLeft size={18} />
        </Button>
        <h1 className="text-xl font-display font-bold">Edit Profile</h1>
      </header>

      <div className="px-4 pb-24 space-y-5">
        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-2xl p-5 flex flex-col items-center gap-3"
        >
          <div className="w-24 h-24 rounded-full overflow-hidden bg-primary flex items-center justify-center text-primary-foreground text-2xl font-display font-bold shadow-lg">
            {photoUrl ? (
              <img
                src={photoUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              initials
            )}
          </div>
          <input
            ref={photoRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoChange}
          />
          <Button
            variant="outline"
            data-ocid="editprofile.upload_button"
            onClick={() => photoRef.current?.click()}
            className="flex items-center gap-2 border-primary text-primary hover:bg-primary/10"
          >
            <Camera size={14} /> Change Photo
          </Button>
        </motion.div>

        {/* Personal Info */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-card border border-border rounded-2xl p-5 space-y-4"
        >
          <h3 className="font-display font-bold">Personal Information</h3>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Full Name</Label>
            <Input
              data-ocid="editprofile.input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="bg-muted border-border"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Gender</Label>
            <div className="flex gap-2">
              {GENDERS.map((g) => (
                <button
                  key={g}
                  type="button"
                  data-ocid="editprofile.radio"
                  onClick={() => setGender(g)}
                  className={`flex-1 py-2 px-3 rounded-xl border text-sm font-medium transition-colors ${
                    gender === g
                      ? "border-primary bg-primary/20 text-primary"
                      : "border-border bg-muted text-muted-foreground"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">
              Vehicle Type
            </Label>
            <div className="grid grid-cols-4 gap-2">
              {VEHICLE_TYPES.map((v) => (
                <button
                  key={v}
                  type="button"
                  data-ocid="editprofile.radio"
                  onClick={() => setVehicleType(v)}
                  className={`py-2 px-2 rounded-xl border text-xs font-medium transition-colors ${
                    vehicleType === v
                      ? "border-primary bg-primary/20 text-primary"
                      : "border-border bg-muted text-muted-foreground"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Address */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-2xl p-5 space-y-4"
        >
          <h3 className="font-display font-bold">Address</h3>
          {[
            {
              label: "House / Door Number",
              val: houseNo,
              set: setHouseNo,
              ph: "e.g. 42B",
            },
            {
              label: "Street / Road Name",
              val: street,
              set: setStreet,
              ph: "e.g. MG Road",
            },
            { label: "City", val: city, set: setCity, ph: "e.g. Mumbai" },
            {
              label: "District",
              val: district,
              set: setDistrict,
              ph: "e.g. Mumbai Suburban",
            },
          ].map((field) => (
            <div key={field.label} className="space-y-1">
              <Label className="text-xs text-muted-foreground">
                {field.label}
              </Label>
              <Input
                data-ocid="editprofile.input"
                value={field.val}
                onChange={(e) => field.set(e.target.value)}
                placeholder={field.ph}
                className="bg-muted border-border"
              />
            </div>
          ))}
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">State</Label>
            <select
              data-ocid="editprofile.select"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-muted border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select State</option>
              {INDIAN_STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Documents (only for Bike/Car) */}
        {needsDocs && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-card border border-border rounded-2xl p-5 space-y-4"
          >
            <h3 className="font-display font-bold">Documents</h3>
            <p className="text-xs text-muted-foreground">
              Required for {vehicleType} riders
            </p>
            <div className="space-y-3">
              {docs.map((doc, idx) => (
                <div
                  key={doc.label}
                  data-ocid={`editprofile.item.${idx + 1}`}
                  className="flex items-center gap-3 p-3 bg-muted rounded-xl"
                >
                  <div className="w-9 h-9 bg-card rounded-lg flex items-center justify-center flex-shrink-0">
                    <doc.icon size={16} className="text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{doc.label}</p>
                    {doc.status === "uploading" && (
                      <div className="mt-1">
                        <Progress value={doc.progress} className="h-1" />
                      </div>
                    )}
                    {doc.status === "uploaded" && (
                      <p className="text-xs text-orange-400 flex items-center gap-1 mt-0.5">
                        <CheckCircle size={10} /> Uploaded
                      </p>
                    )}
                    {doc.status === "pending" && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <Clock size={10} /> Not uploaded
                      </p>
                    )}
                  </div>
                  <input
                    ref={(el) => {
                      fileRefs.current[idx] = el;
                    }}
                    type="file"
                    accept="image/*,.pdf"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleDocUpload(idx, f);
                    }}
                  />
                  <Button
                    size="sm"
                    variant={doc.status === "uploaded" ? "outline" : "default"}
                    data-ocid={`editprofile.upload_button.${idx + 1}`}
                    disabled={doc.status === "uploading"}
                    onClick={() => fileRefs.current[idx]?.click()}
                    className={`text-xs px-3 flex-shrink-0 ${
                      doc.status === "uploaded"
                        ? "border-orange-500/40 text-orange-400 hover:bg-orange-500/10"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    {doc.status === "uploading" ? (
                      <Loader2 size={12} className="animate-spin" />
                    ) : doc.status === "uploaded" ? (
                      "Re-upload"
                    ) : (
                      <>
                        <Upload size={12} className="mr-1" />
                        Upload
                      </>
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
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
          data-ocid="editprofile.save_button"
          onClick={handleSave}
          className="w-full bg-primary text-primary-foreground font-bold h-12 rounded-2xl max-w-[430px] mx-auto block"
        >
          Save Changes
        </Button>
      </div>

      <FeedbackModal
        open={showFeedback}
        onClose={() => setShowFeedback(false)}
        screenName="Edit Profile"
      />
    </div>
  );
}
