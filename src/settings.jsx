import useFetch from "./useFetch";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
const Setting = () => {
    const [refLead, setRefLead] = useState(false);
    const [refAgent, setRefAgent] = useState(false);

    const {data: leadData, loading: leadLoading, error: leadError} = useFetch(`https://crm-backend-azure.vercel.app/leads?ref=${refLead}`)
    const {data: agentData, loading: agentLoading} = useFetch(`https://crm-backend-azure.vercel.app/agents?ref=${refAgent}`)


    async function handleLeadDelete(leadId){
        console.log(leadId)
         try{
            const response = await axios.delete(`https://crm-backend-azure.vercel.app/leads/${leadId}`)
            if(response){
                toast.warn("Lead Deleted!")
                setRefLead(prev => !prev)
            }
        }
        catch(error){
            console.error(error.response?.data || error.message)
            toast.error("Something went wrong.")
        }
    }


    async function handleAgentDelete(agentId){
        console.log(agentId)
         try{
            const response = await axios.delete(`https://crm-backend-azure.vercel.app/agents/${agentId}`)
            if(response){
                toast.warn("Agent Deleted!")
                setRefAgent(prev => !prev)
            }
        }
        catch(error){
            console.error(error.response?.data || error.message)
            toast.error("Something went wrong.")
        }
    }
    
    return (
        <div>
            <div className="header">
                <h1 className="text-center p-3" style={{background: "#990F02", color: "#ffffff"}}>Settings</h1>
            </div> 
            {leadLoading || agentLoading
            ?
            <p className="text-center my-5 fs-5">Loading Details....</p>
            :
            <div className="row settingLayout">
                <div className="col-xl-6 col-lg-6 col-12 settingBox">
                    <div className="card text-center">
                        <div className="card-header">
                            <h2>All Leads</h2>
                        </div>
                        <div className="card-body">
                            <ul className="list-group">
                                {leadData.map(lead => (
                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                    {lead.name}
                                    <button className="btn btn-danger btn-sm" style={{cursor: "pointer"}} onClick={() => handleLeadDelete(lead._id)}>Delete</button>
                                </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-12 settingBox">
                    <div className="card text-center">
                        <div className="card-header">
                            <h2>All Agents</h2>
                        </div>
                        <div className="card-body">
                            <ul className="list-group">
                                {
                                    agentData.map(agent => (
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            {agent.name}
                                            <button className="btn btn-danger btn-sm" style={{cursor: "pointer"}} onClick={() => handleAgentDelete(agent._id)}>Delete</button>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div> 
                </div>   
            </div>
            }
        </div>
    )
}

export default Setting;