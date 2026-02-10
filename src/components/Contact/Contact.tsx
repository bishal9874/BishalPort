"use client";
import React, { useState } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [sent, setSent] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSent(true);
        setTimeout(() => setSent(false), 3000);
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <section id="contact" className="py-24 bg-white dark:bg-neutral-950 px-6 border-t border-zinc-200 dark:border-white/5 transition-colors duration-300">
            <div className="max-w-4xl mx-auto text-center mb-16">
                <span className="text-indigo-600 dark:text-indigo-500 font-mono text-sm tracking-wider uppercase mb-2 block">Get in Touch</span>
                <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6">Let's Collaborate</h2>
                <p className="text-zinc-600 dark:text-gray-400 text-lg">
                    Open to freelance opportunities and innovative projects.
                </p>
            </div>

            <div className="max-w-2xl mx-auto bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/5 rounded-3xl p-8 md:p-12 backdrop-blur-sm shadow-sm dark:shadow-none">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium text-zinc-600 dark:text-gray-400">Name</label>
                            <input
                                id="name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-white dark:bg-black/50 border border-zinc-300 dark:border-white/10 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-zinc-400 dark:placeholder-gray-600"
                                placeholder="John Doe"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-zinc-600 dark:text-gray-400">Email</label>
                            <input
                                id="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full bg-white dark:bg-black/50 border border-zinc-300 dark:border-white/10 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-zinc-400 dark:placeholder-gray-600"
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium text-zinc-600 dark:text-gray-400">Message</label>
                        <textarea
                            id="message"
                            required
                            rows={5}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full bg-white dark:bg-black/50 border border-zinc-300 dark:border-white/10 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-zinc-400 dark:placeholder-gray-600 resize-none"
                            placeholder="Tell me about your project..."
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={sent}
                        className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${sent ? "bg-green-500 text-white cursor-default" : "bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-gray-200"}`}
                    >
                        {sent ? "Message Sent Successfully!" : "Send Message"}
                    </button>
                </form>

                <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-white/5 grid md:grid-cols-3 gap-6 text-center text-sm md:text-left">
                    <div>
                        <span className="block text-zinc-500 dark:text-gray-500 mb-1">Email</span>
                        <a href="mailto:bishalofficial987@gmail.com" className="text-zinc-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">bishalofficial987@gmail.com</a>
                    </div>
                    <div>
                        <span className="block text-zinc-500 dark:text-gray-500 mb-1">Phone</span>
                        <a href="tel:+919874713473" className="text-zinc-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">+91 9874713473</a>
                    </div>
                    <div>
                        <span className="block text-zinc-500 dark:text-gray-500 mb-1">Social</span>
                        <div className="flex justify-center md:justify-start gap-4">
                            <a href="https://linkedin.com/in/bishal-mondal-b6516a186" className="text-zinc-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">LinkedIn</a>
                            <a href="https://github.com/bishal9874" className="text-zinc-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">GitHub</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
