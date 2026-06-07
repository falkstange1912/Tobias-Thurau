import React, { useState } from "react";
import { 
  Sun, 
  Flame, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Star, 
  Phone, 
  ArrowRight, 
  MapPin, 
  Sparkles, 
  Users, 
  Check, 
  ChevronRight, 
  FileText, 
  Award, 
  Building2, 
  ShieldAlert,
  Send
} from "lucide-react";

// German local business mock data & actual content
const REVIEWS = [
  {
    name: "Michael Brandt",
    location: "Bad Soden",
    text: "Nach 3 Enttäuschungen durch andere Betriebe lief hier alles wie am Schnürchen. Abgesprochener Preis wurde exakt gehalten, Solaranlage und Wärmepumpe laufen perfekt gemeinsam.",
    rating: 5,
    role: "Hausbesitzer (Einfamilienhaus, Bj. 1994)",
    date: "Vor 2 Wochen"
  },
  {
    name: "Dr. Andrea Schilling",
    location: "Königstein",
    text: "Das Einzige, was mich überrascht hat, war das Tempo. Montage-Start war am Tag 14 nach Unterschrift. Nette Truppe und lückenloser Service beim Förderungsantrag.",
    rating: 5,
    role: "Zweifamilienhaus",
    date: "Vor 1 Monat"
  },
  {
    name: "Bäckerei & Café Lehmann",
    location: "Schnittstelle Kronberg",
    text: "Für unseren Gewerbepark brauchten wir verlässliche Beratung und maximale KfW-Förderung. ThermVolt hat uns sicher durch den Bürokratie-Dschungel geführt.",
    rating: 5,
    role: "Gewerbliche PV-Aufdachanlage",
    date: "Vor 3 Monaten"
  }
];

