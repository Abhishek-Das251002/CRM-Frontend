import useFetch from "./useFetch";
import { useNavigate } from "react-router-dom";

const AgentList = () => {
    const {data, loading, error} = useFetch("https://crm-backend-azure.vercel.app/agents")
    const navigate = useNavigate()
    
    return (
        <div>
            <div className="header">
                <h1 className="text-center p-3" style={{background: "#990F02", color: "#ffffff"}}>Sales Agent Management</h1>
            </div>
            {loading
            ?
            <p className="mt-5 fs-5 text-center">Loading Details...</p>
            :
            <div className="row listBox">
                <div className="col-xl-4 col-md-4 col-11 agentListBtns">
                    <button  className="py-2 mt-5 btn btn" style={{background: "#2E2E2E", color: "#fff"}} onClick={() => navigate("/")}>Go to Dashboard</button>
                </div>
                <div className="col-xl-6 col-md-7 col-11 agentList">
                    <h3 className="my-3 agentListHeading">Sales Agent List</h3>
                    {data.length != 0
                    ?
                    <div>
                        <div className="leadDetails" style={{fontSize: "1.3rem", fontWeight: "bolder"}}>
                            <div>
                                Name
                            </div>
                            <div>
                                Email Address
                            </div>
                        </div>
                        {data.map(agent => (
                            <div className="leadDetails" style={{fontSize: "1.2rem"}}>
                                <div>
                                    {agent.name}
                                </div>
                                <div>
                                    {agent.email}
                                </div>
                            </div>
                        ))}
                    </div>
                    : 
                    <p className="text-center fs-4">Please Add Agent to get Agent List!</p>
                }
                <button className="mt-5 btn btn py-2 px-3" style={{background: "#00224B", color: "#ffffff"}} onClick={() => navigate("/newagent")}>Add New Agent</button>
                </div>
            </div>
            }
        </div>
    )
}

export default AgentList;