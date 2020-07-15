import React from 'react';
import {Container, Row, Col, Media} from 'reactstrap';
import axios from 'axios';
// import moment from 'moment';
import MyProfile from '../MyProfile';

class Education extends React.Component {

  printPDF() {
    console.log("hello");
    axios.get('http://localhost:8080/getpdf1'
    , {
            responseType: 'blob'
    }
    )
    .then(response => {
      const li = response.data;
      console.log(li);
      // const f = new Uint8Array(response.data);
      // console.log(f)
      const l = new Blob([response.data], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(l);
      window.open(fileURL);
    })
    .catch(() => console.log("Can’t access url. Blocked by browser?"))
  }

  render() {
    return <Container>
      <Row>
        <Col>
          {MyProfile.studies.map(function (study, i) {
            return <Media key={i}>
              <Media left top href={study.url}>
                <Media object src={study.logo} alt={study.institute}/>
              </Media>
              <Media body>
                <Media heading>
                  <a href={study.url}>{study.institute}</a>
                </Media>
                {
                  [
                    {
                      "key": "Title",
                      "value": study.title
                    },
                    {
                      "key": "Graduation Year",
                      "value": study.graduationYear
                    },
                    {
                      "key": "Duration",
                      "value": study.durationInYears + " year(s)"
                    }
                  ].map(function (object, i) {
                    return <div>
                      <Row>
                        <Col className="formLabel">{object.key}:</Col>
                      </Row>
                      <Row>
                        <Col>{object.value}</Col>
                      </Row>
                    </div>
                  })
                }
              </Media>
            </Media>
          })}
        </Col>
      </Row>
      <Row>
        <input type="button" style={{ margin: 'auto' }} onClick={() => this.printPDF()} value="Print PDF" />
      </Row>
      {/* <br/>
      <br/>
      <Row>
        <Col>
          <h4>Certifications:</h4>
          <hr/>
          {MyProfile.certifications.map(function (certification, i) {
            const verification = certification.verificationLink ?
              <Row>
                <Col>
                  <a className="certificateLink" href={certification.verificationLink}>See certificate</a>
                </Col>
              </Row> : "";
            return <Media key={i}>
              <Media left top href={certification.url}>
                <Media object src={certification.logo} alt={certification.title}/>
              </Media>
              <Media body>
                <Media heading>
                  <a href={certification.url}>{certification.title}</a>
                </Media>
                <Row>
                  <Col>{moment(certification.issueDate).format('MMM YYYY')} - {(certification.expiryDate) ? moment(certification.expiryDate).format('MMM YYYY') : 'Present'}</Col>
                </Row>
                <Row>
                  <Col>{certification.issuer}</Col>
                </Row>
                {verification}
              </Media>
            </Media>
          })}
        </Col>
      </Row> */}
    </Container>
  }
}

export default Education;
