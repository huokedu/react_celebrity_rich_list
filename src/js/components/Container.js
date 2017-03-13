import React from "react";
import List from "./List";
import Dropdown from "react-bootstrap-dropdown";
import myData from 'json!./../../data/celebrityRichList.json';


export default class Container extends React.Component {

    constructor() {
        super();
        this.state = {
            richData: myData
        }
    }

    componentWillMount() {
        let uniqueCountries = [...new Set(this.state.richData.celebrityList.map(item => item.country))];
        this.state.selectCurrencies = [{text: 'US Dollar '}, {text:'AUS Dollar '}, {text: 'Euros '}];
        this.state.sortOptions = [{text: 'Rank '}, {text:'Age '}, {text: 'Name '}]
        this.state.currency = '$USD ';
        this.state.uniqueCountries = [{text: 'Show All '}];
        this.state.snapShot = [];

        for (let i = 0; i < uniqueCountries.length; i++) {
             this.state.uniqueCountries.push({text: uniqueCountries[i] + ' '});
        }
    }

    changeBirthplace(item) {
        let currentArray = [].concat(this.state.richData.celebrityList);
        let newArray = [];
        if (item.text.trim() === 'Show All') {
            newArray = myData.celebrityList;
        } else {
            myData.celebrityList.forEach(function(arrayItem) {
                if (arrayItem['country'].trim() === item.text.trim()) {
                    newArray.push(arrayItem);
                }
            });
        }
        this.setState({
            richData: {
                celebrityList: newArray
            }
        });
    }

    changeCurrencies(item) {
        let currentData = [].concat(this.state.richData.celebrityList);
        let originalData = [].concat(myData.celebrityList);
        originalData = originalData.filter(function(o1) {
            return currentData.some(function(o2){
                return o1.name === o2.name;          
            });
        });
        let ausData = JSON.parse(JSON.stringify(originalData));
        let euroData = JSON.parse(JSON.stringify(originalData));

        if (item.text.trim() === 'AUS Dollar') {
            ausData.forEach(function(arrayItem) {
                arrayItem['netWorth'] = arrayItem['netWorth'] * myData.australianDollarValue;
            });
            this.setState({
                richData: {
                    celebrityList: ausData,
                },
                currency: '$AUD '
            });
        } else if (item.text.trim() === 'Euros') {
            euroData.forEach(function(arrayItem) {
                arrayItem['netWorth'] = arrayItem['netWorth'] * myData.euroValue;
            });
            this.setState({
                richData: {
                    celebrityList: euroData,
                },
                currency: '€EURO '
            });
           
        } else {
            this.setState({
                richData: {
                    celebrityList: originalData,
                },
                currency: '$USD '
            });
        }
    }

    
    searchText(e) {
        let newArray = [];
        if (this.state.snapShot.length === 0) {
            this.state.snapShot = [].concat(this.state.richData.celebrityList);
        }
        if (e.target.value === '') {
            newArray = [].concat(this.state.snapShot);
            this.state.snapShot = [];
        } else {
            this.state.snapShot.forEach(function(arrayItem) {
            for (let key in arrayItem) {
                if (key.indexOf(e.target.value) !== -1 || arrayItem[key].toString().indexOf(e.target.value) !== -1) {
                        if(newArray.indexOf(arrayItem) === -1){
                            newArray.push(arrayItem);
                        }
                    }
                }
            });
        }
        this.setState({
            richData: {
                celebrityList: newArray
            }
        });
    }
    

    changeSort(item) {
        let currentArray = [].concat(this.state.richData.celebrityList);
        let newArray = [];
        if (item.text.trim() === 'Rank') {
            newArray = currentArray.sort(function(a, b) {
                return parseFloat(a.rank) - parseFloat(b.rank);
            });
        } else if (item.text.trim() === 'Age'){
            newArray = currentArray.sort(function(a, b) {
                return parseFloat(a.age) - parseFloat(b.age);
            });
        } else {
            newArray = currentArray.sort(function(a, b) {
                var textA = a.name.toUpperCase();
                var textB = b.name.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
        }
        this.setState({
            richData: {
                celebrityList: newArray
            }
        });
    }

    render() {
        return (
            <container>
                <div className="row">
                    <div className="col-sm-4 col-sm-offset-4">
                        <div className="text-center">
                        <h1>Celebrity Rich List</h1>
                        <p>A rich list of the top 50 richest celebrities of 2014</p>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-6 col-sm-offset-3">
                        <div className="jumbotron">
                            <div className="row">
                                <div className="col-xs-4 col-xs-offset-2">
                                    <h5>Birthplace: </h5>
                                    <Dropdown title="Show All " items={this.state.uniqueCountries} onSelect={this.changeBirthplace.bind(this)}/>
                                </div>
                                 <div className="col-xs-4">
                                    <h5>Currency Converter: </h5>
                                    <Dropdown title="US Dollar " items={this.state.selectCurrencies} onSelect={this.changeCurrencies.bind(this)}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-4 col-xs-offset-2">
                                    <h5>Search: </h5>
                                    <input type="text" className="form-control" onChange={this.searchText.bind(this)}/>
                                </div>
                                 <div className="col-xs-4">
                                    <h5>Order By: </h5>
                                    <Dropdown title="Rank " items={this.state.sortOptions} onSelect={this.changeSort.bind(this)}/>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-xs-8 col-xs-offset-2">
                                   <List data={this.state.richData.celebrityList} currency={this.state.currency}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </container>
        );
    }
}