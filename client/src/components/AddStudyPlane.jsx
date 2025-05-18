import dayjs from 'dayjs';
import '../App.scss';
import { useState, useEffect } from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import DropdownFilter from './DropdownFilter';
import { useUser } from '../UserContext.jsx';
import API from '../API';
import Swal from 'sweetalert2';

import { Fragment } from 'react';
import { usePage } from '../PageContext.jsx';

const Calendar = ({unselectableSlot, teachingTime, setTeachingTime }) => {

  const [selectedDate, setSelectedDate] = useState(new Date());


  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const handleDateClick = (day) => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day));
  };


  const toggleTeachingTime = (timeslot, teachingTime, selectedDate) => {
    const findIndex = [...teachingTime].findIndex(d => d[0] === timeslot && dayjs(selectedDate).isSame(d[1], 'day'));
    if (findIndex === -1) {
      const newPlan = [...teachingTime];
      newPlan.push([timeslot, dayjs(selectedDate)]);
      setTeachingTime(newPlan);
    } else {
      setTeachingTime([...teachingTime].filter(d => !(d[0] === timeslot && dayjs(selectedDate).isSame(d[1], 'day'))));
    }
  };


  //useEffect(() => {
    for (let i = 0; i < 15; i++) { //didn't counted from 0 once in a while
      const element = document.getElementById('b' + i);
      if (element) {
        element.style.backgroundColor = 'var(--bs-white)';
        element.style.color = 'var(--bs-dark)';
      }
    }

    teachingTime.filter((d) => dayjs(selectedDate).isSame(d[1],"day")).forEach(d => {
      const element = document.getElementById('b' + d[0]);
      if (element) {
        element.style.backgroundColor = '#9CBDCD';
        element.style.color = 'var(--bs-dark)';
      }
    });

    unselectableSlot.filter((d) => dayjs(selectedDate).isSame(d[1],"day")).forEach(d => {
      //console.log(d[0]);
      const element = document.getElementById('b' + d[0]);
      
      if (element) {
        element.style.backgroundColor = 'var(--bs-white)';
        element.style.color = 'var(--bs-light)';
      }
    });

  //}, [selectedDate, teachingTime, unselectableSlot]);




  const renderCalendar = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = getFirstDayOfMonth(year, month);
    const totalDays = getDaysInMonth(year, month);

    const blanks = Array(firstDay).fill(null);
    const daysInMonth = Array.from({ length: totalDays }, (_, i) => i + 1);


    const rows = [];
    let cells = [];

    blanks.forEach((_, index) => {
      cells.push(<td key={`blank-${index}`} className="blank"></td>);
    });

    daysInMonth.forEach((day) => {
      cells.push(
        <td key={day} >
          <center>
            <button className={(day === selectedDate.getDate() ? 'day selected' : 'day') + " btn btn-outline-primary width-btn"} onClick={() => handleDateClick(day)} type="button" >{day}</button>
          </center>
        </td>
      );

      if (cells.length === 7) {
        rows.push(<tr key={rows.length}>{cells}</tr>);
        cells = [];
      }
    });

    if (cells.length > 0) {
      while (cells.length < 7) {
        cells.push(<td key={`blank-${cells.length}`} className="blank"></td>);
      }
      rows.push(<tr key={rows.length}>{cells}</tr>);
    }

    let i = 0;
    while (rows.length < 6) {
      i++;
      cells = [];
      while (cells.length < 7) {
        cells.push(
          <td key={`blank-${cells.length}+${i}`} className="blank">
            <center>
              <button className={"blank btn width-btn"} type="button" >{1}</button>
            </center>
          </td>);
      }
      rows.push(<tr key={rows.length}>{cells}</tr>);
    }

    return (

      <table className="table">
        <thead>
          <tr>

            <th colSpan="7" className="month-header" scope="col">
              <center style={{ display: "inline-flex", justifyContent: "center", width: "100%" }}>
                <button onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))} type="button" className="btn btn-outline-primary">
                  &lt;
                </button>
                <h5 style={{ width: "40%" }}>
                  {months[selectedDate.getMonth()]} {selectedDate.getFullYear()}
                </h5>
                <button onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))} type="button" className="btn btn-outline-primary">
                  &gt;
                </button>
              </center>
            </th>
          </tr>
          <tr>
            {daysOfWeek.map((day) => (

              <th key={day} className="weekday" scope="col"><center>{day}</center></th>

            ))}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>

    );
  };
  const Timeslot = () => {
    return (

      <table className="table table-bordered">


        <tbody>

          <tr>
            {/**aaaahhhh style has to be changed inside a use effect with JS*/}
            <td><button type="button" id="b0" onClick={() => toggleTeachingTime(0, teachingTime, selectedDate)} className="btn btn-outline-primary max-width-btn " >   8-9   </button> </td>
            <td> <button type="button" id="b1" onClick={() => toggleTeachingTime(1, teachingTime, selectedDate)} className="btn btn-outline-primary max-width-btn " > 9-10  </button> </td>
            <td> <button type="button" id="b2" onClick={() => toggleTeachingTime(2, teachingTime, selectedDate)} className="btn btn-outline-primary max-width-btn "  > 10-11 </button> </td>
            <td> <button type="button" id="b3" onClick={() => toggleTeachingTime(3, teachingTime, selectedDate)} className="btn btn-outline-primary max-width-btn "  > 11-12 </button> </td>
            <td> <button type="button" id="b4" onClick={() => toggleTeachingTime(4, teachingTime, selectedDate)} className="btn btn-outline-primary max-width-btn "  > 12-13 </button> </td>
          </tr>
          <tr>
            <td><button type="button" id="b5" onClick={() => toggleTeachingTime(5, teachingTime, selectedDate)} className="btn btn-outline-primary max-width-btn " > 13-14    </button> </td>
            <td> <button type="button" id="b6" onClick={() => toggleTeachingTime(6, teachingTime, selectedDate)} className="btn btn-outline-primary max-width-btn "  >14-15   </button> </td>
            <td> <button type="button" id="b7" onClick={() => toggleTeachingTime(7, teachingTime, selectedDate)} className="btn btn-outline-primary max-width-btn "  >15-16   </button> </td>
            <td> <button type="button" id="b8" onClick={() => toggleTeachingTime(8, teachingTime, selectedDate)} className="btn btn-outline-primary max-width-btn "  > 16-17  </button> </td>
            <td> <button type="button" id="b9" onClick={() => toggleTeachingTime(9, teachingTime, selectedDate)} className="btn btn-outline-primary max-width-btn "  > 17-18  </button> </td>
          </tr>
          <tr>
            <td><button type="button" id="b10" onClick={() => toggleTeachingTime(10, teachingTime, selectedDate)} className="btn btn-outline-primary max-width-btn " > 18-19     </button></td>
            <td> <button type="button" id="b11" onClick={() => toggleTeachingTime(11, teachingTime, selectedDate)} className="btn btn-outline-primary max-width-btn "  >19-20   </button> </td>
            <td> <button type="button" id="b12" onClick={() => toggleTeachingTime(12, teachingTime, selectedDate)} className="btn btn-outline-primary max-width-btn " >20-21   </button> </td>
            <td> <button type="button" id="b13" onClick={() => toggleTeachingTime(13, teachingTime, selectedDate)} className="btn btn-outline-primary max-width-btn " > 21-22  </button> </td>
            <td> <button type="button" id="b14" onClick={() => toggleTeachingTime(14, teachingTime, selectedDate)} className="btn btn-outline-primary max-width-btn " > 22-23  </button> </td>
          </tr>
        </tbody>
      </table>

    )
  }


  return (
    <Row>
      <Col>
        <Row >
          <h5>Data</h5>
          {renderCalendar()}
        </Row>

        <Row className="bottom20">
          <h5>Time slots</h5>
          {Timeslot()}
        </Row>

      </Col>

    </Row>

  );
};

