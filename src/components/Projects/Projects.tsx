"use client";
import { ExternalLink, Github, Folder, ArrowUpRight } from "lucide-react";

interface Project {
    title: string;
    category: string;
    description: string;
    tags: string[];
    link: string;
    color: string;
}

const projects: Project[] = [
    {
        title: "Bathroom Light Automation",
        category: "IoT / Arduino",
        description: "Multi-user responsive lighting system with motion detection. Reduced energy consumption by 15% through smart sensing algorithms.",
        tags: ["Arduino", "Sensors", "C++", "Hardware"],
        link: "https://github.com/bishal9874",
        color: "text-amber-500"
    },
    {
        title: "CovidCheck! App",
        category: "Mobile App",
        description: "Cross-platform Flutter app providing real-time COVID-19 information, vaccination centers, and symptom tracking utilities.",
        tags: ["Flutter", "Dart", "API Integration"],
        link: "https://github.com/bishal9874",
        color: "text-red-500"
    },
    {
        title: "Secure Ration System",
        category: "Web & IoT",
        description: "Biometric face authentication system (92% accuracy) for secure public distribution. Included Next.js dashboard for admin control.",
        tags: ["Next.js", "Python", "Face Auth", "IoT"],
        link: "https://github.com/bishal9874",
        color: "text-blue-500"
    },
    {
        title: "Aura - Safety Device",
        category: "IoT & Mobile",
        description: "Wearable safety device integrated with Flutter mobile app for SOS alerts, real-time GPS tracking, and emergency contacts.",
        tags: ["IoT", "Flutter", "GPS", "Hardware"],
        link: "https://github.com/bishal9874",
        color: "text-purple-500"
    },
    {
        title: "Obuddy Campus App",
        category: "Mobile App",
        description: "Interactive campus utility app for orientation, navigation, and helpline, improving efficiency for 500+ students during admission.",
        tags: ["Flutter", "UX Design", "Campus"],
        link: "https://play.google.com/store/apps/details?id=com.aucseapp.orientation",
        color: "text-green-500"
    },
    {
        title: "ClassMonitor System",
        category: "Education Tech",
        description: "Streamlined attendance and workflow management system for 50+ students. Automated slippage record generation and reporting.",
        tags: ["Flutter", "Dart", "Management"],
        link: "#",
        color: "text-indigo-500"
    }
];

export default function Projects() {
    return (
        <section id="projects" className="py-24 relative bg-zinc-50 dark:bg-black transition-colors duration-300 overflow-hidden">
            {/* Background Blobs */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <span className="text-green-600 dark:text-green-500 font-mono text-sm tracking-wider uppercase mb-2 block animate-fade-in">Portfolio</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white leading-tight">
                            Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">Works</span>
                        </h2>
                    </div>
                    <a href="https://github.com/bishal9874" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-white/10 transition-all font-medium">
                        <Github size={18} />
                        <span>View GitHub</span>
                        <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, idx) => (
                        <div key={idx} className="group relative bg-white dark:bg-white/5 backdrop-blur-sm border border-zinc-200 dark:border-white/10 rounded-2xl overflow-hidden hover:border-zinc-300 dark:hover:border-white/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:shadow-none">
                            <div className="p-8 h-full flex flex-col">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-3 rounded-xl bg-zinc-100 dark:bg-white/5 text-zinc-900 dark:text-white border border-zinc-200 dark:border-white/5 group-hover:bg-white dark:group-hover:bg-white/10 transition-colors">
                                        <Folder size={24} className={project.color} />
                                    </div>
                                    <div className="flex gap-2">
                                        {project.link !== "#" && (
                                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                                                <ExternalLink size={20} />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {project.title}
                                </h3>

                                <p className="text-zinc-600 dark:text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="px-2 py-1 text-[11px] uppercase tracking-wider font-semibold text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-white/5 rounded border border-zinc-200 dark:border-white/5">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
