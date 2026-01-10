import { useNavigate, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ManageLead = () => {
    const {id} = useParams()
    const [refLeadDetails, setRefLeadDetails] = useState(false)

    const {data, loading, error} = useFetch(`https://crm-backend-azure.vercel.app/leads?ref=${refLeadDetails}`)

    const [refresh, setRefresh] = useState(false)
    
    const {data: commentData, loading: commentLoading} = useFetch(`https://crm-backend-azure.vercel.app/leads/${id}/comments?ref=${refresh}`)
    const {data: agentData, loading: agentLoading} = useFetch("https://crm-backend-azure.vercel.app/agents")
    const currLead = data?.find(lead => lead._id === id)

    const [commentDetails, setCommentDetails] = useState({
        lead: id,
        author: "",
        commentText: "",
        createdAt: "",
    })

    const navigate = useNavigate()
    const [editLead, setEditLead] = useState(false)

    const [newLeadDetails, setNewLeadDetails] = useState(null)

    useEffect(() => {
        if(currLead){
           setNewLeadDetails({
                name: currLead.name,
                source: currLead.source,
                salesAgent: currLead.salesAgent ? currLead.salesAgent._id : "",
                status: currLead.status,
                priority: currLead.priority,
                timeToClose: currLead.timeToClose,
                tags: currLead.tags,
                closedAt: new Date(currLead.closedAt).toLocaleString("sv-SE").slice(0, 16)
           }) 
        }
    },[currLead])

    async function handleCommentSubmit (e){
        e.preventDefault()
        try {
            const response = await axios.post(
                `https://crm-backend-azure.vercel.app/leads/${id}/comments`,
                commentDetails
            );
            console.log(response.data);
            setRefresh(prev => !prev)
            setCommentDetails({
                lead: id,
                author: "",
                commentText: "",
                createdAt: "",
            })
            toast.success("Comment Created Successfully!")
        } catch (error) {
            console.error(error.response?.data || error.message);
            toast.error("Something went wrong.")
        }
    }

    function handleComment(e){
        const {name, value} = e.target;
        setCommentDetails({...commentDetails, [name]: value})
    }

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

    async function handleFormSubmit(e){
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
            const response = await axios.post(`https://crm-backend-azure.vercel.app/leads/${id}`, payLoad)
            console.log(response.data)
            setRefLeadDetails(prev => !prev)
            toast.success("Lead Details Updated Successfully!")
        }catch (error) {
            console.error(error.response?.data || error.message);
            toast.error("Something went wrong.")
        }
        setEditLead(false)
    }


    console.log(newLeadDetails)
    return (
        <div>
            {(!currLead || !newLeadDetails)
            ?
            <p className="text-center my-5 fs-5">Loading Lead Details....</p>
            :
            <>
            <div className="header">
                <h1 className="text-center p-3" style={{background: "#990F02", color: "#ffffff"}}>Lead Management : {currLead.name}</h1>
            </div> 
            <div className="row mBox">
                <div className="col-xl-4 col-md-4">
                    <div className="row mBtns">
                        <button  className="py-2 mt-5 btn btn" style={{background: "#2E2E2E", color: "#fff"}} onClick={() => navigate("/")}>Go to Dashboard</button>
                    </div>
                </div>
                <div className="col-xl-6 col-md-7 mDetails">
                    <div className="col-11 col-md-12">
                        <div className="mDetailsBlock">
                        <h2 className="my-3">Lead Details :</h2>
                        {editLead
                        ?
                        <form onSubmit={handleFormSubmit} className="updateLeadForm fs-5 ms-3 mt-3">
                            <div>
                                <label><strong>Lead Name : </strong></label>
                                <input type="text" className="ms-3" name="name" value={newLeadDetails.name} onChange={handleChange} required/>
                            </div>
                            <div>
                                <label><strong>Lead Source : </strong></label>
                                <select name="source" className="ms-3" value={newLeadDetails.source} onChange={handleChange} required>
                                    <option value="">Select Source</option>
                                    <option value="Website">Website</option>
                                    <option value="Referral">Referral</option>
                                    <option value="Cold Call">Cold Call</option>
                                </select>
                            </div>
                            <div>
                                <label><strong>Sales Agent : </strong></label>
                                <select name="salesAgent"  className="ms-3" value={newLeadDetails.salesAgent} onChange={handleChange} required>
                                    <option value="">Select Sales Agent</option>
                                    {agentData.map(agent => (
                                        <option value={agent._id}>{agent.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label><strong>Lead Status : </strong></label>
                                <select name="status"  className="ms-3" value={newLeadDetails.status} onChange={handleChange} required>
                                    <option value="">Select Lead Status</option>
                                    <option value="New">New</option>
                                    <option value="Contacted">Contacted</option>
                                    <option value="Qualified">Qualified</option>
                                    <option value="Proposal Sent">Proposal Sent</option>
                                    <option value="Closed">Closed</option>
                                </select>
                            </div>
                            <div>
                                <label><strong>Priority : </strong></label>
                                <select name="priority" className="ms-3" value={newLeadDetails.priority} onChange={handleChange} required>
                                    <option value="">Set Priority</option>
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                </select>
                            </div>
                            <div>
                                <label><strong>Time to Close : </strong></label>
                                <input type="Number" className="ms-3" name="timeToClose" value={newLeadDetails.timeToClose} onChange={handleChange} required/>
                            </div>
                            {newLeadDetails.status === "Closed" && 
                            <div className="mClosedDiv">
                                <label><strong>Closed At : </strong></label>
                                <input type="datetime-local" className="ms-3" name="closedAt" value={newLeadDetails.closedAt} onChange={handleChange}/>
                            </div>
                            }
                            <div>
                                <label><strong>Tags : </strong></label>
                                <div className="tagOptions">
                                    <input type="checkbox" className="ms-3" name="tags" value="High Value" checked={newLeadDetails.tags.includes("High Value")}  onChange={handleChange}/> High Value 
                                    <input type="checkbox" className="ms-3" name="tags" value="Follow-up" checked={newLeadDetails.tags.includes("Follow-up")}  onChange={handleChange}/> Follow-Up 
                                </div>
                            </div>
                            <div>
                                <button type="submit" className="btn btn mt-3 py-2 px-3" style={{background: "#D16200", color: "#fff"}}>Update Lead</button>
                            </div>
                        </form>
                        :
                        <>
                        {currLead.status === "Closed"
                        ?
                        <div className="fs-5 ms-3 mt-3">
                            <p><strong>Lead Name : </strong>{currLead.name}</p>
                            <p><strong>Sales Agent : </strong>{currLead.salesAgent.name}</p>
                            <p><strong>Lead Source : </strong>{currLead.source}</p>
                            <p><strong>Lead Status : </strong>{currLead.status}</p>
                            <p><strong>Priority : </strong>{currLead.priority}</p>
                            <p><strong>Time to Close : </strong>{currLead.timeToClose} Days</p>
                            <p><strong>closed At : </strong>{new Date(currLead.closedAt).toLocaleString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                                })}
                            </p>
                        </div>
                        :
                        <div className="fs-5 ms-3 mt-3">
                            <p><strong>Lead Name : </strong>{currLead.name}</p>
                            <p><strong>Sales Agent : </strong>{currLead.salesAgent? currLead.salesAgent.name: <em className="text-secondary">Agent not assigned, use "Edit Lead Details" button.</em>}</p>
                            <p><strong>Lead Source : </strong>{currLead.source}</p>
                            <p><strong>Lead Status : </strong>{currLead.status}</p>
                            <p><strong>Priority : </strong>{currLead.priority}</p>
                            <p><strong>Time to Close : </strong>{currLead.timeToClose} Days</p>
                        </div>
                        }
                        <button className="mt-3 ms-3 btn btn py-2 px-3" style={{background: "#00224B", color: "#ffffff"}} onClick={() => setEditLead(true)}>Edit Lead Details</button>
                        </>
                        }
                    </div>
                    <hr />
                    <div>
                        <h2 className="my-3">Comment Section :</h2>    
                        {commentData.length !== 0
                        ?
                        commentData.map(comment => (
                            <div className="card mt-4">
                            {comment.author &&
                            <div className="card-body">
                                <figure>
                                <blockquote className="blockquote">
                                    <p className="fs-4">{comment.commentText}</p>
                                </blockquote>
                                <figcaption className="blockquote-footer fs-5">
                                    By {comment.author.name} On <cite title="Source Title">{new Date(comment.createdAt).toLocaleString(
                                        "en-US",
                                        {timeZone: "Asia/Kolkata",
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                        hour: "numeric",
                                        minute: "numeric",
                                        hour12: true
                                        }
                                    )}</cite>
                                </figcaption>
                                </figure>
                            </div>}
                            </div>
                        ))
                        :
                        <p className="my-4 fs-5 text-center text-secondary">No Comments are created for this lead yet.</p>
                        }
                        <div className="card my-4">
                        <div className="card-header fs-5">
                            Add New Comment
                        </div>
                        <form className="card-body addComment"  onSubmit={handleCommentSubmit}>
                            <input type="text" name="commentText" placeholder="Type your comment here" value={commentDetails.commentText} onChange={handleComment} required/>
                            <label className="fs-5 mt-3">Agent Name :</label>
                            <select name="author" className="mx-3" value={commentDetails.author} onChange={handleComment} required>
                                <option value="">Select Agent</option>
                                {
                                    agentData.map(agent => (
                                        <option value={agent._id}>{agent.name}</option>
                                    ))
                                }
                            </select>
                            <br />
                            <button className="btn btn py-2 px-3 mt-3" type="submit" style={{background: "#D16200", color: "#fff"}} name="createdAt" value={new Date().toISOString()} onClick={(e) => {handleComment(e)}}>submit</button>
                        </form>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            </>
            }    
        </div>
    )
}

export default ManageLead;