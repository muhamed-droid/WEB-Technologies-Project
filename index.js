const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const fs = require("fs");
const expressSession = require("express-session");

const application = express();

application.use(express.static("public/html"));
application.use(express.static("public/css"));
application.use(express.static("public/scripts"));
application.use(express.static("public/slike"));
application.use(bodyParser.json());
application.use(expressSession({
  secret: "tajniKljuč",
  resave: true,
  saveUninitialized: true
}));

// DEKRIPCIJA LOZINKE 
const dekriptujLozinku = (lozinka, hashLozinke) => {
  return bcrypt.compareSync(lozinka, hashLozinke);
}

// DOBAVLJANJE NIZA NASTAVNIKA
const dajNizIzJsonDatoteke = (nazivDatoteke) => {
  return JSON.parse(fs.readFileSync(`data/${nazivDatoteke}`).toString());
}

// PRONALAZAK NASTAVNIKA U NIZU
const dajNastavnika = (nastavnici, korisničkoIme, unesenaLozinka) => {
  nastavnik = nastavnici.filter(nastavnik => nastavnik.nastavnik.username == korisničkoIme && 
                                             dekriptujLozinku(unesenaLozinka, nastavnik.nastavnik.password_hash));
  return (nastavnik.length == 0) ? null : nastavnik[0];
}

// PRONALAZAK PREDMETA 
const pronađiPredmet = (nazivPredmeta) => {
  return dajNizIzJsonDatoteke("prisustva.json").filter(prisustvaZaPredmet => prisustvaZaPredmet.predmet == nazivPredmeta).length == 1;
}

// PRONALAZAK STUDENTA NA LISTI STUDENATA ZA PREDMET (u ovoj funkciji se podrazumijeva da predmet postoji)
const pronađiStudenta = (nazivPredmeta, indeks) => {
  return dajNizIzJsonDatoteke("prisustva.json").filter(prisustvaZaPredmet => prisustvaZaPredmet.predmet == nazivPredmeta)[0]
                                               .studenti.filter(student => student.index == indeks).length == 1;
}

// AŽURIRANJE PRISUSTVA ZA STUDENTA
const ažurirajPrisustvoZaStudenta = (nazivPredmeta, redniBrojSedmice, indeksStudenta, novaPrisustvaPredavanja, novaPrisustvaVježbe) => {
  if (!(pronađiPredmet(nazivPredmeta) && pronađiStudenta(nazivPredmeta, indeksStudenta)))
    return null; 
  let prisustvaZaPredmet = dajNizIzJsonDatoteke("prisustva.json").filter(prisustvaZaPredmet => prisustvaZaPredmet.predmet == nazivPredmeta)[0];
  let postojiPrisustvo = false;
  for (let i = 0; i < prisustvaZaPredmet.prisustva.length; i++) {
    if (prisustvaZaPredmet.prisustva[i].sedmica == redniBrojSedmice && prisustvaZaPredmet.prisustva[i].index == indeksStudenta) {
      prisustvaZaPredmet.prisustva[i].predavanja = novaPrisustvaPredavanja;
      prisustvaZaPredmet.prisustva[i].vjezbe = novaPrisustvaVježbe;
      postojiPrisustvo = true;      
    }
  }
  if (!postojiPrisustvo)
    prisustvaZaPredmet.prisustva.push({
      sedmica: redniBrojSedmice,
      predavanja: novaPrisustvaPredavanja,
      vjezbe: novaPrisustvaVježbe,
      index: indeksStudenta
    });
  upišiNovoStanjePrisustva(prisustvaZaPredmet);
  return prisustvaZaPredmet;
}

// UPISIVANJE NOVOG STANJA PRISUSTVA
const upišiNovoStanjePrisustva = (novaPrisustvaZaPredmet) => {
  const prisustvaZaPredmete = dajNizIzJsonDatoteke("prisustva.json");
  for (let i = 0; i < prisustvaZaPredmete.length; i++) 
    if (prisustvaZaPredmete[i].predmet == novaPrisustvaZaPredmet.predmet)
      prisustvaZaPredmete[i] = novaPrisustvaZaPredmet;
  fs.writeFileSync("data/prisustva.json", JSON.stringify(prisustvaZaPredmete));
}

// RUTE
application.post("/login", (request, response) => {
  let korisničkoIme = request.body.username;
  let lozinka = request.body.password;
  let prijavljeniKorisnik = dajNastavnika(dajNizIzJsonDatoteke("nastavnici.json"), korisničkoIme, lozinka);
  response.setHeader("Content-Type", "application/json");
  if (prijavljeniKorisnik != null) {
    request.session.korisničkoIme = prijavljeniKorisnik.nastavnik.username;
    request.session.predmeti = prijavljeniKorisnik.predmeti;
    response.status(200);
    response.send(JSON.stringify({ poruka: "Uspješna prijava" }));
  } else {
    response.status(401);
    response.send(JSON.stringify({ poruka: "Neuspješna prijava" }));
  }
});

application.get("/predmeti", (request, response) => {
  response.setHeader("Content-Type", "application/json");
  if (request.session.korisničkoIme == null) {
    response.status(401);
    response.send(JSON.stringify({ greska: "Nastavnik nije loginovan!" }));
  } else {
    response.status(200);
    response.send(JSON.stringify(request.session.predmeti));
  }
});

application.post("/logout", (request, response) => {
  request.session.korisničkoIme = null;
  request.session.predmeti = null;
  response.status(200);
  response.setHeader("Content-Type", "application/json");
  response.send(JSON.stringify({ poruka: "Uspješna odjava!" }));
});

application.get(/\/predmet\/.+/, (request, response) => {
  response.setHeader("Content-Type", "application/json");
  if (request.session.korisničkoIme == null) {
    response.status(401);
    response.send(JSON.stringify({ greška: "Nastavnik nije prijavljen!" }));
    return;
  }
  let nazivPredmeta = decodeURIComponent(request.url.toString().split("/").reverse()[0]);
  let prisustva = dajNizIzJsonDatoteke("prisustva.json");
  let prisustvoZaPredmet = prisustva.filter(prisustvo => prisustvo.predmet == nazivPredmeta)[0];
  if (prisustvoZaPredmet == null) {
    response.status(404);
    response.send(JSON.stringify({ poruka: "Predmet nije pronađen!" }));
    return;
  }
  response.status(200);
  response.send(JSON.stringify(prisustvoZaPredmet));
});

application.post(/\/prisustvo\/predmet\/.+\/student\/.+/, (request, response) => {
  if (request.session.korisničkoIme == null) {
    response.status(401);
    response.send(JSON.stringify({ greška: "Nastavnik nije prijavljen!" }));
    return;
  }
  const dijeloviPutanje = request.url.toString().split("/");
  const novaPrisustva = ažurirajPrisustvoZaStudenta(decodeURIComponent(dijeloviPutanje[3]), request.body.sedmica, parseInt(decodeURIComponent(dijeloviPutanje[5])), request.body.predavanja, request.body.vjezbe);
  response.setHeader("Content-Type", "application/json");
  if (!novaPrisustva) {
    response.status(404);
    response.send(JSON.stringify({ poruka: "Nepostojeći student ili predmet!" }));
    return;
  }
  response.status(200);
  response.send(JSON.stringify(novaPrisustva));
});

application.listen(3000, (greška) => {
  if (greška)
    console.log("Greška prilikom pokretanja servera!");
  else
    console.log("Server started at port 3000...");
});