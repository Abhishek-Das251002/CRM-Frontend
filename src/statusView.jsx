import useFetch from "./useFetch";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const StatusView = () => {
    const {data: leadData, loading: leadLoading, error: leadError} = useFetch("https://crm-backend-azure.vercel.app/leads")
    const {data: agentData, loading: agentLoading} = useFetch("https://crm-backend-azure.vercel.app/agents")

    const [filterData, setFilterData] = useState({})
    const [filters, setFilters] = useState({})
    const [filterStatus, setFilterStatus] = useState("")
    let navigate = useNavigate()
    const statusNames = [...new Set(leadData.map(lead => lead.status))]
    

    useEffect(() => {
        let filteredData = [...leadData]

        if(filters[filterStatus]){
            if(filters[filterStatus]["agent"]){
                filteredData = filteredData.filter(lead => lead.salesAgent.name === filters[filterStatus]["agent"])
            }
        
            if(filters[filterStatus]["priority"]){
                filteredData = filteredData.filter(lead => lead.priority === filters[filterStatus]["priority"])
            }
        
            if(filters[filterStatus]["timeToClose"]){
                if(filters[filterStatus]["timeToClose"] === "HtL"){
                filteredData = filteredData.sort((a,b) => b.timeToClose - a.timeToClose)
                }else{
                    filteredData = filteredData.sort((a,b) => a.timeToClose - b.timeToClose)
                }
            }
        }
        setFilterData({...filterData, [filterStatus]: filteredData})
        console.log(filteredData)
    },[filters,leadData])

    const applyFilter = (e, currStatus) => {
        const {name, value} = e.target;
        setFilters({...filters, [currStatus]: {...filters[currStatus],[name]: value}})

        setFilterStatus(currStatus)
    }

    
    return (
        <div>
            <div className="header">
                <h1 className="text-center p-3" style={{background: "#990F02", color: "#ffffff"}}>Leads by Status</h1>
            </div>
            {leadLoading && agentLoading
            ?
            <p className="mt-5 fs-5 text-center">Loading Details...</p>
            :
                <div className="row my-3 statusBox">
                <div className="col-xl-4 col-md-4 col-11 mt-3 statusViewBtns">
                    <div className="btn btn mt-3 py-2" style={{background: "#2E2E2E", color: "#fff"}} onClick={() => navigate("/")}>Go to Dashboard</div>
                    <div className="btn btn mt-3 py-2" style={{background: "#2E2E2E", color: "#fff"}} onClick={() => navigate("/agentView")}>Show Leads By Agents</div>
                </div>
                <div className="col-xl-6 col-md-7 col-11">
                    <h2 className="text-center">Lead List By Status</h2>
                    {statusNames.map(status => (
                        <div class="card mt-4" style={{border: "3px solid #00224B"}}>
                            <div class="card-header text-center">
                                <h3>Status : {status}</h3>
                            </div>
                            {!filterData[status]
                            ?
                            <>
                            <div className="leadDetails" style={{fontSize: "1.3rem", fontWeight: "bolder"}}>
                                <div>
                                    Lead Name
                                </div>
                                <div>
                                    Sales Agent
                                </div>
                            </div>
                            {leadData.map(lead => {  
                                if(lead.status === status){
                                    return (
                                        <div className="leadDetails" style={{fontSize: "1.2rem"}}>
                                            <div>
                                                {lead.name}
                                            </div>
                                            <div>
                                                {lead.salesAgent.name}
                                            </div>
                                        </div>
                                    )
                                }
                            })}
                            </>
                            :
                            filterData[status].length === 0 || filterData[status].reduce((acc, curr) => curr.status === status ? acc = acc + 1 : acc,0) === 0
                            ?
                            <p className="text-center my-3 fs-5">please Remove filter to see Lead data.</p>
                            :
                            <>
                            <div className="leadDetails" style={{fontSize: "1.3rem", fontWeight: "bolder"}}>
                                <div>
                                    Lead Name
                                </div>
                                <div>
                                    Sales Agent
                                </div>
                            </div>
                            {filterData[status].map(lead => {  
                                if(lead.status === status){
                                    return (
                                        <div className="leadDetails" style={{fontSize: "1.2rem"}}>
                                            <div>
                                                {lead.name}
                                            </div>
                                            <div>
                                                {lead.salesAgent.name}
                                            </div>
                                        </div>
                                    )
                                }
                            })}
                            </>
                            }
                        
                        <div class="card-footer">
                            <span className="fs-4">Filters: </span>
                            <div className="statusFilterOptions">
                                <select name="agent"  className="ms-3" onChange={(e) => applyFilter(e,status)}>
                                    <option value="">Choose Agent</option>
                                    {agentData.map(agent => (
                                        <option value={agent.name}>{agent.name}</option>
                                    ))}                                
                                </select>
                                <select name="priority" className="ms-3" onChange={(e) => applyFilter(e,status)}>
                                    <option value="">Set Priority</option>  
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option> 
                                    <option value="Low">Low</option> 
                                </select>
                            </div>
                            <div>
                                <span className="fs-4">Sort By: </span>
                                <div className="statusSortOptions">
                                    <select name="timeToClose" onChange={(e) => applyFilter(e,status)}>
                                        <option value="">Sort By Time to close</option>  
                                        <option value="HtL">High to Low</option>
                                        <option value="LtH">Low to High</option> 
                                    </select> 
                                </div>                     
                            </div>
                        </div>
                        </div>
                        )
                    )}
                </div>
            </div>
            }
        </div>
    )
}

export default StatusView;