import useFetch from "./useFetch";
import axios from "axios";
import { toast } from "react-toastify";
const Setting = () => {
    const {data: leadData, loading: leadLoading, error: leadError} = useFetch("https://crm-backend-azure.vercel.app/leads")
    const {data: agentData, loading: agentLoading} = useFetch("https://crm-backend-azure.vercel.app/agents")

    async function handleAgentDelete(agentId){
        console.log(agentId)
         try{
            const response = await axios.delete(`https://crm-backend-azure.vercel.app/agents/${agentId}`)
            if(response){
                toast.warn("Agent Deleted!")
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
            <div className="settingLayout">
                <ul class="list-group">
                    {leadData.map(lead => (
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                        {lead.name}
                        <span class="rounded-pill">Delete</span>
                    </li>
                    ))}
                </ul>
                <ul class="list-group">
                    {
                        agentData.map(agent => (
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                {agent.name}
                                <span class="badge text-bg-primary rounded-pill" style={{cursor: "pointer"}} onClick={() => handleAgentDelete(agent._id)}>Delete</span>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default Setting;