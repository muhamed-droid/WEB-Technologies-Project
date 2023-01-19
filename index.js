
const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const bcrypt = require('bcrypt');
const port = 3000; 

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

app.use(express.static(__dirname + '/public/html'));

app.post('/login', (req, res) => {



    
    let username = req.query.username;
    let password = req.query.password;
   

    // Read the JSON file and check if the entered credentials are in it
    let jsonData = require("./data/nastavnici.json");
    let isValid = jsonData.some(function(user) {
        return user.nastavnik.username === username && user.nastavnik.password_hash === password;
    });

    // Respond with a JSON object indicating if the credentials are valid
    if(isValid){
        res.json({ message: 'Uspješna prijava' });
    } else 
    {
        res.json({message: 'Neuspješna prijava'});
    }
    //res.json({ isValid: isValid });

    /*let username = req.body.username;
    let password = req.body.password;
    fs.readFile('./data/nastavnici.json', 'utf8', (err, data) => {
        if (err) throw err;
        let jsonData = JSON.parse(data);
        if(jsonData.length>0){
            let matchFound=false;
            jsonData.forEach(nastavnik => {
                if (nastavnik.nastavnik.username === username) {
                    bcrypt.compare(password, nastavnik.nastavnik.password_hash, (err, result) => {
                        if (result) {
                            matchFound = true;
                            req.session.username = username;
                            res.json({ message: 'Uspješna prijava' });
                        }
                    });
                }
            });
            if (!matchFound) {
                res.json({ message: 'Neuspješna prijava' });
            }  
        }         
    });*/
});
