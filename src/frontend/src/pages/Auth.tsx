import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "@tanstack/react-router";
import {
  Bike,
  Camera,
  Car,
  CheckCircle2,
  ChevronRight,
  Footprints,
  Globe,
  Loader2,
  MapPin,
  Phone,
  ShieldCheck,
  Upload,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import LiveMap from "../components/LiveMap";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useSaveProfile } from "../hooks/useQueries";

type Step =
  | "terms"
  | "phone"
  | "otp"
  | "personalDetails"
  | "language"
  | "location";

const LANGUAGES = [
  { script: "हिन्दी", english: "Hindi" },
  { script: "বাংলা", english: "Bengali" },
  { script: "తెలుగు", english: "Telugu" },
  { script: "मराठी", english: "Marathi" },
  { script: "தமிழ்", english: "Tamil" },
  { script: "اردو", english: "Urdu" },
  { script: "ગુજરાતી", english: "Gujarati" },
  { script: "ಕನ್ನಡ", english: "Kannada" },
  { script: "ओड़िया", english: "Odia" },
  { script: "മലയാളം", english: "Malayalam" },
  { script: "ਪੰਜਾਬੀ", english: "Punjabi" },
  { script: "অসমীয়া", english: "Assamese" },
  { script: "मैथिली", english: "Maithili" },
  { script: "संस्कृतम्", english: "Sanskrit" },
  { script: "डोगरी", english: "Dogri" },
  { script: "नेपाली", english: "Nepali" },
  { script: "सिन्धी", english: "Sindhi" },
  { script: "कोंकणी", english: "Konkani" },
  { script: "বোড়ো", english: "Bodo" },
  { script: "সাঁওতালি", english: "Santali" },
  { script: "मणिपुरी", english: "Manipuri" },
  { script: "कश्मीरी", english: "Kashmiri" },
];

const TC_POINTS = [
  "Location access is required to find nearby shops and deliveries.",
  "Delivery charges are calculated based on distance and order type.",
  "Additional delivery charges may apply for multiple products or multiple shops.",
  "Night deliveries and deliveries during rain may include extra charges.",
  "Delivery partners are responsible for their own vehicle safety and personal protection.",
  "Health and safety guidelines must be followed by delivery partners.",
  "Orders cancelled or returned may include applicable delivery charges.",
  "Shopport platform connects customers, shops, and delivery partners for local deliveries.",
  "Delivery charges and policies may be updated in future updates.",
  "By continuing, you agree to follow the platform policies.",
];

const VEHICLE_TYPES = [
  { id: "bike", label: "Bike", icon: Bike },
  { id: "car", label: "Car", icon: Car },
  { id: "walking", label: "Walking", icon: Footprints },
  { id: "cycle", label: "Cycle", icon: Bike },
];

const COUNTRY_CODES = [
  { code: "+91", name: "India", flag: "🇮🇳" },
  { code: "+1", name: "USA / Canada", flag: "🇺🇸" },
  { code: "+44", name: "United Kingdom", flag: "🇬🇧" },
  { code: "+971", name: "UAE", flag: "🇦🇪" },
  { code: "+966", name: "Saudi Arabia", flag: "🇸🇦" },
  { code: "+965", name: "Kuwait", flag: "🇰🇼" },
  { code: "+974", name: "Qatar", flag: "🇶🇦" },
  { code: "+973", name: "Bahrain", flag: "🇧🇭" },
  { code: "+968", name: "Oman", flag: "🇴🇲" },
  { code: "+61", name: "Australia", flag: "🇦🇺" },
  { code: "+49", name: "Germany", flag: "🇩🇪" },
  { code: "+33", name: "France", flag: "🇫🇷" },
  { code: "+39", name: "Italy", flag: "🇮🇹" },
  { code: "+34", name: "Spain", flag: "🇪🇸" },
  { code: "+7", name: "Russia", flag: "🇷🇺" },
  { code: "+86", name: "China", flag: "🇨🇳" },
  { code: "+81", name: "Japan", flag: "🇯🇵" },
  { code: "+65", name: "Singapore", flag: "🇸🇬" },
  { code: "+60", name: "Malaysia", flag: "🇲🇾" },
  { code: "+66", name: "Thailand", flag: "🇹🇭" },
  { code: "+880", name: "Bangladesh", flag: "🇧🇩" },
  { code: "+92", name: "Pakistan", flag: "🇵🇰" },
  { code: "+94", name: "Sri Lanka", flag: "🇱🇰" },
  { code: "+977", name: "Nepal", flag: "🇳🇵" },
  { code: "+972", name: "Israel", flag: "🇮🇱" },
  { code: "+27", name: "South Africa", flag: "🇿🇦" },
  { code: "+55", name: "Brazil", flag: "🇧🇷" },
  { code: "+52", name: "Mexico", flag: "🇲🇽" },
  { code: "+62", name: "Indonesia", flag: "🇮🇩" },
  { code: "+63", name: "Philippines", flag: "🇵🇭" },
];

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

