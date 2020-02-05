import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Layout } from './pages/organisms/layout.component';
import { NotFound } from './pages/pages/not-found.component';
import { Home } from './pages/pages/home.component';


export const App: React.FC = (): JSX.Element => (
	<>
		<Layout>
			<main>
				<Switch>
					<Route exact path="/main">
                        <Home/>
					</Route>


					<Redirect from="/" exact to="/main" />
					<Route component={NotFound} />
				</Switch>
			</main>
		</Layout>
	</>
);
