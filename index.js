
const express = require("express");
const path = require('path');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 1620;
const { dbConnection } = require("./config/config");
// const getElementsById = require("getelementsbyid");


app.use(express.json());

dbConnection();
//const btn = document.querySelector('#register');
const getData = () => {
    const [name, email, password, age] = getElementsById("name", "email", "password", "age");


    var raw = `{\n    \"name\":\"${name.value}\",\n    \"email\":\"${email.value}\",\n    \"password\":\"${password.value}\",\n    \"age\":${age.value}\n}`;

    var requestOptions = {
    method: 'POST',
    body: raw,
    redirect: 'follow'
    };

    fetch("https://social-media-api-gabriel.herokuapp.com/users/", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

    name.innerHTML = "";
    email.innerHTML = "";
    password.innerHTML = "";
    age.innerHTML = "";

};

//btn.addEventListener(onclick, getData);


app.get('/', function(req, res, next){
    var options = {
        root: path.join(__dirname)
    };
     
    var fileName = '/public/index.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            next(err);
        } else {
            console.log('Sent:', fileName);
        }
    });
});
app.use('/posts',require('./routes/posts'));
app.use('/users',require('./routes/users'));
app.use('/comments',require('./routes/comments'));

app.listen(PORT, console.log(`Server started on port ${PORT}`));