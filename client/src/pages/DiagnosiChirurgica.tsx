import { useState } from "react";
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

const diagnosisFormSchema = z.object({
  firstName: z.string().min(2, "Il nome deve avere almeno 2 caratteri"),
  lastName: z.string().min(2, "Il cognome deve avere almeno 2 caratteri"),
  email: z.string().email("Inserisci un'email valida"),
  company: z.string().optional(),
  description: z.string().min(10, "Descrivi la tua situazione in almeno 10 caratteri"),
});

type DiagnosisFormData = z.infer<typeof diagnosisFormSchema>;

export default function DiagnosiChirurgica() {
  const { toast } = useToast();
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
    <div className="min-h-screen pt-20" 
         style={{ backgroundColor: 'hsl(0, 0%, 11%)', color: 'hsl(0, 0%, 96%)' }}>
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6"
              style={{ color: 'hsl(42, 36%, 56%)' }}>
            Diagnosi Chirurgica
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed"
             style={{ color: 'hsl(0, 0%, 80%)' }}>
            Il nostro processo di analisi preciso come un bisturi per individuare le criticità del tuo Email Marketing
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center group">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
                 style={{ backgroundColor: 'hsl(42, 36%, 56%)' }}>
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"
                   style={{ color: 'hsl(0, 0%, 11%)' }}>
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4" 
                style={{ color: 'hsl(0, 0%, 96%)' }}>Analisi</h3>
            <p style={{ color: 'hsl(0, 0%, 80%)' }}>Esaminiamo ogni aspetto della tua strategia attuale</p>
          </div>
          <div className="text-center group">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
                 style={{ backgroundColor: 'hsl(42, 36%, 56%)' }}>
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"
                   style={{ color: 'hsl(0, 0%, 11%)' }}>
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4"
                style={{ color: 'hsl(0, 0%, 96%)' }}>Diagnosi</h3>
            <p style={{ color: 'hsl(0, 0%, 80%)' }}>Identifichiamo i punti critici e le opportunità</p>
          </div>
          <div className="text-center group">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
                 style={{ backgroundColor: 'hsl(42, 36%, 56%)' }}>
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"
                   style={{ color: 'hsl(0, 0%, 11%)' }}>
                <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4"
                style={{ color: 'hsl(0, 0%, 96%)' }}>Prescrizione</h3>
            <p style={{ color: 'hsl(0, 0%, 80%)' }}>Forniamo la cura specifica per il tuo business</p>
          </div>
        </div>

        {/* What We Analyze */}
        <div className="bg-gradient-to-r from-[hsl(0,0%,18%)] to-[hsl(0,0%,10%)] rounded-2xl p-8 md:p-12 border border-[hsl(47,85%,55%)]/20 mb-16">
          <h3 className="text-3xl font-bold text-[hsl(47,85%,55%)] mb-8 text-center">
            Cosa Analizziamo nella Tua Diagnosi
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[hsl(47,85%,55%)] rounded-full mt-2"></div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">Strategia Attuale</h4>
                  <p className="text-gray-300">Valutiamo la tua strategia di email marketing esistente</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[hsl(47,85%,55%)] rounded-full mt-2"></div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">Performance Metrics</h4>
                  <p className="text-gray-300">Open rate, click rate, conversioni e ROI</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[hsl(47,85%,55%)] rounded-full mt-2"></div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">Segmentazione</h4>
                  <p className="text-gray-300">Come segmenti e target il tuo pubblico</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[hsl(47,85%,55%)] rounded-full mt-2"></div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">Copy e Design</h4>
                  <p className="text-gray-300">Qualità del copy e design delle tue email</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[hsl(47,85%,55%)] rounded-full mt-2"></div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">Automazioni</h4>
                  <p className="text-gray-300">Workflow automatici e nurturing sequences</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[hsl(47,85%,55%)] rounded-full mt-2"></div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">Deliverability</h4>
                  <p className="text-gray-300">Salute della tua lista e reputazione sender</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Request Form */}
        <div className="bg-gradient-to-r from-[hsl(0,0%,18%)] to-[hsl(0,0%,10%)] rounded-2xl p-8 md:p-12 border border-[hsl(47,85%,55%)]/20">
          <h3 className="text-3xl font-bold text-[hsl(47,85%,55%)] mb-8 text-center">
            Richiedi la Tua Diagnosi Chirurgica
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
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-medium">Azienda</FormLabel>
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-medium">Descrivi la tua situazione attuale *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Raccontaci del tuo business, delle tue sfide attuali con l'email marketing e cosa vorresti migliorare..."
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
                disabled={diagnosisMutation.isPending}
              >
                {diagnosisMutation.isPending ? "Invio in corso..." : "Richiedi Diagnosi Gratuita"}
              </Button>
            </form>
          </Form>
        </div>

        {/* Value Proposition */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-[hsl(47,85%,55%)]/10 to-transparent rounded-2xl p-8 border border-[hsl(47,85%,55%)]/20">
            <h4 className="text-2xl font-bold text-[hsl(47,85%,55%)] mb-4">
              Cosa Riceverai Gratuitamente:
            </h4>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <h5 className="font-semibold text-white mb-2">Report Dettagliato</h5>
                <p className="text-gray-300 text-sm">Analisi completa della tua situazione attuale</p>
              </div>
              <div>
                <h5 className="font-semibold text-white mb-2">Strategia Personalizzata</h5>
                <p className="text-gray-300 text-sm">Raccomandazioni specifiche per il tuo business</p>
              </div>
              <div>
                <h5 className="font-semibold text-white mb-2">Consulenza di 30 minuti</h5>
                <p className="text-gray-300 text-sm">Call gratuita per discutere i risultati</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
