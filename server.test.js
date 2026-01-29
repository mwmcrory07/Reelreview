jest.mock("fs");
const fs = require("fs");

const request = require("supertest");
const app = require("./app");


// This block of code was obtained from https://chatgpt.com/ version - GPT-5.2
beforeEach(() => {
    fs.readFile.mockImplementation((path, cb) => {
        cb(null, JSON.stringify([{"title":"Interstellar","image":"https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg","director":"Christopher Nolan","average_rating":3,"img_src":"Wikimedia Commons / Wikipedia"},{"title":"Inception","image":"https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg","director":"Christopher Nolan","average_rating":3,"img_src":"Wikimedia Commons / Wikipedia"}]))
    });

    fs.writeFileSync.mockImplementation(() => {
    });
});






describe("Test all of the GET methods", () => {
    test("GET /films/all works when called and returns a status code of 200", async () => {
        request(app).get("/films/all").expect(200);


    })
    test("GET /reviews/all works when called and returns a status code of 200", async () => {
        request(app).get("/reviews/all").expect(200);
    })
    test("GET /reviews/last/:film works when called and returns a status code of 200", async () => {
        request(app).get("/reviews/last/Christopher_Nolan").expect(200);
    })
}
)



describe("Test all of the POST methods", () => {
    test("POST /review/new that responds with a correct status code of 201 when valid data is passed", async () => {
        const response = await request(app).post("/review/new").send({
            film : "Hello",
            review : "I loved this film",
            rating : 5
        });
        expect(response.status).toBe(201);
    })
    test("POST /review/new that responds with a status code 400 when invalid data is passed (rating out of range)", async () => {
        const response = await request(app).post("/review/new").send({
            film : "Hello",
            review : "I loved this film",
            rating : 10
        });
        expect(response.status).toBe(400);
    })
    test("POST /review/new that responds with a status code 400 when invalid data is passed (review not a valid option)", async () => {
        const response = await request(app).post("/review/new").send({
            film : "Hello",
            review : "I loved this film .. ",
            rating : 5
        });
        expect(response.status).toBe(400);
    })
    test("POST /review/new that responds with a status code 400 when invalid data is passed (review not a valid option)", async () => {
        const response = await request(app).post("/review/new").send({
            film : "Hello",
            review : "I loved this film .. ",
            rating : 5
        });
        expect(response.status).toBe(400);
    })

        
    test("POST /film/new that responds with a status code 201 when valid data is passed ()", async () => {
        const response = await request(app).post("/films/new").send({
        title:"The Prestige",
        image:"https://upload.wikimedia.org/wikipedia/en/d/d2/Prestige_poster.jpg",
        director:"Christopher Nolan",
        average_rating:0,
        img_src:"Wikimedia Commons / Wikipedia"
        });
        expect(response.status).toBe(201);
    })

    test("POST /film/new that responds with a status code 400 when invalid data is passed (Not a URL is passed for image)", async () => {
        const response = await request(app).post("/films/new").send({
        title:"The Prestige",
        image:"Not sure",
        director:"Christopher Nolan",
        average_rating:0,
        img_src:"Wikimedia Commons / Wikipedia"
        });
        expect(response.status).toBe(400);
    })
    test("POST /film/new that responds with a status code 400 when invalid data is passed (Average rating not between 0 and 5)", async () => {
        const response = await request(app).post("/films/new").send({
        title:"The Prestige",
        image:"https://upload.wikimedia.org/wikipedia/en/d/d2/Prestige_poster.jpg",
        director:"Christopher Nolan",
        average_rating:20,
        img_src:"Wikimedia Commons / Wikipedia"
        });
        expect(response.status).toBe(400);
    })

    test("POST /films/update that responds with a status code 200 when valid data is passed", async () => {
        const response = await request(app).post("/films/update").send({
        title:"Inception",
        average_rating:5,
        });
        expect(response.status).toBe(200);
    })
    test("POST /films/update that responds with a status code 400 when invalid data is passed (film not in films)", async () => {
        const response = await request(app).post("/films/update").send({
        title:"dfdgrgergre",
        average_rating:5,
        });
        expect(response.status).toBe(400);
    })
    test("POST /films/update that responds with a status code 400 when invalid data is passed (average rating not in range)", async () => {
        const response = await request(app).post("/films/update").send({
        title:"Interstellar",
        average_rating:20,
        });
        expect(response.status).toBe(400);
    })

})