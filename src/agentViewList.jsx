import { useNavigate } from "react-router-dom";
import useFetch from "./useFetch";
import { useEffect, useState } from "react";

const AllAgents = () => {
    const {data: leadData, loading: leadLoading, error: leadError} = useFetch("https://crm-backend-azure.vercel.app/leads")
    const {data: agentData, loading: agentLoading} = useFetch("https://crm-backend-azure.vercel.app/agents")

    const [filterData, setFilterData] = useState([])
    const [filters, setFilters] = useState({
        agent: "",
        priority: "",
        timeToClose: "",
    })
    let navigate = useNavigate()

    useEffect(() => {
        let filteredData = [...leadData]
        if(filters.agent){
            filteredData = filteredData.filter(lead =>  lead.salesAgent && lead.salesAgent.name === filters.agent)
        }
        if(filters.priority){
            filteredData = filteredData.filter(lead => lead.priority === filters.priority)
        }
        if(filters.timeToClose){
            if(filters.timeToClose === "HtL"){
                filteredData = filteredData.sort((a,b) => b.timeToClose - a.timeToClose)
            }else{
                filteredData = filteredData.sort((a,b) => a.timeToClose - b.timeToClose)
            }
        }
        setFilterData(filteredData)
        console.log(filteredData)
    },[filters,leadData])

    const applyFilter = (e) => {
        const {name, value} = e.target;
        setFilters({...filters, [name]: value})
    }

    
    return (
        <div>
            <div className="header">
                <h1 className="text-center p-3" style={{background: "#990F02", color: "#ffffff"}}>Leads by Sales Agent</h1>
            </div>  
            {leadLoading && agentLoading
            ?
            <p className="mt-5 fs-5 text-center">Loading Details...</p>
            :
            <div className="row leadListData mb-5">
                <div className="col-xl-4 col-lg-4 col-12 agentViewBtns">
                    <div className="btn btn mt-3 py-2" style={{background: "#2E2E2E", color: "#fff"}} onClick={() => navigate("/")}>Go to Dashboard</div>
                    <div className="btn btn mt-3 py-2" style={{background: "#2E2E2E", color: "#fff"}} onClick={() => navigate("/statusList")}>Show Leads By Status</div>
                </div>
                <div className="col-xl-6 col-lg-6 col-11">
                    <h3 className="my-3">Lead List By Agent</h3>
                    {filterData.length != 0
                    ?
                    <div>
                        <div className="leadDetails" style={{fontSize: "1.3rem", fontWeight: "bolder"}}>
                            <div>
                                Lead Name
                            </div>
                            <div>
                                Lead Status
                            </div>
                        </div>
                        {filterData.map(lead => (
                            <div className="leadDetails" style={{fontSize: "1.2rem"}}>
                                <div>
                                    {lead.name}
                                </div>
                                <div>
                                    {lead.status}
                                </div>
                            </div>
                        ))}
                    </div>
                    : 
                    <p className="text-center fs-4">Leads not available please add new leads or remove filters!</p>
                }
                    <div className="mt-5 mb-3 filters">
                        <span className="fs-4 filterHeading">Filters: </span>
                        <div className="filterOptions">
                            <select name="agent" value={filters.agent} onChange={applyFilter}>
                                <option value="">Sales Agent</option>
                                {agentData.map(agent => (
                                    <option value={agent.name}>{agent.name}</option>    
                                ))            
                                }
                            </select>
                            <select name="priority" value={filters.priority} onChange={applyFilter}>
                                <option value="">Set Priority</option>  
                                <option value="High">High</option>
                                <option value="Medium">Medium</option> 
                                <option value="Low">Low</option> 
                            </select>
                        </div>
                    </div>
                    <div className="sorting">
                        <span className="fs-4 sortHeading">Sort By: </span>
                        <div className="sortOptions">
                            <select name="timeToClose" value={filters.timeToClose} onChange={applyFilter}>
                                <option value="">Sort By Time to close</option>  
                                <option value="HtL">High to Low</option>
                                <option value="LtH">Low to High</option> 
                            </select> 
                        </div>                     
                    </div>
                </div>
            </div>  
            }       
        </div>
    )
}

export default AllAgents; 