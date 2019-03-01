import {Practice} from "./practice";

export class Plan {
  constructor(
    public id: string,
    public title: string,
    public createdBy: string,
    public practices: Practice[]
  ) {}
}
