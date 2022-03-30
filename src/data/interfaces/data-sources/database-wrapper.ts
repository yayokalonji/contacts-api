export interface DatabaseWrapper {
    find(query: object): Promise<any[]>;
    insertOne(doc: object): Promise<any>;

}