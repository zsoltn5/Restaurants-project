//
// Itt csak a foglalasokkal vannak fuggvenyek
//
import mysql2 from 'mysql2/promise.js';

const connectionPool = mysql2.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'vendeglodb',
  connectionLimit: 5,
});

export async function findFoglalasok(id) {
  const [elsoElemVisszaterites] = await connectionPool.query(`
    select * from foglalas as f 
      join vendeglo as v on f.VID = v.VID
      join felhasznalo as fe on fe.FID = f.FID
      where v.VID = ?`, id);
  return elsoElemVisszaterites;
}

export async function findAllFoglalas() {
  const [elsoElemVisszaterites] = await connectionPool.query('select * from foglalas');
  return elsoElemVisszaterites;
}

export async function insertFoglalas(vid, fid, ora) {
  return connectionPool.query(
    `insert into foglalas
     values (default, ?, ?, ?)`,
    [vid, fid, ora],
  );
}

export async function deleteFoglalas(id) {
  return connectionPool.query(`
   delete from foglalas 
    where FoglalasId = ?`, id);
}
