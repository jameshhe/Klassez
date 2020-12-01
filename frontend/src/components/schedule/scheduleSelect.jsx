import React from 'react';

const ScheduleSelect = ({myClass, onChange}) => {

    const updateClasses = event => {
        onChange(myClass, event.target.checked)
    }

    return (
        <div>
            <div className="form-check m-2">
                <input className="form-check-input" type="checkbox" defaultChecked={myClass.checked} onChange={event => updateClasses(event)} id={`class${myClass.title}`}/>
                <label className="form-check-label" htmlFor={`class${myClass.title}`}>
                    {myClass.title}
                </label>
            </div>
        </div>
    );
};

export default ScheduleSelect;
