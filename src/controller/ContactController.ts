import { Request, Response } from 'express';
import { ContactInputDTO } from '../model/Contact';
import { BaseDatabase } from '../data/BaseDataba';
import { IdGenerator } from '../services/idGenerator';
import { ContactDatabase } from '../data/ContactDatabase';
import { Authenticator } from '../services/Authenticator';

export class ContactController {
    async addContact(req: Request, res: Response){
        try {
            const token = req.headers.token as string;
            const authentication = new Authenticator().getData(token);
            const clientId = authentication.id;
            
            const input: ContactInputDTO = {
                name: req.body.name,
                emails: req.body.emails,
                phones: req.body.phones,
                role: req.body.role
            }

            const idGenerator = new IdGenerator();
            const id = idGenerator.generate();

            await new ContactDatabase().createContact(id, input.name, input.emails, input.phones, input.role as string, clientId)
            
            res.status(200).send({ message: `${input.name} foi adicionado a sua Agenda` });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }
        await BaseDatabase.destroyConnection();
    };

    async deleteContact(req: Request, res: Response){
        try {
            const token = req.headers.token as string;
            if(!token){
                throw new Error("Você não tem autorização para apagar contato");
            };

            const authentication = new Authenticator().getData(token);
                        
            const contactId = req.body.contact_id;

            await new ContactDatabase().deleteContact(contactId)
            
            res.status(200).send({ message: `Contato excluído` });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }
        await BaseDatabase.destroyConnection();
    };

    async editContact(req: Request, res: Response){
        try {
            const token = req.headers.token as string;
            if(!token){
                throw new Error("Você não tem autorização para apagar contato");
            };
            new Authenticator().getData(token);
            
            const input = {
                contact_id: req.body.contact_id,
                column: req.body.column,
                newValue: req.body.newValue
            }

            await new ContactDatabase().updateContact(input.contact_id, input.column, input.newValue)
            
            res.status(200).send({ message: `Contato atualizado` });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }
        await BaseDatabase.destroyConnection();
    };
}