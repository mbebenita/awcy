import * as React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { Panel, Label, Col, Row, Button, ProgressBar, Badge, ButtonToolbar, DropdownButton, MenuItem } from "react-bootstrap";
import { bootstrapUtils} from "react-bootstrap/lib/utils";

import { Job, JobStatus } from "../App";

export interface JobsProps { runs: any; }
export interface JobsState { selectedNick?: string; selectedTask?: string; }

type JobListMap = { [name: string]: Job [] };

function addToMap<T>(map: { [name: string]: T [] }, key: string, element: T) {
  if (!map[key]) {
    map[key] = [];
  }
  map[key].push(element);
}

function getValue(object: any, names: string []) {
  var v = object;
  for (let i = 0; i < names.length; i++) {
    v = v[names[i]];
  }
  return v;
}


export class Jobs extends React.Component<JobsProps, JobsState> {
  constructor() {
    super();
  }

  renderJob(job: Job) {
    let progressBar = null;
    if (job.status === JobStatus.Running) {
      progressBar = <ProgressBar style={{marginTop: 8}} active now={50} label={"32 of 64"} />;
    }
    return <Panel key={job.run_id} header={job.run_id}>
      <div className="keyValuePair"><span className="key">Build Options</span>: {job.build_options}</div>
      <div className="keyValuePair"><span className="key">Codec</span>: {job.build_options}</div>
      <div className="keyValuePair"><span className="key">Commit</span>: {job.commit}</div>
      <div className="keyValuePair"><span className="key">Extra Options</span>: {job.extra_options}</div>
      <div className="keyValuePair"><span className="key">Nick</span>: {job.nick}</div>
      <div className="keyValuePair"><span className="key">Qualities</span>: {job.qualities}</div>
      <div className="keyValuePair"><span className="key">Run ID</span>: {job.run_id}</div>
      <div className="keyValuePair"><span className="key">Task</span>: {job.task}</div>
      <div className="keyValuePair"><span className="key">Task Type</span>: {job.task_type}</div>
      {progressBar}
      <ButtonToolbar style={{paddingTop: 8}}>
        <Button bsStyle="danger">Cancel</Button>
      </ButtonToolbar>
    </Panel>;
  }

  render() {
    let jobs = this.props.jobs;


    return <div>
      <div style={{height: "512px", overflow: "scroll"}}>
        {jobs.filter((job: Job) => {
          return true;
        }).map((job: Job) => {
          return this.renderJob(job);
        })}
      </div>
    </div>
  }
}
/*

build_options: string;
  codec: string;
  commit: string;
  extra_options: string;
  nick: string;
  qualities: string;
  run_id: string;
  task: string;
  task_type: string;

<div>
                <Button bsStyle="danger">Delete</Button>
              </div>

<Row>
                <Col xs={6} md={4}>
                  <ProgressBar active now={50} label={"HERE"} />
                </Col>
                <Col xs={6} md={8}>
                  <Button bsStyle="danger">Delete</Button>
                </Col>
              </Row>

              // return <ListGroupItem key={job.run_id}
            //   <h4>{job.run_id}</h4>
            //   <h6>{job.nick}</h6>
            // </ListGroupItem>;

              */