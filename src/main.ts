import server from './server';
import ContactsRouter from "./presentation/routers/contact-router";
import { GetAllContacts } from './domain/use-cases/contact/get-all-contacts';
import { CreateContact } from './domain/use-cases/contact/create-contact';
import { ContactRepositoryImpl } from './domain/repositories/contact-repository';
import { MongoClient, ServerApiVersion } from "mongodb";
import { DatabaseWrapper } from './data/interfaces/data-sources/database-wrapper';
import { MongoDBContactDataSource } from './data/data-sources/mongodb/mongodb-contact-data-source';

(async () => {
    const uri = `${process.env.URI}`;
    const client: MongoClient = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });
    await client.connect();
    const db = client.db('Contact');

    const databaseWrapper: DatabaseWrapper = {
        find: (query) => db.collection('contacts').find(query).toArray(),
        insertOne: (doc) => db.collection('contacts').insertOne(doc),
    }

    const contactMiddleware = ContactsRouter(
        new GetAllContacts(new ContactRepositoryImpl(new MongoDBContactDataSource(databaseWrapper))),
        new CreateContact(new ContactRepositoryImpl(new MongoDBContactDataSource(databaseWrapper))),
    );

    server.use('/contacts', contactMiddleware);
    server.listen(3000, () => console.log("Server running on port 3000"));
})();