import { ApiClient } from '../../helpers/apiClient.js';

export class EditStudentModel {
	apiClient = new ApiClient();

	fetchData = (id) => {
		const { jwt } = JSON.parse(localStorage.getItem('user') || '{}');

		return this.apiClient.getStudentById(jwt, id).then((studentRes) => studentRes);
	};

	static validateData(data) {
		const countSymbols = (str) => str.length;

		if (countSymbols(data.name) < 6) {
			return {
				errors: {
					name: 'Field should contain at least 6 characters',
				},
			};
		}

		if (countSymbols(data.surname) < 6) {
			return {
				errors: {
					surname: 'Field should contain at least 6 characters',
				},
			};
		}

		return {
			ok: true,
		};
	}

	editStudent(id, data) {
		return this.requestEditStudent(id, data)
			.then((res) => {
				if (res.status === 200) {
					return true;
				} else if (res.status === 404) {
					// HANDLE ERRORS
				}
			});
	}

	requestEditStudent(id, data) {
		const { jwt } = JSON.parse(localStorage.getItem('user') || '{}');

		return this.apiClient.editStudent({
			email: data.email,
			first_name: data.name,
			last_name: data.surname,
		}, jwt, id);
	}

}
