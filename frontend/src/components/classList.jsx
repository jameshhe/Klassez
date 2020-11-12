import React from 'react'
import './classList.css'

export const ClassList = props => <ul className='list-group'>
    
    {
        props.classes.map((x, index) => <li className='list-group-item'>
            <div>{x.name}</div>
            <div>{x.classCode}</div>
            <div>{x.professor}</div>
            <div>{x.startTime}</div>
            <div>{x.endTime}</div>
        </li>
        )
    }

    </ul>;