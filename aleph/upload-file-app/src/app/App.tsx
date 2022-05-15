import { useState } from 'react';
import { uploadFile } from '../utils/uploadFile';
import { Input, Button, Center, useToast, VStack } from '@chakra-ui/react'

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
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";

      console.error(error);
      toast({
        title: message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  return (
      <>
        <VStack >
        <Center h='50vh'>
          <Input
            type="file"
            h="50px"
            w="75%"
            p="10px"
            onChange={(evt) => {
              if (evt.target.files !== null)
                setFile(evt.target.files[0])
            }}/>
            <Button onClick={() => handleClick()}>Upload</Button>
        </Center>
        </VStack>
      </>
  );
}

export default App;
