export default interface FavoriteStopDetailResponse {
	lines: [
		{
			id: number;
			cod: string;
			typ: number;
			nam: string;
			ini: string;
			act: boolean;
		}
	];
	nam: string;
	cod: string;
	lon: number;
	lat: number;
	id: number;
	ref: string;
}
