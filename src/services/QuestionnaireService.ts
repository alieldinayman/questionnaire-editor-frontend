import { Questionnaire } from '@/models';
import axios from './common';

const QuestionnaireService = {
    async getQuestionnaire(): Promise<Questionnaire> {
        // Axios get request with headers
        const response = await axios.get('/questionnaire', {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    },

    async saveQuestionnaire(questionnaire: Questionnaire): Promise<void> {},
};

export default QuestionnaireService;
