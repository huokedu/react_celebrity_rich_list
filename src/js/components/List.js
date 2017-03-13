import React from "react";
import NumberFormat from "react-number-format";

export default class List extends React.Component {

    constructor() { 
        super();
    }

    componentWillMount() {
        console.log('List:', this.props);
    }

    render() {
        let currency = this.props.currency;
        let listItems = this.props.data.map(function(item) {
            return (
                <div class="panel panel-default">
                    <div class="panel-heading text-center">NO. {item.rank}</div>
                    <div class="panel-body">
                        <p>Name: {item.name}</p>
                        <p>Net Worth: {currency} <NumberFormat value={item.netWorth} displayType={'text'} thousandSeparator={true}/></p>
                        <p>Age: {item.age}</p>
                        <p>Country: {item.country}</p>
                    </div>
                </div>
               
            ); 
        }); 

        return (
            <div>
                {listItems}
            </div>
        ); 
    }
}