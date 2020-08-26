export class Contact{
    constructor(
        protected contact_id: string,
        protected name: string,
        protected emails: string,
        protected phones: string,
        protected role: string = "CONTACT",
        protected client_id: string 
    ){}

    getId = () => this.contact_id;
    getClientId = () => this.client_id;
    getName = () => this.name;
    getEmails = () => this.emails;
    getPhones = () => this.phones;
    getRole = () => this.role;

    setId = (id: string) => this.contact_id = id;
    setClientId = (client_id: string) => this.client_id = client_id;
    setName = (name: string) => this.name = name;
    setEmails = (emails: string) => this.emails = emails;
    setPhones= (phones: string) => this.phones = phones;
    setRole = (role: string) => this.role = role;


    static toContactModel(contact: any): Contact {
        return new Contact(
            contact.contact_id, 
            contact.name, 
            contact.emails, 
            contact.phones,
            contact.role,
            contact.client_id
            );
      }
};

export interface ContactInputDTO{
    name: string;
    emails: string;
    phones: string;
    role?: string;
};