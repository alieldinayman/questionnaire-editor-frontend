import '@/components/molecules/QuestionStatistics.scss';

function QuestionStatistics() {
    return (
        <div className="column">
            <h3>Summary</h3>

            <p>No. of Rows: </p>
            <p>No. of Columns: </p>
            <p>Images Uploaded: </p>
            <p>Longest Row Label: </p>
            <p>Longest Column Label: </p>
        </div>
    );
}

export default QuestionStatistics;
