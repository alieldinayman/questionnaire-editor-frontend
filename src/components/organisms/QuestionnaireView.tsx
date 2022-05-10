import '@/components/organisms/QuestionnaireView.scss';
import VerticalDivider from '@/components/atoms/VerticalDivider';
import QuestionStatistics from '@/components/molecules/QuestionStatistics';
import QuestionEditor from '@/components/organisms/QuestionEditor';
import { Questionnaire } from '@/models/Questionnaire';
import { useState } from 'react';
import { Question } from '@/models/Question';
import { Answer } from '@/models/Answer';

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
            <QuestionStatistics questionnaire={questionnaire} />
        </div>
    );
}

export default QuestionnaireView;
