import React, { useState } from 'react';
import { Container, Row, Col, Button, ButtonGroup } from 'react-bootstrap';

const WeekCalendar = (props) => {

    const timeslotN = props.timeslotN;    
    const [selectedSlots, setSelectedSlots] = useState([]);

    const dayWeekName = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];//no DB

    let timeslots = [];
    if (timeslotN == 48*7){
        timeslots = Array.from({ length: 48 * 7 }, (_, index) => {
            const hour = Math.floor(Math.floor(index / 7) / 2);
            const minute = Math.floor(index / 7) % 2 === 0 ? '00' : '30';
            const time = `${hour.toString().padStart(2, '0')}:${minute}`;
        
            return { time, selected: selectedSlots.includes(index) };
        });
    }else if (timeslotN == 24*7){
        timeslots = Array.from({ length: 24 * 7 }, (_, index) => {
            const hour = Math.floor(Math.floor(index / 7));
            const minute = '00';
            const time = `${hour.toString().padStart(2, '0')}:${minute}`;
        
            return { time, selected: selectedSlots.includes(index) };
        });
    }else {
        timeslots = Array.from({ length: 15 * 7 }, (_, index) => {
            const hour = Math.floor(Math.floor(index / 7))+8;
            const minute = '00';
            const time = `${hour.toString().padStart(2, '0')}:${minute}`;
        
            return { time, selected: selectedSlots.includes(index) };
        });
    }
    
    const handleSlotClick = (index) => {
        if (selectedSlots.includes(index)) {
            setSelectedSlots(selectedSlots.filter((slot) => slot != index));
        } else {
            setSelectedSlots([...selectedSlots, index]);
        }
    };

    function Table(props) {

        const timeslots = props.timeslots;

        const rowV = [];
        for (let i = 0; i < timeslots.length / 7; i++) {
            const cellV = [];
            cellV.push(<Col key={-1 + "" + i + "-row"} style={{ border: '1px solid #ccc', padding: '0' }}>{timeslots[i * 7].time}</Col>)
            for (let j = 0; j < 7; j++) {
                let slot = timeslots[i * 7 + j];
                cellV.push(
                    <Col key={j + "" + i + "-row"} style={{ border: '1px solid #ccc', padding: '0' }}>
                        <Button
                            key={`${j}-${slot.time}`}
                            variant={slot.selected ? 'success' : 'light'}
                            className="time-slot w-100 h-100"
                            onClick={() => handleSlotClick(i * 7 + j)}
                        >
                        </Button>
                    </Col>)
            }
            rowV.push(
                <Row key={i} style={{ borderBottom: '1px solid #ccc' }}>
                    {cellV.map(cell => cell)}
                </Row>
            );
        }
        return rowV.map(row => row);
    }

    return (

        <Container style={{ border: '2px solid #ccc', borderRadius:"5px"}}>

            <Row style={{ border: '1px solid #ccc' }}>
                <Col style={{ border: '1px solid #ccc' }}></Col>
                {Array.from({ length: 7 }).map((_, dayIndex) =>
                    <Col key={dayIndex} style={{ border: '1px solid #ccc' }}>
                        <h4>{dayWeekName[dayIndex]}</h4>
                    </Col>
                )}
            </Row>
            <Table timeslots={timeslots} />
        </Container>


    );
};

export default WeekCalendar;
