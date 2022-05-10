import '@/components/molecules/QuestionnaireStatistics.scss';
import { Questionnaire } from '@/models/Questionnaire';

type QuestionnaireStatisticsProps = {
    questionnaire: Questionnaire;
};

function QuestionnaireStatistics(props: QuestionnaireStatisticsProps) {
    return (
        <div className="column">
            <h3>Summary</h3>

            <label className="stat-label">
                No. of Rows: <strong>{props.questionnaire.questions.length}</strong>
            </label>
            <label className="stat-label">
                No. of Columns: <strong>{props.questionnaire.answers.length}</strong>
            </label>
            <label className="stat-label">Images Uploaded: </label>
            <label className="stat-label">Longest Row Label: </label>
            <label className="stat-label">Longest Column Label: </label>
        </div>
    );
}

export default QuestionnaireStatistics;
