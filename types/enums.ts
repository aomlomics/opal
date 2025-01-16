import { AnalysisScalarFieldEnumSchema, AssayScalarFieldEnumSchema, AssignmentScalarFieldEnumSchema, FeatureScalarFieldEnumSchema, LibraryScalarFieldEnumSchema, OccurrenceOptionalDefaultsSchema, OccurrenceScalarFieldEnumSchema, ProjectScalarFieldEnumSchema, SampleScalarFieldEnumSchema, TaxonomyScalarFieldEnumSchema } from "@/prisma/generated/zod";

export enum DeadValueEnum {
	"not applicable" = -9999,
	"not collected",
	"not provided",
	"missing"
}

export const DeadBooleanEnum = {
	false: "false",
	"0": "false",
	true: "true",
	"1": "true",
	"not applicable": "not_applicable",
	"not collected": "not_collected",
	"not provided": "not_provided",
	missing: "missing"
};

export const TableToEnumSchema = {
	sample: SampleScalarFieldEnumSchema,
	project: ProjectScalarFieldEnumSchema,
	assay: AssayScalarFieldEnumSchema,
	library: LibraryScalarFieldEnumSchema,
	analysis: AnalysisScalarFieldEnumSchema,
	occurrence: OccurrenceScalarFieldEnumSchema,
	feature: FeatureScalarFieldEnumSchema,
	assignment: AssignmentScalarFieldEnumSchema,
	taxonomy: TaxonomyScalarFieldEnumSchema
}
