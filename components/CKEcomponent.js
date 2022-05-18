
//https://dev.to/devzversity/how-to-add-ckeditor5-in-your-next-js-react-app-1be7

import { useEffect, useRef } from "react";

export default function Editor({ onChange, editorLoaded, name, value }) {
  const editorRef = useRef();
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const editorConfiguration = {
    toolbar: [ 'bold', 'italic','link']
  };              

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic")
    };
  }, []);

  return (
    <div>
      {editorLoaded ? (
        <CKEditor
          type=""
          name={name}
          editor={ClassicEditor}
          config={ editorConfiguration }
          data={value}
          onChange={(event, editor) => {
            const data = editor.getData();
            //console.log({ event, editor, data })
            onChange(data);
          }}
        />
      ) : (
        <div>Editor loading</div>
      )}
    </div>
  );
}

