export default function JsonLd() {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Bishal Mondal",
        "url": "https://bishal-port.vercel.app/",
        "image": "https://bishal-port.vercel.app/Bishal.svg",
        "jobTitle": "Technical Assistant & Full Stack Developer",
        "worksFor": {
            "@type": "Organization",
            "name": "Adamas University"
        },
        "sameAs": [
            "https://github.com/bishal9874",
            "https://linkedin.com/in/bishal-mondal-official", // Assuming standard linkedin URL structure, user effectively needs to verify
            "https://bishal-port.vercel.app/"
        ],
        "description": "Experienced Technical Assistant and Full Stack Developer specializing in Flutter, IoT, and Modern Web Tech.",
        "knowsAbout": ["Flutter", "IoT", "React", "Next.js", "Python", "C++", "Arduino"],
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Kolkata",
            "addressRegion": "West Bengal",
            "addressCountry": "IN",
            "postalCode": "743234"
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
}
