export class Client{
    constructor(
        protected client_id: string,
        protected name: string,
        protected emails: string,
        protected telefones: string,
        protected create_at: string,
        protected role: string = "CLIENTE"  
    ){}

    getId = () => this.client_id;
    getName = () => this.name;
    getEmails = () => this.emails;
    getTelefones = () => this.telefones;
    getCreateAt = () => this.create_at;
    getRole = () => this.role;

    setId = (id: string) => this.client_id = id;
    setName = (name: string) => this.name = name;
    setEmails = (email: string) => this.emails = email;
    setTelefones = (telefone: string) => this.telefones = telefone;
    setRole = (role: string) => this.role = role;


    static toClientModel(client: any): Client {
        return new Client(
            client.client_id, 
            client.name, 
            client.emails, 
            client.telefones,
            client.create_at,
            client.role
            );
      }
};

export interface ClientInputDTO{
    name: string;
    emails: string;
    telefones: string;
    role: string;
};

export interface LoginInputDTO{
    name: string;
};