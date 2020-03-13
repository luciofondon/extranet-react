import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Layout as LayoutUI } from 'ctm-extranet-react-components';
import { getMyProfile, getMyPhoto, getMyNotifications } from '../../../services/mytib.service';
import MyProfileResponse from '../../../models/http/response/my-profile.model';
import { I18nContext } from '../../../context/i18n.context';
import * as languages from '../../../resources/languages.json';

export const Layout: React.FC = ({ children }) => {
	const {
		state: { translate },
		dispatch,
	} = React.useContext(I18nContext);
	const [myProfile, setMyProfile] = React.useState<MyProfileResponse>({
		name: '',
		birthday: '',
		surname1: '',
		surname2: '',
		email: '',
	});
	const [notifications, setNotifications] = React.useState<any[]>([])
	const [myPhoto, setMyPhoto] = React.useState();

	React.useEffect(() => {
		getMyProfile().then((data) => {
			setMyProfile(data);
		});
		getMyPhoto().then((data) => {
			let binary = '';
			const bytes = new Uint8Array(data);
			const len = bytes.byteLength;
			for (let i = 0; i < len; i++) {
				binary += String.fromCharCode(bytes[i]);
			}

			setMyPhoto(window.btoa(binary));
		});
		getMyNotifications().then(data => {
            setNotifications(data)
        });
	}, []);

	const handleClickLogout = () => {};
	const handleClickOpenHelp = () => {};
	const handleClickChangeLanguage = (language): void => {
		dispatch({ type: 'setLanguage', payload: language.id });
	};

	const literals = {
		payment: translate('payment'),
		cookies: translate('cookies'),
		privacy: translate('privacy'),
		help: translate('help'),
		language: translate('language'),
		consortium: translate('consortium'),
	};

	return (
		<LayoutUI
			userName={`${myProfile.name} ${myProfile.surname1}`}
			photo={myPhoto}
			version="x.x.x"
			{...{ languages }}
			{...{ literals }}
			menu={translate('menu')}
			{...{ handleClickLogout }}
			{...{ handleClickOpenHelp }}
            {...{ handleClickChangeLanguage }}
            notifications={notifications.length}
		>
			{children}
		</LayoutUI>
	);
};

Layout.propTypes = {
	children: PropTypes.any,
};
