import React from 'react';
import './status-entry-form.css';

export default class TripEntryForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            all_dumpers: [],
            add_rows: ['excavator', 'excavator', 'excavator', 'excavator', 'excavator', 'excavator', 'excavator', 'excavator','wheel_loader', 'wheel_loader'],
            fleets: 'excavator'
        }
        this.getValue= [];
        this.downCount = 0;
        this.idleCount = 0;
        this.operationCount = 0;
    }
    addFleet(e) {
        let rows = this.state.add_rows;
        rows.push({
            fleet_type: e,
        })
        this.setState({
            add_rows: rows,
            fleet_type: e
        })
    }

    exWlOnChange(e) {
        this.setState({
            down_count: 0,
            idle_count: 0,
            operation_count: 0,
            fleets: e.target.value
        })
    }
    inputChange(e, field, index) {
        let value = {}
        if(!value[field]) {
            value[field] = {};
        }
        if(!value[field][index]) {
            value[field][index] = parseFloat(e.target.value)
        }
        this.getValue.push({
            field: field,
            index: index,
            value: parseFloat(e.target.value)
        })
        this.setState({
            value: this.getValue
        })
    }
    componentDidMount() {
        this.getFleets()
    }
    getFleets() {
        let excavatorIds = [], wheelLoaderIds = [], dumperIds = [], wheelDozerIds = ['WDJ-01'], trackDozerIds = ['TDJ-01'], motorGraderIds = ['MGJ-01'], waterSprinklerIds = ['WSJ-01'], blasHoleTopHammerIds = ['THJ-01'], blasHoleDthIds = ['DHJ-01'], explorationDrillIds=['CDJ-01'];
        for(let i = 1; i<=8; i++) {
            excavatorIds.push(
                'EXJ-220'+i
            )
        }
        for(let i = 1; i<=2; i++) {
            wheelLoaderIds.push(
                'WLJ'+i
            )
        }
        for(let i = 1; i<=20; i++) {
            dumperIds.push(
                'DUJ-220'+i
            )
        }
        let fleetData = [{
            id: 'excavator',
            name: 'Excavator',
            make: ['PC 1250-8R'],
            fleet_id: excavatorIds,
            category: ['Diesel', 'Lubrication'],
            type: ['HSD', '15W40', 'Tooth Point']
        }, {
            id: 'wheel_loader',
            name: 'Wheel Loader',
            make: ['WA-900'],
            category: ['Diesel', 'Lubrication'],
            type: ['HSD', '15W40', 'Tooth Point'],
            fleet_id: wheelLoaderIds
        }, {
            id: 'dumpers',
            name: 'Dumpers',
            make: ['HD785'],
            category: ['Diesel', 'Lubrication'],
            type: ['HSD', '15W40', 'Tooth Point'],
            fleet_id: dumperIds
        }, {
            id: 'wheel_dozer',
            name: 'Wheel Dozer',
            make: ['WD600-6R'],
            category: ['Diesel', 'Lubrication'],
            type: ['HSD', '15W40', 'Tooth Point'],
            fleet_id: wheelDozerIds
        }, {
            id: 'track_dozer',
            name: 'Track Dozer',
            make: ['D275A-5R'],
            category: ['Diesel', 'Lubrication'],
            type: ['HSD', '15W40', 'Tooth Point'],
            fleet_id: trackDozerIds
        }, {
            id: 'motor_grader',
            name: 'Motor Grader',
            make: ['GD825A-2'],
            category: ['Diesel', 'Lubrication'],
            type: ['HSD', '15W40', 'Tooth Point'],
            fleet_id: motorGraderIds
        }, {
            id: 'water_sprinkler',
            name: 'Water Sprinkler',
            make: ['HD465-7E0'],
            category: ['Diesel', 'Lubrication'],
            type: ['HSD', '15W40', 'Tooth Point'],
            fleet_id: waterSprinklerIds
        }, {
            id: 'blast_hole_drill_top_hammer',
            name: 'Blast Hole Drill (Top Hammer)',
            make: ['Epiroc- Smart ROC D65'],
            category: ['Diesel', 'Lubrication'],
            type: ['HSD', '15W40', 'Tooth Point'],
            fleet_id: blasHoleTopHammerIds
        }, {
            id: 'blast_hole_drill_dth',
            name: 'Blast Hole Drill (DTH)',
            make: ['Epiroc- Smart ROC T45'],
            category: ['Diesel', 'Lubrication'],
            type: ['HSD', '15W40', 'Tooth Point'],
            fleet_id: blasHoleDthIds
        }, {
            id: 'exploration_drill',
            name: 'Exploration Drill',
            make: ['Epiroc - Boyle C15'],
            category: ['Diesel', 'Lubrication'],
            type: ['HSD', '15W40', 'Tooth Point'],
            fleet_id: explorationDrillIds
        }]
        this.setState({
            fleet_data: fleetData
        })
    }
    getFinalArray(field) {
        let filteredObArray = []
        if(this.state.value && this.state.value.length) {
            filteredObArray = this.state.value.filter(values => values.field === field);
        }
        let finalObArray = {};
        if(filteredObArray && filteredObArray.length) {
            filteredObArray.map((data, ind) => {
                if(!finalObArray[data.index]) {
                    finalObArray[data.index] = []
                }
                if(!isNaN(data.value)) {
                    finalObArray[data.index].push(data)
                } else {
                    finalObArray[data.index].push({value: 0})
                }
            })
        }
        return finalObArray;
    }

    getSumData(field) {
        let obSum = 0;
        let obArray = this.getFinalArray(field);
        if(obArray && Object.keys(obArray).length) {
            Object.keys(obArray).map((keys) => {
                obSum += obArray[keys][obArray[keys].length - 1].value
            })
        }
        return ({
            [field]: obSum
        })
    }

    downAdd() {
        this.downCount ++;
        console.log('this.downCount', this.downCount)
        this.setState({
            down_count: this.downCount
        })
    }

    idleAdd() {
        this.idleCount ++;
        this.setState({
            idle_count: this.idleCount
        })
    }

    operationAdd() {
        this.operationCount ++;
        this.setState({
            operation_count: this.operationCount
        })
    }

    selectFleetid(e) {
        this.setState({
            down_count: 0,
            idle_count: 0,
            operation_count: 0,
            fleet_id: e.target.value
        })
    }

    render() {
        console.log('fleets', this.state.fleets)
        let downAddedRows = [], idleAddRows = [], operationAddRows = [];
        for(let i = 0; i<this.state.down_count;i++) {
            downAddedRows.push(<tr>
                <td className='destination'><input/></td>
                <td className='destination'><input type="time"/></td>
                <td className='destination'><input type="time"/></td>
                <td className='destination'></td>
            </tr>)
        }
        for(let i = 0; i<this.state.idle_count;i++) {
            idleAddRows.push(<tr>
                <td className='destination'><input/></td>
                <td className='destination'><input/></td>
                <td className='destination'><input/></td>
                <td className='destination'></td>
            </tr>)
        }
        for(let i = 0; i<this.state.operation_count;i++) {
            operationAddRows.push(<tr>
                <td className='destination'><input/></td>
                <td className='destination'><input/></td>
                <td className='destination'><input/></td>
                <td className='destination'></td>
            </tr>)
        }
        return <div id='status_entry_form'> 
            <div className='title'>Status Entry Form</div>
            <div className='table-container'>
                <table>
                    <tr className='in-header'>
                        <td className='big-cell' rowspan="2" colspan="2">
                            <select onChange={(e) => this.exWlOnChange(e)}>
                                {this.state.fleet_data?.map((r, index) => (
                                    <option value={r.id}>{r.name}</option>
                                ))}
                            </select>
                        </td>
                        <td colspan="3">
                            <select onChange={(e) => this.selectFleetid(e)}>
                                {this.state.fleet_data?.find(element => element.id === this.state.fleets)?.fleet_id?.map((fleets) => (
                                    <option value={fleets}>{fleets}</option>
                                ))}
                            </select>
                        </td>
                    </tr>
                    <tr className='in-header'>
                        <td className='big-cell'>Start Time</td>
                        <td className='big-cell'>End Time</td>
                        <td className='big-cell'>Duration</td>
                    </tr>
                    <tr>
                        <td colspan="2" className='big-cell destination'>Operator Payroll</td>
                        <td className='destination' colspan={3}><input/></td>
                    </tr>
                    <tr>
                        <td colspan="2" className='big-cell destination'>Operator Name</td>
                        <td className='destination' colspan={3}><input/></td>
                    </tr>
                    <tr>
                        <td colspan="2" className='big-cell destination'>HMR</td>
                        <td className='destination'><input/></td>
                        <td className='destination'><input/></td>
                        <td className='destination'><input/></td>
                    </tr>
                    <tr>
                        <td rowspan={downAddedRows.length + 1} className='destination'>Down <button className='button-div' onClick={()=>this.downAdd()}>+</button></td>
                    </tr>
                    {downAddedRows}
                    <tr>
                        <td rowspan={idleAddRows.length + 1} className='destination'>Idle<button className='button-div' onClick={()=>this.idleAdd()}>+</button></td>
                    </tr>
                    {idleAddRows}
                    <tr>
                        <td rowspan={operationAddRows.length + 1} className='destination'>Operation<button className='button-div' onClick={()=>this.operationAdd()}>+</button></td>
                    </tr>
                    {operationAddRows}
                    <tr>
                        <td colspan={2} className='destination'>Availability</td>
                        <td colspan={3} className='destination'></td>
                    </tr>
                    <tr>
                        <td colspan={2} className='destination'>Utilization</td>
                        <td colspan={3} className='destination'></td>
                    </tr>
                </table>
            </div>
        </div>
    }
}