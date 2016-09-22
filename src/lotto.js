import React from 'react';
import { Button } from 'react-bootstrap';

import $ from 'jquery';

var Content = React.createClass({
	getInitialState: function(){
		return ({data: [], history:[], text:'로또번호 6자리 자동생성'});
	},
	getRandomValue: function(){
		var history =this.state.history;
		history.unshift(this.state.data);

		var count = 6;
		var random_value =[];
		for(var i=0; i<count; i++){
			random_value.push(Math.floor(Math.random() * 45 + 1));
		}
		random_value.sort(function(a,b){
      		return a - b;
		});
		
		this.setState({data: random_value, history: history, text: '로또번호 6자리 재 생성'});
	},
	render: function(){
		return (
			<div className="content">
			<div className="col-md-4 text-center">
				<div>
					<Button className="btn-success" onClick={this.getRandomValue}>{this.state.text}</Button>
				</div>
				<div className="lotto-list">
					<Result data={this.state.data.join(', ')}></Result>
					<History data={this.state.history} />
				</div>
			</div>
			</div>
		);
	}
});

var History = React.createClass({
	render: function(){
		var HistoryNode = this.props.data.map(function(history, index){
			return <li key={index}>{history.join(', ')}</li>
		});
		return (
			<ul className="list-unstyled">
				{HistoryNode}
			</ul>
		);
	}
});

var Result = React.createClass({
	render: function(){
		return (
			<strong>{this.props.data}</strong>
		);
	}
});

export default Content;
