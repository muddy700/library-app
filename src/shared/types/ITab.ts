import { ReactNode } from "react";

export interface ITab {
	label: string;
	value: string;
	icon: ReactNode;
	content: ReactNode;
}
