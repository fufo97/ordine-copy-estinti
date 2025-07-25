import { useState, useEffect } from "react";
import { Link } from "wouter";
import ParticleBackground from "@/components/ParticleBackground";
import GlowingText from "@/components/GlowingText";
import FloatingElements from "@/components/FloatingElements";
import { EditableText } from "@/components/EditableWrapper";

export default function Servizi() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen pt-20 relative overflow-hidden" 
         style={{ backgroundColor: 'hsl(0, 0%, 8%)' }}>
      
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-purple-900">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>
      
      {/* Particle Effects */}
      <ParticleBackground />
      <FloatingElements />
      
      {/* Animated Grid Lines */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(196, 167, 109, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(196, 167, 109, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            animation: 'gridMove 20s linear infinite'
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        
        {/* Hero Title Section */}
        <div className={`text-center mb-20 transform transition-all duration-1500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <h1 className="responsive-hero-title font-black mb-8 leading-tight">
            <GlowingText 
              className="block text-white"
              glowColor="#C4A76D"
              intensity="high"
              animated
            >
              Chirurgia Email Marketing
            </GlowingText>
          </h1>
        </div>

        {/* Opening Section */}
        <div className={`max-w-6xl mx-auto mb-20 transform transition-all duration-1500 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="relative p-10 md:p-16 rounded-3xl border border-yellow-400/40 backdrop-blur-sm" 
               style={{ 
                 background: 'linear-gradient(135deg, rgba(196, 167, 109, 0.15) 0%, rgba(0,0,0,0.4) 100%)',
               }}>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/8 to-purple-500/8 rounded-3xl" />
            <div className="relative z-10 text-center">
              <EditableText contentKey="servizi_opening_title" className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-10">
                <span className="text-yellow-400">Caro Professionista, Consulente o Imprenditore</span>
              </EditableText>
              <div className="max-w-4xl mx-auto space-y-8">
                <EditableText contentKey="servizi_opening_question" className="text-xl md:text-2xl lg:text-3xl text-gray-200 leading-relaxed font-medium">
                  Hai mai considerato <span className="font-bold text-yellow-300">quanto vale realmente</span> ogni contatto nella tua lista email?
                </EditableText>
                <EditableText contentKey="servizi_opening_clarification" className="text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed">
                  Non stiamo parlando di un <span className="font-bold text-white">semplice indirizzo</span> a cui inviare sporadicamente qualche promozione.
                </EditableText>
                <EditableText contentKey="servizi_opening_value" className="text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed">
                  Ogni contatto nella tua lista rappresenta una <GlowingText className="text-yellow-400 font-black text-xl md:text-2xl lg:text-3xl" glowColor="#FFD700">potenziale miniera d'oro dormiente</GlowingText>, un asset che potrebbe generare un <span className="font-bold text-yellow-300">flusso costante di opportunità</span>, se solo sapessi come <span className="font-bold text-white">"risvegliarlo"</span> attraverso una comunicazione strategica.
                </EditableText>
              </div>
            </div>
          </div>
        </div>

        {/* Email Value Proposition */}
        <div className={`max-w-6xl mx-auto mb-16 transform transition-all duration-1500 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400/20 to-purple-500/20 rounded-2xl blur-lg" />
              <div className="relative p-8 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm rounded-2xl border border-yellow-400/30 h-full flex flex-col">
                <EditableText contentKey="servizi_email_power_title" className="text-2xl md:text-3xl lg:text-4xl font-black text-yellow-400 mb-6">Il Potere delle Email</EditableText>
                <div className="flex-1 space-y-4">
                  <EditableText contentKey="servizi_email_power_desc1" className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed">
                    Le Email rappresentano di fatto il <span className="font-bold text-yellow-300">mezzo più rapido, più economico e più intimo</span> che hai a tua disposizione per poter instaurare una <span className="font-bold text-white">vera e propria relazione</span> con i tuoi utenti.
                  </EditableText>
                  <EditableText contentKey="servizi_email_power_desc2" className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed">
                    I quali pian piano inizieranno ad abituarsi all'idea di ricevere da parte tua quella newsletter, che non solo gli propone, secondo <span className="font-bold text-yellow-300">angoli e visioni differenti</span>, la tua soluzione, ma che sa anche <span className="font-bold text-white">intrattenerli e condurli a generare risposte ed interazioni di valore</span>.
                  </EditableText>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-yellow-400/20 rounded-2xl blur-lg" />
              <div className="relative p-8 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm rounded-2xl border border-purple-500/30 h-full flex flex-col">
                <EditableText contentKey="servizi_risultato_title" className="text-2xl md:text-3xl lg:text-4xl font-black text-purple-400 mb-6">Il Risultato</EditableText>
                <div className="flex-1">
                  <EditableText contentKey="servizi_risultato_desc" className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed">
                    Questo processo oltre ad <span className="font-bold text-purple-300">aumentare la tua autorità</span>, ti permetterà di <span className="font-bold text-white">estrarre il reale valore commerciale delle tue liste</span>, ottimizzando il <span className="font-bold text-purple-300">ritorno di investimento pubblicitario</span> (che probabilmente hai già investito tramite paid advertising - o la realizzazione di un blog)
                  </EditableText>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Diagnosi Gratuita CTA Section */}
        <div className={`max-w-6xl mx-auto mb-20 transform transition-all duration-1500 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="relative p-10 md:p-16 rounded-3xl border border-yellow-400/50 backdrop-blur-sm text-center" 
               style={{ 
                 background: 'linear-gradient(135deg, rgba(196, 167, 109, 0.2) 0%, rgba(0,0,0,0.4) 100%)',
               }}>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 rounded-3xl" />
            
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-3xl blur-xl" />
            
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-6">
                <GlowingText 
                  className="text-yellow-400"
                  glowColor="#FFD700"
                  intensity="high"
                >
                  RICHIEDI LA TUA DIAGNOSI GRATUITA
                </GlowingText>
              </h2>
              
              <p className="text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed mb-8 max-w-4xl mx-auto">
                <span className="font-bold text-white">Dal Valore di €297</span> - Scopri <span className="font-bold text-yellow-300">esattamente</span> come trasformare la tua lista email in una <GlowingText className="text-yellow-400 font-black" glowColor="#FFD700">macchina da profitti</GlowingText>
              </p>
              
              <button 
                onClick={() => setLocation('/diagnosi-chirurgica')}
                className="group relative px-10 py-5 text-lg md:text-xl font-bold text-black bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/30 border border-yellow-400/50"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center gap-3">
                  <span>🎯</span>
                  RICHIEDI DIAGNOSI GRATUITA
                  <span className="text-sm font-normal">(€297 di valore)</span>
                </span>
              </button>
              
              <p className="text-sm md:text-base text-gray-400 mt-4 italic">
                ✨ Analisi personalizzata della tua strategia email attuale + Piano d'azione specifico
              </p>
            </div>
          </div>
        </div>

        {/* Problem Section */}
        <div className={`max-w-7xl mx-auto mb-20 transform transition-all duration-1500 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="relative p-10 md:p-16 rounded-3xl border border-red-500/40 backdrop-blur-sm" 
               style={{ 
                 background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.15) 0%, rgba(0,0,0,0.4) 100%)',
               }}>
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/12 to-orange-500/12 rounded-3xl" />
            <div className="relative z-10">
              <EditableText contentKey="servizi_problem_title" className="text-3xl md:text-4xl lg:text-5xl font-black text-center mb-16">
                <GlowingText 
                  className="text-red-400"
                  glowColor="#EF4444"
                  intensity="high"
                >
                  IL PROBLEMA DEI "TESORI SEPOLTI"
                </GlowingText>
              </EditableText>
              
              <EditableText contentKey="servizi_problem_intro" className="text-xl md:text-2xl lg:text-3xl text-gray-200 leading-relaxed mb-16 text-center max-w-5xl mx-auto font-medium">
                Se sei come la <span className="font-bold text-red-300">maggior parte degli imprenditori</span> che offrono <span className="font-bold text-white">servizi ad alto valore</span> o che possiedono <span className="font-bold text-white">ecommerce avviati</span> (ma stagnanti), probabilmente ti riconosci in questa situazione:
              </EditableText>

              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
                {[
                  {
                    icon: "📊",
                    title: "Liste Sottoutilizzate",
                    desc: "Hai costruito una lista di contatti significativa (2.000+ indirizzi) attraverso anni di networking, eventi, lead magnet o campagne pubblicitarie."
                  },
                  {
                    icon: "📧",
                    title: "Comunicazione Sporadica", 
                    desc: "Invii email alla tua lista solo occasionalmente, forse una newsletter mensile o qualche annuncio di nuovi servizi."
                  },
                  {
                    icon: "📉",
                    title: "Risultati Deludenti",
                    desc: "I risultati sono deludenti: tassi di apertura bassi, pochi click, coinvolgimento minimo."
                  },
                  {
                    icon: "❓",
                    title: "Dubbi e Frustrazione",
                    desc: "Ti chiedi se l'email marketing funzioni davvero nel tuo settore o se sia solo una perdita di tempo."
                  }
                ].map((item, index) => (
                  <div key={index} className="group">
                    <div className="relative p-8 bg-gradient-to-br from-red-900/25 to-black/50 rounded-2xl border border-red-500/30 hover:border-red-400/50 transition-all duration-300 h-full">
                      <div className="text-5xl mb-6 text-center group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </div>
                      <EditableText contentKey={`servizi_problem_card_title_${index}`} className="text-xl md:text-2xl lg:text-3xl font-black text-red-400 mb-4 text-center">
                        {item.title}
                      </EditableText>
                      <EditableText contentKey={`servizi_problem_card_desc_${index}`} className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed text-center">
                        {item.desc}
                      </EditableText>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <EditableText contentKey="servizi_problem_conclusion" className="text-2xl md:text-3xl lg:text-4xl font-black text-red-400">
                  Il risultato? Una lista di contatti che ti è costata migliaia di euro crearla, <GlowingText className="text-yellow-400 text-2xl md:text-3xl lg:text-4xl" glowColor="#FFD700">ma che attualmente è del tutto inutilizzata.</GlowingText>
                </EditableText>
              </div>
            </div>
          </div>
        </div>

        {/* Why Emails Don't Work Section */}
        <div className={`max-w-7xl mx-auto mb-20 transform transition-all duration-1500 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="relative p-10 md:p-16 rounded-3xl border border-orange-500/40 backdrop-blur-sm" 
               style={{ 
                 background: 'linear-gradient(135deg, rgba(251, 146, 60, 0.15) 0%, rgba(0,0,0,0.4) 100%)',
               }}>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/12 to-red-500/12 rounded-3xl" />
            <div className="relative z-10">
              <EditableText contentKey="servizi_why_emails_fail_title" className="text-3xl md:text-4xl lg:text-5xl font-black text-center mb-12">
                <GlowingText 
                  className="text-orange-400"
                  glowColor="#FB923C"
                  intensity="high"
                >
                  PERCHÉ LA MAGGIOR PARTE DELLE EMAIL NON FUNZIONA
                </GlowingText>
              </EditableText>
              
              <div className="text-center mb-16 max-w-5xl mx-auto space-y-6">
                <EditableText contentKey="servizi_email_problem_intro1" className="text-xl md:text-2xl lg:text-3xl text-gray-200 leading-relaxed font-medium">
                  Il problema NON è <span className="font-bold text-orange-300">l'email marketing in sé</span>. Il problema è <span className="font-bold text-white">come viene implementato</span>.
                </EditableText>
                <EditableText contentKey="servizi_email_problem_intro2" className="text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed">
                  Le email inefficaci condividono questi infatti <span className="text-red-400 font-black text-xl md:text-2xl">difetti fatali:</span>
                </EditableText>
              </div>

              <div className="max-w-5xl mx-auto">
                <ul className="space-y-8">
                  <EditableText contentKey="servizi_problem_list_item1" className="text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed border-l-4 border-orange-400 pl-8 py-4 block">
                    <GlowingText className="text-orange-400 font-black text-xl md:text-2xl lg:text-3xl" glowColor="#FB923C">Mancanza completa di intrattenimento</GlowingText> <span className="font-bold text-orange-300">(questo è in genere il motivo principale)</span>: Le tue attuali email sono percepite come <span className="font-bold text-white">noiose</span> o come <span className="font-bold text-red-300">spazzatura di marketing</span>.
                  </EditableText>
                  <EditableText contentKey="servizi_problem_list_item2" className="text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed border-l-4 border-orange-400 pl-8 py-4 block">
                    <GlowingText className="text-orange-400 font-black text-xl md:text-2xl lg:text-3xl" glowColor="#FB923C">Frequenza insufficiente</GlowingText>: contattare i tuoi prospect <span className="font-bold text-orange-300">una volta al mese</span> è come tentare di costruire una relazione vedendo qualcuno solo <span className="font-bold text-white">12 volte l'anno</span>. Impossibile creare il livello di fiducia necessario per vendere <span className="font-bold text-white">servizi premium</span>.
                  </EditableText>
                  <EditableText contentKey="servizi_problem_list_item3" className="text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed border-l-4 border-orange-400 pl-8 py-4 block">
                    <GlowingText className="text-orange-400 font-black text-xl md:text-2xl lg:text-3xl" glowColor="#FB923C">Copy generico e impersonale</GlowingText>: email che parlano di <span className="font-bold text-red-300">te</span> e non delle <span className="font-bold text-white">preoccupazioni, desideri e ambizioni</span> del tuo potenziale cliente.
                  </EditableText>
                  <EditableText contentKey="servizi_problem_list_item4" className="text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed border-l-4 border-orange-400 pl-8 py-4 block">
                    <GlowingText className="text-orange-400 font-black text-xl md:text-2xl lg:text-3xl" glowColor="#FB923C">Assenza di storytelling strategico</GlowingText>: ogni email dovrebbe essere un <span className="font-bold text-white">tassello di una narrazione più ampia</span> che guida il lettore verso una <span className="font-bold text-orange-300">decisione d'acquisto</span>.
                  </EditableText>
                  <EditableText contentKey="servizi_problem_list_item5" className="text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed border-l-4 border-orange-400 pl-8 py-4 block">
                    <GlowingText className="text-orange-400 font-black text-xl md:text-2xl lg:text-3xl" glowColor="#FB923C">Nessuna segmentazione</GlowingText>: inviare lo stesso messaggio a <span className="font-bold text-red-300">tutta la lista</span> (anche a quelli che non aprono mai) è come parlare con una folla usando un <span className="font-bold text-white">megafono</span>, sperando che qualcuno si riconosca nel messaggio.
                  </EditableText>
                  <EditableText contentKey="servizi_problem_list_item6" className="text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed border-l-4 border-orange-400 pl-8 py-4 block">
                    <GlowingText className="text-orange-400 font-black text-xl md:text-2xl lg:text-3xl" glowColor="#FB923C">Call-to-action deboli o assenti</GlowingText>: molte email non chiedono <span className="font-bold text-white">chiaramente</span> al lettore di compiere un'<span className="font-bold text-orange-300">azione specifica</span>.
                  </EditableText>
                  <EditableText contentKey="servizi_problem_list_item7" className="text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed border-l-4 border-orange-400 pl-8 py-4 block">
                    <GlowingText className="text-orange-400 font-black text-xl md:text-2xl lg:text-3xl" glowColor="#FB923C">Dominio poco curato</GlowingText>: può sembrare strano, ma un <span className="font-bold text-red-300">dominio poco curato</span> è la causa principale del motivo per cui le tue email non vengono lette. Tieni conto che quando il tuo dominio possiede un <span className="font-bold text-white">rating alto</span>, automaticamente la maggior parte dei tuoi contatti riceverà una <span className="font-bold text-orange-300">notifica</span> (spesso sullo smartphone) quando invii le tue email.
                  </EditableText>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Our Solution Section */}
        <div className={`max-w-7xl mx-auto mb-20 transform transition-all duration-1500 delay-1100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="relative p-10 md:p-16 rounded-3xl border border-green-500/40 backdrop-blur-sm" 
               style={{ 
                 background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(0,0,0,0.4) 100%)',
               }}>
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/12 to-emerald-500/12 rounded-3xl" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-center mb-12">
                <GlowingText 
                  className="text-green-400"
                  glowColor="#22C55E"
                  intensity="high"
                >
                  LA SOLUZIONE CHIRURGICA DELL'ORDINE DEI COPYWRITER ESTINTI
                </GlowingText>
              </h2>
              
              <div className="text-center mb-16 max-w-5xl mx-auto space-y-8">
                <p className="text-xl md:text-2xl lg:text-3xl text-gray-200 leading-relaxed font-medium">
                  L'Ordine dei Copywriter Estinti non è un'<span className="font-bold text-green-300">agenzia di marketing generalista</span>.
                </p>
                <p className="text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed">
                  Siamo <GlowingText className="text-green-400 font-black text-xl md:text-2xl lg:text-3xl" glowColor="#22C55E">"Gli Ortopedici dell'Email Marketing"</GlowingText> - specialisti che applicano un <span className="font-bold text-white">approccio chirurgico preciso</span> per trasformare la tua lista contatti in un <span className="font-bold text-green-300">potente canale di comunicazione</span> che affianca e potenzia il tuo funnel di vendita già esistente.
                </p>
              </div>

              {/* Three Phase Approach */}
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-green-400 text-center mb-16">
                IL NOSTRO APPROCCIO IN TRE FASI
              </h3>

              <div className="grid lg:grid-cols-3 gap-10">
                {[
                  {
                    phase: "1",
                    title: "DIAGNOSI CHIRURGICA",
                    icon: "🔍",
                    content: [
                      "Prima di proporre qualsiasi intervento, eseguiamo una diagnosi completa del tuo attuale sistema di Email Marketing:",
                      "Analisi approfondita delle tue attuali sequenze email",
                      "Valutazione della segmentazione della tua lista", 
                      "Esame dei tassi di apertura, click e coinvolgimento",
                      "Identificazione dei punti critici nel funnel email",
                      "Mappatura del percorso decisionale del cliente"
                    ],
                    conclusion: "La Diagnosi Chirurgica rivela esattamente dove si nascondono le opportunità nella tua lista e come sbloccare il potenziale inespresso dei tuoi contatti."
                  },
                  {
                    phase: "2", 
                    title: "STRATEGIA DI RIATTIVAZIONE",
                    icon: "⚡",
                    content: [
                      "Basandoci sui risultati della diagnosi, progettiamo una strategia personalizzata che include:",
                      "Sequenze di email quotidiane che costruiscono una relazione con la tua lista",
                      "Segmentazione avanzata per massimizzare la rilevanza dei messaggi",
                      "Storytelling persuasivo che parla direttamente alle emozioni e alla logica dei tuoi prospect",
                      "Posizionamento autorevole che ti distingue dalla concorrenza",
                      "Trigger comportamentali che attivano sequenze specifiche basate sulle azioni dei lettori"
                    ]
                  },
                  {
                    phase: "3",
                    title: "IMPLEMENTAZIONE E OTTIMIZZAZIONE CONTINUA", 
                    icon: "🚀",
                    content: [
                      "A differenza di altre agenzie tuttologhe che impostano sequenze e poi scompaiono, noi occupandoci solo di una scienza in modo verticale:",
                      "Creiamo nuove email strategiche quotidianamente",
                      "Monitoriamo continuamente le performance",
                      "Ottimizziamo in base ai dati raccolti",
                      "Adattiamo la strategia per massimizzare i risultati",
                      "Forniamo report dettagliati sui KPI chiave"
                    ]
                  }
                ].map((phase, index) => (
                  <div key={index} className="group">
                    <div className="relative p-8 bg-gradient-to-br from-green-900/25 to-black/50 rounded-2xl border border-green-500/30 hover:border-green-400/50 transition-all duration-300 h-full">
                      <div className="flex items-center justify-center mb-6">
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-black font-black text-2xl mr-4">
                          {phase.phase}
                        </div>
                        <div className="text-4xl">{phase.icon}</div>
                      </div>
                      <h4 className="text-lg md:text-xl lg:text-2xl font-black text-green-400 mb-6 text-center leading-tight">
                        {phase.title}
                      </h4>
                      <ul className="space-y-3 mb-6">
                        {phase.content.map((item, idx) => (
                          <li key={idx} className="text-base md:text-lg text-gray-300 leading-relaxed">
                            {idx === 0 && phase.phase === "1" ? (
                              <span className="block mb-3 font-medium text-green-200">{item}</span>
                            ) : idx === 0 && phase.phase === "2" ? (
                              <span className="block mb-3 font-medium text-green-200">{item}</span>
                            ) : idx === 0 && phase.phase === "3" ? (
                              <span className="block mb-3 font-medium text-green-200">{item}</span>
                            ) : (
                              <span className="flex items-start">
                                <span className="text-green-400 mr-3 font-bold">•</span>
                                {item}
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                      {phase.conclusion && (
                        <p className="text-base md:text-lg text-green-300 italic leading-relaxed font-medium border-t border-green-500/20 pt-4">
                          {phase.conclusion}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Why Daily Email Marketing Section */}
        <div className={`max-w-6xl mx-auto mb-16 transform transition-all duration-1500 delay-1300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="relative p-8 md:p-12 rounded-3xl border border-blue-500/30 backdrop-blur-sm" 
               style={{ 
                 background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(0,0,0,0.3) 100%)',
               }}>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-3xl" />
            <div className="relative z-10">
              <h2 className="responsive-section-title font-black text-center mb-8">
                <GlowingText 
                  className="text-blue-400"
                  glowColor="#3B82F6"
                  intensity="high"
                >
                  PERCHÉ L'EMAIL MARKETING QUOTIDIANO È ESSENZIALE PER I SERVIZI HIGH TICKET E PER ECOMMERCE AVVIATI
                </GlowingText>
              </h2>
              
              <p className="responsive-body-text text-gray-300 leading-relaxed mb-12 text-center">
                La verità è che per il tuo business l'email marketing quotidiano NON è, e NON può essere un lusso – è una necessità strategica. 
                <br/>
                 <br/>

                Ecco perché:
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    title: "1. IL CICLO DECISIONALE COMPLESSO",
                    content: [
                      "I tuoi clienti non acquistano servizi premium d'impulso. La loro decisione richiede:",
                      "• Fiducia profonda nella tua competenza",
                      "• Comprensione del valore unico che offri",
                      "• Convinzione che il tuo servizio risolverà il loro problema specifico",
                      "• Superamento di numerose obiezioni interne",
                      "",
                      "Le email quotidiane costruiscono questa fiducia gradualmente, accompagnando il prospect attraverso ogni fase del processo decisionale."
                    ]
                  },
                  {
                    title: "2. IL PRINCIPIO DELLA FREQUENZA EFFICACE",
                    content: [
                      "Gli studi neuroscientifici dimostrano che le persone devono essere esposte a un messaggio almeno 7-12 volte prima di agire. Con email mensili, questo processo richiede anni. Con email quotidiane, può avvenire in poche settimane."
                    ]
                  },
                  {
                    title: "3. L'EFFETTO OMNIPRESENZA PERCEPITA",
                    content: [
                      "Quando i tuoi prospect ricevono regolarmente le tue email:",
                      "• Ti percepiscono come un'autorità nel tuo settore",
                      "• Sviluppano un senso di familiarità e fiducia",
                      "• Ti considerano una presenza costante nella loro vita professionale",
                      "• Ti pensano automaticamente quando emerge il bisogno che soddisfi"
                    ]
                  },
                  {
                    title: "4. LA CONVERSIONE INCREMENTALE",
                    content: [
                      "Ogni email è un'opportunità di coinvolgimento. Con 20 email al mese invece di 1:",
                      "• Hai 20 volte più possibilità di raggiungere il prospect nel momento giusto",
                      "• Puoi affrontare 20 diverse obiezioni o punti di dolore",
                      "• Puoi presentare 20 prospettive diverse del tuo servizio",
                      "• Puoi raccontare 20 storie che risuonano con diverse personalità nella tua lista"
                    ]
                  }
                ].map((item, index) => (
                  <div key={index} className="group">
                    <div className="relative p-6 bg-gradient-to-br from-blue-900/20 to-black/40 rounded-2xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 h-full">
                      <h4 className="responsive-subtitle font-bold text-blue-400 mb-4">
                        {item.title}
                      </h4>
                      <div className="space-y-2">
                        {item.content.map((line, idx) => (
                          <p key={idx} className="responsive-card-text text-gray-400 leading-relaxed">
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Intimate Relationship Section */}
        <div className={`max-w-6xl mx-auto mb-16 transform transition-all duration-1500 delay-1500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="relative p-8 md:p-12 rounded-3xl border border-purple-500/30 backdrop-blur-sm" 
               style={{ 
                 background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(0,0,0,0.3) 100%)',
               }}>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl" />
            <div className="relative z-10">
              <h2 className="responsive-section-title font-black text-center mb-8">
                <GlowingText 
                  className="text-purple-400"
                  glowColor="#9333EA"
                  intensity="high"
                >
                  L'EMAIL MARKETING COME RELAZIONE INTIMA
                </GlowingText>
              </h2>
              
              <p className="responsive-body-text text-gray-300 leading-relaxed mb-8 text-center">
                L'email marketing è molto più di una tattica: è l'arte di parlare quotidianamente ai tuoi contatti come se fossero i tuoi amanti intellettuali.
              </p>
              
              <p className="responsive-body-text text-gray-300 leading-relaxed mb-12 text-center">
                Richiede dedizione, attenzione e una cura minuziosa che la maggior parte delle agenzie generaliste non può offrire.
              </p>

              <h3 className="responsive-section-title font-bold text-purple-400 text-center mb-8">
                Ecco perché l'Ordine dei Copywriter Estinti è diverso:
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                {[
                  {
                    icon: "👑",
                    title: "Servizio ultra-esclusivo",
                    desc: "Accettiamo solo 3 nuovi clienti al mese per garantire la massima attenzione ad ogni account"
                  },
                  {
                    icon: "🎯",
                    title: "Immersione totale",
                    desc: "Ci immergiamo completamente nel tuo brand, nei tuoi servizi e soprattutto nella mente dei tuoi clienti ideali"
                  },
                  {
                    icon: "✍️",
                    title: "Artigianato del copy",
                    desc: "Ogni email è meticolosamente scritta a mano, non generata da template o algoritmi"
                  },
                  {
                    icon: "🤝",
                    title: "Relazione continua",
                    desc: "Lavoriamo come un'estensione del tuo team, non come un fornitore esterno occasionale"
                  },
                  {
                    icon: "⚖️",
                    title: "Maestria nel bilanciamento",
                    desc: "Sappiamo esattamente quando educare, quando intrattenere, quando vendere e quando costruire relazioni"
                  },
                  {
                    icon: "🔧",
                    title: "Ottimizzazione continua",
                    desc: "Monitoriamo costantemente le performance e adattiamo la strategia per massimizzare i risultati della tua comunicazione"
                  }
                ].map((item, index) => (
                  <div key={index} className="group w-full max-w-sm">
                    <div className="relative p-6 bg-gradient-to-br from-purple-900/20 to-black/40 rounded-2xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 h-full">
                      <div className="text-4xl mb-4 text-center group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </div>
                      <h4 className="responsive-subtitle font-bold text-purple-400 mb-3 text-center">
                        {item.title}
                      </h4>
                      <p className="responsive-card-text text-gray-400 leading-relaxed text-center">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <p className="responsive-body-text text-gray-300 leading-relaxed">
                  L'intimità che creiamo con la tua lista è paragonabile a una relazione privilegiata - dove ogni messaggio è atteso, apprezzato e, soprattutto, efficace nel generare risposte.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Guarantee Section */}
        <div className={`max-w-6xl mx-auto mb-16 transform transition-all duration-1500 delay-1700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="relative p-8 md:p-12 rounded-3xl border border-emerald-500/30 backdrop-blur-sm" 
               style={{ 
                 background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(0,0,0,0.3) 100%)',
               }}>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-3xl" />
            <div className="relative z-10">
              <h2 className="responsive-section-title font-black text-center mb-8">
                <GlowingText 
                  className="text-emerald-400"
                  glowColor="#10B981"
                  intensity="high"
                >
                  LA NOSTRA GARANZIA "PERFORMANCE O GRATIS"
                </GlowingText>
              </h2>
              
              <p className="responsive-body-text text-gray-300 leading-relaxed mb-8 text-center">
                Siamo così sicuri dei risultati che possiamo ottenere che offriamo una garanzia che nessun'altra agenzia osa proporre:
              </p>

              <div className="relative p-8 bg-gradient-to-br from-emerald-900/30 to-black/50 rounded-2xl border border-emerald-400/40 mb-8">
                <h3 className="responsive-section-title font-bold text-emerald-400 text-center mb-6">
                  GARANZIA "PERFORMANCE O GRATIS"
                </h3>
                <p className="responsive-body-text text-gray-300 leading-relaxed text-center">
                  Se dopo 90 giorni non vedi un miglioramento significativo nei tassi di apertura, click e engagement della stessa lista rispetto ai benchmark iniziali, ricevi un mese di servizio completamente gratuito e una consulenza strategica personalizzata.
                </p>
              </div>

              <p className="responsive-body-text text-gray-300 leading-relaxed mb-8 text-center">
                Siamo persone estremamente serie e L'email marketing per noi NON è un gioco (quanto piuttosto la nostra religione). 
                <br/>
                <br/>
                Pertanto questo è un impegno concreto basato sulla nostra fiducia nel potere dell'email marketing implementato secondo la nostra visione.
              </p>

              <h4 className="responsive-subtitle font-bold text-emerald-400 mb-6 text-center">
                La garanzia è possibile perché:
              </h4>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  "Lavoriamo solo con business che hanno il potenziale per ottenere risultati significativi",
                  "Valutiamo con cura le performance giornaliere per assicurarci che ogni azione porti il massimo valore.",
                  "La nostra metodologia è stata perfezionata nel tempo per garantire risultati costanti"
                ].map((item, index) => (
                  <div key={index} className="relative p-4 bg-gradient-to-br from-emerald-900/20 to-black/40 rounded-xl border border-emerald-500/20">
                    <p className="responsive-card-text text-gray-300 leading-relaxed flex items-start">
                      <span className="text-emerald-400 mr-2">✓</span>
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className={`max-w-6xl mx-auto mb-16 transform transition-all duration-1500 delay-1900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="relative p-8 md:p-12 rounded-3xl border border-cyan-500/30 backdrop-blur-sm" 
               style={{ 
                 background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(0,0,0,0.3) 100%)',
               }}>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-3xl" />
            <div className="relative z-10">
              <h2 className="responsive-section-title font-black text-center mb-12">
                <GlowingText 
                  className="text-cyan-400"
                  glowColor="#06B6D4"
                  intensity="high"
                >
                  I RISULTATI CHE PUOI ASPETTARTI
                </GlowingText>
              </h2>

              <p className="responsive-body-text text-gray-300 leading-relaxed mb-12 text-center">
                I clienti dell'Ordine dei Copywriter Estinti tipicamente sperimentano:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                {[
                  {
                    icon: "💌",
                    title: "Email attese e desiderate",
                    desc: "I tuoi contatti iniziano ad aspettare le tue comunicazioni"
                  },
                  {
                    icon: "📊",
                    title: "Engagement elevato",
                    desc: "Tassi di apertura e click significativamente superiori alla media del settore"
                  },
                  {
                    icon: "👑",
                    title: "Maggiore riconoscibilità",
                    desc: "e autorevolezza del brand"
                  },
                  {
                    icon: "🔥",
                    title: "Contatti riscaldati",
                    desc: "Trasformiamo leads freddi in prospect qualificati e propensi all'acquisto"
                  },
                  {
                    icon: "🎯",
                    title: "Comunicazione strategica",
                    desc: "Ogni messaggio ha uno scopo chiaro e ben definito"
                  },
                  {
                    icon: "💬",
                    title: "Conversazioni autentiche",
                    desc: "Ricevi risposte genuine dai lettori che si sentono coinvolti e valorizzati"
                  }
                ].map((item, index) => (
                  <div key={index} className="group w-full max-w-sm">
                    <div className="relative p-6 bg-gradient-to-br from-cyan-900/20 to-black/40 rounded-2xl border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300 h-full text-center">
                      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </div>
                      <h4 className="responsive-subtitle font-bold text-cyan-400 mb-3">
                        {item.title}
                      </h4>
                      <p className="responsive-card-text text-gray-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Daily Care Section */}
        <div className={`max-w-6xl mx-auto mb-16 transform transition-all duration-1500 delay-2100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="relative p-8 md:p-12 rounded-3xl border border-pink-500/30 backdrop-blur-sm" 
               style={{ 
                 background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(0,0,0,0.3) 100%)',
               }}>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-3xl" />
            <div className="relative z-10">
              <h2 className="responsive-section-title font-black text-center mb-8">
                <GlowingText 
                  className="text-pink-400"
                  glowColor="#EC4899"
                  intensity="high"
                >
                  L'ARTE DELLA CURA QUOTIDIANA
                </GlowingText>
              </h2>
              
              <p className="responsive-body-text text-gray-300 leading-relaxed mb-8 text-center">
                L'email marketing è come coltivare un giardino giapponese: richiede attenzione quotidiana, pazienza e una dedizione che pochi sono disposti a offrire. Ogni email è un piccolo capolavoro che contribuisce a una relazione duratura e proficua con la tua lista.
              </p>

              <h3 className="responsive-section-title font-bold text-pink-400 text-center mb-8">
                Ecco perché dedichiamo così tanto tempo ai nostri clienti:
              </h3>

              <div className="space-y-6">
                {[
                  "Ogni sequenza email è studiata e personalizzata per parlare direttamente al cuore e alla mente dei tuoi contatti",
                  "Passiamo ore ad analizzare le reazioni della tua lista, adattando costantemente il tono e il contenuto",
                  "Creiamo narrazioni che si sviluppano giorno dopo giorno, costruendo un legame che si rafforza con ogni messaggio",
                  "Bilanciamo sapientemente l'arte dello storytelling con la psicologia della persuasione",
                  "Trattiamo la tua lista come se fosse nostra, con il rispetto e la cura che merita"
                ].map((item, index) => (
                  <div key={index} className="relative p-6 bg-gradient-to-br from-pink-900/20 to-black/40 rounded-2xl border border-pink-500/20">
                    <p className="responsive-body-text text-gray-300 leading-relaxed flex items-start">
                      <span className="text-pink-400 mr-3 text-2xl">•</span>
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <p className="responsive-body-text text-gray-300 leading-relaxed mb-6">
                  Questo livello di attenzione richiede tempo, risorse e una dedizione totale. È per questo che possiamo seguire solo un numero limitato di clienti contemporaneamente - per garantire che ogni account riceva l'attenzione meticolosa che merita.
                </p>
                <p className="responsive-section-title font-bold text-pink-400">
                  La tua lista contatti non è solo un database. È un gruppo di persone reali con cui costruire relazioni autentiche.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className={`max-w-6xl mx-auto mb-20 text-center transform transition-all duration-1500 delay-2300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="relative p-10 md:p-16 rounded-3xl border border-yellow-400/50 backdrop-blur-sm" 
               style={{ 
                 background: 'linear-gradient(135deg, rgba(196, 167, 109, 0.2) 0%, rgba(0,0,0,0.4) 100%)',
               }}>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 rounded-3xl" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-12">
                <GlowingText 
                  className="text-yellow-400"
                  glowColor="#FFD700"
                  intensity="high"
                >
                  PRENOTA ORA LA TUA DIAGNOSI CHIRURGICA GRATUITA
                </GlowingText>
              </h2>
              
              <p className="text-xl md:text-2xl lg:text-3xl text-gray-200 leading-relaxed mb-16 max-w-5xl mx-auto font-medium">
                Scopri se il tuo business può beneficiare dell'<span className="font-bold text-yellow-300">approccio esclusivo</span> dell'Ordine dei Copywriter Estinti. La nostra <span className="font-bold text-white">Diagnosi Chirurgica gratuita</span> ti mostrerà esattamente dove si nascondono le opportunità nella tua lista e come possiamo aiutarti a sbloccarle.
              </p>

              <div className="grid lg:grid-cols-2 gap-12 mb-16">
                <div className="text-left">
                  <h4 className="text-xl md:text-2xl lg:text-3xl font-black text-yellow-400 mb-8">Durante questa analisi approfondita:</h4>
                  <ul className="space-y-4">
                    {[
                      "Esamineremo la tua attuale strategia di email marketing",
                      "Identificheremo le opportunità nascoste nella tua lista",
                      "Creeremo un piano d'azione personalizzato",
                      "Stimeremo il potenziale di miglioramento delle performance",
                      "Risponderemo a tutte le tue domande e preoccupazioni"
                    ].map((item, index) => (
                      <li key={index} className="text-lg md:text-xl text-gray-300 flex items-start leading-relaxed">
                        <span className="text-yellow-400 mr-4 font-bold text-xl">✓</span>
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-center p-8 bg-gradient-to-br from-yellow-900/30 to-black/50 rounded-2xl border border-yellow-400/30">
                    <div className="text-7xl mb-6">💎</div>
                    <p className="text-xl md:text-2xl lg:text-3xl font-black text-yellow-400 mb-4">
                      La Diagnosi Chirurgica ha un valore di mercato di €297
                    </p>
                    <p className="text-lg md:text-xl lg:text-2xl text-green-400 font-black mb-2">
                      ma è completamente gratuita
                    </p>
                    <p className="text-base md:text-lg text-gray-400 font-medium">
                      per i business qualificati
                    </p>
                  </div>
                </div>
              </div>

              <Link href="/diagnosi">
                <button className="group relative px-16 py-8 text-lg md:text-xl lg:text-2xl font-black text-black bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full overflow-hidden transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-yellow-400/30">
                  <span className="relative z-10 flex items-center justify-center">
                    <svg className="w-8 h-8 mr-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    RICHIEDI LA TUA DIAGNOSI CHIRURGICA GRATUITA
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className={`max-w-7xl mx-auto mb-20 transform transition-all duration-1500 delay-2500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="relative p-10 md:p-16 rounded-3xl border border-indigo-500/40 backdrop-blur-sm" 
               style={{ 
                 background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(0,0,0,0.4) 100%)',
               }}>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/12 to-purple-500/12 rounded-3xl" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-center mb-16">
                <GlowingText 
                  className="text-indigo-400"
                  glowColor="#6366F1"
                  intensity="high"
                >
                  LE DOMANDE PIÙ FREQUENTI
                </GlowingText>
              </h2>

              <div className="grid gap-10">
                {[
                  {
                    question: "Le email quotidiane non rischiano di infastidire la mia lista?",
                    answer: "No, se fatte correttamente. Le email che inviamo non sono promozionali invasive, ma contenuti di valore che i tuoi contatti attendono con interesse."
                  },
                  {
                    question: "Quanto tempo dovrò dedicare personalmente a questo processo?",
                    answer: "Minimo. Dopo una fase iniziale di onboarding (2-3 ore), il nostro team gestisce tutto. Richiediamo solo 30 minuti settimanali per allinearci sui risultati e sulle strategie future."
                  },
                  {
                    question: "Posso vedere dei risultati prima di impegnarmi a lungo termine?",
                    answer: "Assolutamente. Offriamo un periodo di prova di 15 giorni con 8 email strategiche per dimostrare il valore del nostro approccio. I primi risultati sono visibili già in questa fase."
                  },
                  {
                    question: "Come misurate concretamente i risultati?",
                    answer: "Teniamo sotto controllo quotidianamente aperture, click, durata di lettura e altri parametri essenziali per potenziare le performance. Ogni mese ricevi un report dettagliato che mostra esattamente come sta performando la tua strategia email."
                  },
                  {
                    question: "Lavorate con tutti i settori?",
                    answer: "No. Ci specializziamo in email marketing per servizi premium B2B e B2C nei settori della consulenza, coaching, formazione, servizi finanziari, studi professionali e servizi tecnologici di fascia alta (o e-commerce di prodotti low ticket con liste di 10.000+ contatti)."
                  }
                ].map((faq, index) => (
                  <div key={index} className="relative p-8 bg-gradient-to-br from-indigo-900/25 to-black/50 rounded-2xl border border-indigo-500/30 hover:border-indigo-400/50 transition-all duration-300">
                    <h4 className="text-xl md:text-2xl lg:text-3xl font-black text-indigo-400 mb-6 leading-tight">
                      {faq.question}
                    </h4>
                    <p className="text-lg md:text-xl text-gray-200 leading-relaxed font-medium">
                      {faq.answer.split('.').map((sentence, idx, arr) => {
                        if (idx === arr.length - 1 && sentence.trim() === '') return null;
                        const trimmedSentence = sentence.trim();
                        if (trimmedSentence === '') return null;
                        
                        // Add bold formatting to key phrases
                        let formattedSentence = trimmedSentence;
                        
                        // FAQ 1 - highlight key benefits
                        if (faq.question.includes("infastidire")) {
                          formattedSentence = formattedSentence
                            .replace("contenuti di valore", '<span class="font-bold text-indigo-300">contenuti di valore</span>')
                            .replace("inferiori all\'1%", '<span class="font-bold text-green-400">inferiori all\'1%</span>');
                        }
                        
                        // FAQ 2 - highlight time commitment
                        if (faq.question.includes("tempo")) {
                          formattedSentence = formattedSentence
                            .replace("Minimo", '<span class="font-bold text-indigo-300">Minimo</span>')
                            .replace("30 minuti settimanali", '<span class="font-bold text-green-400">30 minuti settimanali</span>');
                        }
                        
                        // FAQ 3 - highlight trial period
                        if (faq.question.includes("risultati")) {
                          formattedSentence = formattedSentence
                            .replace("15 giorni", '<span class="font-bold text-green-400">15 giorni</span>')
                            .replace("8 email strategiche", '<span class="font-bold text-indigo-300">8 email strategiche</span>');
                        }
                        
                        // FAQ 4 - highlight tracking
                        if (faq.question.includes("misurate")) {
                          formattedSentence = formattedSentence
                            .replace("sistema di tracciamento", '<span class="font-bold text-indigo-300">sistema di tracciamento</span>')
                            .replace("report dettagliato", '<span class="font-bold text-green-400">report dettagliato</span>');
                        }
                        
                        // FAQ 5 - highlight specialization
                        if (faq.question.includes("settori")) {
                          formattedSentence = formattedSentence
                            .replace("servizi premium B2B e B2C", '<span class="font-bold text-indigo-300">servizi premium B2B e B2C</span>')
                            .replace("10.000+ contatti", '<span class="font-bold text-green-400">10.000+ contatti</span>');
                        }
                        
                        return (
                          <span key={idx} dangerouslySetInnerHTML={{ __html: formattedSentence + (idx < arr.length - 2 ? '. ' : '.') }} />
                        );
                      })}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Animated Orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-30 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-xl opacity-20 animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-xl opacity-25 animate-pulse delay-500" />
      </div>
    </div>
  );
}