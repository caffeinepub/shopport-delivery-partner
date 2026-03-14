import { Locate, Navigation, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface LiveMapProps {
  hidePermissionOverlay?: boolean;
  height?: string;
  showOpenInMaps?: boolean;
  className?: string;
  onAddressChange?: (address: string | null) => void;
  onPermissionDenied?: (denied: boolean) => void;
}

export default function LiveMap({
  height = "220px",
  showOpenInMaps = true,
  className = "",
  onAddressChange,
  onPermissionDenied,
  hidePermissionOverlay = false,
}: LiveMapProps) {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState<string | null>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({
    lat: 20.5937,
    lng: 78.9629,
  });
  const [zoom, setZoom] = useState(5);
  const initialFetchDone = useRef(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const updateAddress = (val: string | null) => {
    setAddress(val);
    onAddressChange?.(val);
  };

  const updatePermissionDenied = (denied: boolean) => {
    setPermissionDenied(denied);
    onPermissionDenied?.(denied);
  };

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=16`,
        { headers: { "Accept-Language": "en" } },
      );
      const data = await res.json();
      const addr = data.display_name as string;
      const short = addr.split(",").slice(0, 3).join(", ");
      updateAddress(short);
    } catch {
      // ignore
    }
  };

  const requestLocation = () => {
    if (!("geolocation" in navigator)) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        setCoords({ lat, lng });
        setMapCenter({ lat, lng });
        setZoom(16);
        updatePermissionDenied(false);
        reverseGeocode(lat, lng);
      },
      () => {
        updatePermissionDenied(true);
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 5000 },
    );
  };

  const handleSearch = async () => {
    const q = searchQuery.trim();
    if (!q) return;
    setSearching(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=1`,
        { headers: { "Accept-Language": "en" } },
      );
      const data = await res.json();
      if (data && data.length > 0) {
        const latNum = Number.parseFloat(data[0].lat);
        const lngNum = Number.parseFloat(data[0].lon);
        setMapCenter({ lat: latNum, lng: lngNum });
        setZoom(15);
        const shortAddr = (data[0].display_name as string)
          .split(",")
          .slice(0, 3)
          .join(", ");
        updateAddress(shortAddr);
      }
    } catch {
      // ignore
    } finally {
      setSearching(false);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: geolocation watch only on mount
  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setLoading(false);
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        setCoords({ lat, lng });
        setLoading(false);
        updatePermissionDenied(false);
        if (!initialFetchDone.current) {
          initialFetchDone.current = true;
          setMapCenter({ lat, lng });
          setZoom(16);
          reverseGeocode(lat, lng);
        }
      },
      () => {
        setLoading(false);
        updatePermissionDenied(true);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 5000 },
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  const centerOnMe = () => {
    if (coords) {
      setMapCenter(coords);
      setZoom(17);
    }
  };

  const openInMaps = () => {
    if (coords) {
      window.open(
        `https://maps.google.com/maps?q=${coords.lat},${coords.lng}`,
        "_blank",
      );
    }
  };

  // Build OpenStreetMap embed URL
  const bboxDelta = 0.1 / zoom;
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${mapCenter.lng - bboxDelta},${mapCenter.lat - bboxDelta * 0.5},${mapCenter.lng + bboxDelta},${mapCenter.lat + bboxDelta * 0.5}&layer=mapnik${coords ? `&marker=${coords.lat},${coords.lng}` : ""}`;

  return (
    <div className={`${className}`}>
      {/* Search Box */}
      <div className="flex gap-2 mb-2">
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search location..."
            data-ocid="livemap.search_input"
            className="w-full h-10 pl-4 pr-4 rounded-xl border border-green-500/30 bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-green-500/50"
          />
        </div>
        <button
          type="button"
          data-ocid="livemap.primary_button"
          onClick={handleSearch}
          disabled={searching}
          className="h-10 w-10 rounded-xl bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-colors flex-shrink-0 disabled:opacity-60"
        >
          {searching ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Search size={16} />
          )}
        </button>
      </div>

      {/* Map container */}
      <div
        className="relative rounded-2xl overflow-hidden border border-border"
        style={{ height }}
        data-ocid="livemap.canvas_target"
      >
        {/* OpenStreetMap iframe */}
        <iframe
          ref={iframeRef}
          src={mapSrc}
          title="Live Map"
          className="w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Live location pulsing dot overlay */}
        {coords && !loading && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div className="relative flex items-center justify-center">
              <div
                className="absolute bg-green-400/40 rounded-full animate-ping"
                style={{ width: 36, height: 36 }}
              />
              <div
                className="w-5 h-5 bg-green-500 rounded-full"
                style={{
                  boxShadow: "0 0 0 3px white, 0 2px 10px rgba(34,197,94,0.7)",
                }}
              />
            </div>
          </div>
        )}

        {loading && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center z-20">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-sm text-muted-foreground">
              Getting your location...
            </p>
          </div>
        )}

        {/* Permission denied overlay */}
        {permissionDenied && !loading && !hidePermissionOverlay && (
          <div className="absolute inset-0 bg-background/85 backdrop-blur-sm flex flex-col items-center justify-center z-20 px-6">
            <div className="w-14 h-14 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-4">
              <Locate size={24} className="text-green-500" />
            </div>
            <p className="text-sm font-semibold text-foreground text-center mb-1">
              Location Access Needed
            </p>
            <p className="text-xs text-muted-foreground text-center mb-4">
              Allow location access to see your live position on the map
            </p>
            <button
              type="button"
              data-ocid="livemap.primary_button"
              onClick={requestLocation}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition-colors"
            >
              Allow Location Access
            </button>
          </div>
        )}

        {/* Navigation controls */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <button
            type="button"
            data-ocid="livemap.map_marker"
            onClick={centerOnMe}
            className="w-10 h-10 bg-white border border-gray-200 rounded-xl shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
            title="Center on my location"
          >
            <Locate size={18} className="text-green-500" />
          </button>
          {showOpenInMaps && (
            <button
              type="button"
              data-ocid="livemap.secondary_button"
              onClick={openInMaps}
              className="w-10 h-10 bg-white border border-gray-200 rounded-xl shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
              title="Navigate in Google Maps"
            >
              <Navigation size={18} className="text-green-500" />
            </button>
          )}
        </div>

        {/* You are here label */}
        {coords && !loading && (
          <div className="absolute top-3 left-3 z-10">
            <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full px-3 py-1 shadow-sm">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[11px] font-semibold text-gray-700">
                You are here
              </span>
            </div>
          </div>
        )}

        {!coords && !loading && !permissionDenied && (
          <div className="absolute top-3 left-3 z-10">
            <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full px-3 py-1 shadow-sm">
              <div className="w-2.5 h-2.5 bg-gray-400 rounded-full" />
              <span className="text-[11px] font-semibold text-gray-500">
                Map ready
              </span>
            </div>
          </div>
        )}

        {address && (
          <div className="absolute bottom-0 left-0 right-0 z-10 bg-card/90 backdrop-blur-sm border-t border-border px-3 py-2">
            <p className="text-xs text-foreground font-medium truncate">
              📍 {address}
            </p>
            {coords && (
              <p className="text-[10px] text-muted-foreground">
                {coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
