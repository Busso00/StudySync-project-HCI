import { Col, Row, Form, Button, Card } from 'react-bootstrap';
import React, { useState, useRef, useEffect } from 'react';
import DropdownFilter from './DropdownFilter';
import { AddStudyPlane } from './AddStudyPlane';
import { useUser } from '../UserContext.jsx';
import API from '../API';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { usePage } from '../PageContext.jsx';

//static
const years = ["1", "2", "3", "4", "5+", "graduated"];

function ChangeMentorSchedule(props) {

    //get from DB
    const courses = [ 
        "Computer architectures", 
        "Software engeneering", 
        "Advanced machine learning",
        "HCI",
        "Web Applications",
        "Calculus 1", 
        "Calculus 2", 
        "Calculus 3",
        "Object Orineted Programming",
        "Digital Marketing",
        "Color Psychology",
        "Informatics",
        "Italian Language",
        "French Language",
        "English Language",
        "Spanish Language",
        "Chinese Language",
        "History of Modern Art",
        "History of Contemporary Art",
        "Physics 1",
        "Physics 2",
        "Quantum Physics",
        "Communication",
        "History of Music",
        "Law for Businnes",
        "Biology",
        "Organical Chemistry",
        "Businness Administration",
        "Materials Science",
        "Information Security",
        "History of architecture",
        "Management of design"
    ].sort();

    const { user, setUser } = useUser();

    const [newCourse, setNewCourse] = useState("");
    const [newGrade, setNewGrade] = useState("");
    const [newYear, setNewYear] = useState(-1);

    const setIsTeacher = props.setIsTeacher;

    const navigate = useNavigate();

    function Teaches(id, grade) {
        this.id = id;
        this.grade = grade;
    }

    const { setPage } = usePage();

    const [newTeachings, setNewTeachings] = useState([]); //props.userTeachings

    useEffect(() => {
        setPage('Change mentor schedule');
        //newTeachings.map(t => courses[t.id] + ":" + t.grade).join(", ")
        setNewTeachings(user.mentorCourses.split(',').map(t=>new Teaches(courses.indexOf(t.split(':')[0].trim()),parseInt(t.split(':')[1]))));
        setNewYear(user.year);

    }, []);

    
    const [selectedRows, setSelectedRows] = useState([]);

    function handleSubmitCourse(event) {
        event.preventDefault();

        if (!newCourse) {
            Swal.fire('Missing course name.', '', 'error');
        } else if (!newGrade) {
            Swal.fire('Missing course grade.', '', 'error');
        } else if (newGrade > 100 || newGrade < 0) {
            Swal.fire('Invalid course grade.', '', 'error');
        } else {
            const newCourseId = courses.indexOf(newCourse);
            const nextNewTeachings = [...newTeachings, new Teaches(newCourseId, newGrade)];
            setNewTeachings(nextNewTeachings);
        }
    }


    //similar to user card in style //fine, i will put also the grade
    function CourseCard(props) {
        const teaching = props.teaching;
        const index = props.index;
        return (
            <Card className="user-card">
                <h5>{courses[teaching.id]}</h5>
                <h6>{teaching.grade}</h6>
                <div style={{paddingTop:"60px"}}></div>
                <div className='buttons'>
                    <Button variant="danger" className="btn-custom" onClick={() => {
                        const nextNewTeachings = [...newTeachings].filter((teaching, i) => i != index);
                        setNewTeachings(nextNewTeachings);
                    }}><span>Remove Course</span></Button>
                </div>
            </Card>

        );
    }

    //handle scroll and enable/disable buttons
    const scrollContainer = useRef(null);

    const [isLeftButtonDisabled, setLeftButtonDisabled] = useState(true);
    const [isRightButtonDisabled, setRightButtonDisabled] = useState(newTeachings.length <= 3);

    const handleScroll = (direction) => {
        if (scrollContainer.current && scrollContainer.current.firstChild) {
            const cardWidth = scrollContainer.current.firstChild.getBoundingClientRect().width;
            const cardMargin = parseFloat(getComputedStyle(scrollContainer.current.firstChild).marginRight);
            const cardBorder = parseFloat(getComputedStyle(scrollContainer.current.firstChild).borderRightWidth) * 2;
            const currentScrollPosition = scrollContainer.current.scrollLeft;
            const newScrollPosition = direction === 'left'
                ? Math.max(currentScrollPosition - cardWidth - 2 * cardMargin - 2 * cardBorder, 0)
                : Math.min(currentScrollPosition + cardWidth + 2 * cardMargin + 2 * cardBorder, scrollContainer.current.scrollWidth - scrollContainer.current.clientWidth);
            scrollContainer.current.scrollTo({ left: newScrollPosition, behavior: 'smooth' });

            setLeftButtonDisabled(newTeachings.length <= 3 || (scrollContainer.current && newScrollPosition === 0));
            setRightButtonDisabled(newTeachings.length <= 3 || (scrollContainer.current && newScrollPosition >= scrollContainer.current.scrollWidth - scrollContainer.current.clientWidth - cardWidth));
        }
    };

    let prevLen = 0;

    useEffect(() => {
        // Measure the height of the fixed navbar and update the state to make all content of the page start with padding= navbar height
        if (prevLen != newTeachings.length) {
            const cardWidth = scrollContainer.current.firstChild.getBoundingClientRect().width;
            const currentScrollPosition = scrollContainer.current.scrollLeft;

            setLeftButtonDisabled(newTeachings.length <= 3 || (scrollContainer.current && currentScrollPosition === 0));
            setRightButtonDisabled(newTeachings.length <= 3 || (scrollContainer.current && currentScrollPosition >= scrollContainer.current.scrollWidth - scrollContainer.current.clientWidth - cardWidth));

        }
        prevLen = newTeachings.length;

    }, [newTeachings]); // Run this effect once when the component mounts

    //course error message


    const changeMentorData = () => {

        if (newYear === -1) {
            Swal.fire('Missing academic year', '', 'danger');
            return;
        }

        if (newTeachings.length === 0) {
            Swal.fire('Missing course to teach', '', 'danger');
            return;
        }

        //teaching hours can be defined later
        
        API.modifyMentorData(user.id, { year: newYear, courses: newTeachings.map(t => courses[t.id] + ":" + t.grade).join(", ") }).then((response) => {
            API.editTimetable(user.id, selectedRows).then((response) => {
                API.getMentorsData().then((data) => {

                    const mentor = data.filter(d => d.uid === user.id)[0];
                    if (mentor) {
                        setUser({ ...user, ...mentor });
                        setIsTeacher(true);
                        Swal.fire('Teaching schedule successfully saved!', '', 'success');
                        navigate('/Home');
                    }

                }).catch((error) => {
                    console.log(error);
                });
            
            }).catch((error) => {
                console.log(error);
            });
        }).catch((error) => {
            console.log(error);
        });
    
    };

    //main component
    return (
        <Row style={{ padding: "20px" }} className='form-fill'>

            <Col >
                <Row className='bottom20'>

                    <h2>Your academic year</h2>

                    <Col>
                        <DropdownFilter choices={years} handleSelect={(choice) => setNewYear(choice)} text={newYear === -1 ? 'Select your academic year' : newYear} filter={false} overrideStyle={{ marginTop: "0px", textAlign: "left" }} />
                    </Col>

                </Row>

                <Form onSubmit={handleSubmitCourse} style={{ border: '2px solid #ccc', borderRadius: '5px', padding: "20px", backgroundColor: "hsl(60, 22%, 95%)" }} className='bottom20'>



                    <h2>Add course to teach</h2>

                    <Row className='bottom20'>
                        <h5>Course</h5>
                        <Col>
                            <DropdownFilter choices={courses} handleSelect={(choice) => setNewCourse(choice)} text={newCourse === "" ? 'Select Course' : newCourse} filter={true} overrideStyle={{ marginTop: "0px", textAlign: "left" }} />
                        </Col>
                    </Row>
                    <Row className='bottom20'>
                        <h5>Course grade</h5>
                        <Col style={{ minWidth: "95%" }}>
                            <Form.Control type="number" min="0" max="100" onChange={ev => setNewGrade(Math.min(100, Math.max(0, parseInt(ev.target.value))))} value={newGrade} placeholder={100} />
                        </Col>
                        <Col style={{ paddingTop: "5px" }}>
                            <b>
                                /100
                            </b>
                        </Col>
                    </Row>


                    <Row>
                        <Col md="12">
                            <Button type="submit" variant="success">Add course</Button>
                        </Col>
                    </Row>



                </Form>


                {newTeachings.length >= 4 ?
                    <div className="user-list-container" style={{ position: "relative" }}>
                        <button
                            className="scroll-arrow left"
                            onClick={() => handleScroll('left')}
                            disabled={isLeftButtonDisabled}>
                            &#9664;
                        </button>
                        <div>
                            <div className="user-cards-container" ref={scrollContainer}>
                                {newTeachings.map((teaching, i) => <CourseCard key={"card-" + i} teaching={teaching} index={i} />)}
                            </div>
                        </div>
                        <button
                            className="scroll-arrow right"
                            onClick={() => handleScroll('right')}
                            disabled={isRightButtonDisabled}>
                            &#9654;
                        </button>
                    </div>
                    :
                    <div>
                        <div className="user-cards-container" ref={scrollContainer}>
                            {newTeachings.map((teaching, i) => <CourseCard key={"card-" + i} teaching={teaching} index={i} />)}
                        </div>
                    </div>}

                <Form style={{ border: '2px solid #ccc', borderRadius: '5px', padding: "20px", backgroundColor: "hsl(60, 22%, 95%)" }} className='bottom20'>

                    <h2>Your mentorship plan</h2>
                    <AddStudyPlane selectableSubjects={"available"} selectedRows={selectedRows} setSelectedRows={setSelectedRows} />
                </Form>


                <Row>
                    <Col md="12">
                        {user.mid ?
                            <Button type="submit" variant="success" onClick={changeMentorData}>Save your mentor info</Button>:
                            <Button type="submit" variant="success" onClick={() => Swal.fire('NOT IMPLEMENTED', '', 'error')}>Become a mentor</Button> 
                        }
                    </Col>
                </Row>
            </Col>

        </Row>
    );
}

export default ChangeMentorSchedule;