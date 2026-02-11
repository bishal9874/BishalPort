"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X } from "lucide-react";

interface NavLink {
    label: string;
    href: string;
}

const navLinks: NavLink[] = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState<boolean>(false);
    const [active, setActive] = useState<string>("Home");
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);

            // Smarter active state detection with Intersection Observer logic simulation
            // Just basic offsets effectively work for single-page scroll sites
            const sections = navLinks.map(l => l.href.slice(1));
            for (const section of sections) {
                const el = document.getElementById(section);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= 150 && rect.bottom >= 150) {
                        setActive(navLinks.find(l => l.href === `#${section}`)?.label || "Home");
                        break;
                    }
                }
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Toggle theme with mounted check to avoid hydration mismatch
    const toggleTheme = () => {
        if (!mounted) return;
        setTheme(theme === "dark" ? "light" : "dark");
    };

    if (!mounted) return null; // Prevent hydration error

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-4 md:px-6 ${scrolled ? "py-4" : "py-6"
                }`}
        >
            <div
                className={`max-w-5xl mx-auto flex items-center justify-between rounded-full transition-all duration-500 ${scrolled
                    ? "bg-white/70 dark:bg-black/70 backdrop-blur-xl border border-zinc-200 dark:border-white/10 shadow-lg px-6 py-3"
                    : "bg-transparent px-0 border-transparent"
                    }`}
            >
                {/* Logo */}
                <Link href="#hero" className="flex items-center gap-2 group relative z-50">
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400 group-hover:to-zinc-900 dark:group-hover:to-white transition-all">
                        BM.
                    </span>
                </Link>

                {/* Desktop Menu - Floating Pill */}
                <div className="hidden md:flex items-center gap-1 bg-white/50 dark:bg-white/5 backdrop-blur-md px-2 py-1.5 rounded-full border border-zinc-200 dark:border-white/5 shadow-sm">
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            onClick={() => setActive(link.label)}
                            className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${active === link.label
                                ? "text-zinc-900 bg-white shadow-md dark:bg-zinc-800 dark:text-white"
                                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5"
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Right Actions */}
                <div className="hidden md:flex items-center gap-3">
                    <button
                        onClick={toggleTheme}
                        className="p-2.5 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-zinc-500"
                        aria-label="Toggle Theme"
                    >
                        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    <Link
                        href="#contact"
                        className="px-5 py-2.5 text-sm font-semibold text-white bg-zinc-900 dark:bg-white dark:text-black rounded-full hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    >
                        Let's Talk
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden flex items-center gap-4 z-50">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors"
                    >
                        {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="p-2 text-zinc-900 dark:text-white focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-white/95 dark:bg-black/95 backdrop-blur-2xl z-40 flex flex-col items-center justify-center gap-8 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${menuOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-10"
                    }`}
            >
                {navLinks.map((link, idx) => (
                    <Link
                        key={link.label}
                        href={link.href}
                        onClick={() => {
                            setActive(link.label);
                            setMenuOpen(false);
                        }}
                        className={`text-4xl font-bold tracking-tight transition-all duration-300 ${active === link.label
                            ? "text-zinc-900 dark:text-white"
                            : "text-zinc-400 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-200"
                            }`}
                        style={{ transitionDelay: `${idx * 50}ms` }}
                    >
                        {link.label}
                    </Link>
                ))}
            </div>
        </nav>
    );
}
