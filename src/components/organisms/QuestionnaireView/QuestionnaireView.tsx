import './QuestionnaireView.scss';
import { useEffect, useState } from 'react';
import { Button, LoadingSpinner, VerticalDivider } from '@/components/atoms';
import { QuestionnaireStatistics } from '@/components/molecules';
import { QuestionEditor } from '@/components/organisms';
import { Questionnaire, Question, Answer } from '@/models';
import QuestionnaireService from '@/services/QuestionnaireService';
import Alert from '@/components/atoms/Alert/Alert';

function QuestionnaireView() {
    const [questionnaire, setQuestionnaire] = useState<Questionnaire | null>(null);
    const [loading, setLoading] = useState(true);
    const [triggerAlert, setTriggerAlert] = useState(false);
    const [validationMessage, setValidationMessage] = useState('');
    const [validationError, setValidationError] = useState(false);

    useEffect(() => {
        async function getLatestQuestionnaire() {
            const fetchedQuestionnaire = await QuestionnaireService.getQuestionnaire();
            setQuestionnaire(fetchedQuestionnaire);
            setLoading(false);
        }

        try {
            getLatestQuestionnaire();
        } catch (err: any) {
            handleApiResponse(err.message, true);
        }
    }, []);

    async function saveQuestionnaire() {
        if (!questionnaire) {
            return;
        }

        setLoading(true);
        try {
            await QuestionnaireService.saveQuestionnaire(questionnaire);
            handleApiResponse('Questionnaire has been saved successfully.');
        } catch (err: any) {
            handleApiResponse(err.message, true);
        }
    }

    function handleQuestionsListChange(questionList: Array<Question>) {
        setQuestionnaire(questionnaire ? { ...questionnaire, questions: questionList } : null);
    }

    function handleAnswersListChange(answerList: Array<Answer>) {
        setQuestionnaire(questionnaire ? { ...questionnaire, answers: answerList } : null);
    }

    function handleQuestionnaireTitleChange(title: string) {
        setQuestionnaire(questionnaire ? { ...questionnaire, title: title } : null);
    }

    function handleApiResponse(message: string, isError: boolean = false) {
        setLoading(false);
        setValidationError(isError);
        setValidationMessage(isError ? `Error: ${message}.` : message);
        setTriggerAlert(true);
    }

    function getViewContent() {
        return (
            <div>
                {questionnaire && (
                    <div>
                        <div className="columns is-flex-wrap-wrap">
                            <QuestionEditor
                                questionnaire={questionnaire}
                                onQuestionsModified={handleQuestionsListChange}
                                onAnswersModified={handleAnswersListChange}
                                onQuestionnaireTitleModified={handleQuestionnaireTitleChange}
                                onUploadImageError={(message) => handleApiResponse(message, true)}
                            />
                            <VerticalDivider />
                            <QuestionnaireStatistics questionnaire={questionnaire} />
                        </div>
                        <Button onClick={saveQuestionnaire} text="Save" />
                    </div>
                )}
                {loading && <LoadingSpinner />}
                <Alert
                    triggerAlert={triggerAlert}
                    onAlertExpire={() => setTriggerAlert(false)}
                    text={validationMessage}
                    duration={3000}
                    isError={validationError}
                />
            </div>
        );
    }

    return getViewContent();
}

export default QuestionnaireView;
