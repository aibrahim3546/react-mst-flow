// @flow
import React, { Component } from 'react';
import type { Node } from 'react';

type Props = {
	children: Node,
}

class App extends Component<Props>  {
	componentDidMount() {
		window.scrollTo(0,0);
	}

	render() {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
}

export default App;
