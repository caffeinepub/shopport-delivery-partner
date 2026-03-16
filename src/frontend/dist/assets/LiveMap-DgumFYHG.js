import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports } from "./index-CwnI3Qka.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["line", { x1: "2", x2: "5", y1: "12", y2: "12", key: "bvdh0s" }],
  ["line", { x1: "19", x2: "22", y1: "12", y2: "12", key: "1tbv5k" }],
  ["line", { x1: "12", x2: "12", y1: "2", y2: "5", key: "11lu5j" }],
  ["line", { x1: "12", x2: "12", y1: "19", y2: "22", key: "x3vr5v" }],
  ["circle", { cx: "12", cy: "12", r: "7", key: "fim9np" }]
];
const Locate = createLucideIcon("locate", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
];
const MapPin = createLucideIcon("map-pin", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["polygon", { points: "3 11 22 2 13 21 11 13 3 11", key: "1ltx0t" }]
];
const Navigation = createLucideIcon("navigation", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
function LiveMap({
  height = "220px",
  showOpenInMaps = true,
  className = "",
  onAddressChange,
  onPermissionDenied,
  hidePermissionOverlay = false
}) {
  const [coords, setCoords] = reactExports.useState(
    null
  );
  const [loading, setLoading] = reactExports.useState(true);
  const [address, setAddress] = reactExports.useState(null);
  const [permissionDenied, setPermissionDenied] = reactExports.useState(false);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [searching, setSearching] = reactExports.useState(false);
  const [mapCenter, setMapCenter] = reactExports.useState({
    lat: 20.5937,
    lng: 78.9629
  });
  const [zoom, setZoom] = reactExports.useState(5);
  const initialFetchDone = reactExports.useRef(false);
  const iframeRef = reactExports.useRef(null);
  const updateAddress = (val) => {
    setAddress(val);
    onAddressChange == null ? void 0 : onAddressChange(val);
  };
  const updatePermissionDenied = (denied) => {
    setPermissionDenied(denied);
    onPermissionDenied == null ? void 0 : onPermissionDenied(denied);
  };
  const reverseGeocode = async (lat, lng) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=16`,
        { headers: { "Accept-Language": "en" } }
      );
      const data = await res.json();
      const addrObj = data.address || {};
      const parts = [
        addrObj.house_number,
        addrObj.road || addrObj.pedestrian,
        addrObj.neighbourhood || addrObj.suburb,
        addrObj.city || addrObj.town || addrObj.village,
        addrObj.state_district,
        addrObj.state
      ].filter(Boolean);
      const fullAddr = parts.length > 0 ? parts.join(", ") : data.display_name.split(",").slice(0, 5).join(", ");
      updateAddress(fullAddr);
    } catch {
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
      { enableHighAccuracy: true, timeout: 15e3, maximumAge: 5e3 }
    );
  };
  const handleSearch = async () => {
    const q = searchQuery.trim();
    if (!q) return;
    setSearching(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=1`,
        { headers: { "Accept-Language": "en" } }
      );
      const data = await res.json();
      if (data && data.length > 0) {
        const latNum = Number.parseFloat(data[0].lat);
        const lngNum = Number.parseFloat(data[0].lon);
        setMapCenter({ lat: latNum, lng: lngNum });
        setZoom(15);
        const shortAddr = data[0].display_name.split(",").slice(0, 3).join(", ");
        updateAddress(shortAddr);
      }
    } catch {
    } finally {
      setSearching(false);
    }
  };
  reactExports.useEffect(() => {
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
      { enableHighAccuracy: true, timeout: 15e3, maximumAge: 5e3 }
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
        "_blank"
      );
    }
  };
  const bboxDelta = 0.1 / zoom;
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${mapCenter.lng - bboxDelta},${mapCenter.lat - bboxDelta * 0.5},${mapCenter.lng + bboxDelta},${mapCenter.lat + bboxDelta * 0.5}&layer=mapnik${coords ? `&marker=${coords.lat},${coords.lng}` : ""}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `${className}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          value: searchQuery,
          onChange: (e) => setSearchQuery(e.target.value),
          onKeyDown: (e) => e.key === "Enter" && handleSearch(),
          placeholder: "Search location...",
          "data-ocid": "livemap.search_input",
          className: "w-full h-10 pl-4 pr-4 rounded-xl border border-green-500/30 bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-green-500/50"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "data-ocid": "livemap.primary_button",
          onClick: handleSearch,
          disabled: searching,
          className: "h-10 w-10 rounded-xl bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-colors flex-shrink-0 disabled:opacity-60",
          children: searching ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 16 })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "relative rounded-2xl overflow-hidden border border-border",
        style: { height },
        "data-ocid": "livemap.canvas_target",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "iframe",
            {
              ref: iframeRef,
              src: mapSrc,
              title: "Live Map",
              className: "w-full h-full border-0",
              loading: "lazy",
              referrerPolicy: "no-referrer"
            }
          ),
          coords && !loading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute bg-green-400/40 rounded-full animate-ping",
                style: { width: 36, height: 36 }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-5 h-5 bg-green-500 rounded-full",
                style: {
                  boxShadow: "0 0 0 3px white, 0 2px 10px rgba(34,197,94,0.7)"
                }
              }
            )
          ] }) }),
          loading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center z-20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Getting your location..." })
          ] }),
          permissionDenied && !loading && !hidePermissionOverlay && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 bg-background/85 backdrop-blur-sm flex flex-col items-center justify-center z-20 px-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Locate, { size: 24, className: "text-green-500" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground text-center mb-1", children: "Location Access Needed" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center mb-4", children: "Allow location access to see your live position on the map" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": "livemap.primary_button",
                onClick: requestLocation,
                className: "bg-green-500 hover:bg-green-600 text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition-colors",
                children: "Allow Location Access"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-3 right-3 flex flex-col gap-2 z-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": "livemap.map_marker",
                onClick: centerOnMe,
                className: "w-10 h-10 bg-white border border-gray-200 rounded-xl shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors",
                title: "Center on my location",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Locate, { size: 18, className: "text-green-500" })
              }
            ),
            showOpenInMaps && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": "livemap.secondary_button",
                onClick: openInMaps,
                className: "w-10 h-10 bg-white border border-gray-200 rounded-xl shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors",
                title: "Navigate in Google Maps",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { size: 18, className: "text-green-500" })
              }
            )
          ] }),
          coords && !loading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-3 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full px-3 py-1 shadow-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-semibold text-gray-700", children: "You are here" })
          ] }) }),
          !coords && !loading && !permissionDenied && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-3 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full px-3 py-1 shadow-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2.5 h-2.5 bg-gray-400 rounded-full" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-semibold text-gray-500", children: "Map ready" })
          ] }) }),
          address && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 right-0 z-10 bg-card/90 backdrop-blur-sm border-t border-border px-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-foreground font-medium truncate", children: [
            "📍 ",
            address
          ] }) })
        ]
      }
    )
  ] });
}
export {
  LiveMap as L,
  MapPin as M,
  Navigation as N
};
