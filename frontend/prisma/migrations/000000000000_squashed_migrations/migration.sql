-- CreateEnum
CREATE TYPE "DeadBoolean" AS ENUM ('0', '1', 'not applicable', 'not collected', 'not provided', 'missing');

-- CreateEnum
CREATE TYPE "detection_type" AS ENUM ('targeted taxon detection', 'multi taxon detection', 'other');

-- CreateEnum
CREATE TYPE "neg_cont_type" AS ENUM ('site negative', 'field negative', 'process negative', 'extraction negative', 'PCR negative', 'other');

-- CreateEnum
CREATE TYPE "target_gene" AS ENUM ('12S rRNA', '16S rRNA', '18S rRNA', '23S rRNA', '28S rRNA', 'rbcL', 'CytB', 'COI', 'COII', 'COIII', 'nifH', 'ITS', 'ND1', 'ND2', 'ND3', 'ND4', 'ND5', 'ND6', 'amoA', 'rpoB', 'rpoC1', 'rpoC2', 'matK', 'trnH', 'trnL', 'psbK', 'D-loop', 'other');

-- CreateEnum
CREATE TYPE "probeQuencher" AS ENUM ('Zero-End Quencher (ZEN)', 'TAMRA', 'lowa Black', 'Minor Groove Binder (MGB)', 'Black Hole Quencher (BHQ)', 'other');

-- CreateEnum
CREATE TYPE "barcoding_pcr_appr" AS ENUM ('one-step PCR', 'two-step PCR', 'ligation-based', 'other');

-- CreateEnum
CREATE TYPE "platform" AS ENUM ('ILLUMINA', 'BGISEQ', 'CAPILLARY', 'DNBSEQ', 'ELEMENT', 'GENAPSYS', 'GENEMIND', 'HELICOS', 'ION_TORRENT', 'LS454', 'OXFORD_NANOPORE', 'PACBIO_SMRT', 'TAPESTRI', 'VELA_DIAGNOSTICS', 'ULTIMA', 'other');

-- CreateEnum
CREATE TYPE "lib_layout" AS ENUM ('paired end', 'single end', 'other');

-- CreateEnum
CREATE TYPE "error_rate_type" AS ENUM ('Phred score', 'expected error rate', 'other');

-- CreateEnum
CREATE TYPE "min_reads_cutoff_unit" AS ENUM ('reads', '%', 'other');

-- CreateEnum
CREATE TYPE "tax_assign_cat" AS ENUM ('sequence similarity', 'sequence composition', 'phylogeny', 'probabilistic', 'other');

-- CreateEnum
CREATE TYPE "samp_category" AS ENUM ('sample', 'negative control', 'positive control', 'PCR standard', 'other');

-- CreateEnum
CREATE TYPE "verbatimCoordinateSystem" AS ENUM ('decimal degrees', 'degrees minutes seconds', 'UTM', 'other');

-- CreateEnum
CREATE TYPE "verbatimSRS" AS ENUM ('WGS84', 'NAD84', 'NAD27', 'GDA94', 'GDA2020', 'ETRS89', 'JGD2000', 'other');

-- CreateEnum
CREATE TYPE "eventDurationUnit" AS ENUM ('minutes', 'hours', 'days', 'months', 'years');

-- CreateEnum
CREATE TYPE "samp_size_unit" AS ENUM ('mL', 'L', 'mg', 'g', 'kg', 'cm2', 'm2', 'cm3', 'm3', 'other');

-- CreateEnum
CREATE TYPE "samp_store_sol" AS ENUM ('ethanol', 'sodium acetate', 'longmire', 'lysis buffer', 'none', 'other');

-- CreateEnum
CREATE TYPE "filter_material" AS ENUM ('cellulose', 'cellulose ester', 'glass fiber', 'thermoplastic membrane', 'track etched polycarbonate', 'nylon', 'other');

-- CreateEnum
CREATE TYPE "precip_chem_prep" AS ENUM ('ethanol', 'isopropanol', 'sodium chloride', 'other');

-- CreateEnum
CREATE TYPE "prepped_samp_store_sol" AS ENUM ('ethanol', 'sodium acetate', 'longmire', 'lysis buffer', 'none', 'other');

-- CreateEnum
CREATE TYPE "samp_vol_we_dna_ext_unit" AS ENUM ('mL', 'L', 'mg', 'g', 'kg', 'cm2', 'm2', 'cm3', 'm3', 'other');

-- CreateEnum
CREATE TYPE "nucl_acid_ext_lysis" AS ENUM ('physical', 'chemical', 'enzymatic', 'thermal', 'osmotic', 'other');

