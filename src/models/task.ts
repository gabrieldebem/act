import moment from "moment";

export class Task {
  id: number;
  name: string;
  duration: number;
  start_at: string;

  constructor(
    id?: number,
    name?: string,
    duration?: number,
    start_at?: string,
  ) {
    this.id = id ?? 0;
    this.name = name ?? "";
    this.duration = duration ?? 0;
    this.start_at = start_at ?? "";
  }

  static fromJson(json: any): Task {
    const task = new Task();
    task.id = json.id;
    task.name = json.description;
    task.duration = moment().diff(moment(json.start), "minutes");
    task.start_at = json.start;

    return task;
  }
}
