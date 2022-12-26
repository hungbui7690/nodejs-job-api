const { StatusCodes } = require('http-status-codes')
const Job = require('../models/Job')
const { BadRequestError, NotFoundError } = require('../errors')
const { findOneAndUpdate } = require('../models/User')
const { findOne } = require('../models/Job')

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

const getJob = async (req, res) => {
  const { id: jobID } = req.params
  console.log(req.params)
  const { userID } = req.user

  const job = await Job.findOne({ _id: jobID, createdBy: userID })

  if (!job) throw new NotFoundError(`There is no jobs with the id ${jobID}`)

  res.status(StatusCodes.OK).json({ job })
}

const createJob = async (req, res) => {
  const { company, position } = req.body

  if (!company || !position) {
    throw new BadRequestError('Please provide company and position')
  }

  const job = await Job.create({
    company,
    position,
    createdBy: req.user.userID,
  })

  if (!job)
    throw new BadRequestError(
      `There is no jobs that associated with user ${req.user.username}`
    )

  res.status(StatusCodes.CREATED).json({ job })
}
const updateJob = async (req, res) => {
  const { id: jobID } = req.params
  const { company, position } = req.body

  if (!company || !position) {
    throw new BadRequestError('Please provide values for company and position')
  }

  const job = await Job.findOneAndUpdate(
    { _id: jobID, createdBy: req.user.userID },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  )

  if (!job) throw new NotFoundError(`There is no jobs with the id ${jobID}`)

  res.status(StatusCodes.OK).json({ msg: { success: true, job } })
}
const deleteJob = async (req, res) => {
  const { id: jobID } = req.params

  const job = await Job.findByIdAndDelete({ _id: jobID })

  if (!job) throw new NotFoundError(`There is no jobs with the id ${jobID}`)

  res.status(StatusCodes.OK).json({ msg: { success: true } })
}

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
}
