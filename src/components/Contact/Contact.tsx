"use client";
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, ArrowRight } from "lucide-react";

export default function Contact() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // --------------------------------------------------------------------------
        // TO ENABLE SILENT SENDING:
        // 1. Go to https://formspree.io and sign up/login
        // 2. Create a new form and copy the "Form ID" (the alphabetic code at the end of the URL)
        // 3. Set the NEXT_PUBLIC_FORMSPREE_ID environment variable in your Vercel/Netlify dashboard
        const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || "";
        // --------------------------------------------------------------------------

        if (FORMSPREE_ID) {
            try {
                const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    setSent(true);
                    setTimeout(() => setSent(false), 5000);
                    setFormData({ name: "", email: "", message: "" });
                    return; // Stop here if successful
                }
            } catch (error) {
                console.error("Form error:", error);
            }
        }

        // Fallback: Open Mail Client (if Formspree ID is missing or fails)
        const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
        const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);

        window.location.href = `mailto:bishalofficial987@gmail.com?subject=${subject}&body=${body}`;

        setSent(true);
        setTimeout(() => setSent(false), 3000);
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <section id="contact" className="py-24 relative bg-zinc-50 dark:bg-black transition-colors duration-300 overflow-hidden">
            {/* Background Blobs */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-start">

                    {/* Contact Info Side */}
                    <div className="space-y-8">
                        <div>
                            <span className="text-blue-600 dark:text-blue-500 font-mono text-sm tracking-wider uppercase mb-2 block">Get in Touch</span>
                            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white leading-tight mb-4">
                                Let's Build Something <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Extraordinary</span>
                            </h2>
                            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-md">
                                Have an idea or a project in mind? I'm always open to discussing new opportunities, creative collaborations, or just having a chat about tech.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {/* Email Card */}
                            <a href="mailto:bishalofficial987@gmail.com" className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 hover:border-blue-500/30 transition-all duration-300 group hover:shadow-lg dark:hover:shadow-blue-500/5">
                                <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-zinc-900 dark:text-white">Email Me</h4>
                                    <p className="text-zinc-500 dark:text-zinc-400 text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">bishalofficial987@gmail.com</p>
                                </div>
                            </a>

                            {/* Phone Card */}
                            <a href="tel:+919874713473" className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 hover:border-purple-500/30 transition-all duration-300 group hover:shadow-lg dark:hover:shadow-purple-500/5">
                                <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-zinc-900 dark:text-white">Call Me</h4>
                                    <p className="text-zinc-500 dark:text-zinc-400 text-sm group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">+91 9874713473</p>
                                </div>
                            </a>

                            {/* Socials */}
                            <div className="flex gap-4 pt-2">
                                <a href="https://linkedin.com/in/bishal-mondal-b6516a186" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500/30 transition-all duration-300 hover:scale-110">
                                    <Linkedin size={24} />
                                </a>
                                <a href="https://github.com/bishal9874" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:text-white dark:hover:text-white hover:bg-black dark:hover:bg-white/10 hover:border-black/30 dark:hover:border-white/30 transition-all duration-300 hover:scale-110">
                                    <Github size={24} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-20 transform rotate-1"></div>
                        <div className="relative bg-white dark:bg-zinc-900/50 backdrop-blur-xl border border-zinc-200 dark:border-white/10 rounded-3xl p-8 shadow-2xl">
                            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">Send Me a Message</h3>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">Your Name</label>
                                    <input
                                        id="name"
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-white/10 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-zinc-400 dark:placeholder-zinc-600"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">Your Email</label>
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-white/10 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-zinc-400 dark:placeholder-zinc-600"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">Your Message</label>
                                    <textarea
                                        id="message"
                                        required
                                        rows={4}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-white/10 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-zinc-400 dark:placeholder-zinc-600 resize-none"
                                        placeholder="How can I help you?"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={sent}
                                    className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 ${sent ? "bg-green-500 text-white cursor-default" : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-blue-500/25 hover:scale-[1.02]"}`}
                                >
                                    {sent ? (
                                        <>Message Prepared!</>
                                    ) : (
                                        <>
                                            Send Message <Send size={18} />
                                        </>
                                    )}
                                </button>
                                <p className="text-center text-xs text-zinc-500 dark:text-zinc-500 mt-4">
                                    This will open your default email client.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
