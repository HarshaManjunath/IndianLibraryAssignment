/** @format */

import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import dateFormat from "dateformat";

import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  // TimePicker,
  DatePicker,
} from "material-ui-pickers";
// import DateFnsUtils from "@date-io/date-fns";

// import dateFormat from "dateformat";
// import { MuiPickersUtilsProvider, DatePicker, TimePicker } from "material-ui-pickers";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, CardHeader, CardBody, FormGroup, Form, Input, Container, Row, Col, CardImg, Button } from "reactstrap";

class Homepage extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      published: 0,
      author: "",
      domain: "",
      data: [],
      listData: [],
      availabilityDate: null,
    };
    this.handlList = this.handlList.bind(this);
  }

  componentDidMount() {
    this.handlList();
  }
  handlList = () => {
    axios
      .get("http://localhost:3000/listLibrary")
      .then((res) => {
        console.log("res.data.data", res.data.data);
        const k = 1;
        for (let i = 0; i < res.data.data.length; i++) {
          res.data.data[i].sno = k + +i;
        }
        this.setState({
          data: res.data.data,
        });
      })
      .catch((err) => {
        alert(err);
      });
  };
  handleDateChange = (event) => {
    this.setState({ availabilityDate: dateFormat(event, "yyyy/mm/dd") });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleClick = () => {
    axios
      .post("http://localhost:3000/addLibrary?name=" + this.state.name + "&published=" + this.state.published + "&author=" + this.state.author + "&domain=" + this.state.domain + "&availabilityDate=" + this.state.availabilityDate)
      .then((res) => {
        if (res.data.status === "Success") {
          this.setState({
            listData: res.data.data,
          });
          alert("Successfully Added");
          this.handlList();
        } else {
          alert(res.data.status);
        }
      })
      .catch((err) => {});
  };

  render() {
    const rowHeight = 35;
    console.log("listdata", this.state.data);

    const columnDefs = [
      {
        headerName: "Sl No",
        field: "sno",
        maxWidth: 70,
        cellStyle: { textAlign: "center" },
        minWidth: 70,
      },
      {
        headerName: `Name`,
        field: "name",
        minWidth: 90,
      },

      {
        headerName: "Published",
        field: "published",
        cellStyle: { textAlign: "center" },
        enableCellTextSelection: true,
        minWidth: 90,
      },
      {
        headerName: "Author",
        field: "author",
        cellStyle: { textAlign: "center" },
        enableCellTextSelection: true,
        minWidth: 90,
      },
      {
        headerName: "Domain",
        field: "domain",
        cellStyle: { textAlign: "center" },
        enableCellTextSelection: true,
        minWidth: 90,
      },
      {
        headerName: "isAvailable",
        field: "isAvailable",
        cellStyle: { textAlign: "center" },
        cellRendererFramework: function (params) {
          return <>{`${params.data.isAvailable === false ? "Not Available" : "Available"}`}</>;
        },

        enableCellTextSelection: true,
        minWidth: 90,
      },
      {
        headerName: "Availability Date",
        field: "availabilityDate",
        cellStyle: { textAlign: "center" },
        enableCellTextSelection: true,
        minWidth: 90,
      },

      {
        headerName: "Action",
        field: "_id",
        cellStyle: { textAlign: "center" },
        cellRendererFramework: function (params) {
          return (
            <>
              <Link style={{ color: "white" }} to={`/editBook/${params.data._id}`}>
                <Button color="primary" size="sm">
                  Edit
                </Button>
              </Link>
              &nbsp;
              <Button
                color="primary"
                size="sm"
                onClick={() => {
                  axios
                    .delete("http://localhost:3000/deleteLibrary?id=" + params.data._id)
                    .then((res) => {
                      alert(res.data.status);
                      window.location.reload();
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              >
                Delete
              </Button>
            </>
          );
        },
      },
    ];

    return (
      <>
        <hr className="my-4" />
        <div className="main-content" ref="mainContent">
          <Container className="mt--7" fluid>
            <Row>
              <Col className="col" xl="">
                <Card>
                  <CardHeader className="blue">
                    <Row className="align-items-center">
                      <Col>
                        <center>
                          <h3 className="heading- text- mb-">Add Books to Indian Central Library</h3>
                        </center>
                      </Col>
                    </Row>
                  </CardHeader>

                  <hr className="my-4" />

                  <CardBody>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-username">
                            Name
                          </label>
                          <Input type="text" className="form-control" placeholder="Name" onChange={this.handleChange} name="name" />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-username">
                            Published
                          </label>
                          <Input type="text" className="form-control" placeholder="Published" onChange={this.handleChange} name="published" />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-username">
                            Author
                          </label>
                          <Input type="text" className="form-control" placeholder="author" onChange={this.handleChange} name="author" />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-username">
                            domain
                          </label>
                          <Input type="text" className="form-control" placeholder="domain" onChange={this.handleChange} name="domain" />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-username">
                            availabilityDate
                          </label>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Row>
                              <Col lg="6">
                                <DatePicker label="availabilityDate" placeHoleder="availabilityDate" variant="outlined" disablePast value={this.state.availabilityDate} onChange={this.handleDateChange} />
                              </Col>
                            </Row>
                          </MuiPickersUtilsProvider>
                        </FormGroup>
                      </Col>
                    </Row>

                    <center>
                      <Button color="primary" onClick={this.handleClick}>
                        Add
                      </Button>
                    </center>

                    <hr className="my-4" />
                  </CardBody>
                </Card>
                <Card>
                  <CardHeader className="blue">
                    <Row className="align-items-center">
                      <Col>
                        <center>
                          <h3 className="heading- text- mb-">Indian Central library List</h3>
                        </center>
                      </Col>
                    </Row>
                  </CardHeader>
                  <hr className="my-4" />

                  <CardBody>
                    {/* <PaginationProvider pagination={paginationFactory(options)}>{contentTable}</PaginationProvider> */}
                    <div
                      className="ag-theme-balham"
                      style={{
                        height: "500px",
                      }}
                    >
                      <AgGridReact
                        width={150}
                        suppressSizeToFit={true}
                        rowHeight={rowHeight}
                        columnDefs={columnDefs}
                        enableCellTextSelection={true}
                        rowData={this.state.data}
                        defaultColDef={{
                          resizable: true,
                          flex: 1,
                          filter: true,
                        }}
                      ></AgGridReact>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}
export default Homepage;
