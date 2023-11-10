import { Activity } from "./activity";

export interface Propuesta {
  id: number;
  title: string;
  description: string;
  image?: string;
  activities: Activity[];
}