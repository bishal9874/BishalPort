"use client";
import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, getDocs, addDoc, Timestamp } from 'firebase/firestore';
import { formatDistanceToNow } from 'date-fns';
import { Clock, CheckCircle, UploadCloud, AlertCircle, FileText, Link as LinkIcon, ArrowRight, X, ChevronRight } from 'lucide-react';

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
            <div className="max-w-6xl mx-auto">
                <div className="mb-12">
                    <span className="text-orange-600 dark:text-orange-500 font-mono text-sm tracking-wider uppercase mb-2 block">Student Portal</span>
                    <h1 className="text-4xl font-bold mb-4">Active Assignments</h1>
                    <p className="text-zinc-500 dark:text-gray-400 max-w-2xl">
                        Select an assignment below to view the full question and submit your work.
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

                                    <h3 className="text-xl font-bold mb-2 flex-grow">{task.title}</h3>

                                    <button
                                        onClick={() => {
                                            setSelectedTask(task);
                                            setSubmitted(false);
                                            setFormData({ name: "", rollNo: "", link: "", message: "" });
                                        }}
                                        className={`w-full py-3 mt-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all border border-zinc-200 dark:border-white/10 hover:bg-zinc-50 dark:hover:bg-zinc-800`}
                                    >
                                        View & Submit <ChevronRight size={16} />
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

            {/* View & Submit Modal */}
            {selectedTask && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
                    <div className="bg-white dark:bg-zinc-900 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border border-zinc-200 dark:border-white/10 animate-fade-in-up my-auto max-h-[90vh] flex flex-col">

                        {/* Header */}
                        <div className="p-6 border-b border-zinc-200 dark:border-white/10 flex justify-between items-center bg-zinc-50 dark:bg-black/20 shrink-0">
                            <div className="flex-1 pr-4 min-w-0">
                                <h3 className="font-bold text-xl break-words">{selectedTask.title}</h3>
                                <p className="text-sm text-zinc-500 flex items-center gap-2 mt-1">
                                    <Clock size={14} />
                                    Due: {selectedTask.deadline ? new Date(selectedTask.deadline.seconds * 1000).toLocaleString() : "No Deadline"}
                                </p>
                            </div>
                            <button onClick={() => setSelectedTask(null)} className="p-2 shrink-0 hover:bg-zinc-200 dark:hover:bg-white/10 rounded-full text-zinc-500 transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex flex-col md:flex-row flex-1 min-h-0 overflow-y-auto md:overflow-hidden">
                            {/* Left Panel: Question Details */}
                            {/* Left Panel: Question Details (LeetCode Style) */}
                            <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-zinc-900 border-b md:border-b-0 md:border-r border-zinc-200 dark:border-white/10">
                                {/* Tabs Header */}
                                <div className="flex items-center gap-6 px-6 border-b border-zinc-200 dark:border-white/10 bg-zinc-50/50 dark:bg-zinc-900/50 shrink-0">
                                    <button className="py-3 text-sm font-medium text-black dark:text-white border-b-2 border-black dark:border-white flex items-center gap-2">
                                        <FileText size={16} className="text-blue-500" />
                                        Description
                                    </button>
                                    <button className="py-3 text-sm font-medium text-zinc-400 dark:text-zinc-600 cursor-not-allowed hidden sm:block">
                                        Editorial
                                    </button>
                                    <button className="py-3 text-sm font-medium text-zinc-400 dark:text-zinc-600 cursor-not-allowed hidden sm:block">
                                        Solutions
                                    </button>
                                </div>

                                {/* Scrollable Content */}
                                <div className="flex-1 p-6 md:p-8 overflow-visible md:overflow-y-auto custom-scrollbar">
                                    <div className="mb-6">
                                        <h2 className="text-2xl font-bold mb-3 dark:text-white">{selectedTask.title}</h2>
                                        <div className="flex items-center gap-3">
                                            <span className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-medium text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-white/5">
                                                {selectedTask.id.substring(0, 4).toUpperCase()}
                                            </span>
                                            <span className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 text-xs font-medium border border-green-200 dark:border-green-500/20">
                                                Medium
                                            </span>
                                        </div>
                                    </div>

                                    <div className="prose dark:prose-invert max-w-none text-zinc-700 dark:text-zinc-300">
                                        <div className="whitespace-pre-wrap break-words leading-relaxed text-[15px] font-sans">
                                            {selectedTask.description}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Panel: Submission Form */}
                            <div className="w-full md:w-[350px] shrink-0 bg-zinc-50 dark:bg-black/40 p-6 overflow-visible md:overflow-y-auto">
                                {isExpired(selectedTask.deadline) ? (
                                    <div className="h-full flex flex-col items-center justify-center text-center p-4 text-zinc-500">
                                        <Clock size={48} className="mb-4 opacity-50" />
                                        <h4 className="text-lg font-bold mb-2">Submission Closed</h4>
                                        <p className="text-sm">The deadline for this assignment has passed.</p>
                                    </div>
                                ) : submitted ? (
                                    <div className="h-full flex flex-col items-center justify-center text-center">
                                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-6">
                                            <CheckCircle size={32} />
                                        </div>
                                        <h3 className="text-xl font-bold mb-2">Received!</h3>
                                        <p className="text-zinc-500 dark:text-zinc-400 mb-6 text-sm">Your assignment has been recorded securely.</p>
                                        <button onClick={() => setSelectedTask(null)} className="text-blue-600 font-medium hover:underline text-sm">Close Window</button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                                            <UploadCloud size={20} /> Submit Work
                                        </h4>

                                        <div className="space-y-1">
                                            <label className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">Full Name</label>
                                            <input required type="text" placeholder="John Doe"
                                                value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-xl outline-none focus:border-orange-500 transition-colors text-sm" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">Roll Number</label>
                                            <input required type="text" placeholder="MCA/23/042"
                                                value={formData.rollNo} onChange={e => setFormData({ ...formData, rollNo: e.target.value })}
                                                className="w-full p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-xl outline-none focus:border-orange-500 transition-colors text-sm" />
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">File Link (Docs/Drive)</label>
                                            <div className="relative">
                                                <LinkIcon className="absolute left-3 top-3.5 text-zinc-400" size={16} />
                                                <input required type="url" placeholder="https://docs.google.com/..."
                                                    value={formData.link} onChange={e => setFormData({ ...formData, link: e.target.value })}
                                                    className="w-full pl-9 pr-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-xl outline-none focus:border-orange-500 transition-colors text-sm" />
                                            </div>
                                            <p className="text-[10px] text-orange-500 flex items-center gap-1 pt-1">
                                                <AlertCircle size={10} /> Must be public/shared link
                                            </p>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">Note (Optional)</label>
                                            <textarea rows={3} placeholder="Any comments..."
                                                value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}
                                                className="w-full p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-xl outline-none focus:border-orange-500 transition-colors resize-none text-sm" />
                                        </div>

                                        <button type="submit" disabled={submitting} className="w-full py-3 mt-2 bg-zinc-900 dark:bg-white text-white dark:text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg text-sm">
                                            {submitting ? "Uploading..." : "Submit Assignment"}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
