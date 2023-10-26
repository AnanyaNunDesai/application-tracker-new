import React, { useState, useEffect, useRef } from "react";
import "./Dropdown.css";

const Dropdown = (props) => {
    const [choice, setChoice] = useState(null);
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        // Attach the event listener when the dropdown is open
        if (open) {
            document.addEventListener("click", handleOutsideClick);
        }

        // Clean up the event listener when the dropdown is closed or component is unmounted
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, [open]);

    // Reset choice when the form is submitted
    useEffect(() => {
        if (props.formSubmitted) {
            setChoice(null);
        }
    }, [props.formSubmitted]);

    const handleToggle = () => {
        setOpen(!open);
    };

    const handleChoice = (e) => {
        const selectedStatus = e.target.innerText;
        props.setStatus(selectedStatus); // Update the status state using the prop
        setChoice(selectedStatus);
        setOpen(false);
    };

    return (
        <div className="dropdown-container" ref={dropdownRef}>
            <div className={`dropdown-toggle ${open ? 'open' : ''}`} onClick={handleToggle}>
                {choice ?? 'Status'} <div className="arrow-icon"></div>
            </div>
            {open && (
                <ul className="dropdown-menu">
                    {props.options.map((option, idx) => (
                        <li key={idx} className="dropdown-item" onClick={handleChoice}>
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dropdown;
