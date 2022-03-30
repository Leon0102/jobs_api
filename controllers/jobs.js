const Job = require('../models/Job');
const {StatusCodes} = require('http-status-codes');
const {BadRequestError,NotFoundError} = require('../errors');

const getAllJobs = async(req, res, next) => {
    const jobs = await Job.find({createdBy:req.user.userId}).sort('createdAt');
    res.status(StatusCodes.OK).json({jobs,count:jobs.length});
}

const getJob = async(req, res, next) => {
    const {user:{userId},params:{id:jobId}} = req;

    const job = await Job.findOne({_id:jobId,createdBy:userId});
    if(!job) throw new NotFoundError(`Job not found with id ${jobId}`);
    res.status(StatusCodes.OK).json({job});
}

const createJob = async(req, res, next) => {
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({job})
}

const updateJob = async(req, res, next) => {
    const {
        body:{company,position},
        user:{userId},
        params:{id:jobId}
    } = req;

    if(!company || !position) throw new BadRequestError('Company and Position are required');

    const job = await Job.findOneAndUpdate({_id:jobId,createdBy:userId},{company,position},{new:true,runValidators:true});
    if(!job) throw new NotFoundError(`Job not found with id ${jobId}`);
    res.status(StatusCodes.OK).json({job});
}

const deleteJob = async(req, res, next) => {
     const {
        user:{userId},
        params:{id:jobId}
    } = req;
    const job = await Job.findOneAndDelete({_id:jobId,createdBy:userId});
    if(!job) throw new NotFoundError(`Job not found with id ${jobId}`);
    res.status(StatusCodes.OK).send(`Job ${jobId} deleted successfully`);
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}