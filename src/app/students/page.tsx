"use client";
import React, { useState } from 'react';
import { UploadCloud, CheckCircle, ArrowLeft, FileText, Link as LinkIcon, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function StudentPortal() {
    const [formData, setFormData] = useState({
        name: "",
        rollNo: "",
        subject: "",
        link: "",
        message: ""
    });
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || "";

        if (FORMSPREE_ID) {
            try {
                const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        _subject: `New Assignment: ${formData.subject} - ${formData.name}`,
                        ...formData
                    })
                });
                if (response.ok) {
                    setSent(true);
                    setFormData({ name: "", rollNo: "", subject: "", link: "", message: "" });
                }
            } catch (error) {
                console.error("Error submitting assignment", error);
                alert("Failed to submit. Please try again.");
            }
        } else {
            // Fallback mailto
            const subject = encodeURIComponent(`Assignment Submission: ${formData.subject}`);
            const body = encodeURIComponent(`Name: ${formData.name}\nRoll No: ${formData.rollNo}\nLink: ${formData.link}\nMessage: ${formData.message}`);
            window.location.href = `mailto:bishalofficial987@gmail.com?subject=${subject}&body=${body}`;
            setSent(true);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-white flex flex-col">
            <div className="max-w-2xl mx-auto w-full px-6 py-12 flex-grow flex flex-col justify-center">
                <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors mb-8">
                    <ArrowLeft size={20} />
                    Back to Portfolio
                </Link>

                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-3xl p-8 shadow-xl">
                    <div className="mb-8">
                        <span className="text-orange-600 dark:text-orange-500 font-mono text-sm tracking-wider uppercase mb-2 block">Student Portal</span>
                        <h1 className="text-3xl font-bold mb-2">Upload Assignment</h1>
                        <p className="text-zinc-500 dark:text-zinc-400">
                            Submit your assignments securely. Please ensure your file links are accessible (e.g., Google Drive needs 'Anyone with link' permission).
                        </p>
                    </div>

                    {sent ? (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle size={32} />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Submission Received!</h3>
                            <p className="text-zinc-500 dark:text-zinc-400 mb-6">Thank you, {formData.name}. Your assignment has been recorded.</p>
                            <button onClick={() => setSent(false)} className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
                                Submit another assignment
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Full Name</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="John Doe"
                                        className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-white/10 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Roll No / ID</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.rollNo}
                                        onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                                        placeholder="MCA/23/001"
                                        className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-white/10 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Subject / Topic</label>
                                <div className="relative">
                                    <FileText className="absolute left-4 top-3.5 text-zinc-400" size={18} />
                                    <input
                                        required
                                        type="text"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        placeholder="e.g. Data Structures Assignment 1"
                                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-white/10 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Assignment Link (GDrive/GitHub)</label>
                                <div className="relative">
                                    <LinkIcon className="absolute left-4 top-3.5 text-zinc-400" size={18} />
                                    <input
                                        required
                                        type="url"
                                        value={formData.link}
                                        onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                        placeholder="https://drive.google.com/..."
                                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-white/10 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
                                    />
                                </div>
                                <p className="text-xs text-zinc-500 flex items-center gap-1 mt-1">
                                    <AlertCircle size={12} />
                                    Ensure the link is publicly accessible or shared with me.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Additional Message (Optional)</label>
                                <textarea
                                    rows={3}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    placeholder="Any comments about the assignment..."
                                    className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-white/10 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    "Uploading..."
                                ) : (
                                    <>
                                        <UploadCloud size={20} />
                                        Submit Assignment
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
