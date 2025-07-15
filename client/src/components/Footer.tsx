import { Link } from "wouter";
import { EditableText } from "./EditableWrapper";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-black/80 to-black border-t border-yellow-400/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="lg:col-span-2">
            <EditableText contentKey="footer_company_title" className="text-3xl font-black text-yellow-400 mb-4">
              ORDINE DEI COPYWRITER ESTINTI
            </EditableText>
            <EditableText contentKey="footer_company_description" className="text-gray-300 mb-6 max-w-md leading-relaxed">
              L'agenzia di Email Marketing che riporta in vita le tue liste dormienti e trasforma ogni email in un'arma di vendita letale.
            </EditableText>
            
            {/* VAT Number */}
            <div className="mb-4">
              <EditableText contentKey="footer_vat_number" className="text-white font-medium">
                P.IVA: IT03042210348
              </EditableText>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-2">
              <EditableText contentKey="footer_contact_email" className="text-gray-300">
                Email: info@ordinedeiextinti.com
              </EditableText>
              <EditableText contentKey="footer_contact_phone" className="text-gray-300">
                Tel: +39 XXX XXX XXXX
              </EditableText>
            </div>
          </div>
          
          {/* Navigation Links */}
          <div>
            <EditableText contentKey="footer_nav_title" className="text-xl font-bold text-white mb-6">
              Navigazione
            </EditableText>
            <nav className="space-y-3">
              <Link href="/" className="block text-gray-300 hover:text-yellow-400 transition-colors duration-200">
                Home
              </Link>
              <Link href="/servizi" className="block text-gray-300 hover:text-yellow-400 transition-colors duration-200">
                Servizi
              </Link>
              <Link href="/diagnosi" className="block text-gray-300 hover:text-yellow-400 transition-colors duration-200">
                Diagnosi Gratuita
              </Link>
              <Link href="/contatti" className="block text-gray-300 hover:text-yellow-400 transition-colors duration-200">
                Contatti
              </Link>
            </nav>
          </div>
          
          {/* Services */}
          <div>
            <EditableText contentKey="footer_services_title" className="text-xl font-bold text-white mb-6">
              I Nostri Servizi
            </EditableText>
            <div className="space-y-3">
              <EditableText contentKey="footer_service_1" className="block text-gray-300 text-sm">
                Chirurgia Email Marketing
              </EditableText>
              <EditableText contentKey="footer_service_2" className="block text-gray-300 text-sm">
                Rianimazione Liste Dormienti
              </EditableText>
              <EditableText contentKey="footer_service_3" className="block text-gray-300 text-sm">
                Copywriting Persuasivo
              </EditableText>
              <EditableText contentKey="footer_service_4" className="block text-gray-300 text-sm">
                Automazioni Avanzate
              </EditableText>
              <EditableText contentKey="footer_service_5" className="block text-gray-300 text-sm">
                Consulenza Strategica
              </EditableText>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-yellow-400/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <EditableText contentKey="footer_copyright" className="text-gray-400 text-sm">
              © 2025 Ordine dei Copywriter Estinti. Tutti i diritti riservati.
            </EditableText>
            
            <div className="flex space-x-6">
              <EditableText contentKey="footer_privacy_link" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors duration-200 cursor-pointer">
                Privacy Policy
              </EditableText>
              <EditableText contentKey="footer_terms_link" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors duration-200 cursor-pointer">
                Termini di Servizio
              </EditableText>
              <EditableText contentKey="footer_cookies_link" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors duration-200 cursor-pointer">
                Cookie Policy
              </EditableText>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
      </div>
    </footer>
  );
}