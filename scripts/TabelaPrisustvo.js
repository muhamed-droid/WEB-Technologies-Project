export let TabelaPrisustvo = function (divRef, podaci) {
    
    divRef.innerHTML="";
    if(podaci.length==0) return;

    //validacija podataka

    //Broj prisustva na predavanju/vježbi je veći od broja predavanja/vježbi sedmično
    //Broj prisustva je manji od nule
    for(let i=0; i<podaci.prisustva.length; i++){
        if(podaci.prisustva[i].predavanja>podaci.brojPredavanjaSedmicno
          || podaci.prisustva[i].vjezbe>podaci.brojVjezbiSedmicno
          || podaci.prisustva[i].predavanja<0 
          || podaci.prisustva[i].vjezbe<0){
            divRef.innerHTML="Podaci o prisustvu nisu validni!";
            return;
          } 
    }

    //Isti student ima dva ili više unosa prisustva za istu sedmicu

    //Postoje dva ili više studenata sa istim indeksom u listi studenata
  


    //Postoji prisustvo za studenta koji nije u listi studenata


    //Postoji sedmica, između dvije sedmice za koje je uneseno prisustvo bar jednom studentu,
    //u kojoj nema unesenog prisustva. Npr. uneseno je prisustvo za sedmice 1 i 3 ali nijedan
    //student nema prisustvo za sedmicu 2




    //validacija podataka

    //Broj prisustva na predavanju/vježbi je veći od broja predavanja/vježbi sedmično
    //Broj prisustva je manji od nule
    for(let i=0; i<podaci.prisustva.length; i++){
        if(podaci.prisustva[i].predavanja>podaci.brojPredavanjaSedmicno
          || podaci.prisustva[i].vjezbe>podaci.brojVjezbiSedmicno
          || podaci.prisustva[i].predavanja<0 
          || podaci.prisustva[i].vjezbe<0){
            divRef.innerHTML="Podaci o prisustvu nisu validni!";
            return;
          } 
    }

    //Isti student ima dva ili više unosa prisustva za istu sedmicu
    let listaIndeksa = new Set();
    for(let i = 0; i<podaci.prisustva.length; i++){
        if(listaIndeksa.has(podaci.prisustva[i].index)) {
            divRef.innerHTML="Podaci o prisustvu nisu validni!";
            return;
        }
        listaIndeksa.add(podaci.prisustva[i].index);
    }

    //Postoje dva ili više studenata sa istim indeksom u listi studenata
    listaIndeksa = new Set();
    for(let i=0; i<podaci.studenti.length; i++){
        if(listaIndeksa.has(podaci.studenti[i].index)){
            divRef.innerHTML="Podaci o prisustvu nisu validni!";
            return;
        }
        listaIndeksa.add(podaci.studenti[i].index);
    }


    //Postoji prisustvo za studenta koji nije u listi studenata
    for(let i=0; i<podaci.prisustva.length; i++){
        if(!listaIndeksa.has(podaci.prisustva[i].index)){
            divRef.innerHTML="Podaci o prisustvu nisu validni!";
            return;
        }
    }

    //Postoji sedmica, između dvije sedmice za koje je uneseno prisustvo bar jednom studentu,
    //u kojoj nema unesenog prisustva. Npr. uneseno je prisustvo za sedmice 1 i 3 ali nijedan
    //student nema prisustvo za sedmicu 2

    let sedmice = new Set();
    for(let i=0; i<podaci.prisustva.length; i++){
        if(!sedmice.has(podaci.prisustva[i].sedmica)){
            sedmice.add(podaci.prisustva[i].sedmica);
        }
    }
    sedmice = Array.from(new Set(sedmice)).sort();
    //console.log("Sedmice" + sedmice);
    for(let i = 0; i<sedmice.length; i++){
        if(sedmice[i+1]-sedmice[i]>1) {
            divRef.innerHTML="Podaci o prisustvu nisu validni!";
            return;
        }
    }





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

    for(let i = 0; i< podaci.studenti.length; i++){
        console.log(podaci.studenti[i].ime);
        console.log(podaci.studenti[i].index);
        console.log(podaci.studenti[i].ime);
        console.log(podaci.studenti[i].index);
        //studenti.set(podaci.studenti[i].ime, podaci.studenti[i].index);
        let Red = document.createElement("tr");
        spajaj=false;
        for(let j = 0; j<17; j++){
            let kolona = document.createElement("td");
            if(spajaj==false && j!=trenutna+1) kolona.className= "tekst";
            else if(j==trenutna+1) kolona.className="tekuca";
            else if(j!=16) kolona.className="span";
            if(spajaj==false){
                if(j==0) kolona.innerHTML= podaci.studenti[i].ime;
                else if(j==1) kolona.innerHTML=podaci.studenti[i].index;
                if(j>=2 && j==trenutna+1){
                    let malaTabela = document.createElement("table");
                    malaTabela.className="mala-tabela";
                    malaTabela.id="t2";
                    let redMaleTabele1 = document.createElement("tr");
                    redMaleTabele1.className = "red-male-tabele";
                    for(let k=0; k<podaci.brojPredavanjaSedmicno; k++){
                        let k = document.createElement("td");
                        //Ovdje mi broj kad dodam ne može trebalo bi k+1
                        k.innerHTML = "P<br>";
                        redMaleTabele1.append(k);
                    }
                    for(let k =0; k<podaci.brojVjezbiSedmicno; k++){
                        let k = document.createElement("td");
                        k.innerHTML = "V<br>";
                        redMaleTabele1.append(k);
                    }


                    let redMaleTabele2 = document.createElement("tr");
                    redMaleTabele2.className = "red-male-tabele";
                 
                    for(let k=0; k<podaci.prisustva.length; k++){
                        if(podaci.prisustva[k].index==podaci.studenti[i].index &&
                            podaci.prisustva[k].sedmica==j-1) {
                                 //trebamo obojit tabelu nekako - treba posmatrat prisustva
                                for(let t=0; t<podaci.prisustva.predavanja; t++){
                                    let k = document.createElement("td");
                                    k.className="zelena";
                                    redMaleTabele2.append(k);
                                }
                                for(let t=podaci.prisustva.predavanja; t<podaci.brojPredavanjaSedmicno; t++){
                                    let k = document.createElement("td");
                                    k.className="crvena";
                                    redMaleTabele2.append(k);
                                }
                                for(let t=0; t<podaci.prisustva.vjezbe; t++){
                                    let k = document.createElement("td");
                                    k.className="zelena";
                                    redMaleTabele2.append(k);
                                }
                                for(let t=podaci.prisustva.vjezbe; t<podaci.brojVjezbiSedmicno; t++){
                                    let k = document.createElement("td");
                                    k.className="crvena";
                                    redMaleTabele2.append(k);
                                }
                             }
                    }

                    malaTabela.append(redMaleTabele1);
                    malaTabela.append(redMaleTabele2);
                    kolona.append(malaTabela);
                }    
            } else{
                /*if(j>=2 && j!=trenutna+1){
                    let procenat = 0;
                    for(let k = 0; k <podaci.prisustva.length; k++){
                        if(podaci.prisustva[k].sedmica==j-2 && podaci.studenti[i].index==podaci.prisustva[k].index){
                            let temp = 100*((podaci.prisustva[i].predavanja+podaci.prisustva[i].vjezbe)
                            /(podaci.brojPredavanjaSedmicno+podaci.brojVjezbiSedmicno).toFixed(2));
                            procenat=parseFloat(temp);
                            break;
                        }
                    }
                    kolona.innerHTML= procenat + "%";
                    Red.appendChild(kolona);
                    break;
                } */
            }
            if(j==trenutna+1) {
                //treba iscrtavat ona crvena i zelena polja
                spajaj = true;
            }
            Red.appendChild(kolona);
        }

        tabela.appendChild(Red);

        
    }

    divRef.appendChild(tabela);

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
}
