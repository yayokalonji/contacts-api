var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import request from 'supertest';
import ContactRouter from '../../../src/presentation/routers/contact-router';
import server from '../../../src/server';
class MockGetAllContactsUseCase {
    execute() {
        throw new Error('Method not implemented');
    }
}
class MockCreateContactUseCase {
    execute(contact) {
        throw new Error("Method no implemented");
    }
}
describe("Contact Router", () => {
    let mockCreateContactUseCase;
    let mockGetAllContactsUseCase;
    beforeAll(() => {
        mockCreateContactUseCase = new MockCreateContactUseCase();
        mockGetAllContactsUseCase = new MockGetAllContactsUseCase();
        server.use('/contact', ContactRouter(mockGetAllContactsUseCase, mockCreateContactUseCase));
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe(' GET / contact', () => {
        test('should return 200 with data', () => __awaiter(void 0, void 0, void 0, function* () {
            const ExpectedData = [{ id: "1", surname: 'Smith', firstName: 'John', email: 'john@gmail.com' }];
            jest.spyOn(mockGetAllContactsUseCase, "execute").mockImplementation(() => Promise.resolve(ExpectedData));
            const response = yield request(server).get('/contact');
            expect(response.status).toBe(200);
            expect(mockGetAllContactsUseCase.execute).toBeCalledTimes(1);
            expect(response.body).toStrictEqual(ExpectedData);
        }));
        test('GET /contact returns 500 on use case error', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(mockGetAllContactsUseCase, 'execute').mockImplementation(() => Promise.reject(Error()));
            const response = yield request(server).get('/contact');
            expect(response.status).toBe(500);
            expect(response.body).toStrictEqual({ message: 'Error fetching data' });
        }));
    });
    describe('POST /contact', () => {
        test("POST /contact", () => __awaiter(void 0, void 0, void 0, function* () {
            const InputData = { id: "1", surname: "Smith", firstName: "John", email: "john@gmail.com" };
            jest.spyOn(mockCreateContactUseCase, "execute").mockImplementation(() => Promise.resolve(true));
            const response = yield request(server).post("/contact").send(InputData);
            expect(response.status).toBe(201);
        }));
        test("POST /contact returns 500 on use case error", () => __awaiter(void 0, void 0, void 0, function* () {
            const InputData = { id: "1", surname: "Smith", firstName: "John", email: "john@gmail.com" };
            jest.spyOn(mockCreateContactUseCase, "execute").mockImplementation(() => Promise.reject(Error()));
            const response = yield request(server).post("/contact").send(InputData);
            expect(response.status).toBe(500);
        }));
    });
});
