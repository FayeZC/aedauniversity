# AeDA Project AI Assistant Startup Prompt

## Context Setup for AI Assistants

When working with the AeDA project, use this prompt to provide full context:

---

**PROJECT CONTEXT:**
I'm working on the AeDA (Attainable eDucation for All) project - an AI-powered education platform with three main components:

1. **Homepage Website** (`/Users/faye/Documents/WorkSpace/aedaWebsite/`)
   - Modern purple-themed marketing site
   - Interactive learning path visualization with draggable bubbles
   - Built with HTML5, CSS3, vanilla JavaScript
   - Static site running on localhost:8000

2. **Frontend Application** (`/Users/faye/Documents/WorkSpace/AeDA_webfront/`)
   - React + Vite learning platform interface
   - TypeScript, Tailwind CSS, D3.js visualizations
   - Running on localhost:5174

3. **Backend API** (`/Users/faye/Documents/WorkSpace/aeda_kp/`)
   - Go-based API server with Gorilla Mux
   - Database integration, course management
   - Running on localhost:8081

**CURRENT STATUS:**
- All three services are functional and integrated
- Homepage includes service status monitoring
- Cross-service navigation implemented
- Repository: github.com:FayeZC/aedaWebsite.git

**TECHNICAL STACK:**
- Frontend: React 18, Vite, TypeScript, Tailwind CSS, D3.js, Lucide React
- Backend: Go 1.19+, Gorilla Mux, Cloud SQL, Google Cloud Storage
- Homepage: HTML5, CSS3, JavaScript ES6+, Python HTTP server
- Development: Git, npm, Go modules

**KEY FEATURES IMPLEMENTED:**
- Draggable floating bubbles with position persistence
- Learning path interactive visualization
- Responsive design with mobile support
- Backend/Frontend service integration
- Clean design without background patterns
- Attainable education focused messaging

**STARTUP COMMANDS:**
```bash
# Backend
cd /Users/faye/Documents/WorkSpace/aeda_kp && ./start_services.sh

# Frontend  
cd /Users/faye/Documents/WorkSpace/AeDA_webfront && npm run dev

# Homepage
cd /Users/faye/Documents/WorkSpace/aedaWebsite && python3 -m http.server 8000
```

**COMMON TASKS:**
- Code modifications and feature additions
- Styling and layout adjustments
- API integration and debugging
- Cross-service functionality testing
- Deployment and build optimization

Please help me with [SPECIFIC TASK/QUESTION].

---

## Usage Instructions for Team Members

**Copy the above prompt when:**
- Starting a new AI coding session
- Switching between different AI assistants
- Needing help with cross-service integration
- Debugging issues across multiple components
- Planning new features or modifications

**Update the [SPECIFIC TASK/QUESTION] section with:**
- Bug descriptions and error messages
- Feature requests and requirements
- Code review requests
- Performance optimization needs
- Deployment or configuration issues

**For Quick Development Help:**
Just copy this shortened version:

```
I'm working on AeDA education platform:
- Homepage (HTML/CSS/JS): localhost:8000 (/Users/faye/Documents/WorkSpace/aedaWebsite/)
- Frontend (React/Vite): localhost:5174 (/Users/faye/Documents/WorkSpace/AeDA_webfront/) 
- Backend (Go API): localhost:8081 (/Users/faye/Documents/WorkSpace/aeda_kp/)

Current task: [DESCRIBE YOUR TASK]
```


