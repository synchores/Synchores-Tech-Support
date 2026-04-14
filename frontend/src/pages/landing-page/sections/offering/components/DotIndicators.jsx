export function DotIndicators({ count, activeIndex, onDotClick }) {
  return (
    <div className="absolute bottom-4 right-6 flex gap-1.5 z-10">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          onClick={() => onDotClick(i)}
          className="rounded-full transition-all"
          style={{
            width: i === activeIndex ? "20px" : "6px",
            height: "6px",
            borderRadius: "3px",
            background: i === activeIndex ? "#1e7fd4" : "rgba(255,255,255,0.35)",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        />
      ))}
    </div>
  );
}
