import React, {Component, Fragment} from 'react';
import './Stats.css'

class Stats extends Component {
    render() {
        return (
            <Fragment>
                <h1>Stat Calculator</h1>
                <div id="head">
                    <label for="head-stat-select"> Head </label>
                    <select id="head-stat-select" defaultValue="default">
                        <option value="default" disabled> Select </option>
                        <option value="1" > 1 </option>
                        <option value="2"> 2 </option>
                    </select>
                </div>
                <div id="chest">
                    <label htmlFor="chest-stat-select"> Chest </label>
                    <select id="chest-stat-select" defaultValue="default">
                        <option value="default" disabled> Select</option>
                        <option value="1"> 1</option>
                        <option value="2"> 2</option>
                    </select>
                </div>
                <div id="gloves">
                    <label for="gloves-stat-select"> Gloves </label>
                    <select id="gloves-stat-select" defaultValue="default">
                        <option value="default" disabled> Select </option>
                        <option value="1" > 1 </option>
                        <option value="2"> 2 </option>
                    </select>
                </div>
            </Fragment>
        )
    }
}

export default Stats;
