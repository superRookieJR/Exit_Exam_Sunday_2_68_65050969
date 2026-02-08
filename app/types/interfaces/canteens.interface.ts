import { IDepartment } from "./departments.interface";
import { IStall } from "./stalls.interface";

export interface ICanteen {
    id: number;
    code: string;
    name: string;
    position_id: number;
    departments?: IDepartment;
    stalls?: IStall[];
}
