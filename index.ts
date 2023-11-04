import { configDotenv } from "dotenv";
import { TogglRepository } from "./src/repositories/toggl.repository";
import chalk, { Chalk } from "chalk";

const args = process.argv.slice(2);
configDotenv();

const togglUrl = process.env.TOGGL_URL;
const togglToken = process.env.TOGGL_TOKEN;
const togglWorkspace = process.env.TOGGL_WORKSPACE;

const r: TogglRepository = new TogglRepository(togglUrl, togglToken, togglWorkspace);

const bootstrap = () => {
  switch (args[0]) {
    case "start":
      console.log(chalk.greenBright("Task Started: "));
      r.initTask(args[1]).then((data) => console.log(chalk.bgGreenBright.black(JSON.stringify(data, null, 2))));
      break;
    case "current":
      console.log(chalk.blueBright("Current Task: "));
      r.current().then((data) => console.log(chalk.bgBlueBright.black(JSON.stringify(data, null, 2))));
      break;
    case "stop":
      console.log(chalk.yellowBright("Task Stoped: "));
      r.stopTask().then((data) => {
        console.log(chalk.bgYellowBright.black(JSON.stringify(data, null, 2)));
      });
      break;
    case "daily":
      console.log(chalk.greenBright("Daily Report: "));
      r.listTasksFromYesterday().then((data) => console.log(chalk.bgGreenBright.black(JSON.stringify(data, null, 2))));
      break;
    default:
      console.log(chalk.redBright("Invalid Command"));
      break;
  }
}

bootstrap();
