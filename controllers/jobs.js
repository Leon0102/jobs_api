
const getAllJobs = async(req, res, next) => {
    res.send('get All Jobs');
}

const getJob = async(req, res, next) => {
    res.send('get Job');
}

const createJob = async(req, res, next) => {
    res.send('creat Job');
}

const updateJob = async(req, res, next) => {
    res.send('update Job');
}

const deleteJob = async(req, res, next) => {
    res.send('delete Job');
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}