import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { EditableText } from "@/components/EditableWrapper";
import ParticleBackground from "@/components/ParticleBackground";
import FloatingElements from "@/components/FloatingElements";
import GlowingText from "@/components/GlowingText";

const contactFormSchema = z.object({
  firstName: z.string().min(2, "Il nome deve avere almeno 2 caratteri"),
  lastName: z.string().min(2, "Il cognome deve avere almeno 2 caratteri"),
  company: z.string().min(2, "Il nome dell'azienda è obbligatorio"),
  sector: z.string().min(1, "Seleziona il settore di attività"),
  revenue: z.string().optional(),
  hasEmailList: z.string().min(1, "Seleziona se hai già una lista email"),
  goals: z.string().min(20, "Descrivi i tuoi obiettivi in almeno 20 caratteri"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contatti() {
  const { toast } = useToast();
  const [isVisible, setIsVisible] = useState(true);
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      company: "",
      sector: "",
      revenue: "",
      hasEmailList: "",
      goals: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: (data: ContactFormData) => 
      apiRequest("POST", "/api/contact", data),
    onSuccess: () => {
      toast({
        title: "Richiesta inviata!",
        description: "Ti contatteremo entro 24 ore per discutere del tuo progetto.",
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

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  return (
    <div className="font-sans min-h-screen">
      {/* Hero Section with same styling as home page */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20 md:pt-24 pb-12"
               style={{ backgroundColor: 'hsl(0, 0%, 8%)' }}>
        {/* Dynamic Background */}
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
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <div className={`transform transition-all duration-1500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <EditableText contentKey="contatti_hero_title" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight">
              <GlowingText 
                className="block text-white"
                glowColor="#C4A76D"
                intensity="high"
                animated
              >
                INIZIA LA TUA TRASFORMAZIONE
              </GlowingText>
            </EditableText>
          </div>

          <div className={`transform transition-all duration-1500 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <EditableText contentKey="contatti_hero_subtitle" className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Compila il form di qualificazione e scopri come possiamo 
              <span className="font-bold text-yellow-300"> rivoluzionare il tuo Email Marketing</span>
            </EditableText>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="relative py-16 overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900">
          <div className="absolute inset-0 opacity-10">
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, #C4A76D 2px, transparent 2px)`,
                backgroundSize: '50px 50px',
                animation: 'float 10s ease-in-out infinite'
              }}
            />
          </div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4">
          {/* Contact Form */}
          <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-3xl p-12 border border-yellow-400/30 shadow-2xl">
            <div className="text-center mb-12">
              <EditableText contentKey="contatti_form_title" className="text-3xl md:text-4xl font-black text-white mb-4">
                <GlowingText 
                  glowColor="#C4A76D"
                  intensity="medium"
                >
                  Form di Qualificazione
                </GlowingText>
              </EditableText>
              <EditableText contentKey="contatti_form_subtitle" className="text-lg text-gray-300 max-w-2xl mx-auto">
                Raccontaci qualcosa di più su di te e sulla tua azienda per ricevere una strategia personalizzata
              </EditableText>
            </div>

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
                            className="bg-black/50 border-yellow-400/30 text-white focus:border-yellow-400 focus:ring-yellow-400/20 h-12 text-lg"
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
                            className="bg-black/50 border-yellow-400/30 text-white focus:border-yellow-400 focus:ring-yellow-400/20 h-12 text-lg"
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
                          className="bg-black/50 border-yellow-400/30 text-white focus:border-yellow-400 focus:ring-yellow-400/20 h-12 text-lg"
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
                          <SelectTrigger className="bg-black/50 border-yellow-400/30 text-white focus:border-yellow-400 focus:ring-yellow-400/20 h-12 text-lg">
                            <SelectValue placeholder="Seleziona il tuo settore" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-gray-900 border-yellow-400/30 text-white">
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

                {/* Revenue - Updated with new options */}
                <FormField
                  control={form.control}
                  name="revenue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-medium text-lg">Fatturato annuo approssimativo</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-black/50 border-yellow-400/30 text-white focus:border-yellow-400 focus:ring-yellow-400/20 h-12 text-lg">
                            <SelectValue placeholder="Seleziona fascia (opzionale)" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-gray-900 border-yellow-400/30 text-white">
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
                          className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                          <div className="flex items-center space-x-3 bg-black/30 p-4 rounded-lg border border-yellow-400/20">
                            <RadioGroupItem value="yes" id="yes" className="border-yellow-400 text-yellow-400" />
                            <Label htmlFor="yes" className="text-white font-medium">Sì, ho già una lista</Label>
                          </div>
                          <div className="flex items-center space-x-3 bg-black/30 p-4 rounded-lg border border-yellow-400/20">
                            <RadioGroupItem value="no" id="no" className="border-yellow-400 text-yellow-400" />
                            <Label htmlFor="no" className="text-white font-medium">No, devo crearla</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                {/* Goals */}
                <FormField
                  control={form.control}
                  name="goals"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-medium text-lg">Descrivi i tuoi obiettivi con l'Email Marketing *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Raccontaci cosa vorresti ottenere, quali sono le tue sfide attuali e come possiamo aiutarti..."
                          className="bg-black/50 border-yellow-400/30 text-white focus:border-yellow-400 focus:ring-yellow-400/20 min-h-[120px] text-lg resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <div className="text-center pt-6">
                  <Button
                    type="submit"
                    disabled={contactMutation.isPending}
                    className="group relative px-12 py-6 text-xl font-bold text-black bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full overflow-hidden transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-yellow-400/30 border-0"
                  >
                    <span className="relative z-10 flex items-center">
                      {contactMutation.isPending ? (
                        <>
                          <div className="w-6 h-6 mr-3 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          INVIO IN CORSO...
                        </>
                      ) : (
                        <>
                          <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                          INVIA RICHIESTA
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </section>
    </div>
  );
}