# SalesTrack CRM
A full-stack CRM application built using React, Node.js, and MongoDB to manage sales leads, agents and provides filtering, and sorting features.<br>
It includes interactive dashboards, lead lifecycle management, agent-wise performance tracking, and analytical reports for closed and in-pipeline leads.

---
## Demo Link

[Live Demo](https://crm-frontend-brown-five.vercel.app/)

---
## Quick Start
```
git clone https://github.com/Abhishek-Das251002/CRM-Frontend.git
cd CRM-Frontend
npm install
npm run dev

```
---
## Environment Setup
Create a .env file in the backend root directory and add the following environment variables:

```
PORT = 3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key 
```

---
## Technologies
**Frontend**
- React.js
- Vite
- React Router
- Axios
- Chart.js
- JavaScript (ES6+)
- HTML5
- CSS3

**Backend**

- Node.js
- Express.js
- Mongoose
- RESTful APIs

**Database**

- MongoDB

---
## Demo Video
Watch a walkthrough (5–7 minutes) of all major features of this app: [Video Link]()

---
## Features

**Dashboard**

- View a centralized overview of leads with quick navigation
- Access lead lists with basic filtering options
- Add new leads to the system

**Lead Management**

- View detailed lead profiles
- Update lead details and add internal comments

**Leads & Agents**

- View and manage all leads with filtering and sorting
- Filter leads by sales agent and lead status
- View sales agents with contact details
- Add new sales agents

**Reports & Analytics**

- Monitor closed and in-pipeline leads
- Analyze agent-wise lead closure performance
- Visualize lead status distribution using charts

**Settings**

- Manage leads and agent assignments
- Delete leads and agents when required

---
## API Reference
### **GET /api/leads**

List all Leads
Sample Response:
```
[{_id, name, source, salesAgent, ....}, ....]
```

### **POST /api/leads/:id**

Update a lead
Sample Response: 
```
{_id, name, source, salesAgent, ...}
```

### **POST /api/leads**

Create a new leads
Sample Response:
```
{_id, name, source, salesAgent, ...}
```

### **DELETE/api/leads/:id**

Delete a lead
```
{_id, name, source, salesAgent, ...}
```
### **GET /api/agents**

List all agents
Sample Response:
```
[{_id, name, email, createdAt}, ...]
```
### **POST /api/agents**

Create a new leads
Sample Response:
```
{_id, name, email, createdAt}
```

### **DELETE /api/agents/:id**

Delete an agent
Sample Response:
```
{_id, name, email, createdAt}
```

### **POST /api/leads/:id/comments**

To create a new comment on a specific lead
Sample Response:
```
{_id, lead, author, commentText,...}
```

### **GET/api/leads/:id/comments**

List all comments for a specific lead
Sample Response:
```
[{_id, lead, author, commentText,...}, ...]
```

### **GET/api/report/last-week**

To get leads closed last week
Sample Response:
```
[{id, name, salesAgent, closedAt}, ...]
```

### **GET/api/report/pipeline**

Give total leads currently in pipeline
Sample Response:
```
{totalLeadsInPipeline}
```

---

## Contact
For bugs or feature requests, please reach out to abhishekgautam1966@gmail.com












