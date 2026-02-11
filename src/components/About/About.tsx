"use client";
import Image from "next/image";
import { GraduationCap, MapPin, Mail, Phone, Code2, Sparkles, Briefcase, Award } from "lucide-react";

const START_DATE = new Date("2024-06-01"); // Adjust this date to your actual start date

export default function About() {
    // Calculate experience dynamically
    const experience = ((new Date().getTime() - START_DATE.getTime()) / (1000 * 60 * 60 * 24 * 365.25)).toFixed(1);

    return (
        <section id="about" className="py-24 relative overflow-hidden bg-zinc-50 dark:bg-black transition-colors duration-300">
            {/* Background Elements */}
            <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">

                {/* Left Column: Image & visual stats */}
                <div className="relative group perspective-1000">
                    {/* Animated Gradient Border */}
                    <div className="absolute -inset-0.5 bg-gradient-to-tr from-cyan-400 via-purple-500 to-pink-500 rounded-3xl blur opacity-30 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-tilt" />

                    <div className="relative aspect-square rounded-3xl bg-zinc-900 border border-zinc-800 dark:border-white/10 overflow-hidden shadow-2xl ring-1 ring-white/10 transform transition-transform duration-500 group-hover:rotate-1">
                        <Image
                            src="/Bishal.svg"
                            alt="Bishal Mondal"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 dark:opacity-80 transition-opacity duration-300" />

                        {/* Floating 'Open to Work' Badge */}
                        <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-2 transform translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-lg">
                            <Sparkles size={12} className="text-yellow-400 animate-pulse" />
                            <span className="text-[10px] text-white font-medium tracking-wide">OPEN TO WORK</span>
                        </div>

                        {/* Glassmorphism Stats Cards */}
                        <div className="absolute bottom-4 left-4 right-4 grid grid-cols-2 gap-3">
                            <div className="p-3 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 group-hover:border-white/20 transition-colors duration-300 hover:bg-white/10">
                                <div className="flex items-center gap-1.5 mb-1">
                                    <div className="p-1 rounded bg-blue-500/20 text-blue-400">
                                        <Briefcase size={12} />
                                    </div>
                                    <span className="text-[10px] text-zinc-300 uppercase tracking-wider font-semibold">Experience</span>
                                </div>
                                <div className="flex items-baseline gap-1 px-1">
                                    <span className="text-xl font-bold text-white">{experience}+</span>
                                    <span className="text-[10px] text-zinc-400">Years</span>
                                </div>
                            </div>

                            <div className="p-3 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 group-hover:border-white/20 transition-colors duration-300 hover:bg-white/10">
                                <div className="flex items-center gap-1.5 mb-1">
                                    <div className="p-1 rounded bg-purple-500/20 text-purple-400">
                                        <Award size={12} />
                                    </div>
                                    <span className="text-[10px] text-zinc-300 uppercase tracking-wider font-semibold">Education</span>
                                </div>
                                <div className="flex items-baseline gap-1 px-1">
                                    <span className="block text-3xl font-bold text-white mb-1">9.20</span>
                                    <span className="text-[10px] text-zinc-400">CGPA</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Content */}
                <div className="space-y-8">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium">
                            <Code2 size={16} />
                            <span>About Me</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white leading-tight">
                            Driven by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Innovation</span>,
                            <br /> Defined by <span className="italic">Code</span>.
                        </h2>

                        <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            I am a Technical Assistant at Adamas University with a deep-rooted passion for technology.
                            My journey is built on a strong foundation in Computer Applications, blending academic excellence with practical problem-solving.
                        </p>

                        <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            From automating complex lab systems to crafting intuitive mobile experiences,
                            I thrive on bridging the gap between hardware functionality and software elegance.
                        </p>
                    </div>

                    {/* Info Grid */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        {/* Education */}
                        <div className="p-4 rounded-2xl bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg dark:hover:shadow-blue-500/5 group">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                                    <GraduationCap size={20} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-zinc-900 dark:text-white">Education</h4>
                                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Master of Computer Applications</p>
                                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1 font-medium">Adamas University</p>
                                </div>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="p-4 rounded-2xl bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg dark:hover:shadow-purple-500/5 group">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-zinc-900 dark:text-white">Location</h4>
                                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Kolkata, India</p>
                                    <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">743234</p>
                                </div>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="p-4 rounded-2xl bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 hover:border-pink-500/30 transition-all duration-300 hover:shadow-lg dark:hover:shadow-pink-500/5 group">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-xl bg-pink-100 dark:bg-pink-500/20 text-pink-600 dark:text-pink-400 group-hover:scale-110 transition-transform duration-300">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-zinc-900 dark:text-white">Email</h4>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 break-all">bishalofficial987@gmail.com</p>
                                </div>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="p-4 rounded-2xl bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 hover:border-emerald-500/30 transition-all duration-300 hover:shadow-lg dark:hover:shadow-emerald-500/5 group">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-zinc-900 dark:text-white">Phone</h4>
                                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">+91 9874713473</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
