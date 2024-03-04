import styles from '../styles/AddedResourceList.module.css';
import ResourceInput from './ResourceInput';
import { useState, useEffect } from 'react';

export default function AddedResourcesList({ addedResources, setAddedResources }) {
    const [openDropdown, setOpenDropdown] = useState({}); // State to manage opening the dropdown clicked on.
    const [edit, setEdit] = useState(true); // State to manage whether the inout field is editable or not.



    // Initializing the openDropdown with the added resources, and setting them all to closed.
    useEffect(() => {
        const openDropdowns = [];
        addedResources.forEach(({ id }) => {
            openDropdowns[id] = false;
            setOpenDropdown(openDropdowns);
        });
    }, [addedResources]);


    // Function to update the dropdown to open or closed based on is current state.
    const handleClick = (id) => {
        setOpenDropdown(prev => {
            const updatedDropdowns = [...prev];
            updatedDropdowns[id] = !updatedDropdowns[id];
            return updatedDropdowns;
        });
    };

    // Function that handles removal of resource from list, and setting the edit state to the opposite making the input able to edit.
    const handleSubmit = (buttontext, id) => {
        if (buttontext === 'Remove') {
            setAddedResources(prev => prev.filter(resource => resource.id !== id));
        } else {
            setEdit(!edit);
        }
        
    }

    // Returning a list where each point is a dropdown button for a resource, and the dropdown contains the input field either editable or not.
    return (
        <ul style={{ padding: '0em', margin: '0em' }}>

            {/* Going through the list and making a list point for each resource */}
            {addedResources.map(({ resourceText, id, formData }) => (

                <li key={id} className={styles.li} style={{
                    height: openDropdown[id] ? '80vh' : '10vh'
                }}>

                    {/* Dropdown button*/}
                    <button className={styles.dropdownBtn} onClick={() => handleClick(id)}>
                        <h6>{resourceText}</h6>
                        <p>{ openDropdown[id]? '\u2BC5' : '\u2BC6'}</p>
                    </button>

                    {/* Dropdown content*/}
                    <div style={{
                        display: openDropdown[id] ? 'grid' : 'none',
                        zIndex: openDropdown[id] ? '1000' : '-1',
                        height: '80vh',
                        padding: '0em',
                        position: 'relative'
                    }}>
                        <ResourceInput resourceText={resourceText} resourceFormData={formData} resourceID={id} edit={edit} handleSubmit={handleSubmit} />
                    </div>

                </li>

            ))}

        </ul>
    );
}