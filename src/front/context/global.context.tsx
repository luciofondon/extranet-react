import * as React from 'react';
import * as PropTypes from 'prop-types';
import { useSessionStorage } from '../hooks/session-storage.hook';

interface Context {}

export const Context = React.createContext({} as Context);

export const Provider = ({ children }) => {
	const values = {};
	return <Context.Provider value={values}>{children}</Context.Provider>;
};

Provider.propTypes = {
	children: PropTypes.any,
};
