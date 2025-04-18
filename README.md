generaServer

generaServer è uno strumento che ti permette di generare rapidamente un server web base utilizzando Express.js. Il comando interattivo crea automaticamente un progetto con tutte le configurazioni necessarie per avviare un server, permettendoti di personalizzare facilmente la porta di ascolto e decidere se utilizzare require o import.

---

Come Installare

Installazione Globale

Puoi installare generaServer globalmente per poterlo usare in qualsiasi cartella del tuo sistema con il comando:

npm install -g generaServer

Installazione Locale

Puoi anche installarlo localmente nel tuo progetto:

npm install generaServer

---

Come Usare

Dopo aver installato generaServer, puoi eseguire il comando creaServer dalla cartella in cui desideri creare il tuo server web:

creaServer

Quando esegui il comando, ti verranno fatte alcune domande interattive per configurare il tuo server. In particolare, ti verrà chiesto di:

1. Scegliere la porta di ascolto (default: 3000).
2. Se vuoi usare 'import' invece di 'require' (per gli sviluppatori che preferiscono i moduli ES6).

In base alle tue risposte, verranno creati i seguenti file:

- index.js: il file principale per il server Express.
- conf.json: un file di configurazione con la porta di ascolto.
- public/index.html: una pagina base per testare il server.
- README.md: questo file di documentazione.
- .gitignore: per escludere node_modules dal controllo versione.

---

Esempio di Utilizzo

1. Esegui il comando:

   creaServer

2. Rispondi alle domande:

   - Porta di ascolto (default: 3000).
   - Usa import invece di require? (s/N).

3. Avvia il server con:

   npm install #facoltativo, nel momento in cui viene completato il codice le librerie vengono installate automaticamente
   npm start

Il server sarà attivo su http://localhost:3000 (o la porta che hai scelto).

---

Struttura del Progetto

Una volta creato il progetto, avrai la seguente struttura di cartelle e file:

your-project/
│
├── conf.json                # Configurazione della porta
├── index.js                 # Server principale (Express)
├── package.json             # Gestione delle dipendenze e script
├── .gitignore               # Ignora i file node_modules
├── README.md                # Documentazione del progetto
└── public/
    └── index.html           # Pagina HTML di base per il client

---

Dipendenze

Il progetto richiede le seguenti dipendenze:

- express: Framework web per Node.js.
- body-parser: Middleware per la gestione dei dati JSON e URL-encoded.
- path: Modulo per la gestione dei percorsi.
- fs: Modulo per l'interazione con il file system.

---

License

Distribuito sotto la licenza ISC. Vedi LICENSE per maggiori dettagli.

---

Contribuisci

Se desideri contribuire a questo progetto, sentiti libero di fare un fork, proporre modifiche e aprire una pull request. Ogni contributo è benvenuto!

---

Buon sviluppo! 🚀
