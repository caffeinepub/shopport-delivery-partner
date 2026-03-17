import { MapPin, WifiOff } from "lucide-react";
import { useEffect, useState } from "react";

interface LocationState {
  address: string;
  status: "detecting" | "found" | "denied" | "error";
}

async function reverseGeocode(lat: number, lon: number): Promise<string> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=16`,
      { headers: { "Accept-Language": "en" } },
    );
    const data = await res.json();
    const a = data.address || {};
    const parts = [
      a.house_number,
      a.road,
      a.neighbourhood || a.suburb,
      a.city || a.town || a.village,
      a.state,
    ].filter(Boolean);
    return parts.join(", ") || data.display_name || "Location found";
  } catch {
    return "Location found";
  }
}

export default function LiveLocationBar() {
  const [location, setLocation] = useState<LocationState>({
    address: "Detecting location...",
    status: "detecting",
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation({ address: "GPS unavailable", status: "denied" });
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      async (pos) => {
        const address = await reverseGeocode(
          pos.coords.latitude,
          pos.coords.longitude,
        );
        setLocation({ address, status: "found" });
      },
      () => {
        setLocation({ address: "GPS unavailable", status: "denied" });
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  const isDenied = location.status === "denied" || location.status === "error";
  const isDetecting = location.status === "detecting";

  return (
    <div className="mx-4 mb-3 flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-primary/10 border border-primary/20">
      <div className="relative flex-shrink-0">
        {isDenied ? (
          <WifiOff size={13} className="text-amber-500" />
        ) : (
          <>
            <span
              className={`block w-2.5 h-2.5 rounded-full ${
                isDetecting ? "bg-amber-400" : "bg-primary"
              } animate-pulse`}
            />
            <span
              className={`absolute inset-0 rounded-full ${
                isDetecting ? "bg-amber-400/40" : "bg-primary/30"
              } animate-ping`}
            />
          </>
        )}
      </div>
      <MapPin
        size={11}
        className={isDenied ? "text-amber-500" : "text-primary flex-shrink-0"}
      />
      <p
        className={`text-xs truncate leading-none ${
          isDenied
            ? "text-amber-600"
            : isDetecting
              ? "text-muted-foreground"
              : "text-primary font-medium"
        }`}
      >
        {location.address}
      </p>
    </div>
  );
}
