"use client";
import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, getDocs, addDoc, Timestamp } from 'firebase/firestore';
import { formatDistanceToNow } from 'date-fns';
import { Clock, CheckCircle, UploadCloud, AlertCircle, FileText, Link as LinkIcon, ArrowRight, X } from 'lucide-react';

interface Assignment {
    id: string;
    title: string;
    description: string;
    deadline: any;
}

export default function StudentPortal() {
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTask, setSelectedTask] = useState<Assignment | null>(null);

    // Submission Form Data
    const [formData, setFormData] = useState({
        name: "",
        rollNo: "",
        link: "",
        message: ""
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const q = query(collection(db, "assignments"), orderBy("deadline", "asc"));
                const snapshot = await getDocs(q);
                const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Assignment[];
                setAssignments(data);
            } catch (error) {
                console.error("Error fetching assignments", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAssignments();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedTask) return;
        setSubmitting(true);
        try {
            await addDoc(collection(db, "submissions"), {
                ...formData,
                assignmentId: selectedTask.id,
                assignmentTitle: selectedTask.title,
                submittedAt: Timestamp.now()
            });
            setSubmitted(true);
        } catch (error) {
            console.error("Submission failed", error);
            alert("Failed to submit. Please try again.");
        }
        setSubmitting(false);
    };

    const isExpired = (deadline: any) => {
        if (!deadline) return false;
        return new Date().getTime() > new Date(deadline.seconds * 1000).getTime();
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-white pt-24 pb-12 px-6">
            <div className="max-w-5xl mx-auto">
                <div className="mb-12">
                    <span className="text-orange-600 dark:text-orange-500 font-mono text-sm tracking-wider uppercase mb-2 block">Student Portal</span>
                    <h1 className="text-4xl font-bold mb-4">Active Assignments</h1>
                    <p className="text-zinc-500 dark:text-gray-400 max-w-2xl">
                        Select an assignment below to view details and submit your work. Check deadlines carefully!
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {assignments.map((task) => {
                            const expired = isExpired(task.deadline);
                            const timeLeft = !expired && task.deadline ? formatDistanceToNow(new Date(task.deadline.seconds * 1000), { addSuffix: true }) : "Closed";

                            return (
                                <div key={task.id} className={`bg-white dark:bg-zinc-900 border rounded-2xl p-6 flex flex-col transition-all hover:shadow-lg ${expired ? 'opacity-70 border-zinc-200 dark:border-white/5' : 'border-zinc-200 dark:border-white/10'}`}>
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${expired ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400' : 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'}`}>
                                            {expired ? "Expired" : "Active"}
                                        </div>
                                        <div className="flex items-center gap-1 text-sm text-zinc-500">
                                            <Clock size={14} />
                                            <span>{expired ? "Closed" : `Due ${timeLeft}`}</span>
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold mb-4">{task.title}</h3>

                                    {/* Question Box */}
                                    <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-xl mb-6 border border-zinc-100 dark:border-white/5 flex-grow">
                                        <div className="flex items-center gap-2 mb-2 text-zinc-400">
                                            <FileText size={14} />
                                            <span className="text-xs font-semibold uppercase tracking-wider">Question / Task</span>
                                        </div>
                                        <p className="text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap leading-relaxed">
                                            {task.description}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => {
                                            if (!expired) {
                                                setSelectedTask(task);
                                                setSubmitted(false);
                                                setFormData({ name: "", rollNo: "", link: "", message: "" });
                                            }
                                        }}
                                        disabled={expired}
                                        className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${expired
                                            ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed'
                                            : 'bg-zinc-900 dark:bg-white text-white dark:text-black hover:opacity-90'}`}
                                    >
                                        {expired ? "Submission Closed" : "Submit Assignment"} <ArrowRight size={16} />
                                    </button>
                                </div>
                            );
                        })}
                        {assignments.length === 0 && (
                            <div className="col-span-full py-20 text-center text-zinc-500">
                                <FileText size={48} className="mx-auto mb-4 opacity-50" />
                                <p className="text-lg">No assignments posted yet.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Submission Modal */}
            {selectedTask && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white dark:bg-zinc-900 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-zinc-200 dark:border-white/10 animate-fade-in-up">
                        <div className="p-6 border-b border-zinc-100 dark:border-white/5 flex justify-between items-center">
                            <h3 className="font-bold text-lg truncate pr-4">Submit: {selectedTask.title}</h3>
                            <button onClick={() => setSelectedTask(null)} className="p-2 hover:bg-zinc-100 dark:hover:bg-white/5 rounded-full text-zinc-500">
                                <X size={20} />
                            </button>
                        </div>

                        {submitted ? (
                            <div className="p-12 text-center">
                                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle size={32} />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">Submitted!</h3>
                                <p className="text-zinc-500 dark:text-zinc-400 mb-6">Your assignment has been recorded securely in the database.</p>
                                <button onClick={() => setSelectedTask(null)} className="text-blue-600 font-medium hover:underline">Close</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">Name</label>
                                        <input required type="text" placeholder="Your Name"
                                            value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full p-3 bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-white/10 rounded-xl outline-none focus:border-orange-500 transition-colors" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">Roll No</label>
                                        <input required type="text" placeholder="Your ID"
                                            value={formData.rollNo} onChange={e => setFormData({ ...formData, rollNo: e.target.value })}
                                            className="w-full p-3 bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-white/10 rounded-xl outline-none focus:border-orange-500 transition-colors" />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">File Link (Docs/Drive)</label>
                                    <div className="relative">
                                        <LinkIcon className="absolute left-3 top-3.5 text-zinc-400" size={16} />
                                        <input required type="url" placeholder="Paste link here..."
                                            value={formData.link} onChange={e => setFormData({ ...formData, link: e.target.value })}
                                            className="w-full pl-10 pr-4 py-3 bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-white/10 rounded-xl outline-none focus:border-orange-500 transition-colors" />
                                    </div>
                                    <p className="text-[10px] text-orange-500 flex items-center gap-1">
                                        <AlertCircle size={10} /> Ensure link is accessible (Public/Shared)
                                    </p>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">Note (Optional)</label>
                                    <textarea rows={2} placeholder="Any comments..."
                                        value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full p-3 bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-white/10 rounded-xl outline-none focus:border-orange-500 transition-colors resize-none" />
                                </div>

                                <button type="submit" disabled={submitting} className="w-full py-4 mt-4 bg-zinc-900 dark:bg-white text-white dark:text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                                    {submitting ? "Uploading..." : <><UploadCloud size={20} /> Submit Now</>}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
