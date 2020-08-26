import { BaseDatabase } from './BaseDataba';
import { Client } from '../model/Client';
import { Contact } from '../model/Contact';

export class ClientDatabase extends BaseDatabase{
    private static TABLE_NAME = "Clients";

    public async createClient(
        client_id: string,
        name: string,
        emails: string,
        phones: string,
        create_at: string,
        role: string = "CLIENT"
    ): Promise<void>{
        try {
            await this.getConnection()
                .insert({
                    client_id, 
                    name, 
                    emails,
                    phones, 
                    create_at,
                    role 
                })
                .into(ClientDatabase.TABLE_NAME);
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    };

    public async getClientByName(name: string): Promise<Client>{
        const result = await this.getConnection()
            .select('*')
            .from(ClientDatabase.TABLE_NAME)
            .where({ name });

        return Client.toClientModel(result[0]);
    };
     
    public async deleteClient(client_id: string): Promise<void>{
        await this.getConnection()
            .delete()
            .from(ClientDatabase.TABLE_NAME)
            .where({ client_id });
    };

    public async updateClient(client_id: string, column: string, newValue: string): Promise<void>{
        await this.getConnection().raw(`
            UPDATE ${ClientDatabase.TABLE_NAME}
            SET ${column} = "${newValue}"
            WHERE client_id = "${client_id}"
        `);
    };

    public async getAllMyContacts(client_id: string):Promise<Contact[]>{
        const result = await this.getConnection()
            .select("*")
            .from("Contacts")
            .where({client_id})
            .orderBy("name", "asc");
        return result
    };
};