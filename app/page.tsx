"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const ALL_CATS = [
  { id: 1, name: "Misty", age: "2 ans • Femelle", tags: ["Affectueux", "Calme"], img: "/assets/misty.png" },
  { id: 2, name: "Simba", age: "4 ans • Mâle", tags: ["Joueur", "Curieux"], img: "/assets/simba.png" },
  { id: 3, name: "Oreo", age: "1 an • Mâle", tags: ["Sociable", "Bavard"], img: "/assets/oreo.png" },
  { id: 4, name: "Ginger", age: "6 ans • Femelle", tags: ["Indépendante"], img: "/assets/ginger.png" },
  { id: 5, name: "Luna", age: "3 ans • Femelle", tags: ["Douce"], img: "/assets/header1.png" },
  { id: 6, name: "Felix", age: "5 ans • Mâle", tags: ["Actif"], img: "/assets/header2.png" },
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [email, setEmail] = useState("");

  // Logique du carrousel automatique (3s)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev < ALL_CATS.length - 4 ? prev + 1 : 0));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDF8F4] text-[#3C2A21] font-sans selection:bg-[#A65D2E] selection:text-white">
      
      {/* --- NAVIGATION --- */}
      <nav className="flex justify-between items-center px-10 py-6 md:px-20">
        <a href="/" className="font-serif text-2xl font-black text-[#A65D2E]">
          SansCroquettesFixes
        </a>
        <ul className="hidden md:flex gap-8 font-medium text-sm">
          <li><a href="#" className="text-[#A65D2E] border-b-2 border-[#A65D2E]">Adopter</a></li>
          <li><a href="#" className="hover:text-[#A65D2E] transition-colors">Donner</a></li>
          <li><a href="#" className="hover:text-[#A65D2E] transition-colors">Histoires</a></li>
          <li><a href="#" className="hover:text-[#A65D2E] transition-colors">À propos</a></li>
        </ul>
        <button className="bg-[#A65D2E] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#8B4A22] transition-all shadow-md">
          Trouver mon chat
        </button>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="grid md:grid-cols-2 items-center gap-10 px-10 py-10 md:px-20 overflow-hidden">
        <div className="z-10">
          <span className="bg-[#F8E9E0] text-[#D4A373] px-3 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-widest mb-6 inline-block">
            SansCroquettesFixes
          </span>
          <h1 className="font-serif text-6xl md:text-8xl leading-[1.1] text-[#A65D2E] mb-8">
            Le réconfort à <br /> portée de patte.
          </h1>
          <p className="text-[#7E746D] text-lg max-w-md mb-10 leading-relaxed">
            Découvrez un havre de paix où chaque chat trouve sa voix. SansCroquettesFixes n'est pas qu'un refuge, c'est le début d'une nouvelle vie.
          </p>
          <div className="flex gap-4">
            <button className="bg-[#A65D2E] text-white px-8 py-4 rounded-full font-bold hover:shadow-lg transition-all">
              Rencontrer nos chats
            </button>
            <button className="bg-[#EDE8E3] text-[#3C2A21] px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition-all">
              Notre mission
            </button>
          </div>
        </div>
        <div className="relative h-[600px] hidden md:block">
          <img src="/assets/header1.png" className="w-[65%] h-full object-cover rounded-[40px] absolute right-0 top-0 shadow-2xl" alt="Chat principal" />
          <img src="/assets/header2.png" className="w-[55%] h-[350px] object-cover rounded-[40px] border-[12px] border-[#FDF8F4] absolute left-0 bottom-0 z-20 shadow-xl" alt="Chat secondaire" />
        </div>
      </header>

      {/* --- CARROUSEL AUTOMATIQUE --- */}
      <section className="bg-white py-20 px-10 md:px-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl mb-2">Coups de Cœur</h2>
            <p className="text-[#7E746D]">Nos protégés qui attendent leur famille pour toujours.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setCurrentIndex(c => Math.max(0, c - 1))} className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center hover:bg-[#A65D2E] hover:text-white transition-all cursor-pointer">←</button>
            <button onClick={() => setCurrentIndex(c => (c < ALL_CATS.length - 4 ? c + 1 : 0))} className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center hover:bg-[#A65D2E] hover:text-white transition-all cursor-pointer">→</button>
          </div>
        </div>

        <div className="overflow-hidden">
          <div 
            className="flex gap-6 transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{ transform: `translateX(-${currentIndex * 25}%)` }}
          >
            {ALL_CATS.map((cat) => (
              <div key={cat.id} className="min-w-[calc(25%-18px)] bg-[#FDF8F4] p-4 rounded-[30px] hover:shadow-xl transition-shadow group">
                <div className="overflow-hidden rounded-[20px] mb-4">
                  <img src={cat.img} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" alt={cat.name} />
                </div>
                <h3 className="font-serif text-2xl mb-1">{cat.name}</h3>
                <p className="text-sm text-[#7E746D] mb-4">{cat.age}</p>
                <div className="flex gap-2">
                  {cat.tags.map(tag => (
                    <span key={tag} className="bg-[#EBF2F1] text-[#618E88] text-[10px] font-bold px-3 py-1 rounded-full uppercase">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION DONATIONS --- */}
      <section className="py-20 px-10 md:px-20 text-center">
        <h2 className="font-serif text-4xl md:text-5xl mb-4">Soutenez le Sanctuaire</h2>
        <p className="text-[#7E746D] max-w-xl mx-auto mb-16">Votre générosité permet de financer les repas et les soins médicaux de nos petits résidents.</p>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <DonCard icon="🍴" amount="20€" label="Kit Alimentaire" desc="Offrez une semaine de repas équilibrés." />
          <DonCard icon="🏥" amount="50€" label="Soins Médicaux" desc="Vaccins et bilan de santé complet." featured />
          <DonCard icon="🏠" amount="100€" label="Abri & Confort" desc="Entretien des espaces et dodo douillets." />
        </div>
        <div className="flex justify-center items-center ">
            <img src="/assets/bank.png" className="object-cover" />
        </div>
      </section>

      {/* --- NEWSLETTER --- */}
      <section className="mx-10 md:mx-20 mb-20 bg-[#F1E9E2] rounded-[40px] grid md:grid-cols-2 overflow-hidden items-center">
        <div className="p-12 md:p-20">
          <h2 className="font-serif text-4xl mb-6">Restez connecté</h2>
          <p className="text-[#7E746D] mb-8">Recevez des nouvelles de nos adoptions et des conseils pour vos compagnons.</p>
          <div className="bg-white p-2 rounded-full flex shadow-sm">
            <input 
              className="flex-1 px-6 outline-none bg-transparent" 
              placeholder="votre@email.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="bg-[#A65D2E] text-white px-8 py-3 rounded-full font-bold hover:bg-[#8B4A22] transition-all">
              S'inscrire
            </button>
          </div>
        </div>
        <img src="/assets/footer.png" className="w-full h-full object-cover min-h-[400px]" alt="Chat newsletter" />
      </section>
    </div>
  );
}

function DonCard({ icon, amount, label, desc, featured = false }) {
  return (
    <div className={`relative p-12 rounded-[30px] border transition-all ${featured ? 'bg-[#A65D2E] text-white scale-105 shadow-2xl border-transparent' : 'bg-white border-gray-100 hover:shadow-lg'}`}>
      {featured && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#3C2A21] text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase">Le plus populaire</span>}
      <div className="text-4xl mb-6">{icon}</div>
      <div className="font-serif text-5xl mb-2">{amount}</div>
      <p className="uppercase text-xs font-black tracking-widest mb-4 opacity-80">{label}</p>
      <p className="text-sm mb-8 opacity-70">{desc}</p>
      <button className={`w-full py-4 rounded-full font-bold transition-all ${featured ? 'bg-white text-[#A65D2E] hover:bg-gray-100' : 'border border-[#A65D2E] text-[#A65D2E] hover:bg-[#A65D2E] hover:text-white'}`}>
        Choisir ce don
      </button>
    </div>
  );
}