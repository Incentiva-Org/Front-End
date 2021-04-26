import React, { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules = {
    toolbar: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        ['link', 'image', 'video'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'align': [] }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    ],
}

const QuillEditor = () => {
    

    const [value, setValue] = useState('');

    return (
        <div>
            <ReactQuill
                value={value} 
                onChange={setValue} 
                modules={modules} 
                placeholder="New Note"
            />
        </div>
    );
}

export default QuillEditor