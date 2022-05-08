export class Question {
    constructor(public title: string, public image?: File) {
        this.title = title;
        this.image = image;
    }
}
