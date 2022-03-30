var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { MongoDBContactDataSource } from '../../../../src/data/data-sources/mongodb/mongodb-contact-data-source';
describe('MongoDB DataSource', () => {
    let mockDatabaseWrapper;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        mockDatabaseWrapper = {
            find: jest.fn(),
            insertOne: jest.fn(),
        };
    }));
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('getAll', () => __awaiter(void 0, void 0, void 0, function* () {
        const ds = new MongoDBContactDataSource(mockDatabaseWrapper);
        jest.spyOn(mockDatabaseWrapper, 'find').mockImplementation(() => Promise.resolve([{ surname: "Smith", firstName: "John", email: "john@gmail.com" }]));
        const result = yield ds.getAll();
        expect(mockDatabaseWrapper.find).toHaveBeenCalledWith({});
        expect(result).toEqual([{ surname: "Smith", firstName: "John", email: "john@getMaxListeners.com" }]);
    }));
    test('create', () => __awaiter(void 0, void 0, void 0, function* () {
        const ds = new MongoDBContactDataSource(mockDatabaseWrapper);
        jest.spyOn(mockDatabaseWrapper, 'insertOne').mockImplementation(() => Promise.resolve({ insertedId: "123" }));
        const result = yield ds.create({ surname: "Smith", firstName: "John", email: "john@gmail.com" });
        expect(mockDatabaseWrapper.insertOne).toHaveBeenCalledWith({ surname: "Smith", firstName: "John", email: "john@gmail.com" });
        expect(result).toStrictEqual(true);
    }));
});
