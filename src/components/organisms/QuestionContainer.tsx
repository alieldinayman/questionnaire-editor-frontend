import '@/components/organisms/QuestionContainer.scss';
import VerticalDivider from '../atoms/VerticalDivider';
import QuestionStatistics from '../molecules/QuestionStatistics';
import QuestionEditor from './QuestionEditor';

function QuestionContainer() {
    return (
        <div className="question-container">
            <QuestionEditor />
            <VerticalDivider />
            <QuestionStatistics />
        </div>
    );
}

export default QuestionContainer;
