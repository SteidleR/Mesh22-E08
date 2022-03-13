const express = require('express');
const session = require('express-session');
const fs = require('fs');

// ----------------------------------------------------------------------
// some data that should not be stored here ;)

// should be in database
let user_id_map = {
    "test@test": 1
}

// could also be stored in database
let weekly_challenge = [
    ["fa-solid fa-video", "participate in a Keynote"],
    ["fa-solid fa-brain", "take a quiz"],
    ["fa-solid fa-cake-candles", "Celebrate your progress"]
]

// ----------------------------------------------------------------------

const PORT = process.env.PORT || '8080';

let app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

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
    if (req.session.loggedin) {
        res.sendFile(__dirname + "/views/" + "profile.html");
    } else {
        res.redirect("/");
    }
})

app.get('/profile/image', (req, res) => {
    res.set({'Content-Type': 'image/png'});
    if (req.session.loggedin) {
        let uid = user_id_map[req.session.email]
        res.sendFile(__dirname + "/data/user/" + uid + "/profile-img.png");
    } else {
        res.sendFile(__dirname + "/public/" + "imgs/user.png");
    }
})

app.get('/login', (req, res) => {
    res.sendFile(__dirname + "/views/" + "login.html");
})

app.get("/challenges/weekly", (req, res) => {
    res.send(JSON.stringify(Object.assign({}, weekly_challenge)));
})

app.get("/learning/", (req, res) => {
    res.sendFile(__dirname + "/views/"  + "learning.html");
})

app.get("/learning/:learning_id", (req, res) => {
    let learning_id = req.params.learning_id;

    try {
        const data_raw = fs.readFileSync(__dirname + "/data/learning/" + learning_id + "/data.json");

        res.render(__dirname + "/views/"  + "learning.html", {data: data_raw, id: learning_id});

    } catch (err) {
        console.log(err)
        res.sendStatus(404)
    }
})

app.get("/learning/:learning_id/icon", (req, res) => {
    let learning_id = req.params.learning_id;

    res.sendFile(__dirname + "/data/learning/" + learning_id + "/icon.png");
})

app.get("/learning/:learning_id/content/:content_id", (req, res) => {
    let learning_id = req.params.learning_id;
    let content_id =  req.params.content_id;

    res.sendFile(__dirname + "/data/learning/" + learning_id + "/content/" + content_id);
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