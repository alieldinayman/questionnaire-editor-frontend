import '@/components/organisms/QuestionEditor.scss';

function QuestionEditor() {
    return (
        <div className="column is-two-thirds">
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Bad</th>
                        <th>Neutral</th>
                        <th>Good</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Q1</td>
                        <td>
                            <input type="radio" name="q1" />
                        </td>
                        <td>
                            <input type="radio" name="q1" />
                        </td>
                        <td>
                            <input type="radio" name="q1" />
                        </td>
                    </tr>

                    <tr>
                        <td>Q2</td>
                        <td>
                            <input type="radio" name="q2" />
                        </td>
                        <td>
                            <input type="radio" name="q2" />
                        </td>
                        <td>
                            <input type="radio" name="q2" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default QuestionEditor;
