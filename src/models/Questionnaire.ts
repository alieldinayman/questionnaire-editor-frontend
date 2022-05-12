import { Question, Answer } from '@/models';

export default class Questionnaire {
    constructor(public title: string, public questions: Array<Question>, public answers: Array<Answer>) {
        this.title = title;
        this.questions = questions;
        this.answers = answers;
    }
}
