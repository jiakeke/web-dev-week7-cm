const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("./app-test"); // Your Express app
const api = supertest(app);
const Job = require("../models/jobModel");

const jobs = [
  {
    title: "Software Engineer",
    type: "Full-time",
    description: "Develop and maintain software applications.",
    company: {
      name: "Tech Company",
      contactEmail: "hr@techcompany.com",
      contactPhone: "123-456-7890"
    },
    location: "Remote",
    salary: 120000,
    status: "open"
  },
  {
    title: "Data Scientist",
    type: "Full-time",
    description: "Analyze and interpret complex data to help companies make decisions.",
    company: {
      name: "Data Insights",
      contactEmail: "jobs@datainsights.com",
      contactPhone: "987-654-3210"
    },
    location: "New York, NY",
    salary: 130000,
    status: "open"
  }
];

describe('Job Controllers', () => {
  let jobId;

  beforeEach(async () => {
    await Job.deleteMany({});
    const insertedJobs = await Job.insertMany(jobs);
    jobId = insertedJobs[0]._id;
  });

  afterAll(async () => {
    await Job.deleteMany({});
    await mongoose.connection.close();
  });

  it('should create a new job', async () => {
    const res = await api
      .post('/api/jobs')
      .send({
        title: 'Software Engineer',
        type: 'Full-time',
        description: 'Develop and maintain software applications.',
        company: {
          name: 'Tech Company',
          contactEmail: 'hr@techcompany.com',
          contactPhone: '123-456-7890'
        },
        location: 'Remote',
        salary: 120000,
        status: 'open'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    jobId = res.body._id;
  });

  it('should get all jobs', async () => {
    const res = await api.get('/api/jobs');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should get a job by ID', async () => {
    const res = await api.get(`/api/jobs/${jobId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id', jobId.toString());
  });

  it('should update a job by ID', async () => {
    const res = await api
      .put(`/api/jobs/${jobId}`)
      .send({
        title: 'Senior Software Engineer'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title', 'Senior Software Engineer');
  });

  it('should delete a job by ID', async () => {
    const res = await api.delete(`/api/jobs/${jobId}`);
    expect(res.statusCode).toEqual(204);
  });
});