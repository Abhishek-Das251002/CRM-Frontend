import useFetch from "./useFetch";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const AgentView = () => {
    const {data: leadData, loading: leadLoading, error: leadError} = useFetch("https://crm-backend-azure.vercel.app/leads")
    const {data: agentData, loading: agentLoading} = useFetch("https://crm-backend-azure.vercel.app/agents")

    const [filterData, setFilterData] = useState({})
    const [filters, setFilters] = useState({})
    const [filterName, setFilterName] = useState([])
    const [filterAgent, setFilterAgent] = useState("")
    let navigate = useNavigate()
    

    useEffect(() => {
        let filteredData = [...leadData]

        if(filters[filterAgent]){
            if(filters[filterAgent]["status"]){
                filteredData = filteredData.filter(lead => lead.status === filters[filterAgent]["status"])
            }
        
            if(filters[filterAgent]["priority"]){
                filteredData = filteredData.filter(lead => lead.priority === filters[filterAgent]["priority"])
            }
        
            if(filters[filterAgent]["timeToClose"]){
                if(filters[filterAgent]["timeToClose"] === "HtL"){
                filteredData = filteredData.sort((a,b) => b.timeToClose - a.timeToClose)
                }else{
                    filteredData = filteredData.sort((a,b) => a.timeToClose - b.timeToClose)
                }
            }
        }
        setFilterData({...filterData, [filterAgent]: filteredData})
        console.log(filteredData)
    },[filters,leadData])

    const applyFilter = (e, currAgent) => {
        const {name, value} = e.target;
        setFilters({...filters, [currAgent]: {...filters[currAgent],[name]: value}})

        setFilterAgent(currAgent)
        if(!filterName.includes(currAgent)){
            setFilterName([...filterName, currAgent])
        }
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
            <div className="row my-3 agentBox">
                <div className="col-xl-4 col-md-4 col-11 mt-3 agentViewBtns">
                    <div className="btn btn mt-3 py-2" style={{background: "#2E2E2E", color: "#fff"}} onClick={() => navigate("/")}>Go to Dashboard</div>
                    <div className="btn btn mt-3 py-2" style={{background: "#2E2E2E", color: "#fff"}} onClick={() => navigate("/statusView")}>Show Leads By Status</div>
                </div>
                <div className="col-xl-6 col-md-7 col-11">
                    <h2 className="text-center">Lead List By Agent</h2>
                    {agentData.map(agent => (
                        <div class="card mt-4" style={{border: "3px solid #00224B"}}>
                            <div class="card-header text-center">
                                <h3>Sales Agent : {agent.name}</h3>
                            </div>
                            {!filterData[agent.name]
                            ?
                            (leadData.reduce((acc, curr) => curr.salesAgent.name === agent.name ? acc = acc + 1 : acc ,0) === 0
                            ?
                            <p className="text-center my-3 fs-5">No Lead is assigned to this agent currently.</p>
                            :
                            <>
                            <div className="leadDetails" style={{fontSize: "1.3rem", fontWeight: "bolder"}}>
                                <div>
                                    Lead Name
                                </div>
                                <div>
                                    Lead Status
                                </div>
                            </div>
                            {leadData.map(lead => {  
                                if(lead.salesAgent.name === agent.name){
                                    return (
                                        <div className="leadDetails" style={{fontSize: "1.2rem"}}>
                                            <div>
                                                {lead.name}
                                            </div>
                                            <div>
                                                {lead.status}
                                            </div>
                                        </div>
                                    )
                                }
                            })}
                            </>)
                            :
                            leadData.reduce((acc, curr) => curr.salesAgent.name === agent.name ? acc = acc + 1 : acc ,0) === 0
                            ?
                            <p className="text-center my-3 fs-5">No Lead is assigned to this agent currently.</p>
                            :
                            filterData[agent.name].length === 0 || filterData[agent.name].reduce((acc, curr) => curr.salesAgent.name === agent.name ? acc = acc + 1 : acc,0) === 0
                            ?
                            <p className="text-center my-3 fs-5">please Remove filter to see Lead data.</p>
                            :
                            <> 
                            <div className="leadDetails" style={{fontSize: "1.3rem", fontWeight: "bolder"}}>
                                <div>
                                    Lead Name
                                </div>
                                <div>
                                    Lead Status
                                </div>
                            </div>
                            {filterData[agent.name].map(lead => {  
                                if(lead.salesAgent.name === agent.name){
                                    return (
                                        <div className="leadDetails" style={{fontSize: "1.2rem"}}>
                                            <div>
                                                {lead.name}
                                            </div>
                                            <div>
                                                {lead.status}
                                            </div>
                                        </div>
                                    )
                                }
                            })}
                            </>
                            }
                        
                        <div class="card-footer">
                            <span className="fs-4">Filters: </span>
                            <div className="agentFilterOptions">
                                <select name="status" onChange={(e) => applyFilter(e,agent.name)}>
                                    <option value="">Lead Status</option>
                                    <option value="New">New</option>
                                    <option value="Contacted">Contacted</option>
                                    <option value="Qualified">Qualified</option>
                                    <option value="Proposal Sent">Proposal Sent</option>
                                    <option value="Closed">Closed</option>
                                </select>
                                <select name="priority" onChange={(e) => applyFilter(e,agent.name)}>
                                    <option value="">Set Priority</option>  
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option> 
                                    <option value="Low">Low</option> 
                                </select>
                            </div>
                            <div>
                                <span className="fs-4">Sort By: </span>
                                <div className="agentSortOptions">
                                    <select name="timeToClose" onChange={(e) => applyFilter(e,agent.name)}>
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

export default AgentView;