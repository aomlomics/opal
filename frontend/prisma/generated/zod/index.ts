import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const StudyScalarFieldEnumSchema = z.enum(['project_id','recordedBy','recordedByID','project_contact','institution','institutionID','project_name','study_factor','detection_type','license','rightsHolder','accessRights','informationWithheld','dataGeneralizations','bibliographicCitation','associated_resource','mod_date','checkls_ver','seq_archive','code_repo','expedition_id']);

export const SampleScalarFieldEnumSchema = z.enum(['samp_name','project_id','samp_category','decimalLatitude','decimalLongitude','verbatimLatitude','verbatimLongitude','verbatimCoordinateSystem','verbatimSRS','geo_loc_name','eventDate','eventDurationValue','eventDurationUnit','verbatimEventDate','verbatimEventTime','verbatimDateEnd','verbatimTimeEnd','env_broad_scale','env_local_scale','env_medium','habitat_natural_artificial_0_1','samp_collect_method','samp_collect_device','samp_size','samp_size_unit','samp_store_temp','samp_store_sol','samp_store_dur','samp_store_method_additional','samp_mat_process','filter_passive_active_0_1','filter_onsite_dur','size_frac_low','size_frac','filter_diameter','filter_surface_area','filter_material','filter_name','precip_chem_prep','precip_force_prep','precip_time_prep','precip_temp_prep','prepped_samp_store_temp','prepped_samp_store_sol','prepped_samp_store_dur','prep_method_additional','sample_derived_from','sample_composed_of','biological_rep_relation','samp_vol_we_dna_ext','samp_vol_we_dna_ext_unit','nucl_acid_ext_lysis','nucl_acid_ext_sep','nucl_acid_ext','nucl_acid_ext_kit','nucl_acid_ext_modify','dna_cleanup_0_1','dna_cleanup_method','concentration','concentration_method','ratioOfAbsorbance260_280','pool_dna_num','nucl_acid_ext_method_additional','samp_weather','minimumDepthInMeters','maximumDepthInMeters','tot_depth_water_col','elev','temp','chlorophyll','light_intensity','misc_param','ph','ph_meth','salinity','suspend_part_matter','tidal_stage','turbidity','water_current','solar_irradiance','wind_direction','wind_speed','diss_inorg_carb','diss_inorg_nitro','diss_org_carb','diss_org_nitro','diss_oxygen','tot_diss_nitro','tot_inorg_nitro','tot_nitro','tot_part_carb','tot_org_carb','tot_org_c_meth','tot_nitro_content','tot_nitro_cont_meth','tot_carb','part_org_carb','part_org_nitro','nitrate','nitrite','nitro','org_carb','org_matter','org_nitro','serial_number','cruise_id','station','phaeopigments','ammonium','phosphate','silicate']);

export const AssayScalarFieldEnumSchema = z.enum(['assay_name','neg_cont_type','pos_cont_type','sterilise_method','pcr_0_1','thermocycler','amplificationReactionVolume','assay_validation','targetTaxonomicAssay','targetTaxonomicScope','target_gene','target_subfragment','ampliconSize','pcr_primer_forward','pcr_primer_reverse','pcr_primer_name_forward','pcr_primer_name_reverse','pcr_primer_reference_forward','pcr_primer_reference_reverse','pcr_primer_vol_forward','pcr_primer_vol_reverse','pcr_primer_conc_forward','pcr_primer_conc_reverse','probeReporter','probeQuencher','probe_seq','probe_ref','probe_conc','commercial_mm','custom_mm','pcr_dna_vol','pcr_rep','nucl_acid_amp','pcr_cond','annealingTemp','pcr_cycles','pcr_analysis_software','pcr_method_additional','pcr_plate_id','rel_cont_id']);

export const LibraryScalarFieldEnumSchema = z.enum(['library_id','assay_name','barcoding_pcr_appr','platform','instrument','seq_kit','lib_layout','sequencing_location','adapter_forward','adapter_reverse','lib_screen','seq_method_additional','mid_forward','mid_reverse','filename','filename2','seq_run_id','biosample_accession','sra_accession','input_read_count']);

export const AnalysisScalarFieldEnumSchema = z.enum(['id','library_id','sop_bioinformatics','trim_method','trim_param','demux_tool','demux_max_mismatch','merge_tool','merge_min_overlap','min_len_cutoff','min_len_tool','error_rate_tool','error_rate_type','error_rate_cutoff','chimera_check_method','chimera_check_param','otu_clust_tool','otu_clust_cutoff','min_reads_cutoff','min_reads_cutoff_unit','min_reads_tool','otu_db','otu_db_custom','tax_assign_cat','otu_seq_comp_appr','tax_class_id_cutoff','tax_class_query_cutoff','tax_class_collapse','tax_class_other','screen_contam_method','screen_geograph_method','screen_nontarget_method','screen_other','bioinfo_method_additional']);

