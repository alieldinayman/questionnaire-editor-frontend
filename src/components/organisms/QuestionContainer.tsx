import '@/components/organisms/QuestionContainer.scss';
import VerticalDivider from '../atoms/VerticalDivider';
import QuestionStatistics from '../molecules/QuestionStatistics';
import QuestionEditor from './QuestionEditor';

function QuestionContainer() {
    return (
        <div className="columns is-flex-wrap-wrap">
            <QuestionEditor />
            <VerticalDivider />
            <QuestionStatistics />
        </div>
    );
}

export default QuestionContainer;
