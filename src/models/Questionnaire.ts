import { Answer } from '@/models/Answer';
import { Question } from '@/models/Question';

export class Questionnaire {
    constructor(public title: string, public questions: Array<Question>, public answers: Array<Answer>) {
        this.title = title;
        this.questions = questions;
        this.answers = answers;
    }
}
