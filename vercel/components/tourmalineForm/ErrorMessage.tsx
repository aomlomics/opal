import React from 'react';
import { FieldErrors } from 'react-hook-form';

export default function ErrorMessage({ errors, name }: { errors: FieldErrors, name: string}){
	const error = errors[name];
	const message = error?.message; //Making sure that message is a string before being rendered. TypeScript moment
	return typeof message === 'string' ? <div className="text-error text-sm mt-1">{message}</div> : null;
}