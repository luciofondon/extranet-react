import * as React from 'react';
import { render } from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { App } from './components/app.component';
import { WithI18n } from './context/i18n.context';

const app = document.getElementById('app');

render(
	<Router>
		<WithI18n>
			<App />
		</WithI18n>
	</Router>,
	app
);
