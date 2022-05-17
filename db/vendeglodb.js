import mysql2 from 'mysql2/promise.js';

const connectionPool = mysql2.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'vendeglodb',
  connectionLimit: 5,
});

export async function getIdopontok(id) {
  const [elsoElemVisszaterites] = await connectionPool.query('select Nyitas,Zaras from vendeglo where VID = ?', id);
  return elsoElemVisszaterites[0];
}

export async function insertVendeglo(vendeglo) {
  const [elsoElemVisszaterites] = await connectionPool.query(
    `insert into vendeglo
     values (default, ?, ?, ?, ?, ?, ?, ?)`,
    [vendeglo.form_name,
      vendeglo.form_varos,
      vendeglo.form_utca,
      vendeglo.form_szam,
      vendeglo.form_telefon,
      vendeglo.form_nyitas,
      vendeglo.form_zaras],
  );
  return elsoElemVisszaterites;
}
export async function findAllVendeglo() {
  const [elsoElemVisszaterites] = await connectionPool.query('select * from vendeglo');
  return elsoElemVisszaterites;
}
export async function findVendeglo(id) {
  const [elsoElemVisszaterites] = await connectionPool.query('select * from vendeglo where VID = ?', id);
  return elsoElemVisszaterites[0];
}
export const findAllV = () => {
  const query = 'SELECT * FROM vendeglo';
  return connectionPool.executeQuery(query);
};

export async function insertKep(id, path) {
  const [elsoElemVisszaterites] = await connectionPool.query(
    `insert into kepek
     values (default, ?, ?)`,
    [id, path],
  );
  return elsoElemVisszaterites;
}
export async function findKep(id) {
  const [elsoElemVisszaterites] = await connectionPool.query('select * from kepek where VID = ?', id);
  return elsoElemVisszaterites;
}

export async function insertFelhasznalo(felhasznalonev) {
  return connectionPool.query(
    `insert into felhasznalo
     values (default, ?)`,
    felhasznalonev,
  );
}
export async function findAllFelhasznalo() {
  const [elsoElemVisszaterites] = await connectionPool.query('select * from felhasznalo');
  return elsoElemVisszaterites;
}
