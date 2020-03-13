const endpointKeycloak = process.env.ENDPOINT_KEYCLOAK;

export const get = function<T>(endpoint) {
	return new Promise<T>((resolve, reject) => {
		window
			.fetch(`${endpoint}`, {
				method: 'GET',
			})
			.then((res) => res.json())
			.then((res) => {
				resolve(res);
			})
			.catch((error) => {
				reject(error);
			});
	});
};

export const getWithAutorization = function<T>(endpoint) {
	return new Promise<T>((resolve, reject) => {
		const data = {
			username: process.env.USERNAME,
			password: process.env.PASSWORD,
			grant_type: 'password',
			client_id: 'curl' /*eslint @typescript-eslint/camelcase: "error"*/,
		};

		const formBody: string[] = [];
		for (const property in data) {
			const encodedKey = encodeURIComponent(property);
			const encodedValue = encodeURIComponent(data[property]);
			formBody.push(encodedKey + '=' + encodedValue);
		}
		const formBodyEncoded = formBody.join('&');

		window
			.fetch(`${endpointKeycloak}`, {
				method: 'POST',
				headers: {
					'content-type': 'application/x-www-form-urlencoded',
				},
				body: formBodyEncoded,
			})
			.then((res) => res.json())
			.then((res) => {
				window
					.fetch(`${endpoint}`, {
						method: 'GET',
						headers: new Headers({
							Authorization: `Bearer ${res.access_token}`,
						}),
					})
					.then((res) => res.json())
					.then((res) => {
						resolve(res);
					})
					.catch((error) => {
						reject(error);
					});
			})
			.catch(() => {
				reject();
			});
	});
};

export const getBinary = function(endpoint) {
	return new Promise((resolve, reject) => {
		const data = {
			username: process.env.USERNAME,
			password: process.env.PASSWORD,
			grant_type: 'password',
			client_id: 'curl',
		};

		const formBody: string[] = [];
		for (const property in data) {
			const encodedKey = encodeURIComponent(property);
			const encodedValue = encodeURIComponent(data[property]);
			formBody.push(encodedKey + '=' + encodedValue);
		}
		const formBodyEncoded = formBody.join('&');

		window
			.fetch(`${endpointKeycloak}`, {
				method: 'POST',
				headers: {
					'content-type': 'application/x-www-form-urlencoded',
				},
				body: formBodyEncoded,
			})
			.then((res) => res.json())
			.then((res) => {
				window
					.fetch(`${endpoint}`, {
						method: 'GET',
						headers: new Headers({
							Authorization: `Bearer ${res.access_token}`,
						}),
					})
					.then((res) => res.arrayBuffer())

					.then((res) => {
						resolve(res);
					})
					.catch((error) => {
						reject(error);
					});
			})
			.catch(() => {
				reject();
			});
	});
};
