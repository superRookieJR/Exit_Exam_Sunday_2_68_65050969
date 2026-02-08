import { ICanteen } from "./canteens.interface";

export interface IStall {
    id: number;
    name: string;
    canteen_id: number;
    canteens?: ICanteen;
}
