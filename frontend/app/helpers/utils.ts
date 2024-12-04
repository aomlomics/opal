import { DeadValue } from "@/types/enums";
import { Prisma } from "@prisma/client";
import { ZodObject, ZodEnum, ZodNumber, ZodBoolean } from "zod";

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
		//check if the field has a dead value
		if (field in DeadValue) {
			//check the type of the field
			if (checkZodType(schema.shape[fieldName], ZodNumber)) {
				//replace the value with the deadvalue equivalent
				obj[fieldName] = DeadValue[field as unknown as DeadValue];
			} else if (checkZodType(schema.shape[fieldName], ZodBoolean)) {
				obj[fieldName] = 0; //TODO: make the boolean value properly represent the dead value
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
	const findMany = {
		orderBy: {
			id: "asc"
		}
	} as {
		orderBy: { id: Prisma.SortOrder };
		take: number;
		skip?: number;
		cursor?: { id: number };
		include?: { _count: { select: Record<string, boolean> } };
		where?: Record<string, string>;
	};

	const take = searchParams.get("take");
	if (!take) {
		throw new Error("take is required");
	}
	findMany.take = parseInt(take);

	const page = searchParams.get("page");
	//const cursorId = searchParams.get("cursorId");
	if (page) {
		//offset pagination
		findMany.skip = (parseInt(page) - 1) * findMany.take;
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
		findMany.where = where;
	}

	const relCounts = searchParams.get("relCounts");
	if (relCounts) {
		findMany.include = {
			_count: {
				select: relCounts
					.split(",")
					.reduce((acc: Record<string, boolean>, rel: string) => ({ ...acc, [rel]: true }), {})
			}
		};
	}

	return findMany;
}
