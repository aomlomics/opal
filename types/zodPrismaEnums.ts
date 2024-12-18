import { z } from 'zod';

//ZOD ENUM REPLACEMENTS
//THE zod-prisma-types LIBRARY DOES NOT USE THE MAPPED VALUE WHEN GENERATING ENUM TYPES
//MUST UPDATE THIS FILE EVERY TIME AN ENUM CHANGES OR IS ADDED
//IF AN ENUM HAS A @map, THE ORIGINAL VALUE MUST BE REPLACED BY THE MAPPED VALUE IN THIS FILE
//MUST COPY AND PASTE EVERYTHING PAST THIS COMMENT INTO /prisma/generated/zod/index.ts AFTER GENERATION
export const DeadBooleanSchema = z.enum(['0','1','not applicable','not collected','not provided','missing']);

export type DeadBooleanType = `${z.infer<typeof DeadBooleanSchema>}`

export const detection_typeSchema = z.enum(['targeted taxon detection', 'multi taxon detection', 'other']);

export type detection_typeType = `${z.infer<typeof detection_typeSchema>}`

export const neg_cont_typeSchema = z.enum(['site negative', 'field negative', 'process negative', 'extraction negative', 'PCR negative', 'other']);

export type neg_cont_typeType = `${z.infer<typeof neg_cont_typeSchema>}`

export const target_geneSchema = z.enum(['12S rRNA', '16S rRNA', '18S rRNA', '23S rRNA', '28S rRNA', 'rbcL', 'CytB', 'COI', 'COII', 'COIII', 'nifH', 'ITS', 'ND1', 'ND2', 'ND3', 'ND4', 'ND5', 'ND6', 'amoA', 'rpoB', 'rpoC1', 'rpoC2', 'matK', 'trnH', 'trnL', 'psbK', 'D-loop', 'other']);

export type target_geneType = `${z.infer<typeof target_geneSchema>}`

export const probeQuencherSchema = z.enum(['Zero-End Quencher (ZEN)', 'TAMRA', 'lowa Black', 'Minor Groove Binder (MGB)', 'Black Hole Quencher (BHQ)', 'other']);

export type probeQuencherType = `${z.infer<typeof probeQuencherSchema>}`

export const barcoding_pcr_apprSchema = z.enum(['one-step PCR', 'two-step PCR', 'ligation-based', 'other']);

export type barcoding_pcr_apprType = `${z.infer<typeof barcoding_pcr_apprSchema>}`

export const platformSchema = z.enum(['ILLUMINA', 'BGISEQ', 'CAPILLARY', 'DNBSEQ', 'ELEMENT', 'GENAPSYS', 'GENEMIND', 'HELICOS', 'ION_TORRENT', 'LS454', 'OXFORD_NANOPORE', 'PACBIO_SMRT', 'TAPESTRI', 'VELA_DIAGNOSTICS', 'ULTIMA', 'other']);

export type platformType = `${z.infer<typeof platformSchema>}`

export const lib_layoutSchema = z.enum(['paired end', 'single end', 'other']);

export type lib_layoutType = `${z.infer<typeof lib_layoutSchema>}`

export const error_rate_typeSchema = z.enum(['Phred score', 'expected error rate', 'other']);

export type error_rate_typeType = `${z.infer<typeof error_rate_typeSchema>}`

export const min_reads_cutoff_unitSchema = z.enum(['reads', '%', 'other']);

export type min_reads_cutoff_unitType = `${z.infer<typeof min_reads_cutoff_unitSchema>}`

export const tax_assign_catSchema = z.enum(['sequence similarity', 'sequence composition', 'phylogeny', 'probabilistic', 'other']);

export type tax_assign_catType = `${z.infer<typeof tax_assign_catSchema>}`

export const samp_categorySchema = z.enum(['sample', 'negative control', 'positive control', 'PCR standard', 'other']);

export type samp_categoryType = `${z.infer<typeof samp_categorySchema>}`

export const verbatimCoordinateSystemSchema = z.enum(['decimal degrees', 'degrees minutes seconds', 'UTM', 'other']);

export type verbatimCoordinateSystemType = `${z.infer<typeof verbatimCoordinateSystemSchema>}`

export const verbatimSRSSchema = z.enum(['WGS84', 'NAD84', 'NAD27', 'GDA94', 'GDA2020', 'ETRS89', 'JGD2000', 'other']);

export type verbatimSRSType = `${z.infer<typeof verbatimSRSSchema>}`

export const eventDurationUnitSchema = z.enum(['minutes', 'hours', 'days', 'months', 'years']);

export type eventDurationUnitType = `${z.infer<typeof eventDurationUnitSchema>}`

export const samp_size_unitSchema = z.enum(['mL', 'L', 'mg', 'g', 'kg', 'cm2', 'm2', 'cm3', 'm3', 'other']);

export type samp_size_unitType = `${z.infer<typeof samp_size_unitSchema>}`

export const samp_store_solSchema = z.enum(['ethanol', 'sodium acetate', 'longmire', 'lysis buffer', 'none', 'other']);

export type samp_store_solType = `${z.infer<typeof samp_store_solSchema>}`

export const filter_materialSchema = z.enum(['cellulose', 'cellulose ester', 'glass fiber', 'thermoplastic membrane', 'track etched polycarbonate', 'nylon', 'other']);

export type filter_materialType = `${z.infer<typeof filter_materialSchema>}`

export const precip_chem_prepSchema = z.enum(['ethanol', 'isopropanol', 'sodium chloride', 'other']);

export type precip_chem_prepType = `${z.infer<typeof precip_chem_prepSchema>}`

export const prepped_samp_store_solSchema = z.enum(['ethanol', 'sodium acetate', 'longmire', 'lysis buffer', 'none', 'other']);

export type prepped_samp_store_solType = `${z.infer<typeof prepped_samp_store_solSchema>}`

export const samp_vol_we_dna_ext_unitSchema = z.enum(['mL', 'L', 'mg', 'g', 'kg', 'cm2', 'm2', 'cm3', 'm3', 'other']);

export type samp_vol_we_dna_ext_unitType = `${z.infer<typeof samp_vol_we_dna_ext_unitSchema>}`

export const nucl_acid_ext_lysisSchema = z.enum(['physical', 'chemical', 'enzymatic', 'thermal', 'osmotic', 'other']);

export type nucl_acid_ext_lysisType = `${z.infer<typeof nucl_acid_ext_lysisSchema>}`

export const nucl_acid_ext_sepSchema = z.enum(['column based', 'magnetic beads', 'centrifugation', 'precipitation', 'phenol chloroform', 'g', 'electrophoresis', 'other']);

export type nucl_acid_ext_sepType = `${z.infer<typeof nucl_acid_ext_sepSchema>}`

export const asv_methodSchema = z.enum(['dada2pe','dada2se','deblur','other']);

export type asv_methodType = `${z.infer<typeof asv_methodSchema>}`

export const dada2_pooling_methodSchema = z.enum(['independent','pseudo','standard']);

export type dada2_pooling_methodType = `${z.infer<typeof dada2_pooling_methodSchema>}`

export const dada2_chimera_methodSchema = z.enum(['consensus','none','pooled']);

export type dada2_chimera_methodType = `${z.infer<typeof dada2_chimera_methodSchema>}`