const express = require('express');
const session = require('express-session');

const PORT = process.env.PORT || '8080';


let app = express();

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
    if (req.session.loggedin) {
        res.sendFile(__dirname + "/views/" + "home.html");
    } else {
        res.sendFile(__dirname + "/views/" + "index.html");
    }
})

app.get('/profile', (req, res) => {
    res.sendFile(__dirname + "/views/" + "profile.html");
})

app.get('/profile/image', (req, res) => {
    res.set({'Content-Type': 'image/png'});
    if (req.session.loggedin) {
        res.send()
    } else {
        res.sendFile(__dirname + "/public/" + "imgs/user.png");
    }
})

app.get('/login', (req, res) => {
    res.sendFile(__dirname + "/views/" + "login.html");
})

app.get("/node_modules/@ibm/plex/scss/ibm-plex.scss", (req, res) => {
    res.sendFile(__dirname + "/node_modules/@ibm/plex/scss/ibm-plex.scss");
})

app.post("/auth", (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (email && password) {
        if (email === "test@test" && password === "test") {
            req.session.loggedin = true;
            req.session.email = email;
            res.redirect("/")
        } else {
            res.send("Incorrect Email and/or Password!");
        }
        res.end()
    } else {
        res.send('Please enter Email and Password!');
        res.end();
    }
})

let server = app.listen(PORT, function () {
    let host = server.address().address
    let port = server.address().port

    console.log("App listening at http://%s:%s", host, port)
})