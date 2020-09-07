export class StudentDetailsModel {
    url = 'http://www.json-generator.com/api/json/get/cfEgFPyHci?indent=2'; // remove this one later

    getStudentData = () => fetch(this.url).then((response) => response.json()).then((data) => data);
}
