import axios from "axios";
import moment from "moment";
import { Task } from "../models/task";
import { Daily } from "../models/daily";

export class TogglRepository {
  constructor(private url: string, private token: string, private workspace: string,) { }

  async me() {
    const resp = await axios.get(`${this.url}/me`, {
      auth: {
        username: this.token,
        password: "api_token",
      }
    });

    return resp.data;
  }

  async initTask(name: string) {
    const data = {
      created_with: "CLI",
      description: name,
      tags: [],
      billable: false,
      workspace_id: parseInt(this.workspace),
      start: moment().toISOString(),
      duration: -1,
      stop: null
    };
    const resp = await axios.post(`${this.url}/workspaces/${this.workspace}/time_entries`, data, {
      auth: {
        username: this.token,
        password: "api_token",
      },
      headers: {
        'Content-Type': 'application/json',
      }
    });

    return Task.fromJson(resp.data);
  }

  async current() {
    const resp = await axios.get(`${this.url}/me/time_entries/current`, {
      auth: {
        username: this.token,
        password: "api_token",
      }
    });

    if (resp.data == null) {
      console.log("No current task");
      process.exit(1);
    }
    return Task.fromJson(resp.data);
  }

  async stopTask() {
    const currentTask = await this.current();
    const resp = await axios.patch(`${this.url}/workspaces/${this.workspace}/time_entries/${currentTask.id}/stop`, null, {
      auth: {
        username: this.token,
        password: "api_token",
      }
    });

    return Task.fromJson(resp.data);
  }

  async listTasksFromYesterday() {
    const yesterday = moment().subtract(1, 'days').toISOString();
    const today = moment().toISOString();
    const resp = await axios.get(`${this.url}/me/time_entries?start_date=${yesterday}&end_date=${today}`, {
      auth: {
        username: this.token,
        password: "api_token",
      }
    });

    return resp.data.map((task: any) => Daily.fromJson(task).toString());
  }
}
