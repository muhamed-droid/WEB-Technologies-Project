import {TabelaPrisustvo} from "./TabelaPrisustvo.js";

let div = document.getElementById("divSadrzaj");
//instanciranje
//document.getElementsByTagName("html")[0].innerHTML = "";


let prisustvo = TabelaPrisustvo(div, {studenti: [{ime:"Neko",index:12345}], prisustva:[{sedmica:1,predavanja:1,vjezbe:1,index:12345}], predmet:"WT", brojPredavanjaSedmicno:3, brojVjezbiSedmicno:2});

//ovo ne moze jer ne smijem koristiti document write



//pozivanje metoda
//prisustvo.sljedecaSedmica();
//prisustvo.prethodnaSedmica();
 
