const { StatusCodes } = require('http-status-codes')
const Job = require('../models/Job')

const getAllJobs = async (req, res) => {
  console.log(req.user)
  const jobs = await Job.find({})
  res.status(StatusCodes.OK).json({ jobs })
}

const getJob = async (req, res) => {
  res.send('Get Job')
}
const createJob = async (req, res) => {
  console.log(req.user)
  res.send('Create Job')
}
const updateJob = async (req, res) => {
  res.send('Update Job')
}
const deleteJob = async (req, res) => {
  res.send('Delete Job')
}

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
}