/* code for the right side of the page  */
function SelectedCourseTable(props) {

  const selectedRows = props.selectedRows;
  const nextDate = props.nextDate;
  const deleteTimeslot = props.deleteTimeslot;
  const { user } = useUser();

  const { page } = usePage();//page necessary to block mentor saving lesson without being registred



  const TableRow = (props) => {
    return (
      <>
        <tr><TableData Time={props.Time} Date={props.Date} Course={props.Course} /></tr>
      </>
    )
  }
  const TableData = (props) => {
    return (
      <>
        <td>{props.Date}</td>
        <td>{props.Time}</td>
        <td>{props.Course}</td>
        <td><button className='btn btn-danger' onClick={() => deleteTimeslot({ time: props.Time, date: props.Date })}>Delete</button></td>
      </>
    )
  }



  return (
    <>
      <div className='SelectedCourseBox'>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th><h4>Date</h4></th>
              <th><h4>Time</h4></th>
              <th><h4>Course</h4></th>
              <th><h4>Action</h4></th>
            </tr>
          </thead>
          <tbody>
            {selectedRows.map((row, index) => {
              for (let i of nextDate) {
                if (i === index)
                  return (
                    <Fragment key={index}>
                      <tr key={index + "new-date"}>
                        <td style={{ backgroundColor: "inherit", border: "0px", fontWeight: "bold" }}>{row.date.trim()}</td>
                        <td style={{ backgroundColor: "inherit", border: "0px", fontWeight: "bold" }}></td>
                        <td style={{ backgroundColor: "inherit", border: "0px", fontWeight: "bold" }}></td>
                        <td style={{ backgroundColor: "inherit", border: "0px", fontWeight: "bold" }}></td>
                      </tr>
                      <TableRow key={index} Time={row.time.trim()} Date={row.date.trim()} Course={row.course.trim()} />
                    </Fragment>
                  );
              }
              return <TableRow key={index} Time={row.time.trim()} Date={row.date.trim()} Course={row.course.trim()} />;
            })}


          </tbody>
        </table>{(page === 'Become a mentor') || (page === 'Change mentor schedule')? <></> :
          <center>
            <button className='btn btn-lg btn-success' onClick={() => {
              API.editTimetable(user.id, selectedRows).then((response) => {

                Swal.fire('Saved', 'Data saved successfully.', 'success');

              }).catch((error) => {
                console.log(error);
              });
            }}>Save this plan</button>
          </center>
        }
      </div>
    </>
  )
}


