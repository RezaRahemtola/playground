import { useState } from 'react';
import { uploadFile } from '../utils/uploadFile';
import { Input, Button } from '@chakra-ui/react'

function App(): JSX.Element {
  const [file, setFile] = useState<File>(new File([], ""));

  return (
      <>
        <Input
          type="file"
					h="100%"
					w="100%"
					p="10px"
          onChange={(evt) => {
            if (evt.target.files !== null)
              setFile(evt.target.files[0])
          }}/>
          <Button onClick={() => uploadFile(file)}>Upload</Button>
      </>
  );
}

export default App;
