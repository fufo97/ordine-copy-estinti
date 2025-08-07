import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
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
  email: z.string().min(1, "L'email è obbligatoria").email("Inserisci un'email valida"),
  phone: z.string().min(1, "Il telefono è obbligatorio").regex(/^[\d\s\+\-\(\)]+$/, "Formato telefono non valido"),
  company: z.string().min(2, "Il nome dell'azienda è obbligatorio"),
  sector: z.string().min(1, "Seleziona il settore di attività"),
  revenue: z.string().optional(),
  hasEmailList: z.string().min(1, "Seleziona se hai già una lista email"),
  description: z.string().min(20, "Descrivi la tua situazione in almeno 20 caratteri"),
  privacyConsent: z.boolean().refine(val => val === true, "È obbligatorio accettare il trattamento dei dati personali"),
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
      phone: "",
      company: "",
      sector: "",
      revenue: "",
      hasEmailList: "",
      description: "",
      privacyConsent: false,
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
              Diagnosi Chirurgica Gratuita dal valore di €300
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
                Se la tua lista genera poche aperture, scarse interazioni e quasi nessun click, <span className="font-bold text-red-300">stai sprecando una quantità folle di opportunità</span>, lasciando inespresso il suo vero potenziale commerciale. 
                <br />
                <br />
                  Questo rivela un problema <span className="font-bold text-white">serio</span> che deve essere <span className="font-bold text-red-300">diagnosticato immediatamente</span>, per poter potenziare il tuo business.
              </EditableText>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {[
                  {
                    icon: "🔍",
                    title: "Sintomi Nascosti",
                    desc: "Open rate sotto il 10%, click rate inesistente, zero conversioni dalla lista."
                  },
                  {
                    icon: "⏳",
                    title: "Potenziale Perso o Ignorato", 
                    desc: "Ogni giorno che passa, centinaia di contatti preziosi rimangono inutilizzati, trasformando una risorsa strategica in un archivio polveroso di opportunità sprecate."
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
                    Forniamo la <span className="font-bold text-green-300">cura specifica</span> per trasformare la tua lista in  un asset di valore continuo
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

              </EditableText>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  {/* Name Fields */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white font-medium text-lg">Nome *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Il tuo nome"
                              className="bg-black/50 border-green-400/30 text-white focus:border-green-400 focus:ring-green-400/20 h-12 text-lg"
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
                          <FormLabel className="text-white font-medium text-lg">Cognome *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Il tuo cognome"
                              className="bg-black/50 border-green-400/30 text-white focus:border-green-400 focus:ring-green-400/20 h-12 text-lg"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Email and Phone Fields */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white font-medium text-lg">Email *</FormLabel>
                          <FormControl>
                            <Input 
                              type="email"
                              placeholder="la-tua-email@esempio.com"
                              className="bg-black/50 border-green-400/30 text-white focus:border-green-400 focus:ring-green-400/20 h-12 text-lg"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white font-medium text-lg">Telefono *</FormLabel>
                          <FormControl>
                            <Input 
                              type="tel"
                              placeholder="+39 xxx xxx xxxx"
                              className="bg-black/50 border-green-400/30 text-white focus:border-green-400 focus:ring-green-400/20 h-12 text-lg"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Company */}
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-medium text-lg">Azienda *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Nome della tua azienda"
                            className="bg-black/50 border-green-400/30 text-white focus:border-green-400 focus:ring-green-400/20 h-12 text-lg"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  {/* Sector */}
                  <FormField
                    control={form.control}
                    name="sector"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-medium text-lg">Settore di attività *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-black/50 border-green-400/30 text-white focus:border-green-400 focus:ring-green-400/20 h-12 text-lg">
                              <SelectValue placeholder="Seleziona il tuo settore" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-gray-900 border-green-400/30 text-white">
                            <SelectItem value="ecommerce">E-commerce</SelectItem>
                            <SelectItem value="servizi">Servizi professionali</SelectItem>
                            <SelectItem value="consulenza">Consulenza</SelectItem>
                            <SelectItem value="tecnologia">Tecnologia</SelectItem>
                            <SelectItem value="healthcare">Healthcare</SelectItem>
                            <SelectItem value="finance">Finanza</SelectItem>
                            <SelectItem value="education">Educazione</SelectItem>
                            <SelectItem value="immobiliare">Immobiliare</SelectItem>
                            <SelectItem value="turismo">Turismo</SelectItem>
                            <SelectItem value="altro">Altro</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  {/* Revenue */}
                  <FormField
                    control={form.control}
                    name="revenue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-medium text-lg">Fatturato annuo approssimativo</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-black/50 border-green-400/30 text-white focus:border-green-400 focus:ring-green-400/20 h-12 text-lg">
                              <SelectValue placeholder="Seleziona fascia (opzionale)" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-gray-900 border-green-400/30 text-white">
                            <SelectItem value="start">Sono all'inizio (meno di €2.000)</SelectItem>
                            <SelectItem value="2k-20k">Da €2.000 a €20.000</SelectItem>
                            <SelectItem value="20k-35k">Da €20.000 a €35.000</SelectItem>
                            <SelectItem value="35k-55k">Da €35.000 a €55.000</SelectItem>
                            <SelectItem value="55k-75k">Da €55.000 a €75.000</SelectItem>
                            <SelectItem value="75k-100k">Da €75.000 a €100.000</SelectItem>
                            <SelectItem value="100k-150k">Da €100.000 a €150.000</SelectItem>
                            <SelectItem value="150k-200k">Da €150.000 a €200.000</SelectItem>
                            <SelectItem value="200k-300k">Da €200.000 a €300.000</SelectItem>
                            <SelectItem value="300k-400k">Da €300.000 a €400.000</SelectItem>
                            <SelectItem value="400k+">Oltre i €400.000</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  {/* Email List */}
                  <FormField
                    control={form.control}
                    name="hasEmailList"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormLabel className="text-white font-medium text-lg">Hai già una lista email? *</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid grid-cols-1 gap-4"
                          >
                            <div className="flex items-center space-x-3 bg-black/30 p-4 rounded-lg border border-green-400/20">
                              <RadioGroupItem value="yes-small" id="yes-small" className="border-green-400 text-green-400" />
                              <Label htmlFor="yes-small" className="text-white font-medium">Sì, ho una lista (meno di 2000 contatti)</Label>
                            </div>
                            <div className="flex items-center space-x-3 bg-black/30 p-4 rounded-lg border border-green-400/20">
                              <RadioGroupItem value="yes-large" id="yes-large" className="border-green-400 text-green-400" />
                              <Label htmlFor="yes-large" className="text-white font-medium">Sì, ho una lista (+2000 contatti)</Label>
                            </div>
                            <div className="flex items-center space-x-3 bg-black/30 p-4 rounded-lg border border-green-400/20">
                              <RadioGroupItem value="no" id="no" className="border-green-400 text-green-400" />
                              <Label htmlFor="no" className="text-white font-medium">No, devo crearla</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  {/* Description/Goals */}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-medium text-lg">Descrivi la tua situazione attuale con l'Email Marketing *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Raccontaci del tuo business, delle tue sfide attuali con l'email marketing, che risultati stai ottenendo e cosa vorresti migliorare..."
                            className="bg-black/50 border-green-400/30 text-white focus:border-green-400 focus:ring-green-400/20 min-h-[120px] text-lg resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  {/* Privacy Consent */}
                  <FormField
                    control={form.control}
                    name="privacyConsent"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-green-400/30 bg-black/30 p-6">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="border-green-400/50 text-green-400 focus:ring-green-400/20 data-[state=checked]:bg-green-400 data-[state=checked]:border-green-400"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-white text-base leading-relaxed cursor-pointer">
                            Accetto il trattamento dei miei dati personali ai fini di ricontatto via email, comprese comunicazioni promozionali, secondo la{" "}
                            <a 
                              href="/privacy-policy" 
                              target="_blank"
                              className="text-green-400 hover:text-green-300 underline font-medium"
                            >
                              Privacy Policy
                            </a>
                            . Sono consapevole che posso revocare il consenso in qualsiasi momento. *
                          </FormLabel>
                          <FormMessage className="text-red-400" />
                        </div>
                      </FormItem>
                    )}
                  />

                  {/* Submit Button */}
                  <div className="text-center pt-6">
                    <Button
                      type="submit"
                      disabled={diagnosisMutation.isPending}
                      className="group relative px-12 py-6 text-xl font-bold text-black bg-gradient-to-r from-green-400 to-green-600 rounded-full overflow-hidden transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-green-400/30 border-0"
                    >
                      <span className="relative z-10 flex items-center">
                        {diagnosisMutation.isPending ? (
                          <>
                            <div className="w-6 h-6 mr-3 border-2 border-black border-t-transparent rounded-full animate-spin" />
                            INVIO IN CORSO...
                          </>
                        ) : (
                          <>
                            <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            RICHIEDI DIAGNOSI GRATUITA
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-green-300 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                    </Button>
                  </div>
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
                  Valore commerciale: <span className="font-bold text-yellow-300">€300</span> - <span className="font-bold text-green-300">Completamente gratuita per te</span>
                </EditableText>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
