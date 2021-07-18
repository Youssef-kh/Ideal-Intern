import React, { useState,useEffect } from "react";
import useFetchJobs from "./userFetchJobs";
// import { getAllJobs } from "../../../appRedux/actions/company";
import { Container } from "react-bootstrap";
import Job from "./Job";
import JobsPagination from "./JobsPagination";
import SearchForm from "./SearchForm";
import JobModal from "./JobModal";
import UseAlan from "./chatbot/UseAlan";
import Chart from "./chart/Chart";
import axios from "axios";
const jobs = ({ match }) => {
  /** ********BEGIN ALAN AI******** */
  UseAlan();
  /** *********END ALAN AI******* */
  const [jobs,setJobs] = useState([])
  const [open, setOpen] = useState(false);
  const [selectedJob, setselectedJob] = useState({});
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  // const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page);

  function handleParamChange(e) {
    const param = e.target.name;
    const value = e.target.value;
    setPage(1);
    setParams(prevParams => {
      return { ...prevParams, [param]: value };
    });
  }
  async function fetchCompanies ()  {
    const companiesResponse = await axios.get("http://localhost:5000/api/company/get-all-jobs")
    console.log(companiesResponse.data)
    let jobsList = [];
    let company = {};
    let job = {};

    for(company of companiesResponse.data){
      for(job of company.job){
        jobsList.push({
          companyId:company.user,
          job:job
        })
      }
    }
    setJobs(jobsList);
  }
  useEffect(() => {
    fetchCompanies()
 }, [])

  return (
    <Container className="my-4">
      <JobModal open={open} job={selectedJob} handleClose={handleClose} />
      <h1 className="mb-4">JOBS FOR YOU</h1>
      <SearchForm params={params} onParamChange={handleParamChange} />
      {/* <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} /> */}
      {jobs.map(job => {
        return (
          <Job
            key={job._id}
            job={job.job}
            companyId={job.companyId}
            onClick={() => {
              console.log("clicked");
              handleClickOpen();
              setselectedJob(job);
            }}
          />
        );
      })}
      {/* <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} /> */}
    </Container>
  );
};
export default jobs;
