import { ApiClient } from '../../helpers/apiClient.js';

export class DetailsOfGroupModel {
    apiClient = new ApiClient();

    loadData = async (groupId) => {
        const { jwt } = JSON.parse(localStorage.getItem('user') || '{}');
        return this.apiClient.getGroupDetails(jwt, groupId);
    }

    loadStudentsData = async (student_ids) => {
        const { jwt } = JSON.parse(localStorage.getItem('user') || '{}');
        return await Promise.all(student_ids.map((id) => this.apiClient.getStudentById(jwt, id)));
    }

    loadMentors = async (mentor_ids) => {
        const { jwt } = JSON.parse(localStorage.getItem('user') || '{}');
        const mentors = await this.apiClient.getListOfMentors(jwt);
        return mentors.filter((mentor) => {
            for (let i = 0; i < mentor_ids; i++) {
                if (mentor.id === mentor_ids[i]) {
                    return true;
                }
                return false;
            }
        });
    }
}
