// app/register/page.js
"use client";
import Link from 'next/link';

export default function RegisterEntry() {
  const cards = [
    {
      title: "NEWSPAPER",
      role: "Newspaper",
      points: ["Access to Diverse Writing Talent", "Flexible Collaboration Models", "Content Quality & Brand Expansion"]
    },
    {
      title: "JOB SEEKER",
      role: "JobSeeker",
      points: ["Smart Job Matching", "Verified Employer Network", "Portfolio & Resume Showcase"]
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F5DC] flex flex-col items-center justify-center p-6 text-black">
      <h1 className="text-3xl font-black absolute top-10 left-10 tracking-tight">NEWSCONNECT</h1>
      
      <h2 className="text-4xl font-black mb-16 tracking-wide">REGISTER YOURSELF !</h2>
      
      <div className="flex flex-col md:flex-row gap-12">
        {cards.map((card) => (
          <div key={card.title} className="bg-black text-white p-12 rounded-[30px] w-80 shadow-[10px_10px_0px_0px_rgba(0,0,0,0.1)]">
            <h3 className="text-2xl font-black text-center mb-10 border-b border-white/20 pb-4">
              {card.title}
            </h3>
            <ul className="space-y-6 mb-12">
              {card.points.map((pt) => (
                <li key={pt} className="text-lg leading-tight font-light">{pt}</li>
              ))}
            </ul>
            <Link 
              href={`/register/form?role=${card.role}`}
              className="block w-full bg-white text-black text-center py-3 rounded-full font-bold hover:bg-gray-200 transition-colors"
            >
              SignUp
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}