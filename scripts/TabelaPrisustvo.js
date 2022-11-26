let TabelaPrisustvo = function (divRef, podaci) {

    divRef.innerHTML= "";
    

    let tabela =  document.createElement("table");
    tabela.class = "tabela";
    let prviRed = document.createElement("tr");
    prviRed.class = "prvi-red";
    let prvaKolona = document.createElement("td");
    prvaKolona.class = "prva-kolona";
    prvaKolona.innerHTML = "Ime i prezime";
    //odnosno ostale kolone
    let tekst;
    let trenutna = 1;
    let spajaj = false;
    tabela.append(prviRed);
    tabela.append(prvaKolona);
    for(let i = 0; i<16; i++){
        let temp = document.createElement("td");
        temp.class= "tekst";
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
        tabela.appendChile(temp);
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
