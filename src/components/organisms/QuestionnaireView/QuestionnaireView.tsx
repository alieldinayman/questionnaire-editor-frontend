import './QuestionnaireView.scss';
import { useEffect, useState } from 'react';
import { Button, LoadingSpinner, VerticalDivider } from '@/components/atoms';
import { QuestionnaireStatistics } from '@/components/molecules';
import { QuestionEditor } from '@/components/organisms';
import { Questionnaire, Question, Answer } from '@/models';
import QuestionnaireService from '@/services/QuestionnaireService';
import Alert from '@/components/atoms/Alert/Alert';

enum QuestionnairePropertyType {
    Title,
    Questions,
    Answers,
}

function QuestionnaireView() {
    // #region Hooks
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
            handleDataValidation(err.message, true);
        }
    }, []);
    // #endregion

    // #region Questionnaire Data Logic
    function handleQuestionnaireChange(propertyType: QuestionnairePropertyType, value: any) {
        if (!questionnaire) {
            return;
        }

        // Using a switch to avoid hard typing of the property
        switch (propertyType) {
            case QuestionnairePropertyType.Title:
                setQuestionnaire({ ...questionnaire, title: value });
                break;
            case QuestionnairePropertyType.Questions:
                setQuestionnaire({ ...questionnaire, questions: value });
                break;
            case QuestionnairePropertyType.Answers:
                setQuestionnaire({ ...questionnaire, answers: value });
                break;
        }
    }

    async function saveQuestionnaire() {
        if (!questionnaire) {
            return;
        }

        setLoading(true);
        try {
            await QuestionnaireService.saveQuestionnaire(questionnaire);
            handleDataValidation('Questionnaire has been saved successfully.');
        } catch (err: any) {
            handleDataValidation(err.message, true);
        }
    }

    function handleDataValidation(message: string, isError: boolean = false) {
        setLoading(false);
        setValidationError(isError);
        setValidationMessage(isError ? `Error: ${message}.` : message);
        setTriggerAlert(true);
    }
    // #endregion

    return (
        <div>
            {questionnaire && (
                <div className="questionnaire-container">
                    <div className="columns">
                        <QuestionEditor
                            questionnaire={questionnaire}
                            onQuestionnaireTitleModified={(title) =>
                                handleQuestionnaireChange(QuestionnairePropertyType.Title, title)
                            }
                            onQuestionsModified={(questions) =>
                                handleQuestionnaireChange(QuestionnairePropertyType.Questions, questions)
                            }
                            onAnswersModified={(answers) =>
                                handleQuestionnaireChange(QuestionnairePropertyType.Answers, answers)
                            }
                            onQuestionEditorError={(message) => handleDataValidation(message, true)}
                        />
                        <VerticalDivider />
                        <QuestionnaireStatistics questionnaire={questionnaire} />
                    </div>
                    <div className="save-btn-container">
                        <Button className="save-btn" onClick={saveQuestionnaire} text="Save" />
                    </div>
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

export default QuestionnaireView;
