const httpProtokol = PoziviAjax;

const prijavaDugme = document.getElementById("prijavaDugme");
const korisničkoImeUnos = document.getElementById("korisničkoIme");
const lozinkaUnos = document.getElementById("lozinka");
const poljaFormeZaPrijavu = document.getElementById("poljaFormeZaPrijavu");

// POMOĆNE FUNKCIJE (za callback funkcije)
const postaviGreškuPrijave = () => {
  const greškaPrijave = document.getElementById("greškaPrijave");
  if (greškaPrijave.style.opacity != 1)
    greškaPrijave.style.opacity = 1;
}

const ukloniGreškuPrijave = () => {
  const greškaPrijave = document.getElementById("greškaPrijave");
  if (greškaPrijave.style.opacity != 0)
    greškaPrijave.style.opacity = 0;
}

// CALLBACK FUNKCIJE
const obradiOdgovorPrijave = (error, data) => {
  if (error) {
    postaviGreškuPrijave();
    return;
  }
  ukloniGreškuPrijave();
  location.href = "/predmeti.html";
}

// SLANJE ZAHTJEVA ZA PRIJAVU KADA SE KLIKNE NA DUGME ZA PRIJAVU 
// (čime se korisnik upućuje na stranicu sa njegovim predmetima)
prijavaDugme.addEventListener("click", () => {
  let korisničkoIme = korisničkoImeUnos.value;
  let lozinka = lozinkaUnos.value;
  httpProtokol.postLogin(korisničkoIme, lozinka, obradiOdgovorPrijave);
});
