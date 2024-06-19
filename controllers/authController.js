const path = require('path');

let users = []; // Prosta baza danych użytkowników

exports.register = (req, res) => {
    const { username, password } = req.body;
    if (users.find(user => user.username === username)) {
        res.send('Użytkownik już istnieje');
    } else {
        users.push({ username, password });
        res.redirect('/login');
    }
};

exports.login = (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        req.session.user = user;
        res.redirect('/dashboard');
    } else {
        res.send('Nieprawidłowa nazwa użytkownika lub hasło');
    }
};
