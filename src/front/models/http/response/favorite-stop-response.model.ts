export default interface FavoriteStopResponse {
	favoriteStopsInfo: [
		{
			stopId: number;
			date: string;
			notifications: boolean;
		}
	];
}
