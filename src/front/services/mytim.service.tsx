import { getWithAutorization } from './http.service';
import MyTim from '../models/http/response/my-tim.model';
const endpointCTM = process.env.ENDPOINT_CTM;

export const getMyTim = (): Promise<MyTim> => {
	return new Promise<MyTim>((resolve, reject) => {
		getWithAutorization<MyTim>(`${endpointCTM}/my-tim`)
			.then((data) => {
				resolve(data);
			})
			.catch((error) => {
				reject(error);
			});
	});
};
