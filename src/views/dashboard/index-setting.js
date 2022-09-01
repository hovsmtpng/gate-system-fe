import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
// import Card from '../../../components/Card'
import Card from "../../components/Card";

//import Sweet Alert
import swal from "sweetalert";

const FormElement = () => {
  let [result, setResult] = useState({
    headerName: "",
    inOut: "",
    terminalName: "",
    gateName: "",
    stid: "",
    NumberCopied:"",
    logo: ""
  });
  const [Img, setImg] = useState();
  const [imageHeader, setimageHeader] = useState([]);
  const [selectedFile, setSelectedFile] = useState();

  function Clock() {
    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    setTimeout(function() {   
    const a = new Date();
    const d = days[a.getDay()] + ', ' +a.getDate() + ' ' + months[a.getMonth()] + ' ' + a.getFullYear();
    const n = a.getHours() + ':' + a.getMinutes() + ':' + a.getSeconds();
    document.getElementById("clock").innerHTML = d+" | "+n;
    Clock();          
    }, 1000)
}

const fetchImage = async () => {
  // ...dataHeader.logo
  const imageUrl = result.logo;
  const res = await fetch(`http://localhost:8080/fetchImage\\`+imageUrl);
  const imageBlob = await res.blob();
  const imageObjectURL = URL.createObjectURL(imageBlob);
  setImg(imageObjectURL);
};
  useEffect(() => {
    Clock();
    axios
      .get("http://localhost:8080/readsettingjson")
      .then((response) => {
        setResult(response.data.data[0])
        setimageHeader(response.data.data[0])
      })
      .catch((error) => error);
      fetchImage();
      // eslint-disable-next-line
  }, []);
  useEffect(() => {
      fetchImage();
      // eslint-disable-next-line
  }, [imageHeader.logo]);

  function handleOnChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setResult({ ...result, [name]: value });
  }
  function handleFile(e) {
    setSelectedFile(e.target.files[0]);
    setResult({ ...result, logo: e.target.files[0].name });
    setSelectedFile(e.target.files[0]);
  }

  console.log(result);
  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    let filename = result.logo;
    let extension = filename.split(".").pop();
    formData.append("file", selectedFile);
    formData.append("headerName", result.headerName);
    formData.append("inOut", result.inOut);
    formData.append("terminalName", result.terminalName);
    formData.append("gateName", result.gateName);
    formData.append("stid", result.stid);
    formData.append("NumberCopied", result.NumberCopied);
    formData.append("logo", "logo."+extension);

    if (
      result.headerName === "" ||
      result.inOut === "" ||
      result.terminalName === "" ||
      result.gateName === "" ||
      result.stid === "" ||
      result.NumberCopied === "" 
    ) {
      swal({
        text: "Update data gagal",
        icon: "error",
      });
    } else {
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };

      axios
        .post("http://localhost:8080/createsettingjson", formData, config)
        .then((res) => {
          // then print response status
          console.log(res.data, "---data response");
          swal({
            text: "Update data success",
            icon: "success",
          });
          window.location.reload()
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <div>
        <Row>
          <Col>
            <div>
              <Row>
                <Col sm="12" lg="12">
                  <Card>
                    <Card.Header className="d-flex justify-content-between">
                      <div className="header-title">
                        <h4 className="card-title">Terminal {result.terminalName} {result.headerName}</h4>
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <p id='clock'></p>
                      <Form>
                        <Row>
                          <Col sm="12" lg="6">
                            <Form.Group className="form-group">
                              <Form.Label htmlFor="exampleInputText1">
                                Header Name{" "}
                              </Form.Label>
                              <Form.Control
                                type="text"
                                id="exampleInputText1"
                                value={result.headerName}
                                placeholder="Enter Header Name"
                                name="headerName"
                                onChange={(e) => handleOnChange(e)}
                              />
                            </Form.Group>
                          </Col>
                          <Col sm="12" lg="6">
                            <Form.Group className="form-group">
                              <Form.Label>Gate</Form.Label>
                              <Form.Control
                                type="text"
                                id="exampleInputText1"
                                value={result.gateName}
                                placeholder="Enter Header Name"
                                name="gateName"
                                onChange={(e) => handleOnChange(e)}
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col sm="12" lg="4">
                            <Form.Group className="form-group">
                              <Form.Label>In / Out</Form.Label>
                              <select
                                className="form-select mb-3 shadow-none"
                                name="inOut"
                                onChange={(e) => handleOnChange(e)}
                              >
                                {/* <option defaultValue>-- [Select] --</option> */}
                                <option
                                  value="TI"
                                  selected={
                                    result.inOut === "TI" ? "selected" : ""
                                  }
                                >
                                  Truck In
                                </option>
                                <option
                                  value="TO"
                                  selected={
                                    result.inOut === "TO" ? "selected" : ""
                                  }
                                >
                                  Truck Out
                                </option>
                              </select>
                            </Form.Group>
                          </Col>
                          <Col sm="12" lg="4">
                            <Form.Group className="form-group">
                              <Form.Label>STID</Form.Label>
                              <select
                                className="form-select mb-3 shadow-none"
                                name="stid"
                                onChange={(e) => handleOnChange(e)}
                              >
                                {/* <option defaultValue>-- [Select] --</option> */}
                                <option
                                  value="Y"
                                  selected={
                                    result.stid === "Y" ? "selected" : ""
                                  }
                                >
                                  Yes
                                </option>
                                <option
                                  value="N"
                                  selected={
                                    result.stid === "N" ? "selected" : ""
                                  }
                                >
                                  No
                                </option>
                              </select>
                            </Form.Group>
                          </Col>
                          <Col sm="12" lg="4">
                          <Form.Group className="form-group">
                              <Form.Label>Banyak Copied</Form.Label>
                              <select
                                className="form-select mb-3 shadow-none"
                                name="NumberCopied"
                                onChange={(e) => handleOnChange(e)}
                              >
                                {/* <option defaultValue>-- [Select] --</option> */}
                                <option
                                  value="1"
                                  selected={
                                    result.NumberCopied === "1" ? "selected" : ""
                                  }
                                >
                                  1
                                </option>
                                <option
                                  value="2"
                                  selected={
                                    result.NumberCopied === "2" ? "selected" : ""
                                  }
                                >
                                  2
                                </option>
                              </select>
                            </Form.Group>
                          </Col>
                        </Row>
                        

                        <Row>
                          <Col sm="12" lg="6">
                            <Form.Group className="form-group">
                              <Form.Label htmlFor="exampleInputText1">
                                Terminal Code{" "}
                              </Form.Label>
                              <Form.Control
                                type="text"
                                id="exampleInputText1"
                                value={result.terminalName}
                                placeholder="Enter Header Name"
                                name="terminalName"
                                onChange={(e) => handleOnChange(e)}
                              />
                            </Form.Group>
                          </Col>
                          <Col sm="12" lg="6">
                            <Form.Group className="form-group">
                              <Form.Label className="custom-file-input">
                                Logo
                              </Form.Label>
                              <Form.Control
                                type="file"
                                id="customFile"
                                name="file"
                                onChange={(e) => handleFile(e)}
                              />
                              <img src={Img} alt="icons" style={{height:'80px'}}/>
                            </Form.Group>
                          </Col>
                        </Row>
                        <div style={{ float: "right" }}>
                          <Button type="button" variant="btn btn-danger">
                            cancel
                          </Button>
                          {"  "}
                          <Button
                            type="button"
                            variant="btn btn-primary"
                            onClick={(e) => handleSubmit(e)}
                          >
                            Submit
                          </Button>
                        </div>
                      </Form>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default FormElement;
