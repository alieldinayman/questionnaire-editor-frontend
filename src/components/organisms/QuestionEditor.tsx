import '@/components/organisms/QuestionEditor.scss';
import PlusIcon from '@/assets/images/plus-icon.png';
import { Answer } from '@/models/Answer';
import { Question } from '@/models/Question';
import { useState, createRef } from 'react';

function QuestionEditor() {
    const [questionsList, setQuestionsList] = useState<Array<Question>>([new Question('Question')]);
    const [answersList, setAnswersList] = useState<Array<Answer>>([new Answer('Answer')]);
    const [uploadedImagesCount, setUploadedImagesCount] = useState(0);

    const questionImageRefs = questionsList.map((question) => createRef<any>());
    const answerImageRefs = answersList.map((answer) => createRef<any>());

    const questionElements = questionsList.map((question: Question, questionIndex: number) => (
        <tr key={questionIndex}>
            <td className="control-btn-container" key={questionIndex}>
                <button className="upload-img-btn" onClick={() => questionImageRefs[questionIndex].current.click()}>
                    <img
                        className="placeholder-img"
                        src={question.image ? URL.createObjectURL(question.image) : PlusIcon}
                        key={question.image?.name}
                    />
                    <input
                        type="file"
                        hidden
                        ref={questionImageRefs[questionIndex]}
                        onChange={(event) => uploadImage(event, question)}
                    />
                </button>
            </td>
            <td>
                <input type="text" className="is-transparent" placeholder="Question" />
            </td>
            {answersList.map((answer: Answer, answerIndex: number) => (
                <td key={`${answerIndex}-${questionIndex}`}>
                    <input type="radio" name={questionIndex.toString()} />
                </td>
            ))}
        </tr>
    ));

    const answerElements = answersList.map((answer: Answer, index: number) => (
        <th key={index}>
            <input type="text" className="is-transparent" placeholder="Answer" />
        </th>
    ));

    // Unlike the question elements, these elements can not be directly rendered with the answer elements
    const answerImageElements = answersList.map((answer: Answer, index: number) => (
        <td className="control-btn-container" key={index}>
            <button className="upload-img-btn" onClick={() => answerImageRefs[index].current.click()}>
                <img
                    className="placeholder-img"
                    src={answer.image ? URL.createObjectURL(answer.image) : PlusIcon}
                    key={answer.image?.name}
                />
                <input
                    type="file"
                    hidden
                    ref={answerImageRefs[index]}
                    onChange={(event) => uploadImage(event, answer)}
                />
            </button>
        </td>
    ));

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

    function uploadImage(event: any, imageParent: Question | Answer) {
        let uploadedImage = event.target.files[0];

        // Validate that the uploaded file is an image before assigning it
        imageParent.image = uploadedImage?.type.includes('image') ? uploadedImage : imageParent.image;

        // Also used for rerendering the image
        setUploadedImagesCount(uploadedImagesCount + 1);
    }
    // #endregion

    return (
        <div className="editor-container column is-two-thirds has-text-centered">
            {/* <h3>Questionnaire Title</h3> */}
            <input type="text" className="is-title is-transparent" placeholder="Questionnaire Title" />
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        {answerImageElements}
                        <th className="control-btn-container">
                            <button onClick={addNewAnswer}>+</button>
                            <button onClick={popAnswersList}>-</button>
                        </th>
                    </tr>
                    <tr>
                        <th></th>
                        <th></th>
                        {answerElements}
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
