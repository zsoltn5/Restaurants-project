const regex = /^[0-9]*/;
const regexSzavak = /^[A-Z][a-z]*/;

export function idoben(nyitas, zaras) {
  if (nyitas < 0 || nyitas > 24 || zaras < 0 || zaras > 24 || zaras < nyitas) {
    return false;
  }
  return true;
}

export function betuk(elso, masodik, harmadik) {
  if (!elso.match(regexSzavak) || !masodik.match(regexSzavak) || !harmadik.match(regexSzavak)) {
    return false;
  }
  return true;
}

export function checkNotEmpty(body) {
  return new Promise((resolve, reject) => {
    if (body.form_szam == null || body.form_varos == null || body.form_utca == null
      || body.form_telefon == null || body.form_nyitas == null || body.form_zaras == null) {
      reject();
    } else {
      resolve(body);
    }
  });
}

export function checkFields(body) {
  return new Promise((resolve, reject) => {
    if (body.form_szam < 0) {
      console.log('Negativ a hazszam');
      reject();
    } else if (!idoben(parseInt(body.form_nyitas, 10), parseInt(body.form_zaras, 10))) {
      console.log('0-24 kozotti szamok vannak elfogadva es a zaras a nyitas utan van, emiatt nagyobb kell legyen');
      reject();
    } else if (!body.form_zaras.match(regex) || !body.form_zaras.match(regex)
    || !body.form_szam.match(regex) || !body.form_telefon.match(regex)) {
      console.log('NEM EGY SZAM');
      reject();
    } else if (!betuk(body.form_varos, body.form_utca, body.form_name)) {
      console.log('Varos vagy utca nem szo');
      reject();
    } else {
      resolve(body);
    }
  });
}
