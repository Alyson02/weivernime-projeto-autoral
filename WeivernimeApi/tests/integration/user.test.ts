import app, { close, init } from "@/app";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import supertest from "supertest";
import { createUser } from "../factories/user";
import { cleanDb, generateValidToken } from "../helpers";

beforeAll(async () => {
    await init();
    await cleanDb()
});

beforeEach(async () => {
    await cleanDb()
});

const server = supertest(app);

describe("POST /signup", () => {

    const generateValidBody = () => ({
        email: faker.internet.email(),
        password: faker.internet.password(6),
        username: faker.name.firstName()
    });

    it("should respond with status 400 when body is not given", async () => {
        const response = await server.post("/signup");

        expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it("should respond with status 400 when body is not valid", async () => {
        const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

        const response = await server.post("/signup").send(invalidBody);

        expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it("should respond with status 409 when there is an user with given email", async () => {
        const body = generateValidBody();
        await createUser(body);

        const response = await server.post("/signup").send(body);

        expect(response.status).toBe(httpStatus.CONFLICT);
    });

    it("should respond with status 201 and create user when given email is unique", async () => {
        const body = generateValidBody();

        const response = await server.post("/signup").send(body);

        expect(response.status).toBe(httpStatus.CREATED);
    });
});

describe("POST /signin", () => {
    it("should respond with status 400 when body is not given", async () => {
        const response = await server.post("/signin");

        expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it("should respond with status 400 when body is not valid", async () => {
        const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

        const response = await server.post("/signin").send(invalidBody);

        expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    describe("when body is valid", () => {
        const generateValidBody = () => ({
            email: faker.internet.email(),
            password: faker.internet.password(6),
        });

        it("should respond with status 401 if there is no user for given email", async () => {
            const body = generateValidBody();

            const response = await server.post("/signin").send(body);

            expect(response.status).toBe(httpStatus.UNAUTHORIZED);
        });

        it("should respond with status 401 if there is a user for given email but password is not correct", async () => {
            const body = generateValidBody();
            await createUser(body);

            const response = await server.post("/signin").send({
                ...body,
                password: faker.lorem.word(),
            });

            expect(response.status).toBe(httpStatus.UNAUTHORIZED);
        });

        describe("when credentials are valid", () => {
            it("should respond with status 200", async () => {
                const body = generateValidBody();
                await createUser(body);

                const response = await server.post("/signin").send(body);

                expect(response.status).toBe(httpStatus.OK);
            });


            it("should respond with session token", async () => {
                const body = generateValidBody();
                await createUser(body);

                const response = await server.post("/signin").send(body);

                expect(response.body.token).toBeDefined();
            });
        });
    });
});

describe("GET /user/:id", () => {

    it("should respond with status 200 and data when userId is valid", async () => {

        const user = await createUser();

        const response = await server.get(`/user/${user.id}`);

        expect(response.status).toBe(httpStatus.OK);
        expect(response.body).toEqual(expect.objectContaining({
            likes: null,
            dislikes: null,
            user: {
                id: expect.any(Number),
                name: expect.any(String),
                email: expect.any(String),
                password: expect.any(String),
                foto: expect.any(String),
                backgroundUrl: null,
                level: 0,
                analises: [],
                personagens: []
            }
        }))

    })

    it("should respond with status 404 and data when userId is not valid", async () => {

        const response = await server.get(`/user/141032`);

        expect(response.status).toBe(httpStatus.NOT_FOUND);

    })

})

describe("POST /addPersonagem", () => {

    const validBody = {
        name: faker.name.firstName(),
        foto: faker.image.imageUrl()
    }

    it("should respond with status 401 if no token is given", async () => {
        const response = await server.post("/changePic");

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it("should respond with status 401 if given token is not valid", async () => {
        const token = faker.lorem.word();

        const response = await server.post("/changePic").set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });


    it("should respond with status 200 when body is valid", async () => {

        const user = await createUser()
        const token = await generateValidToken(user);

        const response = await server.post("/user/addPersonagem").set("Authorization", `Bearer ${token}`).send(validBody);

        expect(response.status).toEqual(httpStatus.OK);
    })

    it("should respond with status 400 when body is not valid", async () => {

        const user = await createUser()
        const token = await generateValidToken(user);

        const response = await server.post("/user/addPersonagem").set("Authorization", `Bearer ${token}`).send({});

        expect(response.status).toEqual(httpStatus.BAD_REQUEST);

    })

})

describe("POST /changePic", () => {

    const validBody = {
        imageUrl: faker.image.imageUrl()
    }

    it("should respond with status 401 if no token is given", async () => {
        const response = await server.post("/changePic");

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it("should respond with status 401 if given token is not valid", async () => {
        const token = faker.lorem.word();

        const response = await server.post("/changePic").set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it("should respond with status 200 when body is valid", async () => {

        const user = await createUser()
        const token = await generateValidToken(user);

        const response = await server.post("/changePic").set("Authorization", `Bearer ${token}`).send(validBody);

        expect(response.status).toEqual(httpStatus.OK);
    })

    it("should respond with status 400 when body is not valid", async () => {

        const user = await createUser()
        const token = await generateValidToken(user);

        const response = await server.post("/changePic").set("Authorization", `Bearer ${token}`).send({});

        expect(response.status).toEqual(httpStatus.BAD_REQUEST);

    })
})


afterAll(async () => {
    await close();
    await cleanDb()
})