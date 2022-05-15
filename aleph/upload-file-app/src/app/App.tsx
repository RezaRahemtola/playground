import { useState } from 'react';
import { uploadFile } from '../utils/uploadFile';
import { Input, Button, Center, Text, Link, useToast, VStack } from '@chakra-ui/react'
import { getExplorerLink } from '../utils/getExplorerLink';
import { ExternalLinkIcon } from '@chakra-ui/icons'

function App(): JSX.Element {
  const [file, setFile] = useState<File>(new File([], ""));
  const [explorerLink, setExplorerLink] = useState<string>("");
  const toast = useToast();

  const handleClick = async () => {
    try {
      const message = await uploadFile(file);

      toast({
        title: "File successfully uploaded",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setExplorerLink(getExplorerLink(message));
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";

      console.error(error);
      toast({
        title: message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setExplorerLink("");
    }
  }

  return (
      <>
        <VStack>
          <Text fontSize='5xl' as='i'>Upload a file to Aleph</Text>
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
              <Button
                colorScheme='blue'
                size='lg'
                onClick={() => handleClick()}
              >
                Upload</Button>
          </Center>
          <Link href={explorerLink} isExternal>
            <Button disabled={(explorerLink === "")}>
              See on Aleph Explorer <ExternalLinkIcon mx='2px' />
            </Button>
          </Link>
        </VStack>
      </>
  );
}

export default App;
