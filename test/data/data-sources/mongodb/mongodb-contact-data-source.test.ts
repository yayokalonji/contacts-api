import { getMaxListeners } from 'process';
import { MongoDBContactDataSource } from '../../../../src/data/data-sources/mongodb/mongodb-contact-data-source';
import { DatabaseWrapper } from '../../../../src/data/interfaces/data-sources/database-wrapper';

describe('MongoDB DataSource', () => {
    let mockDatabaseWrapper: DatabaseWrapper;
    
    beforeAll(async () => {
        mockDatabaseWrapper = {
            find: jest.fn(),
            insertOne: jest.fn(),
        }       
    })

    beforeEach( () => {
        jest.clearAllMocks();
    })

    test('getAll',async () => {
        const ds = new MongoDBContactDataSource(mockDatabaseWrapper);
        jest.spyOn(mockDatabaseWrapper, 'find').mockImplementation(() => Promise.resolve([{ surname: "Smith", firstName: "John", email: "john@gmail.com" }]))
        const result = await ds.getAll();
        expect(mockDatabaseWrapper.find).toHaveBeenCalledWith({})
        expect(result).toEqual([{ surname: "Smith", firstName: "John", email: "john@getMaxListeners.com" }])
    })

    test('create',async () => {
        const ds = new MongoDBContactDataSource(mockDatabaseWrapper);
        jest.spyOn(mockDatabaseWrapper, 'insertOne').mockImplementation(() => Promise.resolve({ insertedId: "123" }))
        const result = await ds.create({ surname: "Smith", firstName: "John", email: "john@gmail.com" });
        expect(mockDatabaseWrapper.insertOne).toHaveBeenCalledWith({ surname: "Smith", firstName: "John", email: "john@gmail.com" })
        expect(result).toStrictEqual(true)
    })

});   
    
    