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

const contactFormSchema = z.object({
  firstName: z.string().min(2, "Il nome deve avere almeno 2 caratteri"),
  lastName: z.string().min(2, "Il cognome deve avere almeno 2 caratteri"),
  email: z.string().email("Inserisci un'email valida"),
  phone: z.string().optional(),
  company: z.string().min(2, "Il nome dell'azienda è obbligatorio"),
  sector: z.string().min(1, "Seleziona il settore di attività"),
  revenue: z.string().optional(),
  hasEmailList: z.string().min(1, "Seleziona se hai già una lista email"),
  goals: z.string().min(20, "Descrivi i tuoi obiettivi in almeno 20 caratteri"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contatti() {
  const { toast } = useToast();
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
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
    <div className="min-h-screen pt-20" 
         style={{ backgroundColor: 'hsl(0, 0%, 11%)', color: 'hsl(0, 0%, 96%)' }}>
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="responsive-hero-title font-bold mb-6"
              style={{ color: 'hsl(42, 36%, 56%)' }}>
            Contatti
          </h1>
          <p className="responsive-subtitle leading-relaxed"
             style={{ color: 'hsl(0, 0%, 80%)' }}>
            Inizia il tuo percorso verso l'eccellenza nell'Email Marketing
          </p>
        </div>

        {/* Why Choose Us */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="responsive-subtitle font-bold mb-6"
                style={{ color: 'hsl(42, 36%, 56%)' }}>
              Perché Scegliere Noi
            </h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                     style={{ backgroundColor: 'hsl(42, 36%, 56%)' }}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"
                       style={{ color: 'hsl(0, 0%, 11%)' }}>
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="responsive-card-text font-semibold mb-2" 
                      style={{ color: 'hsl(0, 0%, 96%)' }}>Specializzazione Totale</h4>
                  <p className="responsive-card-text" style={{ color: 'hsl(0, 0%, 80%)' }}>NON facciamo altro: l'Email Marketing è il nostro culto</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-[hsl(47,85%,55%)] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-[hsl(0,0%,6%)]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 1a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Precisione Chirurgica</h4>
                  <p className="text-gray-300">Strategie verticali su misura per il tuo business</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-[hsl(47,85%,55%)] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-[hsl(0,0%,6%)]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Risultati Misurabili</h4>
                  <p className="text-gray-300">Trasformiamo le liste in flussi di conversione</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[hsl(47,85%,55%)] mb-6">
              I Nostri Numeri
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-[hsl(0,0%,18%)] rounded-lg border border-[hsl(47,85%,55%)]/20">
                <div className="text-3xl font-bold text-[hsl(47,85%,55%)] mb-2">500+</div>
                <div className="text-sm text-gray-300">Clienti Soddisfatti</div>
              </div>
              <div className="text-center p-4 bg-[hsl(0,0%,18%)] rounded-lg border border-[hsl(47,85%,55%)]/20">
                <div className="text-3xl font-bold text-[hsl(47,85%,55%)] mb-2">25%</div>
                <div className="text-sm text-gray-300">Open Rate Medio</div>
              </div>
              <div className="text-center p-4 bg-[hsl(0,0%,18%)] rounded-lg border border-[hsl(47,85%,55%)]/20">
                <div className="text-3xl font-bold text-[hsl(47,85%,55%)] mb-2">8.5%</div>
                <div className="text-sm text-gray-300">Click Rate Medio</div>
              </div>
              <div className="text-center p-4 bg-[hsl(0,0%,18%)] rounded-lg border border-[hsl(47,85%,55%)]/20">
                <div className="text-3xl font-bold text-[hsl(47,85%,55%)] mb-2">300%</div>
                <div className="text-sm text-gray-300">ROI Medio</div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-gradient-to-r from-[hsl(0,0%,18%)] to-[hsl(0,0%,10%)] rounded-2xl p-8 md:p-12 border border-[hsl(47,85%,55%)]/20">
          <h3 className="text-3xl font-bold text-[hsl(47,85%,55%)] mb-8 text-center">
            Form di Qualificazione
          </h3>
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
                          className="bg-[hsl(0,0%,6%)] border-[hsl(47,85%,55%)]/30 text-white focus:border-[hsl(47,85%,55%)]"
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
                          className="bg-[hsl(0,0%,6%)] border-[hsl(47,85%,55%)]/30 text-white focus:border-[hsl(47,85%,55%)]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
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
                          className="bg-[hsl(0,0%,6%)] border-[hsl(47,85%,55%)]/30 text-white focus:border-[hsl(47,85%,55%)]"
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
                      <FormLabel className="text-white font-medium">Telefono</FormLabel>
                      <FormControl>
                        <Input 
                          type="tel"
                          placeholder="+39 123 456 7890"
                          className="bg-[hsl(0,0%,6%)] border-[hsl(47,85%,55%)]/30 text-white focus:border-[hsl(47,85%,55%)]"
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
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-medium">Azienda *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Nome della tua azienda"
                        className="bg-[hsl(0,0%,6%)] border-[hsl(47,85%,55%)]/30 text-white focus:border-[hsl(47,85%,55%)]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sector"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-medium">Settore di attività *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-[hsl(0,0%,6%)] border-[hsl(47,85%,55%)]/30 text-white focus:border-[hsl(47,85%,55%)]">
                          <SelectValue placeholder="Seleziona il tuo settore" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-[hsl(0,0%,6%)] border-[hsl(47,85%,55%)]/30">
                        <SelectItem value="ecommerce">E-commerce</SelectItem>
                        <SelectItem value="servizi">Servizi professionali</SelectItem>
                        <SelectItem value="consulenza">Consulenza</SelectItem>
                        <SelectItem value="tecnologia">Tecnologia</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="finance">Finanza</SelectItem>
                        <SelectItem value="education">Educazione</SelectItem>
                        <SelectItem value="altro">Altro</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="revenue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-medium">Fatturato annuo approssimativo</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-[hsl(0,0%,6%)] border-[hsl(47,85%,55%)]/30 text-white focus:border-[hsl(47,85%,55%)]">
                          <SelectValue placeholder="Seleziona fascia (opzionale)" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-[hsl(0,0%,6%)] border-[hsl(47,85%,55%)]/30">
                        <SelectItem value="0-100k">0 - 100k €</SelectItem>
                        <SelectItem value="100k-500k">100k - 500k €</SelectItem>
                        <SelectItem value="500k-1m">500k - 1M €</SelectItem>
                        <SelectItem value="1m-5m">1M - 5M €</SelectItem>
                        <SelectItem value="5m+">5M+ €</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hasEmailList"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-medium">Hai già una lista email? *</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="si" id="si" className="border-[hsl(47,85%,55%)] text-[hsl(47,85%,55%)]" />
                          <Label htmlFor="si" className="text-gray-300">Sì, ho una lista attiva</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="no" className="border-[hsl(47,85%,55%)] text-[hsl(47,85%,55%)]" />
                          <Label htmlFor="no" className="text-gray-300">No, devo iniziare da zero</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="piccola" id="piccola" className="border-[hsl(47,85%,55%)] text-[hsl(47,85%,55%)]" />
                          <Label htmlFor="piccola" className="text-gray-300">Ho una lista piccola (meno di 1000 contatti)</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="goals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-medium">Descrivi i tuoi obiettivi di Email Marketing *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Raccontaci cosa vuoi ottenere dall'email marketing: aumentare le vendite, fidelizzare i clienti, generare lead..."
                        rows={5}
                        className="bg-[hsl(0,0%,6%)] border-[hsl(47,85%,55%)]/30 text-white focus:border-[hsl(47,85%,55%)] resize-none"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full bg-[hsl(47,85%,55%)] text-[hsl(0,0%,6%)] font-bold py-4 text-lg hover:bg-[hsl(47,85%,65%)] transition-all duration-300 transform hover:scale-105"
                disabled={contactMutation.isPending}
              >
                {contactMutation.isPending ? "Invio in corso..." : "Invia Richiesta di Contatto"}
              </Button>
            </form>
          </Form>
        </div>

        {/* Contact Info */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-gradient-to-b from-[hsl(0,0%,18%)] to-[hsl(0,0%,10%)] rounded-xl p-6 border border-[hsl(47,85%,55%)]/20">
            <div className="w-12 h-12 bg-[hsl(47,85%,55%)]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-[hsl(47,85%,55%)]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
            <h4 className="font-semibold text-white mb-2">Email</h4>
            <p className="text-gray-300">info@copywriterestinti.it</p>
          </div>
          <div className="bg-gradient-to-b from-[hsl(0,0%,18%)] to-[hsl(0,0%,10%)] rounded-xl p-6 border border-[hsl(47,85%,55%)]/20">
            <div className="w-12 h-12 bg-[hsl(47,85%,55%)]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-[hsl(47,85%,55%)]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            </div>
            <h4 className="font-semibold text-white mb-2">Telefono</h4>
            <p className="text-gray-300">+39 02 1234 5678</p>
          </div>
          <div className="bg-gradient-to-b from-[hsl(0,0%,18%)] to-[hsl(0,0%,10%)] rounded-xl p-6 border border-[hsl(47,85%,55%)]/20">
            <div className="w-12 h-12 bg-[hsl(47,85%,55%)]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-[hsl(47,85%,55%)]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
            </div>
            <h4 className="font-semibold text-white mb-2">Tempi di Risposta</h4>
            <p className="text-gray-300">Entro 24 ore</p>
          </div>
        </div>
      </div>
    </div>
  );
}
