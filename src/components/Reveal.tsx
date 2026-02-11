"use client";
import React, { useEffect, useRef, useState } from "react";

interface RevealProps {
    children: React.ReactNode;
    width?: "fit-content" | "100%";
    delay?: number;
    className?: string;
}

export default function Reveal({ children, width = "fit-content", delay = 0, className = "" }: RevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

        if (ref.current) observer.observe(ref.current);

        return () => {
            if (ref.current) observer.disconnect();
        };
    }, []);

    return (
        <div
            ref={ref}
            style={{ width, transitionDelay: `${delay}ms` }}
            className={`transition-all duration-1000 cubic-bezier(0.17, 0.55, 0.55, 1) transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"} ${className}`}
        >
            {children}
        </div>
    );
}
