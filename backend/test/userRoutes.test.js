const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const USER = mongoose.model("User");
const bcrypt = require("bcrypt");

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NThlY2E4MmVmOGMzMGZlYjA4NjgzM2UiLCJpYXQiOjE3MDQyNjYwMjB9.OaLKE1keWB9JyV2T7nzkcHqK03krs2HylBi10HPCDkU";

// Helper function to create a test user
const createTestUser = async () => {
  const testUser = new USER({
    name: "Test User",
    email: "testuser@example.com",
    password: await bcrypt.hash("testpassword", 12),
    pic: "https://example.com/testpic.png",
  });
  await testUser.save();
  return testUser;
};

describe("GET /allUsers", () => {
  it("should get all users", async () => {
    const response = await request(app)
      .get("/user/")
      .query({ search: "Test" })
      .set("Authorization", "Bearer " + token);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("length");
  });
});

describe("POST /signup", () => {
  it("should create a new user", async () => {
    const response = await request(app).post("/user/signup").send({
      name: "New User",
      email: "newuser@example.com",
      password: "newpassword",
      profilePic: "https://example.com/newuserpic.png",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("savedUser");
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("message", "saved Successfully");
  });

  it("should return an error if required fields are missing", async () => {
    const response = await request(app).post("/user/signup").send({
      name: "Incomplete User",
    });

    expect(response.status).toBe(402);
    expect(response.body).toHaveProperty("error", "Please add all the fields");
  });

  it("should return an error if the user already exists", async () => {
    
    await createTestUser();

    const response = await request(app).post("/user/signup").send({
      name: "Test User",
      email: "testuser@example.com",
      password: "testpassword",
    });

    expect(response.status).toBe(422);
    expect(response.body).toHaveProperty(
      "error",
      "User already exists with that email"
    );
  });
});

describe("POST /login", () => {
  it("should log in a user", async () => {
    // Create a test user
    const testUser = await createTestUser();

    const response = await request(app).post("/user/login").send({
      email: "testuser@example.com",
      password: "testpassword",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("savedUser");
    expect(response.body.savedUser.email).toBe(testUser.email);
  });

  it("should return an error if required fields are missing", async () => {
    const response = await request(app).post("/user/login").send({
      // Missing email and password
    });

    expect(response.status).toBe(402);
    expect(response.body).toHaveProperty("error", "Please add all the fields");
  });

  test("should return an error for invalid email", async () => {
    const response = await request(app).post("/user/login").send({
      email: "nonexistentuser@example.com",
      password: "testpassword",
    });

    expect(response.status).toBe(422);
    expect(response.body).toHaveProperty("error", "Invalid Email");
  });

  test("should return an error for invalid password", async () => {
    // Create a test user
    await createTestUser();

    const response = await request(app).post("/user/login").send({
      email: "testuser@example.com",
      password: "wrongpassword",
    });

    expect(response.status).toBe(422);
    expect(response.body).toHaveProperty("error", "Invalid Password");
  });
});
