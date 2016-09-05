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
			<div className="col-md-4 text-xs-center">
				<div className="col-md-12">
					<Button onClick={this.getRandomValue} text={this.state.text} />
				</div>
				<div className="col-md-12">
					<Result>{this.state.data.join(', ')}</Result>
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

var Button = React.createClass({
	handlerClick: function(){
		this.props.onClick();
	},
	render: function(){
		return (
			<div className="button">
				<button className="btn btn-success" onClick={this.handlerClick}>{this.props.text.toString()}</button>
			</div>
		);
	}
});

var Result = React.createClass({
    rawMarkup: function(){
        var md = new Remarkable();
        var rawMarkup = md.render(this.props.children.toString());
        return ({__html: rawMarkup});
    },
	render: function(){
		return (
			<p>
				<strong>{this.props.children.toString()}</strong>
			</p>
		);
	}
});

ReactDOM.render(
	<Content />,
	document.getElementById("content")
);
