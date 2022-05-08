import '@/components/organisms/QuestionEditor.scss';
import { Answer } from '@/models/Answer';
import { Question } from '@/models/Question';
import { useState } from 'react';

function QuestionEditor() {
    const [questionsList, setQuestionsList] = useState<Array<Question>>([new Question('Question')]);
    const [answersList, setAnswersList] = useState<Array<Answer>>([new Answer('Answer')]);

    const questionElements = questionsList.map((question: Question, questionIndex: number) => (
        <tr key={questionIndex}>
            <td>{question.title}</td>
            {answersList.map((answer: Answer, answerIndex: number) => (
                <td key={`${answerIndex}-${questionIndex}`}>
                    <input type="radio" name={questionIndex.toString()} />
                </td>
            ))}
        </tr>
    ));

    const answerElements = answersList.map((answer: Answer, index: number) => <th key={index}>{answer.title}</th>);

    // #region Questionnaire manipulation functions
    function addNewQuestion(): void {
        setQuestionsList([...questionsList, new Question('Question')]);
    }

    function popQuestionsList(): void {
        setQuestionsList(questionsList.slice(0, -1));
    }

    function addNewAnswer(): void {
        setAnswersList([...answersList, new Question('Answer')]);
    }

    function popAnswersList(): void {
        setAnswersList(answersList.slice(0, -1));
    }
    // #endregion

    return (
        <div className="editor-container column is-two-thirds has-text-centered">
            <h3>Questionnaire Title</h3>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        {answerElements}
                        <th className="control-btn-container">
                            <button onClick={addNewAnswer}>+</button>
                            <button onClick={popAnswersList}>-</button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {questionElements}
                    <tr>
                        <td className="control-btn-container">
                            <button onClick={addNewQuestion}>+</button>
                            <button onClick={popQuestionsList}>-</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default QuestionEditor;
