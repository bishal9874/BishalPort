export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-zinc-50 dark:bg-black py-12 border-t border-zinc-200 dark:border-white/10 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                    <span className="text-xl font-bold text-zinc-900 dark:text-white block mb-1">Bishal Mondal</span>
                    <p className="text-sm text-zinc-500 dark:text-gray-500">Technical Assistant & Developer</p>
                </div>

                <div className="flex gap-8 text-sm text-zinc-500 dark:text-gray-400">
                    <a href="https://linkedin.com/in/bishal-mondal-b6516a186" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">LinkedIn</a>
                    <a href="https://github.com/bishal9874" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 dark:hover:text-white transition-colors">GitHub</a>
                    <a href="mailto:bishalofficial987@gmail.com" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Email</a>
                </div>

                <div className="text-sm text-zinc-500 dark:text-gray-600 text-center md:text-right">
                    <p>&copy; {currentYear} All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
