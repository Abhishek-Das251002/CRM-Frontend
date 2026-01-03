import { Chart as ChartJs, defaults, plugins } from "chart.js/auto";
import { Bar, Pie} from "react-chartjs-2";
import useFetch from "./useFetch";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LeadReport = () => {
    const {data : pipelineData, loading: pipelineLoading} = useFetch("https://crm-backend-azure.vercel.app/report/pipeline")
    const {data: leadData, loading: leadLoading} = useFetch("https://crm-backend-azure.vercel.app/leads")
    const {data: agentData, loading: agentLoading} = useFetch("https://crm-backend-azure.vercel.app/agents")
    defaults.maintainAspectRatio = false;
    defaults.responsive = true;

    defaults.plugins.title.display = true;
    defaults.plugins.title.align = "start";
    defaults.plugins.title.font.size = 20;
    defaults.plugins.title.color = "black";
    defaults.font.lineHeight = 2;
    defaults.font.weight = "bolder";

    
    const navigate = useNavigate()
    const [leadStatusData, setLeadStatusData] = useState({
        New: 0, 
        Contacted: 0, 
        Qualified: 0, 
        "Proposal Sent": 0, 
        Closed: 0,
    })


    useEffect(() => {
        let currStatus = {}
        leadData.map((lead) => (
            currStatus = {...currStatus, [lead.status]: (currStatus[lead.status] || 0) + 1}
        ))
        setLeadStatusData(currStatus)
    },[leadData])


    const closedLead = agentData.map(agent => (
        {
            label: agent.name,
            value: leadData.reduce((acc, curr) => curr.salesAgent.name === agent.name && curr.status === "Closed" ? acc = acc + 1 : acc,0)
        }
    ))
    
    return (
        <div>
            <div className="header">
                <h1 className="text-center p-3" style={{background: "#990F02", color: "#ffffff"}}>Anvaya CRM Reports</h1>
            </div>
            {leadLoading && agentLoading && pipelineLoading
            ?
            <p className="mt-5 fs-5 text-center">Loading Details...</p>
            :
            <div className="row my-3 allReports">
                    <div className="reportBtns col-lg-4">
                        <button  className="py-2 mt-5 btn btn" style={{background: "#2E2E2E", color: "#fff"}} onClick={() => navigate("/")}>Go to Dashboard</button>
                    </div>
                    <div className="reportGraphs col-12 col-lg-7">
                        <div className="col-11">
                            <h3 className="my-3">Report Overview</h3>
                            <div className="row d-flex justify-content-center flex-column">
                                <div className="pieChart my-3">
                                    <Pie 
                                    data={{
                                        labels: ["Closed", "In Pipeline"],
                                        datasets: [
                                            {
                                                label: "Lead",
                                                data: [leadData.length - pipelineData.totalLeadsInPipeline, pipelineData.totalLeadsInPipeline],
                                                backgroundColor: ["#D16200","#00224B","#2E2E2E"],
                                                borderColor: ["#D16200","#00224B","#2E2E2E"]
                                            },
                                        ],
                                    }}
                                    options={{
                                        plugins: {
                                            title: {
                                                text: "Total Leads closed and in Pipeline:",
                                            },
                                        }
                                    }}
                                    />    
                                </div>
                                <div className="barChart my-3">
                                    <Bar
                                    data={{
                                        labels: closedLead.map(data => data.label),
                                        datasets: [
                                            {
                                                label: "Lead Closed",
                                                data: closedLead.map(data => data.value),
                                                backgroundColor: ["#D16200","#00224B","#2E2E2E"]
                                            }
                                        ]
                                    }}
                                    options={{
                                        plugins: {
                                            title: {
                                                text: "Leads Closed By Sales Agents:"
                                            }
                                        }
                                    }}
                                    />
                                </div>
                                <div className="barChart my-3">
                                    <Bar
                                    data={{
                                        labels: Object.keys(leadStatusData),
                                        datasets: [
                                            {
                                                label: "Lead",
                                                data: Object.values(leadStatusData),
                                                backgroundColor: ["#D16200","#00224B","#2E2E2E"],
                                            }
                                        ]
                                    }}
                                    options={{
                                        plugins: {
                                            title: {
                                                text: "Lead Status Distribution:"
                                            }
                                        }
                                    }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            }
        </div>
    )
}

export default LeadReport;