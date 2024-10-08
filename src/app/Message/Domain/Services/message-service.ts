import { inject, injectable } from "inversify";
import { TextMessagesEntity } from "../Entity/text-message-entity";
import { ITextMessagesRepository } from "../../Infrastructure/Repositories/i-text-message-repository";

@injectable()
export class MessageService implements ITextMessagesRepository {
    constructor(
        @inject('ITextMessagesRepository') private readonly messageRepository: ITextMessagesRepository
    ) { }
    async create(message: TextMessagesEntity): Promise<TextMessagesEntity> {
        return this.messageRepository.create(message);
    }
    async getMessages(): Promise<TextMessagesEntity[]> {
        return this.messageRepository.getMessages();
    }

    async getMessagesById(id: string): Promise<TextMessagesEntity> {
        return this.messageRepository.getMessagesById(id);
    }

    async update(id: string, message: Partial<TextMessagesEntity>): Promise<TextMessagesEntity> {
        return this.messageRepository.update(id, message);
    }

    async delete(ulid: string): Promise<void> {
        return this.messageRepository.delete(ulid);
    }
}
