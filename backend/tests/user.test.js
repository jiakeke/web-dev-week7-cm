const mongoose = require('mongoose');
const User = require('../models/userModel');
const supertest= require('supertest');
const app = require('../app');
const api=supertest(app);

beforeAll(async()=>{
    await User.deleteMany({});
});


describe("User Routes", () => {
    describe("POST /api/users/signup", () => {
      it("should signup a new user with valid credentials", async () => {
        // Arrange
        const userData1 = {
          name: "Rami",
          username: "helloword",
          password: "R3g5T7#gh",
          phone_number: "09-123-47890",
          gender: "Male",
          date_of_birth: "1999-01-01",
          membership_status: "Active",
          address: "123 Main St",
          profile_picture: "profile.jpg",
        };
  
        const userData = {
            name: "Rami",
            username: "helloword",
            password: "R3g5T7#gh",
            phone_number: "09-123-47890",
            gender: "Male",
            date_of_birth: "1999-01-01",
            membership_status: "Active",
            address: "123 Main St",
            profile_picture: "profile.jpg",
        };
  
        // Act
        const result = await api.post("/api/users/signup").send(userData);
  
        console.log(result.body.token);
  
        // Assert
        expect(result.status).toBe(201);
        expect(result.body).toHaveProperty("token");
      });
      it("should not signup a new user with invalid credentials", async () => {
        const userData={
          name: "Rami",
          email1: "  ",  
          password: "R3g5T7#gh",
          phone_number: "09-123-47890",
          gender: "Male",
          date_of_birth: "1999-01-01",
          membership_status: "Active",
  
        }
        // Act
        const result = await api.post("/api/users/signup").send(userData);
  
        
  
        // Assert
        expect(result.status).toBe(400);
       
      });
    });
  
    describe("POST /api/users/login", () => {
      it("should login a user with valid credentials", async () => {
        // Arrange
        const userData = {
          username: "helloword",
          password: "R3g5T7#gh",
        };
  
        // Act
        const result = await api.post("/api/users/login").send(userData);
  
        // Assert
        expect(result.status).toBe(200);
        expect(result.body).toHaveProperty("token");
      });
  
      it("should return an error with invalid credentials", async () => {
        // Arrange
        const userDatawrongpd = {
            username: "helloword",
          password: "R3g5T7#ghddd",
        };
  
        // Act
        const result = await api.post("/api/users/login").send(userDatawrongpd);
  
        // Assert
        expect(result.status).toBe(400);
        
      });
    });
  });
  
  afterAll(() => {
    mongoose.connection.close();
  });
  