// @flow
import React, { Component } from 'react';
import type { Node } from 'react';

type Props = {
	children: Node,
}

class App extends Component<Props>  {
	componentDidMount() {}

	render() {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
}

export default App;
