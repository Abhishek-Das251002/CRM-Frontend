import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom"

import './index.css'
import App from './App.jsx'
import NewLead from './addNewLead.jsx'
import AllLeads from './leadList.jsx'
import ManageLead from './leadManagement.jsx'
import NewAgent from './addNewAgent.jsx'
import AgentList from './agentList.jsx'
import AgentView from './agentView.jsx'
import StatusView from './statusView.jsx'
import LeadReport from './leadReport.jsx'
import AllAgents from './agentViewList.jsx'
import AllStatus from './statusViewList.jsx'
import Setting from './settings.jsx'
import { ToastContainer, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  {
    path: "/", 
    element: <App/>
  },
  {
    path: "/newLead",
    element: <NewLead/>
  },
  {
    path: "/allleads",
    element: <AllLeads/>
  },
  {
    path: "/managelead/:id",
    element: <ManageLead/>
  },
  {
    path: "/newagent",
    element: <NewAgent/>
  },
  {
    path: "/allAgents",
    element: <AgentList/>
  },
  {
    path: "/agentView",
    element: <AgentView/>
  },
  {
    path: "/statusView",
    element: <StatusView/>
  },
  {
    path: "/leadReport",
    element: <LeadReport/>
  },
  {
    path: "/agentList",
    element: <AllAgents/>
  },
  {
    path: "/statusList",
    element: <AllStatus/>
  },
  {
    path: "/settings",
    element: <Setting/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce}
    />
  </StrictMode>,
)
