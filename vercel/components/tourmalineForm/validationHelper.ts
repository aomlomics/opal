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