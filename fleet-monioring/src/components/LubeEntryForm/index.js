import React from 'react';
import './lube-entry-form.css';

export default class LubeEntryForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            all_dumpers: [],
            add_rows: [],
            fleet_id: 'excavator',
        }
        this.getValue= [];
        this.getRowValues = [];
        this.count = 0
    }
    addFleet() {
        this.count ++;
        let rows = this.state.add_rows;
        rows.push({})
        this.setState({
            fleet_id: 'excavator',
            add_rows: rows,
        }, () => {
            this.getRowData(this.count)
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
    getRowData(index) {
        this.getRowValues.push({
            index: index,
            make: this.state.fleet_data?.find(element => element.id === this.state.fleet_id)?.make,
            fleet_id: this.state.fleet_data?.find(element => element.id === this.state.fleet_id)?.fleet_id,
            category: this.state.fleet_data?.find(element => element.id === this.state.fleet_id)?.category,
            type: this.state.fleet_data?.find(element => element.id === this.state.fleet_id)?.type,
        })
        let finalObArray = {};
        if(this.getRowValues && this.getRowValues.length) {
            this.getRowValues.map((data, ind) => {
                if(!finalObArray[data.index]) {
                    finalObArray[data.index] = []
                }
                finalObArray[data.index].push(data)
            })
        }
        let dataRow = [];
        if(finalObArray && Object.keys(finalObArray).length) {
            Object.keys(finalObArray).map((keys) => {
                dataRow.push(finalObArray[keys][finalObArray[keys].length - 1])
            })
        }
        console.log('dataRow', finalObArray, dataRow)
        this.setState({
            table_data: dataRow
        })
    }
    exWlOnChange(e, index) {
        this.setState({
            fleet_id: e.target.value,
        }, () => {this.getRowData(index+1)})
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
            input_value: this.getValue
        })
    }

    render() {
        let getRow = [];
        this.state.table_data?.map((r, index) => {
            getRow.push(
                <tr>
                    <td className='yellow-background big-cell'>
                        <select onChange={(e) => this.exWlOnChange(e,index)}>
                            {this.state.fleet_data?.map((fleets) => (
                                <option value={fleets.id}>{fleets.name}</option>
                            ))}
                        </select>
                    </td>
                    <td className='yellow-background big-cell'>
                        <select>
                            {
                                r?.make?.map((makes)=> (
                                    <option value={makes}>{makes}</option>
                                ))
                            }
                        </select>
                    </td>
                    <td>
                        <select>
                            {
                                r?.fleet_id?.map((ids)=> (
                                    <option value={ids}>{ids}</option>
                                ))
                            }
                        </select>
                    </td>
                    <td>
                        <select>
                            {
                                r?.category?.map((categories)=> (
                                    <option value={categories}>{categories}</option>
                                ))
                            }
                        </select>
                    </td>
                    <td>
                        <select>
                            {
                                r?.type?.map((types)=> (
                                    <option value={types}>{types}</option>
                                ))
                            }
                        </select>
                    </td>
                    <td><input onChange={(e)=>this.inputChange(e, 'issued_at', index)}/></td>
                    <td><input onChange={(e)=>this.inputChange(e, 'issued_by', index)}/></td>
                    <td><input onChange={(e)=>this.inputChange(e, 'amount', index)}/></td>
                    <td><input onChange={(e)=>this.inputChange(e, 'uom', index)}/></td>
                </tr>
            )
        })
        return <div id='lube_entry_form'> 
            <div className='title'>Diesel/ Lubrication Entry Form</div>
            <div className='table-container'>
                <button onClick={()=>this.addFleet()}>Add Fleets</button>
                <table>
                    <tr className='in-header'>
                        <td className='big-cell'>Type of Fleet</td>
                        <td>Make/Model</td>
                        <td>No. of Fleets</td>
                        <td>Category</td>
                        <td>Type</td>
                        <td>Issued At</td>
                        <td>Issued By</td>
                        <td>Amount</td>
                        <td>UoM</td>
                    </tr>
                    {getRow}
                </table>
            </div>
        </div>
    }
}