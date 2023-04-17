import app, { close, init } from "@/app";
import httpStatus from "http-status";
import supertest from "supertest";
import { createAnalise, createAnaliseInvalidBody, createAnaliseSomeAnimeKey, createAnaliseValidBody, createInvalidBodyLikeOrDislike, createValidBodyLikeOrDislike } from "../factories/analise";
import { createUser } from "../factories/user";
import { cleanDb, generateValidToken } from "../helpers";
import { faker } from "@faker-js/faker";

beforeAll(async () => {
    await init();
    await cleanDb()
});

beforeEach(async () => {
    await cleanDb()
});

const server = supertest(app);

describe("GET /analise", () => {

    it("should respond with status 200 and data", async () => {

        const user = await createUser();
        await createAnalise(user.id);

        const response = await server.get("/analise?page=1&limit=10");

        expect(response.status).toBe(httpStatus.OK);

        expect(response.body).toEqual(expect.arrayContaining([expect.objectContaining({
            id: expect.any(Number),
            animeId: expect.any(Number),
            animeName: expect.any(String),
            userId: expect.any(Number),
            notaGeral: expect.any(Number),
            notaAbertura: expect.any(Number),
            texto: expect.any(String),
            imageUrl: expect.any(String)
        })]));

    });

    it("should respond with 200 ok and data empty if no data in db", async () => {
        const response = await server.get("/analise?page=1&limit=10");



        expect(response.status).toBe(httpStatus.OK);
        expect(response.body).toEqual([]);
    })
});

describe("GET /analise/:id", () => {

    it("should respons with status 200 and data of analise", async () => {

        const user = await createUser();
        const analise = await createAnalise(user.id);

        const response = await server.get("/analise/" + analise.id);

        expect(response.status).toEqual(httpStatus.OK);

        expect(response.body).toEqual(expect.objectContaining({
            texto: expect.any(String),
            imageUrl: expect.any(String),
            animeName: expect.any(String),
            userId: expect.any(Number),
            notaGeral: expect.any(Number),
            notaAbertura: expect.any(Number),
        }));

    });

    it("should respond with status 404 when analise not exists", async () => {

        const response = await server.get("/analise/112020");

        expect(response.status).toEqual(httpStatus.NOT_FOUND);
        expect(response.body).toEqual({ message: expect.any(String) });

    })

});

describe("GET /analise/dados/top5", () => {

    it("should respond with status 200 and data", async () => {

        const user = await createUser();
        await createAnalise(user.id);

        const response = await server.get("/analise/dados/top5");

        expect(response.status).toBe(httpStatus.OK);

        expect(response.body).toEqual(expect.arrayContaining([expect.objectContaining({
            id: expect.any(Number),
            animeId: expect.any(Number),
            animeName: expect.any(String),
            userId: expect.any(Number),
            notaGeral: expect.any(Number),
            notaAbertura: expect.any(Number),
            texto: expect.any(String),
            imageUrl: expect.any(String)
        })]));

    });

    it("should respond with 200 ok and data empty if no data in db", async () => {
        const response = await server.get("/analise/dados/top5");



        expect(response.status).toBe(httpStatus.OK);
        expect(response.body).toEqual([]);
    })
});

describe("GET /analise/dados/top5/anime", () => {

    it("should respond with status 200 and data", async () => {

        const user = await createUser();
        const analise = await createAnalise(user.id);

        const response = await server.get("/analise/dados/top5/anime");

        expect(response.status).toBe(httpStatus.OK);

        expect(response.body).toEqual([expect.any(Number)]);

    });

    it("should respond with 200 ok and data empty if no data in db", async () => {
        const response = await server.get("/analise/dados/top5/anime");



        expect(response.status).toBe(httpStatus.OK);
        expect(response.body).toEqual([]);
    })
});

describe("POST /analise", () => {

    it("should respond with status 401 if no token is given", async () => {
        const response = await server.post("/analise");

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it("should respond with status 401 if given token is not valid", async () => {
        const token = faker.lorem.word();

        const response = await server.post("/analise").set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it("responde with status 201 when body is valid", async () => {

        const user = await createUser()

        const validBody = createAnaliseValidBody();

        const token = await generateValidToken(user);

        const response = await server.post("/analise").set("Authorization", `Bearer ${token}`).send(validBody)

        expect(response.status).toBe(httpStatus.CREATED)

    })

    it("reponsd with status 400 when body is invalid", async () => {

        const user = await createUser()

        const validBody = createAnaliseInvalidBody();

        const token = await generateValidToken(user);

        const response = await server.post("/analise").set("Authorization", `Bearer ${token}`).send(validBody)

        expect(response.status).toBe(httpStatus.BAD_REQUEST)

    })

    it("respond with status 409 when created analise with some key", async () => {

        const user = await createUser()

        const analise = await createAnalise(user.id);

        const duplicateAnalise = createAnaliseSomeAnimeKey(analise.animeId);

        const token = await generateValidToken(user);

        const response = await server.post("/analise").set("Authorization", `Bearer ${token}`).send(duplicateAnalise)

        expect(response.status).toBe(httpStatus.CONFLICT)

    })

})

describe("POST /analise/:id/likeordislike", () => {

    it("should respond with status 401 if no token is given", async () => {
        const response = await server.post("/analise/112020/likeordislike");

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it("should respond with status 401 if given token is not valid", async () => {
        const token = faker.lorem.word();

        const response = await server.post("/analise/112020/likeordislike").set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it("should respond with status 404 when analise not exists", async () => {

        const user = await createUser()
        const token = await generateValidToken(user);

        const response = await server.post("/analise/112020/likeordislike").set("Authorization", `Bearer ${token}`).send(createValidBodyLikeOrDislike());

        expect(response.status).toEqual(httpStatus.NOT_FOUND);
        expect(response.body).toEqual({ message: expect.any(String) });

    })

    it("should respond with status 200 when body is valid", async () => {

        const user = await createUser()
        const token = await generateValidToken(user);
        const analise = await createAnalise(user.id);

        const response = await server.post(`/analise/${analise.id}/likeordislike`).set("Authorization", `Bearer ${token}`).send(createValidBodyLikeOrDislike());

        const code = response.status;

        expect(code).toEqual(httpStatus.OK);

    })

    it("should respond with status 400 when body is not valid", async () => {

        const user = await createUser()
        const token = await generateValidToken(user);
        const analise = await createAnalise(user.id);

        const response = await server.post(`/analise/${analise.id}/likeordislike`).set("Authorization", `Bearer ${token}`).send(createInvalidBodyLikeOrDislike());

        expect(response.status).toEqual(httpStatus.BAD_REQUEST);

    })
});

afterAll(async () => {
    await close();
})