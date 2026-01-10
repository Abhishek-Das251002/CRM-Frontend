import { useNavigate } from "react-router-dom";
import useFetch from "./useFetch";
import { useEffect, useState } from "react";

const AllLeads = () => {
    const {data, loading: leadLoading, error} = useFetch("https://crm-backend-azure.vercel.app/leads")
    const {data: agents, loading: agentLoading} = useFetch("https://crm-backend-azure.vercel.app/agents")
    const [filterData, setFilterData] = useState([])
    const [filters, setFilters] = useState({
        agent: "",
        status: "",
        tag: "",
        source: "",
        priority: "",
        timeToClose: "",
    })
    let navigate = useNavigate()

    useEffect(() => {
        let filteredData = [...data]
        if(filters.agent){
            filteredData = filteredData.filter(lead => lead.salesAgent.name === filters.agent)
        }
        if(filters.status){
            filteredData = filteredData.filter(lead => lead.status === filters.status)
        }
        if(filters.source){
            filteredData = filteredData.filter(lead => lead.source === filters.source)
        }
        if(filters.tag){
            filteredData = filteredData.filter(lead => lead.tags.includes(filters.tag))
        }
        if(filters.priority){
            let prioritySortedData = filteredData.map(lead => lead.priority === "High" ? {...lead,  rank: "1"} : lead.priority === "Medium" ? {...lead, rank: "2"} : {...lead, rank: "3"})
            if(filters.priority === "HtL"){
               filteredData = prioritySortedData.sort((a,b) => a.rank - b.rank)
            }else{
                filteredData = prioritySortedData.sort((a,b) => b.rank - a.rank)
            }
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
    },[filters,data])

    const applyFilter = (e) => {
        const {name, value} = e.target;
        if(name === "priority"){
            setFilters({...filters, [name]: value, timeToClose: ""})
        }else if(name === "timeToClose"){
            setFilters({...filters, [name]: value, priority: ""})
        }
        else{
            setFilters({...filters, [name]: value})
        }
    }

    
    return (
        <div>
            <div className="header">
                <h1 className="text-center p-3" style={{background: "#990F02", color: "#ffffff"}}>Lead List</h1>
            </div>  
            {leadLoading && agentLoading
            ?
            <p className="mt-5 fs-5 text-center">Loading Details...</p>
            :
            <div className="row leadListData mb-5">
                <div className="col-xl-4 col-lg-4 col-12">
                    <div className="dbBtn">
                        <button  className="py-2 btn btn" style={{background: "#2E2E2E", color: "#fff"}} onClick={() => navigate("/")}>Go to Dashboard</button>
                    </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-11">
                    <h3 className="my-3">Lead Overview</h3>
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
                            <div>
                                Sales Agent
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
                                <div>
                                    {lead.salesAgent? lead.salesAgent.name : <em className="text-secondary">Agent not assigned</em>}
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
                                {agents.map(agent => (
                                    <option value={agent.name}>{agent.name}</option>    
                                ))            
                                }
                            </select>
                            <select name="status"  value={filters.status} onChange={applyFilter}>
                                <option value="">Lead Status</option>
                                <option value="New">New</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Qualified">Qualified</option>
                                <option value="Proposal Sent">Proposal Sent</option>
                                <option value="Closed">Closed</option>
                            </select>
                            <select name="tag" value={filters.tag} onChange={applyFilter}>
                                <option value="">Tags</option>
                                <option value="High Value">High Value</option>
                                <option value="Follow-Up">Follow-Up</option>
                            </select>
                            <select name="source" value={filters.source} onChange={applyFilter}>
                                <option value="">Lead Source</option>
                                <option value="Website">Website</option>
                                <option value="Referral">Referral</option>
                                <option value="Cold Call">Cold Call</option>
                            </select>
                        </div>
                    </div>
                    <div className="sorting">
                        <span className="fs-4 sortHeading">Sort By: </span>
                        <div className="sortOptions">
                            <select name="priority" value={filters.priority} onChange={applyFilter}>
                                <option value="">Sort By Priority</option>  
                                <option value="HtL">High to Low</option>
                                <option value="LtH">Low to High</option>  
                            </select>
                            <span className="px-3">OR</span>
                            <select name="timeToClose" value={filters.timeToClose} onChange={applyFilter}>
                                <option value="">Sort By Time to close</option>  
                                <option value="HtL">High to Low</option>
                                <option value="LtH">Low to High</option> 
                            </select> 
                        </div>                     
                    </div>
                    <div className="addLeadBtn">
                        <button className="mt-5 btn btn py-2" style={{background: "#00224B", color: "#ffffff"}} onClick={() => navigate("/newLead")}>Add New Lead</button>
                    </div>
                </div>
            </div>  
            }       
        </div>
    )
}

export default AllLeads; 