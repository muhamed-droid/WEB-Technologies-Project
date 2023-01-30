const PoziviAjax = (() => {

    // POMOĆNE FUNKCIJE
    const postaviError = (statusniKod, odgovor) => {
      if (statusniKod == 200)
        return null;
      return odgovor;
    }
  
    const postaviData = (statusniKod, odgovor) => {
      if (statusniKod != 200)
        return null;
      return odgovor;
    }
  
    const pozoviObraduOdgovora = (statusniKodOdgovora, tekstOdgovora, obradiOdgovor) => {
        obradiOdgovor(postaviError(statusniKodOdgovora, tekstOdgovora), postaviData(statusniKodOdgovora, tekstOdgovora));
    }
  
    // FUNKCIJE ZA SLANJE ZAHTJEVA
    const uputiZahtjevZaPrijavu = (korisničkoIme, lozinka, obradiOdgovor) => {
      const ajax = new XMLHttpRequest;
      ajax.onreadystatechange = () => {
        if (ajax.readyState == 4)
          pozoviObraduOdgovora(ajax.status, ajax.responseText, obradiOdgovor);
      }
      ajax.open("POST", "/login", true);
      ajax.setRequestHeader("Content-Type", "application/json");
      ajax.send(JSON.stringify({ username: korisničkoIme, password: lozinka }));
    }
  
    const uputiZahtjevZaPredmete = (obradiOdgovor) => {
      const ajax = new XMLHttpRequest;
      ajax.onreadystatechange = () => {
        if (ajax.readyState == 4)
          pozoviObraduOdgovora(ajax.status, ajax.responseText, obradiOdgovor);
      }
      ajax.open("GET", "/predmeti", true);
      ajax.send();
    }
  
    const uputiZahtjevZaOdjavu = (obradiOdgovor) => {
      const ajax = new XMLHttpRequest;
      ajax.onreadystatechange = () => {
        if (ajax.readyState == 4)
          pozoviObraduOdgovora(ajax.status, ajax.responseText, obradiOdgovor);
      }
      ajax.open("POST", "/logout", true);
      ajax.send();
    }
  
    const uputiZahtjevZaPrisustvaPredmetu = (naziv, obradiOdgovor) => {
      const ajax = new XMLHttpRequest;
      ajax.onreadystatechange = () => {
        if (ajax.readyState == 4)
          pozoviObraduOdgovora(ajax.status, ajax.responseText, obradiOdgovor);
      }
      ajax.open("GET", `/predmet/${naziv}`, true);
      ajax.send();
    }
  
    const uputiZahtjevZaPromjenuPrisustva = (nazivPredmeta, indeksStudenta, prisustvo, obradiOdgovor) => {
      const ajax = new XMLHttpRequest;
      ajax.onreadystatechange = () => {
        if (ajax.readyState == 4)
          pozoviObraduOdgovora(ajax.status, ajax.responseText, obradiOdgovor);
      }
      ajax.open("POST", `/prisustvo/predmet/${nazivPredmeta}/student/${indeksStudenta}`, true);
      ajax.setRequestHeader("Content-Type", "application/json");
      ajax.send(JSON.stringify(prisustvo)); 
    }
  
    // POVRATNA VRIJEDNOST MODULA
    return {
      postLogin: uputiZahtjevZaPrijavu,
      postLogout: uputiZahtjevZaOdjavu,
      getPredmeti: uputiZahtjevZaPredmete,
      getPredmet: uputiZahtjevZaPrisustvaPredmetu,
      postPrisustvo: uputiZahtjevZaPromjenuPrisustva
    }
  
  })();