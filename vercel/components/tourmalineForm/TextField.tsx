import React from 'react';
import { FieldErrors } from 'react-hook-form';

export default function TextField({
	register,
	errors,
	name,
	label,
	infoButton,
	ErrorMessageComponent,
}:
{
	register: any
	errors: FieldErrors
	name: string
	label: string
	infoButton: any
	ErrorMessageComponent: any
}) {
	return (
		<div className="space-y-4 p-1">
			<div className="flex gap-x-4">
				{/* Field 1 */}
				<label className="form-control w-full">
					<div className="label pb-0">
						<span className="label-text">{label}</span>
						{infoButton}
					</div>
					<div className="relative w-full">
						<input
							{...register(name)}
							className={`input input-bordered bg-neutral-content w-full pr-8 ${
								errors[name] ? 'input-error' : ''
							}`}
						/>
						{ErrorMessageComponent && <ErrorMessageComponent errors={errors} name={name} />}
					</div>
				</label>
			</div>
		</div>
	);
}