const express = require('express');
const session = require('express-session');


const PORT = process.env.PORT || '8080';


let app = express();

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/" + "index.html");
})

app.get('/profile', (req, res) => {
    res.sendFile(__dirname + "/public/" + "profile.html");
})

app.get('/profile/image', (req, res) => {
    res.set({'Content-Type': 'image/png'});
    if (req.session.loggedin) {
        res.send()
    } else {
        res.sendFile(__dirname + "/public/" + "imgs/user.png");
    }
})

let server = app.listen(PORT, function () {
    let host = server.address().address
    let port = server.address().port

    console.log("App listening at http://%s:%s", host, port)
})