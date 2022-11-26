let TabelaPrisustvo = function (divRef, podaci) {

    divRef.innerHTML= "";
    if(podaci.length()==0) return;

    let tabela =  document.createElement("table");
    tabela.class = "tabela";
    let prviRed = document.createElement("tr");
    prviRed.class = "prvi-red";
    let prvaKolona = document.createElement("td");
    prvaKolona.class = "prva-kolona";
    prvaKolona.innerHTML = "Ime i prezime";
    //odnosno ostale kolone
    let tekst;
    //trenutna sedmica je posljednja sa prisustvom
    let trenutna=0;
    for(let i = 0; i<podaci.prisustva.length(); i++){
        if(podaci.prisustva.sedmica>max) trenutna=podaci.prisustva.sedmica;
    }
    let spajaj = false;
    tabela.append(prviRed);
    tabela.append(prvaKolona);
    for(let i = 0; i<16; i++){
        let temp = document.createElement("td");
        if(spajaj==false)temp.class= "tekst";
        else temp.class="span";
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
            if(i==2) temp.innerHTML="II-XV";
            else if(i==3) temp.innerHTML="III-XV";
            else if(i==4) temp.innerHTML="IV-XV";
            else if(i==5) temp.innerHTML="V-XV";
            else if(i==6) temp.innerHTML="VI-XV";
            else if(i==7) temp.innerHTML="VII-XV";
            else if(i==8) temp.innerHTML="VIII-XV";
            else if(i==9) temp.innerHTML="IX-XV";
            else if(i==10) temp.innerHTML="X-XV";
            else if(i==11) temp.innerHTML="XI-XV";
            else if(i==12) temp.innerHTML="XII-XV";
            else if(i==13) temp.innerHTML="XIII-XV";
            else if(i==14) temp.innerHTML="XIV-XV";
            else if(i==15) temp.innerHTML="XV";
        }
        if(i==trenutna) spajaj = true;
        tabela.appendChild(temp);
    }

    let studenti = podaci[0];
    let prisustva = podaci[1];
    let predmet = podaci[2];
    let brojPredavanjaSedmicno = podaci[3];
    let brojVjezbiSedmicno = podaci[4];

    for(let i = 0; i<studenti.length(); i++){
        let temp = document.createElement("tr");
        let temp1 = document.createElement("td");
        temp1.innerHTML = studenti[i].ime;
        let temp2 = document.createElement("td");
        temp2.innerHTML = studenti[i].indeks;
        let temp3;
        for(let i=0; i<15; i++){
            let pomocni = document.createElement("td");
            //sada bi trebalo ubacivati zavisi jel popunjeno ili nije
            
        }
    }


    divRef.appendChild(tabela);
    
    

    //privatni atributi modula
    //mapaStudenti = new Map();
    //prisustvo = new Set();
    //pojedinacnoPrisustvo = new Set();
    //predmet = new String();

        for(let object in podaci){
            
        }

    

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
