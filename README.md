# SalesTrack CRM
A full-stack CRM application built using React, Node.js, and MongoDB to manage sales leads, agents and provides filtering, and sorting features.<br>
It includes interactive dashboards, lead lifecycle management, agent-wise performance tracking, and analytical reports for closed and in-pipeline leads.

---
## Demo Link

[Live Demo]()

---
## Quick Start
```
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
npm install
npm run dev

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

- Overview of leads with quick navigation
- Lead list with basic filtering options
- Add new leads to the system

**Lead Management**

- View detailed lead information
- Edit lead details and add comments

**Leads List**

- View all leads with filtering and sorting
- Filter leads by sales agent and lead status

**Sales Agents**

- View list of sales agents with email details
- Add new sales agents

**Reports & Analytics**

- Track closed and in-pipeline leads
- Agent-wise lead closure reports
- Lead status distribution using visual charts

**Settings**

- Manage leads and agent leads
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












