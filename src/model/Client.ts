export class Client{
    constructor(
        protected client_id: string,
        protected name: string,
        protected emails: string,
        protected phones: string,
        protected create_at: string,
        protected role: string = "CLIENTE"  
    ){}

    getId = () => this.client_id;
    getName = () => this.name;
    getEmails = () => this.emails;
    getphones = () => this.phones;
    getCreateAt = () => this.create_at;
    getRole = () => this.role;

    setId = (id: string) => this.client_id = id;
    setName = (name: string) => this.name = name;
    setEmails = (email: string) => this.emails = email;
    setphones = (telefone: string) => this.phones = telefone;
    setRole = (role: string) => this.role = role;


    static toClientModel(client: any): Client {
        return new Client(
            client.client_id, 
            client.name, 
            client.emails, 
            client.phones,
            client.create_at,
            client.role
            );
      }
};

export interface ClientInputDTO{
    name: string;
    emails: string;
    phones: string;
    role: string;
};

export interface LoginInputDTO{
    name: string;
};