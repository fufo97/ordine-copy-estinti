import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { EditableText } from "@/components/EditableWrapper";
import ParticleBackground from "@/components/ParticleBackground";
import GlowingText from "@/components/GlowingText";
import FloatingElements from "@/components/FloatingElements";

const diagnosisFormSchema = z.object({
  firstName: z.string().min(2, "Il nome deve avere almeno 2 caratteri"),
  lastName: z.string().min(2, "Il cognome deve avere almeno 2 caratteri"),
  email: z.string().email("Inserisci un'email valida"),
  company: z.string().optional(),
  description: z.string().min(10, "Descrivi la tua situazione in almeno 10 caratteri"),
});

type DiagnosisFormData = z.infer<typeof diagnosisFormSchema>;

export default function DiagnosiChirurgica() {
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const form = useForm<DiagnosisFormData>({
    resolver: zodResolver(diagnosisFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      description: "",
    },
  });

  const diagnosisMutation = useMutation({
    mutationFn: (data: DiagnosisFormData) => 
      apiRequest("POST", "/api/diagnosis", data),
    onSuccess: () => {
      toast({
        title: "Richiesta inviata!",
        description: "Ti contatteremo entro 24 ore per la tua diagnosi gratuita.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Errore nell'invio",
        description: "Si è verificato un errore. Riprova più tardi.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: DiagnosisFormData) => {
    diagnosisMutation.mutate(data);
  };

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
              Diagnosi Chirurgica Gratuita
            </GlowingText>
          </h1>
          <EditableText contentKey="diagnosi_subtitle" className="text-xl md:text-2xl lg:text-3xl text-gray-200 leading-relaxed mb-8 max-w-5xl mx-auto font-medium">
            <span className="text-yellow-400 font-bold">Caro Professionista</span>, è tempo di scoprire <span className="font-bold text-yellow-300">quanto valore stai perdendo</span> dalla tua lista email.
          </EditableText>
        </div>

        {/* Problem Identification Section */}
        <div className={`max-w-6xl mx-auto mb-20 transform transition-all duration-1500 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="relative p-10 md:p-16 rounded-3xl border border-red-500/40 backdrop-blur-sm" 
               style={{ 
                 background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.15) 0%, rgba(0,0,0,0.4) 100%)',
               }}>
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/12 to-orange-500/12 rounded-3xl" />
            <div className="relative z-10">
              <EditableText contentKey="diagnosi_problem_title" className="text-3xl md:text-4xl lg:text-5xl font-black text-center mb-12">
                <GlowingText 
                  className="text-red-400"
                  glowColor="#EF4444"
                  intensity="high"
                >
                  HAI UNA LISTA EMAIL DORMIENTE?
                </GlowingText>
              </EditableText>
              
              <EditableText contentKey="diagnosi_problem_intro" className="text-xl md:text-2xl lg:text-3xl text-gray-200 leading-relaxed mb-12 text-center max-w-5xl mx-auto font-medium">
                Se la tua lista email non genera <span className="font-bold text-red-300">almeno €10-50 per contatto al mese</span>, c'è un problema <span className="font-bold text-white">serio</span> che deve essere <span className="font-bold text-red-300">diagnosticato immediatamente</span>.
              </EditableText>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {[
                  {
                    icon: "🔍",
                    title: "Sintomi Nascosti",
                    desc: "Open rate sotto il 25%, click rate sotto il 3%, zero conversioni dirette dalla lista."
                  },
                  {
                    icon: "💸",
                    title: "Perdite Economiche", 
                    desc: "Ogni giorno che passa stai perdendo potenziali €1.000-10.000 di fatturato dalla tua lista."
                  },
                  {
                    icon: "⚠️",
                    title: "Rischio Crescente",
                    desc: "La deliverability si deteriora, i contatti si disabituano, il valore della lista crolla."
                  },
                  {
                    icon: "🎯",
                    title: "Diagnosi Necessaria",
                    desc: "Serve un'analisi chirurgica per identificare cosa sta bloccando le tue conversioni."
                  }
                ].map((item, index) => (
                  <div key={index} className="group">
                    <div className="relative p-6 bg-gradient-to-br from-red-900/25 to-black/50 rounded-2xl border border-red-500/30 hover:border-red-400/50 transition-all duration-300 h-full">
                      <div className="text-4xl mb-4 text-center group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </div>
                      <EditableText contentKey={`diagnosi_problem_card_title_${index}`} className="text-xl md:text-2xl font-black text-red-400 mb-3 text-center">
                        {item.title}
                      </EditableText>
                      <EditableText contentKey={`diagnosi_problem_card_desc_${index}`} className="text-base md:text-lg text-gray-300 leading-relaxed text-center">
                        {item.desc}
                      </EditableText>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Process Steps */}
        <div className={`max-w-6xl mx-auto mb-16 transform transition-all duration-1500 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="relative p-10 md:p-16 rounded-3xl border border-yellow-400/40 backdrop-blur-sm" 
               style={{ 
                 background: 'linear-gradient(135deg, rgba(196, 167, 109, 0.15) 0%, rgba(0,0,0,0.4) 100%)',
               }}>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/8 to-purple-500/8 rounded-3xl" />
            <div className="relative z-10">
              <EditableText contentKey="diagnosi_process_title" className="text-3xl md:text-4xl font-black text-center mb-12 text-yellow-400">
                IL NOSTRO PROCESSO CHIRURGICO
              </EditableText>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center group">
                  <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 bg-gradient-to-r from-yellow-400 to-yellow-600">
                    <span className="text-3xl font-black text-black">1</span>
                  </div>
                  <EditableText contentKey="diagnosi_step1_title" className="text-2xl md:text-3xl font-black mb-4 text-white">
                    Analisi Profonda
                  </EditableText>
                  <EditableText contentKey="diagnosi_step1_desc" className="text-lg text-gray-300 leading-relaxed">
                    Esaminiamo ogni aspetto della tua strategia attuale con <span className="font-bold text-yellow-300">precisione chirurgica</span>
                  </EditableText>
                </div>
                <div className="text-center group">
                  <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 bg-gradient-to-r from-purple-500 to-purple-700">
                    <span className="text-3xl font-black text-white">2</span>
                  </div>
                  <EditableText contentKey="diagnosi_step2_title" className="text-2xl md:text-3xl font-black mb-4 text-white">
                    Diagnosi Dettagliata
                  </EditableText>
                  <EditableText contentKey="diagnosi_step2_desc" className="text-lg text-gray-300 leading-relaxed">
                    Identifichiamo i <span className="font-bold text-purple-300">punti critici</span> e le opportunità nascoste
                  </EditableText>
                </div>
                <div className="text-center group">
                  <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 bg-gradient-to-r from-green-500 to-green-700">
                    <span className="text-3xl font-black text-white">3</span>
                  </div>
                  <EditableText contentKey="diagnosi_step3_title" className="text-2xl md:text-3xl font-black mb-4 text-white">
                    Prescrizione Strategica
                  </EditableText>
                  <EditableText contentKey="diagnosi_step3_desc" className="text-lg text-gray-300 leading-relaxed">
                    Forniamo la <span className="font-bold text-green-300">cura specifica</span> per trasformare la tua lista in oro liquido
                  </EditableText>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What We Analyze */}
        <div className={`max-w-6xl mx-auto mb-20 transform transition-all duration-1500 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="relative p-10 md:p-16 rounded-3xl border border-blue-500/40 backdrop-blur-sm" 
               style={{ 
                 background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(0,0,0,0.4) 100%)',
               }}>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/12 to-cyan-500/12 rounded-3xl" />
            <div className="relative z-10">
              <EditableText contentKey="diagnosi_analysis_title" className="text-3xl md:text-4xl lg:text-5xl font-black text-center mb-12">
                <GlowingText 
                  className="text-blue-400"
                  glowColor="#3B82F6"
                  intensity="high"
                >
                  ANATOMIA DELLA DIAGNOSI CHIRURGICA
                </GlowingText>
              </EditableText>
              
              <EditableText contentKey="diagnosi_analysis_intro" className="text-xl md:text-2xl text-gray-200 leading-relaxed mb-12 text-center max-w-5xl mx-auto font-medium">
                Non ci limitiamo a guardare le <span className="font-bold text-blue-300">metriche superficiali</span>. Analizziamo ogni componente del tuo <span className="font-bold text-white">ecosistema email</span> con precisione <span className="font-bold text-blue-300">millimetrica</span>.
              </EditableText>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: "📊",
                    title: "Performance Forensics",
                    desc: "Open rate, click rate, unsubscribe rate, bounce rate, spam score - ogni numero racconta una storia."
                  },
                  {
                    icon: "🎯",
                    title: "Segmentazione Strategica",
                    desc: "Come dividi il tuo pubblico e se stai parlando alla persona giusta nel momento giusto."
                  },
                  {
                    icon: "✍️",
                    title: "Copy Psychology Analysis",
                    desc: "Analizziamo ogni parola, ogni CTA, ogni subject line per identificare i punti di rottura."
                  },
                  {
                    icon: "🎨",
                    title: "Design & UX Audit",
                    desc: "Layout, colori, tipografia, responsive design - tutto ciò che influenza la conversione."
                  },
                  {
                    icon: "🤖",
                    title: "Automation Architecture",
                    desc: "Workflow, trigger, timing, nurturing sequences - la macchina che lavora per te 24/7."
                  },
                  {
                    icon: "🛡️",
                    title: "Deliverability Health",
                    desc: "Reputazione sender, autenticazione, list hygiene - tutto ciò che determina se arrivi in inbox."
                  }
                ].map((item, index) => (
                  <div key={index} className="group">
                    <div className="relative p-6 bg-gradient-to-br from-blue-900/25 to-black/50 rounded-2xl border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 h-full">
                      <div className="text-4xl mb-4 text-center group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </div>
                      <EditableText contentKey={`diagnosi_analysis_card_title_${index}`} className="text-xl md:text-2xl font-black text-blue-400 mb-3 text-center">
                        {item.title}
                      </EditableText>
                      <EditableText contentKey={`diagnosi_analysis_card_desc_${index}`} className="text-base md:text-lg text-gray-300 leading-relaxed text-center">
                        {item.desc}
                      </EditableText>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Request Form */}
        <div className={`max-w-4xl mx-auto mb-20 transform transition-all duration-1500 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="relative p-10 md:p-16 rounded-3xl border border-green-500/40 backdrop-blur-sm" 
               style={{ 
                 background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(0,0,0,0.4) 100%)',
               }}>
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/12 to-emerald-500/12 rounded-3xl" />
            <div className="relative z-10">
              <EditableText contentKey="diagnosi_form_title" className="text-3xl md:text-4xl lg:text-5xl font-black text-center mb-12">
                <GlowingText 
                  className="text-green-400"
                  glowColor="#22C55E"
                  intensity="high"
                >
                  RICHIEDI LA TUA DIAGNOSI CHIRURGICA
                </GlowingText>
              </EditableText>
              
              <EditableText contentKey="diagnosi_form_intro" className="text-xl md:text-2xl text-gray-200 leading-relaxed mb-12 text-center max-w-4xl mx-auto font-medium">
                <span className="font-bold text-green-300">Completamente gratuita</span>, <span className="font-bold text-white">senza impegno</span>. 
                Riceverai un'analisi dettagliata entro <span className="font-bold text-green-300">24 ore</span>.
              </EditableText>

              <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-medium">Nome *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Il tuo nome"
                          className="bg-black/50 border-green-400/30 text-white focus:border-green-400 backdrop-blur-sm"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-medium">Cognome *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Il tuo cognome"
                          className="bg-black/50 border-green-400/30 text-white focus:border-green-400 backdrop-blur-sm"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-medium">Email *</FormLabel>
                    <FormControl>
                      <Input 
                        type="email"
                        placeholder="la.tua@email.com"
                        className="bg-black/50 border-green-400/30 text-white focus:border-green-400 backdrop-blur-sm"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-medium">Azienda</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Nome della tua azienda"
                        className="bg-black/50 border-green-400/30 text-white focus:border-green-400 backdrop-blur-sm"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-medium">Descrivi la tua situazione attuale *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Raccontaci del tuo business, delle tue sfide attuali con l'email marketing e cosa vorresti migliorare..."
                        rows={5}
                        className="bg-black/50 border-green-400/30 text-white focus:border-green-400 backdrop-blur-sm resize-none"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-green-400 to-green-600 text-black font-bold py-4 text-lg hover:from-green-300 hover:to-green-500 transition-all duration-300 transform hover:scale-105 border border-green-400/50"
                disabled={diagnosisMutation.isPending}
              >
                {diagnosisMutation.isPending ? "Invio in corso..." : "RICHIEDI DIAGNOSI GRATUITA"}
              </Button>
            </form>
          </Form>
            </div>
          </div>
        </div>

        {/* Value Proposition */}
        <div className={`max-w-6xl mx-auto mb-16 transform transition-all duration-1500 delay-1100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="relative p-10 md:p-16 rounded-3xl border border-yellow-400/40 backdrop-blur-sm" 
               style={{ 
                 background: 'linear-gradient(135deg, rgba(196, 167, 109, 0.15) 0%, rgba(0,0,0,0.4) 100%)',
               }}>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/8 to-orange-500/8 rounded-3xl" />
            <div className="relative z-10">
              <EditableText contentKey="diagnosi_value_title" className="text-3xl md:text-4xl font-black text-center mb-12 text-yellow-400">
                COSA RICEVERAI GRATUITAMENTE
              </EditableText>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: "📋",
                    title: "Report Chirurgico Dettagliato",
                    desc: "Analisi completa di ogni aspetto del tuo email marketing con identificazione precisa dei punti critici."
                  },
                  {
                    icon: "🎯",
                    title: "Strategia di Rianimazione",
                    desc: "Piano d'azione specifico per trasformare la tua lista dormiente in una macchina da revenue."
                  },
                  {
                    icon: "🎙️",
                    title: "Consulenza Chirurgica 30 min",
                    desc: "Call personalizzata per discutere i risultati e rispondere alle tue domande specifiche."
                  }
                ].map((item, index) => (
                  <div key={index} className="group text-center">
                    <div className="relative p-6 bg-gradient-to-br from-yellow-900/25 to-black/50 rounded-2xl border border-yellow-500/30 hover:border-yellow-400/50 transition-all duration-300 h-full">
                      <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </div>
                      <EditableText contentKey={`diagnosi_value_card_title_${index}`} className="text-xl md:text-2xl font-black text-yellow-400 mb-4">
                        {item.title}
                      </EditableText>
                      <EditableText contentKey={`diagnosi_value_card_desc_${index}`} className="text-base md:text-lg text-gray-300 leading-relaxed">
                        {item.desc}
                      </EditableText>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-12">
                <EditableText contentKey="diagnosi_value_footer" className="text-xl md:text-2xl text-gray-200 leading-relaxed">
                  <span className="font-bold text-yellow-300">100% Gratuito</span>, <span className="font-bold text-white">Zero Impegno</span>. 
                  Riceverai tutto entro <span className="font-bold text-yellow-300">24 ore</span> dalla richiesta.
                </EditableText>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
