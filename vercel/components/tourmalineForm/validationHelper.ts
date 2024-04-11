import { z } from 'zod';

//Fields that must be an int, and must be greater than or equal to 0
export const intWithMin0 = () => {
	return z.preprocess((val) => {
		// Must parse input to attempt to convert string (HTML default) to number 
		const parsed = parseFloat(String(val));
		return isNaN(parsed) ? val : parsed;
	}, z.number()
		.int('Must be an integer')
		.min(0, 'Must be greater than or equal to 0'));
};

//Fields that must be a number (could be decimal), and must be greater than or equal to 0
export const numWithMin0 = () => {
	return z.preprocess((val) => {
		const parsed = parseFloat(String(val));
		return isNaN(parsed) ? val : parsed;
	}, z.number()
		.min(0, 'Must be greater than or equal to 0'));
};

//Fields that must be a number (could be decimal), and must be greater than or equal to 1
export const numWithMin1 = () => {
	return z.preprocess((val) => {
		const parsed = parseFloat(String(val));
		return isNaN(parsed) ? val : parsed;
	}, z.number()
		.min(1, 'Must be greater than or equal to 1'));
};

//Fields that must be a number (could be decimal), and must be greater than or equal to -1
export const numWithMinNeg1 = () => {
	return z.preprocess((val) => {
		const parsed = parseFloat(String(val));
		return isNaN(parsed) ? val : parsed;
	}, z.number()
		.min(-1, 'Must be greater than or equal to 1'));
};

//Fields that must be a number (could be decimal) from 0 to 100. Good for percentages
export const numWithMin0Max100 = () => {
	return z.preprocess((val) => {
		const parsed = parseFloat(String(val));
		return isNaN(parsed) ? val : parsed;
	}, z.number()
		.min(0, 'Must be greater than or equal to 0')
		.max(100, 'Must be less than or equal to 100'));
};

//Fields that must be an integer with a minimum of 1
export const intWithMin1 = () => {
	return z.preprocess((val) => {
		// Must parse input to attempt to convert string (HTML default) to number 
		const parsed = parseFloat(String(val));
		return isNaN(parsed) ? val : parsed;
	}, z.number()
		.int('Must be an integer')
		.min(1, 'Must be greater than or equal to 1'));
};