export default interface FavoriteLineResponse {
	favoriteLinesInfoList: [
		{
			lineId: number;
			date: string;
			notifications: boolean;
		}
	];
}
