const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/demo-project', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Mongo Connection Open");
    })
    .catch(err => {
        console.log("Error");
        console.log(err);
    })

const doctorSchema = new mongoose.Schema({
    name: String
})

const Doctor = mongoose.model('Doctor', doctorSchema);

// Doctor.insertMany([
//     { name: 'ramesh' },
//     { name: 'suresh' },
//     { name: 'jignesh' }
// ])

const insuranceAgentSchema = new mongoose.Schema({
    name: String
})

const InsuranceAgent = mongoose.model('InsuranceAgent', insuranceAgentSchema);

// InsuranceAgent.insertMany([
//     { name: 'lokesh' },
//     { name: 'manoj' },
//     { name: 'rajesh' }
// ])

let doctorIds;
async function getDoctorIds() {
    try {
        const doctors = await Doctor.find({}, '_id');
        doctorIds = doctors.map(doctor => doctor._id.toString());
    } catch (err) {
        console.log(err);
    }
}

let insuranceAgentIds;
async function getInsuranceAgentIds() {
    try {
        const insuranceAgents = await InsuranceAgent.find({}, '_id');
        insuranceAgentIds = insuranceAgents.map(i => i._id.toString());
    } catch (err) {
        console.log(err);
    }
}

async function getRandomDoctorId() {
    await getDoctorIds();
    return doctorIds[Math.floor(Math.random() * doctorIds.length)];
}

async function getRandomInsuranceAgentId() {
    await getInsuranceAgentIds();
    return insuranceAgentIds[Math.floor(Math.random() * insuranceAgentIds.length)]
}

const patientSchema = mongoose.Schema({
    name: String,
    doctorId: String,
    insuranceAgentId: String,
    claimAmount: Number
});

const Patient = mongoose.model('Patient', patientSchema);


// async function insertPatients() {
//     const patients = [
//         { name: 'Rahul', doctorId: await getRandomDoctorId(), insuranceAgentId: await getRandomInsuranceAgentId(), claimAmount: 400012 },
//         { name: 'Mehul', doctorId: await getRandomDoctorId(), insuranceAgentId: await getRandomInsuranceAgentId(), claimAmount: 2100021 },
//         { name: 'Shashwat', doctorId: await getRandomDoctorId(), insuranceAgentId: await getRandomInsuranceAgentId(), claimAmount: 112400 },
//         { name: 'Govind', doctorId: await getRandomDoctorId(), insuranceAgentId: await getRandomInsuranceAgentId(), claimAmount: 652400 },
//         { name: 'Naman', doctorId: await getRandomDoctorId(), insuranceAgentId: await getRandomInsuranceAgentId(), claimAmount: 240054 },
//         { name: 'Saket', doctorId: await getRandomDoctorId(), insuranceAgentId: await getRandomInsuranceAgentId(), claimAmount: 240076 },
//         { name: 'Varun', doctorId: await getRandomDoctorId(), insuranceAgentId: await getRandomInsuranceAgentId(), claimAmount: 241200 },
//         { name: 'Nishant', doctorId: await getRandomDoctorId(), insuranceAgentId: await getRandomInsuranceAgentId(), claimAmount: 249800 },
//         { name: 'Yatharth', doctorId: await getRandomDoctorId(), insuranceAgentId: await getRandomInsuranceAgentId(), claimAmount: 524090 }
//     ];
//     await Patient.insertMany(patients);
// }

// insertPatients();

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    Isdoctor: Boolean,
    IsinsuranceAgent: Boolean,
})

const User = mongoose.model('User', userSchema);

module.exports = { Doctor, InsuranceAgent, User }