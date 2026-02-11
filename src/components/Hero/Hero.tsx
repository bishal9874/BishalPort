"use client";
import Link from "next/link";
import Image from "next/image";
import StarField from "./StarField";

export default function Hero() {
    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-20"
        >
            {/* Galaxy Star Field Canvas - Critical for the 'galaxy animation' requested */}
            <div className="absolute inset-0 z-0">
                <StarField />
            </div>

            {/* Subtle radial overlay to focus attention on center & improve text readability */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] z-[1] pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                {/* Profile Image */}
                {/* <div className="relative w-32 h-32 mx-auto mb-8 group">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                    <div className="relative rounded-full overflow-hidden border-2 border-white/20 hover:border-white/50 transition-colors duration-300">
                        <Image
                            src="/profile.svg"
                            alt="Bishal Mondal"
                            width={128}
                            height={128}
                            className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-110"
                            priority
                        />
                    </div>
                </div> */}

                {/* Status Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 animate-fade-in hover:bg-white/10 transition-colors cursor-default">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <span className="text-xs font-semibold text-emerald-200 uppercase tracking-widest">
                        Available for Roles
                    </span>
                </div>

                {/* Name */}
                <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-neutral-200 to-neutral-600 animate-slide-up drop-shadow-2xl">
                    Bishal Mondal
                </h1>

                {/* Role */}
                <h2 className="text-xl md:text-3xl font-light text-neutral-400 mb-8 max-w-3xl mx-auto animate-slide-up [animation-delay:100ms] leading-relaxed">
                    Technical Assistant at{" "}
                    <span className="text-white font-medium hover:text-emerald-400 transition-colors">
                        Adamas University
                    </span>
                    <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 font-medium">
                        Frontend Developer
                    </span>{" "}
                    • IoT Engineer • Problem Solver
                </h2>

                {/* Description */}
                <p className="text-neutral-500 max-w-2xl mx-auto mb-10 text-lg leading-relaxed animate-slide-up [animation-delay:200ms]">
                    Crafting seamless digital experiences with 1.8+ years of expertise.
                    Specializing in high-performance web apps, cross-platform mobile solutions,
                    and integrated IoT systems.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-slide-up [animation-delay:300ms]">
                    <Link
                        href="#projects"
                        className="group relative px-8 py-4 bg-white text-black font-semibold rounded-full hover:scale-105 transition-all duration-300 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.5)]"
                    >
                        Explore Work
                        <span className="absolute inset-0 rounded-full ring-2 ring-white/20 group-hover:ring-white/50 transition-all duration-300 pointer-events-none" />
                    </Link>
                    <Link
                        href="#contact"
                        className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 text-white font-medium rounded-full hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105"
                    >
                        Contact Me
                    </Link>
                </div>

                {/* Scroll Indicator */}
                {/* <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-medium">
                        Scroll
                    </span>
                    <div className="w-[1px] h-16 bg-gradient-to-b from-neutral-500 to-transparent" />
                </div> */}
            </div>
        </section>
    );
}
