import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const StudyScalarFieldEnumSchema = z.enum(['project_id']);

export const SampleScalarFieldEnumSchema = z.enum(['samp_name','project_id','assay_name','samp_category','decimalLatitude','decimalLongitude','verbatimLatitude','verbatimLongitude','verbatimCoordinateSystem','verbatimSRS','geo_loc_name','eventDate','eventDurationValue','eventDurationUnit','verbatimEventDate','verbatimEventTime','verbatimDateEnd','verbatimTimeEnd','env_broad_scale','env_local_scale','env_medium','habitat_natural_artificial_0_1','samp_collect_method','samp_collect_device','samp_size','samp_size_unit','samp_store_temp','samp_store_sol','samp_store_dur','samp_store_method_additional','samp_mat_process','filter_passive_active_0_1','filter_onsite_dur','size_frac_low','size_frac','filter_diameter','filter_surface_area','filter_material','filter_name','precip_chem_prep','precip_force_prep','precip_time_prep','precip_temp_prep','prepped_samp_store_temp','prepped_samp_store_sol','prepped_samp_store_dur','prep_method_additional','rel_cont_id','sample_derived_from','sample_composed_of','biological_rep_relation','samp_vol_we_dna_ext','samp_vol_we_dna_ext_unit','nucl_acid_ext_lysis','nucl_acid_ext_sep','nucl_acid_ext','nucl_acid_ext_kit','nucl_acid_ext_modify','dna_cleanup_0_1','dna_cleanup_method','concentration','concentration_method','ratioOfAbsorbance260_280','pool_dna_num','nucl_acid_ext_method_additional','input_read_count','output_read_count','output_otu_num','otu_num_tax_assgined','samp_weather','minimumDepthInMeters','maximumDepthInMeters','tot_depth_water_col','elev','temp','chlorophyll','light_intensity','misc_param','ph','ph_meth','salinity','suspend_part_matter','tidal_stage','turbidity','water_current','solar_irradiance','wind_direction','wind_speed','diss_inorg_carb','diss_inorg_nitro','diss_org_carb','diss_org_nitro','diss_oxygen','tot_diss_nitro','tot_inorg_nitro','tot_nitro','tot_part_carb','tot_org_carb','tot_org_c_meth','tot_nitro_content','tot_nitro_cont_meth','tot_carb','part_org_carb','part_org_nitro','nitrate','nitrite','nitro','org_carb','org_matter','org_nitro']);

export const MarkerScalarFieldEnumSchema = z.enum(['assay_name','pcr_plate_id']);

export const LibraryScalarFieldEnumSchema = z.enum(['library_id','assay_name','mid_forward','mid_reverse','filename','filename2']);

export const RunScalarFieldEnumSchema = z.enum(['id','library_id']);

export const OccurrenceScalarFieldEnumSchema = z.enum(['id','runId','samp_name','seq_id','organismQuantity']);

export const FeatureScalarFieldEnumSchema = z.enum(['seq_id','consensusTaxonomyId','sequence']);

export const AssignmentScalarFieldEnumSchema = z.enum(['id','seq_id','taxonomy','confidence']);

export const TaxonomyScalarFieldEnumSchema = z.enum(['taxonomy','kingdom','phylum','taxonClass','order','family','genus','species']);

