import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const NewAgent = () => {

    const [newAgent, setNewAgent] = useState({
        name: "",
        email: "",
    })

    const [validEmail, setValidEmail] = useState(true)

    function isValidEmail(email) {
        if (email.includes(" ")) return setValidEmail(false);

        if (email !== email.toLowerCase()) return setValidEmail(false);

        const atIndex = email.indexOf("@");
        if (atIndex === -1 || atIndex !== email.lastIndexOf("@")) return setValidEmail(false);

        const dotIndex = email.indexOf(".");
        if (dotIndex === -1 || dotIndex !== email.lastIndexOf(".")) return setValidEmail(false);

        if (atIndex > dotIndex) return setValidEmail(false);

        if (dotIndex === atIndex + 1) return setValidEmail(false);
        const parts = email.split("@");
        const [local, domain] = parts;

        if (!local || !domain) return setValidEmail(false);

        return setValidEmail(true);
    }

    function handleAgent(e){
        const {name, value} = e.target;
        setNewAgent({...newAgent, [name]: value})
    }

    async function handleCreateAgent(e){
        e.preventDefault();
        if(validEmail){
            try{
            const response = await axios.post("https://crm-backend-azure.vercel.app/agents",newAgent)
            if(response.data){
                toast.success("Agent Added Successfully!")
                setNewAgent({
                name: "",
                email: "",
                })
            }
            }catch(error){
                console.error(error.response?.data || error.message)
                toast.error("Something went wrong.")
            }
        }else{
            toast.error("Please enter valid Email address!")
        }
    }


    return (
        <div>
            <div className="header">
                <h1 className="text-center p-3" style={{background: "#990F02", color: "#ffffff"}}>Add New Sales Agent</h1>
            </div>
            <div className="newAgentDiv" style={{marginTop: "25vh"}}>
                <div className="col-11">
                    <form onSubmit={handleCreateAgent} className="addAgentBox fs-5">
                        <div>
                            <label>Agent Name : </label> <input type="text" name="name" value={newAgent.name} onChange={handleAgent} required/>
                        </div>
                        <div>
                            <label>Email Address : </label> <input type="text" name="email" value={newAgent.email} onChange={handleAgent} required/>
                        </div>
                        <button className="py-2 px-3 btn btn" type="submit" style={{background: "#00224B", color: "#fff"}} onClick={() => isValidEmail(newAgent.email)}>Create Agent</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewAgent;