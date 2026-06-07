/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  User, 
  Calendar, 
  MessageSquare, 
  Check, 
  Star, 
  ChevronRight, 
  Sparkles, 
  ShieldCheck, 
  Phone, 
  MapPin, 
  Mail, 
  Trash, 
  Menu, 
  X,
  Send,
  Building2,
  FileText,
  Vote
} from "lucide-react";

interface CitizenFeedback {
  id: string;
  name: string;
  email: string;
  phone: string;
  priority: string;
  topic: string;
  message: string;
  createdAt: string;
}

const PRIORITIES = [
  "Sicherheit & Brandschutz stärken",
  "Transparente & bürgernahe Politik",
  "Infrastruktur & Architektur im Kreis",
  "Wirtschaft & Generationengerechtigkeit"
];

// Greift direkt auf deine lokale Datei im Projekt zu
const CANDIDATE_IMAGE_URL = "Bild.jpg";

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [modalType, setModalType] = useState<"imprint" | "privacy" | null>(null);
  const [feedbacks, setFeedbacks] = useState<CitizenFeedback[]>([]);

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    priority: "",
    topic: "",
    fullName: "",
    phone: "",
    email: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("thurau_wahlkampf_feedback");
    if (saved) {
      try { setFeedbacks(JSON.parse(saved)); } catch (e) { setFeedbacks([]); }
    }
  }, []);

  const handleSelectOption = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setValidationError("");
    setCurrentStep(prev => prev + 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setValidationError("");
  };

  const handleBackStep = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setValidationError("Bitte fülle die Kontaktdaten (*) vollständig aus.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const newFeedback: CitizenFeedback = {
        id: "citizen-" + Date.now(),
        ...formData,
        createdAt: new Date().toISOString()
      };
      const updated = [newFeedback, ...feedbacks];
      setFeedbacks(updated);
      localStorage.setItem("thurau_wahlkampf_feedback", JSON.stringify(updated));
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ priority: "", topic: "", fullName: "", phone: "", email: "", message: "" });
    }, 1000);
  };

  const handleDeleteFeedback = (id: string) => {
    const updated = feedbacks.filter(f => f.id !== id);
    setFeedbacks(updated);
    localStorage.setItem("thurau_wahlkampf_feedback", JSON.stringify(updated));
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-[#007A87]/10 selection:text-[#007A87] overflow-x-hidden">
      
      {styleTag}

      <div className="w-full bg-[#007A87] text-white text-xs py-2.5 px-4 text-center tracking-widest font-mono uppercase font-black sticky top-0 z-50 shadow-sm">
        📢 PARTEIÜBERGREIFEND & UNABHÄNGIG: FÜR DEN LANDKREIS WOLFENBÜTTEL
      </div>

      <header className="w-full bg-white/90 backdrop-blur-xl border-b border-slate-200 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex justify-between items-center">
          
          <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-12 h-12 bg-slate-900 transition-transform duration-500 group-hover:rotate-6 flex flex-col items-center justify-center text-white border-b-4 border-amber-500">
              <Vote className="w-6 h-6 text-[#007A87]" />
            </div>
            <div>
              <span className="font-serif text-xl md:text-2xl font-black tracking-tight block leading-none">Tobias Thurau</span>
              <span className="text-[10px] font-mono tracking-[0.18em] font-bold text-amber-500 uppercase block mt-1.5">Ihr Landratskandidat 2026</span>
            </div>
          </div>

          <nav className="hidden md:flex space-x-8 items-center font-mono text-xs uppercase tracking-widest font-bold">
            <button onClick={() => scrollTo("motivation")} className="text-slate-600 hover:text-slate-900 transition-colors">Motivation</button>
            <button onClick={() => scrollTo("values")} className="text-slate-600 hover:text-slate-900 transition-colors">Werte & Ziele</button>
            <button onClick={() => scrollTo("dialogue")} className="text-slate-600 hover:text-slate-900 transition-colors">Bürgerdialog</button>
            <span className="bg-slate-900 text-white px-3 py-1 text-[9px] font-mono rounded">Nominiert von der CDU</span>
          </nav>

          <div className="hidden lg:block">
            <button onClick={() => scrollTo("survey-card")} className="px-6 py-3.5 bg-[#007A87] text-white text-xs font-mono uppercase tracking-widest font-black shadow-md hover:bg-slate-900 transition-all duration-300">
              Mitmachen & Abstimmen
            </button>
          </div>

          <div className="flex md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-900">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-lg py-5 px-6 space-y-4 font-mono text-xs uppercase tracking-widest shadow-xl">
            <button onClick={() => scrollTo("motivation")} className="block w-full text-left py-2 text-slate-600">Motivation</button>
            <button onClick={() => scrollTo("values")} className="block w-full text-left py-2 text-slate-600">Werte & Ziele</button>
            <button onClick={() => scrollTo("dialogue")} className="block w-full text-left py-2 text-slate-600">Bürgerdialog</button>
            <hr className="border-slate-200" />
            <button onClick={() => scrollTo("survey-card")} className="w-full text-center block py-4 bg-[#007A87] text-white font-black tracking-widest">Meinung abgeben</button>
          </div>
        )}
      </header>

      {/* Hero Section mit Kandidatenbild */}
      <section id="hero" className="relative py-12 md:py-20 bg-white overflow-hidden">
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-[#007A87]/5 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center space-x-2 bg-slate-100 border border-slate-200 pl-2 pr-4 py-1.5 rounded-full">
                <span className="bg-amber-500 text-slate-950 text-[9px] font-mono uppercase px-2 py-0.5 font-black rounded-full">Kandidatur</span>
                <span className="text-[10px] font-mono tracking-widest uppercase text-slate-600 font-bold">Landkreis Wolfenbüttel</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-6xl text-slate-950 leading-[1.1] tracking-tight font-black">
                Sachlich. Transparent. <br />
                <span className="text-[#007A87] font-serif font-black italic block mt-1">
                  Bürgernahe Kommunalpolitik.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed font-light">
                Ich kandidiere als Landrat für unseren Landkreis Wolfenbüttel – als parteiübergreifender und unabhängiger Kandidat, nominiert von der CDU Wolfenbüttel. Als Brandschutzingenieur bringe ich echte Verantwortung und Verlässlichkeit mit.
              </p>

              {/* Bildplatzierung für Mobilgeräte */}
              <div className="block lg:hidden my-6 w-full max-w-[280px] mx-auto aspect-[3/4] overflow-hidden shadow-lg border border-slate-200">
                <img src={CANDIDATE_IMAGE_URL} alt="Tobias Thurau" className="w-full h-full object-cover" onError={(e)=>{e.currentTarget.src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400"}} />
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button onClick={() => scrollTo("survey-card")} className="px-8 py-4 bg-slate-900 hover:bg-[#007A87] text-white font-mono text-xs uppercase tracking-widest font-black transition-all duration-300 text-center shadow-lg">
                  Ihre Prioritäten mitteilen
                </button>
                <a href="mailto:tobias.thurau@t-online.de" className="px-8 py-4 border border-slate-300 hover:bg-slate-50 text-slate-800 font-mono text-xs uppercase tracking-widest font-black transition-all duration-300 text-center flex items-center justify-center gap-2">
                  <span>Direkt-Kontakt</span>
                  <Mail className="w-4 h-4 text-[#007A87]" />
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-100 font-mono text-left text-xs text-slate-500">
                <div><strong className="block text-slate-950 text-sm font-bold">52 Jahre</strong> <span>Alter</span></div>
                <div><strong className="block text-slate-950 text-sm font-bold">Architektur</strong> <span>Studium</span></div>
                <div><strong className="block text-slate-950 text-sm font-bold">Brandschutz</strong> <span>Ingenieurberuf</span></div>
                <div><strong className="block text-slate-950 text-sm font-bold">Klein Flöthe</strong> <span>Wohnort im Kreis</span></div>
              </div>
            </div>

            {/* Desktop Portrait Showcase */}
            <div className="hidden lg:col-span-5 lg:flex justify-center items-center">
              <div className="relative w-full max-w-[340px] aspect-[3/4] bg-slate-50 shadow-2xl border border-slate-100 p-2.5">
                <div className="w-full h-full overflow-hidden relative">
                  <img
                    src={CANDIDATE_IMAGE_URL}
                    alt="Tobias Thurau Portrait"
                    className="w-full h-full object-cover"
                    onError={(e)=>{e.currentTarget.src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400"}}
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white px-4 py-2.5 border border-slate-100 shadow-xl font-mono text-[10px] text-slate-500">
                  📍 Tobias Thurau im Landkreis
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Form Section */}
      <section id="survey-section" className="py-12 bg-slate-50 border-y border-slate-200">
        <div className="max-w-3xl mx-auto px-4">
          <div id="survey-card" className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl relative border border-slate-800 scroll-mt-28">
            <div className="absolute top-0 right-8 -translate-y-1/2 bg-amber-500 text-slate-950 text-[10px] font-extrabold tracking-widest uppercase px-3 py-1 rounded-full shadow-md font-mono">
              Bürger-Check
            </div>

            {!submitSuccess ? (
              <>
                <div className="mb-6 text-left">
                  <h3 className="font-display font-bold text-lg text-white">Landkreis-Mitgestaltung</h3>
                  <p className="text-slate-400 text-xs mt-1">Teilen Sie mir in 3 Schritten Ihre wichtigsten Anliegen für den Landkreis Wolfenbüttel mit.</p>
                  <div className="flex items-center gap-1 mt-4">
                    {[1, 2, 3].map((stepNum) => (
                      <div key={stepNum} className={`h-1 rounded-full flex-1 transition-all ${stepNum <= currentStep ? "bg-[#007A87]" : "bg-slate-800"}`} />
                    ))}
                  </div>
                </div>

                {currentStep === 1 && (
                  <div className="space-y-2.5">
                    <label className="block text-xs font-mono uppercase text-slate-300 tracking-wider text-left">1. Was hat für Sie oberste Priorität?</label>
                    {PRIORITIES.map((p, i) => (
                      <button key={i} onClick={() => handleSelectOption("priority", p)} className="w-full text-left p-3.5 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-800 hover:border-[#007A87] transition-all font-medium text-xs flex items-center justify-between group cursor-pointer">
                        <span>{p}</span>
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-500" />
                      </button>
                    ))}
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-2.5">
                    <label className="block text-xs font-mono uppercase text-slate-300 tracking-wider text-left">2. Welcher Bereich benötigt den stärksten Fokus?</label>
                    <button onClick={() => handleSelectOption("topic", "Bürgernähe & Digitalisierung")} className="w-full text-left p-3.5 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-800 hover:border-[#007A87] transition-all font-medium text-xs flex items-center justify-between cursor-pointer">
                      <span>Bürgernähe & Verwaltungs-Digitalisierung</span>
                    </button>
                    <button onClick={() => handleSelectOption("topic", "Sicherheit & Feuerwehren")} className="w-full text-left p-3.5 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-800 hover:border-[#007A87] transition-all font-medium text-xs flex items-center justify-between cursor-pointer">
                      <span>Sicherheitsinfrastruktur & Ehrenamt</span>
                    </button>
                    <button onClick={() => handleSelectOption("topic", "Solide Finanzen & Wirtschaft")} className="w-full text-left p-3.5 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-800 hover:border-[#007A87] transition-all font-medium text-xs flex items-center justify-between cursor-pointer">
                      <span>Sachliche Wirtschaftspolitik</span>
                    </button>
                    <button onClick={handleBackStep} className="text-xs text-slate-500 hover:text-white pt-2 block font-mono">← Zurück</button>
                  </div>
                )}

                {currentStep === 3 && (
                  <form onSubmit={handleSubmit} className="space-y-4 text-left">
                    <div>
                      <label className="block text-[10px] font-mono text-slate-300 uppercase tracking-wider mb-1">Ihr vollständiger Name *</label>
                      <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full rounded-lg bg-slate-950 border border-slate-800 p-3 text-xs focus:border-[#007A87] outline-none text-white" placeholder="z.B. Hans Müller" required />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-mono text-slate-300 uppercase tracking-wider mb-1">Telefonnummer *</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full rounded-lg bg-slate-950 border border-slate-800 p-3 text-xs focus:border-[#007A87] outline-none text-white font-mono" placeholder="0176..." required />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-slate-300 uppercase tracking-wider mb-1">E-Mail-Adresse *</label>
                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full rounded-lg bg-slate-950 border border-slate-800 p-3 text-xs focus:border-[#007A87] outline-none text-white" placeholder="name@mail.de" required />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-slate-300 uppercase tracking-wider mb-1">Ihre Nachricht / Anliegen (Optional)</label>
                      <textarea name="message" value={formData.message} onChange={handleInputChange} rows={2} className="w-full rounded-lg bg-slate-950 border border-slate-800 p-3 text-xs focus:border-[#007A87] outline-none text-white resize-none" placeholder="Welches Thema liegt Ihnen im Kreis besonders am Herzen?"></textarea>
                    </div>

                    {validationError && <p className="text-xs text-red-400 font-mono">⚠️ {validationError}</p>}

                    <button type="submit" disabled={isSubmitting} className="w-full py-3.5 bg-[#007A87] text-white font-mono text-xs uppercase tracking-widest font-black transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer">
                      {isSubmitting ? "Wird übertragen..." : "Dialog-Anfrage absenden"}
                    </button>
                    <button type="button" onClick={handleBackStep} className="text-xs text-slate-500 hover:text-white font-mono block">← Zurück</button>
                  </form>
                )}
              </>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto">✓</div>
                <h3 className="font-serif text-xl font-bold">Vielen Dank für Ihren Beitrag!</h3>
                <p className="text-slate-300 text-xs leading-relaxed">Hallo <strong>{formData.fullName}</strong>, Ihre Rückmeldung wurde direkt erfasst. Ich schätze den ehrlichen Austausch sehr.</p>
                <button onClick={() => { setSubmitSuccess(false); setCurrentStep(1); }} className="text-xs text-amber-500 underline font-mono">Weiteren Beitrag einreichen</button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Motivation Section */}
      <section id="motivation" className="py-20 bg-slate-950 text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest block font-mono">// MEINE MOTIVATION</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black tracking-tight">Verantwortung, Sicherheit und verlässliche Entscheidungen für Wolfenbüttel.</h2>
            <div className="w-12 h-1 bg-[#007A87] mx-auto rounded-full" />
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto font-light">
              In meinem Berufsalltag als Regierungsbrandmeister und Brandschutzingenieur geht es täglich um den Schutz von Menschen und sachliche, faktenbasierte Analysen. Genau diesen lösungsorientierten Ansatz möchte ich einbringen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="bg-slate-900 p-8 border border-slate-800/60 space-y-3">
              <span className="text-[#007A87] font-mono font-bold text-sm">01 /</span>
              <h3 className="font-serif text-lg font-bold">Parteiübergreifende Sachpolitik</h3>
              <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed">Kommunalpolitik darf kein ideologischer Streitplatz sein. Als unabhängiger Kandidat suche ich stets die vernünftigste Lösung für die Bürgerinnen und Bürger.</p>
            </div>
            <div className="bg-slate-900 p-8 border border-slate-800/60 space-y-3">
              <span className="text-[#007A87] font-mono font-bold text-sm">02 /</span>
              <h3 className="font-serif text-lg font-bold">Garantierte Transparenz</h3>
              <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed">Verwaltungsentscheidungen müssen nachvollziehbar sein. Ich stehe für eine transparente Politik, die Betroffene frühzeitig zu Beteiligten macht.</p>
            </div>
            <div className="bg-slate-900 p-8 border border-slate-800/60 space-y-3">
              <span className="text-[#007A87] font-mono font-bold text-sm">03 /</span>
              <h3 className="font-serif text-lg font-bold">Sicherheit & Ehrenamt</h3>
              <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed">Unsere Feuerwehren, Rettungsdienste und sozialen Vereine bilden das Rückgrat des Landkreises. Das Ehrenamt verdient maximale Unterstützung.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Werte & Ziele Section */}
      <section id="values" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5">
              <div className="bg-slate-50 p-6 border border-slate-200 shadow-sm space-y-4 text-left">
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block font-bold">Steckbrief</span>
                <h4 className="font-serif text-xl font-black text-slate-950">Zur Person Tobias Thurau</h4>
                <div className="space-y-3 font-sans text-xs text-slate-600 leading-relaxed font-light">
                  <p className="border-b pb-1.5"><strong>Beruf:</strong> Brandschutzingenieur (zuvor Architekturstudium)</p>
                  <p className="border-b pb-1.5"><strong>Ehrenamt:</strong> Regierungsbrandmeister</p>
                  <p className="border-b pb-1.5"><strong>Wohnort:</strong> 38312 Klein Flöthe, Landkreis Wolfenbüttel</p>
                  <p><strong>Politik-Stil:</strong> Unabhängig, sachbezogen, bürgernah</p>
                </div>
                <div className="p-3 bg-[#007A87]/5 border border-[#007A87]/20 rounded text-[11px] text-[#007A87] font-mono uppercase font-bold text-center tracking-wider">
                  Nominiert von der CDU Wolfenbüttel
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block font-mono">// PROFIL & PERSPEKTIVE</span>
              <h2 className="font-serif text-3xl font-black text-slate-950 tracking-tight leading-tight">Faktenbasierte Entscheidungen statt leerer Versprechungen.</h2>
              <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed">
                Durch mein Architekturstudium und meine tägliche Praxis als Brandschutzingenieur kenne ich die Herausforderungen moderner Infrastruktur, Bauplanung und kommunaler Großprojekte im Detail. Ich werde dafür sorgen, dass Budgets eingehalten und bürokratische Hürden abgebaut werden.
              </p>
              <div className="space-y-3 font-sans text-xs sm:text-sm text-slate-700 font-light">
                <div className="flex items-start gap-2.5"><Check className="w-5 h-5 text-[#007A87] shrink-0" /> <span><strong>Stärkung des ländlichen Raums:</strong> Gleichwertige Lebensverhältnisse in allen Gemeinden des Kreises.</span></div>
                <div className="flex items-start gap-2.5"><Check className="w-5 h-5 text-[#007A87] shrink-0" /> <span><strong>Transparenter Bürgerdialog:</strong> Regelmäßige Bürgersprechstunden direkt vor Ort in den Gemeinden.</span></div>
                <div className="flex items-start gap-2.5"><Check className="w-5 h-5 text-[#007A87] shrink-0" /> <span><strong>Moderne Verwaltung:</strong> Digitalisierung der Antragsstrecken zur Entlastung von Bürgern.</span></div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Bürger-Stimmen */}
      <section id="social-proof" className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#007A87] uppercase tracking-widest block font-mono">GEMEINSAM IM AUSTAUSCH</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-black mt-1">Stimmen aus unserem Landkreis</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left text-xs sm:text-sm">
            <div className="bg-white p-6 border border-slate-200 shadow-sm flex flex-col justify-between font-light text-slate-600">
              <p className="italic leading-relaxed">„Als parteiübergreifender Kandidat bringt Tobias Thurau genau die richtige Mentalität mit. Er hört zu, analysiert die Fakten und entscheidet dann im Sinne der Sache.“</p>
              <span className="block font-mono text-[10px] uppercase font-bold text-slate-900 tracking-wider mt-4">// WAHLBERECHTIGTER AUS SICKTE</span>
            </div>
            <div className="bg-white p-6 border border-slate-200 shadow-sm flex flex-col justify-between font-light text-slate-600">
              <p className="italic leading-relaxed">„Sein beruflicher Hintergrund als Ingenieur ist ein riesiger Vorteil für das Landratsamt. Wir brauchen im Kreis endlich wieder verlässliche Termin- und Budgettreue.“</p>
              <span className="block font-mono text-[10px] uppercase font-bold text-slate-900 tracking-wider mt-4">// MITGLIED EHRENAMT, KLEIN FLÖTHE</span>
            </div>
            <div className="bg-white p-6 border border-slate-200 shadow-sm flex flex-col justify-between font-light text-slate-600">
              <p className="italic leading-relaxed">„Seine Vorstellung von transparenter und bürgernaher Kommunalpolitik hebt sich erfrischend ab. Sachlich, nah am Menschen und absolut verlässlich.“</p>
              <span className="block font-mono text-[10px] uppercase font-bold text-slate-900 tracking-wider mt-4">// AUS DER REGION CREMLINGEN</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bürgerdialog Footer-CTA */}
      <section id="dialogue" className="py-16 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#007A87] bg-[#007A87]/5 rounded-full px-4 py-1 inline-block">Gestalten Sie mit</span>
          <h2 className="font-serif text-3xl font-black text-slate-950 tracking-tight">Lassen Sie uns in den direkten Austausch gehen.</h2>
          <p className="text-slate-500 font-light text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            In den kommenden Wochen möchte ich mich Ihnen näher vorstellen: meine Motivation, meine konkreten Ziele für Wolfenbüttel und meine Ideen. Nutzen Sie das Umfragetool oben oder kontaktieren Sie mich direkt per E-Mail.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center pt-2">
            <button onClick={() => scrollTo("survey-card")} className="w-full sm:w-auto px-6 py-3.5 bg-slate-950 text-white font-mono text-xs uppercase tracking-widest font-black shadow-md">Prioritäten einreichen</button>
            <a href="mailto:tobias.thurau@t-online.de" className="w-full sm:w-auto px-6 py-3.5 border border-slate-300 font-mono text-xs uppercase tracking-widest font-bold text-slate-800 text-center">tobias.thurau[at]t-online.de</a>
          </div>
        </div>
      </section>

      {/* Local Dashboard Sandbox panel */}
      <div className="max-w-3xl mx-auto px-4 pb-16">
        <div className="border border-dashed border-slate-300 bg-slate-100 p-4 rounded-xl text-center space-y-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-left">
              <span className="bg-slate-900 text-white text-[9px] font-mono uppercase px-2 py-0.5 font-bold">Wahlkampf-Auswertung</span>
              <p className="text-xs font-bold text-slate-800 mt-1">Eingegangene Bürgermeinungen & Kontakte (localStorage)</p>
            </div>
            <button onClick={() => setShowDashboard(!showDashboard)} className="text-xs font-mono font-black uppercase tracking-wider px-3 py-1.5 bg-[#007A87] text-white">
              {showDashboard ? "Schließen" : "Anzeigen (" + feedbacks.length + ")"}
            </button>
          </div>

          {showDashboard && (
            <div className="pt-4 border-t border-slate-200 text-left overflow-x-auto bg-white p-3 text-xs shadow-inner">
              {feedbacks.length === 0 ? <p className="text-slate-400 italic text-center py-2">Noch keine Einsendungen vorhanden. Teste das Tool oben!</p> : (
                <table className="w-full table-auto border divide-y divide-slate-200">
                  <thead className="bg-slate-50 font-mono text-[10px] text-slate-500 uppercase">
                    <tr>
                      <th className="p-2">Bürger / Kontakt</th>
                      <th className="p-2">Top-Priorität</th>
                      <th className="p-2">Fokus-Bereich</th>
                      <th className="p-2 text-right">Aktion</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-light">
                    {feedbacks.map(f => (
                      <tr key={f.id} className="hover:bg-slate-50">
                        <td className="p-2"><strong>{f.fullName}</strong><br /><span className="text-[10px] text-slate-400 font-mono">{f.phone} | {f.email}</span></td>
                        <td className="p-2 text-[#007A87] font-medium">{f.priority}</td>
                        <td className="p-2 font-mono text-[11px] text-slate-600">{f.topic}</td>
                        <td className="p-2 text-right"><button onClick={() => handleDeleteFeedback(f.id)} className="text-red-600 font-mono px-2 py-0.5 bg-red-50 font-bold">Löschen</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="space-y-3">
            <span className="font-serif text-lg font-black tracking-tight text-white">Tobias Thurau</span>
            <p className="text-slate-400 leading-relaxed font-light">Unabhängiger und parteiübergreifender Landratskandidat für den gesamten Landkreis Wolfenbüttel, nominiert von der CDU Wolfenbüttel.</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-amber-500 font-mono uppercase tracking-widest font-bold">KONTAKT-KORRESPONDENZ</h4>
            <div className="space-y-1 font-sans text-slate-300 font-light">
              <p>📍 38312 Klein Flöthe (Landkreis Wolfenbüttel)</p>
              <p>📱 Mobil: 01 76 / 20 98 00 31</p>
              <p>✉ E-Mail: tobias.thurau[at]t-online.de</p>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="text-white font-mono uppercase tracking-widest font-bold">POLITISCHER ANSATZ</h4>
            <p className="text-slate-400 leading-relaxed font-light">Sachlich, lösungsorientiert und absolut transparent. Für eine zukunftssichere, starke und lebenswerte Region für alle Generationen.</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 mt-12 pt-6 border-t border-slate-800 text-center md:flex md:justify-between text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold">
          <p>&copy; {new Date().getFullYear()} Tobias Thurau. Wahlkampf-Web-Präsenz konzipiert von Falk Stange.</p>
          <div className="space-x-4 mt-2 md:mt-0">
            <button onClick={() => setModalType("imprint")} className="hover:text-white transition-colors">Impressum</button>
            <button onClick={() => setModalType("privacy")} className="hover:text-white transition-colors">Datenschutzerklärung</button>
          </div>
        </div>
      </footer>

      {/* Legal Modals */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white text-slate-900 p-6 max-w-md w-full border border-slate-300 relative shadow-2xl max-h-[80vh] overflow-y-auto text-xs text-left space-y-4 font-light">
            <button onClick={() => setModalType(null)} className="absolute top-4 right-4 text-slate-400 hover:text-black font-mono font-bold">✕</button>
            {modalType === "imprint" ? (
              <>
                <h3 className="font-serif text-lg font-black border-b pb-2">Impressum</h3>
                <p><strong>Angaben gemäß § 5 TMG:</strong></p>
                <p>Tobias Thurau<br />38312 Klein Flöthe</p>
                <p><strong>Kontakt:</strong><br />Telefon: 01 76 / 20 98 00 31<br />E-Mail: tobias.thurau@t-online.de</p>
                <p><strong>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</strong><br />Tobias Thurau</p>
              </>
            ) : (
              <>
                <h3 className="font-serif text-lg font-black border-b pb-2">Datenschutzerklärung</h3>
                <p>Die Angabe Ihrer Daten innerhalb dieses Bürgerassistenten erfolgt auf rein freiwilliger Basis. Sämtliche personenbezogenen Einsendungen werden streng vertraulich behandelt und ausschließlich im Rahmen des Bürgerdialogs zur persönlichen Auswertung durch den Kandidaten Tobias Thurau verwendet.</p>
              </>
            )}
            <div className="pt-2 text-right"><button onClick={() => setModalType(null)} className="px-4 py-2 bg-slate-950 text-white font-mono uppercase font-bold text-[10px]">Schließen</button></div>
          </div>
        </div>
      )}

    </div>
  );
}

const styleTag = (
  <style>{`
    @keyframes pulse-slow {
      0%, 100% { opacity: 0.1; }
      50% { opacity: 0.25; }
    }
    .animate-pulse-slow { animation: pulse-slow 5s ease-in-out infinite; }
  `}</style>
);
