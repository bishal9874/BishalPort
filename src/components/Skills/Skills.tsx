"use client";
import { Cpu, Code2, Globe, Terminal, Database, Laptop } from "lucide-react";
import Reveal from "../Reveal";

interface SkillCategory {
    title: string;
    icon: React.ReactNode;
    skills: string[];
    color: string;
    bg: string;
}

const skillCategories: SkillCategory[] = [
    {
        title: "Frontend & Mobile",
        icon: <Laptop size={24} />,
        skills: ["Flutter", "React.js", "Next.js", "HTML5", "CSS3", "Tailwind CSS"],
        color: "text-blue-500",
        bg: "bg-blue-500/10 border-blue-500/20"
    },
    {
        title: "Languages & Core",
        icon: <Code2 size={24} />,
        skills: ["Python", "C/C++", "Java", "SQL", "Shell Script", "Dart"],
        color: "text-purple-500",
        bg: "bg-purple-500/10 border-purple-500/20"
    },
    {
        title: "IoT & Embedded",
        icon: <Cpu size={24} />,
        skills: ["Arduino", "ESP32", "Embedded C", "Circuit Design", "Sensors"],
        color: "text-emerald-500",
        bg: "bg-emerald-500/10 border-emerald-500/20"
    },
    {
        title: "Tools & Cloud",
        icon: <Terminal size={24} />,
        skills: ["Git/GitHub", "Linux", "Firebase", "VS Code", "Arduino IDE", "AWS"],
        color: "text-orange-500",
        bg: "bg-orange-500/10 border-orange-500/20"
    }
];

export default function Skills() {
    return (
        <section id="skills" className="py-24 relative bg-zinc-50 dark:bg-black transition-colors duration-300 overflow-hidden">
            {/* Background Blobs */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <Reveal width="100%" className="flex flex-col items-center">
                        <span className="text-blue-600 dark:text-blue-500 font-mono text-sm tracking-wider uppercase mb-2 block animate-fade-in">Expertise</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6">
                            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Arsenal</span>
                        </h2>
                        <p className="text-zinc-600 dark:text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                            A versatile toolkit spanning software development, mobile architecture, and hardware integration.
                        </p>
                    </Reveal>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {skillCategories.map((category, idx) => (
                        <Reveal key={idx} delay={idx * 100} width="100%">
                            <div className="group relative bg-white dark:bg-white/5 backdrop-blur-sm border border-zinc-200 dark:border-white/10 rounded-3xl p-6 hover:translate-y-[-5px] transition-all duration-300 hover:shadow-xl dark:hover:shadow-blue-500/5 h-full">
                                <div className={`w-12 h-12 rounded-2xl ${category.bg} ${category.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    {category.icon}
                                </div>

                                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6">{category.title}</h3>

                                <div className="flex flex-wrap gap-2">
                                    {category.skills.map((skill) => (
                                        <span key={skill} className="px-3 py-1.5 text-xs font-semibold text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-white/5 rounded-lg border border-zinc-200 dark:border-white/5 group-hover:bg-white dark:group-hover:bg-white/10 group-hover:border-zinc-300 dark:group-hover:border-white/20 transition-all cursor-default">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
