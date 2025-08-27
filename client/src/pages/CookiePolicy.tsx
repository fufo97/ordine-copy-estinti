import { useEffect, useState } from 'react';
import { useSEO } from "@/hooks/useSEO";
import { seoPages } from "@/utils/seoData";

export default function CookiePolicy() {
  const [isVisible, setIsVisible] = useState(false);
  
  useSEO(seoPages.cookies());

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-12" style={{ backgroundColor: 'hsl(0, 0%, 8%)' }}>
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-purple-900">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-yellow-400 mb-6">
              Cookie Policy
            </h1>
            <p className="text-xl text-gray-300">
              Benvenuto nella cookie policy di www.ordine-dei-copywriter-estinti.it
            </p>
          </div>

          {/* Content Container */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl border border-yellow-400/20 p-8 md:p-12">
            <div className="prose max-w-none text-gray-900">
              
              <p className="text-lg mb-6">
                Questa policy ti aiuterà a comprendere quali cookie e tecnologie di tracciamento utilizziamo, come li utilizziamo e quali sono i tuoi diritti in merito.
              </p>

              <p className="text-sm text-gray-600 mb-8">
                <strong>Ultima modifica:</strong> 25 luglio 2025
              </p>

              <h2 className="text-2xl font-bold text-purple-600 mt-8 mb-4">Sommario</h2>
              
              <ul className="list-disc pl-6 mb-6 space-y-1">
                <li>Introduzione</li>
                <li>Titolare del Trattamento dei Dati</li>
                <li>Come questa Applicazione utilizza gli Strumenti di Tracciamento</li>
                <li>Come gestire le preferenze</li>
                <li>Definizioni e riferimenti legali</li>
              </ul>

              <h2 className="text-2xl font-bold text-purple-600 mt-8 mb-4">Introduzione</h2>

              <p className="mb-4">
                Questo documento contiene informazioni in merito alle tecnologie che consentono a questa Applicazione di raggiungere gli scopi descritti di seguito. Tali tecnologie permettono al Titolare di raccogliere e salvare informazioni (per esempio tramite l'utilizzo di Cookie) o di utilizzare risorse (per esempio eseguendo uno script) sul dispositivo dell'Utente quando quest'ultimo interagisce con questa Applicazione.
              </p>

              <p className="mb-4">
                Per semplicità, in questo documento tali tecnologie sono sinteticamente definite "Strumenti di Tracciamento", salvo vi sia ragione di differenziare. Per esempio, sebbene i Cookie possano essere usati in browser sia web sia mobili, sarebbe fuori luogo parlare di Cookie nel contesto di applicazioni per dispositivi mobili, dal momento che si tratta di Strumenti di Tracciamento che richiedono la presenza di un browser. Per questo motivo, all'interno di questo documento il termine Cookie è utilizzato solo per indicare in maniera specifica quel particolare tipo di Strumento di Tracciamento.
              </p>

              <p className="mb-4">
                Alcune delle finalità per le quali vengono impiegati Strumenti di Tracciamento potrebbero, inoltre richiedere il consenso dell'Utente. Se viene prestato il consenso, esso può essere revocato liberamente in qualsiasi momento seguendo le istruzioni contenute in questo documento.
              </p>

              <p className="mb-4">
                Questa Applicazione utilizza Strumenti di Tracciamento gestiti direttamente dal Titolare (comunemente detti Strumenti di Tracciamento "di prima parte") e Strumenti di Tracciamento che abilitano servizi forniti da terzi (comunemente detti Strumenti di Tracciamento "di terza parte"). Se non diversamente specificato all'interno di questo documento, tali terzi hanno accesso ai rispettivi Strumenti di Tracciamento. Durata e scadenza dei Cookie e degli altri Strumenti di Tracciamento possono variare a seconda di quanto impostato dal Titolare o da ciascuna terza parte. Alcuni di essi scadono al termine della sessione di navigazione dell'Utente.
              </p>

              <p className="mb-6">
                In aggiunta a quanto specificato nelle descrizioni di ciascuna delle categorie di seguito riportate, gli Utenti possono ottenere informazioni più dettagliate ed aggiornate riguardo durata, così come qualsiasi altra informazione rilevante - quale la presenza di altri Strumenti di Tracciamento - nelle privacy policy dei rispettivi terzi fornitori di servizi tramite i link forniti o contattando il Titolare.
              </p>

              <p className="bg-yellow-50 p-4 rounded-lg mb-6">
                <strong>Indirizzo email del Titolare:</strong> ufficio@ordine-dei-copywriter-estinti.it
              </p>

              <h2 className="text-2xl font-bold text-purple-600 mt-8 mb-4">Come questa Applicazione utilizza gli Strumenti di Tracciamento</h2>

              <h3 className="text-xl font-bold mt-6 mb-3">Necessari</h3>
              <p className="mb-6">
                Questa Applicazione utilizza Cookie comunemente detti "tecnici" o altri Strumenti di Tracciamento analoghi per svolgere attività strettamente necessarie a garantire il funzionamento o la fornitura del Servizio.
              </p>

              <h4 className="text-lg font-semibold mt-4 mb-2">Strumenti di Tracciamento gestiti da terze parti</h4>

              <h5 className="text-md font-semibold mt-4 mb-2">MailerLite Landing Pages</h5>
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p><strong>Azienda:</strong> UAB "Mailerlite"</p>
                <p><strong>Luogo del trattamento:</strong> Lituania</p>
                <p><strong>Dati Personali trattati:</strong> Dati di utilizzo +2</p>
              </div>

              <h3 className="text-xl font-bold mt-6 mb-3">Funzionalità</h3>
              <p className="mb-6">
                Questa Applicazione utilizza Strumenti di Tracciamento per consentire semplici interazioni e attivare funzionalità che permettono agli Utenti di accedere a determinate risorse del Servizio e semplificano la comunicazione con il Titolare.
              </p>

              <h4 className="text-lg font-semibold mt-4 mb-2">Strumenti di Tracciamento gestiti da terze parti</h4>

              <h5 className="text-md font-semibold mt-4 mb-2">Mailing list o newsletter</h5>
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p><strong>Dati Personali trattati:</strong> Dati di utilizzo +2</p>
              </div>

              <h2 className="text-2xl font-bold text-purple-600 mt-8 mb-4">Come gestire le preferenze e prestare o revocare il consenso su questa Applicazione</h2>

              <p className="mb-4">
                Qualora l'utilizzo dei Tracker sia basato sul consenso, l'Utente può fornire o revocare tale consenso impostando o aggiornando le proprie preferenze tramite il relativo pannello delle scelte in materia di privacy disponibile su questa Applicazione.
              </p>

              <p className="mb-6">
                Per quanto riguarda Strumenti di Tracciamento di terza parte, gli Utenti possono gestire le proprie preferenze visitando il relativo link di opt out (qualora disponibile), utilizzando gli strumenti descritti nella privacy policy della terza parte o contattando quest'ultima direttamente.
              </p>

              <h3 className="text-xl font-bold mt-6 mb-3">Come controllare o eliminare Cookie e tecnologie simili tramite le impostazioni del tuo dispositivo</h3>
              
              <p className="mb-4">Gli Utenti possono utilizzare le impostazioni del proprio browser per:</p>
              
              <ul className="list-disc pl-6 mb-4">
                <li>Vedere quali Cookie o altre tecnologie simili sono stati impostati sul dispositivo;</li>
                <li>Bloccare Cookie o tecnologie simili;</li>
                <li>Cancellare i Cookie o tecnologie simili dal browser.</li>
              </ul>

              <p className="mb-4">
                Le impostazioni del browser, tuttavia, non consentono un controllo granulare del consenso per categoria.
              </p>

              <p className="mb-4">
                Gli Utenti possono, per esempio, trovare informazioni su come gestire i Cookie in alcuni dei browser più diffusi ai seguenti indirizzi:
              </p>

              <ul className="list-disc pl-6 mb-4">
                <li>Google Chrome</li>
                <li>Mozilla Firefox</li>
                <li>Apple Safari</li>
                <li>Microsoft Internet Explorer</li>
                <li>Microsoft Edge</li>
                <li>Brave</li>
                <li>Opera</li>
              </ul>

              <p className="mb-6">
                Gli Utenti possono inoltre gestire alcuni Strumenti di Tracciamento per applicazioni mobili disattivandoli tramite le apposite impostazioni del dispositivo, quali le impostazioni di pubblicità per dispositivi mobili o le impostazioni relative al tracciamento in generale (gli Utenti possono consultare le impostazioni del dispositivo per individuare quella pertinente).
              </p>

              <h3 className="text-xl font-bold mt-6 mb-3">Conseguenze legate al rifiuto dell'utilizzo di Strumenti di Tracciamento</h3>
              <p className="mb-6">
                Gli Utenti sono liberi di decidere se permettere o meno l'utilizzo di Strumenti di Tracciamento. Tuttavia, si noti che gli Strumenti di Tracciamento consentono a questa Applicazione di fornire agli Utenti un'esperienza migliore e funzionalità avanzate (in linea con le finalità delineate nel presente documento). Pertanto, qualora l'Utente decida di bloccare l'utilizzo di Strumenti di Tracciamento, il Titolare potrebbe non essere in grado di fornire le relative funzionalità.
              </p>

              <h2 className="text-2xl font-bold text-purple-600 mt-8 mb-4">Definizioni e riferimenti legali</h2>

              <h3 className="text-xl font-bold mt-6 mb-3">Dati Personali (o Dati)</h3>
              <p className="mb-4">
                Costituisce dato personale qualunque informazione che, direttamente o indirettamente, anche in collegamento con qualsiasi altra informazione, ivi compreso un numero di identificazione personale, renda identificata o identificabile una persona fisica.
              </p>

              <h3 className="text-xl font-bold mt-6 mb-3">Dati di Utilizzo</h3>
              <p className="mb-4">
                Sono le informazioni raccolte automaticamente attraverso questa Applicazione (anche da applicazioni di parti terze integrate in questa Applicazione), tra cui: gli indirizzi IP o i nomi a dominio dei computer utilizzati dall'Utente che si connette con questa Applicazione, gli indirizzi in notazione URI (Uniform Resource Identifier), l'orario della richiesta, il metodo utilizzato nell'inoltrare la richiesta al server, la dimensione del file ottenuto in risposta, il codice numerico indicante lo stato della risposta dal server (buon fine, errore, ecc.) il paese di provenienza, le caratteristiche del browser e del sistema operativo utilizzati dal visitatore, le varie connotazioni temporali della visita (ad esempio il tempo di permanenza su ciascuna pagina) e i dettagli relativi all'itinerario seguito all'interno dell'Applicazione, con particolare riferimento alla sequenza delle pagine consultate, ai parametri relativi al sistema operativo e all'ambiente informatico dell'Utente.
              </p>

              <h3 className="text-xl font-bold mt-6 mb-3">Utente</h3>
              <p className="mb-4">
                L'individuo che utilizza questa Applicazione che, salvo ove diversamente specificato, coincide con l'Interessato.
              </p>

              <h3 className="text-xl font-bold mt-6 mb-3">Interessato</h3>
              <p className="mb-4">
                La persona fisica cui si riferiscono i Dati Personali.
              </p>

              <h3 className="text-xl font-bold mt-6 mb-3">Responsabile del Trattamento (o Responsabile)</h3>
              <p className="mb-4">
                La persona fisica, giuridica, la pubblica amministrazione e qualsiasi altro ente che tratta dati personali per conto del Titolare, secondo quanto esposto nella presente privacy policy.
              </p>

              <h3 className="text-xl font-bold mt-6 mb-3">Titolare del Trattamento (o Titolare)</h3>
              <p className="mb-4">
                La persona fisica o giuridica, l'autorità pubblica, il servizio o altro organismo che, singolarmente o insieme ad altri, determina le finalità e i mezzi del trattamento di dati personali e gli strumenti adottati, ivi comprese le misure di sicurezza relative al funzionamento ed alla fruizione di questa Applicazione. Il Titolare del Trattamento, salvo quanto diversamente specificato, è il titolare di questa Applicazione.
              </p>

              <h3 className="text-xl font-bold mt-6 mb-3">Questa Applicazione</h3>
              <p className="mb-4">
                Lo strumento hardware o software mediante il quale sono raccolti e trattati i Dati Personali degli Utenti.
              </p>

              <h3 className="text-xl font-bold mt-6 mb-3">Servizio</h3>
              <p className="mb-4">
                Il Servizio fornito da questa Applicazione così come definito nei relativi termini (se presenti) su questo sito/applicazione.
              </p>

              <h3 className="text-xl font-bold mt-6 mb-3">Unione Europea (o UE)</h3>
              <p className="mb-4">
                Salvo ove diversamente specificato, ogni riferimento all'Unione Europea contenuto in questo documento si intende esteso a tutti gli attuali stati membri dell'Unione Europea e dello Spazio Economico Europeo.
              </p>

              <h3 className="text-xl font-bold mt-6 mb-3">Cookie</h3>
              <p className="mb-4">
                I Cookie sono Strumenti di Tracciamento che consistono in piccole porzioni di dati conservate all'interno del browser dell'Utente.
              </p>

              <h3 className="text-xl font-bold mt-6 mb-3">Strumento di Tracciamento</h3>
              <p className="mb-6">
                Per Strumento di Tracciamento s'intende qualsiasi tecnologia - es. Cookie, identificativi univoci, web beacons, script integrati, e-tag e fingerprinting - che consenta di tracciare gli Utenti, per esempio raccogliendo o salvando informazioni sul dispositivo dell'Utente.
              </p>

              <h2 className="text-2xl font-bold text-purple-600 mt-8 mb-4">Riferimenti legali</h2>
              <p className="mb-8">
                Ove non diversamente specificato, questa informativa privacy riguarda esclusivamente questa Applicazione.
              </p>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}