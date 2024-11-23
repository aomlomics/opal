import studySubmitAction from "@/app/helpers/actions/studySubmit";
import analysisSubmitAction from "@/app/helpers/actions/analysis/submit/analysisSubmit";
import assignSubmitAction from "@/app/helpers/actions/analysis/submit/assignSubmit";
import occSubmitAction from "@/app/helpers/actions/analysis/submit/occSubmit";

import analysisDeleteAction from "@/app/helpers/actions/analysis/delete/analysisDelete";
import assignDeleteAction from "@/app/helpers/actions/analysis/delete/assignDelete";

export type SubmitAction =
	| typeof studySubmitAction
	| typeof analysisSubmitAction
	| typeof assignSubmitAction
	| typeof occSubmitAction;

export type DeleteAction = typeof analysisDeleteAction | typeof assignDeleteAction;

export type SubmitActionReturn = Promise<{
	message: string;
	result?: Record<string, any>;
	error?: string;
}>;
