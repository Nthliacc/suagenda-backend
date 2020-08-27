import { Request, Response } from 'express';
import { ClientInputDTO, LoginInputDTO } from '../model/Client';
import { BaseDatabase } from '../data/BaseDataba';
import { IdGenerator } from '../services/idGenerator';
import { ClientDatabase } from '../data/ClientDatabase';
import { Authenticator } from '../services/Authenticator';
import moment from 'moment';

export class ClientController {
    async signup(req: Request, res: Response){
        try {
            const input: ClientInputDTO = {
                name: req.body.name,
                emails: req.body.emails,
                phones: req.body.phones,
                role: req.body.role
            }

            const idGenerator = new IdGenerator();
            const id = idGenerator.generate();

            const create_at = moment().format("YYYY-MM-DD");

            await new ClientDatabase().createClient(id, input.name, input.emails, input.phones, create_at, input.role);

            res.status(200).send( `${input.name} seu cadastro foi realizado coom sucesso!` );

        } catch (error) {
            res.status(400).send({ error: error.message });
        }
        await BaseDatabase.destroyConnection();
    };

    async login(req: Request, res: Response){
        try {
            const input: LoginInputDTO = {
                name: req.body.name
            };

            if(!input){
                throw new Error("Insira seu nome completo");
            };

            const client = await new ClientDatabase().getClientByName(input.name);

            if(client.getRole() !== "CLIENT"){
                throw new Error("Você não possui cadastro como cliente");
            }

            const acessToken = new Authenticator().generateToken({ id: client.getId(), role: client.getRole() })

            res.status(200).send({ acessToken });
            
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
        await BaseDatabase.destroyConnection();
    };

    async allMyContacts(req: Request, res: Response){
        try {
            const token = req.headers.token as string;
            const authentication = new Authenticator().getData(token);
            const clientId = authentication.id;

            const contacts = await new ClientDatabase().getAllMyContacts(clientId);
            const listContacts = contacts.map((contact: any) => ({
                contact_id: contact.contact_id,
                name: contact.name,
                emails: contact.emails,
                phones: contact.phones
            }));

            res.status(200).send({ listContacts });
            
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
        await BaseDatabase.destroyConnection();
    };
}