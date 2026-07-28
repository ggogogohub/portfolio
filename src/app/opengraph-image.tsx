import { ImageResponse } from "next/og";

// Static Open Graph / Twitter card, generated at build time via next/og.
// File-convention: Next emits the og:image + twitter:image meta tags for us.
export const alt = "Sonu Thakur — Computing Graduate";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          backgroundColor: "#030303",
          color: "#f8f5ef",
          backgroundImage:
            "radial-gradient(circle at 12% 8%, rgba(255,61,0,0.28), transparent 38%), radial-gradient(circle at 88% 92%, rgba(255,209,102,0.14), transparent 40%)",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 6,
            color: "#ffd166",
          }}
        >
          COMPUTING GRADUATE · PAUL HANNA AWARD · LONDON, UK
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 140,
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: -6,
            }}
          >
            SONU
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 140,
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: -6,
              color: "#ffd166",
            }}
          >
            THAKUR
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 34,
            color: "rgba(248,245,239,0.72)",
            borderTop: "1px solid rgba(248,245,239,0.18)",
            paddingTop: 28,
          }}
        >
          First-Class BSc Computing Systems — Software · Cloud · Data · AI · Security
        </div>
      </div>
    ),
    { ...size }
  );
}
