import TypewriterAnimation from "@/components/TypewriterAnimation";
import EnvelopeSection from "@/components/EnvelopeSection";
import { Link } from "wouter";

export default function Home() {
  const typewriterText = `Caro Imprenditore e Cara Imprenditrice, prova a pensarci bene:

Per un problema al ginocchio, ti affidi ad un ortopedico, o a un tuttologo?

Molto bene… Nella comunicazione vale esattamente lo stesso principio.

Per massimizzare il tuo ritorno d'investimento e trasformare le tue liste in vere e proprie miniere d'oro personali…

…l'Email Marketing, (ossia lo strumento più rapido, economico e potente che potresti mai utilizzare per comunicare quotidianamente) necessita di un 'medico' specializzato.

Ecco perché l'Ordine dei Copywriter Estinti NON è una semplice agenzia di comunicazione, ma una vera e propria élite di maestri nell'arte del coinvolgimento, dell'intrattenimento e della persuasione,

…in grado di trasformare il tuo Email Marketing in un potente strumento capace di rafforzare il tuo legame con la community, nonché di canalizzare messaggi impattanti per condurre rapidamente gli utenti verso un'azione desiderata.

Insomma, siamo gli "ortopedici" dell'Email Marketing:

Noi analizziamo, eseguiamo diagnosi e mettiamo a punto con precisione chirurgica, strategie verticali di Email Marketing, con l'unico scopo di rendere le tue liste di contatti, flussi inesauribili di conversione.`;

  return (
    <div
      className="font-sans"
      style={{
        // --color-antique: white paper
        // --color-graphite: deep almost-black
        // --color-smoke: dark gray
        // --color-purple: deep purple accents
        // --color-burgundy: CTA red
        // --color-gold: decorative gold
        "--color-antique": "#F5F5F5",
        "--color-graphite": "#1C1C1C",
        "--color-smoke": "#3F3F3F",
        "--color-purple": "#4B0082",
        "--color-burgundy": "#8B0000",
        "--color-gold": "#C4A76D",
      }}
    >
      {/* HERO */}
      <section className="relative flex items-center justify-center min-h-screen overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-graphite)] via-[var(--color-smoke)] to-[var(--color-graphite)]" />

        <div className="relative z-10 w-full max-w-3xl px-6">
          {/* Paper container */}
          <div
            className="rounded-2xl border shadow-lg"
            style={{
              backgroundColor: "var(--color-smoke)",
              borderColor: "rgba(196, 167, 109, 0.3)", // gold at 30%
            }}
          >
            {/* Always-full-size “paper” */}
            <div
              className="rounded-xl p-8 min-h-[480px] md:min-h-[600px] overflow-auto"
              style={{ backgroundColor: "var(--color-antique)" }}
            >
              <TypewriterAnimation
                text={typewriterText}
                speed={30}
                delay={500}
                // pass a prop to NOT auto-resize container
                fixedContainer
              />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 animate-bounce text-[var(--color-gold)]">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* HEADLINE */}
      <section
        className="py-20 text-center"
        style={{ backgroundColor: "var(--color-antique)" }}
      >
        <div className="mx-auto max-w-4xl px-4">
          <h2
            className="mb-8 text-4xl md:text-6xl font-bold leading-tight"
            style={{ color: "var(--color-graphite)" }}
          >
            IL Primo e Unico Gruppo di Copywriter in Italia<br />
            interamente focalizzato sul<br />
            <span
              className="italic"
              style={{ color: "var(--color-purple)" }}
            >
              Potenziamento del tuo business
            </span>{" "}
            attraverso<br />
            <span
              className="underline"
              style={{ color: "var(--color-graphite)" }}
            >
              Il Solo Email Marketing.
            </span>
          </h2>

          <p
            className="mx-auto max-w-2xl text-2xl md:text-3xl font-light leading-relaxed"
            style={{ color: "var(--color-graphite)" }}
          >
            Insomma… NON facciamo altro:{" "}
            <span
              className="italic underline"
              style={{ color: "var(--color-purple)" }}
            >
              L'Email Marketing è il nostro culto…
            </span>
            <br />
            È il nostro ieri, il nostro oggi e il nostro domani.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/diagnosi">
              <button
                className="rounded-lg px-8 py-4 font-bold shadow-lg transition-transform hover:scale-105"
                style={{
                  backgroundColor: "var(--color-burgundy)",
                  color: "var(--color-antique)",
                }}
              >
                Richiedi Diagnosi Gratuita
              </button>
            </Link>

            <Link href="/servizi">
              <button
                className="rounded-lg border-2 px-8 py-4 font-bold transition-colors hover:bg-[var(--color-purple)] hover:text-[var(--color-antique)]"
                style={{
                  borderColor: "var(--color-purple)",
                  color: "var(--color-purple)",
                  backgroundColor: "transparent",
                }}
              >
                Scopri i Nostri Servizi
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ENVELOPE */}
      <EnvelopeSection />

      {/* FOOTER CTA */}
      <section
        className="py-20 text-center"
        style={{
          background: "linear-gradient(to top, var(--color-graphite), var(--color-smoke))",
          color: "var(--color-antique)",
        }}
      >
        <div className="mx-auto max-w-4xl px-4">
          <h3
            className="mb-6 text-3xl md:text-5xl font-bold"
            style={{ color: "var(--color-gold)" }}
          >
            Pronto a Trasformare il Tuo Email Marketing?
          </h3>
          <p className="mb-8 text-xl leading-relaxed opacity-80">
            Non lasciare che i tuoi contatti rimangano solo numeri.
            Trasformali in clienti fedeli e appassionati.
          </p>
          <Link href="/contatti">
            <button
              className="rounded-lg px-12 py-4 font-bold shadow-xl transition-transform hover:scale-105"
              style={{
                backgroundColor: "var(--color-burgundy)",
                color: "var(--color-antique)",
              }}
            >
              Inizia Ora il Tuo Percorso
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
