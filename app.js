const express = require('express');
const app = express();
const path = require('path');
const { Doctor, InsuranceAgent, User } = require('./schema'); // import the models

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/doctor-info', (req, res) => {
    res.render('doctor-info', { username: req.query.username });
});

app.get('/insurance-info', (req, res) => {
    res.render('insurance-info', { username: req.query.username });
});

app.post('/signup', async (req, res) => {
    const { username, password, category } = req.body;
    console.log(username);
    let flag = false;
    if (category === "doctor") {
        const doctor = new Doctor({ name: username });
        await doctor.save();
        flag = true;
    }
    else {
        const insuranceAgent = new InsuranceAgent({ name: username });
        await insuranceAgent.save();
    }
    if (flag) {
        const user = new User({ username, password, isDoctor: true, isInsuranceAgent: false });
        await user.save();
        res.redirect(`/doctor-info?username=${username}`);
    }
    else {
        const user = new User({ username, password, isDoctor: false, isInsuranceAgent: true });
        await user.save();
        res.redirect(`/insurance-info?username=${username}`);
    }
})

app.listen(3000, () => {
    console.log('Listening');
})