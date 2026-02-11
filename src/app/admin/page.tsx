"use client";
import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, orderBy, query, Timestamp } from 'firebase/firestore';
import { Lock, Plus, Calendar, Clock, ListChecks, Link as LinkIcon, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';

export default function AdminPortal() {
    const [auth, setAuth] = useState(false);
    const [creds, setCreds] = useState({ id: "", pass: "" });
    const [view, setView] = useState<'create' | 'submissions' | 'assignments'>('create');

    // Form State
    const [assignment, setAssignment] = useState({
        title: "",
        description: "",
        deadline: ""
    });
    const [loading, setLoading] = useState(false);
    const [submissions, setSubmissions] = useState<any[]>([]);
    const [createdAssignments, setCreatedAssignments] = useState<any[]>([]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: creds.pass })
            });

            if (res.ok) {
                setAuth(true);
            } else {
                alert("Access Denied: Invalid Password");
            }
        } catch (error) {
            console.error("Login error", error);
            alert("Login failed due to a network error.");
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
            if (view === 'assignments') fetchCreatedAssignments();
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

    const fetchCreatedAssignments = async () => {
        const q = query(collection(db, "assignments"), orderBy("deadline", "desc"));
        const querySnapshot = await getDocs(q);
        const tasks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCreatedAssignments(tasks);
    };

    useEffect(() => {
        if (auth) {
            if (view === 'submissions') fetchSubmissions();
            if (view === 'assignments') fetchCreatedAssignments();
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
                <header className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-zinc-800 pb-6 gap-4">
                    <h1 className="text-3xl font-bold">Assignment Dashboard</h1>
                    <div className="flex gap-2 bg-zinc-900 p-1 rounded-xl">
                        <button
                            onClick={() => setView('create')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium ${view === 'create' ? 'bg-orange-600 text-white shadow-lg' : 'hover:bg-zinc-800 text-zinc-400'}`}
                        >
                            <Plus size={16} /> New Job
                        </button>
                        <button
                            onClick={() => setView('assignments')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium ${view === 'assignments' ? 'bg-orange-600 text-white shadow-lg' : 'hover:bg-zinc-800 text-zinc-400'}`}
                        >
                            <Calendar size={16} /> Posted Tasks
                        </button>
                        <button
                            onClick={() => setView('submissions')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium ${view === 'submissions' ? 'bg-orange-600 text-white shadow-lg' : 'hover:bg-zinc-800 text-zinc-400'}`}
                        >
                            <ListChecks size={16} /> Submissions
                        </button>
                    </div>
                </header>

                {view === 'create' && (
                    <div className="grid md:grid-cols-2 gap-12 animate-fade-in">
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
                                    <label className="block text-sm text-zinc-400 mb-2">Instructions / Question</label>
                                    <textarea
                                        required
                                        rows={6}
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

                        <div className="bg-zinc-900/30 p-8 rounded-2xl border border-zinc-800/50 flex flex-col items-center justify-center text-zinc-500">
                            <Calendar size={48} className="mx-auto mb-4 opacity-50 text-orange-500" />
                            <p className="text-lg font-medium mb-2">Ready to Assign?</p>
                            <p className="text-sm max-w-xs text-center">Set a clear title and deadline. Students will see this instantly on their portal.</p>
                        </div>
                    </div>
                )}

                {view === 'assignments' && (
                    <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden animate-fade-in">
                        <div className="p-6 border-b border-zinc-800 bg-black/20">
                            <h2 className="text-xl font-semibold flex items-center gap-2">
                                <Calendar className="text-orange-500" size={20} /> Your Posted Assignments
                            </h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-black/40 border-b border-zinc-800">
                                    <tr>
                                        <th className="p-4 text-zinc-400 font-medium">Title</th>
                                        <th className="p-4 text-zinc-400 font-medium whitespace-nowrap">Created Date</th>
                                        <th className="p-4 text-zinc-400 font-medium whitespace-nowrap">Deadline</th>
                                        <th className="p-4 text-zinc-400 font-medium">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {createdAssignments.map((task: any) => {
                                        const isExpired = itemIsExpired(task.deadline);
                                        return (
                                            <tr key={task.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                                                <td className="p-4 font-semibold text-white">{task.title}</td>
                                                <td className="p-4 text-sm text-zinc-500 whitespace-nowrap">
                                                    {task.createdAt?.seconds ? format(new Date(task.createdAt.seconds * 1000), "MMM d, yyyy") : "N/A"}
                                                </td>
                                                <td className="p-4 text-sm text-zinc-300 whitespace-nowrap font-mono">
                                                    {task.deadline?.seconds ? format(new Date(task.deadline.seconds * 1000), "MMM d, h:mm a") : "No Deadline"}
                                                </td>
                                                <td className="p-4">
                                                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${isExpired ? 'bg-red-900/20 text-red-500 border border-red-900/30' : 'bg-green-900/20 text-green-500 border border-green-900/30'}`}>
                                                        {isExpired ? "Closed" : "Active"}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    {createdAssignments.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="p-12 text-center text-zinc-500">
                                                No assignments posted yet. Create one to get started.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {view === 'submissions' && (
                    <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden animate-fade-in">
                        <div className="p-6 border-b border-zinc-800 bg-black/20">
                            <h2 className="text-xl font-semibold flex items-center gap-2">
                                <ListChecks className="text-orange-500" size={20} /> Student Submissions
                            </h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-black/40 border-b border-zinc-800">
                                    <tr>
                                        <th className="p-4 text-zinc-400 font-medium">Student Name</th>
                                        <th className="p-4 text-zinc-400 font-medium">Roll No</th>
                                        <th className="p-4 text-zinc-400 font-medium">Assignment</th>
                                        <th className="p-4 text-zinc-400 font-medium whitespace-nowrap">Submitted At</th>
                                        <th className="p-4 text-zinc-400 font-medium">Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {submissions.map((sub) => (
                                        <tr key={sub.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                                            <td className="p-4 font-semibold text-white">{sub.name}</td>
                                            <td className="p-4 text-zinc-400 font-mono text-sm">{sub.rollNo}</td>
                                            <td className="p-4 text-zinc-300">{sub.assignmentTitle}</td>
                                            <td className="p-4 text-sm text-zinc-500 whitespace-nowrap">
                                                {sub.submittedAt?.seconds ? format(new Date(sub.submittedAt.seconds * 1000), "MMM d, h:mm a") : "Just now"}
                                            </td>
                                            <td className="p-4">
                                                <a href={sub.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-900/20 text-blue-400 hover:bg-blue-900/40 hover:text-blue-300 transition-colors text-sm font-medium border border-blue-900/30">
                                                    <ExternalLink size={14} /> Open Link
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                    {submissions.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="p-12 text-center text-zinc-500">
                                                No submissions received yet.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function itemIsExpired(deadline: any) {
    if (!deadline) return false;
    return new Date().getTime() > new Date(deadline.seconds * 1000).getTime();
}
