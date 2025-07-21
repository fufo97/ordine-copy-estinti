# Guida Completa al Deployment del Sito

## 📋 Panoramica
Questa guida ti spiega come pubblicare online il tuo sito "Ordine dei Copywriter Estinti" con tutte le funzionalità di gestione blog e amministrazione.

## 🏗️ Architettura del Sito
- **Frontend**: React + TypeScript (interfaccia utente)
- **Backend**: Node.js + Express (API e server)
- **Database**: PostgreSQL (articoli blog, contenuti, utenti)
- **File Upload**: Sistema di caricamento immagini
- **Admin Panel**: Pannello di amministrazione completo

## 📦 Preparazione File

### 1. Struttura del Progetto Scaricato
Dopo aver scaricato lo ZIP, avrai questa struttura:
```
tuo-sito/
├── client/           # Frontend React
├── server/           # Backend Node.js
├── shared/           # Schema database condiviso
├── uploads/          # Cartella per immagini caricate
├── package.json      # Dipendenze Node.js
├── drizzle.config.ts # Configurazione database
└── README.md         # Documentazione
```

## 🚀 Deployment su Servizi Cloud

### OPZIONE A: Deploy su Railway (CONSIGLIATO - Facile e Gratuito)

#### 1. Preparazione
- Vai su [Railway.app](https://railway.app)
- Crea un account gratuito con GitHub/Google

#### 2. Setup Database
```bash
# Railway crea automaticamente PostgreSQL
# Non serve configurazione manuale
```

#### 3. Deploy del Progetto
1. **Carica il progetto:**
   - Clicca "New Project" 
   - Seleziona "Deploy from GitHub repo" (dopo aver caricato su GitHub)
   - Oppure "Deploy from ZIP" (carica direttamente il file)

2. **Configurazione Automatica:**
   - Railway rileva automaticamente Node.js
   - Installa dipendenze automaticamente
   - Configura il database PostgreSQL

3. **Variabili d'Ambiente:**
   Railway configura automaticamente:
   ```
   DATABASE_URL=postgresql://...
   NODE_ENV=production
   PORT=3000
   ```

#### 4. Build e Deploy
Railway esegue automaticamente:
```bash
npm install          # Installa dipendenze
npm run build       # Compila il progetto
npm start           # Avvia il server
```

### OPZIONE B: Deploy su Render (Alternativa Gratuita)

#### 1. Setup su Render.com
- Crea account su [Render.com](https://render.com)
- Collega il tuo repository GitHub

#### 2. Crea Database PostgreSQL
- Dashboard Render → "New PostgreSQL"
- Copia l'URL del database

#### 3. Crea Web Service
- "New Web Service"
- Collega repository
- Configurazioni:
  ```
  Build Command: npm install && npm run build
  Start Command: npm start
  ```

#### 4. Variabili d'Ambiente
Aggiungi in Render:
```
DATABASE_URL=your_postgresql_url
NODE_ENV=production
```

### OPZIONE C: Deploy su VPS (Per Utenti Avanzati)

#### 1. Configurazione Server
```bash
# Su Ubuntu/Debian
sudo apt update
sudo apt install nodejs npm postgresql nginx

# Crea utente per l'app
sudo useradd -m -s /bin/bash sitoweb
```

#### 2. Setup Database
```bash
sudo -u postgres createdb ordine_copywriter
sudo -u postgres psql
# ALTER USER postgres PASSWORD 'password_sicura';
```

#### 3. Configurazione Nginx
```nginx
# /etc/nginx/sites-available/tuo-sito
server {
    listen 80;
    server_name tuo-dominio.com;
    
    location / {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
    
    location /uploads/ {
        alias /home/sitoweb/app/uploads/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### 4. Deploy dell'App
```bash
# Copia i file nell'VPS
scp -r tuo-sito.zip user@server:/home/sitoweb/
cd /home/sitoweb/
unzip tuo-sito.zip
cd tuo-sito/

# Installa dipendenze
npm install

# Configura variabili d'ambiente
nano .env
```

#### 5. File .env
```bash
DATABASE_URL=postgresql://postgres:password@localhost:5432/ordine_copywriter
NODE_ENV=production
PORT=5000
```

#### 6. Avvio con PM2
```bash
npm install -g pm2
pm2 start npm --name "sito-copywriter" -- start
pm2 startup
pm2 save
```

## 🔧 Post-Deployment: Configurazione Iniziale

### 1. Verifica Database
Il database viene creato automaticamente al primo avvio. Le tabelle includono:
- `blog_posts` - Articoli del blog
- `admin_sessions` - Sessioni admin
- `admin_content` - Contenuti editabili
- `diagnosis_requests` - Richieste di diagnosi
- `contact_submissions` - Contatti

### 2. Accesso Admin
- URL: `https://tuo-sito.com/admin`
- Password: `Fufo@SITO` (cambiala nel codice se necessario)

### 3. Test Funzionalità
1. **Blog Management**: `/admin` → Menu → "📝 Gestisci Blog"
2. **Caricamento Immagini**: Testa upload nel form blog
3. **Modifica Contenuti**: Clicca sui testi in modalità admin

## 📝 Gestione Quotidiana

### Creare Nuovo Articolo
1. Login admin: `tuo-sito.com/admin`
2. Menu → "📝 Gestisci Blog"
3. "Nuovo Articolo"
4. Compila tutti i campi
5. Carica immagine di evidenza
6. Seleziona "Pubblicato" per renderlo visibile
7. Clicca "Crea Articolo"

### Modificare Contenuti Sito
1. Login admin: `tuo-sito.com/admin`
2. Naviga alle varie pagine
3. Clicca sui testi per modificarli
4. Usa l'editor per formattazione
5. Le modifiche si salvano automaticamente

### Gestire Richieste Contatti
- Le richieste di diagnosi e contatti si salvano nel database
- Accesso via admin panel o direttamente nel database

## 🔄 Aggiornamenti Future

### Modifiche al Codice
1. **Sviluppo Locale**:
   ```bash
   npm run dev  # Avvia in modalità sviluppo
   ```

2. **Modifiche Database**:
   ```bash
   npm run db:push  # Aggiorna schema database
   ```

3. **Deploy Aggiornamenti**:
   - Su Railway/Render: Push su GitHub (deploy automatico)
   - Su VPS: 
     ```bash
     git pull origin main
     npm install
     pm2 restart sito-copywriter
     ```

### Backup Database
```bash
# Backup automatico (su VPS)
pg_dump ordine_copywriter > backup_$(date +%Y%m%d).sql

# Restore
psql ordine_copywriter < backup_20250121.sql
```

## 🔒 Sicurezza

### 1. Cambiare Password Admin
Nel file `server/routes.ts`, riga 17:
```typescript
const ADMIN_PASSWORD = "TUA_NUOVA_PASSWORD_SICURA";
```

### 2. Configurare HTTPS
- Railway/Render: HTTPS automatico
- VPS: Usa Certbot per Let's Encrypt
  ```bash
  sudo certbot --nginx -d tuo-dominio.com
  ```

### 3. Backup Regolari
- Database: Backup settimanali
- File uploads: Backup immagini caricate

## 📞 Supporto Tecnico

### Problemi Comuni
1. **Sito non si carica**: Verifica variabili d'ambiente
2. **Database non funziona**: Controlla DATABASE_URL
3. **Upload immagini fallisce**: Verifica permessi cartella uploads/
4. **Admin non accessibile**: Controlla password e sessioni

### Log Errors
```bash
# Su Railway/Render: Vedi logs dal dashboard
# Su VPS:
pm2 logs sito-copywriter
tail -f /var/log/nginx/error.log
```

## 🎯 Conclusione

Seguendo questa guida hai:
- ✅ Sito online completamente funzionante
- ✅ Blog con editor ricco e upload immagini
- ✅ Pannello admin per gestire tutto
- ✅ Sistema sicuro e scalabile
- ✅ Procedure per aggiornamenti futuri

Il tuo sito è ora pronto per crescere e gestire tutto il business dell'agenzia email marketing!