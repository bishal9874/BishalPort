"use client";

export default function About() {
    return (
        <section id="about" className="py-24 bg-zinc-50 dark:bg-black relative overflow-hidden transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">

                {/* Image / Visual Side */}
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative aspect-square rounded-2xl bg-white dark:bg-neutral-900 border border-zinc-200 dark:border-white/10 overflow-hidden flex items-center justify-center p-8 shadow-sm dark:shadow-none">
                        <div className="text-center">
                            <span className="text-6xl mb-4 block">👨‍💻</span>
                            <div className="space-y-2">
                                <div className="px-4 py-2 bg-zinc-100 dark:bg-white/5 rounded-lg border border-zinc-200 dark:border-white/10 backdrop-blur-sm">
                                    <span className="block text-2xl font-bold text-zinc-900 dark:text-white">1.8+</span>
                                    <span className="text-xs text-zinc-500 dark:text-gray-400 uppercase tracking-wider">Years Exp.</span>
                                </div>
                                <div className="px-4 py-2 bg-zinc-100 dark:bg-white/5 rounded-lg border border-zinc-200 dark:border-white/10 backdrop-blur-sm">
                                    <span className="block text-2xl font-bold text-zinc-900 dark:text-white">Master MCA</span>
                                    <span className="text-xs text-zinc-500 dark:text-gray-400 uppercase tracking-wider">CGPA 9.20</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Side */}
                <div>
                    <span className="text-blue-600 dark:text-blue-500 font-mono text-sm tracking-wider uppercase mb-2 block">About Me</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6 leading-tight">
                        Bridging <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-500">Innovation</span> & Efficiency
                    </h2>

                    <p className="text-zinc-600 dark:text-gray-400 mb-6 text-lg leading-relaxed">
                        I am a Technical Assistant at Adamas University with a strong foundation in Computer Applications (MCA & BCA). I excel in creating seamless digital solutions, from configuring embedded IoT systems to developing responsive mobile applications using Flutter.
                    </p>

                    <p className="text-zinc-600 dark:text-gray-400 mb-8 text-lg leading-relaxed">
                        My work focuses on practical problem-solving—whether it's automating lab equipment to increase uptime by 20% or streamlining student workflows through intuitive app interfaces.
                    </p>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <h4 className="text-zinc-900 dark:text-white font-medium">Education</h4>
                            <p className="text-sm text-zinc-500 dark:text-gray-500">MCA, Adamas University (9.2 CGPA)</p>
                            <p className="text-sm text-zinc-500 dark:text-gray-500">BCA, Eminent College (8.51 CGPA)</p>
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-zinc-900 dark:text-white font-medium">Location</h4>
                            <p className="text-sm text-zinc-500 dark:text-gray-500">Kolkata, India</p>
                            <p className="text-sm text-zinc-500 dark:text-gray-500">743234</p>
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-zinc-900 dark:text-white font-medium">Email</h4>
                            <p className="text-sm text-zinc-500 dark:text-gray-500 break-all">bishalofficial987@gmail.com</p>
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-zinc-900 dark:text-white font-medium">Phone</h4>
                            <p className="text-sm text-zinc-500 dark:text-gray-500">+91 9874713473</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
