import HeroSection from "@/components/HeroSection";
import ProfessionalContentSection from "@/components/ProfessionalContentSection";
import { EditableText } from "@/components/EditableWrapper";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="font-sans min-h-screen">
      {/* Revolutionary Hero Section */}
      <HeroSection />

      {/* Professional Content Section */}
      <ProfessionalContentSection />

      {/* Enhanced CTA Section */}
      <section className="relative pt-6 pb-10 md:pt-10 md:pb-12 overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute inset-0 opacity-20">
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 20% 80%, #C4A76D 1px, transparent 1px), radial-gradient(circle at 80% 20%, #4B0082 1px, transparent 1px)`,
                backgroundSize: '100px 100px, 80px 80px',
                animation: 'float 15s ease-in-out infinite'
              }}
            />
          </div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <div className="mb-12">
            <EditableText contentKey="home_cta_title" className="text-4xl sm:text-4xl md:text-6xl font-black text-white mb-6">
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                PRONTO A RIVOLUZIONARE
              </span>
              <br />
              <span className="text-white">
                IL TUO EMAIL MARKETING?
              </span>
            </EditableText>
            <EditableText contentKey="home_cta_description" className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Trasforma le tue liste di contatti in una 
              <span className="text-yellow-400 font-bold"> macchina da guerra commerciale</span> 
              con l'aiuto dei nostri specialisti
            </EditableText>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <Link href="/servizi">
              <button className="group relative px-12 py-6 text-xl font-bold text-black bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full overflow-hidden transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-yellow-400/30">
                <span className="relative z-10 flex items-center">
                  <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                  </svg>
                  <EditableText contentKey="home_services_button">SCOPRI I NOSTRI SERVIZI</EditableText>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
              </button>
            </Link>
            
            <Link href="/diagnosi">
              <button className="group relative px-12 py-6 text-xl font-bold text-white border-2 border-purple-500 rounded-full overflow-hidden transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/30">
                <span className="relative z-10 flex items-center">
                  <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <EditableText contentKey="home_diagnosis_button">DIAGNOSI GRATUITA</EditableText>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-800 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
            {[
              { icon: "⚡", title: "Risultati Garantiti", desc: "ROI aumentato del 300% in media" },
              { icon: "🎯", title: "Precisione Chirurgica", desc: "Ogni email studiata per convertire" },
              { icon: "🏆", title: "Esperti Certificati", desc: "Oltre 10 anni di esperienza" }
            ].map((item, index) => (
              <div key={index} className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="text-5xl mb-4">{item.icon}</div>
                <EditableText contentKey={`home_trust_title_${index}`} className="text-xl font-bold text-white mb-2">{item.title}</EditableText>
                <EditableText contentKey={`home_trust_desc_${index}`} className="text-gray-400">{item.desc}</EditableText>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}