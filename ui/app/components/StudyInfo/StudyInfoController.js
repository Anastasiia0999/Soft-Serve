import { StudyInfoModel } from './StudyInfoModel.js';
import { StudyInfoView } from './StudyInfoView.js';

export class StudyInfoController {
    constructor({ subscribe }) {
        this.model = new StudyInfoModel();
        this.view = new StudyInfoView();

        this.subscribe = subscribe;
        this.subscribe('LOAD_STUDY_INFO_PAGE', this.loadPage);
    }

    loadPage = () => {
        this.model.getStudyInfo().then((lessons) => {
            const {
                averageMark,
                rate,
                first_name,
                last_name,
            } = this.model.getAdditionalInfo(lessons);

            const studyInfo = { first_name, last_name, averageMark, rate, lessons };
            this.view.renderStudyInfo(studyInfo);
        });
    };
}
