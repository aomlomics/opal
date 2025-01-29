import { DeadBooleanEnum, DeadValueEnum } from "@/types/enums";
import { Prisma } from "@prisma/client";
import { ZodObject, ZodEnum, ZodNumber } from "zod";

export async function fetcher(url: string) {
	const res = await fetch(url);
	if (!res.ok) {
		const data = await res.json();
		return { error: data.error };
	}
	return await res.json();
}

//export function getBaseUrl() {
//	if (process.env.NODE_ENV === "development") {
//		return "http://localhost:3000/";
//	}
//	return "https://opaldb.vercel.app/";
//}

//export function getRemoteUrl() {
//	if (process.env.NODE_ENV === "development") {
//		return "http://localhost:8080";
//	}
//	return "https://opalserver-qnwedardvq-uc.a.run.app";
//}

export function isEmpty(obj: Object) {
	for (const x in obj) {
		if (obj.hasOwnProperty(x)) return false;
	}
	return true;
}

export function isDeadValue(val: string) {
	const deadValues = ["not applicable", "not collected", "not given", "missing"];
	return deadValues.includes(val);
}

//this function is barebones, basic, and probably dangerous in some way
function checkZodType(field: any, type: any) {
	//constantly call unwrap(), as the zod types (Optional, Nullable) are nested inside each other
	//if the call fails, then we know it reached the actual type and didn't match
	try {
		if (field instanceof type) {
			return true;
		} else {
			return checkZodType(field.unwrap(), type);
		}
	} catch {
		return false;
	}
}

//replace DeadValues in number fields with enum values
export function replaceDead(
	field: string,
	fieldName: string,
	obj: Record<string, string | number | boolean | null>,
	schema: ZodObject<any>,
	fieldOptionsEnum: ZodEnum<any>
) {
	//check if the field name is in the Schema
	if (field && fieldOptionsEnum.options.includes(fieldName)) {
		if (checkZodType(schema.shape[fieldName], ZodEnum)) {
			//DeadBooleanEnum
			if (field in DeadBooleanEnum) {
				//replace field with DeadBoolean value
				obj[fieldName] = DeadBooleanEnum[field.toLowerCase() as keyof typeof DeadBooleanEnum];
			}
		} else if (field in DeadValueEnum) {
			//check the type of the field
			if (checkZodType(schema.shape[fieldName], ZodNumber)) {
				//replace the value with the DeadValue equivalent
				obj[fieldName] = DeadValueEnum[field as unknown as DeadValueEnum];
			} else {
				//continue as normal
				obj[fieldName] = field;
			}
		} else {
			//continue as normal
			obj[fieldName] = field;
		}
	}
}

export function parsePaginationParams(searchParams: URLSearchParams) {
	const query = {
		orderBy: {
			id: "asc"
		},
		omit: {
			id: true
		}
	} as {
		orderBy: { id: Prisma.SortOrder };
		omit: { id: true };
		take: number;
		skip?: number;
		cursor?: { id: number };
		include?: { _count: { select: Record<string, boolean> } };
		where?: Record<string, string>;
	};

	const orderBy = searchParams.get("orderBy");
	if (orderBy) {
		query.orderBy = JSON.parse(orderBy);
	}

	const take = searchParams.get("take");
	if (!take) {
		throw new Error("take is required");
	}
	query.take = parseInt(take);

	const page = searchParams.get("page");
	//const cursorId = searchParams.get("cursorId");
	if (page) {
		//offset pagination
		query.skip = (parseInt(page) - 1) * query.take;
	}
	//} else if (cursorId) {
	//	const dir = searchParams.get("dir");
	//	//cursor pagination
	//	findMany.skip = 1;
	//	findMany.cursor = {
	//		id: parseInt(cursorId)
	//	};
	//	if (dir) {
	//		findMany.take *= parseInt(dir);
	//	}
	//}

	const whereStr = searchParams.get("where");
	if (whereStr) {
		const where = JSON.parse(whereStr);
		query.where = where;
	}

	const relCounts = searchParams.get("relCounts");
	if (relCounts) {
		query.include = {
			_count: {
				select: relCounts
					.split(",")
					.reduce((acc: Record<string, boolean>, rel: string) => ({ ...acc, [rel]: true }), {})
			}
		};
	}

	return query;
}

export function randomColors(num: number) {
	let colors = [];
	for (let i = 0; i < num; i++) {
		colors.push(
			`rgb(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)})`
		);
	}
	return colors;
}
