import { getWithAutorization, getBinary, get } from './http.service';

import MyProfileResponse from '../models/http/response/my-profile.model';
import FavoriteLineResponse from '../models/http/response/favorite-line-response.model';
import FavoriteStopResponse from '../models/http/response/favorite-stop-response.model';
import FavoriteStop from '../models/favorite-stop.model';
import FavoriteLine from '../models/favorite-line.model';
import FavoriteLineDetailResponse from '../models/http/response/favorite-line-detail-response.model';
import FavoriteStopDetailResponse from '../models/http/response/favorite-stop-detail-response.model';
const endpointCTM = process.env.ENDPOINT_CTM;
const endpointSICTM = process.env.ENDPOINT_SICTM;

export const getMyProfile = (): Promise<MyProfileResponse> => {
	return new Promise<MyProfileResponse>((resolve, reject) => {
		getWithAutorization<MyProfileResponse>(`${endpointCTM}/my-tib/my-profile`)
			.then((data) => {
				resolve(data);
			})
			.catch((error) => {
				reject(error);
			});
	});
};

export const getMyPhoto = (): Promise<any> => {
	return new Promise<any>((resolve, reject) => {
		getBinary(`${endpointCTM}/my-tib/my-profile/photo`)
			.then((data) => {
				resolve(data);
			})
			.catch((error) => {
				reject(error);
			});
	});
};

export const getFavoriteLine = (): Promise<FavoriteLine[]> => {
	return new Promise<FavoriteLine[]>((resolve, reject) => {
		getWithAutorization<FavoriteLineResponse>(`${endpointCTM}/my-tib/favorites/lines`)
			.then((data) => {
				const promisesInfo: Promise<FavoriteLineDetailResponse>[] = [];
				data.favoriteLinesInfoList.forEach((element) => {
					promisesInfo.push(get<FavoriteLineDetailResponse>(`${endpointSICTM}/lines/id/${element.lineId}`));
				});
				Promise.all(promisesInfo).then((data) => {
					const favoriteLines: FavoriteLine[] = [];

					data.forEach((element) => {
						favoriteLines.push({ id: element.cod, name: element.sessions[0].nam });
					});

					resolve(favoriteLines);
				});
			})
			.catch((error) => {
				reject(error);
			});
	});
};

export const getFavoriteStop = (): Promise<FavoriteStop[]> => {
	return new Promise<FavoriteStop[]>((resolve, reject) => {
		getWithAutorization<FavoriteStopResponse>(`${endpointCTM}/my-tib/favorites/stops`)
			.then((data: FavoriteStopResponse) => {
				const promisesInfo: Promise<FavoriteStopDetailResponse>[] = [];
				data.favoriteStopsInfo.forEach((element) => {
					promisesInfo.push(get<FavoriteStopDetailResponse>(`${endpointSICTM}/stops/id/${element.stopId}`));
				});
				Promise.all(promisesInfo).then((data) => {
					const favoriteStops: FavoriteStop[] = [];
					data.forEach((element) => {
						favoriteStops.push({ id: `${element.cod} - ${element.nam}` });
					});
					resolve(favoriteStops);
				});
			})
			.catch((error) => {
				reject(error);
			});
	});
};

export const getMyNotifications = (): Promise<any[]> => {
	return new Promise<any[]>((resolve, reject) => {
		getWithAutorization<any[]>(`${endpointCTM}/my-notifications`)
			.then((data) => {
				resolve(data);
			})
			.catch((error) => {
				reject(error);
			});
	});
};
