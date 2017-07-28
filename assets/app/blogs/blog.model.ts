export class Blog {
    title: string;
    content: string;
    tag: string;
    username: string;
    blogId?: string;
    userId?: string;

    constructor(title: string, content: string, tag: string, username: string, blogId?: string, userId?: string) {
        this.title = title;
        this.content = content;
        this.tag = tag;
        this.username = username;
        this.blogId = blogId;
        this.userId = userId;
    }
}