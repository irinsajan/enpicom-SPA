//the dropdown menu component using reactstrap
import React, { useState } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './DropDown.css';

function Dropdown(props) {
    
    const [dropdownOpen, setOpen] = useState(false);
    const toggle = () => setOpen(!dropdownOpen); 
    

    return(
        <div className="Drop">
            <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret>{props.title}</DropdownToggle>
                <DropdownMenu>
                    <DropdownItem onClick={() => props.sendData("J Score")}>J Score</DropdownItem>
                    <DropdownItem onClick={() => props.sendData("V Score")}>V Score</DropdownItem>
                    <DropdownItem onClick={() => props.sendData("Receptor Average Quality")}>Receptor Average Quality</DropdownItem>
                    <DropdownItem onClick={() => props.sendData("Sequence Count")}>Sequence Count</DropdownItem>
                </DropdownMenu>
            </ButtonDropdown>
        </div>
    );
}

export default Dropdown;