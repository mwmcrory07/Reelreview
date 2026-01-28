jest.mock("fs");
const fs = require("fs");

const request = require("supertest");
const app = require("./app");


// This block of code was obtained from https://chatgpt.com/ version - GPT-5.2
beforeEach(() => {
    fs.readFile.mockImplementation((path, cb) => {
        cb(null, JSON.stringify([]));
    });

    fs.writeFileSync.mockImplementation(() => {
    });
});



describe("Test all of the GET methods", () => {
    test("GET /films/all works when called and returns a status code of 200", async () => {
        const response = await request(app).get("/films/all");
        expect(response.status).toBe(200);


    })
    test("GET /reviews/all works when called and returns a status code of 200", async () => {
        const response = await request(app).get("/reviews/all");
        expect(response.status).toBe(200);
    })
    test("GET /reviews/last/:film works when called and returns a status code of 200", async () => {
        const response = await request(app).get("/reviews/last/:film");
        expect(response.status).toBe(200);
    })
})


describe("Test all of the POST methods", () => {
    test("POST /review/new that responds with a correct status code of 201 when valid data is passed", async () => {
        const response = await request(app).post("/review/new").send({
            film : "Hello",
            review : "I loved this film",
            rating : 5
        })
        expect(response.status).toBe(201);
    })
})