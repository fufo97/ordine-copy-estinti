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

### OPZIONE C: Deploy su Aruba VPS (Hosting Italiano)

#### Caratteristiche Aruba VPS
- **Server in Italia** (velocità ottimale per utenti italiani)
- **Supporto in italiano**
- **Prezzi competitivi** (da €1/mese)
- **Configurazione manuale** ma controllo totale

### GUIDA SPECIFICA ARUBA VPS

#### 1. Setup Aruba VPS

**A. Attivazione VPS**
1. Pannello Aruba → Cloud Services → VPS
2. Scegli configurazione (minimo: 1GB RAM, 20GB SSD)
3. Sistema Operativo: **Ubuntu 22.04 LTS**
4. Configura credenziali SSH

**B. Primo Accesso**
```bash
# Dal tuo computer, connetti via SSH
ssh root@your-vps-ip

# Aggiorna sistema
apt update && apt upgrade -y

# Installa software necessario
apt install -y nodejs npm postgresql nginx certbot python3-certbot-nginx git unzip curl

# Verifica versioni
node --version  # Deve essere v18+
npm --version
```

**C. Configurazione Utente App**
```bash
# Crea utente dedicato per l'app
useradd -m -s /bin/bash copywriter
usermod -aG sudo copywriter

# Passa all'utente app
su - copywriter
cd /home/copywriter
```

#### 2. Setup Database PostgreSQL

```bash
# Torna a root per configurare PostgreSQL
exit  # torna a root

# Configura PostgreSQL
sudo -u postgres psql
```

**Nel prompt PostgreSQL:**
```sql
-- Crea database e utente
CREATE DATABASE ordine_copywriter;
CREATE USER copywriter_user WITH PASSWORD 'Password_Sicura_123!';
GRANT ALL PRIVILEGES ON DATABASE ordine_copywriter TO copywriter_user;
GRANT ALL ON SCHEMA public TO copywriter_user;
\q
```

**Configura accesso:**
```bash
# Modifica pg_hba.conf per permettere connessioni locali
nano /etc/postgresql/*/main/pg_hba.conf

# Aggiungi questa riga (cerca la sezione local):
local   ordine_copywriter    copywriter_user                md5

# Riavvia PostgreSQL
systemctl restart postgresql
systemctl enable postgresql
```

#### 5. Configurazione Nginx per Aruba

**A. Configurazione Dominio**
```bash
# Torna a root per configurare Nginx
sudo su

# Crea configurazione sito
nano /etc/nginx/sites-available/copywriter-site
```

**Configurazione Nginx:**
```nginx
server {
    listen 80;
    server_name tuo-dominio.com www.tuo-dominio.com;
    
    # Aumenta dimensione upload per immagini
    client_max_body_size 10M;
    
    # Proxy per l'app Node.js
    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Servizio statico per immagini caricate
    location /uploads/ {
        alias /home/copywriter/tuo-sito/uploads/;
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
}
```

**B. Attivazione Sito**
```bash
# Abilita il sito
ln -s /etc/nginx/sites-available/copywriter-site /etc/nginx/sites-enabled/

# Rimuovi sito default se presente
rm -f /etc/nginx/sites-enabled/default

# Testa configurazione
nginx -t

# Riavvia Nginx
systemctl restart nginx
systemctl enable nginx
```

#### 4. Deploy dell'App su Aruba

**A. Caricamento Files**
```bash
# Dal tuo computer locale, carica lo ZIP
scp tuo-sito.zip copywriter@your-vps-ip:/home/copywriter/

# Oppure usa SFTP con FileZilla:
# Host: your-vps-ip
# User: copywriter  
# Password: la password che hai impostato
```

**B. Installazione App**
```bash
# SSH nel VPS come utente copywriter
ssh copywriter@your-vps-ip

# Estrai e configura
cd /home/copywriter
unzip tuo-sito.zip
cd tuo-sito/

# Installa dipendenze Node.js
npm install --production

# Crea cartella uploads con permessi corretti
mkdir -p uploads
chmod 755 uploads
```

**C. Configurazione Ambiente**
```bash
# Crea file .env
nano .env
```

