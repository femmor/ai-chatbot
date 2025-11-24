# 🤖 AI Chatbot - WonderWorld Theme Park Assistant

A modern, full-stack AI-powered chatbot application built for WonderWorld Theme Park customer support. This application provides visitors with instant assistance regarding park information, rides, tickets, dining, and accommodations.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white)

## ✨ Features

### 🎯 Core Functionality

- **Real-time Chat Interface** - Smooth, responsive chat experience with typing indicators
- **AI-Powered Responses** - Intelligent responses powered by OpenAI's GPT-4o-mini model
- **Context-Aware Conversations** - Maintains conversation history for natural dialogue flow
- **Theme Park Focused** - Specialized knowledge base for WonderWorld theme park

### 🎨 User Experience

- **Modern UI/UX** - Clean, intuitive design built with React and Tailwind CSS
- **Sound Effects** - Audio feedback for user interactions and bot responses
- **Responsive Design** - Optimized for desktop and mobile devices
- **Error Handling** - Graceful error handling with user-friendly messages
- **Typing Indicators** - Visual feedback when the bot is processing responses

### 🛠 Technical Features

- **Monorepo Architecture** - Organized codebase with separate client and server packages
- **Type Safety** - Full TypeScript implementation across the stack
- **Conversation Memory** - Stateful conversation management
- **Fast Development** - Hot reloading with Vite and Bun runtime
- **Component Architecture** - Modular, reusable React components

## 🏗 Architecture

### 📁 Project Structure

```
ai-chatbot/
├── index.ts                    # Development orchestrator
├── package.json               # Root package configuration
├── packages/
│   ├── client/                # React frontend
│   │   ├── src/
│   │   │   ├── components/    # Reusable UI components
│   │   │   │   ├── chat/      # Chat-specific components
│   │   │   │   └── ui/        # Generic UI components
│   │   │   ├── assets/        # Static assets (sounds, images)
│   │   │   ├── lib/           # Utility functions
│   │   │   └── types.ts       # TypeScript type definitions
│   │   └── package.json
│   └── server/                # Express backend
│       ├── controllers/       # Request handlers
│       ├── services/          # Business logic
│       ├── repositories/      # Data management
│       ├── routes/           # API route definitions
│       ├── prompts/          # AI prompt templates and data
│       └── package.json
```

### 🔄 Data Flow

1. **User Input** → Chat interface captures user messages
2. **API Request** → Frontend sends message to Express server
3. **AI Processing** → Server forwards request to OpenAI API with context
4. **Response Handling** → Server processes AI response and maintains conversation state
5. **UI Update** → Frontend displays bot response with visual feedback

## 🚀 Getting Started

### 📋 Prerequisites

- [Bun](https://bun.sh/) runtime (latest version)
- [Node.js](https://nodejs.org/) 18+ (for compatibility)
- OpenAI API key

### ⚙️ Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ai-chatbot
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Set up environment variables**

   Create a `.env` file in the `packages/server` directory:

   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   PORT=5005
   ```

4. **Start development servers**

   ```bash
   bun dev
   ```

   This command starts both the client (Vite dev server) and server (Express) concurrently.

### 🌐 Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5005
- **Health Check**: http://localhost:5005/api/alive

## 🛠 Technology Stack

### Frontend

- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client for API communication
- **React Hook Form** - Form state management
- **React Markdown** - Markdown rendering support
- **Lucide React** - Modern icon library

### Backend

- **Express.js** - Web application framework
- **TypeScript** - Type-safe server development
- **OpenAI API** - AI-powered chat responses
- **Zod** - Runtime type validation
- **dotenv** - Environment variable management

### Development Tools

- **Bun** - Fast JavaScript runtime and package manager
- **ESLint** - Code linting and quality
- **Prettier** - Code formatting
- **Husky** - Git hooks for code quality
- **Concurrently** - Run multiple commands simultaneously

## 📡 API Endpoints

### Chat API

- **POST** `/api/chat`
   - **Purpose**: Send user message and receive AI response
   - **Body**:
      ```json
      {
         "userPrompt": "string",
         "conversationId": "string"
      }
      ```
   - **Response**:
      ```json
      {
         "message": "string"
      }
      ```

### Health Check

- **GET** `/api/alive`
   - **Purpose**: Verify server status
   - **Response**: "API is ALIVE!!!"

## 🎭 Components Overview

### Chat Components

- **`Chatbot.tsx`** - Main chat container with state management
- **`ChatMessages.tsx`** - Message display and rendering
- **`ChatInput.tsx`** - User input form with validation
- **`TypingIndicator.tsx`** - Loading animation for bot responses

### UI Components

- **`Button.tsx`** - Reusable button component with variants
- **`Footer.tsx`** - Application footer

## 🧠 AI Configuration

The chatbot is specifically trained for WonderWorld Theme Park with:

- **Specialized Knowledge Base** - Comprehensive park information including rides, dining, accommodations
- **Contextual Responses** - Maintains conversation history for natural interactions
- **Focused Scope** - Only responds to park-related queries
- **Friendly Tone** - Configured for customer service excellence

### Key Features:

- Ride recommendations based on age groups
- Ticket pricing and purchasing information
- Park hours and scheduling
- Dining options and dietary accommodations
- Hotel and accommodation details

## 🔧 Development Scripts

### Root Level

- `bun dev` - Start both client and server in development mode
- `bun run format` - Format code with Prettier

### Client (`packages/client`)

- `bun dev` - Start Vite development server
- `bun build` - Build for production
- `bun lint` - Run ESLint
- `bun preview` - Preview production build

### Server (`packages/server`)

- `bun dev` - Start server with hot reload
- `bun start` - Start server in production mode

## 🚀 Deployment

### Environment Setup

1. **Production Environment Variables**

   ```env
   OPENAI_API_KEY=your_production_api_key
   PORT=5005
   NODE_ENV=production
   ```

2. **Build the Client**

   ```bash
   cd packages/client
   bun run build
   ```

3. **Deploy Server**
   ```bash
   cd packages/server
   bun start
   ```

### Deployment Platforms

- **Frontend**: Vercel, Netlify, or any static hosting
- **Backend**: Railway, Render, AWS, or any Node.js hosting platform

## 📊 Performance Features

- **Optimized Bundle Size** - Vite's efficient bundling
- **Fast Runtime** - Bun's performance advantages
- **Efficient State Management** - Minimal re-renders with proper state structure
- **Responsive UI** - Smooth interactions with proper loading states
- **Audio Optimization** - Reduced volume levels for sound effects

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is private and proprietary. All rights reserved.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Contact the development team
- Check the documentation in individual package READMEs

## 🔮 Future Enhancements

- [ ] Multi-language support
- [ ] Voice input/output capabilities
- [ ] Integration with booking systems
- [ ] Advanced analytics and user insights
- [ ] Mobile app development
- [ ] Additional theme park integrations

---

**Built with ❤️ for WonderWorld Theme Park**
