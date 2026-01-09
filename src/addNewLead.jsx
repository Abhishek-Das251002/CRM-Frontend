import { useState } from "react";
import useFetch from "./useFetch";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const NewLead = () => {
    const [newLeadDetails, setNewLeadDetails] = useState({
        name: "",
        source: "",
        salesAgent: "",
        status: "",
        priority: "",
        timeToClose: "",
        tags: [],
        closedAt: ""
    })

    const navigate = useNavigate()
    
    const {data} = useFetch("https://crm-backend-azure.vercel.app/agents")   

    const handleChange = (e) => {
        const {value, name, checked} = e.target;
        if(name != "tags"){
             setNewLeadDetails({...newLeadDetails, [name]: value})
        }else{
            setNewLeadDetails(prev => ({
                ...prev, tags: checked? [...prev.tags, value] : prev.tags.filter(tag => tag !== value)
            }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payLoad = 
        newLeadDetails.status === "Closed"
        ?
        {
            name: newLeadDetails.name,
            source: newLeadDetails.source,
            salesAgent: newLeadDetails.salesAgent,
            status: newLeadDetails.status,
            priority: newLeadDetails.priority,
            timeToClose: newLeadDetails.timeToClose,
            tags: newLeadDetails.tags,
            closedAt: new Date(newLeadDetails.closedAt).toISOString()
        }
        :
        {
            name: newLeadDetails.name,
            source: newLeadDetails.source,
            salesAgent: newLeadDetails.salesAgent,
            status: newLeadDetails.status,
            priority: newLeadDetails.priority,
            timeToClose: newLeadDetails.timeToClose,
            tags: newLeadDetails.tags,
            closedAt: ""
        }

        try{
            const response = await axios.post("https://crm-backend-azure.vercel.app/leads", payLoad)
            if(response){
                toast.success("New Lead Added Successfully!")
                setNewLeadDetails({
                name: "",
                source: "",
                salesAgent: "",
                status: "",
                priority: "",
                timeToClose: "",
                tags: [],
                closedAt: "",
                })
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
                <h1 className="text-center p-3" style={{background: "#990F02", color: "#ffffff"}}>Add New Lead</h1>
            </div>   
            <div className="body">
                <div className="col-xl-5 col-lg-5 col-md-4 col-12">
                    <div className="lbBtns">
                        <button  className="py-2 btn btn" style={{background: "#2E2E2E", color: "#fff"}} onClick={() => navigate("/")}>Go to Dashboard</button>
                    </div>
                </div>
                <div className="col-xl-5 col-lg-6 col-md-7 col-11">
                <div className="lb">
                <form type="submit" className="lbForm updateLeadForm" onSubmit={handleSubmit}>
                    <div>
                        <label>Lead Name : </label>
                        <input type="text" name="name" value={newLeadDetails.name} onChange={handleChange} required/>
                    </div>
                    <div>
                        <label>Lead Source : </label>
                        <select name="source" value={newLeadDetails.source} onChange={handleChange} required>
                            <option value="">Select Source</option>
                            <option value="Website">Website</option>
                            <option value="Referral">Referral</option>
                            <option value="Cold Call">Cold Call</option>
                        </select>
                    </div>
                    <div>
                        <label>Sales Agent : </label>
                        <select name="salesAgent" value={newLeadDetails.salesAgent} onChange={handleChange} required>
                            <option value="">Select Sales Agent</option>
                            {data.map(agent => (
                                <option value={agent._id}>{agent.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Lead Status : </label>
                        <select name="status" value={newLeadDetails.status} onChange={handleChange} required>
                            <option value="">Select Lead Status</option>
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Qualified">Qualified</option>
                            <option value="Proposal Sent">Proposal Sent</option>
                            <option value="Closed">Closed</option>
                        </select>
                    </div>
                    <div>
                        <label>Priority : </label>
                        <select name="priority" value={newLeadDetails.priority} onChange={handleChange} required>
                            <option value="">Set Priority</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>
                    <div>
                        <label>Time to Close : </label>
                        <input type="Number" name="timeToClose" value={newLeadDetails.timeToClose} onChange={handleChange} required/>
                    </div>
                    {(newLeadDetails.status === "Closed") &&    
                    <div>
                        <label>ClosedAt : </label>
                        <input type="datetime-local" name="closedAt" value={newLeadDetails.closedAt} onChange={handleChange} required/>
                    </div>                   
                    }
                    <div>
                        <label>Tags : </label>
                        <div className="tagOptions">
                            <label style={{fontWeight: "normal"}}><input type="checkbox" className="ms-3" name="tags" value="High Value" checked={newLeadDetails.tags.includes("High Value")}  onChange={handleChange}/> High Value</label>
                            <label style={{fontWeight: "normal"}}><input type="checkbox" className="ms-3" name="tags" value="Follow-Up" checked={newLeadDetails.tags.includes("Follow-Up")}  onChange={handleChange}/> Follow-Up</label> 
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="btn btn px-3 py-2" style={{background: "#00224B", color: "#fff"}}>Create Lead</button>
                    </div>
                </form>
                </div>
            </div>
            </div>
        </div>
    )
}

export default NewLead;