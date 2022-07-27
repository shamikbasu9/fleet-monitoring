import React from 'react';
import './trip-entry-form.css';

export default class TripEntryForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            all_dumpers: [],
            add_rows: ['excavator', 'excavator', 'excavator', 'excavator', 'excavator', 'excavator', 'excavator', 'excavator','wheel_loader', 'wheel_loader'],
            fleet_id: null
        }
        this.getValue= []
    }
    getDumpers() {
        let dumperIds = [];
        for(let i = 1; i<=20; i++) {
            dumperIds.push(
                'DUJ-220'+i
            )
        }
        this.setState({
            dumper_id: dumperIds[0],
            all_dumpers: dumperIds
        })
    }
    getFleetIds() {
        let excavatorIds = [], wheelLoaderIds = [];
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
        this.setState({
            wheel_loader_ids: wheelLoaderIds,
            excavator_ids: excavatorIds
        })
    }
    componentDidMount() {
        this.getDumpers();
        this.getFleetIds();
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
            fleet_id: e
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

    render() {
        let dumperOptions = [];
        if(this.state.all_dumpers && this.state.all_dumpers.length) {
            for(let i = 0; i<=this.state.all_dumpers.length - 1; i++) {
                dumperOptions.push(
                    <option value={this.state.all_dumpers[i]}>{this.state.all_dumpers[i]}</option>
                )
            }
        }
        let getExWlIdsOption = [];
        if(this.state.fleet_type === 'excavator') {
            if(this.state.excavator_ids && this.state.excavator_ids.length) {
                for(let i = 0; i<=this.state.excavator_ids.length - 1; i++) {
                    getExWlIdsOption.push(
                        <option value={this.state.excavator_ids[i]}>{this.state.excavator_ids[i]}</option>
                    )
                }
            }
        } else {
            if(this.state.wheel_loader_ids && this.state.wheel_loader_ids.length) {
                for(let i = 0; i<=this.state.wheel_loader_ids.length - 1; i++) {
                    getExWlIdsOption.push(
                        <option value={this.state.wheel_loader_ids[i]}>{this.state.wheel_loader_ids[i]}</option>
                    )
                }
            }
        }
        return <div id='trip_entry_form'> 
            <div className='title'>Trip Entry Form</div>
            <div className='table-container'>
                <table>
                    <tr className='in-header'>
                        <th className='no-cell' colspan={3}></th>
                        <th>Dumper Id</th>
                        <th className='yellow-background' colspan={11}>
                            <select>
                                {dumperOptions}
                            </select>
                        </th>
                    </tr>
                    <tr className='in-header'>
                        <td className='no-cell' colspan={3}></td>
                        <td>Category</td>
                        <td colSpan={2}>Production</td>
                        <td colSpan={9}>Rehandle</td>
                    </tr>
                    <tr className='in-header'>
                        <td colspan="2">Loading Point</td>
                        <td className='big-cell' rowspan="2">
                            Fleet
                            {/* <div>
                                <button className='fleet-btn' onClick={() => this.addFleet('excavator')}>Add Excavator</button>
                                <button className='fleet-btn' onClick={() => this.addFleet('wheel_loader')}>Add Wheel Loader</button>
                            </div> */}
                        </td>
                        <td>Source</td>
                        <td colspan={2}>Face</td>
                        <td colSpan={3}>Screen</td>
                        <td colSpan={3}>Crusher</td>
                        <td colSpan={3}>Stock</td>
                    </tr>
                    <tr className='in-header'>
                        <td className='big-cell'>Block</td>
                        <td className='big-cell'>Location</td>
                        <td className='big-cell'>EX/WL ID</td>
                        <td>OB</td>
                        <td>ROM</td>
                        <td>Fines</td>
                        <td>10*30</td>
                        <td>OTH</td>
                        <td>Fines</td>
                        <td>10*30</td>
                        <td>OTH</td>
                        <td>Fines</td>
                        <td>10*30</td>
                        <td>OTH</td>
                    </tr>
                    {this.state.add_rows?.map((r, index) => (
                      <tr>
                            <td className='big-cell'><input/></td>
                            <td className='big-cell'><input/></td>
                            <td className='big-cell destination'>{r === 'excavator' ? 'Excavator' : 'Wheel Loader'}</td>
                            <td className='yellow-background big-cell'>
                                <select onChange={(e) => this.exWlOnChange(e)}>
                                    {r === 'excavator' ? this.state.excavator_ids?.map((exids) => 
                                         <option value={exids}>{exids}</option>
                                    ) : this.state.wheel_loader_ids?.map((wlids) => 
                                        <option value={wlids}>{wlids}</option>
                                     )}
                                </select>
                            </td>
                            <td><input onChange={(e)=>this.inputChange(e, 'ob', index)} type="number"/></td>
                            <td><input onChange={(e)=>this.inputChange(e, 'rom', index)} type="number"/></td>
                            <td><input onChange={(e)=>this.inputChange(e, 'screen_fines', index)} type="number"/></td>
                            <td><input onChange={(e)=>this.inputChange(e, 'screen_1030', index)} type="number"/></td>
                            <td><input onChange={(e)=>this.inputChange(e, 'screen_oth', index)} type="number"/></td>
                            <td><input onChange={(e)=>this.inputChange(e, 'crusher_fines', index)} type="number"/></td>
                            <td><input onChange={(e)=>this.inputChange(e, 'crusher_1030', index)} type="number"/></td>
                            <td><input onChange={(e)=>this.inputChange(e, 'crusher_oth', index)} type="number"/></td>
                            <td><input onChange={(e)=>this.inputChange(e, 'stock_fines', index)} type="number"/></td>
                            <td><input onChange={(e)=>this.inputChange(e, 'stock_1030', index)} type="number"/></td>
                            <td><input onChange={(e)=>this.inputChange(e, 'stock_oth', index)} type="number"/></td>
                      </tr>
                    ))}
                    <tr>
                        <td colSpan={3} className='no-cell'></td>
                        <td className='total'>Total</td>
                        <td className='total'>{this.getSumData('ob') && this.getSumData('ob').ob > 0 ? this.getSumData('ob').ob : ''}</td>
                        <td className='total'>{this.getSumData('rom') && this.getSumData('rom').rom > 0 ? this.getSumData('rom').rom : ''}</td>
                        <td className='total'>{this.getSumData('screen_fines') && this.getSumData('screen_fines').screen_fines > 0 ? this.getSumData('screen_fines').screen_fines : ''}</td>
                        <td className='total'>{this.getSumData('screen_1030') && this.getSumData('screen_1030').screen_1030 > 0 ? this.getSumData('screen_1030').screen_1030 : ''}</td>
                        <td className='total'>{this.getSumData('screen_oth') && this.getSumData('screen_oth').screen_oth > 0 ? this.getSumData('screen_oth').screen_oth : ''}</td>
                        <td className='total'>{this.getSumData('crusher_fines') && this.getSumData('crusher_fines').crusher_fines > 0 ? this.getSumData('crusher_fines').crusher_fines : ''}</td>
                        <td className='total'>{this.getSumData('crusher_1030') && this.getSumData('crusher_1030').crusher_1030 > 0 ? this.getSumData('crusher_1030').crusher_1030 : ''}</td>
                        <td className='total'>{this.getSumData('crusher_oth') && this.getSumData('crusher_oth').crusher_oth > 0 ? this.getSumData('crusher_oth').crusher_oth : ''}</td>
                        <td className='total'>{this.getSumData('stock_fines') && this.getSumData('stock_fines').stock_fines > 0 ? this.getSumData('stock_fines').stock_fines : ''}</td>
                        <td className='total'>{this.getSumData('stock_1030') && this.getSumData('stock_1030').stock_1030 > 0 ? this.getSumData('stock_1030').stock_1030 : ''}</td>
                        <td className='total'>{this.getSumData('stock_oth') && this.getSumData('stock_oth').stock_oth > 0 ? this.getSumData('stock_oth').stock_oth : ''}</td>
                    </tr>
                    <tr>
                        <td className='destination' rowspan={6} colspan={3}>Destination/Unloading Point</td>
                    </tr>
                    <tr>
                        <td className='destination'>Dump</td>
                        <td><input type="number"/></td>
                        <td><input type="number"/></td>
                        <td><input type="number"/></td>
                        <td><input type="number"/></td>
                        <td><input type="number"/></td>
                        <td><input type="number"/></td>
                        <td><input type="number"/></td>
                        <td><input type="number"/></td>
                        <td><input type="number"/></td>
                        <td><input type="number"/></td>
                        <td><input type="number"/></td>
                    </tr>
                    <tr>
                        <td className='destination'>Screen</td>
                        <td><input type="number"/></td>
                        <td><input type="number"/></td>
                        <td><input type="number"/></td>
                        <td><input type="number"/></td>
                        <td><input type="number"/></td>
                        <td><input type="number"/></td>
                        <td><input type="number"/></td>
                        <td><input type="number"/></td>
                        <td><input type="number"/></td>
                        <td><input type="number"/></td>
                        <td><input type="number"/></td>
                    </tr>
                    <tr>
                        <td className='destination'>Crusher</td>
                        <td><input type="number"/></td>
                        <td><input type="number"/></td>
                        <td><input type="number"/></td>
                        <td><input type="number"/></td>
                        <td><input type="number"/></td>
                        <td><input type="number"/></td>
                        <td><input type="number"/></td>
                        <td><input type="number"/></td>
                        <td><input type="number"/></td>
                        <td><input type="number"/></td>
                        <td><input type="number"/></td>
                    </tr>
                    <tr>
                        <td className='destination'>Stock</td>
                        <td><input type="number"/></td>
                        <td><input type="number"/></td>
                        <td><input type="number"/></td>
                        <td><input type="number"/></td>
                        <td><input type="number"/></td>
                        <td><input type="number"/></td>
                        <td><input type="number"/></td>
                        <td><input type="number"/></td>
                        <td><input type="number"/></td>
                        <td><input type="number"/></td>
                        <td><input type="number"/></td>
                    </tr>
                    <tr>
                        <td className='destination'>Stack</td>
                        <td><input type="number"/></td>
                        <td><input type="number"/></td>
                        <td><input type="number"/></td>
                        <td><input type="number"/></td>
                        <td><input type="number"/></td>
                        <td><input type="number"/></td>
                        <td><input type="number"/></td>
                        <td><input type="number"/></td>
                        <td><input type="number"/></td>
                        <td><input type="number"/></td>
                        <td><input type="number"/></td>
                    </tr>
                </table>
            </div>
        </div>
    }
}