
import React, { useState, useEffect, useRef } from 'react';


const AddressEdit = ({ setAddress, setEdited }) => {
    const [content, setContent] = useState();
   
    const formRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const containsAlphabet = /[A-Za-z]/.test(content);

        if (!containsAlphabet) {
            alert("TODO should contain alphanumeric character.");
            return;
        }
        setAddress(content);
        setEdited(false);
    };

    const handleCancel = () => {
        setEdited(false);
    };

    useEffect(() => {
        console.log(formRef,'formref');
        const handleClickOutside = (e) => {
            if (formRef.current && !formRef.current.contains(e.target)) {
                handleCancel();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="edit-form-overlay">
            <div className="edit-form" ref={formRef}>
                <form onSubmit={handleSubmit}>
                    <input className='bg-slate-300 overflow-hidden'
                        type="text"
                        onChange={(e) => setContent(e.target.value)}
                        id="todobox"
                        title="Please enter only letters, numbers, or spaces."
                        required
                    />
                   <button className='edit-btns' data-action='edit' type="submit">☑️</button>
                </form>
            </div>
        </div>
    );
};

export default AddressEdit;




/*import React, { useState } from 'react';
import { useGlobalContext } from '../context';

const EditForm = ({todo,setEdited}) => {
    console.log(todo);
    const [content,setContent]=useState(todo.content);
    const {UpdateTask}=useGlobalContext();
 
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);
        UpdateTask({ ...todo, content: content });
        setEdited(false);
    }


  return (
    <>
        <div className="edit-form-overlay">
            <div className="edit-form">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        id="todobox"
                        title="Please enter only letters, numbers, or spaces."
                        required
                    />
                    <button className='edit-btns' data-action='edit' type="submit">☑️</button>
                  
                  
                </form>
            </div>
        </div>
    </>
  )
}

export default EditForm
*/