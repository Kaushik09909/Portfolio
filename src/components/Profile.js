import React from 'react';
import {Jumbotron, Container, TabContent, TabPane, Nav, NavItem, NavLink, Row } from "reactstrap";
import classnames from 'classnames';
import Experience from "./Experience";
import Education from './Education'
import MyProfile from '../MyProfile.json'
import axios from 'axios';
import { Button } from '@material-ui/core';
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      downloadFile: null,
      activeTab: '1'
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  printPDF() {
    console.log("hello");
    axios.get('http://server-inf.herokuapp.com/download',{
            responseType: 'blob'
    })
    .then(response => {
      const li = response.data;
      console.log(li);
      // const f = new Uint8Array(response.data);
      // console.log(f)
      const l = new Blob([response.data], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(l);
      window.open(fileURL);
    })
    .catch(err => {
      if(err) {
        alert("Requested resource not found. Please try again later!!!!!");
      }
    })
  }

  render() {
    return <div>
      <Jumbotron>
        <Container>
          <h1 className="display-3">{MyProfile.title}</h1>
          <p className="lead">{MyProfile.summary}</p>
        </Container>
      </Jumbotron>

      <Container>
        <Nav tabs>
          <NavItem>
            <NavLink className={classnames({ active: this.state.activeTab === '1' })}
                     onClick={() => { this.toggle('1'); }}>
              Experience
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={classnames({ active: this.state.activeTab === '2' })}
                     onClick={() => { this.toggle('2'); }}>
              Education
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Experience/>
          </TabPane>
          <TabPane tabId="2">
            <Education/>
          </TabPane>
        </TabContent>
        <Row>
          <Button variant="contained" color="primary" style={{ margin: 'auto', fontFamily: 'monospace' }} onClick={() => this.printPDF()}>
            <span>
              <GetAppRoundedIcon fontSize="default"/>
              Download Resume
            </span>
          </Button>
        </Row>
      </Container>
    </div>;
  }
}

export default Profile;