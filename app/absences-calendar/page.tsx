"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const ROLE_OPTIONS = ["Bénévole", "Responsable", "Référent", "Coordinateur"];

const COLOR_MAP: Record<string, string> = {
  Bénévole: "#2563eb",
  Responsable: "#dc2626",
  Référent: "#d97706",
  Coordinateur: "#059669",
};

interface AbsenceEvent {
  id: string;
  title: string;
  start: string;
  end?: string;
  allDay?: boolean;
  color: string;
  extendedProps?: {
    name: string;
    role: string;
    reason?: string;
  };
}

export default function AbsencesPage() {
  const calendarRef = useRef<any>(null);

  const [events, setEvents] = useState<AbsenceEvent[]>([
    {
      id: "1",
      title: "Absence — Dupont J.",
      start: "2026-04-16",
      end: "2026-04-18",
      color: COLOR_MAP["Responsable"],
      extendedProps: { name: "Jean Dupont", role: "Responsable", reason: "Congé annuel" },
    },
  ]);

  const [modal, setModal] = useState<{ open: boolean; dateStr?: string; event?: AbsenceEvent; mode: "add" | "view" }>({
    open: false,
    mode: "add",
  });
  const [form, setForm] = useState({ name: "", role: ROLE_OPTIONS[0], reason: "", endDate: "" });
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [view, setView] = useState<"dayGridMonth" | "dayGridWeek">("dayGridMonth");

  const openAddModal = (dateStr: string) => {
    setForm({ name: "", role: ROLE_OPTIONS[0], reason: "", endDate: dateStr });
    setModal({ open: true, dateStr, mode: "add" });
  };

  const openViewModal = (event: AbsenceEvent) => {
    setModal({ open: true, event, mode: "view" });
  };

  const handleAddSubmit = () => {
    if (!form.name.trim()) return;
    const lastName = form.name.trim().split(" ").pop()?.charAt(0).toUpperCase() + ".";
    const firstName = form.name.trim().split(" ")[0];
    const newEvent: AbsenceEvent = {
      id: String(Date.now()),
      title: `Absence — ${firstName} ${lastName}`,
      start: modal.dateStr!,
      end: form.endDate && form.endDate !== modal.dateStr ? form.endDate : undefined,
      allDay: true,
      color: COLOR_MAP[form.role] || "#6b7280",
      extendedProps: { name: form.name.trim(), role: form.role, reason: form.reason.trim() },
    };
    setEvents((prev) => [...prev, newEvent]);
    setModal({ open: false, mode: "add" });
  };

  const handleDelete = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    setConfirmDelete(null);
    setModal({ open: false, mode: "add" });
  };

  const switchView = (v: "dayGridMonth" | "dayGridWeek") => {
    setView(v);
    calendarRef.current?.getApi().changeView(v);
  };

  return (
    <div className="min-h-screen bg-[#f8f7f4] font-sans text-[#1a1a2e]">
      {/* HEADER AVEC IMAGE ET OVERLAY */}
      <header className="relative bg-[url('/assets/img/background-1.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1e]/80 to-[#0a0a1e]/40"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <Navbar />
          {/* SECTION HERO AÉRÉE (py-24 à py-40) */}
          <section className="px-6 py-28 md:py-44">
            <span className="inline-block text-[11px] font-semibold tracking-[0.2em] uppercase text-white/50 mb-6">
              Ressources humaines — Planning
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-white leading-[1.1] mb-6 tracking-tight">
              Gestion des absences
            </h1>
            <div className="w-12 h-[2px] bg-white/40 mb-8"></div>
            <p className="text-lg text-white/70 max-w-lg leading-relaxed font-light">
              Supervisez les indisponibilités de vos bénévoles, responsables et référents
              depuis une interface centralisée et actualisée en temps réel.
            </p>
          </section>
        </div>
      </header>

      {/* STATS BAR */}
      <div className="bg-white border-b border-[#e8e5e0]">
        <div className="max-w-7xl mx-auto flex overflow-x-auto">
          <div className="px-8 py-7 border-r border-[#f0ede8] min-w-[160px]">
            <span className="block font-serif text-3xl font-bold">{events.length}</span>
            <span className="text-[10px] font-medium tracking-widest uppercase text-gray-400">Absences totales</span>
          </div>
          <div className="px-8 py-7 border-r border-[#f0ede8] min-w-[160px]">
            <span className="block font-serif text-3xl font-bold text-[#dc2626]">
              {events.filter(e => e.extendedProps?.role === "Responsable").length}
            </span>
            <span className="text-[10px] font-medium tracking-widest uppercase text-gray-400">Responsables</span>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-6 py-16 space-y-12">
        
        {/* CALENDAR CARD */}
        <section className="bg-white border border-[#e8e5e0] rounded-sm shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-[#f0ede8] flex flex-wrap justify-between items-center gap-4">
            <div>
              <h2 className="font-serif text-2xl font-bold">Calendrier des absences</h2>
              <p className="text-sm text-gray-400 mt-1">Cliquez sur une date pour enregistrer une absence</p>
            </div>
            <div className="flex bg-[#f8f7f4] border border-[#e8e5e0] rounded-sm p-1">
              <button 
                onClick={() => switchView("dayGridMonth")}
                className={`px-4 py-1.5 text-xs font-semibold transition-all ${view === "dayGridMonth" ? "bg-[#1a1a2e] text-white shadow-md" : "text-gray-500 hover:text-[#1a1a2e]"}`}
              >
                Mois
              </button>
              <button 
                onClick={() => switchView("dayGridWeek")}
                className={`px-4 py-1.5 text-xs font-semibold transition-all ${view === "dayGridWeek" ? "bg-[#1a1a2e] text-white shadow-md" : "text-gray-500 hover:text-[#1a1a2e]"}`}
              >
                Semaine
              </button>
            </div>
          </div>

          <div className="p-8">
            {/* Legend */}
            <div className="flex flex-wrap gap-6 mb-8">
              {Object.entries(COLOR_MAP).map(([role, color]) => (
                <div key={role} className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                  <span className="w-2 h-2 rounded-full" style={{ background: color }} />
                  {role}
                </div>
              ))}
            </div>

            <div className="calendar-container">
              <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                locale="fr"
                selectable
                events={events}
                dateClick={(info) => openAddModal(info.dateStr)}
                eventClick={(info) => {
                  const ev = events.find((e) => e.id === info.event.id);
                  if (ev) openViewModal(ev);
                }}
                height="auto"
                buttonText={{ today: "Aujourd'hui" }}
              />
            </div>
          </div>
        </section>

        {/* INFO CARDS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { num: "01", title: "Enregistrement", text: "Sélectionnez n'importe quelle date sur le calendrier pour déclarer une absence." },
            { num: "02", title: "Délégation", text: "Le système Strapi assure la continuité de service vers le suppléant désigné." },
            { num: "03", title: "Suivi centralisé", text: "Chaque rôle dispose d'un code couleur pour une lecture rapide des disponibilités." }
          ].map((item, idx) => (
            <div key={idx} className="group bg-white border border-[#e8e5e0] p-8 relative overflow-hidden transition-all hover:border-[#1a1a2e]/30">
              <div className="absolute top-0 left-0 w-[3px] h-full bg-[#1a1a2e] opacity-5 group-hover:opacity-40 transition-opacity"></div>
              <div className="font-serif text-3xl text-[#e8e5e0] mb-4">{item.num}</div>
              <h3 className="text-xs font-bold uppercase tracking-widest mb-3">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed font-light">{item.text}</p>
            </div>
          ))}
        </section>
      </main>

      {/* MODAL ADD */}
      {modal.open && modal.mode === "add" && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0a0a1e]/60 backdrop-blur-sm transition-opacity" onClick={() => setModal({ open: false, mode: "add" })}>
          <div className="bg-white w-full max-w-md rounded-sm shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="px-8 py-6 border-b border-[#f0ede8]">
              <h3 className="font-serif text-xl font-bold">Déclarer une absence</h3>
              <p className="text-xs text-gray-400 mt-1 uppercase tracking-tighter">Début : {modal.dateStr}</p>
            </div>
            <div className="p-8 space-y-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Nom complet</label>
                <input 
                  type="text" 
                  className="w-full bg-[#f8f7f4] border border-[#e8e5e0] px-4 py-2.5 text-sm outline-none focus:border-[#1a1a2e] transition-colors"
                  placeholder="ex. Marie Lefebvre"
                  value={form.name}
                  onChange={e => setForm({...form, name: e.target.value})}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Rôle</label>
                <select 
                   className="w-full bg-[#f8f7f4] border border-[#e8e5e0] px-4 py-2.5 text-sm outline-none"
                   value={form.role}
                   onChange={e => setForm({...form, role: e.target.value})}
                >
                  {ROLE_OPTIONS.map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Date de fin (facultatif)</label>
                <input 
                  type="date" 
                  className="w-full bg-[#f8f7f4] border border-[#e8e5e0] px-4 py-2.5 text-sm"
                  value={form.endDate}
                  min={modal.dateStr}
                  onChange={e => setForm({...form, endDate: e.target.value})}
                />
              </div>
            </div>
            <div className="px-8 py-6 bg-[#f8f7f4] flex gap-3 justify-end">
              <button onClick={() => setModal({ open: false, mode: "add" })} className="px-5 py-2 text-xs font-bold text-gray-400 uppercase">Annuler</button>
              <button 
                onClick={handleAddSubmit}
                disabled={!form.name.trim()}
                className="px-6 py-2 bg-[#1a1a2e] text-white text-xs font-bold uppercase tracking-widest hover:bg-black transition-colors disabled:opacity-30"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL VIEW (Simplifiée pour l'exemple) */}
      {modal.open && modal.mode === "view" && modal.event && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0a0a1e]/60 backdrop-blur-sm" onClick={() => setModal({ open: false, mode: "add" })}>
           <div className="bg-white w-full max-w-sm p-8 space-y-6" onClick={e => e.stopPropagation()}>
              <h3 className="font-serif text-2xl font-bold border-b pb-4">Détail</h3>
              <div className="space-y-4">
                <p className="text-sm"><strong>Nom:</strong> {modal.event.extendedProps?.name}</p>
                <p className="text-sm"><strong>Rôle:</strong> {modal.event.extendedProps?.role}</p>
                <p className="text-sm"><strong>Du:</strong> {modal.event.start}</p>
              </div>
              <div className="flex justify-end gap-4 pt-4">
                 <button onClick={() => handleDelete(modal.event!.id)} className="text-red-600 text-xs font-bold uppercase">Supprimer</button>
                 <button onClick={() => setModal({ open: false, mode: "add" })} className="bg-[#1a1a2e] text-white px-4 py-2 text-xs font-bold uppercase">Fermer</button>
              </div>
           </div>
        </div>
      )}

      <Footer />
    </div>
  );
}