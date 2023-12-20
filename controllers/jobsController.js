import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";
import mongoose from "mongoose";
import moment from "moment";

const createJob = async (req, res) => {
  const { position, company } = req.body;

  if (!position || !company) {
    throw new BadRequestError("Please provide all values");
  }
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

const getJobById = async (req, res) => {
  const jobId = req.params.id;
  const job = await Job.findById(jobId).populate("createdBy");

  if (!job) {
    throw new BadRequestError("job not found");
  }

  res.status(StatusCodes.ACCEPTED).json({ job: job, success: true });
};

const getAllJobs = async (req, res) => {
  const { status, jobType, sort, search } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };

  if (status && status !== "all") {
    queryObject.status = status;
  }
  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType;
  }
  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }

  let result = Job.find(queryObject).populate("createdBy");

  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("position");
  }
  if (sort === "z-a") {
    result = result.sort("-position");
  }

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const jobs = await result;

  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);

  res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages });
};

const updateJob = async (req, res) => {
  const { id: jobId } = req.params;
  const { company, position } = req.body;

  if (!position || !company) {
    throw new BadRequestError("Please provide all values");
  }
  const job = await Job.findOne({ _id: jobId });

  if (!job) {
    throw new NotFoundError(`No job with id :${jobId}`);
  }

  checkPermissions(req.user, job.createdBy);

  const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ updatedJob });
};

const deleteJob = async (req, res) => {
  const { id: jobId } = req.params;

  const job = await Job.findOne({ _id: jobId });

  if (!job) {
    throw new NotFoundError(`No job with id :${jobId}`);
  }

  checkPermissions(req.user, job.createdBy);

  await job.deleteOne();

  res.status(StatusCodes.OK).json({ msg: "Success! Job removed" });
};

const showStats = async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.user.userId);

  // console.log("userId", userId);

  const stats = await Job.aggregate([
    {
      $match: {
        createdBy: userId,
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  // console.log("stats", stats);

  const statsObject = stats.reduce((acc, { _id: status, count }) => {
    acc[status] = count;
    return acc;
  }, {});

  // console.log("statsObject", statsObject);

  const defaultStats = {
    pending: statsObject.pending || 0,
    interview: statsObject.interview || 0,
    declined: statsObject.declined || 0,
  };

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: userId } },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);

  monthlyApplications = monthlyApplications.map((item) => {
    const {
      _id: { year, month },
      count,
    } = item;
    const formattedDate = moment()
      .month(month - 1)
      .year(year)
      .format("MMM YYYY");
    return { formattedDate, count };
  });

  // console.log("Monthly Applications:", monthlyApplications);

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};

export { createJob, getJobById, deleteJob, getAllJobs, updateJob, showStats };
