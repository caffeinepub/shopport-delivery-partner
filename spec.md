# Shopport Delivery Partner

## Current State
- App theme is orange (OKLCH hue 50)
- Confirm Your Location: has Live Location button, address fills 3 parts only
- Dashboard: fixed 5 KM radius circle overlay on map, no user selection
- ActiveOrder: "Live Navigation" section header, single map, route card opens Google Maps externally; no two-route visual on map
- LiveMap: uses orange for all UI accents
- Map: OpenStreetMap iframe embed

## Requested Changes (Diff)

### Add
- Dashboard: KM radius selector (chips: 1, 2, 3, 5, 10 km) above or below map; green circle dynamically resizes on map overlay based on selection
- ActiveOrder: Two route indicator cards on map: (1) Your location → Shop, (2) Shop → Customer; both clearly labeled
- Auth location step: ensure full address (street, area, city, etc.) auto-fills the Enter Location field (use more address parts from reverse geocode)

### Modify
- index.css: Change all OKLCH hue values from 50 (orange) to 142 (green) for primary, ring, accent, chart-1 tokens; update background/card tints to green hue
- LiveMap.tsx: Replace all orange-500/orange-400/orange-600 color classes with green equivalents (green-500/green-400/green-600); update pulsing dot, buttons, overlays
- Dashboard.tsx: Replace orange accent references with green; make KM radius circle size dynamic based on selected KM
- ActiveOrder.tsx: Remove "Live Navigation" section label; replace with "GPS Route Tracking"; add two route cards showing Partner→Shop and Shop→Customer routes clearly on the map section
- Auth.tsx handleGoToPresent: use more address parts (slice 0,6 joined) for full address in Enter Location field; LiveMap onAddressChange also fills more parts
- FeedbackModal.tsx: Replace orange-500 checkmark/success state colors with green equivalents

### Remove
- ActiveOrder: standalone "Navigate to Delivery" button from the delivery address card (keep it inside route section)
- Nothing else removed

## Implementation Plan
1. Update index.css: change hue 50→142 in all CSS variables
2. Update LiveMap.tsx: swap all orange class references to green; keep functionality
3. Update Auth.tsx: increase address detail in handleGoToPresent reverse geocode (slice 0,6) and auto-fill
4. Update Dashboard.tsx: add radiusKm state with selector chips [1,2,3,5,10]; scale circle overlay width proportionally; replace orange classes with green
5. Update ActiveOrder.tsx: rename Live Navigation label to GPS Route Tracking; add two route cards (Partner→Shop, Shop→Customer) with open-in-maps buttons; replace orange references with green
6. Update FeedbackModal.tsx: replace orange references with green
