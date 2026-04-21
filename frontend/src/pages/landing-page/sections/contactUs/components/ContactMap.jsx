import { GoogleMap, Marker, OverlayView } from "@react-google-maps/api";

export default function ContactMap({
  isLoaded,
  loadError,
  mapCenter,
  mapContainerStyle,
  mapOptions,
}) {
  if (loadError) {
    return (
      <div
        style={{
          padding: "16px",
          border: "1px solid var(--landing-border)",
          borderRadius: "2px",
          color: "var(--landing-text-muted)",
          fontFamily: "'Inter', Arial, sans-serif",
          fontSize: "14px",
        }}
      >
        Map failed to load. Please check your Google Maps API key.
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div
        style={{
          height: mapContainerStyle.height,
          border: mapContainerStyle.border,
          borderRadius: mapContainerStyle.borderRadius,
          background: "var(--landing-surface-soft)",
        }}
      />
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={mapCenter}
      zoom={18}
      options={mapOptions}
    >
      <Marker position={mapCenter} title="Synchores Information Technology Solutions" />
      <OverlayView position={mapCenter} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
        <div
          style={{
            transform: "translate(14px, -26px)",
            color: "#d32f2f",
            fontFamily: "'Inter', Arial, sans-serif",
            fontSize: "14px",
            fontWeight: 700,
            background: "transparent",
            whiteSpace: "nowrap",
            textShadow: "0 0 1px rgba(255,255,255,0.95)",
            pointerEvents: "none",
          }}
        >
          Synchores Information Technology Solutions
        </div>
      </OverlayView>
    </GoogleMap>
  );
}
