"use client";
import React from 'react';
import { Layout, Smartphone, Cpu, GraduationCap, ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import Link from 'next/link';

interface Service {
    title: string;
    description: string;
    icon: React.ReactNode;
    features: string[];
    action?: {
        label: string;
        href: string;
    };
    color: string;
    bg: string;
}

const services: Service[] = [
    // {
    //     title: "Web Development",
    //     description: "Modern, responsive websites built with Next.js, React, and Tailwind CSS. Focused on performance and SEO.",
    //     icon: <Layout size={32} />,
    //     features: ["Landing Pages", "Full Stack Apps", "E-commerce", "Performance Optimization"],
    //     color: "text-blue-500",
    //     bg: "bg-blue-500/10 border-blue-500/20"
    // },
    // {
    //     title: "Mobile App Development",
    //     description: "Cross-platform mobile applications using Flutter. Beautiful UI and native performance for iOS and Android.",
    //     icon: <Smartphone size={32} />,
    //     features: ["iOS & Android", "UI/UX Design", "API Integration", "State Management"],
    //     color: "text-purple-500",
    //     bg: "bg-purple-500/10 border-purple-500/20"
    // },
    // {
    //     title: "IoT Solutions",
    //     description: "End-to-end IoT prototyping from circuit design to cloud connectivity using Arduino and ESP32.",
    //     icon: <Cpu size={32} />,
    //     features: ["Circuit Design", "Firmware (C++)", "Sensors & Actuators", "Cloud Integration"],
    //     color: "text-emerald-500",
    //     bg: "bg-emerald-500/10 border-emerald-500/20"
    // },
    {
        title: "Mentorship & Training",
        description: "Guiding students effectively in Computer Science subjects, Assignments, and Project development.",
        icon: <GraduationCap size={32} />,
        features: ["1:1 Mentoring", "Code Reviews", "Assignment Help", "Career Guidance"],
        action: {
            label: "Student Portal",
            href: "/students"
        },
        color: "text-orange-500",
        bg: "bg-orange-500/10 border-orange-500/20"
    }
];

export default function Services() {
    return (
        <section id="services" className="py-24 relative bg-white dark:bg-black transition-colors duration-300">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-50/50 dark:via-zinc-900/50 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <Reveal width="100%" className="flex flex-col items-center">
                        <span className="text-orange-600 dark:text-orange-500 font-mono text-sm tracking-wider uppercase mb-2 block animate-fade-in">What I Offer</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6">
                            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">Services</span>
                        </h2>
                        <p className="text-zinc-600 dark:text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                            Professional solutions tailored to your needs, from code to hardware.
                        </p>
                    </Reveal>
                </div>

                <div className="flex flex-wrap justify-center gap-6">
                    {services.map((service, idx) => (
                        <Reveal key={idx} delay={idx * 100} width="100%" className="w-full max-w-md flex-shrink-0">
                            <div className="group relative bg-zinc-50 dark:bg-zinc-900/50 backdrop-blur-sm border border-zinc-200 dark:border-white/10 rounded-3xl p-8 hover:-translate-y-2 transition-all duration-300 hover:shadow-xl dark:shadow-none h-full flex flex-col items-center text-center">
                                <div className={`w-16 h-16 rounded-2xl ${service.bg} ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    {service.icon}
                                </div>

                                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">{service.title}</h3>
                                <p className="text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed text-sm flex-grow">
                                    {service.description}
                                </p>

                                <ul className="space-y-2 mb-8 w-full">
                                    {service.features.map((feature, i) => (
                                        <li key={i} className="flex items-center justify-center gap-2 text-sm text-zinc-500 dark:text-zinc-500">
                                            <div className={`w-1.5 h-1.5 rounded-full ${service.color.replace('text-', 'bg-')}`} />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                {service.action && (
                                    <Link href={service.action.href} className="mt-auto w-full group/btn flex items-center justify-center gap-2 py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black font-semibold transition-all hover:opacity-90">
                                        {service.action.label}
                                        <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                    </Link>
                                )}
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
