import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import 'react-quill/dist/quill.core.css';
import 'react-quill/dist/quill.bubble.css';

const Editor: React.FC = () => {
    const [editorHtml, setEditorHtml] = useState<string>('');

    const handleChange = (html: string) => {
        setEditorHtml(html);
    };

    return (
        <div className="mx-8  h-full  ">
            <ReactQuill
                theme="snow"
                className=" h-full font-circular pb-12"
                value={editorHtml}
                onChange={handleChange}
                modules={{
                    toolbar: [
                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                        [{ 'font': [] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ 'color': [] }, { 'background': [] }],
                        [{ 'align': [] }],
                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                        ['link', 'image', 'video'],
                        ['blockquote', 'code-block'],
                        ['clean']
                    ]
                }}
                formats={[
                    'header', 'font', 'size',
                    'bold', 'italic', 'underline', 'strike', 'blockquote',
                    'list', 'bullet', 'indent',
                    'link', 'image', 'video', 'code-block', 'align', 'color', 'background'
                ]}

            />
        </div>
    );
}

export default Editor;
