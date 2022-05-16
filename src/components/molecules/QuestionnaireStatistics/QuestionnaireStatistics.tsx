import './QuestionnaireStatistics.scss';
import { Questionnaire } from '@/models';

type QuestionnaireStatisticsProps = {
    questionnaire: Questionnaire;
};

function QuestionnaireStatistics(props: QuestionnaireStatisticsProps) {
    return (
        <div className="column">
            <h3>Summary</h3>

            <label className="stat-label">
                No. of Rows:&nbsp;
                <strong>{props.questionnaire.questions.length}</strong>
            </label>
            <label className="stat-label">
                No. of Columns:&nbsp;
                <strong>{props.questionnaire.answers.length}</strong>
            </label>
            <label className="stat-label">
                Images Uploaded:&nbsp;
                <strong>
                    {props.questionnaire.questions.filter((question) => question.image).length +
                        props.questionnaire.answers.filter((answer) => answer.image).length}
                </strong>
            </label>
            <label className="stat-label">
                Longest Row Label:&nbsp;
                <strong>
                    {Math.max(...props.questionnaire.questions.map((question) => question.title?.length ?? 0))}
                </strong>
            </label>
            <label className="stat-label">
                Longest Column Label:&nbsp;
                <strong>{Math.max(...props.questionnaire.answers.map((answer) => answer.title?.length ?? 0))}</strong>
            </label>
        </div>
    );
}

export default QuestionnaireStatistics;
