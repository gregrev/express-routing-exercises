process.env.NODE_ENV = 'test';

const request = require("supertest");
const app = require("./app");


describe("GET /mean", () => {
    test('calculate the mean', async () => {
        const res = await request(app).get('/mean?numbers=1,2,3');
        expect(res.statusCode).toBe(200);
        expect(res.body.response.operation).toEqual('mean');
        expect(res.body.response.value).toEqual(2);
    })
    test('test invalid number', async () => {
        const res = await request(app).get('/mean?numbers=1,2,3,5,Ggggg');
        expect(res.statusCode).toBe(400);
        expect(res.body.operation).toEqual('mean');
        expect(res.body.error).toEqual('Invalid numbers provided');
    })
})

describe("GET /median", () => {
    test('calculate the median', async () => {
        const res = await request(app).get('/median?numbers=1,2,3,5,6');
        expect(res.statusCode).toBe(200);
        expect(res.body.response.operation).toEqual('median');
        expect(res.body.response.value).toEqual(3);
    })
    test('test invalid number', async () => {
        const res = await request(app).get('/median?numbers=1,2,3,5,G');
        expect(res.statusCode).toBe(400);
        expect(res.body.operation).toEqual('median');
        expect(res.body.error).toEqual('Invalid numbers provided');
    })
})


describe("GET /mode", () => {
    test('calculate the mode', async () => {
        const res = await request(app).get('/mode?numbers=1,2,3,5,6,8,3,8');
        expect(res.statusCode).toBe(200);
        expect(res.body.response.operation).toEqual('mode');
        expect(res.body.response.value).toEqual([3,8]);
    })
})


