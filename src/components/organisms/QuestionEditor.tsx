import '@/components/organisms/QuestionEditor.scss';
import PlusIcon from '@/assets/images/plus-icon.png';
import { Answer } from '@/models/Answer';
import { Question } from '@/models/Question';
import { useState, createRef, useEffect } from 'react';
import { Questionnaire } from '@/models/Questionnaire';

type QuestionEditorProps = {
    questionnaire: Questionnaire;
    onQuestionsModified: (questions: Array<Question>) => void;
    onAnswersModified: (answers: Array<Answer>) => void;
    onQuestionnaireTitleModified: (title: string) => void;
};

enum QuestionnaireElementType {
    Question,
    Answer,
}

function QuestionEditor(props: QuestionEditorProps) {
    // #region Hooks
    const [questionsList, setQuestionsList] = useState<Array<Question>>([...props.questionnaire.questions]);
    const [answersList, setAnswersList] = useState<Array<Answer>>([...props.questionnaire.answers]);
    const [uploadedImagesCount, setUploadedImagesCount] = useState(0);

    useEffect(() => props.onAnswersModified(answersList), [answersList]);
    useEffect(() => props.onQuestionsModified(questionsList), [questionsList]);
    //#endregion

    // #region UI Elements
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
                        onChange={(event) =>
                            uploadImage(event, question, QuestionnaireElementType.Question, questionIndex)
                        }
                    />
                </button>
            </td>
            <td>
                <input
                    type="text"
                    className="is-transparent"
                    placeholder="Question"
                    value={question.title}
                    onChange={(event) => {
                        let questionsCopy = [...questionsList];
                        let questionCopy = { ...questionsCopy[questionIndex], title: event.target.value };
                        questionsCopy[questionIndex] = questionCopy;
                        setQuestionsList(questionsCopy);
                    }}
                />
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
            <input
                type="text"
                className="is-transparent"
                placeholder="Answer"
                value={answer.title}
                onChange={(event) => {
                    let answersCopy = [...answersList];
                    let answerCopy = { ...answersCopy[index], title: event.target.value };
                    answersCopy[index] = answerCopy;
                    setAnswersList(answersCopy);
                }}
            />
        </th>
    ));

    // Unlike the question elements, these elements can not be directly rendered with the answer elements
    const answerImageElements = answersList.map((answer: Answer, answerIndex: number) => (
        <td className="control-btn-container" key={answerIndex}>
            <button className="upload-img-btn" onClick={() => answerImageRefs[answerIndex].current.click()}>
                <img
                    className="placeholder-img"
                    src={answer.image ? URL.createObjectURL(answer.image) : PlusIcon}
                    key={answer.image?.name}
                />
                <input
                    type="file"
                    hidden
                    ref={answerImageRefs[answerIndex]}
                    onChange={(event) => uploadImage(event, answer, QuestionnaireElementType.Answer, answerIndex)}
                />
            </button>
        </td>
    ));
    //#endregion

    // #region Questionnaire manipulation functions
    function addNewQuestion(): void {
        setQuestionsList([...questionsList, new Question('')]);
    }

    function popQuestionsList(): void {
        setQuestionsList(questionsList.slice(0, -1));
    }

    function addNewAnswer(): void {
        setAnswersList([...answersList, new Question('')]);
    }

    function popAnswersList(): void {
        setAnswersList(answersList.slice(0, -1));
    }

    function uploadImage(
        event: any,
        imageParent: Question | Answer,
        elementType: QuestionnaireElementType,
        elementIndex: number
    ): void {
        let uploadedImage = event.target.files?.length > 0 ? event.target.files[0] : null;

        // Validate that the uploaded file is an image before assigning it
        if (!uploadedImage?.type.includes('image')) return;
        imageParent.image = uploadedImage;

        // Also used for rerendering the image
        setUploadedImagesCount(uploadedImagesCount + 1);

        if (elementType === QuestionnaireElementType.Question) {
            let questionsCopy = [...questionsList];
            let questionCopy = { ...questionsCopy[elementIndex], image: uploadedImage };
            questionsCopy[elementIndex] = questionCopy;
            setQuestionsList(questionsCopy);
        } else if (elementType === QuestionnaireElementType.Answer) {
            let answersCopy = [...answersList];
            let answerCopy = { ...answersCopy[elementIndex], image: uploadedImage };
            answersCopy[elementIndex] = answerCopy;
            setAnswersList(answersCopy);
        }
    }
    // #endregion

    return (
        <div className="editor-container column is-two-thirds has-text-centered">
            <input
                type="text"
                className="is-title is-transparent"
                placeholder="Questionnaire Title"
                value={props.questionnaire.title}
                onChange={(event) => props.onQuestionnaireTitleModified(event.target.value)}
            />
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