export default function App() {
  // Navigation states
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Quiz and Interactive form states
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    houseType: "",
    heatingAge: "",
    primaryGoal: "",
    fullName: "",
    phone: "",
    email: "",
    postalCode: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [validationError, setValidationError] = useState("");

  // Legal Modal states (Impressum & Datenschutz)
  const [activeModal, setActiveModal] = useState<"impressum" | "datenschutz" | null>(null);

  // Handle local state updates for eligibility form
  const handleSelectOption = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setValidationError("");
    // Auto-advance to next step for simple radio selections
    setCurrentStep(prev => prev + 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setValidationError("");
  };

  const handleBackStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const validateStep4 = () => {
    if (!formData.fullName.trim()) return "Bitte geben Sie Ihren vollständigen Namen an.";
    if (!formData.phone.trim() || formData.phone.length < 6) return "Bitte geben Sie eine gültige Telefonnummer für den Rückruf an.";
    if (!formData.email.trim() || !formData.email.includes("@")) return "Bitte geben Sie eine gültige E-Mail-Adresse an.";
    if (!formData.postalCode.trim() || formData.postalCode.length < 4) return "Bitte geben Sie Ihre Postleitzahl an.";
    return "";
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateStep4();
    if (error) {
      setValidationError(error);
      return;
    }

    setIsSubmitting(true);
    // Simulate real high-ticket API routing / submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 1200);
  };

  const resetFormState = () => {
    setFormData({
      houseType: "",
      heatingAge: "",
      primaryGoal: "",
      fullName: "",
      phone: "",
      email: "",
      postalCode: "",
    });
    setCurrentStep(1);
    setFormSubmitted(false);
    setValidationError("");
  };

  return (
    <div id="landing-page-root" className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-amber-100 selection:text-amber-900">
      
      {/* 1. Header / Navigation */}
      <header id="app-header" className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo & Brand ID */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-950 rounded-xl flex items-center justify-center text-amber-400 font-bold shadow-md shadow-slate-900/10">
              <Sun className="w-5 h-5 text-amber-400 rotate-12" />
            </div>
            <div>
              <span className="font-display font-extrabold text-xl tracking-tight text-slate-950 uppercase">
                Therm<span className="text-amber-500 font-semibold text-lg lowercase">Volt</span>
              </span>
              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold -mt-1 font-display">Energietechnik</p>
            </div>
          </div>

          {/* Desktop Navigation Limits to high conversion paths */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#unser-versprechen" className="hover:text-slate-950 transition-colors">Unser Versprechen</a>
            <a href="#leistungen-details" className="hover:text-slate-950 transition-colors">Leistungsdetails</a>
            <a href="#kunden-stimmen" className="hover:text-slate-950 transition-colors">Erfahrungsberichte</a>
          </nav>

          {/* Direct CTA Communication phone & Button */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              href="tel:+49617490000" 
              className="flex items-center gap-2 text-slate-700 hover:text-slate-950 font-mono text-sm tracking-tight transition-colors font-medium"
            >
              <Phone className="w-4 h-4 text-amber-500" />
              <span>06174 900-00</span>
            </a>
            <a 
              href="#check-form" 
              className="inline-flex h-11 items-center justify-center rounded-lg bg-slate-950 px-5 text-sm font-semibold text-white transition-all hover:bg-slate-900 hover:shadow-lg active:scale-95 duration-150"
            >
              Gratis Beratung
            </a>
          </div>

          {/* Mobile Header Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <a 
              href="tel:+49617490000" 
              className="p-2 text-slate-700 hover:text-slate-950 transition-colors"
              title="Anrufen"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-950 focus:outline-none"
              aria-label="Menü öffnen"
            >
              {mobileMenuOpen ? (
                <span className="text-xl font-bold font-mono">✕</span>
              ) : (
                <div id="mobile-hamburger-icon" className="space-y-1.5 w-6">
                  <span className="block h-0.5 w-full bg-slate-800"></span>
                  <span className="block h-0.5 w-full bg-slate-800"></span>
                  <span className="block h-0.5 w-full bg-slate-800"></span>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div id="mobile-menu-dropdown" className="md:hidden w-full bg-white border-b border-slate-200 transition-all duration-200">
            <div className="px-4 pt-2 pb-6 space-y-4 text-sm font-semibold">
              <a 
                href="#unser-versprechen" 
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-slate-700 border-b border-slate-100"
              >
                Unser Versprechen
              </a>
              <a 
                href="#leistungen-details" 
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-slate-700 border-b border-slate-100"
              >
                Leistungsdetails
              </a>
              <a 
                href="#kunden-stimmen" 
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-slate-700 border-b border-slate-100"
              >
                Erfahrungsberichte
              </a>
              <div className="pt-2 flex flex-col gap-3">
                <a 
                  href="tel:+49617490000" 
                  className="flex items-center gap-2 py-2 text-slate-950 font-mono"
                >
                  <Phone className="w-4 h-4 text-amber-500" />
                  <span>06174 900-00</span>
                </a>
                <a 
                  href="#check-form" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 rounded-lg bg-slate-950 text-white font-bold"
                >
                  Jetzt Eignung prüfen
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* 2. Hero-Sektion mit starkem Hormozi Hook & Subheadline */}
      <section id="hero-section" className="relative py-12 md:py-20 lg:py-28 overflow-hidden bg-white">
        {/* Subtle background visual grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Trust pill for regional focus */}
          <div className="flex justify-center md:justify-start mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              Zugelassener Meisterbetrieb für den Main-Taunus-Kreis
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Bold Hook and Rational Benefits */}
            <div className="lg:col-span-7 space-y-6 text-center md:text-left">
              
              {/* Grand Slam Title */}
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-5xl text-slate-950 leading-tight tracking-tight">
                In <span className="text-amber-500 underline decoration-4 decoration-amber-200">45 Tagen</span> zur betriebsbereiten Wärmepumpe & Solar – oder wir zahlen Ihnen <span className="text-slate-950 whitespace-nowrap">2.000 € zurück!</span>
              </h1>

              {/* Clarity Subheadline */}
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto md:mx-0 font-light leading-relaxed">
                Schluss mit Ausreden, Fachkräftemangel und Materialstau. Wir sichern Ihnen Ihren garantierten Montagetermin fest zu. Alles schallgedämmt, schlüsselfertig und inklusive <strong className="font-semibold text-slate-950">bis zu 70% KfW-Förderung</strong>.
              </p>

              {/* Direct Fast-Action Bullets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 text-sm text-slate-700 text-left">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-950 font-semibold">45 Tage Einbau-Garantie</strong>
                    <span>Vom Antrag bis zum ersten warmen Tag</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-950 font-semibold">Festpreis-Angebot</strong>
                    <span>Zahlen Sie exakt das, was im Angebot steht</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-950 font-semibold">Eigene Handwerker</strong>
                    <span>Keine unzuverlässigen Subunternehmen</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-950 font-semibold">Kompletter Papierkram</strong>
                    <span>Wir holen Ihre staatliche Förderung ein</span>
                  </div>
                </div>
              </div>

              {/* Quick Trust Score */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-slate-100 justify-center md:justify-start">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  <strong className="text-slate-950 font-semibold">4.9/5 Sterne</strong> bei über 240 sanierten Wohngebäuden im Taunus
                </div>
              </div>

            </div>

            {/* Right Column: High-conversion interactive CTA card */}
            <div className="lg:col-span-5 w-full max-w-md mx-auto">
              <div id="check-form" className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-2xl relative border border-slate-800">
                <div className="absolute top-0 right-8 -translate-y-1/2 bg-amber-500 text-slate-950 text-[11px] font-extrabold tracking-widest uppercase px-3 py-1 rounded-full shadow-md">
                  Aktion Juni 2026
                </div>

                {!formSubmitted ? (
                  <>
                    <div className="mb-6">
                      <h3 className="font-display font-bold text-xl">Eignungs-Prüfung</h3>
                      <p className="text-slate-400 text-xs mt-1">
                        In 4 Schritten herausfinden, ob Ihr Dach & Heizung für die 45-Tage-Aktion geeignet sind.
                      </p>
                      
                      {/* Step Indicator */}
                      <div className="flex items-center gap-1.5 mt-4">
                        {[1, 2, 3, 4].map((stepNum) => (
                          <div 
                            key={stepNum} 
                            className={`h-1.5 rounded-full flex-1 transition-all ${
                              stepNum <= currentStep ? "bg-amber-500" : "bg-slate-800"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] text-slate-400 mt-2 block text-right font-mono">Schritt {currentStep} von 4</span>
                    </div>

                    {/* Step 1: House Type */}
                    {currentStep === 1 && (
                      <div className="space-y-3">
                        <label className="block text-sm font-semibold text-slate-200">Welcher Gebäudetyp liegt vor?</label>
                        <button 
                          onClick={() => handleSelectOption("houseType", "Einfamilienhaus")}
                          className="w-full text-left p-4 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-800 hover:border-amber-500 transition-all font-medium text-sm flex items-center justify-between group"
                        >
                          <span>Einfamilienhaus</span>
                          <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all" />
                        </button>
                        <button 
                          onClick={() => handleSelectOption("houseType", "Zwei- / Mehrfamilienhaus")}
                          className="w-full text-left p-4 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-800 hover:border-amber-500 transition-all font-medium text-sm flex items-center justify-between group"
                        >
                          <span>Zwei- / Mehrfamilienhaus</span>
                          <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all" />
                        </button>
                        <button 
                          onClick={() => handleSelectOption("houseType", "Gewerbeobjekt")}
                          className="w-full text-left p-4 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-800 hover:border-amber-500 transition-all font-medium text-sm flex items-center justify-between group"
                        >
                          <span>Gewerbeimmobilie</span>
                          <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all" />
                        </button>
                      </div>
                    )}

                    {/* Step 2: Heating Age */}
                    {currentStep === 2 && (
                      <div className="space-y-3">
                        <label className="block text-sm font-semibold text-slate-200">Wie alt ist Ihr aktuelles Heizsystem?</label>
                        <button 
                          onClick={() => handleSelectOption("heatingAge", "Unter 10 Jahre")}
                          className="w-full text-left p-4 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-800 hover:border-amber-500 transition-all font-medium text-sm flex items-center justify-between group"
                        >
                          <span>Unter 10 Jahre</span>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-500" />
                        </button>
                        <button 
                          onClick={() => handleSelectOption("heatingAge", "10 bis 20 Jahre")}
                          className="w-full text-left p-4 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-800 hover:border-amber-500 transition-all font-medium text-sm flex items-center justify-between group"
                        >
                          <span>10 bis 20 Jahre</span>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-500" />
                        </button>
                        <button 
                          onClick={() => handleSelectOption("heatingAge", "Über 20 Jahre")}
                          className="w-full text-left p-4 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-800 hover:border-amber-500 transition-all font-medium text-sm flex items-center justify-between group"
                        >
                          <span>Über 20 Jahre (Kompakt-Tausch)</span>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-500" />
                        </button>
                        
                        <button 
                          onClick={handleBackStep}
                          className="text-xs text-slate-500 hover:text-white pt-2 inline-flex items-center gap-1"
                        >
                          ← Zurück
                        </button>
                      </div>
                    )}

                    {/* Step 3: Main Goal */}
                    {currentStep === 3 && (
                      <div className="space-y-3">
                        <label className="block text-sm font-semibold text-slate-200">Was ist Ihr vorranginges Ziel?</label>
                        <button 
                          onClick={() => handleSelectOption("primaryGoal", "Heizkosten senken")}
                          className="w-full text-left p-4 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-800 hover:border-amber-500 transition-all font-medium text-sm flex items-center justify-between group"
                        >
                          <span>Maximale Senkung der Heizkosten</span>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-500" />
                        </button>
                        <button 
                          onClick={() => handleSelectOption("primaryGoal", "Autarkie / Unabhängigkeit")}
                          className="w-full text-left p-4 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-800 hover:border-amber-500 transition-all font-medium text-sm flex items-center justify-between group"
                        >
                          <span>Autarkie (Kombination Solar & Speicher)</span>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-500" />
                        </button>
                        <button 
                          onClick={() => handleSelectOption("primaryGoal", "Alte Gas / Ölheizung ersetzen")}
                          className="w-full text-left p-4 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-800 hover:border-amber-500 transition-all font-medium text-sm flex items-center justify-between group"
                        >
                          <span>Gesetzliche Richtlinien erfüllen</span>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-500" />
                        </button>

                        <button 
                          onClick={handleBackStep}
                          className="text-xs text-slate-500 hover:text-white pt-2 inline-flex items-center gap-1"
                        >
                          ← Zurück
                        </button>
                      </div>
                    )}

                    {/* Step 4: Contact Details (Submit stage) */}
                    {currentStep === 4 && (
                      <form onSubmit={handleSubmitForm} className="space-y-4">
                        <div className="bg-slate-950 p-3 rounded-lg text-xs border border-slate-800 space-y-1 mb-2">
                          <p className="text-slate-400">Auswahl erfasst:</p>
                          <p className="text-amber-500 font-semibold font-mono">
                            {formData.houseType} • {formData.heatingAge} • {formData.primaryGoal}
                          </p>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">Name / Ansprechpartner</label>
                          <input 
                            type="text" 
                            name="fullName"
                            placeholder="z.B. Hans Müller"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className="w-full rounded-lg bg-slate-950 border border-slate-800 p-3 text-sm focus:outline-none focus:border-amber-500 text-white"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">Telefonnummer</label>
                            <input 
                              type="tel" 
                              name="phone"
                              placeholder="0176..."
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="w-full rounded-lg bg-slate-950 border border-slate-800 p-3 text-sm focus:outline-none focus:border-amber-500 text-white font-mono"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">Ihre PLZ</label>
                            <input 
                              type="text" 
                              name="postalCode"
                              maxLength={5}
                              placeholder="61462"
                              value={formData.postalCode}
                              onChange={handleInputChange}
                              className="w-full rounded-lg bg-slate-950 border border-slate-800 p-3 text-sm focus:outline-none focus:border-amber-500 text-white font-mono"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">E-Mail-Adresse</label>
                          <input 
                            type="email" 
                            name="email"
                            placeholder="name@beispiel.de"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full rounded-lg bg-slate-950 border border-slate-800 p-3 text-sm focus:outline-none focus:border-amber-500 text-white"
                            required
                          />
                        </div>

                        {validationError && (
                          <div className="p-3 bg-red-950/50 border border-red-500/40 rounded-lg flex items-center gap-2 text-xs text-red-300">
                            <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
                            <span>{validationError}</span>
                          </div>
                        )}

                        <div className="pt-2">
                          <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="w-full py-4 rounded-lg bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition-all font-display text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20 active:scale-98"
                          >
                            {isSubmitting ? (
                              <span className="inline-block animate-spin border-2 border-slate-950 border-t-transparent rounded-full w-5 h-5"></span>
                            ) : (
                              <>
                                <span>Eignung KOSTENLOS prüfen</span>
                                <Send className="w-4 h-4" />
                              </>
                            )}
                          </button>
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-slate-500">
                          <button 
                            type="button"
                            onClick={handleBackStep}
                            className="hover:text-white"
                          >
                            ← Zurück
                          </button>
                          <span>🛡️ 100% DSGVO-konform</span>
                        </div>
                      </form>
                    )}
                  </>
                ) : (
                  // Success State for lead submission (instant positive verification)
                  <div id="form-success-state" className="text-center py-6 space-y-5 animate-fadeIn">
                    <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto shadow-md">
                      <Check className="w-8 h-8" />
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-display font-extrabold text-2xl text-white">Anfrage erhalten!</h4>
                      <p className="text-slate-300 text-xs px-2">
                        Vielen Dank, <strong className="text-white">{formData.fullName}</strong>. Wir haben Ihre Daten für den Standort <strong className="text-white">PLZ {formData.postalCode}</strong> registriert.
                      </p>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl text-left border border-slate-800 space-y-2 text-xs">
                      <span className="text-amber-500 font-bold uppercase tracking-wider block text-[10px]">NÄCHSTE SCHRITTE:</span>
                      <p className="text-slate-300">
                        1. Ein zertifizierter Ingenieur prüft Ihre Dachkapazität per Luftbild-Scan auf Eignung.
                      </p>
                      <p className="text-slate-300">
                        2. Wir rufen Sie innerhalb der nächsten <strong className="text-white">2 Stunden</strong> unter der Nummer <strong className="text-white font-mono">{formData.phone}</strong> an, um Ihren telefonischen Erstcheck zu besprechen.
                      </p>
                    </div>

                    <p className="text-[11px] text-slate-500">
                      Ihre Eignungs-ID: <code className="bg-slate-950 text-slate-400 px-1.5 py-0.5 rounded font-mono">TV-2026-{(Math.random() * 10000).toFixed(0)}</code>
                    </p>

                    <button 
                      onClick={resetFormState}
                      className="text-xs text-amber-500 underline hover:text-amber-400 block mx-auto pt-2"
                    >
                      Neue Prüfung starten
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Promise of Value (Klares, ehrliches Wertversprechen) */}
      <section id="unser-versprechen" className="py-16 md:py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest block">Das Versprechen</span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl">
              Warum andere Heizungsbauer scheitern – und warum es bei uns auf den Tag genau klappt.
            </h2>
            <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full"></div>
            <p className="text-slate-400 text-sm sm:text-base font-light">
              Wir haben das verstaubte Handwerk komplett digitalisiert und standardisiert. Das Ergebnis: Keine unnötigen bürokratischen Schleifen, keine verwaisten Baustellen und echtes Einhalten von Fristen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Value Pillar 1 */}
            <div className="bg-slate-950 p-8 rounded-xl border border-slate-800 space-y-4 hover:border-slate-700 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-display font-extrabold text-lg text-white">1. Auf den Tag genau</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Wir garantieren den Montagestart innerhalb von 45 Tagen nach Freigabe. Verzögert sich die Installation, ziehen wir Ihnen pro angefangener Woche direkt 1.000€ vom Rechnungsbetrag ab. Schriftlich im Vertrag fixiert.
              </p>
            </div>

            {/* Value Pillar 2 */}
            <div className="bg-slate-950 p-8 rounded-xl border border-slate-800 space-y-4 hover:border-slate-700 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-display font-extrabold text-lg text-white">2. Bis zu 70% Echt-Förderung</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Unsere bürokratische Abteilung macht nichts anderes. Wir beantragen Ihre staatlichen Zuschüsse (KfW 458) und garantieren die Einhaltung aller Auflagen. Sie lehnen sich zurück, wir holen die Maximalförderung.
              </p>
            </div>

            {/* Value Pillar 3 */}
            <div className="bg-slate-950 p-8 rounded-xl border border-slate-800 space-y-4 hover:border-slate-700 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-display font-extrabold text-lg text-white">3. Premium-Hardware</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Keine Billig-Importe. Wir planen ausschließlich Marken-Bauteile führender europäischer Hersteller (z.B. Viessmann, Bosch, Meyer Burger). Langlebigkeit mit einer Systemgarantie von bis zu 25 Jahren.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 4. Details zum Versprechen ( Nutzenorientierte Stichpunkte ) */}
      <section id="leistungen-details" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual illustrative element or mock diagram simulating technical perfection */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                  <span className="text-[10px] uppercase tracking-widest font-mono text-slate-400 font-bold">Technik-Schnitt</span>
                </div>
                
                <h4 className="font-display font-bold text-slate-950 mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-amber-500" />
                  Das schlüsselfertige 360° Paket
                </h4>

                <div className="space-y-4">
                  <div className="p-3 bg-white rounded-lg border border-slate-100 flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-950 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">A</span>
                    <div>
                      <strong className="block text-xs text-slate-900 font-semibold">CAD-Dachaufbau & Ertrags-Simulation</strong>
                      <span className="text-[11px] text-slate-500 block leading-tight">Millimetergenaue Ausplanung per Satellitenkarte für optimalen Einstrahlwinkel.</span>
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-slate-100 flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-950 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">B</span>
                    <div>
                      <strong className="block text-xs text-slate-900 font-semibold">Meistertaktung der Netz-Inbetriebnahme</strong>
                      <span className="text-[11px] text-slate-500 block leading-tight">Direkter Draht zum lokalen Grundversorger – schneller offizieller Zählertausch.</span>
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-slate-100 flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-950 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">C</span>
                    <div>
                      <strong className="block text-xs text-slate-900 font-semibold">Schallentkoppelter Sockelguss</strong>
                      <span className="text-[11px] text-slate-500 block leading-tight">Keine Schwingungen oder Brummgeräusche dank Spezial-Dämpfer-Fundamenten.</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200/50 flex items-center gap-1.5 text-xs text-amber-800">
                  <Sparkles className="w-4 h-4 shrink-0 text-amber-600" />
                  <span>Sichere Reduktion der jährlichen Heizkosten um ca. <strong>68% - 74%</strong>.</span>
                </div>
              </div>
            </div>

            {/* Right Column: Key benefit details explained with maximum efficiency */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Der Ablauf</span>
              <h2 className="font-display font-extrabold text-3xl text-slate-950 leading-tight">
                Ihr Weg zur energetischen Unabhängigkeit in 3 simplen Schritten.
              </h2>
              
              <div className="space-y-6">
                
                {/* Step Item 1 */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 font-display font-bold text-sm flex items-center justify-center shrink-0 border border-amber-600">
                    01
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-slate-950 text-base">Kostenloser Eignungscheck & Drohnenflug</h4>
                    <p className="text-slate-600 text-sm mt-1">
                      Wir scannen Ihr Dach sowie Ihren Heizungsraum und bewerten per intelligenter Software das maximale Potenzial. Sie erhalten einen garantierten Ertragsplan noch vor Vertragsabschluss.
                    </p>
                  </div>
                </div>

                {/* Step Item 2 */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-950 text-white font-display font-bold text-sm flex items-center justify-center shrink-0 border border-slate-800">
                    02
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-slate-950 text-base">Einreichung der KfW-Förderung</h4>
                    <p className="text-slate-600 text-sm mt-1">
                      Wir übernehmen sämtliche Anträge und stellen sicher, dass alle staatlichen Voraussetzungen für den maximalen Zuschuss (bis zu 70%) erfüllt sind. Erst nach Zusage der Förderung starten wir.
                    </p>
                  </div>
                </div>

                {/* Step Item 3 */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-950 text-white font-display font-bold text-sm flex items-center justify-center shrink-0 border border-slate-800">
                    03
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-slate-950 text-base">Montage & Inbetriebnahme im 45-Tage-Takt</h4>
                    <p className="text-slate-600 text-sm mt-1">
                      Unsere festangestellten regionalen Sanitärmeister und Elektriker rüsten Ihr System innerhalb weniger Werktage um. Schuttentsorgung, Isolierungscheck und finaler hydraulischer Abgleich inklusive.
                    </p>
                  </div>
                </div>

              </div>

              <div className="pt-4">
                <a 
                  href="#check-form" 
                  className="inline-flex items-center gap-2 text-sm font-bold text-amber-600 hover:text-amber-700 transition-all font-display group"
                >
                  <span>Jetzt eigenen Eignungs-Bonus anfordern</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-all" />
                </a>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 5. Social Proof (Kundenstimmen & Press-Mentions) */}
      <section id="kunden-stimmen" className="py-16 md:py-24 bg-slate-50 border-t border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block">Social Proof</span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-950">
              Lieber echte Ergebnisse als leere Werbe-Sprüche
            </h2>
            <p className="text-slate-500 text-sm">
              Diese Hausbesitzer und Gewerbepartner im Taunus-Gebiet haben bereits auf unser 45-Tage-Expressmodell vertraut.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((review, i) => (
              <div 
                key={i} 
                className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200/80 shadow-xs space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {[...Array(review.rating)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 text-sm italic leading-relaxed">
                    "{review.text}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-display font-semibold text-slate-950 text-sm">{review.name}</h4>
                    <span className="text-[11px] text-slate-400 font-medium block">{review.role}</span>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500">
                      <MapPin className="w-3 h-3 text-amber-500" />
                      {review.location}
                    </span>
                    <span className="block text-[10px] text-slate-400 mt-0.5">{review.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Verification Logos / Press Mentions strip */}
          <div className="mt-16 pt-10 border-t border-slate-200/80">
            <p className="text-center text-[11px] uppercase tracking-widest text-slate-400 font-bold mb-6">
              Bekannt für Qualität • Zertifiziert & Registriert
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-55 grayscale hover:grayscale-0 transition-all duration-300">
              <div className="flex items-center gap-2 font-display font-black text-slate-900 tracking-tight text-lg">
                <span className="p-1 rounded bg-slate-950 text-amber-400 text-xs">DIN</span> EN ISO 9001
              </div>
              <div className="flex items-center gap-1.5 font-sans font-bold text-slate-900 tracking-tight text-sm">
                <Check className="w-4 h-4 text-emerald-500" /> KfW-Zugelassen
              </div>
              <div className="flex items-center gap-1.5 font-display font-bold text-slate-900 text-base">
                🛡️ HWK RHEIN-MAIN
              </div>
              <div className="flex items-center gap-1 text-slate-900 tracking-tight text-sm font-semibold font-mono">
                BOSCH <span className="text-xs bg-slate-200 px-1.5 rounded">Partner</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. Call-to-Action (Starkes Abschluss-Angebot & Zweit-Möglichkeit) */}
      <section className="py-16 md:py-24 bg-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-950 text-xs font-bold border border-amber-200/60">
            Sichern Sie sich Ihren garantierten Einbauplatz
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-950 leading-tight">
            Bereit, den letzten Heizkörper-Tausch Ihres Lebens fehlerfrei abzuwickeln?
          </h2>

          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Wir vergeben pro Kalendermonat exakt <strong className="font-semibold text-slate-900">15 Realisierungsplätze</strong>, um unsere 45-Tage-Garantie lupenrein aufrecht zu erhalten. Zögern Sie nicht – prüfen Sie jetzt unverbindlich Ihre Eignung.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a 
              href="#check-form" 
              className="w-full sm:w-auto inline-flex h-14 items-center justify-center rounded-xl bg-amber-500 px-8 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/20 hover:bg-amber-400 transition-all duration-150 uppercase tracking-wider font-display font-semibold"
            >
              Eignungsprüfung starten
            </a>
            <a 
              href="tel:+49617490000" 
              className="w-full sm:w-auto inline-flex h-14 items-center justify-center rounded-xl bg-slate-50 border border-slate-300 px-8 text-sm font-semibold text-slate-800 hover:bg-slate-100 hover:text-slate-950 transition-all duration-150"
            >
              Direkter Anruf: 06174 900-00
            </a>
          </div>

          <p className="text-xs text-slate-400 pt-2 flex items-center justify-center gap-2">
            <span>✓ Absolut kostenlos & unverbindlich</span>
            <span>•</span>
            <span>✓ Rückruf innerhalb von 2 Stunden garantiert</span>
          </p>

        </div>
      </section>

      {/* 7. Footer (Kompakte Rechtshinweise, Öffnungszeiten & Modals) */}
      <footer id="app-footer" className="bg-slate-900 text-slate-400 border-t border-slate-800 py-12 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo & Info block */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-slate-950 font-bold">
                <Sun className="w-4 h-4 text-amber-500" />
              </div>
              <span className="font-display font-bold text-white text-base tracking-tight uppercase">
                Therm<span className="text-amber-500 text-sm">Volt</span>
              </span>
            </div>
            <p className="text-slate-500 leading-normal pr-4">
              Ihr zertifizierter Meisterbetrieb im MTK. Effiziente Solarlösungen und moderne Wärmepumpen-Meistertechnik aus einer Hand.
            </p>
            <p className="text-slate-500 font-medium">
              © {new Date().getFullYear()} ThermVolt. Alle Rechte vorbehalten.
            </p>
          </div>

          {/* Opening hours */}
          <div className="space-y-3">
            <h4 className="font-display font-semibold text-white tracking-wider uppercase text-[11px]">Büro-Öffnungszeiten</h4>
            <div className="space-y-1.5 font-mono">
              <p className="flex justify-between">
                <span>Montag - Donnerstag:</span>
                <span className="text-slate-300">07:30 - 17:00</span>
              </p>
              <p className="flex justify-between">
                <span>Freitag:</span>
                <span className="text-slate-300">07:30 - 15:00</span>
              </p>
              <p className="flex justify-between text-yellow-500/80">
                <span>Samstag (Notdienst):</span>
                <span>09:00 - 13:00</span>
              </p>
              <p className="flex justify-between text-slate-500">
                <span>Sonntag:</span>
                <span>Geschlossen</span>
              </p>
            </div>
          </div>

          {/* Contact details */}
          <div className="space-y-3">
            <h4 className="font-display font-semibold text-white tracking-wider uppercase text-[11px]">Direkter Kontakt</h4>
            <div className="space-y-2">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span>ThermVolt GmbH<br />Limburger Str. 42<br />61462 Königstein im Taunus</span>
              </p>
              <p className="flex items-center gap-2 font-mono">
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                <a href="tel:+49617490000" className="hover:text-white transition-colors">06174 900-00</a>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-slate-500">✉</span>
                <a href="mailto:anfrage@thermvolt-energietechnik.de" className="hover:text-white transition-colors">anfrage@thermvolt-energietechnik.de</a>
              </p>
            </div>
          </div>

          {/* Legal / Link triggers */}
          <div className="space-y-3">
            <h4 className="font-display font-semibold text-white tracking-wider uppercase text-[11px]">Rechtliches & Links</h4>
            <div className="flex flex-col gap-2 font-medium">
              <button 
                onClick={() => setActiveModal("impressum")} 
                className="text-left hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Impressum</span>
              </button>
              <button 
                onClick={() => setActiveModal("datenschutz")} 
                className="text-left hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Datenschutzerklärung</span>
              </button>
              <div className="bg-slate-950 p-3 rounded text-slate-500 leading-tight mt-1 border border-slate-800">
                Garantievereinbarung & Förderzusage gemäß den aktuellen KfW-Bedingungen der Bundesrepublik Deutschland (Stand Juni 2026).
              </div>
            </div>
          </div>

        </div>
      </footer>

      {/* Responsive Modal Framework for Impressum & Datenschutz to keep users on-page */}
      {activeModal && (
        <div id="legal-modal-backdrop" className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div id="legal-modal-box" className="bg-white text-slate-900 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl border border-slate-200">
            
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-950 p-2 font-mono text-lg font-bold"
              aria-label="Schließen"
            >
              ✕
            </button>

            {activeModal === "impressum" ? (
              <div className="space-y-4">
                <h3 className="font-display font-bold text-2xl text-slate-950 border-b pb-2">Impressum</h3>
                <div className="space-y-3 text-slate-600 text-sm leading-relaxed">
                  <p><strong>Angaben gemäß § 5 TMG:</strong></p>
                  <p>
                    ThermVolt GmbH<br />
                    Limburger Str. 42<br />
                    61462 Königstein im Taunus
                  </p>
                  <p>
                    <strong>Vertreten durch:</strong><br />
                    Geschäftsführer: Dipl.-Ing. Marcus Thermann, Hans-Dieter Volt
                  </p>
                  <p>
                    <strong>Kontakt:</strong><br />
                    Telefon: 06174 900-00<br />
                    E-Mail: anfrage@thermvolt-energietechnik.de
                  </p>
                  <p>
                    <strong>Registereintrag:</strong><br />
                    Eintragung im Handelsregister.<br />
                    Registergericht: Amtsgericht Königstein<br />
                    Registernummer: HRB 89452
                  </p>
                  <p>
                    <strong>Umsatzsteuer-ID:</strong><br />
                    Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:<br />
                    DE 324 856 941
                  </p>
                  <p>
                    <strong>Aufsichtsbehörde:</strong><br />
                    Handwerkskammer Rhein-Main (Betriebsnummer: 745829)
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="font-display font-bold text-2xl text-slate-950 border-b pb-2">Datenschutzerklärung</h3>
                <div className="space-y-3 text-slate-600 text-xs sm:text-sm leading-relaxed">
                  <p><strong>1. Datenschutz auf einen Blick</strong></p>
                  <p>
                    Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften (DSGVO) sowie dieser Datenschutzerklärung.
                  </p>
                  <p><strong>2. Datenerfassung auf unserer Website</strong></p>
                  <p>
                    Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Die Daten werden erhoben, indem Sie uns diese mitteilen. Hierbei handelt es sich um die im Eignungs-Formular eingegebenen Daten (Name, E-Mail, Telefonnummer, PLZ sowie Angaben zum Gebäude).
                  </p>
                  <p><strong>3. Zweck der Verarbeitung</strong></p>
                  <p>
                    Wir nutzen Ihre Daten ausschließlich zur Eignungsbestimmung für unser 45-Tage-Aktionspaket sowie zur persönlichen Kontaktaufnahme zwecks Erstellung eines Angebots. Es erfolgt keine Weitergabe an unbefugte Dritte.
                  </p>
                  <p><strong>4. Ihre Rechte</strong></p>
                  <p>
                    Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten. Sie haben außerdem ein Recht, die Berichtigung, Sperrung oder Löschung dieser Daten zu verlangen.
                  </p>
                </div>
              </div>
            )}

            <div className="mt-6 pt-4 border-t flex justify-end">
              <button 
                onClick={() => setActiveModal(null)}
                className="px-5 py-2 rounded-lg bg-slate-950 text-white font-bold text-sm"
              >
                Schließen
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
