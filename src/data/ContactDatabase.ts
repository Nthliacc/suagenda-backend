import { BaseDatabase } from './BaseDataba';
import { Contact } from '../model/Contact';

export class ContactDatabase extends BaseDatabase{
    private static TABLE_NAME = "Contacts";

    public async createContact(
        contact_id: string,
        name: string,
        emails: string,
        phones: string,
        role: string,
        client_id: string
    ): Promise<void>{
        try {
            await this.getConnection()
                .insert({
                    contact_id, 
                    name, 
                    emails, 
                    phones, 
                    role,
                    client_id
                })
                .into(ContactDatabase.TABLE_NAME);
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    };

    public async getContactByName(name: string): Promise<Contact>{
        const result = await this.getConnection()
            .select('*')
            .from(ContactDatabase.TABLE_NAME)
            .where({ name });

        return Contact.toContactModel(result[0]);
    };

    public async deleteContact(contact_id: string): Promise<void>{
        await this.getConnection()
            .delete()
            .from(ContactDatabase.TABLE_NAME)
            .where({ contact_id });
    };

    public async updateContact(contact_id: string, column: string, newValue: string): Promise<void>{
        await this.getConnection().raw(`
            UPDATE ${ContactDatabase.TABLE_NAME} 
            SET ${column} = "${newValue}" 
            WHERE contact_id = "${contact_id}"
        `);
    };
};