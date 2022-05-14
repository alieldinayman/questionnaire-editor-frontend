import './QuestionEditor.scss';
import { useState, createRef, useEffect } from 'react';
import { Questionnaire, Question, Answer } from '@/models';
import Utils from '@/utils';
import PlusIcon from '@/assets/images/plus-icon.png';
import { Button } from '@/components/atoms';

type QuestionEditorProps = {
    questionnaire: Questionnaire;
    onQuestionsModified: (questions: Array<Question>) => void;
    onAnswersModified: (answers: Array<Answer>) => void;
    onQuestionnaireTitleModified: (title: string) => void;
    onUploadImageError: (error: string) => void;
};

enum QuestionnaireElementType {
    Question,
    Answer,
}

function QuestionEditor(props: QuestionEditorProps) {
    // #region Hooks
    const [questionsList, setQuestionsList] = useState<Array<Question>>([...props.questionnaire.questions]);
    const [answersList, setAnswersList] = useState<Array<Answer>>([...props.questionnaire.answers]);

    useEffect(() => props.onAnswersModified(answersList), [answersList]);
    useEffect(() => props.onQuestionsModified(questionsList), [questionsList]);

    const elementTypeLogicMap = {
        [QuestionnaireElementType.Question]: {
            list: questionsList,
            setListHook: setQuestionsList,
            type: Question,
        },
        [QuestionnaireElementType.Answer]: {
            list: answersList,
            setListHook: setAnswersList,
            type: Answer,
        },
    };
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
                        src={question.image ? `data:image/jpeg;base64,${question.image}` : PlusIcon}
                        key={question.image}
                    />
                    <input
                        type="file"
                        accept="image/png, image/jpeg, image/gif"
                        hidden
                        ref={questionImageRefs[questionIndex]}
                        onChange={(event) => uploadImage(event, QuestionnaireElementType.Question, questionIndex)}
                    />
                </button>
                {question.image && (
                    <Button
                        text="X"
                        className="reset-btn"
                        onClick={() => updateElementImage(QuestionnaireElementType.Question, questionIndex, '')}
                    />
                )}
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

    // These elements can not be directly rendered with the answer elements since they are table data themselves
    const answerImageElements = answersList.map((answer: Answer, answerIndex: number) => (
        <td className="control-btn-container" key={answerIndex}>
            <button className="upload-img-btn" onClick={() => answerImageRefs[answerIndex].current.click()}>
                <img
                    className="placeholder-img"
                    src={answer.image ? `data:image/jpeg;base64,${answer.image}` : PlusIcon}
                    key={answer.image}
                />
                <input
                    type="file"
                    accept="image/png, image/jpeg, image/gif"
                    hidden
                    ref={answerImageRefs[answerIndex]}
                    onChange={(event) => uploadImage(event, QuestionnaireElementType.Answer, answerIndex)}
                />
            </button>
            {answer.image && (
                <Button
                    text="X"
                    className="reset-btn"
                    onClick={() => updateElementImage(QuestionnaireElementType.Answer, answerIndex, '')}
                />
            )}
        </td>
    ));
    //#endregion

    // #region Questionnaire manipulation functions
    function addQuestionnaireElement(elementType: QuestionnaireElementType): void {
        let elementList = elementTypeLogicMap[elementType].list;
        let setList = elementTypeLogicMap[elementType].setListHook;
        setList([...elementList, new elementTypeLogicMap[elementType].type('')]);
    }

    function popQuestionnaireList(elementType: QuestionnaireElementType): void {
        let elementList = elementTypeLogicMap[elementType].list;

        // Restrict element lists to have at least one element
        if (elementList.length <= 1) return;

        let setList = elementTypeLogicMap[elementType].setListHook;
        setList(elementList.slice(0, -1));
    }

    async function uploadImage(event: any, elementType: QuestionnaireElementType, elementIndex: number): Promise<void> {
        let uploadedImage: File = event.target.files?.length > 0 ? event.target.files[0] : null;

        // Validate that the uploaded file is an image before assigning it
        if (!uploadedImage?.type.includes('image')) {
            props.onUploadImageError('Uploaded file is not a valid image');
            return;
        }

        if (uploadedImage.size > import.meta.env.VITE_APP_UPLOAD_IMAGE_SIZE_LIMIT) {
            props.onUploadImageError(
                `Image exceeds the upload size limit of ${
                    import.meta.env.VITE_APP_UPLOAD_IMAGE_SIZE_LIMIT / 1000000
                } MB`
            );
            return;
        }

        // Base64 encode the image
        const encodedImage: string = await Utils.convertToBase64(uploadedImage);

        // Remove the image type prefix from the encoded image string
        const imageString: string = encodedImage.replace(/^data:image\/[a-z]+;base64,/, '');

        // Update the question/answers's image
        updateElementImage(elementType, elementIndex, imageString);
    }

    function updateElementImage(elementType: QuestionnaireElementType, elementIndex: number, imageValue: string): void {
        const imageParentList = elementTypeLogicMap[elementType].list;
        let listCopy = [...imageParentList];
        let elementCopy = { ...listCopy[elementIndex], image: imageValue };
        listCopy[elementIndex] = elementCopy;
        elementTypeLogicMap[elementType].setListHook(listCopy);
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
                            <button onClick={() => addQuestionnaireElement(QuestionnaireElementType.Answer)}>+</button>
                            <button
                                onClick={() => popQuestionnaireList(QuestionnaireElementType.Answer)}
                                disabled={answersList.length <= 1}
                            >
                                -
                            </button>
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
                            <button onClick={() => addQuestionnaireElement(QuestionnaireElementType.Question)}>
                                +
                            </button>
                            <button
                                onClick={() => popQuestionnaireList(QuestionnaireElementType.Question)}
                                disabled={questionsList.length <= 1}
                            >
                                -
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default QuestionEditor;
