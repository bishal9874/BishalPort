"use client";
import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, orderBy, query, Timestamp } from 'firebase/firestore';
import { Lock, Plus, Calendar, Clock, ListChecks, Link as LinkIcon, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';

export default function AdminPortal() {
    const [auth, setAuth] = useState(false);
    const [creds, setCreds] = useState({ id: "", pass: "" });
    const [view, setView] = useState<'create' | 'submissions'>('create');

    // Form State
    const [assignment, setAssignment] = useState({
        title: "",
        description: "",
        deadline: ""
    });
    const [loading, setLoading] = useState(false);
    const [submissions, setSubmissions] = useState<any[]>([]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (creds.id === "admin" && creds.pass === "admin") {
            setAuth(true);
        } else {
            alert("Invalid Credentials");
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await addDoc(collection(db, "assignments"), {
                ...assignment,
                createdAt: Timestamp.now(),
                deadline: Timestamp.fromDate(new Date(assignment.deadline))
            });
            alert("Assignment Posted!");
            setAssignment({ title: "", description: "", deadline: "" });
        } catch (error) {
            console.error("Error creating assignment", error);
            alert("Failed to post assignment. Check Firebase Config.");
        }
        setLoading(false);
    };

    const fetchSubmissions = async () => {
        const q = query(collection(db, "submissions"), orderBy("submittedAt", "desc"));
        const querySnapshot = await getDocs(q);
        const subs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setSubmissions(subs);
    };

    useEffect(() => {
        if (auth && view === 'submissions') {
            fetchSubmissions();
        }
    }, [auth, view]);

    if (!auth) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
                <form onSubmit={handleLogin} className="w-full max-w-md p-8 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl">
                    <div className="flex justify-center mb-6 text-orange-500">
                        <Lock size={48} />
                    </div>
                    <h2 className="text-2xl font-bold text-center mb-6">Admin Portal</h2>
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Admin ID"
                            value={creds.id}
                            onChange={(e) => setCreds({ ...creds, id: e.target.value })}
                            className="w-full p-3 bg-black border border-zinc-800 rounded-lg focus:border-orange-500 outline-none transition-colors"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={creds.pass}
                            onChange={(e) => setCreds({ ...creds, pass: e.target.value })}
                            className="w-full p-3 bg-black border border-zinc-800 rounded-lg focus:border-orange-500 outline-none transition-colors"
                        />
                        <button type="submit" className="w-full py-3 bg-orange-600 hover:bg-orange-500 rounded-lg font-bold transition-all">
                            Unlock Portal
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-white p-6 md:p-12">
            <div className="max-w-6xl mx-auto">
                <header className="flex justify-between items-center mb-12 border-b border-zinc-800 pb-6">
                    <h1 className="text-3xl font-bold">Assignment Dashboard</h1>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setView('create')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${view === 'create' ? 'bg-orange-600 text-white' : 'hover:bg-zinc-900 text-zinc-400'}`}
                        >
                            <Plus size={18} /> New Assignment
                        </button>
                        <button
                            onClick={() => setView('submissions')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${view === 'submissions' ? 'bg-orange-600 text-white' : 'hover:bg-zinc-900 text-zinc-400'}`}
                        >
                            <ListChecks size={18} /> Submissions
                        </button>
                    </div>
                </header>

                {view === 'create' ? (
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800">
                            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                <Plus className="text-orange-500" /> Create New Task
                            </h2>
                            <form onSubmit={handleCreate} className="space-y-6">
                                <div>
                                    <label className="block text-sm text-zinc-400 mb-2">Assignment Title</label>
                                    <input
                                        required
                                        type="text"
                                        value={assignment.title}
                                        onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
                                        className="w-full bg-black border border-zinc-700 p-3 rounded-xl focus:border-orange-500 outline-none"
                                        placeholder="e.g. End Semester Project Phase 1"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-zinc-400 mb-2">Instructions / Details</label>
                                    <textarea
                                        required
                                        rows={4}
                                        value={assignment.description}
                                        onChange={(e) => setAssignment({ ...assignment, description: e.target.value })}
                                        className="w-full bg-black border border-zinc-700 p-3 rounded-xl focus:border-orange-500 outline-none resize-none"
                                        placeholder="Detailed instructions for students..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-zinc-400 mb-2">Submission Deadline</label>
                                    <input
                                        required
                                        type="datetime-local"
                                        value={assignment.deadline}
                                        onChange={(e) => setAssignment({ ...assignment, deadline: e.target.value })}
                                        className="w-full bg-black border border-zinc-700 p-3 rounded-xl focus:border-orange-500 outline-none [color-scheme:dark]"
                                    />
                                </div>
                                <button disabled={loading} className="w-full py-4 bg-gradient-to-r from-orange-600 to-amber-600 rounded-xl font-bold shadow-lg shadow-orange-900/20 hover:shadow-orange-900/40 transition-all">
                                    {loading ? "Publishing..." : "Publish Assignment"}
                                </button>
                            </form>
                        </div>

                        <div className="bg-zinc-900/30 p-8 rounded-2xl border border-zinc-800/50 flex items-center justify-center text-zinc-500">
                            <div className="text-center">
                                <Calendar size={48} className="mx-auto mb-4 opacity-50" />
                                <p>Select a deadline to see preview here.</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-black border-b border-zinc-800">
                                <tr>
                                    <th className="p-4 text-zinc-400 font-medium">Student Name</th>
                                    <th className="p-4 text-zinc-400 font-medium">Roll No</th>
                                    <th className="p-4 text-zinc-400 font-medium">Assignment</th>
                                    <th className="p-4 text-zinc-400 font-medium">Submitted At</th>
                                    <th className="p-4 text-zinc-400 font-medium">Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {submissions.map((sub) => (
                                    <tr key={sub.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                                        <td className="p-4 font-semibold">{sub.name}</td>
                                        <td className="p-4 text-zinc-400 font-mono text-sm">{sub.rollNo}</td>
                                        <td className="p-4">{sub.assignmentTitle}</td>
                                        <td className="p-4 text-sm text-zinc-500">
                                            {sub.submittedAt?.seconds ? format(new Date(sub.submittedAt.seconds * 1000), "PP p") : "Just now"}
                                        </td>
                                        <td className="p-4">
                                            <a href={sub.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300">
                                                <ExternalLink size={16} /> Open
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                                {submissions.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-zinc-500">No submissions yet.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
