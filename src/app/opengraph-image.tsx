import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Brainura — Brain Training in 5 Minutes a Day";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          background: "linear-gradient(135deg, #667EEA 0%, #764BA2 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontFamily: "system-ui, sans-serif",
          padding: "60px 80px",
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 800,
            letterSpacing: "-3px",
            marginBottom: 20,
          }}
        >
          Brainura
        </div>
        <div
          style={{
            fontSize: 44,
            fontWeight: 600,
            textAlign: "center",
            maxWidth: 900,
            lineHeight: 1.2,
            opacity: 0.95,
          }}
        >
          Brain Training in 5 Minutes a Day
        </div>
        <div
          style={{
            fontSize: 22,
            fontWeight: 500,
            marginTop: 40,
            opacity: 0.8,
            display: "flex",
            gap: 30,
          }}
        >
          <span>Memory</span>
          <span>·</span>
          <span>Attention</span>
          <span>·</span>
          <span>Speed</span>
          <span>·</span>
          <span>Logic</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
