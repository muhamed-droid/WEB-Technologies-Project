export let TabelaPrisustvo = function (divRef, podaci) {
    
    divRef.innerHTML="";
    if(podaci.length==0) return;


    let tabela =  document.createElement("table");
    tabela.className = "tabela";
    let prviRed = document.createElement("tr");
    prviRed.className = "prvi-red";
    let prvaKolona = document.createElement("td");
    prvaKolona.className = "prva-kolona";
    prvaKolona.innerHTML = "Ime i prezime";
    //odnosno ostale kolone
    let tekst;
    //trenutna sedmica je posljednja sa prisustvom
    let trenutna=1;
    for(let i = 0; i<podaci.prisustva.length; i++){
        if(podaci.prisustva.sedmica>trenutna) trenutna=podaci.prisustva.sedmica;
    }


    let spajaj = false;
    prviRed.append(prvaKolona);
    for(let i = 0; i<16; i++){
        let temp = document.createElement("td");
        if(spajaj==false)temp.className= "tekst";
        else temp.className="spojene-kolone";
        let brojSpojenih = 15-i;
        temp.getElementsByClassName("spojene-kolone").colSpan = brojSpojenih;
        if(spajaj==false){
            if(i==0)temp.innerHTML="Indeks";
            else if(i==1) temp.innerHTML="I";
            else if(i==2) temp.innerHTML="II";
            else if(i==3) temp.innerHTML="III";
            else if(i==4) temp.innerHTML="IV";
            else if(i==5) temp.innerHTML="V";
            else if(i==6) temp.innerHTML="VI";
            else if(i==7) temp.innerHTML="VII";
            else if(i==8) temp.innerHTML="VIII";
            else if(i==9) temp.innerHTML="IX";
            else if(i==10) temp.innerHTML="X";
            else if(i==11) temp.innerHTML="XI";
            else if(i==12) temp.innerHTML="XII";
            else if(i==13) temp.innerHTML="XIII";
            else if(i==14) temp.innerHTML="XIV";
            else if(i==15) temp.innerHTML="XV";
        } else{
            if(i==2){
                temp.innerHTML="II-XV";
                prviRed.appendChild(temp);
                break;
            } 
            else if(i==3){
                temp.innerHTML="III-XV";
                prviRed.appendChild(temp);
                break;
            } 
            else if(i==4){
                temp.innerHTML="IV-XV";
                prviRed.appendChild(temp);
                break;
            } 
            else if(i==5) {
                temp.innerHTML="V-XV";
                prviRed.appendChild(temp);
                break;
            }
            else if(i==6) {
                temp.innerHTML="VI-XV";
                prviRed.appendChild(temp);
                break;
            }
            else if(i==7) {
                temp.innerHTML="VII-XV";
                prviRed.appendChild(temp);
                break;
            }
            else if(i==8) {
                temp.innerHTML="VIII-XV";
                prviRed.appendChild(temp);
                break;
            }
            else if(i==9) {
                temp.innerHTML="IX-XV";
                prviRed.appendChild(temp);
                break;
            }
            else if(i==10) {
                temp.innerHTML="X-XV";
                prviRed.appendChild(temp);
                break;
            }
            else if(i==11) {
                temp.innerHTML="XI-XV";
                prviRed.appendChild(temp);
                break;
            }
            else if(i==12) {
                temp.innerHTML="XII-XV";
                prviRed.appendChild(temp);
                break;
            }
            else if(i==13) {
                temp.innerHTML="XIII-XV";
                prviRed.appendChild(temp);
                break;
            }
            else if(i==14) {
                temp.innerHTML="XIV-XV";
                prviRed.appendChild(temp);
                break;
            }
            else if(i==15) {
                temp.innerHTML="XV";
                prviRed.appendChild(temp);
                break;
            }
        }
        if(i==trenutna) spajaj = true;
        prviRed.appendChild(temp);
    }
    tabela.append(prviRed);
    //mapa u kojoj se čuvaju studenti, imena i broj indeksa
    let studenti = new Map();

    for(let i = 0; i< podaci.studenti.length; i++){
        //console.log(podaci.studenti[i].ime);
        //console.log(podaci.studenti[i].index);
        //studenti.set(podaci.studenti[i].ime, podaci.studenti[i].index);
        

        for(let j = 0; j<podaci.prisustva.length; j++){
            //console.log(podaci.prisustva[j].sedmica);
            //console.log(podaci.prisustva[j].predavanja);
            //console.log(podaci.prisustva[j].vjezbe);
            //console.log(podaci.prisustva[j].index);
        }
    }

    
    //console.log(studenti);

    //let keys = Object.keys(podaci.studenti);
    //console.log(keys);
    

   


    

    divRef.appendChild(tabela);
    
    

    //privatni atributi modula
    //mapaStudenti = new Map();
    //prisustvo = new Set();
    //pojedinacnoPrisustvo = new Set();
    //predmet = new String();


    

    //implementacija metoda
    let sljedecaSedmica = function () {
        if(trenutna==14) throw new console.error("Dosli ste do posljednje sedmice");
        trenutna++;
    }

    let prethodnaSedmica = function () {
        if(trenutna==1) throw new console.error("Na prvoj smo sedmici");
        trenutna--; 
    }
    //šta je fazon sa ovim jel ovo ne može ili 

    return {
        sljedecaSedmica: sljedecaSedmica,
        prethodnaSedmica: prethodnaSedmica
    } 
};
