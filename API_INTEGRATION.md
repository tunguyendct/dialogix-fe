# Dialogix Backend API Integration Guide

This document describes the expected API endpoints that your Python backend should implement.

## Base URL
- Development: `http://localhost:8000`
- Production: Configure via `VITE_API_BASE_URL` environment variable

## API Endpoints

### 1. Health Check
**GET** `/health`

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-01-05T10:00:00Z",
  "version": "1.0.0"
}
```

### 2. Send Message (Chat Completion)
**POST** `/chat/completions`

**Request Body:**
```json
{
  "message": "Hello, how are you?",
  "conversation_id": "session-1704459600000" // optional
}
```

**Response:**
```json
{
  "message": "Hello! I'm doing well, thank you for asking. How can I help you today?",
  "messageId": "msg-1704459601000",
  "conversation_id": "session-1704459600000"
}
```

### 3. Create Conversation (Optional)
**POST** `/chat/conversations`

**Response:**
```json
{
  "conversation_id": "session-1704459600000"
}
```

### 4. Get Chat History (Optional)
**GET** `/chat/history/{conversationId}`

**Response:**
```json
{
  "messages": [
    {
      "id": "msg-1704459600000",
      "content": "Hello!",
      "role": "user",
      "timestamp": "2025-01-05T10:00:00Z"
    },
    {
      "id": "msg-1704459601000",
      "content": "Hello! How can I help you?",
      "role": "assistant",
      "timestamp": "2025-01-05T10:00:01Z"
    }
  ]
}
```

## Error Responses

All endpoints should return appropriate HTTP status codes and error messages:

**400 Bad Request:**
```json
{
  "error": "Invalid request format",
  "details": "message field is required"
}
```

**500 Internal Server Error:**
```json
{
  "error": "Internal server error",
  "details": "Failed to process request"
}
```

## CORS Configuration

Make sure your Python backend allows CORS requests from your frontend domain:

```python
# For FastAPI
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5000"],  # Your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Sample Python FastAPI Implementation

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import uuid
from datetime import datetime

app = FastAPI()

class MessageRequest(BaseModel):
    message: str
    conversation_id: str = None

class MessageResponse(BaseModel):
    message: str
    messageId: str
    conversation_id: str = None

@app.get("/api/v1/health")
async def health_check():
    return {
        "status": "ok",
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "version": "1.0.0"
    }

@app.post("/api/v1/chat/completions", response_model=MessageResponse)
async def chat_completion(request: MessageRequest):
    # Here you would integrate with your AI model
    # This is just a simple echo response
    
    response_message = f"You said: {request.message}"
    
    return MessageResponse(
        message=response_message,
        messageId=f"msg-{int(datetime.now().timestamp() * 1000)}",
        conversation_id=request.conversation_id
    )
```

## Testing the API

You can test your backend API using curl:

```bash
# Health check
curl http://localhost:8000/api/v1/health

# Send a message
curl -X POST http://localhost:8000/api/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello, how are you?"}'
```
