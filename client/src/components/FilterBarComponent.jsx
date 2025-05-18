import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import DropdownFilter from './DropdownFilter';
import { useUser } from '../UserContext';

const FilterComponent = (props) => {

  const [selectedOptions, setSelectedOptions] = useState({
    university: [],
    degree: [],
    major: [],
    course: [],
    language: [],
  });

  const { user } =useUser();
  
  const handleSelect = (key, value) => {
    setSelectedOptions(prevState => {
      const currentIndex = prevState[key].indexOf(value);
      const newSelected = [...prevState[key]];

      if (currentIndex === -1) {
        newSelected.push(value);
      } else {
        newSelected.splice(currentIndex, 1);
      }

      return {
        ...prevState,
        [key]: newSelected,
      };
    });
  };

  const renderSelectedOptions = key => (
    <div className="selected-options">
      {selectedOptions[key].map(option => (
        <span key={option} className="selected-option">

          {option}
          <button className='btn-small' key={option - "btn"} onClick={() => handleSelect(key, option)}>
            X
          </button>
        </span>

      ))}
    </div>
  );

  const resetFilters = () => {
    setSelectedOptions({
      university: [],
      degree: [],
      major: [],
      course: [],
      language: [],
    });
  };

  const height = props.height;
  const setHeight = props.setHeight;
  const searchOpen = props.searchOpen;
  const setSearchOpen = props.setSearchOpen;

  const activeFilter = props.activeFilter;
  const setActiveFilter = props.setActiveFilter;

  useEffect(() => {

    const containerElement = document.querySelector('.filter-container');
    if (containerElement) {
      const height = containerElement.offsetHeight;
      setHeight(height);
    }
  }, [selectedOptions, searchOpen]); // Run this effect once when the component mounts and on change of options


  const findPairs = () => {
    setActiveFilter({ ...selectedOptions });
  };

  const users = props.users;

  const degrees = [...new Set(users.map((u)=> u.degree.trim()).sort())];
  const universities = [...new Set(users.map((u)=> u.university.trim()).sort())];
  const majors = [...new Set(users.map((u)=> u.major.trim()).sort())];
  const courses = user.course.split(",").map(c => c.trim()).sort();
  const languages = user.language.split(",").map(l => l.trim()).sort();

  return (<>
    <Container className='filter-container' style={{ top: searchOpen ? '0px' : -height + 'px' }}>
      <h6 className='h6-padding'>Select filter to apply in order to find pairs:</h6>
      <Row>

        <Col>
          <DropdownFilter choices={universities} handleSelect={(choice) => handleSelect('university', choice)} text={'Select University'} filter={true} />
        </Col>

        <Col>
          <DropdownFilter choices={degrees} handleSelect={(choice) => handleSelect('degree', choice)} text={'Select Degree'} filter={true} />
        </Col>

        <Col>
          <DropdownFilter choices={majors} handleSelect={(choice) => handleSelect('major', choice)} text={'Select Major'} filter={true} />
        </Col>

        <Col>
          <DropdownFilter choices={courses} handleSelect={(choice) => handleSelect('course', choice)} text={'Select Course'} filter={false} />
        </Col>

        <Col>
          <DropdownFilter choices={languages} handleSelect={(choice) => handleSelect('language', choice)} text={'Select Language'} filter={false} />
        </Col>
      </Row>

      <Row>
        <Col>{renderSelectedOptions('university')}</Col>
        <Col>{renderSelectedOptions('degree')}</Col>
        <Col>{renderSelectedOptions('major')}</Col>
        <Col>{renderSelectedOptions('course')}</Col>
        <Col>{renderSelectedOptions('language')}</Col>
      </Row>

      <Row className="filter-buttons">
        <Col></Col>
        <Col></Col>
        <Col></Col>
        <Col>
          <Button variant='success' onClick={findPairs}>Find pairs</Button>
        </Col>
        <Col>
          <Button variant='danger' onClick={resetFilters}>Reset filters</Button>
        </Col>
      </Row>
      <div className="black-line"></div>
    </Container>
    <div style={{padding: "20px", width: "100%", transform: searchOpen ? "translateY(0px)" : "translateY(-" + height + "px)", transition: "transform 0.3s ease-out" }}>

      {
        Object.entries(activeFilter).filter((e) => e[1].length > 0).length == 0 ?
        <h6 className='h6-padding' >Click on 'Find pairs' to apply selected filters.</h6> :
        <h6 className='h6-padding' >Result found based on following filters:</h6>
      }
      <Button style={{ marginTop: '0px', position: "absolute", right: "20px", top: "0px", borderRadius: "0px" }} onClick={() => setSearchOpen(!searchOpen)}>{searchOpen ? 'close filter ^' : 'open filter v'}</Button>

      <Row className='h6-padding' style={{ width: "100%" }}>
        {
          Object.entries(activeFilter).filter((e) => e[1].length > 0).map((ft) => <Col md="2" key={ft[0]}>
            {ft[1].map((f) =>
              <span key={f} className="selected-option">
                {f}
              </span>
            )}
          </Col>
          )}
      </Row>
      
    </div>
  </>
  );
};

export default FilterComponent;
