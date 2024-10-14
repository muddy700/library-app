import { ReactNode } from "react";

export interface SummaryCard {
	title: string;
	key: string;
	route?: string;
	value: number;
	icon: ReactNode;
}
