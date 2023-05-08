import { Box } from '@chakra-ui/react';

type PrivateProps = { children: JSX.Element };

const Private = ({ children }: PrivateProps): JSX.Element => <Box px="24px">{children}</Box>;

export default Private;