export const GenericDataScalarFieldEnumSchema = z.enum(['id','project_id','samp_name','assay_name','library_id','runId','key','value']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// STUDY SCHEMA
/////////////////////////////////////////

export const StudySchema = z.object({
  project_id: z.string(),
})

export type Study = z.infer<typeof StudySchema>

/////////////////////////////////////////
// SAMPLE SCHEMA
/////////////////////////////////////////

export const SampleSchema = z.object({
  samp_name: z.string(),
  project_id: z.string(),
  assay_name: z.string(),
  samp_category: z.string(),
  decimalLatitude: z.coerce.number(),
  decimalLongitude: z.coerce.number(),
  verbatimLatitude: z.string().nullish(),
  verbatimLongitude: z.string().nullish(),
  verbatimCoordinateSystem: z.string().nullish(),
  verbatimSRS: z.string().nullish(),
  geo_loc_name: z.string(),
  eventDate: z.string(),
  eventDurationValue: z.coerce.number().int().nullish(),
  eventDurationUnit: z.string().nullish(),
  verbatimEventDate: z.string().nullish(),
  verbatimEventTime: z.string().nullish(),
  verbatimDateEnd: z.string().nullish(),
  verbatimTimeEnd: z.string().nullish(),
  env_broad_scale: z.string(),
  env_local_scale: z.string(),
  env_medium: z.string(),
  habitat_natural_artificial_0_1: z.coerce.boolean().nullish(),
  samp_collect_method: z.string().nullish(),
  samp_collect_device: z.string().nullish(),
  samp_size: z.coerce.number().nullish(),
  samp_size_unit: z.string().nullish(),
  samp_store_temp: z.string().nullish(),
  samp_store_sol: z.string().nullish(),
  samp_store_dur: z.string().nullish(),
  samp_store_method_additional: z.string().nullish(),
  samp_mat_process: z.string().nullish(),
  filter_passive_active_0_1: z.coerce.boolean().nullish(),
  filter_onsite_dur: z.string().nullish(),
  size_frac_low: z.coerce.number().nullish(),
  size_frac: z.coerce.number().nullish(),
  filter_diameter: z.coerce.number().nullish(),
  filter_surface_area: z.coerce.number().nullish(),
  filter_material: z.string().nullish(),
  filter_name: z.string().nullish(),
  precip_chem_prep: z.string().nullish(),
  precip_force_prep: z.coerce.number().nullish(),
  precip_time_prep: z.coerce.number().nullish(),
  precip_temp_prep: z.coerce.number().nullish(),
  prepped_samp_store_temp: z.string().nullish(),
  prepped_samp_store_sol: z.string().nullish(),
  prepped_samp_store_dur: z.coerce.number().nullish(),
  prep_method_additional: z.string().nullish(),
  rel_cont_id: z.string().nullish(),
  sample_derived_from: z.string().nullish(),
  sample_composed_of: z.string().nullish(),
  biological_rep_relation: z.string().nullish(),
  samp_vol_we_dna_ext: z.coerce.number().nullish(),
  samp_vol_we_dna_ext_unit: z.string().nullish(),
  nucl_acid_ext_lysis: z.string().nullish(),
  nucl_acid_ext_sep: z.string().nullish(),
  nucl_acid_ext: z.string().nullish(),
  nucl_acid_ext_kit: z.string().nullish(),
  nucl_acid_ext_modify: z.string().nullish(),
  dna_cleanup_0_1: z.coerce.boolean().nullish(),
  dna_cleanup_method: z.string().nullish(),
  concentration: z.coerce.number().nullish(),
  concentration_method: z.string().nullish(),
  ratioOfAbsorbance260_280: z.coerce.number().nullish(),
  pool_dna_num: z.coerce.number().nullish(),
  nucl_acid_ext_method_additional: z.string().nullish(),
  input_read_count: z.coerce.number().int().nullish(),
  output_read_count: z.coerce.number().int().nullish(),
  output_otu_num: z.coerce.number().int().nullish(),
  otu_num_tax_assgined: z.coerce.number().int().nullish(),
  samp_weather: z.string().nullish(),
  minimumDepthInMeters: z.coerce.number().nullish(),
  maximumDepthInMeters: z.coerce.number().nullish(),
  tot_depth_water_col: z.coerce.number().nullish(),
  elev: z.coerce.number().nullish(),
  temp: z.coerce.number().nullish(),
  chlorophyll: z.coerce.number().nullish(),
  light_intensity: z.coerce.number().nullish(),
  misc_param: z.coerce.number().nullish(),
  ph: z.coerce.number().nullish(),
  ph_meth: z.string().nullish(),
  salinity: z.coerce.number().nullish(),
  suspend_part_matter: z.coerce.number().nullish(),
  tidal_stage: z.string().nullish(),
  turbidity: z.coerce.number().nullish(),
  water_current: z.coerce.number().nullish(),
  solar_irradiance: z.string().nullish(),
  wind_direction: z.string().nullish(),
  wind_speed: z.coerce.number().nullish(),
  diss_inorg_carb: z.coerce.number().nullish(),
  diss_inorg_nitro: z.coerce.number().nullish(),
  diss_org_carb: z.coerce.number().nullish(),
  diss_org_nitro: z.coerce.number().nullish(),
  diss_oxygen: z.coerce.number().nullish(),
  tot_diss_nitro: z.coerce.number().nullish(),
  tot_inorg_nitro: z.coerce.number().nullish(),
  tot_nitro: z.coerce.number().nullish(),
  tot_part_carb: z.coerce.number().nullish(),
  tot_org_carb: z.coerce.number().nullish(),
  tot_org_c_meth: z.coerce.number().nullish(),
  tot_nitro_content: z.coerce.number().nullish(),
  tot_nitro_cont_meth: z.coerce.number().nullish(),
  tot_carb: z.coerce.number().nullish(),
  part_org_carb: z.coerce.number().nullish(),
  part_org_nitro: z.coerce.number().nullish(),
  nitrate: z.coerce.number().nullish(),
  nitrite: z.coerce.number().nullish(),
  nitro: z.coerce.number().nullish(),
  org_carb: z.coerce.number().nullish(),
  org_matter: z.coerce.number().nullish(),
  org_nitro: z.coerce.number().nullish(),
})

export type Sample = z.infer<typeof SampleSchema>

/////////////////////////////////////////
// MARKER SCHEMA
/////////////////////////////////////////

export const MarkerSchema = z.object({
  assay_name: z.string(),
  pcr_plate_id: z.string().nullish(),
})

export type Marker = z.infer<typeof MarkerSchema>

/////////////////////////////////////////
// LIBRARY SCHEMA
/////////////////////////////////////////

export const LibrarySchema = z.object({
  library_id: z.string(),
  assay_name: z.string(),
  mid_forward: z.string().nullish(),
  mid_reverse: z.string().nullish(),
  filename: z.string().nullish(),
  filename2: z.string().nullish(),
})

export type Library = z.infer<typeof LibrarySchema>

/////////////////////////////////////////
// RUN SCHEMA
/////////////////////////////////////////

export const RunSchema = z.object({
  id: z.coerce.number().int(),
  library_id: z.string(),
})

export type Run = z.infer<typeof RunSchema>

/////////////////////////////////////////
// OCCURRENCE SCHEMA
/////////////////////////////////////////

export const OccurrenceSchema = z.object({
  id: z.coerce.number().int(),
  runId: z.coerce.number().int().nullish(),
  samp_name: z.string(),
  seq_id: z.string(),
  organismQuantity: z.coerce.number().int(),
})

export type Occurrence = z.infer<typeof OccurrenceSchema>

/////////////////////////////////////////
// FEATURE SCHEMA
/////////////////////////////////////////

export const FeatureSchema = z.object({
  seq_id: z.string(),
  consensusTaxonomyId: z.string().nullish(),
  sequence: z.string(),
})

export type Feature = z.infer<typeof FeatureSchema>

/////////////////////////////////////////
// ASSIGNMENT SCHEMA
/////////////////////////////////////////

export const AssignmentSchema = z.object({
  id: z.coerce.number().int(),
  seq_id: z.string(),
  taxonomy: z.string(),
  confidence: z.coerce.number(),
})

export type Assignment = z.infer<typeof AssignmentSchema>

/////////////////////////////////////////
// TAXONOMY SCHEMA
/////////////////////////////////////////

export const TaxonomySchema = z.object({
  taxonomy: z.string(),
  kingdom: z.string().nullish(),
  phylum: z.string().nullish(),
  taxonClass: z.string().nullish(),
  order: z.string().nullish(),
  family: z.string().nullish(),
  genus: z.string().nullish(),
  species: z.string().nullish(),
})

export type Taxonomy = z.infer<typeof TaxonomySchema>

/////////////////////////////////////////
// GENERIC DATA SCHEMA
/////////////////////////////////////////

export const GenericDataSchema = z.object({
  id: z.coerce.number().int(),
  project_id: z.string(),
  samp_name: z.string(),
  assay_name: z.string(),
  library_id: z.string(),
  runId: z.coerce.number().int(),
  key: z.string(),
  value: z.string(),
})

export type GenericData = z.infer<typeof GenericDataSchema>