**Contenuto .env:**
```bash
DATABASE_URL=postgresql://copywriter_user:Password_Sicura_123!@localhost:5432/ordine_copywriter
NODE_ENV=production
PORT=5000

# Opzionale: Cambia password admin
ADMIN_PASSWORD=TuaPasswordSicura
```

#### 7. Configurazione Dominio su Aruba

**A. Punta il Dominio al VPS**
1. Pannello Aruba → Gestione DNS
2. Aggiungi record A:
   ```
   Nome: @
   Tipo: A  
   Valore: IP_del_tuo_VPS
   TTL: 3600
   ```
3. Aggiungi record CNAME per www:
   ```
   Nome: www
   Tipo: CNAME
   Valore: tuo-dominio.com
   ```

**B. Configura HTTPS con Let's Encrypt**
```bash
# Come root
sudo certbot --nginx -d tuo-dominio.com -d www.tuo-dominio.com

# Test rinnovo automatico
certbot renew --dry-run

# Certificato si rinnova automaticamente ogni 90 giorni
```

#### 6. Gestione App con PM2

**A. Installazione PM2**
```bash
# Come utente copywriter
npm install -g pm2

# Test avvio app
cd /home/copywriter/tuo-sito
npm run build  # Compila il progetto
npm start       # Test manuale (Ctrl+C per fermare)
```

**B. Configurazione PM2**
```bash
# Crea file di configurazione PM2
nano ecosystem.config.js
```

**Contenuto ecosystem.config.js:**
```javascript
module.exports = {
  apps: [{
    name: 'copywriter-site',
    script: 'npm',
    args: 'start',
    cwd: '/home/copywriter/tuo-sito',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
  }]
};
```

**C. Avvio Definitivo**
```bash
# Crea cartella logs
mkdir -p logs

# Avvia con PM2
pm2 start ecosystem.config.js

# Configura avvio automatico al riboot
pm2 startup
# Segui le istruzioni che appariranno (copia/incolla comando)

# Salva configurazione corrente
pm2 save

# Verifica stato
pm2 status
pm2 logs copywriter-site
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

## 🇮🇹 ARUBA VPS: Vantaggi Specifici

### ✅ **Perché Scegliere Aruba VPS:**
- **Server in Italia** → Velocità massima per utenti italiani
- **Supporto in Italiano** → Assistenza telefonica/email in italiano  
- **Prezzi Competitivi** → Da €1/mese (Basic) a €10/mese (Professional)
- **Pannello Aruba** → Gestione facile da interfaccia web
- **Backup Inclusi** → Snapshot automatici
- **Affidabilità** → 99.9% uptime garantito

### 📋 **Configurazione Consigliata Aruba:**
- **VPS Basic SSD** (€3-5/mese): 1GB RAM, 20GB SSD
- **Sistema**: Ubuntu 22.04 LTS  
- **Backup**: Attiva snapshot settimanali
- **Firewall**: Configura porte 22, 80, 443

### ⚡ **Tempi di Setup:**
- Setup VPS: 5 minuti
- Configurazione software: 30 minuti  
- Deploy app: 15 minuti
- **Totale: ~1 ora** per sito completamente funzionante

### 🔧 **Manutenzione Aruba VPS:**

```bash
# Aggiornamenti mensili del sistema
sudo apt update && sudo apt upgrade -y

# Backup database settimanale
pg_dump ordine_copywriter > backup_$(date +%Y%m%d).sql

# Monitoraggio spazio disco
df -h

# Restart app dopo aggiornamenti
pm2 restart copywriter-site
```

### 📞 **Supporto:**
- **Aruba**: 0575.0505 (assistenza italiana)
- **Documentazione**: Guide dettagliate nel pannello Aruba
- **Community**: Forum Aruba molto attivo

## 🎯 Conclusione

Con **Aruba VPS** hai:
- ✅ Sito online completamente funzionante
- ✅ Blog con editor ricco e upload immagini  
- ✅ Pannello admin per gestire tutto
- ✅ Hosting italiano veloce e affidabile
- ✅ Supporto in italiano
- ✅ Costi contenuti e prevedibili
- ✅ Controllo totale del server

Il tuo sito è ora pronto per crescere e gestire tutto il business dell'agenzia email marketing con la velocità e affidabilità di un server italiano!