const AddStudyPlane = ({ selectableSubjects, selectedRows, setSelectedRows }) => {

  const [selectedTimeslot, setSelectedTimeslot] = useState([]);

  if (!(selectedRows && setSelectedRows)) {
    [selectedRows, setSelectedRows] = useState([]);
  }

  const [selectedCourse, setSelectedCourse] = useState(false);

  const [nextDate, setNextDate] = useState([]);

  const { user } = useUser();

  const userId = user.id;

  const { setPage } = usePage();

  useEffect(() => {
    setPage('Your study plan');
  }, []);



  const updateAgenda = (new_rows) => {

    if (new_rows === undefined)
      return false;
    
    new_rows = new_rows.sort((ra, rb) => {

      const ya = parseInt(ra.date.split('/')[2]);
      const yb = parseInt(rb.date.split('/')[2]);
      if (ya - yb != 0)
        return ya - yb;

      const ma = parseInt(ra.date.split('/')[1]);
      const mb = parseInt(rb.date.split('/')[1]);
      if (ma - mb != 0)
        return ma - mb;

      const da = parseInt(ra.date.split('/')[0]);
      const db = parseInt(rb.date.split('/')[0]);
      if (da - db != 0)
        return da - db;

      const ha = parseInt(ra.time.split('-')[0]);
      const hb = parseInt(rb.time.split('-')[0]);
      return ha - hb;
    });

    for (let i = 1; i < new_rows.length; i++) {
      if (new_rows[i - 1].date === new_rows[i].date)
        if (new_rows[i - 1].time === new_rows[i].time) {
          Swal.fire('Overlapping hours', '', 'error');//should be not triggered
          return false;
        }
    }

    const next = [];
    let prev_el = null;

    for (let i = 0; i < new_rows.length; i++) {
      if (!(new_rows[i].date === prev_el)) {
        next.push(i);
        prev_el = new_rows[i].date;
      }

    }

    setSelectedRows(new_rows);

    setNextDate(next);//keep track to separate date in calendar
    return true;
  }

  useEffect(() => {
    if (!userId)
      return;
    API.getTimetable(userId).then((response) => {
      updateAgenda(response);

    }).catch((error) => {
      console.log(error);
    });
  }, [userId]);

  const handleAddClick = (selectedRows, selectedTimeslot, selectedCourse) => {


    
    const new_rows = [...selectedRows];
    for (let i = 0; i < selectedTimeslot.length; i++) {
      let timeslot = selectedTimeslot[i];
      let newCourse = selectableSubjects == "available" ? "available" : selectedCourse;
      if (!newCourse) {
        Swal.fire('Missing course name.', '' , 'danger');
        return;
      }
      new_rows.push({ date: timeslot[1].format('DD/MM/YYYY'), time: (timeslot[0] + 8) + "-" + (timeslot[0] + 9), course: newCourse });
    }

    if (updateAgenda(new_rows)){
      setSelectedTimeslot([]);
    }
  };


  const Buttons = () => {
    return (
      <>
        <button className='btn btn-success' onClick={() => handleAddClick(selectedRows, selectedTimeslot, selectedCourse)}> Add </button>
        <button className='btn btn-danger' onClick={() => setSelectedTimeslot([])}> Reset </button>
      </>
    )

  }

  const deleteTimeslot = (slot) => {
    const new_rows = [...selectedRows].filter(row => (row.time != slot.time) || (row.date != slot.date));
    updateAgenda(new_rows);
    
  }






  return (
    <>
      <Row style={{ padding: "20px", backgroundColor: "hsl(60, 22%, 90%)" }} className='form-fill'>

        <Col style={{ border: '2px solid #ccc', borderRadius: '5px', padding: "20px", margin: "10px", backgroundColor: "hsl(60, 22%, 95%)" }}>

          <Calendar 
            teachingTime={selectedTimeslot} 
            setTeachingTime={setSelectedTimeslot}
            unselectableSlot={selectedRows.map((r) =>{ 
              const dateSplit = r.date.split('/');
              const dateParsed = dayjs(dateSplit.reverse().join('-'), "YYYY-MM-DD");
              return [parseInt(r.time.split("-")[0])-8, dateParsed];
            }
            )}/>

          {selectableSubjects == "available" ?
            <></> :
            <>
              <h5>Course</h5>
              <DropdownFilter
                filter={false}
                choices={selectableSubjects ? selectableSubjects.split(",") : []}
                text={selectedCourse ? selectedCourse : "Select Course"}
                handleSelect={setSelectedCourse}
              />
            </>
          }

          <div style={{ paddingTop: "20px" }}></div>
          < Buttons />


        </Col>

        <Col style={{ border: '2px solid #ccc', borderRadius: '5px', padding: "20px", margin: "10px", backgroundColor: "hsl(60, 22%, 95%)" }}>
          <SelectedCourseTable selectedRows={selectedRows} nextDate={nextDate} deleteTimeslot={deleteTimeslot} />
        </Col>
      </Row>

    </>
  );
};


export { Calendar, AddStudyPlane, SelectedCourseTable };