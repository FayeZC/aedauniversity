# AeDA Quick Start Commands

## One-Line Startup (Copy & Paste)

### Terminal 1 - Backend
```bash
cd /Users/faye/Documents/WorkSpace/aeda_kp && ./start_services.sh
```

### Terminal 2 - Frontend
```bash
cd /Users/faye/Documents/WorkSpace/AeDA_webfront && npm run dev
```

### Terminal 3 - Homepage
```bash
cd /Users/faye/Documents/WorkSpace/aedaWebsite && python3 -m http.server 8000
```

## Verification URLs
- Homepage: http://localhost:8000
- Frontend: http://localhost:5174  
- Backend: http://localhost:8081

## Status Check
Visit the homepage (localhost:8000) - check bottom-right corner for service status indicators.

## Full Development Environment in 30 Seconds
```bash
# Option 1: Sequential (run each in separate terminal)
cd /Users/faye/Documents/WorkSpace/aeda_kp && ./start_services.sh &
cd /Users/faye/Documents/WorkSpace/AeDA_webfront && npm run dev &
cd /Users/faye/Documents/WorkSpace/aedaWebsite && python3 -m http.server 8000

# Option 2: Background processes (single terminal)
(cd /Users/faye/Documents/WorkSpace/aeda_kp && ./start_services.sh) &
(cd /Users/faye/Documents/WorkSpace/AeDA_webfront && npm run dev) &
(cd /Users/faye/Documents/WorkSpace/aedaWebsite && python3 -m http.server 8000)
```

## Stop All Services
```bash
# Kill by port
lsof -ti:8081 | xargs kill -9  # Backend
lsof -ti:5174 | xargs kill -9  # Frontend  
lsof -ti:8000 | xargs kill -9  # Homepage

# Or use Ctrl+C in each terminal
```


