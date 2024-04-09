import React from 'react';
import { FieldErrors } from 'react-hook-form';


//Hello Carter
//This is for when there are two fields next to each other
//I will have to make 2 more field formatting components, one for a single field, and one for a dropdown menu.
//They will work the same

export default function DualTextField({
	register1,
	register2,
	errors,
	name1,
	label1,
	infoButton1,
	name2,
	label2,
	infoButton2,
	ErrorMessageComponent,
}: 
{
	register1: any
	register2: any
	errors: FieldErrors
	name1: string
	label1: string
	infoButton1: any
	name2: string
	label2: string
	infoButton2: any
	ErrorMessageComponent: any
}) {
	return (
		<div className="space-y-4 p-1">
			<div className="flex gap-x-4">
				{/* Field 1 */}
				<label className="form-control w-1/2 max-w-xs">
					<div className="label pb-0">
						<span className="label-text">{label1}</span>
						{infoButton1}
					</div>
					<div className="relative w-full">
						<input
							{...register1(name1)}
							className={`input input-bordered w-full pr-8 ${
								errors[name1] ? 'input-error' : ''
							}`}
						/>
						{ErrorMessageComponent && <ErrorMessageComponent errors={errors} name={name1} />}
					</div>
				</label>
				
				{/* Field 2 */}
				<label className="form-control w-1/2 max-w-xs">
					<div className="label pb-0">
						<span className="label-text">{label2}</span>
						{infoButton2}
					</div>
					<div className="relative w-full">
						<input
							{...register2(name2)}
							className={`input input-bordered w-full pr-8 ${
								errors[name2] ? 'input-error' : ''
							}`}
						/>
						{ErrorMessageComponent && <ErrorMessageComponent errors={errors} name={name2} />}
					</div>
				</label>
			</div>
		</div>
	);
}