const COUNTRIES_190 = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Democratic Republic of the Congo",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Ivory Coast",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

export default function Auth() {
  const router = useRouter();
  const { login, loginStatus } = useInternetIdentity();
  const { mutateAsync: saveProfile } = useSaveProfile();
  const [step, setStep] = useState<Step>("terms");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [tcAccepted, setTcAccepted] = useState(false);
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  // Personal details
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string | null>(null);
  const [photoConfirmed, setPhotoConfirmed] = useState(false);
  const [name, setName] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "">("");
  const [vehicleType, setVehicleType] = useState("");
  const [handicap, setHandicap] = useState<"yes" | "no" | "">("");
  const [houseStreet, setHouseStreet] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("India");
  const [dlUploaded, setDlUploaded] = useState(false);
  const [rcUploaded, setRcUploaded] = useState(false);
  const [aadhaarUploaded, setAadhaarUploaded] = useState(false);
  const dlRef = useRef<HTMLInputElement>(null);
  const rcRef = useRef<HTMLInputElement>(null);
  const aadhaarRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLInputElement>(null);

  // Location
  const [locating, setLocating] = useState(false);
  const [locationName, setLocationName] = useState("");
  const [locationTyped, setLocationTyped] = useState("");

  useEffect(() => {
    if (step === "location") {
      setLocating(true);
      const t = setTimeout(() => {
        setLocating(false);
        setLocationName("New Delhi, India");
      }, 1500);
      return () => clearTimeout(t);
    }
  }, [step]);

  const handlePhoneSubmit = () => {
    if (phone.length < 7) {
      toast.error("Enter a valid phone number");
      return;
    }
    setStep("otp");
    toast.success("OTP sent! Use 1234 to verify");
  };

  const handleOtpSubmit = () => {
    if (otp.length !== 4) {
      toast.error("Enter 4-digit OTP");
      return;
    }
    setStep("personalDetails");
  };

  const handlePersonalDetailsSubmit = () => {
    if (!name.trim()) {
      toast.error("Enter your name");
      return;
    }
    if (!gender) {
      toast.error("Select your gender");
      return;
    }
    if (!vehicleType) {
      toast.error("Select your vehicle type");
      return;
    }
    if (!handicap) {
      toast.error("Select physical handicap status");
      return;
    }
    if (!aadhaarUploaded) {
      toast.error("Please upload your Aadhaar Card");
      return;
    }
    setStep("language");
  };

  const handleLanguageSubmit = () => {
    if (!selectedLanguage) {
      toast.error("Please select a language");
      return;
    }
    setStep("location");
  };

  const handleLocationConfirm = async () => {
    setLoading(true);
    try {
      await login();
      await saveProfile({
        name: name.trim(),
        partnerId: `SP-${String(Math.floor(Math.random() * 900) + 100)}`,
      });
      toast.success("Welcome aboard!");
      router.navigate({ to: "/dashboard" });
    } catch {
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-dvh bg-background flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <img
            src="/assets/uploads/image-1.png"
            alt="Shopport Logo"
            className="w-20 h-20 rounded-2xl object-cover mb-3 shadow-glow"
            onError={(e) => {
              const t = e.currentTarget;
              t.style.display = "none";
              const next = t.nextElementSibling as HTMLElement | null;
              if (next) next.style.display = "flex";
            }}
          />
          <div
            className="w-20 h-20 bg-primary rounded-2xl items-center justify-center mb-3 shadow-glow hidden"
            aria-hidden="true"
          >
            <span className="text-primary-foreground text-3xl font-bold">
              S
            </span>
          </div>
          <h1 className="text-3xl font-display font-bold text-foreground">
            Shopport
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Delivery Partner App
          </p>
        </div>

        <AnimatePresence mode="wait">
          {step === "terms" && (
            <motion.div
              key="terms"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div>
                <h2 className="text-lg font-display font-bold mb-1">
                  Terms & Conditions
                </h2>
                <p className="text-muted-foreground text-xs">
                  Before continuing, please read and accept our Terms &
                  Conditions.
                </p>
              </div>
              <ScrollArea className="h-56 bg-card border border-border rounded-2xl p-4">
                <ol className="space-y-3">
                  {TC_POINTS.map((point, i) => (
                    <li key={point} className="flex gap-3 text-sm">
                      <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex-shrink-0 flex items-center justify-center text-xs font-bold">
                        {i + 1}
                      </span>
                      <span className="text-muted-foreground leading-relaxed">
                        {point}
                      </span>
                    </li>
                  ))}
                </ol>
              </ScrollArea>
              <div className="flex items-start gap-3 p-3 bg-card border border-border rounded-xl">
                <Checkbox
                  id="tc-accept"
                  data-ocid="auth.checkbox"
                  checked={tcAccepted}
                  onCheckedChange={(v) => setTcAccepted(!!v)}
                  className="mt-0.5"
                />
                <Label
                  htmlFor="tc-accept"
                  className="text-sm leading-relaxed cursor-pointer"
                >
                  I have read and agree to the Terms & Conditions
                </Label>
              </div>
              <Button
                data-ocid="auth.primary_button"
                disabled={!tcAccepted}
                onClick={() => setStep("phone")}
                className="w-full bg-primary text-primary-foreground font-semibold h-12"
              >
                <ShieldCheck size={16} className="mr-2" /> Accept & Continue
              </Button>
              <button
                type="button"
                data-ocid="auth.secondary_button"
                onClick={() => setStep("phone")}
                className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
              >
                Skip
              </button>
            </motion.div>
          )}

          {step === "phone" && (
            <motion.div
              key="phone"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div>
                <h2 className="text-xl font-display font-bold mb-1">
                  Get Started
                </h2>
                <p className="text-muted-foreground text-sm">
                  Enter your mobile number to continue
                </p>
              </div>
              <div className="space-y-2">
                <Label>Country Code</Label>
                <Select value={countryCode} onValueChange={setCountryCode}>
                  <SelectTrigger
                    data-ocid="auth.select"
                    className="bg-card border-border w-full"
                  >
                    <SelectValue>
                      {(() => {
                        const found = COUNTRY_CODES.find(
                          (c) => c.code === countryCode,
                        );
                        return found
                          ? `${found.flag} ${found.name} (${found.code})`
                          : countryCode;
                      })()}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="max-h-64">
                    {COUNTRY_CODES.map((c) => (
                      <SelectItem key={c.code + c.name} value={c.code}>
                        {c.flag} {c.name} ({c.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Mobile Number</Label>
                <div className="flex gap-2">
                  <div className="flex items-center px-3 bg-card border border-border rounded-lg text-muted-foreground text-sm whitespace-nowrap">
                    {countryCode}
                  </div>
                  <Input
                    id="phone"
                    data-ocid="auth.input"
                    type="tel"
                    placeholder="9876543210"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value.replace(/\D/g, "").slice(0, 12))
                    }
                    className="bg-card border-border"
                    onKeyDown={(e) => e.key === "Enter" && handlePhoneSubmit()}
                  />
                </div>
              </div>
              <Button
                data-ocid="auth.primary_button"
                onClick={handlePhoneSubmit}
                className="w-full bg-primary text-primary-foreground font-semibold h-12"
              >
                <Phone size={16} className="mr-2" /> Send OTP
              </Button>
            </motion.div>
          )}

          {step === "otp" && (
            <motion.div
              key="otp"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div>
                <h2 className="text-xl font-display font-bold mb-1">
                  Verify OTP
                </h2>
                <p className="text-muted-foreground text-sm">
                  Sent to {countryCode} {phone}. Use{" "}
                  <span className="text-primary font-bold">1234</span>
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="otp">4-Digit OTP</Label>
                <Input
                  id="otp"
                  data-ocid="auth.input"
                  type="number"
                  placeholder="1234"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.slice(0, 4))}
                  className="bg-card border-border text-center text-2xl tracking-[0.5em] font-bold"
                  onKeyDown={(e) => e.key === "Enter" && handleOtpSubmit()}
                />
              </div>
              <Button
                data-ocid="auth.primary_button"
                onClick={handleOtpSubmit}
                className="w-full bg-primary text-primary-foreground font-semibold h-12"
              >
                <ShieldCheck size={16} className="mr-2" /> Verify OTP
              </Button>
              <Button
                variant="ghost"
                data-ocid="auth.secondary_button"
                onClick={() => setStep("phone")}
                className="w-full text-muted-foreground"
              >
                Change Number
              </Button>
            </motion.div>
          )}

          {step === "personalDetails" && (
            <motion.div
              key="personalDetails"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div>
                <h2 className="text-xl font-display font-bold mb-1">
                  Personal Details
                </h2>
                <p className="text-muted-foreground text-sm">
                  Complete your profile to start delivering
                </p>
              </div>

              {/* Profile Photo */}
              <div className="flex flex-col items-center gap-3">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-card border-2 border-dashed border-border flex items-center justify-center">
                  {photoPreviewUrl ? (
                    <img
                      src={photoPreviewUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Camera size={32} className="text-muted-foreground" />
                  )}
                </div>
                <input
                  ref={cameraRef}
                  type="file"
                  accept="image/*"
                  capture="user"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) {
                      setPhotoPreviewUrl(URL.createObjectURL(f));
                      setPhotoConfirmed(false);
                    }
                  }}
                />
                <input
                  ref={galleryRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) {
                      setPhotoPreviewUrl(URL.createObjectURL(f));
                      setPhotoConfirmed(false);
                    }
                  }}
                />
                {!photoPreviewUrl ? (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      data-ocid="auth.upload_button"
                      onClick={() => cameraRef.current?.click()}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card text-sm font-medium hover:border-primary/50 transition-colors"
                    >
                      <Camera size={14} className="text-primary" /> Take Photo
                    </button>
                    <button
                      type="button"
                      data-ocid="auth.upload_button"
                      onClick={() => galleryRef.current?.click()}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card text-sm font-medium hover:border-primary/50 transition-colors"
                    >
                      <Upload size={14} className="text-primary" /> Upload
                    </button>
                  </div>
                ) : photoConfirmed ? (
                  <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
                    <CheckCircle2 size={16} /> Photo confirmed
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setPhotoPreviewUrl(null);
                        setPhotoConfirmed(false);
                      }}
                      className="px-4 py-2 rounded-xl border border-border bg-card text-sm font-medium text-muted-foreground"
                    >
                      Retake
                    </button>
                    <button
                      type="button"
                      data-ocid="auth.confirm_button"
                      onClick={() => setPhotoConfirmed(true)}
                      className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-bold"
                    >
                      Confirm Photo
                    </button>
                  </div>
                )}
              </div>

              {/* Name */}
              <div className="space-y-1">
                <Label>Full Name</Label>
                <Input
                  data-ocid="auth.input"
                  placeholder="Ravi Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-card border-border"
                />
              </div>

              {/* Gender */}
              <div className="space-y-1">
                <Label>Gender</Label>
                <div className="flex gap-2">
                  {["male", "female"].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGender(g as "male" | "female")}
                      className={`flex-1 py-2.5 rounded-xl border text-sm font-semibold transition-colors ${
                        gender === g
                          ? "bg-primary/20 border-primary text-primary"
                          : "bg-card border-border text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      {g === "male" ? "Male" : "Female"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Vehicle Type (always shown) */}
              <div className="space-y-1">
                <Label>Vehicle Type</Label>
                <div className="grid grid-cols-4 gap-2">
                  {VEHICLE_TYPES.map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setVehicleType(id)}
                      className={`flex flex-col items-center gap-1 py-3 rounded-xl border text-xs font-medium transition-colors ${
                        vehicleType === id
                          ? "bg-primary/20 border-primary text-primary"
                          : "bg-card border-border text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      <Icon size={18} />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Physical Handicap */}
              <div className="space-y-1">
                <Label>Physical Handicap</Label>
                <div className="flex gap-2">
                  {["yes", "no"].map((h) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => setHandicap(h as "yes" | "no")}
                      className={`flex-1 py-2.5 rounded-xl border text-sm font-semibold transition-colors ${
                        handicap === h
                          ? "bg-primary/20 border-primary text-primary"
                          : "bg-card border-border text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      {h === "yes" ? "Yes" : "No"}
                    </button>
                  ))}
                </div>
              </div>

              {/* License docs if NOT handicap AND using vehicle */}
              {handicap === "no" &&
                (vehicleType === "bike" || vehicleType === "car") && (
                  <div className="space-y-2">
                    <Label>Driving License</Label>
                    <input
                      ref={dlRef}
                      type="file"
                      accept="image/*,.pdf"
                      className="hidden"
                      onChange={() => setDlUploaded(true)}
                    />
                    <button
                      type="button"
                      data-ocid="auth.upload_button"
                      onClick={() => dlRef.current?.click()}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-colors ${
                        dlUploaded
                          ? "border-green-500/40 bg-green-500/10 text-green-400"
                          : "border-dashed border-border bg-card text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      <Upload size={16} />
                      <span className="text-sm">
                        {dlUploaded
                          ? "Driving License uploaded ✓"
                          : "Upload Driving License"}
                      </span>
                    </button>

                    <Label>RC License / Insurance Book</Label>
                    <input
                      ref={rcRef}
                      type="file"
                      accept="image/*,.pdf"
                      className="hidden"
                      onChange={() => setRcUploaded(true)}
                    />
                    <button
                      type="button"
                      data-ocid="auth.upload_button"
                      onClick={() => rcRef.current?.click()}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-colors ${
                        rcUploaded
                          ? "border-green-500/40 bg-green-500/10 text-green-400"
                          : "border-dashed border-border bg-card text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      <Upload size={16} />
                      <span className="text-sm">
                        {rcUploaded
                          ? "RC / Insurance uploaded ✓"
                          : "Upload RC License / Insurance Book"}
                      </span>
                    </button>
                  </div>
                )}

              {/* Address */}
              <div className="space-y-2">
                <Label className="text-base font-semibold">Address</Label>
                <Input
                  placeholder="House Number & Street"
                  value={houseStreet}
                  onChange={(e) => setHouseStreet(e.target.value)}
                  className="bg-card border-border"
                />
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="bg-card border-border"
                  />
                  <Input
                    placeholder="District"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="bg-card border-border"
                  />
                </div>
                <Select value={state} onValueChange={setState}>
                  <SelectTrigger
                    data-ocid="auth.select"
                    className="bg-card border-border"
                  >
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent className="max-h-64">
                    {INDIAN_STATES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger
                    data-ocid="auth.select"
                    className="bg-card border-border"
                  >
                    <SelectValue placeholder="Select Country" />
                  </SelectTrigger>
                  <SelectContent className="max-h-64">
                    {COUNTRIES_190.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Aadhaar Card (mandatory) */}
              <div className="space-y-1">
                <Label>
                  Aadhaar Card{" "}
                  <span className="text-destructive text-xs font-normal">
                    (Mandatory)
                  </span>
                </Label>
                <input
                  ref={aadhaarRef}
                  type="file"
                  accept="image/*,.pdf"
                  className="hidden"
                  onChange={() => setAadhaarUploaded(true)}
                />
                <button
                  type="button"
                  data-ocid="auth.upload_button"
                  onClick={() => aadhaarRef.current?.click()}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-colors ${
                    aadhaarUploaded
                      ? "border-green-500/40 bg-green-500/10 text-green-400"
                      : "border-dashed border-border bg-card text-muted-foreground hover:border-primary/50"
                  }`}
                >
                  <Upload size={16} />
                  <span className="text-sm">
                    {aadhaarUploaded
                      ? "Aadhaar Card uploaded ✓"
                      : "Upload Aadhaar Card"}
                  </span>
                </button>
              </div>

              <Button
                data-ocid="auth.submit_button"
                onClick={handlePersonalDetailsSubmit}
                className="w-full bg-primary text-primary-foreground font-semibold h-12"
              >
                Continue <ChevronRight size={16} className="ml-1" />
              </Button>
            </motion.div>
          )}

          {step === "language" && (
            <motion.div
              key="language"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Globe size={20} className="text-primary" />
                  <h2 className="text-xl font-display font-bold">
                    भाषा चुनें / Choose Language
                  </h2>
                </div>
                <p className="text-muted-foreground text-sm">
                  Select your preferred language to continue
                </p>
              </div>

              <ScrollArea className="h-72">
                <div className="grid grid-cols-2 gap-2.5 pr-3">
                  {LANGUAGES.map((lang) => (
                    <motion.button
                      key={lang.english}
                      type="button"
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setSelectedLanguage(lang.english)}
                      className={`relative flex flex-col items-center py-3 px-2 rounded-2xl border-2 transition-all ${
                        selectedLanguage === lang.english
                          ? "border-primary bg-primary/10"
                          : "border-border bg-card hover:border-primary/40"
                      }`}
                    >
                      <span className="text-lg font-bold">{lang.script}</span>
                      <span className="text-[10px] text-muted-foreground mt-0.5">
                        {lang.english}
                      </span>
                      {selectedLanguage === lang.english && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-1.5 right-1.5"
                        >
                          <CheckCircle2 size={14} className="text-primary" />
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </ScrollArea>

              <Button
                data-ocid="language.primary_button"
                disabled={!selectedLanguage}
                onClick={handleLanguageSubmit}
                className="w-full bg-primary text-primary-foreground font-semibold h-12"
              >
                <ChevronRight size={16} className="mr-2" />
                {selectedLanguage
                  ? `Continue in ${selectedLanguage}`
                  : "Select a Language"}
              </Button>
              <button
                type="button"
                onClick={() => setStep("location")}
                className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
              >
                Skip
              </button>
            </motion.div>
          )}

          {step === "location" && (
            <motion.div
              key="location"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
              <div>
                <h2 className="text-xl font-display font-bold mb-1">
                  Confirm Your Location
                </h2>
                <p className="text-muted-foreground text-sm">
                  We need your location to assign nearby deliveries
                </p>
              </div>

              {/* Live Map */}
              <div
                className="relative w-full rounded-2xl overflow-hidden"
                data-ocid="auth.map_marker"
              >
                <LiveMap
                  height="300px"
                  showOpenInMaps={false}
                  hidePermissionOverlay={true}
                />
                {locating && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm rounded-2xl">
                    <Loader2 size={28} className="text-primary animate-spin" />
                  </div>
                )}
                {/* Navigation dot bottom-right */}
                <div className="absolute bottom-3 right-3 flex flex-col gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      setLocating(true);
                      setTimeout(() => {
                        setLocating(false);
                        setLocationName("New Delhi, India");
                      }, 1000);
                    }}
                    className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg"
                    title="Re-center"
                  >
                    <MapPin size={18} className="text-primary-foreground" />
                  </button>
                </div>
              </div>

              {locationName && (
                <div className="flex items-start gap-2 p-3 bg-card border border-border rounded-xl">
                  <MapPin
                    size={16}
                    className="text-primary flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Detected Location
                    </p>
                    <p className="text-sm font-medium">{locationName}</p>
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <Label>Enter Location (Optional)</Label>
                <Input
                  placeholder="Type your location..."
                  value={locationTyped}
                  onChange={(e) => setLocationTyped(e.target.value)}
                  className="bg-card border-border"
                />
              </div>

              <Button
                data-ocid="auth.primary_button"
                onClick={handleLocationConfirm}
                disabled={loading || loginStatus === "logging-in"}
                className="w-full bg-primary text-primary-foreground font-semibold h-12"
              >
                {loading ? (
                  <Loader2 size={16} className="mr-2 animate-spin" />
                ) : (
                  <MapPin size={16} className="mr-2" />
                )}
                {loading ? "Registering..." : "Confirm Location & Continue"}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
