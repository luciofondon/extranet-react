import * as React from 'react';
import { Home as HomeUI } from 'ctm-extranet-react-components';
import { I18nContext } from '../../../context/i18n.context';
import { getMyNotifications, getFavoriteLine, getFavoriteStop } from '../../../services/mytib.service';
import { getMyTim } from '../../../services/mytim.service';
import MyTim from '../../../models/http/response/my-tim.model';
import FavoriteStop from '../../../models/favorite-stop.model';
import FavoriteLine from '../../../models/favorite-line.model';

export const Home: React.FC = (): JSX.Element => {
	const {
		state: { translate },
	} = React.useContext(I18nContext);
	const [myTim, setMyTim] = React.useState<MyTim>({
		tim: '',
	});
	const [favoriteStops, setFavoriteStops] = React.useState<FavoriteStop[]>([]);
	const [favoriteLines, setFavoriteLines] = React.useState<FavoriteLine[]>([]);



	React.useEffect(() => {
		getFavoriteLine().then((data) => {
			setFavoriteLines(data);
		});
		getFavoriteStop().then((data) => {
			setFavoriteStops(data);
		});
		getMyTim().then((data) => {
			setMyTim(data);
		});
	}, []);

	const literals = {
		favoriteLine: translate('favoriteLine'),
		nextHour: translate('nextHour'),
		notifications: translate('notifications'),
		abonaments: `${translate('payment')} ${myTim.tim}`,
	};

	return <HomeUI {...{ literals }} {...{ favoriteStops }} {...{ favoriteLines }} />;
};
