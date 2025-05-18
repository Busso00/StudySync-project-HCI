import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Image, InputGroup, Badge } from 'react-bootstrap';
import profileIcon from '../assets/profile.png';
import AlertBox from './AlertBox';
import API from '../API';
import { BsPencilSquare } from "react-icons/bs";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { usePage } from '../PageContext';
import { useUser } from '../UserContext';

const ProfilePage = ({isTeacher}) => {
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isReadOnly = queryParams.get('readOnly') === 'true';

  const [editingName, setEditingName] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingPhoneNumber, setEditingPhoneNumber] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [sex, setSex] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [selectedDegree, setSelectedDegree] = useState('');
  const [selectedMajor, setSelectedMajor] = useState('');

  const [selectedLanguages, setSelectedLanguages] = useState('');
  const [selectedCourses, setSelectedCourses] = useState('');

  const degrees = ['Computer Engineering', 'Architecture', 'Computer Science'];
  const universities = ['Politecnico di Torino', 'University of Turin', 'University of Milan'];
  const majors = ['Software Applications', 'Heritage', 'Network', 'Artificial Intelligence', 'Sustainability'];
  const courses = ['Software Engineering', 'Web Applications', 'HCI', 'Information Security', 'Database', 'Management of design', 'History of architecture'];
  const languages = ['Italian', 'English'];

  const { setPage } = usePage();
  const { user } = useUser();

  useEffect(()=>{
    if ( user.id == id){
      setPage('Your profile');
    }
    else{
      setPage(name+'\'s profile');
    }
  }, [name, user]);

  const navigate = useNavigate();

  useEffect(() => {
    API.getUserData(id)
        .then((userData) => {
          setName(userData.name || '');
          setEmail(userData.email || '');
          setPhoneNumber(userData.phoneNumber || '');
          setSex(userData.sex || '');
          setSelectedUniversity(userData.university || '');
          setSelectedDegree(userData.degree || '');
          setSelectedMajor(userData.major || '');
          setSelectedLanguages(userData.language || '');
          setSelectedCourses(userData.course || '');
        })
        .catch((error) => console.log(error));

      
  }, []);

  const handleSave = () => {
    if (!name || !email || !sex || sex === "" || !selectedUniversity || selectedUniversity === "" || !selectedDegree || selectedDegree === "" || !selectedMajor || selectedMajor === "" || !selectedLanguages || selectedLanguages === "" || selectedCourses.length === 0) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
      const userData = {
        name,
        email,
        sex,
        university: selectedUniversity,
        degree: selectedDegree,
        major: selectedMajor,
        language: selectedLanguages,
        course: selectedCourses,
        phoneNumber,
      };
    
      API.editUserData(id, userData)
        .then((response) => {
          Swal.fire('Saved', 'Data saved successfully.', 'success');
        }).catch((error) => {
          console.log(error);
        });
    }
  };

  const handleRemoveCourse = (courseToRemove) => {
    const updatedCourses = selectedCourses.split(',')
      .filter(course => course !== courseToRemove)
      .join(',');
    setSelectedCourses(updatedCourses);
  };  

  const handleCourseSelection = (e) => {
    const selectedCourse = e.target.value;
    const selectedCoursesSplitted = selectedCourses.split(',');
    if (selectedCourse && !selectedCoursesSplitted.includes(selectedCourse)) {
      setSelectedCourses(selectedCoursesSplitted.concat(selectedCourse).join(','));
    }
  };

  
  const handleLanguageSelection = (e) => {
    const selectedLanguage = e.target.value;
    const selectedLanguagesSplitted = selectedLanguages.split(',');
    
    if (selectedLanguage && !selectedLanguagesSplitted.includes(selectedLanguage)) {
      console.log(selectedLanguage);
      setSelectedLanguages(selectedLanguagesSplitted.concat(selectedLanguage).join(','));
    }
  };

  const handleRemoveLanguage = (languageToRemove) => {
    const updatedLanguages = selectedLanguages.split(',')
      .filter(l => l !== languageToRemove)
      .join(',');
    setSelectedLanguages(updatedLanguages);
  };  

  

  return (
    <Container>
      <Row>
        <Col md={8}>
          <Form className='profile-left'>
            <Row>
              <Col md={6} className="profile-section">
                <div className="profile-upper">
                  <Image src={profileIcon} roundedCircle />
                </div>
                <div className="profile-upper">
                  {editingName ? (
                    <InputGroup>
                      <Form.Control
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={() => setEditingName(false)}
                      />
                      <InputGroup.Text>
                      { !isReadOnly && <BsPencilSquare onClick={() => setEditingName(false)} /> }
                      </InputGroup.Text>
                    </InputGroup>
                  ) : (
                    <h3 onClick={() => !isReadOnly && setEditingName(true)}>
                      {name} { !isReadOnly && <BsPencilSquare /> }
                    </h3>
                  )}
                </div>
                <hr />
                <div className="profile-lower">
                  {editingEmail ? (
                    <InputGroup>
                      <Form.Control
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => setEditingEmail(false)}
                      />
                      <InputGroup.Text>
                      { !isReadOnly && <BsPencilSquare onClick={() => setEditingEmail(false)} /> }
                      </InputGroup.Text>
                    </InputGroup>
                  ) : (
                    <p onClick={() => !isReadOnly && setEditingEmail(true)}>
                      Email: {email} { !isReadOnly && <BsPencilSquare /> }
                    </p>
                  )}
                  {editingPhoneNumber ? (
                    <InputGroup>
                      <Form.Control
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        onBlur={() => setEditingPhoneNumber(false)}
                      />
                      <InputGroup.Text>
                      { !isReadOnly && <BsPencilSquare onClick={() => setEditingPhoneNumber(false)} /> }
                      </InputGroup.Text>
                    </InputGroup>
                  ) : (
                    <p onClick={() => !isReadOnly && setEditingPhoneNumber(true)}>
                      Phone number: {phoneNumber} { !isReadOnly && <BsPencilSquare /> }
                    </p>
                  )
                }
                 <Form.Group controlId="formSex" className="sex-select-group">
                  <Form.Label className="sex-label">Sex</Form.Label>
                  <Form.Select 
                    value={sex} 
                    onChange={(e) => setSex(e.target.value)}
                    className="sex-select"
                    disabled={isReadOnly}
                  >
                    <option value="M">M</option>
                    <option value="F">F</option>
                    <option value="Other">Other</option>
                  </Form.Select>
                </Form.Group>
                </div>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formUniversity">
                  <Form.Label>University</Form.Label>
                  <Form.Select 
                    aria-label="Select university" 
                    value={selectedUniversity} 
                    onChange={(e) => setSelectedUniversity(e.target.value)}
                    disabled={isReadOnly}
                  >
                    <option value="">Select</option>
                    {universities.map(university => (
                      <option key={university} value={university}>{university}</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group controlId="formDegree">
                  <Form.Label>Degree</Form.Label>
                  <Form.Select 
                    aria-label="Select degree"
                    value={selectedDegree} 
                    onChange={(e) => setSelectedDegree(e.target.value)}
                    disabled={isReadOnly}
                  >
                    <option value="">Select</option>
                    {degrees.map(degree => (
                      <option key={degree} value={degree}>{degree}</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group controlId="formMajor">
                  <Form.Label>Major</Form.Label>
                  <Form.Select 
                    aria-label="Select major"
                    value={selectedMajor} 
                    onChange={(e) => setSelectedMajor(e.target.value)}
                    disabled={isReadOnly}
                  >
                    <option value="">Select</option>
                    {majors.map(major => (
                      <option key={major} value={major}>{major}</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group controlId="formLanguage">
                  <Form.Label>Language</Form.Label>
                  <Form.Select 
                    aria-label="Select language"
                    onChange={handleLanguageSelection}
                    disabled={isReadOnly}
                  >
                    <option value="">Select languages</option>
                    {languages.map(language => (
                      <option key={language} value={language}>{language}</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <div>
                  {selectedLanguages.split(',').filter((l)=>l.length>0).map((language, index) => (
                    <Badge pill bg="secondary" key={index} className="me-2 mb-2">
                      {language}
                      <span 
                        className="remove-language-btn" 
                        onClick={isReadOnly?()=>{}:()=>handleRemoveLanguage(language)}
                        style={{ marginLeft: '10px', cursor: 'pointer' }}
                      >
                        ×
                      </span>
                    </Badge>
                  ))}
                </div>

                <Form.Group controlId="formCourses">
                  <Form.Label>Followed courses:</Form.Label>
                  <Form.Select 
                    aria-label="Select a course" 
                    onChange={handleCourseSelection}
                    disabled={isReadOnly}
                  >
                    <option value="">Select courses</option>
                    {courses.map(course => (
                      <option key={course} value={course}>{course}</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <div>
                  {selectedCourses.split(',').filter((c)=>c.length>0).map((course, index) => (
                    <Badge pill bg="secondary" key={index} className="me-2 mb-2">
                      {course}
                      <span 
                        className="remove-course-btn" 
                        onClick={isReadOnly?()=>{}:() => handleRemoveCourse(course)}
                        style={{ marginLeft: '10px', cursor: 'pointer' }}
                      >
                        ×
                      </span>
                    </Badge>
                  ))}
                </div>
                {
                  isTeacher?
                  <>
                    <Form.Group controlId="formCourses">
                      <Form.Label>Mentored courses:</Form.Label>
                    </Form.Group>
                    <div>
                      {user.mentorCourses.split(',').filter((c)=>c.length>0).map(item => item.split(":")[0].trim()).map((course, index) => (
                        <Badge pill bg="secondary" key={index} className="me-2 mb-2">
                          {course}
                        </Badge>
                      ))}
                    </div>
                  </>:
                  <></>
                }
                
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col md={12} className="text-center">
          <div className='save-cancel-container'>
            {!isReadOnly && (
              <Button variant='success' onClick={handleSave}>Save</Button>
            )}
            {/* <Button variant="secondary" onClick={handleCancel}>Cancel</Button> */}
            {showAlert && (
              <AlertBox 
                message="Please fill all the fields" 
                onClose={() => setShowAlert(false)}
                className={showAlert ? "show" : ""}
              />
            )}
            <Button variant='danger' onClick={()=>{
              navigate(-1);
            }}>Back</Button>
          </div>
          
              
          
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
