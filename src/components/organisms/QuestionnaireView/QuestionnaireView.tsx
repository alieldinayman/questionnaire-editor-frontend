import './QuestionnaireView.scss';
import { useEffect, useState } from 'react';
import { Button, LoadingSpinner, VerticalDivider } from '@/components/atoms';
import { QuestionnaireStatistics } from '@/components/molecules';
import { QuestionEditor } from '@/components/organisms';
import { Questionnaire, Question, Answer } from '@/models';
import QuestionnaireService from '@/services/QuestionnaireService';

function QuestionnaireView() {
    const [questionnaire, setQuestionnaire] = useState<Questionnaire | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getLatestQuestionnaire() {
            const fetchedQuestionnaire = await QuestionnaireService.getQuestionnaire();
            if (!fetchedQuestionnaire) {
                return new Questionnaire('', [new Question('')], [new Answer('')]);
            }

            setQuestionnaire(fetchedQuestionnaire);
            setLoading(false);
        }

        getLatestQuestionnaire();
    }, []);

    function handleQuestionsListChange(questionList: Array<Question>) {
        setQuestionnaire(questionnaire ? { ...questionnaire, questions: questionList } : null);
    }

    function handleAnswersListChange(answerList: Array<Answer>) {
        setQuestionnaire(questionnaire ? { ...questionnaire, answers: answerList } : null);
    }

    function handleQuestionnaireTitleChange(title: string) {
        setQuestionnaire(questionnaire ? { ...questionnaire, title: title } : null);
    }

    function getViewContent() {
        return questionnaire && !loading ? (
            <div>
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
                <Button onClick={() => saveQuestionnaire(questionnaire)} text="Save" />
            </div>
        ) : (
            <LoadingSpinner />
        );
    }

    async function saveQuestionnaire() {
        if (!questionnaire) {
            return;
        }

        setLoading(true);
        await QuestionnaireService.saveQuestionnaire(questionnaire);
        setLoading(false);
    }

    return getViewContent();
}

export default QuestionnaireView;
