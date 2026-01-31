# Salla Developer Agent

IDE-style workspace for Salla platform development with AI agent capabilities powered by OpenAI Agents SDK.

## Features

### 🤖 Real AI Agent Integration
- Powered by `@openai/agents` library
- Supports GPT-4o, GPT-4o Mini, O1, O1 Mini, and GPT-5.2 models
- Web search capabilities with Salla documentation
- Code interpreter for dynamic code execution
- Configurable reasoning effort and context size

### 🔑 API Key Management
- Secure API key storage (local only)
- API key validation before workspace access
- Easy configuration through Settings modal

### 📊 Advanced Features
- **Trace Drawer**: View detailed execution traces including:
  - Tool calls with input/output
  - Search queries and results
  - Performance metrics (tokens, latency)
  - Execution logs
- **Conversation History**: Persistent context across multiple requests
- **Patch Detection**: Automatic detection of code patches in agent responses
- **Real-time Console**: Live logging of all agent activities

## Getting Started

### 1. Configure Your Project

On the home page, provide:
- **Project Name**: Your project identifier
- **OpenAI API Key**: Required for agent functionality (sk-...)
- **Allowed Domains**: Domains for web search (default: docs.salla.dev)
- **Model**: Choose your preferred OpenAI model
- **Tools**: Enable/disable Web Search and Code Interpreter

### 2. Open Workspace

Click "Open Workspace" to enter the IDE-style interface with:
- **Left Panel**: Request input and conversation history
- **Right Panel**: Live preview, console, files, and network tabs
- **Status Bar**: Real-time agent status and metrics

### 3. Use the Agent

1. Enter your request in the Request Panel
2. Use preset prompts or write custom requests
3. Click "Run" to execute
4. View agent response in the Conversation panel
5. Apply patches if available
6. Check Trace drawer for execution details

## Structure

### Pages
- **HomePage** (`/src/app/pages/HomePage.tsx`) - Project configuration and workspace launcher
- **WorkspacePage** (`/src/app/pages/WorkspacePage.tsx`) - Main IDE workspace with split panels

### Core Components

#### Layout
- **TopBar** - Navigation bar with logo, environment status, and action buttons
- **StatusBar** - Bottom status bar showing agent state, tools status, and last run time

#### Left Panel (Request & Chat)
- **RequestPanel** - Input area for task descriptions with preset prompts
- **Conversation** - Chat history between user and agent
- **ChatMessage** - Individual message with actions (Copy, Pin, Apply Patch, Trace)

#### Right Panel (Preview & Console)
- **PreviewPanel** - Live preview with viewport switcher (Desktop/Tablet/Mobile)
- **ConsolePanel** - Developer console with filterable logs

#### Dialogs & Modals
- **SettingsModal** - Workspace settings configuration with API key management
- **TraceDrawer** - Detailed execution trace (tool calls, search queries, metrics)

### Services
- **agent.ts** (`/src/app/services/agent.ts`) - OpenAI Agents integration
  - `createSallaDeveloperAgent`: Creates configured agent instance
  - `runWorkflow`: Executes agent with conversation history
  - Trace data extraction and formatting

## Agent Configuration

The Salla Developer Agent is configured with:

### Instructions
- Bilingual support (Arabic/English)
- Production-ready code generation
- Minimal explanatory text, maximum code output
- CSS-in-JS integration for styling
- Responsive testing across viewports
- Confidence metrics for all suggestions
- Salla-only features (no hallucinations)

### Tools
- **Web Search**: Filtered to allowed domains (e.g., docs.salla.dev)
- **Code Interpreter**: Dynamic code execution and analysis

### Model Settings
- Configurable reasoning effort (low/medium/high)
- Automatic reasoning summaries
- Conversation storage

## Environment Setup

### Required
- Node.js 18+
- OpenAI API key with Agents SDK access

### Installation
```bash
npm install
# or
pnpm install
```

### Development
```bash
npm run dev
```

## Tech Stack
- React 18
- TypeScript
- Tailwind CSS v4
- Radix UI components
- Lucide React icons
- Sonner for toast notifications
- OpenAI Agents SDK
- React Resizable Panels

## Security Notes

⚠️ **Important**: 
- API keys are stored in browser memory only (not persisted)
- Never commit API keys to version control
- For production, implement secure backend API key management
- This is a development tool - not suitable for production data storage

## Workflow Example

1. **User Request**: "Add a responsive promo banner to the home page"
2. **Agent Processing**: 
   - Searches Salla documentation
   - Generates code patch
   - Provides confidence metric
3. **Output**: Production-ready JSX/CSS code patch
4. **Apply**: User applies patch to preview
5. **Trace**: View detailed execution in Trace drawer

## Development Notes

The agent maintains:
- Full conversation context across turns
- State persistence for multi-step tasks
- Automatic patch detection in responses
- Real-time console logging
- Error handling with user-friendly messages

## Future Enhancements

- [ ] Live preview injection of patches
- [ ] File explorer with code navigation
- [ ] Network request monitoring
- [ ] Export workspace configuration
- [ ] Deploy to Salla platform
- [ ] Collaborative workspaces
- [ ] Code history and versioning