export const OccurrenceScalarFieldEnumSchema = z.enum(['id','analysisId','samp_name','featureid','organismQuantity']);

export const FeatureScalarFieldEnumSchema = z.enum(['featureid','consensusTaxonomyId','sequence']);

export const AssignmentScalarFieldEnumSchema = z.enum(['id','analysisId','featureid','taxonomy','confidence']);

export const TaxonomyScalarFieldEnumSchema = z.enum(['taxonomy','verbatimIdentification','domain','kingdom','supergroup','division','subdivision','phylum','taxonClass','order','family','genus','species']);

export const GenericDataScalarFieldEnumSchema = z.enum(['id','project_id','samp_name','assay_name','library_id','analysisId','key','value']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const detection_typeSchema = z.enum(['targeted_taxon_detection','multi_taxon_detection','other']);

export type detection_typeType = `${z.infer<typeof detection_typeSchema>}`

export const neg_cont_typeSchema = z.enum(['site_negative','field_negative','process_negative','extraction_negative','PCR_negative','other']);

export type neg_cont_typeType = `${z.infer<typeof neg_cont_typeSchema>}`

export const target_geneSchema = z.enum(['twelveS_rRNA','sixteenS_rRNA','eighteenS_rRNA','twenty_threeS_rRNA','twenty_eightS_rRNA','rbcL','CytB','COI','COII','COIII','nifH','ITS','ND1','ND2','ND3','ND4','ND5','ND6','amoA','rpoB','rpoC1','rpoC2','matK','trnH','trnL','psbK','D_loop','other']);

export type target_geneType = `${z.infer<typeof target_geneSchema>}`

export const probeQuencherSchema = z.enum(['Zero_End_Quencher_ZEN','TAMRA','lowa_Black','Minor_Groove_Binder_MGB','Black_Hole_Quencher_BHQ','other']);

export type probeQuencherType = `${z.infer<typeof probeQuencherSchema>}`

export const barcoding_pcr_apprSchema = z.enum(['one_step_PCR','two_step_PCR','ligation_based','other']);

export type barcoding_pcr_apprType = `${z.infer<typeof barcoding_pcr_apprSchema>}`

export const platformSchema = z.enum(['ILLUMINA','BGISEQ','CAPILLARY','DNBSEQ','ELEMENT','GENAPSYS','GENEMIND','HELICOS','ION_TORRENT','LS454','OXFORD_NANOPORE','PACBIO_SMRT','TAPESTRI','VELA_DIAGNOSTICS','ULTIMA','other']);

export type platformType = `${z.infer<typeof platformSchema>}`

export const lib_layoutSchema = z.enum(['paired_end','single_end','other']);

export type lib_layoutType = `${z.infer<typeof lib_layoutSchema>}`

export const error_rate_typeSchema = z.enum(['Phred_score','expected_error_rate','other']);

export type error_rate_typeType = `${z.infer<typeof error_rate_typeSchema>}`

export const min_reads_cutoff_unitSchema = z.enum(['reads','percent','other']);

export type min_reads_cutoff_unitType = `${z.infer<typeof min_reads_cutoff_unitSchema>}`

export const tax_assign_catSchema = z.enum(['sequence_similarity','sequence_composition','phylogeny','probabilistic','other']);

export type tax_assign_catType = `${z.infer<typeof tax_assign_catSchema>}`

export const samp_categorySchema = z.enum(['sample','negative_control','positive_control','PCR_standard','other']);

export type samp_categoryType = `${z.infer<typeof samp_categorySchema>}`

export const verbatimCoordinateSystemSchema = z.enum(['decimal_degrees','degrees_minutes_seconds','UTM','other']);

export type verbatimCoordinateSystemType = `${z.infer<typeof verbatimCoordinateSystemSchema>}`

export const verbatimSRSSchema = z.enum(['WGS84','NAD84','NAD27','GDA94','GDA2020','ETRS89','JGD2000','other']);

export type verbatimSRSType = `${z.infer<typeof verbatimSRSSchema>}`

export const eventDurationUnitSchema = z.enum(['minutes','hours','days','months','years']);

export type eventDurationUnitType = `${z.infer<typeof eventDurationUnitSchema>}`

export const samp_size_unitSchema = z.enum(['mL','L','mg','g','kg','cm2','m2','cm3','m3','other']);

export type samp_size_unitType = `${z.infer<typeof samp_size_unitSchema>}`

export const samp_store_solSchema = z.enum(['ethanol','sodium_acetate','longmire','lysis_buffer','none','other']);

export type samp_store_solType = `${z.infer<typeof samp_store_solSchema>}`

export const filter_materialSchema = z.enum(['cellulose','cellulose_ester','glass_fiber','thermoplastic_membrane','track_etched_polycarbonate','nylon','other']);

export type filter_materialType = `${z.infer<typeof filter_materialSchema>}`

export const precip_chem_prepSchema = z.enum(['ethanol','isopropanol','sodium_chloride','other']);

export type precip_chem_prepType = `${z.infer<typeof precip_chem_prepSchema>}`

export const prepped_samp_store_solSchema = z.enum(['ethanol','sodium_acetate','longmire','lysis_buffer','none','other']);

export type prepped_samp_store_solType = `${z.infer<typeof prepped_samp_store_solSchema>}`

export const samp_vol_we_dna_ext_unitSchema = z.enum(['mL','L','mg','g','kg','cm2','m2','cm3','m3','other']);

export type samp_vol_we_dna_ext_unitType = `${z.infer<typeof samp_vol_we_dna_ext_unitSchema>}`

export const nucl_acid_ext_lysisSchema = z.enum(['physical','chemical','enzymatic','thermal','osmotic','other']);

export type nucl_acid_ext_lysisType = `${z.infer<typeof nucl_acid_ext_lysisSchema>}`

export const nucl_acid_ext_sepSchema = z.enum(['column_based','magnetic_beads','centrifugation','precipitation','phenol_chloroform','g','electrophoresis','other']);

export type nucl_acid_ext_sepType = `${z.infer<typeof nucl_acid_ext_sepSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// STUDY SCHEMA
/////////////////////////////////////////

export const StudySchema = z.object({
  detection_type: detection_typeSchema,
  project_id: z.string(),
  recordedBy: z.string(),
  recordedByID: z.string().nullish(),
  project_contact: z.string(),
  institution: z.string().nullish(),
  institutionID: z.string().nullish(),
  project_name: z.string().nullish(),
  study_factor: z.string().nullish(),
  license: z.string().nullish(),
  rightsHolder: z.string().nullish(),
  accessRights: z.string().nullish(),
  informationWithheld: z.string().nullish(),
  dataGeneralizations: z.string().nullish(),
  bibliographicCitation: z.string().nullish(),
  associated_resource: z.string().nullish(),
  mod_date: z.string().nullish(),
  checkls_ver: z.number(),
  seq_archive: z.string().nullish(),
  code_repo: z.string().nullish(),
  expedition_id: z.string().nullish(),
})

export type Study = z.infer<typeof StudySchema>

/////////////////////////////////////////
// SAMPLE SCHEMA
/////////////////////////////////////////

export const SampleSchema = z.object({
  samp_category: samp_categorySchema,
  verbatimCoordinateSystem: verbatimCoordinateSystemSchema.nullish(),
  verbatimSRS: verbatimSRSSchema.nullish(),
  eventDurationUnit: eventDurationUnitSchema.nullish(),
  samp_size_unit: samp_size_unitSchema.nullish(),
  samp_store_sol: samp_store_solSchema.nullish(),
  filter_material: filter_materialSchema.nullish(),
  precip_chem_prep: precip_chem_prepSchema.nullish(),
  prepped_samp_store_sol: prepped_samp_store_solSchema.nullish(),
  samp_vol_we_dna_ext_unit: samp_vol_we_dna_ext_unitSchema.nullish(),
  nucl_acid_ext_lysis: nucl_acid_ext_lysisSchema.nullish(),
  nucl_acid_ext_sep: nucl_acid_ext_sepSchema.nullish(),
  samp_name: z.string(),
  project_id: z.string(),
  decimalLatitude: z.coerce.number(),
  decimalLongitude: z.coerce.number(),
  verbatimLatitude: z.string().nullish(),
  verbatimLongitude: z.string().nullish(),
  geo_loc_name: z.string(),
  eventDate: z.string(),
  eventDurationValue: z.coerce.number().nullish(),
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
  samp_store_temp: z.string().nullish(),
  samp_store_dur: z.string().nullish(),
  samp_store_method_additional: z.string().nullish(),
  samp_mat_process: z.string().nullish(),
  filter_passive_active_0_1: z.coerce.boolean().nullish(),
  filter_onsite_dur: z.string().nullish(),
  size_frac_low: z.coerce.number().nullish(),
  size_frac: z.coerce.number().nullish(),
  filter_diameter: z.coerce.number().nullish(),
  filter_surface_area: z.coerce.number().nullish(),
  filter_name: z.string().nullish(),
  precip_force_prep: z.coerce.number().nullish(),
  precip_time_prep: z.coerce.number().nullish(),
  precip_temp_prep: z.coerce.number().nullish(),
  prepped_samp_store_temp: z.string().nullish(),
  prepped_samp_store_dur: z.coerce.number().nullish(),
  prep_method_additional: z.string().nullish(),
  sample_derived_from: z.string().nullish(),
  sample_composed_of: z.string().nullish(),
  biological_rep_relation: z.string().nullish(),
  samp_vol_we_dna_ext: z.number().nullish(),
  nucl_acid_ext: z.string().nullish(),
  nucl_acid_ext_kit: z.string().nullish(),
  nucl_acid_ext_modify: z.string().nullish(),
  dna_cleanup_0_1: z.coerce.boolean().nullish(),
  dna_cleanup_method: z.string().nullish(),
  concentration: z.number().nullish(),
  concentration_method: z.string().nullish(),
  ratioOfAbsorbance260_280: z.number().nullish(),
  pool_dna_num: z.coerce.number().int().nullish(),
  nucl_acid_ext_method_additional: z.string().nullish(),
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
  serial_number: z.string().nullish(),
  cruise_id: z.string().nullish(),
  station: z.string().nullish(),
  phaeopigments: z.string().nullish(),
  ammonium: z.string().nullish(),
  phosphate: z.string().nullish(),
  silicate: z.string().nullish(),
})

export type Sample = z.infer<typeof SampleSchema>

/////////////////////////////////////////
// ASSAY SCHEMA
/////////////////////////////////////////

export const AssaySchema = z.object({
  neg_cont_type: neg_cont_typeSchema,
  target_gene: target_geneSchema.nullish(),
  probeQuencher: probeQuencherSchema.nullish(),
  assay_name: z.string(),
  pos_cont_type: z.string(),
  sterilise_method: z.string().nullish(),
  pcr_0_1: z.coerce.boolean(),
  thermocycler: z.string().nullish(),
  amplificationReactionVolume: z.coerce.number().nullish(),
  assay_validation: z.string().nullish(),
  targetTaxonomicAssay: z.string(),
  targetTaxonomicScope: z.string().nullish(),
  target_subfragment: z.string().nullish(),
  ampliconSize: z.coerce.number().nullish(),
  pcr_primer_forward: z.string(),
  pcr_primer_reverse: z.string(),
  pcr_primer_name_forward: z.string().nullish(),
  pcr_primer_name_reverse: z.string().nullish(),
  pcr_primer_reference_forward: z.string().nullish(),
  pcr_primer_reference_reverse: z.string().nullish(),
  pcr_primer_vol_forward: z.coerce.number().nullish(),
  pcr_primer_vol_reverse: z.coerce.number().nullish(),
  pcr_primer_conc_forward: z.coerce.number().nullish(),
  pcr_primer_conc_reverse: z.coerce.number().nullish(),
  probeReporter: z.string().nullish(),
  probe_seq: z.string().nullish(),
  probe_ref: z.string().nullish(),
  probe_conc: z.coerce.number().nullish(),
  commercial_mm: z.string().nullish(),
  custom_mm: z.string().nullish(),
  pcr_dna_vol: z.coerce.number().nullish(),
  pcr_rep: z.coerce.number().int().nullish(),
  nucl_acid_amp: z.string().nullish(),
  pcr_cond: z.string().nullish(),
  annealingTemp: z.coerce.number().nullish(),
  pcr_cycles: z.coerce.number().nullish(),
  pcr_analysis_software: z.string().nullish(),
  pcr_method_additional: z.string().nullish(),
  pcr_plate_id: z.string().nullish(),
  rel_cont_id: z.string().nullish(),
})

export type Assay = z.infer<typeof AssaySchema>

/////////////////////////////////////////
// LIBRARY SCHEMA
/////////////////////////////////////////

export const LibrarySchema = z.object({
  barcoding_pcr_appr: barcoding_pcr_apprSchema.nullish(),
  platform: platformSchema.nullish(),
  lib_layout: lib_layoutSchema.nullish(),
  library_id: z.string(),
  assay_name: z.string(),
  instrument: z.string().nullish(),
  seq_kit: z.string().nullish(),
  sequencing_location: z.string().nullish(),
  adapter_forward: z.string().nullish(),
  adapter_reverse: z.string().nullish(),
  lib_screen: z.string().nullish(),
  seq_method_additional: z.string().nullish(),
  mid_forward: z.string().nullish(),
  mid_reverse: z.string().nullish(),
  filename: z.string().nullish(),
  filename2: z.string().nullish(),
  seq_run_id: z.string().nullish(),
  biosample_accession: z.string().nullish(),
  sra_accession: z.string().nullish(),
  input_read_count: z.coerce.number().int().nullish(),
})

export type Library = z.infer<typeof LibrarySchema>

/////////////////////////////////////////
// ANALYSIS SCHEMA
/////////////////////////////////////////

export const AnalysisSchema = z.object({
  error_rate_type: error_rate_typeSchema.nullish(),
  min_reads_cutoff_unit: min_reads_cutoff_unitSchema.nullish(),
  tax_assign_cat: tax_assign_catSchema.nullish(),
  id: z.number().int(),
  library_id: z.string(),
  sop_bioinformatics: z.string().nullish(),
  trim_method: z.string().nullish(),
  trim_param: z.string().nullish(),
  demux_tool: z.string().nullish(),
  demux_max_mismatch: z.coerce.number().int().nullish(),
  merge_tool: z.string().nullish(),
  merge_min_overlap: z.coerce.number().int().nullish(),
  min_len_cutoff: z.coerce.number().int().nullish(),
  min_len_tool: z.string().nullish(),
  error_rate_tool: z.string().nullish(),
  error_rate_cutoff: z.coerce.number().nullish(),
  chimera_check_method: z.string().nullish(),
  chimera_check_param: z.string().nullish(),
  otu_clust_tool: z.string().nullish(),
  otu_clust_cutoff: z.coerce.number().nullish(),
  min_reads_cutoff: z.coerce.number().nullish(),
  min_reads_tool: z.string().nullish(),
  otu_db: z.string().nullish(),
  otu_db_custom: z.string().nullish(),
  otu_seq_comp_appr: z.string().nullish(),
  tax_class_id_cutoff: z.coerce.number().nullish(),
  tax_class_query_cutoff: z.coerce.number().nullish(),
  tax_class_collapse: z.string().nullish(),
  tax_class_other: z.string().nullish(),
  screen_contam_method: z.string().nullish(),
  screen_geograph_method: z.string().nullish(),
  screen_nontarget_method: z.string().nullish(),
  screen_other: z.string().nullish(),
  bioinfo_method_additional: z.string().nullish(),
})

export type Analysis = z.infer<typeof AnalysisSchema>

/////////////////////////////////////////
// OCCURRENCE SCHEMA
/////////////////////////////////////////

export const OccurrenceSchema = z.object({
  id: z.number().int(),
  analysisId: z.coerce.number().int().nullish(),
  samp_name: z.string(),
  featureid: z.string(),
  organismQuantity: z.coerce.number().int(),
})

export type Occurrence = z.infer<typeof OccurrenceSchema>

/////////////////////////////////////////
// FEATURE SCHEMA
/////////////////////////////////////////

export const FeatureSchema = z.object({
  featureid: z.string(),
  consensusTaxonomyId: z.string().nullish(),
  sequence: z.string(),
})

export type Feature = z.infer<typeof FeatureSchema>

/////////////////////////////////////////
// ASSIGNMENT SCHEMA
/////////////////////////////////////////

export const AssignmentSchema = z.object({
  id: z.number().int(),
  analysisId: z.coerce.number().int(),
  featureid: z.string(),
  taxonomy: z.string(),
  confidence: z.coerce.number(),
})

export type Assignment = z.infer<typeof AssignmentSchema>

/////////////////////////////////////////
// TAXONOMY SCHEMA
/////////////////////////////////////////

export const TaxonomySchema = z.object({
  taxonomy: z.string(),
  verbatimIdentification: z.string(),
  domain: z.string().nullish(),
  kingdom: z.string().nullish(),
  supergroup: z.string().nullish(),
  division: z.string().nullish(),
  subdivision: z.string().nullish(),
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
  id: z.number().int(),
  project_id: z.string(),
  samp_name: z.string(),
  assay_name: z.string(),
  library_id: z.string(),
  analysisId: z.coerce.number().int(),
  key: z.string(),
  value: z.string(),
})

export type GenericData = z.infer<typeof GenericDataSchema>