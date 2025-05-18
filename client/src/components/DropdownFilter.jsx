import React, { useState } from 'react';
import { ButtonGroup } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    const [value, setValue] = useState('');

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <Form.Control
          autoFocus
          className="mx-3 my-2"
          style={{ width: "calc(100% - 2rem)" }}
          placeholder="Type to filter..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child) =>
              !value || child.props.children.toLowerCase().startsWith(value.toLowerCase()),
          )}
        </ul>
      </div>
    );
  },
);

function DropdownFilter(props) {

  const text = props.text;

  const choices = props.choices;

  const handleSelect = props.handleSelect;

  const filter = props.filter;

  const overrideStyle = props.overrideStyle;

  return (
    <Dropdown as={ButtonGroup} className='dropdown-list' style={overrideStyle}>

      <Dropdown.Toggle className='dropdown-filter' style={overrideStyle}>
        {text}
      </Dropdown.Toggle>

      {filter ?
        <Dropdown.Menu as={CustomMenu} style={{maxHeight:"260px", overflowY:"scroll"}}>
          {choices.map((choice) => (
            <Dropdown.Item key={choice} onClick={() => handleSelect(choice)}>
              {choice}
            </Dropdown.Item>
          ))}
          
        </Dropdown.Menu> :
        <Dropdown.Menu>
          {choices.map((choice) => (
            <Dropdown.Item key={choice} onClick={() => handleSelect(choice)}>
              {choice}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      }
    </Dropdown>
  );
}

export default DropdownFilter;