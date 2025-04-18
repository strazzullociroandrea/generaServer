#!/usr/bin/env node
const readline = require('readline');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const librerieRequire = `
const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const server = http.createServer(app);
`;

const librerieImport = `
import express from 'express';
import http from 'http';
import path from 'path';
import bodyParser from 'body-parser';
import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const server = http.createServer(app);
`;

const serverCode = `
const conf = JSON.parse(fs.readFileSync('conf.json'));

(() => {
    app.use(bodyParser.json());
    app.use(
        bodyParser.urlencoded({
            extended: true,
        })
    );

    app.use("/", express.static(path.join(__dirname, "public")));

    server.listen(conf.port, () => {
        console.log("---> server running on http://localhost:" + conf.port);
    });
})();
`;
const htmlBase = `
<!DOCTYPE html>
<html>
    <head>
        <title>My project</title>
    </head>
    <body>
        <h2> Server is running correctly! </h2>
    </body>
</html>
`;
try {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const currentDir = process.cwd(); // <-- cartella dove esegui il comando
    let porta = 3000;
    let usoImport = false;

    rl.question("Inserisci la porta di ascolto (default 3000): ", (rispostaPorta) => {
        const portaUtente = parseInt(rispostaPorta);
        if (!isNaN(portaUtente) && portaUtente > 0 && portaUtente < 65536) {
            porta = portaUtente;
        }

        rl.question("Vuoi usare 'import' invece di 'require'? (s/N): ", (rispostaImport) => {
            const risposta = rispostaImport.trim().toLowerCase();
            usoImport = (risposta === 's' || risposta === 'si' || risposta === 'y');

            // 1. conf.json
            const conf = { port: porta };
            try {
                fs.writeFileSync(path.join(currentDir, 'conf.json'), JSON.stringify(conf, null, 2));
            } catch (e) {
                console.error("Errore durante la scrittura del file conf.json: " + e.message);
                rl.close();
                return;
            }

            // 2. public/index.html
            const dirPublic = path.join(currentDir, 'public');
            if (!fs.existsSync(dirPublic)) {
                try {
                    fs.mkdirSync(dirPublic);
                } catch (e) {
                    console.error("Errore durante la creazione della cartella public: " + e.message);
                    rl.close();
                    return;
                }
            }

            try {
                fs.writeFileSync(path.join(dirPublic, 'index.html'), htmlBase);
            } catch (e) {
                console.error("Errore durante la scrittura del file index.html: " + e.message);
                rl.close();
                return;
            }

            // 3. index.js
            const codice = (usoImport ? librerieImport : librerieRequire) + serverCode;
            try {
                fs.writeFileSync(path.join(currentDir, 'index.js'), codice);
            } catch (e) {
                console.error("Errore durante la scrittura del file index.js: " + e.message);
                rl.close();
                return;
            }

            // 4. package.json
            const packageJson = {
                name: "",
                version: "1.0.0",
                main: "index.js",
                scripts: {
                    "start": "node index.js",
                    "test": "echo \"Error: no test specified\" && exit 1"
                },
                "keywords": [],
                "author": "",
                "dependencies": {}  
            };

            if (usoImport) {
                packageJson.type = "module";
            }

            try {
                fs.writeFileSync(path.join(currentDir, 'package.json'), JSON.stringify(packageJson, null, 2));
            } catch (e) {
                console.error("Errore durante la scrittura del file package.json: " + e.message);
                rl.close();
                return;
            }

            // 5. .gitignore
            try {
                fs.writeFileSync(path.join(currentDir, '.gitignore'), 'node_modules\n');
            } catch (e) {
                console.error("Errore durante la scrittura del file .gitignore: " + e.message);
                rl.close();
                return;
            }

            // 6. README.md
            const readme = `
            # Server NodeJS Base
            
            Server base creato automaticamente con Express.js.
            
            ## Avvio
            npm install
            npm start
            
            Server attivo su: [http://localhost:${porta}](http://localhost:${porta})
            `;
            try {
                fs.writeFileSync(path.join(currentDir, 'README.md'), readme.trim());
            } catch (e) {
                console.error("Errore durante la scrittura del file README.md: " + e.message);
                rl.close();
                return;
            }

            console.log(`\n✅ Progetto creato con ${usoImport ? 'import (ES Modules)' : 'require (CommonJS)'}`);
            console.log(`- Porta: ${porta}`);
            console.log(`- Avvia con: npm install && npm start\n`);

            rl.close();

            // 7. npm install
            const installRequire = "npm install express http path body-parser fs";
            const installImport = "npm install express http path body-parser fs url";

            exec(usoImport ? installImport : installRequire, { cwd: currentDir }, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Errore durante l'esecuzione del comando npm install: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.error(`Stderr: ${stderr}`);
                    return;
                }
                console.log(`\n📦 Librerie installate:\n${stdout}`);
            });
        });
    });

} catch (e) {
    console.error("Non è stato possibile creare il server express base, " + e.message);
}
