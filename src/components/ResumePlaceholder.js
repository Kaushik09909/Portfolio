import React from 'react';
import { Button, IconButton } from '@material-ui/core';
import BackupRoundedIcon from '@material-ui/icons/BackupRounded';
// import FileSaver from 'file-saver';
import axios from 'axios';
import '../ResumePlaceholder.css';

class ResumePlaceholder extends React.Component {
    constructor(props) {
        super();
        this.state = {
            selectedFile: null,
            upload: false,
        }
    }

    // On file select (from the pop up) 
    onFileChange = e => { 
        // Update the state 
        console.log(e.target.files);
        if(e.target.files[0].type === "application/pdf") {
            this.setState({ selectedFile: e.target.files[0], upload: false }); 
        } else {
            this.setState({ selectedFile: "Please upload file in pdf format!!!!!!!!!" })
        }
    };

    onFileUpload = () => {
        const { state: { selectedFile } } = this;
        const formData = new FormData();
        if( selectedFile === null ) {
            this.setState({ upload: true });
        } else {
            formData.append(
                "file",
                selectedFile,
                selectedFile.name
            );
            // let blob = new Blob([selectedFile], { type: "application/pdf" });
            // console.log(blob);
            // FileSaver.saveAs(blob, "Resume.pdf");
            // axios.post("http://localhost:3001/upload", formData, {
            //     //Post request to upload resume to server
            // })
            axios.post("http://server-inf.herokuapp.com/upload", formData, {
                //Post request to upload resume to server
            })
            .then(res => {
                if(res.status === 200) {
                    alert("File uploaded succefully😍");
                }
            })
            .catch(err => {
                alert(err);
            })
            this.setState({ upload: false })
        };
    };

    render() {
        let { state: { selectedFile, upload } } = this;
        return (
            <div className="backgroundImage" style={{ height: window.innerHeight, width:window.innerWidth }}>
                <label className="position">
                    <h3 style={{ color: 'chocolate' }}>Upload your resume in pdf format.</h3>
                    <input type="file" id="upload-resume" name="upload-resume" onChange={this.onFileChange} style={{ display: 'none' }}/>
                    <IconButton variant="contained" color="secondary" component="span">
                        <BackupRoundedIcon fontSize="large" />
                    </IconButton>
                    <h5 style={{ color: 'navy' }}>{selectedFile !== null ? (selectedFile.name === undefined ? selectedFile : selectedFile.name) : ""}</h5>
                    <Button variant="contained" color="secondary" style={{ margin: '10px', fontFamily: 'monospace', fontSize: '13px' }} onClick={this.onFileUpload}>
                        Upload
                    </Button>
                    <h5 style={{ color: 'red' }}>{upload ? "Upload your resume to continue😠" : ""}</h5>
                </label>
            </div>
        );
    }
}

export default ResumePlaceholder;