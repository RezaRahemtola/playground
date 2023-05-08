import { extendTheme } from '@chakra-ui/react';

// Foundations overrides
import radius from './foundations/borderRadius';
import colors from './foundations/colors';
import fonts from './foundations/fonts';
import shadows from './foundations/shadows';

import Button from './components/button';
import Link from './components/link';
import Text from './components/text';

// Set breakpoint to help to make the app responsive.
const breakpoints = {
	xs: '320px',
	sm: '576px',
	md: '768px',
	lg: '1024px',
	xl: '1280px',
	'2xl': '1440px',
};

const overrides = {
	shadows,
	fonts,
	radius,
	colors,
	breakpoints,
	components: {
		Button,
		Link,
		Text,
	},
};

export default extendTheme(overrides);
