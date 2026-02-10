import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Bishal Mondal — Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(135deg, #050505 0%, #0a0a1a 40%, #10051a 70%, #050505 100%)",
                    position: "relative",
                }}
            >
                {/* Decorative circles */}
                <div
                    style={{
                        position: "absolute",
                        top: -100,
                        left: -100,
                        width: 400,
                        height: 400,
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(80,40,120,0.3) 0%, transparent 70%)",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        bottom: -80,
                        right: -80,
                        width: 350,
                        height: 350,
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(30,60,120,0.3) 0%, transparent 70%)",
                    }}
                />

                {/* Name */}
                <div
                    style={{
                        fontSize: 72,
                        fontWeight: 800,
                        color: "white",
                        letterSpacing: "-2px",
                        marginBottom: 16,
                    }}
                >
                    Bishal Mondal
                </div>

                {/* Role */}
                <div
                    style={{
                        fontSize: 28,
                        color: "#9ca3af",
                        fontWeight: 400,
                        letterSpacing: "1px",
                    }}
                >
                    Technical Assistant & Full Stack Developer
                </div>

                {/* Divider */}
                <div
                    style={{
                        width: 80,
                        height: 2,
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
                        marginTop: 32,
                        marginBottom: 32,
                    }}
                />

                {/* Tags */}
                <div
                    style={{
                        display: "flex",
                        gap: 16,
                    }}
                >
                    {["Flutter", "React", "Next.js", "IoT", "Arduino"].map((tag) => (
                        <div
                            key={tag}
                            style={{
                                padding: "8px 20px",
                                borderRadius: 999,
                                border: "1px solid rgba(255,255,255,0.15)",
                                color: "#d1d5db",
                                fontSize: 16,
                                background: "rgba(255,255,255,0.05)",
                            }}
                        >
                            {tag}
                        </div>
                    ))}
                </div>
            </div>
        ),
        { ...size }
    );
}
