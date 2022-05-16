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

class EditBook extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "",
            published: 0,
            author: "",
            domain: "",
            data: [],

            availabilityDate: null,
        };

    }

    componentDidMount() {

        axios
            .get("http://localhost:3000/listBookByid/?book_id=" + this.props.match.params.book_id)
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

    }
    handleSubmit = (e) => {
        const {
            name,
            published,
            author,
            domain,
            availabilityDate,

        } = this.state.data[0];
        e.preventDefault();
        let bookname = this.state.name ? this.state.name : name;
        let publishedYear = this.state.published ? this.state.published : published;
        let bookauthor = this.state.author ? this.state.author : author
        let bookdomain = this.state.domain ? this.state.domain : domain
        let bookavailabilityDate = this.state.availabilityDate ? this.state.availabilityDate : availabilityDate

        if (window.confirm("Are you Sure ?")) {
            axios
                .put(

                    "http://localhost:3000/updateLibrary?_id=" +
                    this.props.match.params.book_id +
                    "&name=" +
                    bookname +
                    "&published=" +
                    publishedYear +
                    "&author=" +
                    bookauthor +
                    "&domain=" +
                    bookdomain +
                    "&availabilityDate=" +
                    bookavailabilityDate

                )
                .then(
                    (res) => {
                        if (res.data.status === "success") {
                            alert("Successfully Edited");
                            document.location =
                                "/"

                        } else {
                            alert(res.data.data);
                        }
                    },
                    (err) => {
                        alert("Erorr At Editing Please Try Again")
                    }
                );
        }
    };

    handleDateChange = (event) => {
        this.setState({ availabilityDate: dateFormat(event, "yyyy/mm/dd") });
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    render() {
        return (
            <>
                <hr className="my-4" />
                <div className="main-content" ref="mainContent">
                    <Container className="mt--7" fluid>
                        <Row>
                            <Col className="col" xl="">
                                <Card>
                                    <CardHeader className="bg-white border-0">
                                        <Row className="align-items-center">
                                            <Col>
                                                <center>
                                                    <h3 className="heading- text- mb-">Edit Book Details</h3>
                                                </center>
                                            </Col>
                                        </Row>
                                    </CardHeader>

                                    <CardBody>
                                        {this.state.data && this.state.data.length && (
                                            <>
                                                <Row>
                                                    <Col lg="6">
                                                        <FormGroup>
                                                            <label className="form-control-label" htmlFor="input-username">
                                                                Name
                                                            </label>
                                                            <Input type="text" className="form-control" defaultValue={this.state.data[0].name} placeholder="Name" onChange={this.handleChange} name="name" />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col lg="6">
                                                        <FormGroup>
                                                            <label className="form-control-label" htmlFor="input-username">
                                                                Published
                                                            </label>
                                                            <Input type="text" className="form-control" placeholder="Published" defaultValue={this.state.data[0].published} onChange={this.handleChange} name="published" />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col lg="6">
                                                        <FormGroup>
                                                            <label className="form-control-label" htmlFor="input-username">
                                                                Author
                                                            </label>
                                                            <Input type="text" className="form-control" placeholder="author" defaultValue={this.state.data[0].author} onChange={this.handleChange} name="author" />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col lg="6">
                                                        <FormGroup>
                                                            <label className="form-control-label" htmlFor="input-username">
                                                                domain
                                                            </label>
                                                            <Input type="text" className="form-control" placeholder="domain" defaultValue={this.state.data[0].domain} onChange={this.handleChange} name="domain" />
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
                                                                        <DatePicker label={this.state.data[0].availabilityDate} placeHoleder="availabilityDate" defaultValue={this.state.data[0].availabilityDate} variant="outlined" disablePast value={this.state.availabilityDate} onChange={this.handleDateChange} />
                                                                    </Col>
                                                                </Row>
                                                            </MuiPickersUtilsProvider>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>

                                                <center>
                                                    <Button color="primary" onClick={this.handleSubmit}>
                                                        Edit
                                                    </Button>
                                                </center>
                                            </>

                                        )}


                                        <hr className="my-4" />
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
export default EditBook;
