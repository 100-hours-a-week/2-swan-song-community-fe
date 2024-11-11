const user = require('../model/user');

const loginSession = [];

const register = (req, res) => {
    const { username, password } = req.body;
    const userFound = user.find(u => u.username === username);
    if (userFound) {
        res.status(400).send('Username already exists');
    } else {
        user.push({ username, password });
        res.send('Register success');
    }
};

const login = (req, res) => {
    const { username, password } = req.body;
    const userFound = user.find(
        u => u.username === username && u.password === password,
    );
    if (userFound) {
        const sessionId = Math.random().toString(36).substring(7);
        loginSession.push({ sessionId, user: userFound });
        res.send({ sessionId });
    } else {
        res.status(401).send('Invalid username or password');
    }
};

const logout = (req, res) => {
    const { sessionId } = req.body;
    const sessionIndex = loginSession.findIndex(s => s.sessionId === sessionId);
    if (sessionIndex !== -1) {
        loginSession.splice(sessionIndex, 1);
        res.send('Logout success');
    } else {
        res.status(401).send('Invalid session');
    }
};

module.exports = { register, login, logout };
