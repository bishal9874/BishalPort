"use client";

interface Project {
    title: string;
    category: string;
    description: string;
    tags: string[];
    link: string;
    color: string;
    borderColor: string;
}

const projects: Project[] = [
    {
        title: "Bathroom Light Automation",
        category: "IoT / Arduino",
        description: "Multi-user responsive lighting system with motion detection. Reduced energy consumption by 15%.",
        tags: ["Arduino", "Sensors", "C++", "Hardware"],
        link: "https://github.com/bishal9874",
        color: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-500",
        borderColor: "border-yellow-500/20"
    },
    {
        title: "CovidCheck! App",
        category: "Mobile App",
        description: "Cross-platform Flutter app providing real-time COVID-19 information and symptom tracking utilities.",
        tags: ["Flutter", "Dart", "API Integration"],
        link: "https://github.com/bishal9874",
        color: "bg-red-500/10 text-red-600 dark:text-red-500",
        borderColor: "border-red-500/20"
    },
    {
        title: "Secure Ration System",
        category: "Web & IoT",
        description: "Biometric face authentication system (92% accuracy) for secure public distribution. Included Next.js dashboard.",
        tags: ["Next.js", "Tailwind", "Python", "Face Auth"],
        link: "https://github.com/bishal9874",
        color: "bg-blue-500/10 text-blue-600 dark:text-blue-500",
        borderColor: "border-blue-500/20"
    },
    {
        title: "Aura - Safety Device",
        category: "IoT & Mobile",
        description: "Wearable safety device integrated with Flutter mobile app for SOS alerts, GPS tracking, and emergency contacts.",
        tags: ["IoT", "Flutter", "GPS", "Hardware"],
        link: "https://github.com/bishal9874",
        color: "bg-purple-500/10 text-purple-600 dark:text-purple-500",
        borderColor: "border-purple-500/20"
    },
    {
        title: "Obuddy Campus App",
        category: "Mobile App",
        description: "Interactive campus utility app for orientation, navigation, and helpline, improving efficiency for 500+ students.",
        tags: ["Flutter", "UX Design", "Campus"],
        link: "https://play.google.com/store/apps/details?id=include_package_name_here",
        color: "bg-green-500/10 text-green-600 dark:text-green-500",
        borderColor: "border-green-500/20"
    },
    {
        title: "ClassMonitor System",
        category: "Education Tech",
        description: "Streamlined attendance and workflow management system for 50+ students. Automated slippage record generation.",
        tags: ["Flutter", "Dart", "Management"],
        link: "#",
        color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-500",
        borderColor: "border-indigo-500/20"
    }
];

export default function Projects() {
    return (
        <section id="projects" className="py-24 bg-zinc-50 dark:bg-black px-6 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <span className="text-green-600 dark:text-green-500 font-mono text-sm tracking-wider uppercase mb-2 block">Portfolio</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white">Featured Projects</h2>
                    </div>
                    <a href="https://github.com/bishal9874" target="_blank" rel="noopener noreferrer" className="px-6 py-2 rounded-full border border-zinc-300 dark:border-white/20 text-zinc-900 dark:text-white hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all text-sm font-medium">
                        View GitHub Profile →
                    </a>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, idx) => (
                        <div key={idx} className="group relative bg-white dark:bg-neutral-900 border border-zinc-200 dark:border-white/5 rounded-2xl overflow-hidden hover:border-zinc-300 dark:hover:border-white/10 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md dark:shadow-none">
                            <div className="p-8 h-full flex flex-col">
                                <div className={`w-fit px-3 py-1 rounded-full text-xs font-medium border mb-4 ${project.color} ${project.borderColor}`}>
                                    {project.category}
                                </div>

                                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {project.title}
                                </h3>

                                <p className="text-zinc-600 dark:text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="text-xs text-zinc-500 dark:text-gray-500 font-mono">#{tag}</span>
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
