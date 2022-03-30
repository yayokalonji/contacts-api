import { ContactDataSource } from '../../interfaces/data-sources/contact-data-source';
import { Contact } from '../../../domain/entities/contact';
import { DatabaseWrapper } from '../../interfaces/data-sources/database-wrapper';

export class MongoDBContactDataSource implements ContactDataSource {
    private databaseWrapper: DatabaseWrapper;

    constructor(databaseWrapper: DatabaseWrapper) {
        this.databaseWrapper = databaseWrapper;
    }

    async create(contact: Contact): Promise<boolean> {
        const result = await this.databaseWrapper.insertOne(contact);
        return result;
    }

    async getAll(): Promise<Contact[]> {
        const result = await this.databaseWrapper.find({});
        return result.map( item => ({
            id: item._id.toString(),
            surname: item.surname,
            firstName: item.firstName,
            email: item.email,
        })) ;
    }
}