import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as CA from '../resources/i18n/ca.json';
import * as ES from '../resources/i18n/es.json';

const translations = {
	es: ES,
	ca: CA,
};

const getTranslate = (langCode: string) => (key) => translations[langCode][key] || key;

const defaultValue = {
	langCode: 'es', //Indicar el idioma del navegador
	translate: getTranslate('es'),
};

interface LocaleState {
	langCode: 'ca' | 'es';
	translate: (key: string) => string;
}

interface ContextProps {
	state: LocaleState;
	dispatch: ({ type }: { type: string; payload: string }) => void;
}

export const I18nContext = React.createContext({} as ContextProps);

export const WithI18n = ({ children }) => {
	const reducer = (state, action) => {
		if ('setLanguage' === action.type) {
			return {
				langCode: action.payload,
				translate: getTranslate(action.payload),
			};
		} else {
			return { ...defaultValue };
		}
	};

	const [state, dispatch] = React.useReducer(reducer, defaultValue);

	return <I18nContext.Provider value={{ state, dispatch }}>{children}</I18nContext.Provider>;
};

WithI18n.propTypes = {
	children: PropTypes.any,
};
