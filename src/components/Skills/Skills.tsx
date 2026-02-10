"use client";

interface SkillCategory {
    title: string;
    skills: string[];
    color: string;
}

const skillCategories: SkillCategory[] = [
    {
        title: "Frontend & Mobile",
        skills: ["Flutter", "React.js", "Next.js", "HTML5", "CSS3", "Tailwind CSS"],
        color: "from-blue-500 to-cyan-400"
    },
    {
        title: "Languages & Core",
        skills: ["Python", "C/C++", "Java", "SQL", "Shell Script", "Dart"],
        color: "from-purple-500 to-pink-500"
    },
    {
        title: "IoT & Embedded",
        skills: ["Arduino", "ESP32", "Embedded C", "Circuit Design", "Sensors"],
        color: "from-green-500 to-emerald-400"
    },
    {
        title: "Tools & Cloud",
        skills: ["Git/GitHub", "Linux", "Firebase", "VS Code", "Arduino IDE", "AWS (Learning)"],
        color: "from-orange-500 to-yellow-400"
    }
];

export default function Skills() {
    return (
        <section id="skills" className="py-24 bg-white dark:bg-neutral-950 px-6 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-purple-600 dark:text-purple-500 font-mono text-sm tracking-wider uppercase mb-2 block">Expertise</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4">Technical Arsenal</h2>
                    <p className="text-zinc-600 dark:text-gray-400 max-w-2xl mx-auto">
                        A versatile toolkit spanning software development, mobile apps, and hardware integration.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {skillCategories.map((category, idx) => (
                        <div key={idx} className="group relative bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/5 rounded-2xl p-6 hover:bg-zinc-100 dark:hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 shadow-sm dark:shadow-none">
                            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${category.color} rounded-t-2xl opacity-50 group-hover:opacity-100 transition-opacity`}></div>

                            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6 mt-2">{category.title}</h3>

                            <div className="flex flex-wrap gap-2">
                                {category.skills.map((skill) => (
                                    <span key={skill} className="px-3 py-1 text-xs font-medium text-zinc-600 dark:text-gray-300 bg-zinc-200/50 dark:bg-black/40 border border-zinc-300 dark:border-white/10 rounded-full group-hover:border-zinc-400 dark:group-hover:border-white/20 transition-colors">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
