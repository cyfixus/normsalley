export class Message {
    title: string;
    content: string;
    username: string;
    messageId?: string;
    userId?: string;

    constructor(title: string, content: string, username: string, messageId?: string, userId?: string) {
        this.title = title;
        this.content = content;
        this.username = username;
        this.messageId = messageId;
        this.userId = userId;
    }
}