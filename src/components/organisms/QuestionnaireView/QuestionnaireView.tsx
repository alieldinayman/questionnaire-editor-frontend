import './QuestionnaireView.scss';
import { useState } from 'react';
import { VerticalDivider } from '@/components/atoms';
import { QuestionnaireStatistics } from '@/components/molecules';
import { QuestionEditor } from '@/components/organisms';
import { Questionnaire, Question, Answer } from '@/models';

function QuestionnaireView() {
    const [questionnaire, setQuestionnaire] = useState(new Questionnaire('', [new Question('')], [new Answer('')]));

    function handleQuestionsListChange(questionList: Array<Question>) {
        setQuestionnaire({ ...questionnaire, questions: questionList });
    }

    function handleAnswersListChange(answerList: Array<Answer>) {
        setQuestionnaire({ ...questionnaire, answers: answerList });
    }

    function handleQuestionnaireTitleChange(title: string) {
        setQuestionnaire({ ...questionnaire, title: title });
    }

    return (
        <div className="columns is-flex-wrap-wrap">
            <QuestionEditor
                questionnaire={questionnaire}
                onQuestionsModified={handleQuestionsListChange}
                onAnswersModified={handleAnswersListChange}
                onQuestionnaireTitleModified={handleQuestionnaireTitleChange}
            />
            <VerticalDivider />
            <QuestionnaireStatistics questionnaire={questionnaire} />
        </div>
    );
}

export default QuestionnaireView;
