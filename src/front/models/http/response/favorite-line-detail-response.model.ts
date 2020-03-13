export default interface FavoriteLineDetailResponse {
	sessions: [
		{
			nam: string;
			ini: string;
			end: string;
			cur: boolean;
		}
	];
	sublines: [
		{
			towns: [
				{
					id: number;
					nam: string;
					dis: number;
				}
			];
			stops: [
				{
					nam: string;
					cod: string;
					lon: number;
					lat: number;
					parent: string;
				}
			];
		}
	];
	festius: [];
	id: number;
	cod: string;
	sec: string;
	typ: number;
	nam: string;
	dem: boolean;
	summ: boolean;
	ini: string;
	act: boolean;
}
