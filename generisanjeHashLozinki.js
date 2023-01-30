const bcrypt = require("bcrypt");
const fs = require("fs");

bcrypt.hash("mmehić", 10, (error, hash) => {
  if (error)
    console.log("GREŠKA!");
  else
    console.log(hash);
});

