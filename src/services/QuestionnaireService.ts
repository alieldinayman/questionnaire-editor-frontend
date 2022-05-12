import { Questionnaire } from '@/models';
import axios from './common';

const QuestionnaireService = {
    async getQuestionnaire(): Promise<Questionnaire> {
        const response = await axios.get(import.meta.env.VITE_APP_QUESTIONNAIRE_ENDPOINT);
        return response.data;
    },

    async saveQuestionnaire(questionnaire: Questionnaire): Promise<void> {
        await axios.post(import.meta.env.VITE_APP_QUESTIONNAIRE_ENDPOINT, questionnaire);
    },
};

export default QuestionnaireService;
