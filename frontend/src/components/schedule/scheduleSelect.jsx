import React from 'react';

const ScheduleSelect = ({classes, onChange}) => {

    const updateClasses = event => {
        console.log(event.target.checked)
        // classes.map(
        //     ele => ele.title === myClass.title ? {...ele, checked: false} : ele
        // )
        // console.log(classes)
        // onChange(classes)
    }

    return (
        <div>
            <form className="form-group">
                {
                    classes.map((myClass, index) =>
                        <div className="form-check m-2" key={index}>
                            <input className="form-check-input" type="checkbox" checked={myClass.checked} onChange={event => updateClasses(event)} id={`class${index}`}/>
                            <label className="form-check-label" htmlFor={`class${index}`}>
                                {myClass.title}
                            </label>
                        </div>
                    )
                }

            </form>
        </div>
    );
};

export default ScheduleSelect;
