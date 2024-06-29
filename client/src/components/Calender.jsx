import React from 'react'
import Calendar from 'react-calendar';
import { useState } from 'react';

function Calender() {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const onChange = (date) => {
      setSelectedDate(date);
    };
  
    return (
        <div>
            <Calendar onChange={onChange} value={selectedDate} />
        </div>
    );
}

export default Calender

