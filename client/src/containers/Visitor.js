import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { BackTop } from "antd";
import axios from "axios";
import Card from "./App/visitor/Card";
function Visitor() {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    axios
      .get("/api/visitor/get-all-jobs")
      .then(res => {
        console.log(res.data);
        setJobs(res.data);
      })
      .catch(err => console.log(err));
  }, []);
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>IDEAL INTERN</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            <Nav className="me-auto">
              <Nav.Link href="/signin">
                <Button variant="primary">Sign In</Button>
              </Nav.Link>
              <Nav.Link href="/signup">
                {" "}
                <Button variant="light">Sign Up</Button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          marginRight: "auto",
          marginLeft: "marginLeft",
          alignItems: "center",
          justifyContent: "space-around"
        }}
      >
        {jobs ? (
          jobs.map((job, index) => {
            return (
              <div key={index} style={{ margin: "1rem" }}>
                <Card jobs={job} />
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>

      <BackTop>
        <div
          style={{
            height: 40,
            width: 40,
            lineHeight: "40px",
            borderRadius: 4,
            backgroundColor: "#1088e9",
            color: "#fff",
            textAlign: "center",
            fontSize: 14
          }}
        >
          UP
        </div>
      </BackTop>
    </div>
  );
}

export default Visitor;
