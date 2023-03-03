const request = require("supertest");
const baseURL = "http://localhost:3000";

let token = "";
describe("Sign up a new user ", () => {
  const newUser = {
    email: "test_user@test.com",
    password: "123456",
  };

  it("should return 201", async () => {
    const response = await request(baseURL)
      .post("/api/v1/signup")
      .send(newUser);
    // console.log(response._body.name);
    if (response._body.name === "SequelizeUniqueConstraintError") {
      expect(response.statusCode).toBe(500);
    } else {
      expect(response.statusCode).toBe(201);
    }
  });
});

describe("Sign in a user ", () => {
  const user = {
    email: "test_user@test.com",
    password: "123456",
  };

  it("should return 201", async () => {
    const response = await request(baseURL).post("/api/v1/signin").send(user);
    //   console.log(response._body.token);
    expect(response.statusCode).toBe(201);
  });
});

describe("Note controller", () => {
  const note = {
    name: "test note",
    description: "test description",
  };
  const editedNote = {
    name: "Editting test note",
    description: "Editting test description",
  };
  const user = {
    email: "test_user@test.com",
    password: "123456",
  };
  let id = "";
  beforeAll(async () => {
    const response = await request(baseURL).post("/api/v1/signin").send(user);
    token = response._body.token;
  });

  it("Get all note with status is NotStarted", async () => {
    const response = await request(baseURL).get(
      `/api/v1/todos??status=NotStarted`
    );
    expect(response.statusCode).toBe(200);
  });

  it("Create a note", async () => {
    const response = await request(baseURL)
      .post("/api/v1/todos")
      .set("Authorization", `Bearer ${token}`)
      .send(note);
    //   console.log(response._body);
    id = response._body.id;
    expect(response.statusCode).toBe(201);
  });

  it("Update a note", async () => {
    const response = await request(baseURL)
      .put(`/api/v1/todos/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(editedNote);
    expect(response.statusCode).toBe(201);
  });
  it("Delete a note", async () => {
    const response = await request(baseURL)
      .delete(`/api/v1/todos/${id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
  });
});
