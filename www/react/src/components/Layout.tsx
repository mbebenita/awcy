import * as React from "react";
import { Button } from "react-bootstrap";
import { ProgressBar } from "react-bootstrap";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import { Panel } from "react-bootstrap";
import { Tabs, Tab } from "react-bootstrap";

import { Runs } from "./Runs"
import { Jobs } from "./Jobs"

export interface LayoutProps { runs: any, jobs: any }
export interface LayoutState { }

export class Layout extends React.Component<LayoutProps, LayoutState> {
  constructor() {
    super();
  }

  render() {
    return <div>
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Are We Compressed Yet?</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
            <MenuItem eventKey={3.3}>Something else here</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={3.3}>Separated link</MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar>
      <Tabs defaultActiveKey={1} animation={false} id="noanim-tab-example">
        <Tab eventKey={1} title="Home">
          <Panel>
            <Row>
              <Col xs={6} md={4}>
                <Panel header={<h2>Runs</h2>}>
                  <Runs runs={this.props.runs}/>
                </Panel>
              </Col>
              <Col xs={6} md={8}>
                <Panel header={<h2>Graph</h2>}>
                  <Jobs jobs={this.props.jobs}/>
                </Panel>
              </Col>
            </Row>
          </Panel>
        </Tab>
        <Tab eventKey={2} title="Jobs">
          <Panel>
            <Row>
              <Col xs={6} md={4}>
                <Panel header={<h2>Jobs</h2>}>
                  <Jobs jobs={this.props.jobs}/>
                </Panel>
              </Col>
              <Col xs={6} md={8}>
                <Panel header={<h2>Status</h2>}>

                </Panel>
              </Col>
            </Row>
          </Panel>
        </Tab>
        <Tab eventKey={3} title="Timeline"></Tab>
        <Tab eventKey={4} title="Images"></Tab>
        <Tab eventKey={5} title="Analyzer"></Tab>
        <Tab eventKey={6} title="Help"></Tab>
      </Tabs>
    </div>;
  }
}

/*
<Runs runs={this.props.runs}/>
*/

/*
<Button bsSize="small">Test</Button>
      <Button bsSize="xsmall">Test</Button>
      <Button>Test</Button>
      <ProgressBar now={50}></ProgressBar>
      */