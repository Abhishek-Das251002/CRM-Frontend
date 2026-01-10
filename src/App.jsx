import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import useFetch from "./useFetch"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function App() {
  const {data, loading, error} = useFetch("https://crm-backend-azure.vercel.app/leads")
  const [leadCount, setLeadCount] = useState({})
  const [filterData, setFilterData] = useState([])
  const [currStatus, setCurrStatus] = useState("")
  let navigate = useNavigate()

  useEffect(() => {  
    const statusCount = data.reduce((acc, curr) => {
      acc[curr.status] = (acc[curr.status] || 0) + 1
      return acc;
    },{}) 
    setLeadCount(statusCount)
  },[data])

  useEffect(() => {
    let afterFilterData = [...data]
    if(currStatus){
      afterFilterData = afterFilterData.filter(lead => lead.status === currStatus)
    }
    setFilterData(afterFilterData)
  },[data,currStatus])

  function handleFilter (e){
    const {value} = e.target; 
    setCurrStatus(value)
  }

  return (
    <div>
      <div className="header">
        <h1 className="text-center p-3" style={{background: "#990F02", color: "#ffffff"}}>Anvaya CRM Dashboard</h1>
      </div>
      {loading
      ?
      <p className="text-center mt-5 fs-5">Loading Details...</p>
      :
      <div className="row dbLayout my-4">
        <div className="col-lg-4 col-md-4 col-12 mt-lg-5 mt-4 ms-md-5 ms-lg-0 dbLinks">
          <div className="btn btn mt-lg-3 mt-3 fs-5" style={{background: "#2E2E2E", color: "#fff"}} onClick={() => navigate("/allleads")}>Leads</div>
          <div className="btn btn mt-lg-3 mt-3 fs-5" style={{background: "#2E2E2E", color: "#fff"}} onClick={() => navigate("/agentList")}>Sales</div>
          <div className="btn btn mt-lg-3 mt-3 fs-5" style={{background: "#2E2E2E", color: "#fff"}} onClick={() => navigate("/allAgents")}>Agents</div>
          <div className="btn btn mt-lg-3 mt-3 fs-5" style={{background: "#2E2E2E", color: "#fff"}} onClick={() => navigate("/leadReport")}>Reports</div>
          <div className="btn btn mt-lg-3 mt-3 fs-5" style={{background: "#2E2E2E", color: "#fff"}} onClick={() => navigate("/settings")}>Settings</div>
        </div> 
        <div className="col-xl-7 col-md-7 col-12 my-lg-3">
          {currStatus ? <p className="fs-4 fw-medium leadH1">Showing lead with status ({currStatus}) :</p>: <p className="leadH2 fs-4 fw-medium">Showing All leads :</p>}
          <div className="row ms-xl-4 m-3 d-flex justify-content-center">
          {filterData.length !== 0
          ?
          filterData.map(lead => (
            <div className="col-xl-2 col-5 btn btn py-2 m-2 d-flex justify-content-center align-items-center " style={{background: "#D16200", color: "#fff"}} onClick={() => navigate(`/managelead/${lead._id}`)}>
              {lead.name}
            </div>
          ))
          :
          <p className="text-center fs-5 my-3">There is no Lead with status (<strong>{currStatus}</strong>).</p>
          }
          </div>
          <div className="mb-lg-4 ms-5">
            <p className="fs-4 fw-medium" style={{margin: "0px"}}>Lead Status :</p>
            <ul className="fs-5">
              {
                Object.keys(leadCount).map(key => (
                  <li>{key} : {leadCount[key]} {leadCount[key] > 1 ? "Leads" : "Lead"}</li>
                ))
              }
            </ul>
          </div>
          <div className="mt-lg-4 ms-5">
            <span className="fs-4 fw-medium">Filters: </span>
            <select name="status"  className="ms-3" value={currStatus} onChange={handleFilter}>
              <option value="">Lead Status</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Proposal Sent">Proposal Sent</option>
              <option value="Closed">Closed</option>
            </select>    
          </div>
          <button className="mt-lg-4 ms-5 mt-3 btn btn py-2 px-3" style={{background: "#00224B", color: "#ffffff"}} onClick={() => navigate("/newLead")}>Add New Lead</button>
        </div>
      </div>
      }
    </div>
  )
}

export default App
