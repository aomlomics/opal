import { detection_type, target_gene } from "@prisma/client";
// I can import enums from our DB

// Add RangeValue type
export type RangeValue = {
  min?: number;
  max?: number;
};

// Update FilterValue to include RangeValue
export type FilterValue = string | RangeValue | undefined;

export type FilterConfig = {
  field: string;
  label: string;
  type: 'select' | 'multiselect' | 'date' | 'range';
  options?: string[];
  enumType?: any;
  min?: number;  // Add these for range type filters
  max?: number;  // Add these for range type filters
};

export type TableFilterConfig = {
  [key: string]: FilterConfig[];
};

// Define filters for each table
const FILTER_CONFIGS: TableFilterConfig = {
  project: [
    {
      field: "detection_type",
      label: "Detection Type",
      type: "select",
      enumType: detection_type
    },
    {
      field: "institution",
      label: "Institution",
      type: "select",
      options: ["NOAA", "University", "Research Center"] // will need to fetch these from DB
    }
  ],
  analysis: [
    {
      field: "asv_method",
      label: "Analysis Method",
      type: "select",
      options: ["DADA2", "Deblur", "Other"]
    },
    {
      field: "target_gene",
      label: "Target Gene",
      type: "select",
      enumType: target_gene
    }
  ],
  feature: [
    {
      field: "dna_sequence_length",
      label: "Sequence Length",
      type: "range"
    }
  ],
  taxonomy: [
	{
		field: "taxonomic_rank",
		label: "Taxonomic Rank",
		type: "select",
		options: ["kingdom", "phylum", "class", "order", "family", "genus", "species"]
	}
  ]
};

export { FILTER_CONFIGS };