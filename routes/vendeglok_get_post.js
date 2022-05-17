import express from 'express';
import { join } from 'path';
import eformidable from 'express-formidable';
import * as valid from '../middleware/validate.js';
import {
  findAllVendeglo,
  insertVendeglo,
  findVendeglo,
  insertKep,
  findAllFelhasznalo,
  getIdopontok,
  findKep,
} from '../db/vendeglodb.js';

import {
  insertFoglalas,
  findFoglalasok,
  deleteFoglalas,
} from '../db/foglalasok.js';

const router = express.Router();
const regex = /^[0-9]*/;

//
// Fooldal betoltese
//
router.get('/', async (req, res) => {
  try {
    const vendeglok = await findAllVendeglo();
    // console.log(vendeglok);
    res.render('index', { vendeglok });
  } catch (err) {
    console.error(err);
    res.type('.html').status(400).render('error', { message: 'NEM SIKERULT BETOLTENI A VENDEGLOKET' });
  }
});

//
// Vendeglo beszurasa
//
router.post('/vendegloBeszuras', async (req, res) => {
  valid.checkNotEmpty(req.body).catch(() => {
    res.type('.html').status(400).render('error', { message: 'URES MEZOT KAPTUNK!' });
    console.log('EMPTY FIELD ERROR');
  });

  valid.checkFields(req.body).catch(() => {
    res.type('.html').status(400).render('error', { message: 'ERROR WITH THE DATA: VendegloBeszuras' });
  }).then(await insertVendeglo(req.body)).then(() => {
    res.redirect('/');
  })
    .catch((err) => {
      console.error(err);
      res.type('.html').status(400).render('error', { message: 'ERROR WITH THE DATA: VendegloBeszuras' });
    });
});

//
// A foglalas oldal betoltese
//
router.get('/uj_foglalas', async (req, res) => {
  try {
    const vendeglok = await findAllVendeglo();
    const felhasznalolista = await findAllFelhasznalo();
    res.render('foglalas', { vendeglok, felhasznalolista });
  } catch (err) {
    console.error(err);
    res.type('.html').status(400).render('error', { message: 'Nem sikerult uj foglalast betenni' });
  }
});

//
// form_foglalas
//
router.post('/form_foglalas', async (req, res) => {
  try {
    const vid = (req.body.vendeg);
    const fid = (req.body.felhasznalo_n);
    const time = (req.body.form_kliens_idopont);
    const nyitvatartas = await getIdopontok(vid);

    if (!time.match(regex) || !vid.match(regex)) {
      console.log('NEM EGY SZAM');
      res.end('NEM EGY SZAM');
      res.type('.html').status(400).render('error', { message: 'NEM EGY SZAM' });
    } else if (time < nyitvatartas.Nyitas || time > nyitvatartas.Zaras) {
      console.log('Ebben az idopontban nincsen nyitva a Vendeglo');
      res.type('.html').status(400).render('error', { message: 'Ebben az idopontban nincsen nyitva a Vendeglo' });
    } else {
      const respBody = `Foglalas érkezett:\n
        Vendeglo ID: ${vid}\n
        Foglalas erre az IDra: ${fid}\n
        Idopont: ${time}\n
      `;

      insertFoglalas(vid, fid, time);

      console.log(respBody);
      res.type('.html').status(200).render('succes', {
        message: `Foglalas érkezett:\n
      Vendeglo ID: ${vid}\n
      Foglalas erre az IDra: ${fid}\n
      Idopont: ${time}\n
    `,
      });
    }
  } catch (err) {
    console.error(err);
    res.type('.html').status(400).render('error', { message: 'Nem sikerult uj foglalast betenni' });
  }
});

//
// Itt adom tovabb az id-t es renderelem be a kepfeltoltes oldalt
//
router.get('/vendeglo/:id', async (req, res) => {
  try {
    const idVendeglo = req.param('id');
    const vendeglok = await findVendeglo(idVendeglo);
    const foglalasok = await findFoglalasok(idVendeglo);
    const kepek = await findKep(idVendeglo);

    res.render('kepfeltoltes', {
      vendeglok, id: idVendeglo, foglalasok, kepek,
    });
  } catch (err) {
    console.error(err);
    res.type('.html').status(400).render('error', { message: 'Nem sikerult betolteni a Tovabbi reszletek oldalt!' });
  }
});

//
// ajax vendeglo tobb info betoltesehez
//
router.get('/getMoreInfoVendeglo/:id', async (req, res) => {
  const idVendeglo = req.param('id');
  const vendegloInfo = await findVendeglo(idVendeglo);
  res.send(JSON.stringify(`${vendegloInfo.Varos},  ${vendegloInfo.Utca},  ${vendegloInfo.Szam}\n${vendegloInfo.Telefon}`));
});

//
// ajax foglalas torlese
//
router.get('/deleteFoglalas/:FoglalasID', async (req) => {
  const idFoglalas = req.param('FoglalasID');
  await deleteFoglalas(idFoglalas);
});

//
// form_kepek
//
const uploadDir = join(process.cwd(), 'static/uploadDir');
router.use(express.static(join(process.cwd(), 'static')));
router.use(eformidable({ uploadDir }));

router.post('/form_kepek', async (req, res) => {
  const fileHandler = req.files.kliens_file;
  const vid = (req.fields.form_kep_id);

  try {
    if (!fileHandler) {
      console.log('Nem adtal meg kepet!');
      res.type('.html').status(400).render('error', { message: 'Nem adtal meg kepet!' });
    } else {
      const respBody = `Feltöltés érkezett:
        Vendeglo ID: ${vid}
        állománynév: ${fileHandler.name}
        név a szerveren: ${fileHandler.path.split('\\').splice(-1)[0]}
      `;
      await insertKep(vid, fileHandler.path.split('\\').splice(-1)[0]);

      console.log(respBody);

      res.type('.html').status(200).render('succes', { message: respBody });
    }
  } catch (err) {
    res.type('.html').status(400).render('error', { message: 'NEM SIKERULT A KEP BESZURASA' });
  }
});

export default router;
