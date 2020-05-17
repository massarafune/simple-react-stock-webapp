import React, {useEffect, useState} from "react";
import DatePicker, {setDefaultLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {enAU} from 'date-fns/esm/locale';
import {Button} from "reactstrap";


setDefaultLocale(enAU);

export default function StartDateFilter(props) {
    const [startDate, setStartDate] = useState(null);

    useEffect((e)=>{
        if(startDate){
            props.onSubmit(startDate);
        }
    },[startDate]);

    const resetDate = ()=>{
        props.onSubmit(null);
    }


    return (
        <div>
            <DatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
                peekNextMonth
                dateFormat="dd/MM/yyyy"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                placeholderText="Click to open calendar"
                className="calendar"
            />
            <div>
                <Button
                    onClick={()=>{
                        setStartDate("");
                        resetDate();
                    }}
                    color="warning"
                >
                    Reset Date Filtering</Button>

            </div>
        </div>

    );
}
