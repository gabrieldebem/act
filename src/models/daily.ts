import moment from "moment";

export class Daily {
  task: string;
  duration: string;

  constructor(
    task: string,
    duration: string
  ) {
    this.task = task;
    this.duration = duration;
  }

  static fromJson(data: any): Daily {
    return new Daily(
      data.description,
      moment().diff(moment(data.start), "minutes").toString() + " minutes"
    );
  }

  toString(): string {
    return `${this.task} - ${this.duration}`;
  }
}
