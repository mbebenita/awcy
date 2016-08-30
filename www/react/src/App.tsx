import * as React from "react";
import { Layout } from "./components/Layout"

export interface AppProps { runs?: any, jobs?: any }
export interface AppState { runs?: any, jobs?: any }

export class Run {

}

export enum JobStatus {
  Running,
  Pending
}

export interface Job {
  build_options: string;
  codec: string;
  commit: string;
  extra_options: string;
  nick: string;
  qualities: string;
  run_id: string;
  task: string;
  task_type: string;
  status: JobStatus;
}

export class App extends React.Component<AppProps, AppState> {
  constructor() {
    super();
    this.state = {
      runs: [],
      jobs: []
    };
  }

  componentWillMount() {
    this.loadJSON("list.json", (json) => {
      this.setState({runs: json});
    });
    this.loadJSON("run_job_queue.json", (json) => {
      this.setState({jobs: json});
    });
    this.loadJSON("run_job.json", (json) => {
      let job: Job = json;
      job.status = JobStatus.Running;
      let jobs = this.state.jobs.slice(0);
      jobs.push(json)
      this.setState({jobs: jobs});
    });

    // setInterval(() => {
    //   let runs = this.state.runs;
    //   runs.push({run_id: Math.random()});
    //   this.setState({runs: runs});
    // }, 5000);
  }

  loadJSON(path: string, next: (json: any) => void) {
    let xhr = new XMLHttpRequest();
    let self = this;
    xhr.open("GET", path, true);
    xhr.responseType = "json";
    xhr.send();
    xhr.addEventListener("load", function () {
      if (xhr.status != 200) {
        return;
      }
      next(this.response);
    });
  }

  render() {
    return <Layout runs={this.state.runs} jobs={this.state.jobs} />;
  }
}

/*
<Button bsSize="small">Test</Button>
      <Button bsSize="xsmall">Test</Button>
      <Button>Test</Button>
      <ProgressBar now={50}></ProgressBar>
      */