import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports } from "./index-B3_d8K7p.js";
import { M as MapPin } from "./map-pin-C7ft-ZHa.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 20h.01", key: "zekei9" }],
  ["path", { d: "M8.5 16.429a5 5 0 0 1 7 0", key: "1bycff" }],
  ["path", { d: "M5 12.859a10 10 0 0 1 5.17-2.69", key: "1dl1wf" }],
  ["path", { d: "M19 12.859a10 10 0 0 0-2.007-1.523", key: "4k23kn" }],
  ["path", { d: "M2 8.82a15 15 0 0 1 4.177-2.643", key: "1grhjp" }],
  ["path", { d: "M22 8.82a15 15 0 0 0-11.288-3.764", key: "z3jwby" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
const WifiOff = createLucideIcon("wifi-off", __iconNode);
async function reverseGeocode(lat, lon) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=16`,
      { headers: { "Accept-Language": "en" } }
    );
    const data = await res.json();
    const a = data.address || {};
    const parts = [
      a.house_number,
      a.road,
      a.neighbourhood || a.suburb,
      a.city || a.town || a.village,
      a.state
    ].filter(Boolean);
    return parts.join(", ") || data.display_name || "Location found";
  } catch {
    return "Location found";
  }
}
function LiveLocationBar() {
  const [location, setLocation] = reactExports.useState({
    address: "Detecting location...",
    status: "detecting"
  });
  reactExports.useEffect(() => {
    if (!navigator.geolocation) {
      setLocation({ address: "GPS unavailable", status: "denied" });
      return;
    }
    const watchId = navigator.geolocation.watchPosition(
      async (pos) => {
        const address = await reverseGeocode(
          pos.coords.latitude,
          pos.coords.longitude
        );
        setLocation({ address, status: "found" });
      },
      () => {
        setLocation({ address: "GPS unavailable", status: "denied" });
      },
      { enableHighAccuracy: true, timeout: 1e4 }
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);
  const isDenied = location.status === "denied" || location.status === "error";
  const isDetecting = location.status === "detecting";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-4 mb-3 flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-primary/10 border border-primary/20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex-shrink-0", children: isDenied ? /* @__PURE__ */ jsxRuntimeExports.jsx(WifiOff, { size: 13, className: "text-amber-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: `block w-2.5 h-2.5 rounded-full ${isDetecting ? "bg-amber-400" : "bg-primary"} animate-pulse`
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: `absolute inset-0 rounded-full ${isDetecting ? "bg-amber-400/40" : "bg-primary/30"} animate-ping`
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      MapPin,
      {
        size: 11,
        className: isDenied ? "text-amber-500" : "text-primary flex-shrink-0"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        className: `text-xs truncate leading-none ${isDenied ? "text-amber-600" : isDetecting ? "text-muted-foreground" : "text-primary font-medium"}`,
        children: location.address
      }
    )
  ] });
}
export {
  LiveLocationBar as L
};
