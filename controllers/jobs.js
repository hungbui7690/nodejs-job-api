const { StatusCodes } = require('http-status-codes')
const Job = require('../models/Job')
const { BadRequestError, NotFoundError } = require('../errors')

// (1)
const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userID }).sort(
    'createdAt _id'
  )

  if (!jobs)
    throw new BadRequestError(
      `There is no jobs that associated with user ${req.user.username}`
    )

  res.status(StatusCodes.OK).json({ jobs })
}

// (2)
const getJob = async (req, res) => {
  const { id: jobID } = req.params
  console.log(req.params)
  const { userID } = req.user

  const job = await Job.findOne({ _id: jobID, createdBy: userID })

  if (!job) throw new NotFoundError(`There is no jobs with the id ${jobID}`)

  res.status(StatusCodes.OK).json({ job })
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
