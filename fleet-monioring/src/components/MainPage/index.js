import React from 'react';
import './main.css';

export default class LubeEntryForm extends React.Component {
    render () {
        return <div id='main_page'>
            <div className='title'>Select Entry Form</div>
            <button onClick={()=>{
                this.props.history.push('/trip-form');
                window.location.reload()
            }}>Trip Entry Form</button>
            <button onClick={()=>{
                this.props.history.push('/lubrication-form');
                window.location.reload()
            }}>Diesel/ Lubrication Entry Form</button>
            <button>Status Entry Form</button>
        </div>
    }
}