import * as React from 'react';

const getLanguajeNavigatorFormat = (language): string => {
	if ('es' === language || 'es-ES' === language) {
		return 'es';
	} else if ('ca' === language) {
		return 'ca';
	}
	return 'es';
};

export default function useNavigatorLanguage(): string {
	const [language, setLanguage] = React.useState<string>('es');
	React.useEffect(() => {
		setLanguage(getLanguajeNavigatorFormat(navigator.language || navigator['userLanguage']));
	}, []);
	return language;
}
