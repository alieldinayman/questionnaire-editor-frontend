import '@/components/organisms/QuestionContainer.scss';
import VerticalDivider from '@/components/atoms/VerticalDivider';
import QuestionStatistics from '@/components/molecules/QuestionStatistics';
import QuestionEditor from '@/components/organisms/QuestionEditor';

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
