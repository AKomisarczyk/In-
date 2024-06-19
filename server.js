const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const authController = require('./controllers/authController');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Ustawienia sesji
app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Użyj secure: true, jeśli używasz HTTPS
}));

// Middleware do sprawdzania czy użytkownik jest zalogowany
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
};

// Trasy
app.get('/', (req, res) => {
    res.redirect('/login');
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

app.post('/register', authController.register);
app.post('/login', authController.login);

app.get('/dashboard', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
});

app.get('/history', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'history.html'));
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

// Nasłuchiwanie na porcie 3000
app.listen(port, () => {
    console.log(`Serwer uruchomiony na http://localhost:${port}`);
});
