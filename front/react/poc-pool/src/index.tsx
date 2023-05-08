import React from 'react';
import ReactDOM from 'react-dom/client';

import { ChakraProvider } from '@chakra-ui/react';
import App from './app/App';
import theme from './theme';
import './theme/index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
		<ChakraProvider theme={theme} resetCSS>
			<App />
		</ChakraProvider>
	</React.StrictMode>,
);
