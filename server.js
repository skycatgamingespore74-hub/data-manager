const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 10000;
const DATA_FOLDER = './data';
if (!fs.existsSync(DATA_FOLDER)) fs.mkdirSync(DATA_FOLDER);

// POST /save
app.post('/save', (req, res) => {
  const { filename, data } = req.body;
    if (!filename || !data) return res.status(400).send({ error: 'Données manquantes' });

      fs.writeFileSync(`${DATA_FOLDER}/${filename}.json`, JSON.stringify(data, null, 2));
        console.log(`[${new Date().toLocaleTimeString()}] ${filename} sauvegardé`);
          res.send({ status: 'ok' });
          });

          // GET /load
          app.get('/load', (req, res) => {
            const { filename } = req.query;
              if (!filename) return res.status(400).send({ error: 'Nom du fichier manquant' });

                const path = `${DATA_FOLDER}/${filename}.json`;
                  if (!fs.existsSync(path)) return res.send({ data: [] });

                    const data = JSON.parse(fs.readFileSync(path));
                      res.send({ data });
                      });

                      app.listen(PORT, () => console.log(`Serveur JSON actif sur le port ${PORT}`));