-- CreateEnum
CREATE TYPE "nucl_acid_ext_sep" AS ENUM ('column-based', 'magnetic beads', 'centrifugation', 'precipitation', 'phenol chloroform', 'g', 'electrophoresis', 'other');

-- CreateTable
CREATE TABLE "Study" (
    "id" SERIAL NOT NULL,
    "project_id" TEXT NOT NULL,
    "recordedBy" TEXT NOT NULL,
    "recordedByID" TEXT,
    "project_contact" TEXT NOT NULL,
    "institution" TEXT,
    "institutionID" TEXT,
    "project_name" TEXT,
    "study_factor" TEXT,
    "detection_type" TEXT NOT NULL,
    "license" TEXT,
    "rightsHolder" TEXT,
    "accessRights" TEXT,
    "informationWithheld" TEXT,
    "dataGeneralizations" TEXT,
    "bibliographicCitation" TEXT,
    "associated_resource" TEXT,
    "mod_date" TIMESTAMP(3),
    "checkls_ver" DOUBLE PRECISION NOT NULL,
    "seq_archive" TEXT,
    "code_repo" TEXT,
    "expedition_id" TEXT,

    CONSTRAINT "Study_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sample" (
    "id" SERIAL NOT NULL,
    "samp_name" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "serial_number" TEXT,
    "materialSampleID" TEXT,
    "line_id" TEXT,
    "station_id" TEXT,
    "ctd_cast_number" TEXT,
    "ctd_bottle_number" TEXT,
    "replicate_number" TEXT,
    "extract_id" TEXT,
    "samp_category" TEXT NOT NULL,
    "decimalLatitude" DOUBLE PRECISION NOT NULL,
    "decimalLongitude" DOUBLE PRECISION NOT NULL,
    "verbatimLatitude" TEXT,
    "verbatimLongitude" TEXT,
    "verbatimCoordinateSystem" TEXT,
    "verbatimSRS" TEXT,
    "geo_loc_name" TEXT NOT NULL,
    "eventDate" TEXT NOT NULL,
    "eventDurationValue" DOUBLE PRECISION,
    "eventDurationUnit" TEXT,
    "verbatimEventDate" TEXT,
    "verbatimEventTime" TEXT,
    "verbatimDateEnd" TEXT,
    "verbatimTimeEnd" TEXT,
    "env_broad_scale" TEXT NOT NULL,
    "env_local_scale" TEXT NOT NULL,
    "env_medium" TEXT NOT NULL,
    "habitat_natural_artificial_0_1" BOOLEAN,
    "samp_collect_method" TEXT,
    "samp_collect_device" TEXT,
    "samp_size" DOUBLE PRECISION,
    "samp_size_unit" TEXT,
    "samp_store_temp" DOUBLE PRECISION,
    "samp_store_sol" TEXT,
    "samp_store_dur" TEXT,
    "samp_store_method_additional" TEXT,
    "samp_mat_process" TEXT,
    "filter_passive_active_0_1" BOOLEAN,
    "filter_onsite_dur" TEXT,
    "size_frac_low" DOUBLE PRECISION,
    "size_frac" DOUBLE PRECISION,
    "filter_diameter" DOUBLE PRECISION,
    "filter_surface_area" DOUBLE PRECISION,
    "filter_material" TEXT,
    "filter_name" TEXT,
    "precip_chem_prep" TEXT,
    "precip_force_prep" DOUBLE PRECISION,
    "precip_time_prep" DOUBLE PRECISION,
    "precip_temp_prep" DOUBLE PRECISION,
    "prepped_samp_store_temp" DOUBLE PRECISION,
    "prepped_samp_store_sol" TEXT,
    "prepped_samp_store_dur" DOUBLE PRECISION,
    "prep_method_additional" TEXT,
    "sample_derived_from" TEXT,
    "sample_composed_of" TEXT,
    "biological_rep_relation" TEXT,
    "samp_vol_we_dna_ext" DOUBLE PRECISION,
    "samp_vol_we_dna_ext_unit" TEXT,
    "nucl_acid_ext_lysis" TEXT,
    "nucl_acid_ext_sep" TEXT,
    "nucl_acid_ext" TEXT,
    "nucl_acid_ext_kit" TEXT,
    "nucl_acid_ext_modify" TEXT,
    "dna_cleanup_0_1" BOOLEAN,
    "dna_cleanup_method" TEXT,
    "concentration" DOUBLE PRECISION,
    "concentration_method" TEXT,
    "ratioOfAbsorbance260_280" DOUBLE PRECISION,
    "pool_dna_num" INTEGER,
    "nucl_acid_ext_method_additional" TEXT,
    "samp_weather" TEXT,
    "minimumDepthInMeters" DOUBLE PRECISION,
    "maximumDepthInMeters" DOUBLE PRECISION,
    "tot_depth_water_col" DOUBLE PRECISION,
    "elev" DOUBLE PRECISION,
    "temp" DOUBLE PRECISION,
    "chlorophyll" DOUBLE PRECISION,
    "light_intensity" DOUBLE PRECISION,
    "misc_param" DOUBLE PRECISION,
    "ph" DOUBLE PRECISION,
    "ph_meth" TEXT,
    "salinity" DOUBLE PRECISION,
    "suspend_part_matter" DOUBLE PRECISION,
    "tidal_stage" TEXT,
    "turbidity" DOUBLE PRECISION,
    "water_current" DOUBLE PRECISION,
    "solar_irradiance" TEXT,
    "wind_direction" TEXT,
    "wind_speed" DOUBLE PRECISION,
    "diss_inorg_carb" DOUBLE PRECISION,
    "diss_inorg_nitro" DOUBLE PRECISION,
    "diss_org_carb" DOUBLE PRECISION,
    "diss_org_nitro" DOUBLE PRECISION,
    "diss_oxygen" DOUBLE PRECISION,
    "tot_diss_nitro" DOUBLE PRECISION,
    "tot_inorg_nitro" DOUBLE PRECISION,
    "tot_nitro" DOUBLE PRECISION,
    "tot_part_carb" DOUBLE PRECISION,
    "tot_org_carb" DOUBLE PRECISION,
    "tot_org_c_meth" DOUBLE PRECISION,
    "tot_nitro_content" DOUBLE PRECISION,
    "tot_nitro_cont_meth" DOUBLE PRECISION,
    "tot_carb" DOUBLE PRECISION,
    "part_org_carb" DOUBLE PRECISION,
    "part_org_nitro" DOUBLE PRECISION,
    "nitrate" DOUBLE PRECISION,
    "nitrite" DOUBLE PRECISION,
    "nitro" DOUBLE PRECISION,
    "org_carb" DOUBLE PRECISION,
    "org_matter" DOUBLE PRECISION,
    "org_nitro" DOUBLE PRECISION,
    "phaeopigments" TEXT,
    "ammonium" TEXT,
    "phosphate" TEXT,
    "silicate" TEXT,

    CONSTRAINT "Sample_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assay" (
    "id" SERIAL NOT NULL,
    "assay_name" TEXT NOT NULL,
    "neg_cont_type" TEXT NOT NULL,
    "pos_cont_type" TEXT NOT NULL,
    "sterilise_method" TEXT,
    "pcr_0_1" BOOLEAN NOT NULL,
    "thermocycler" TEXT,
    "amplificationReactionVolume" DOUBLE PRECISION,
    "assay_validation" TEXT,
    "targetTaxonomicAssay" TEXT NOT NULL,
    "targetTaxonomicScope" TEXT,
    "target_gene" TEXT NOT NULL,
    "target_subfragment" TEXT,
    "ampliconSize" DOUBLE PRECISION,
    "pcr_primer_forward" TEXT NOT NULL,
    "pcr_primer_reverse" TEXT NOT NULL,
    "pcr_primer_name_forward" TEXT,
    "pcr_primer_name_reverse" TEXT,
    "pcr_primer_reference_forward" TEXT,
    "pcr_primer_reference_reverse" TEXT,
    "pcr_primer_vol_forward" DOUBLE PRECISION,
    "pcr_primer_vol_reverse" DOUBLE PRECISION,
    "pcr_primer_conc_forward" DOUBLE PRECISION,
    "pcr_primer_conc_reverse" DOUBLE PRECISION,
    "probeReporter" TEXT,
    "probeQuencher" TEXT,
    "probe_seq" TEXT,
    "probe_ref" TEXT,
    "probe_conc" DOUBLE PRECISION,
    "commercial_mm" TEXT,
    "custom_mm" TEXT,
    "pcr_dna_vol" DOUBLE PRECISION,
    "pcr_rep" INTEGER,
    "nucl_acid_amp" TEXT,
    "pcr_cond" TEXT,
    "annealingTemp" DOUBLE PRECISION,
    "pcr_cycles" DOUBLE PRECISION,
    "pcr_analysis_software" TEXT,
    "pcr_method_additional" TEXT,
    "pcr_plate_id" TEXT,
    "rel_cont_id" TEXT,

    CONSTRAINT "Assay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Library" (
    "id" SERIAL NOT NULL,
    "library_id" TEXT NOT NULL,
    "assay_name" TEXT NOT NULL,
    "barcoding_pcr_appr" TEXT,
    "platform" TEXT,
    "instrument" TEXT,
    "seq_kit" TEXT,
    "lib_layout" TEXT,
    "sequencing_location" TEXT,
    "adapter_forward" TEXT,
    "adapter_reverse" TEXT,
    "lib_screen" TEXT,
    "seq_method_additional" TEXT,
    "mid_forward" TEXT,
    "mid_reverse" TEXT,
    "filename" TEXT,
    "filename2" TEXT,
    "seq_run_id" TEXT,
    "biosample_accession" TEXT,
    "input_read_count" INTEGER,
    "seq_samp_id" TEXT,
    "associatedSequences" TEXT,

    CONSTRAINT "Library_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Analysis" (
    "id" SERIAL NOT NULL,
    "project_id" TEXT NOT NULL,
    "assay_name" TEXT NOT NULL,
    "sop_bioinformatics" TEXT,
    "trim_method" TEXT,
    "trim_param" TEXT,
    "demux_tool" TEXT,
    "demux_max_mismatch" INTEGER,
    "merge_tool" TEXT,
    "merge_min_overlap" INTEGER,
    "min_len_cutoff" INTEGER,
    "min_len_tool" TEXT,
    "error_rate_tool" TEXT,
    "error_rate_type" TEXT,
    "error_rate_cutoff" DOUBLE PRECISION,
    "chimera_check_method" TEXT,
    "chimera_check_param" TEXT,
    "otu_clust_tool" TEXT,
    "otu_clust_cutoff" DOUBLE PRECISION,
    "min_reads_cutoff" DOUBLE PRECISION,
    "min_reads_cutoff_unit" TEXT,
    "min_reads_tool" TEXT,
    "otu_db" TEXT,
    "otu_db_custom" TEXT,
    "tax_assign_cat" TEXT,
    "otu_seq_comp_appr" TEXT,
    "tax_class_id_cutoff" DOUBLE PRECISION,
    "tax_class_query_cutoff" DOUBLE PRECISION,
    "tax_class_collapse" TEXT,
    "tax_class_other" TEXT,
    "screen_contam_method" TEXT,
    "screen_geograph_method" TEXT,
    "screen_nontarget_method" TEXT,
    "screen_other" TEXT,
    "bioinfo_method_additional" TEXT,

    CONSTRAINT "Analysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Observation" (
    "id" SERIAL NOT NULL,
    "samp_name" TEXT NOT NULL,
    "featureid" TEXT NOT NULL,

    CONSTRAINT "Observation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Occurrence" (
    "id" SERIAL NOT NULL,
    "samp_name" TEXT NOT NULL,
    "analysisId" INTEGER NOT NULL,
    "featureid" TEXT NOT NULL,
    "taxonomy" TEXT NOT NULL,
    "organismQuantity" INTEGER NOT NULL,

    CONSTRAINT "Occurrence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feature" (
    "id" SERIAL NOT NULL,
    "featureid" TEXT NOT NULL,
    "consensusTaxonomyId" TEXT,
    "dna_sequence" TEXT NOT NULL,

    CONSTRAINT "Feature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assignment" (
    "id" SERIAL NOT NULL,
    "analysisId" INTEGER NOT NULL,
    "featureid" TEXT NOT NULL,
    "taxonomy" TEXT NOT NULL,
    "Confidence" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Assignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Taxonomy" (
    "id" SERIAL NOT NULL,
    "taxonomy" TEXT NOT NULL,
    "verbatimIdentification" TEXT NOT NULL,
    "domain" TEXT,
    "kingdom" TEXT,
    "supergroup" TEXT,
    "division" TEXT,
    "subdivision" TEXT,
    "phylum" TEXT,
    "class" TEXT,
    "order" TEXT,
    "family" TEXT,
    "genus" TEXT,
    "species" TEXT,

    CONSTRAINT "Taxonomy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GenericData" (
    "id" SERIAL NOT NULL,
    "project_id" TEXT,
    "samp_name" TEXT,
    "assay_name" TEXT,
    "library_id" TEXT,
    "analysisId" INTEGER,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "GenericData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AssayToSample" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_AnalysisToLibrary" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Study_project_id_key" ON "Study"("project_id");

-- CreateIndex
CREATE UNIQUE INDEX "Sample_samp_name_key" ON "Sample"("samp_name");

-- CreateIndex
CREATE UNIQUE INDEX "Assay_assay_name_key" ON "Assay"("assay_name");

-- CreateIndex
CREATE UNIQUE INDEX "Library_library_id_key" ON "Library"("library_id");

-- CreateIndex
CREATE UNIQUE INDEX "Observation_samp_name_featureid_key" ON "Observation"("samp_name", "featureid");

-- CreateIndex
CREATE UNIQUE INDEX "Occurrence_analysisId_samp_name_featureid_taxonomy_key" ON "Occurrence"("analysisId", "samp_name", "featureid", "taxonomy");

-- CreateIndex
CREATE UNIQUE INDEX "Feature_featureid_key" ON "Feature"("featureid");

-- CreateIndex
CREATE UNIQUE INDEX "Assignment_analysisId_featureid_taxonomy_key" ON "Assignment"("analysisId", "featureid", "taxonomy");

-- CreateIndex
CREATE UNIQUE INDEX "Taxonomy_taxonomy_key" ON "Taxonomy"("taxonomy");

-- CreateIndex
CREATE UNIQUE INDEX "_AssayToSample_AB_unique" ON "_AssayToSample"("A", "B");

-- CreateIndex
CREATE INDEX "_AssayToSample_B_index" ON "_AssayToSample"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AnalysisToLibrary_AB_unique" ON "_AnalysisToLibrary"("A", "B");

-- CreateIndex
CREATE INDEX "_AnalysisToLibrary_B_index" ON "_AnalysisToLibrary"("B");

-- AddForeignKey
ALTER TABLE "Sample" ADD CONSTRAINT "Sample_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Study"("project_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Library" ADD CONSTRAINT "Library_assay_name_fkey" FOREIGN KEY ("assay_name") REFERENCES "Assay"("assay_name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Analysis" ADD CONSTRAINT "Analysis_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Study"("project_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Analysis" ADD CONSTRAINT "Analysis_assay_name_fkey" FOREIGN KEY ("assay_name") REFERENCES "Assay"("assay_name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Observation" ADD CONSTRAINT "Observation_samp_name_fkey" FOREIGN KEY ("samp_name") REFERENCES "Sample"("samp_name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Observation" ADD CONSTRAINT "Observation_featureid_fkey" FOREIGN KEY ("featureid") REFERENCES "Feature"("featureid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Occurrence" ADD CONSTRAINT "Occurrence_samp_name_featureid_fkey" FOREIGN KEY ("samp_name", "featureid") REFERENCES "Observation"("samp_name", "featureid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Occurrence" ADD CONSTRAINT "Occurrence_analysisId_featureid_taxonomy_fkey" FOREIGN KEY ("analysisId", "featureid", "taxonomy") REFERENCES "Assignment"("analysisId", "featureid", "taxonomy") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feature" ADD CONSTRAINT "Feature_consensusTaxonomyId_fkey" FOREIGN KEY ("consensusTaxonomyId") REFERENCES "Taxonomy"("taxonomy") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "Analysis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_featureid_fkey" FOREIGN KEY ("featureid") REFERENCES "Feature"("featureid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_taxonomy_fkey" FOREIGN KEY ("taxonomy") REFERENCES "Taxonomy"("taxonomy") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenericData" ADD CONSTRAINT "GenericData_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Study"("project_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenericData" ADD CONSTRAINT "GenericData_samp_name_fkey" FOREIGN KEY ("samp_name") REFERENCES "Sample"("samp_name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenericData" ADD CONSTRAINT "GenericData_assay_name_fkey" FOREIGN KEY ("assay_name") REFERENCES "Assay"("assay_name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenericData" ADD CONSTRAINT "GenericData_library_id_fkey" FOREIGN KEY ("library_id") REFERENCES "Library"("library_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenericData" ADD CONSTRAINT "GenericData_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "Analysis"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AssayToSample" ADD CONSTRAINT "_AssayToSample_A_fkey" FOREIGN KEY ("A") REFERENCES "Assay"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AssayToSample" ADD CONSTRAINT "_AssayToSample_B_fkey" FOREIGN KEY ("B") REFERENCES "Sample"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnalysisToLibrary" ADD CONSTRAINT "_AnalysisToLibrary_A_fkey" FOREIGN KEY ("A") REFERENCES "Analysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnalysisToLibrary" ADD CONSTRAINT "_AnalysisToLibrary_B_fkey" FOREIGN KEY ("B") REFERENCES "Library"("id") ON DELETE CASCADE ON UPDATE CASCADE;

