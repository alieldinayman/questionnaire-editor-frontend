import './QuestionEditor.scss';
import 'bulma/sass/grid/columns.sass';
import GreenPlusIcon from '@/assets/images/green-plus-icon.png';
import { useState, useEffect } from 'react';
import { Questionnaire, Question, Answer } from '@/models';
import { Button } from '@/components/atoms';
import { ImageUploader } from '@/components/molecules';

type QuestionEditorProps = {
    questionnaire: Questionnaire;
    onQuestionsModified: (questions: Array<Question>) => void;
    onAnswersModified: (answers: Array<Answer>) => void;
    onQuestionnaireTitleModified: (title: string) => void;
    onQuestionEditorError: (error: string) => void;
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
    const questionElements = questionsList.map((question: Question, questionIndex: number) => (
        <tr key={questionIndex}>
            <td className="is-borderless" key={questionIndex}>
                <ImageUploader
                    parentElement={question}
                    onImageChange={(image) =>
                        updateElementImage(QuestionnaireElementType.Question, questionIndex, image)
                    }
                    onUploadImageError={(error) => props.onQuestionEditorError(error)}
                />
            </td>
            <td>
                <input
                    type="text"
                    className="is-transparent"
                    placeholder="Question"
                    value={question.title}
                    onChange={(event) =>
                        updateElementTitle(QuestionnaireElementType.Question, questionIndex, event.target.value)
                    }
                />
                {questionsList.length > 1 && (
                    <Button
                        text="X"
                        className="reset-btn is-transparent is-table-row"
                        onClick={() => removeQuestionnaireElement(QuestionnaireElementType.Question, question)}
                    />
                )}
            </td>
            {answersList.map((answer: Answer, answerIndex: number) => (
                <td key={`${answerIndex}-${questionIndex}`}>
                    <input type="radio" name={questionIndex.toString()} />
                </td>
            ))}
        </tr>
    ));

    const answerElements = answersList.map((answer: Answer, answerIndex: number) => (
        <th key={answerIndex}>
            <input
                type="text"
                className="is-transparent"
                placeholder="Answer"
                value={answer.title}
                onChange={(event) =>
                    updateElementTitle(QuestionnaireElementType.Answer, answerIndex, event.target.value)
                }
            />

            {answersList.length > 1 && (
                <Button
                    text="X"
                    className="reset-btn is-transparent is-table-column"
                    onClick={() => removeQuestionnaireElement(QuestionnaireElementType.Answer, answer)}
                />
            )}
        </th>
    ));

    // These elements can not be directly rendered with the answer elements since they are table data themselves
    const answerImageElements = answersList.map((answer: Answer, answerIndex: number) => (
        <td className="is-borderless" key={answerIndex}>
            <ImageUploader
                parentElement={answer}
                onImageChange={(image) => updateElementImage(QuestionnaireElementType.Answer, answerIndex, image)}
                onUploadImageError={(error) => props.onQuestionEditorError(error)}
            />
        </td>
    ));
    //#endregion

    // #region Questionnaire Manipulation Logic
    function addQuestionnaireElement(elementType: QuestionnaireElementType): void {
        const elementList = elementTypeLogicMap[elementType].list;
        const setList = elementTypeLogicMap[elementType].setListHook;

        // Create a new instance and push it to the list
        setList([...elementList, new elementTypeLogicMap[elementType].type('')]);
    }

    function removeQuestionnaireElement(elementType: QuestionnaireElementType, element: Question | Answer): void {
        // Restrict element lists to have at least one element
        const elementList = elementTypeLogicMap[elementType].list;
        if (elementList.length <= 1) {
            props.onQuestionEditorError('Questionnaire must contain at least one question and answer');
            return;
        }

        const setList = elementTypeLogicMap[elementType].setListHook;
        setList(elementList.filter((listElement) => listElement !== element));
    }

    function updateElementImage(elementType: QuestionnaireElementType, elementIndex: number, imageValue: string): void {
        const imageParentList = elementTypeLogicMap[elementType].list;
        let listCopy = [...imageParentList];
        let elementCopy = { ...listCopy[elementIndex], image: imageValue };
        listCopy[elementIndex] = elementCopy;
        elementTypeLogicMap[elementType].setListHook(listCopy);
    }

    function updateElementTitle(elementType: QuestionnaireElementType, elementIndex: number, titleValue: string): void {
        const imageParentList = elementTypeLogicMap[elementType].list;
        let listCopy = [...imageParentList];
        let elementCopy = { ...listCopy[elementIndex], title: titleValue };
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
                        <th className="is-borderless">
                            <Button
                                className="is-transparent has-transparent-img"
                                image={GreenPlusIcon}
                                onClick={() => addQuestionnaireElement(QuestionnaireElementType.Answer)}
                            />
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
                        <td className="is-borderless">
                            <Button
                                className="is-transparent has-transparent-img"
                                image={GreenPlusIcon}
                                onClick={() => addQuestionnaireElement(QuestionnaireElementType.Question)}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default QuestionEditor;
