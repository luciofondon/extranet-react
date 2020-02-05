import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Layout as LayoutUI } from 'ctm-extranet-react-components';

export const Layout: React.FC = ({ children }) => {



	return <LayoutUI>{children}</LayoutUI>;
};

Layout.propTypes = {
	children: PropTypes.any,
};
