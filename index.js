
const express = require('express');
const path = require('path');
const app = express();


app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

app.use(express.static(__dirname + '/public/html'));






 
