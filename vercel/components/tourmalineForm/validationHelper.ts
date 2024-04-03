import { z } from 'zod';

// A function to create a numeric field schema with dynamic ranges and custom messages
export const intInRange0To100 = () => {
  return z.number()
    .int("Must be an integer")
    .min(0, { message: "Must be greater than or equal to 0" })
    .max(100, { message: "Must be less than or equal to 100" });
};
