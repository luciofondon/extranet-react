import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Layout } from './pages/organisms/layout.component';
import { NotFound } from './pages/pages/not-found.component';
import { Home } from './pages/pages/home.component';
import { LastMovement } from './pages/pages/last-movement.component';
import { Move } from './pages/pages/move.component';
import { Purse } from './pages/pages/purse.component';
import { Card } from './pages/pages/card.component';

export const App: React.FC = (): JSX.Element => (
	<>
		<Layout>
			<main>
				<Switch>
					<Route exact path="/inici">
						<Home />
					</Route>
					<Route exact path="/targeta">
						<Card />
					</Route>
					<Route exact path="/moneder">
						<Purse />
					</Route>
					<Route exact path="/darrers-movimients">
						<LastMovement />
					</Route>
					<Route exact path="/mou-te-be">
						<Move />
					</Route>

					<Redirect from="/" exact to="/inici" />
					<Route component={NotFound} />
				</Switch>
			</main>
		</Layout>
	</>
);
