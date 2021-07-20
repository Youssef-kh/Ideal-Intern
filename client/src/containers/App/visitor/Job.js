import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
function Job({ jobContent }) {
  const [jobdate, setJobdate] = useState("");
  useEffect(() => {
    for (let i = 0; i < 10; i++) {
      setJobdate(prev => prev + jobContent.posted_date[i]);
    }
  }, []);
  return (
    <div>
      <Card className="text-center">
        <Card.Header>{jobContent.title}</Card.Header>
        <Card.Body>
          <Card.Title>Job Type: {jobContent.job_type} </Card.Title>
          <Card.Text>
            Location: {jobContent.location} <br />
            Employees Needed: {jobContent.employees_needed}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">{jobdate}</Card.Footer>
      </Card>
    </div>
  );
}

export default Job;
/**description: "Tell us about it"
employees_needed: 4
jobId: "J_E27VxYQV"
job_type: "Part Time"
location: "Ben Arous"
posted_date: "2021-07-19T11:02:02.461Z"
start_date: "2021-07-01T20:53:58.425Z"
title: "Developpeur"
to: "2021-07-31T20:54:00.952Z"
_id: "60f43dc63bb80b1ca8d230b6" */
