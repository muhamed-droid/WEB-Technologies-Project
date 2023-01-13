import {TabelaPrisustvo} from "./TabelaPrisustvo.js";

const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
    console.log('Server started on port 3000');
});


app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
 });
 


let div = document.getElementById("divSadrzaj");
//instanciranje
//document.getElementsByTagName("html")[0].innerHTML = "";


let prisustvo = TabelaPrisustvo(div, {
	"studenti": [{
			"ime": "Neko Nekic",
			"index": 12345
		},
		{
			"ime": "Drugi Neko",
			"index": 12346
		}
	],
	"prisustva": [{
			"sedmica": 1,
			"predavanja": 2,
			"vjezbe": 1,
			"index": 12345
		},
		{
			"sedmica": 1,
			"predavanja": 2,
			"vjezbe": 2,
			"index": 12346
		},
		{
			"sedmica": 2,
			"predavanja": 2,
			"vjezbe": 0,
			"index": 12345
		},
		{
			"sedmica": 2,
			"predavanja": 2,
			"vjezbe": 0,
			"index": 12346
		}
	],
	"predmet": "Razvoj mobilnih aplikacija",
	"brojPredavanjaSedmicno": 2,
	"brojVjezbiSedmicno": 2
}
);

//ovo ne moze jer ne smijem koristiti document write



//pozivanje metoda
//prisustvo.sljedecaSedmica();
//prisustvo.prethodnaSedmica();
 
