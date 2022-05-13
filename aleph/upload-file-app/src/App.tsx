import { useState } from 'react';
import { uploadFile } from './utils/uploadFile';

function App() {
  const [file, setFile] = useState<File>(new File([], ""));

  return (
      <div>
        <input type="file" id="fileInput" onChange={(evt) => {
          if (evt.target.files !== null)
            setFile(evt.target.files[0])
          }}/>
        <button onClick={() => uploadFile(file)}>Upload</button>
      </div>
  );
}

export default App;
