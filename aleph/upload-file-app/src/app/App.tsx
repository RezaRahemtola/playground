import { useState } from 'react';
import { uploadFile } from '../utils/uploadFile';
import { Input, Button, useToast } from '@chakra-ui/react'

function App(): JSX.Element {
  const [file, setFile] = useState<File>(new File([], ""));
  const toast = useToast();

  const handleClick = async () => {
    try {
      await uploadFile(file);
      toast({
        title: "File successfully uploaded",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error uploading file",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }

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
          <Button onClick={() => handleClick()}>Upload</Button>
      </>
  );
}

export default App;
