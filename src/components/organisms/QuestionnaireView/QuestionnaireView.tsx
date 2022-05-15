import './QuestionnaireView.scss';
import { useEffect, useState } from 'react';
import { Button, LoadingSpinner, VerticalDivider, Alert } from '@/components/atoms';
import { QuestionnaireStatistics } from '@/components/molecules';
import { QuestionEditor } from '@/components/organisms';
import { QuestionnaireService } from '@/services';
import { Questionnaire, Question, Answer } from '@/models';
import { QuestionnaireProperty } from '@/constants';

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
    const elementMutationLogicMap = {
        [QuestionnaireProperty.TITLE]: (questionnaire: Questionnaire, value: string) => (questionnaire.title = value),
        [QuestionnaireProperty.QUESTIONS]: (questionnaire: Questionnaire, value: Question[]) =>
            (questionnaire.questions = value),
        [QuestionnaireProperty.ANSWERS]: (questionnaire: Questionnaire, value: Answer[]) =>
            (questionnaire.answers = value),
    };

    function handleQuestionnairePropertyChange(elementType: QuestionnaireProperty, elementValue: any) {
        if (!questionnaire) {
            return;
        }

        const newQuestionnaire = { ...questionnaire };
        elementMutationLogicMap[elementType](newQuestionnaire, elementValue);
        setQuestionnaire(newQuestionnaire);
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
                            onElementModified={(elementValue, elementType) =>
                                handleQuestionnairePropertyChange(elementType, elementValue)
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
