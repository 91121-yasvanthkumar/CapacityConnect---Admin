import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Sparkles,
  Maximize2,
  Minimize2,
  Trash2,
  ExternalLink,
  ChevronRight,
  ArrowUpRight,
  RefreshCw,
  Database,
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { BotSvgIcon } from './BotSvgIcon';
import { queryKnowledgeEngine, BotResponse, ChartPayload } from './knowledgeEngine';
import { InChatChart } from './InChatChart';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  chart?: ChartPayload;
  quickActions?: { label: string; pageId?: string; query?: string }[];
  timestamp: string;
}

export const ChatBot: React.FC = () => {
  const portal = usePortal();
  const {
    isChatBotOpen,
    setIsChatBotOpen,
    setActivePage,
    users,
    courses,
    competencies,
    assessments,
    trainers,
    trainees,
    announcements,
    auditLogs,
    resources,
  } = portal;

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: `👋 **Welcome to Capacity Copilot • Institutional Intelligence Desk**\n\nI have full, live analytical access to the **entire MoES / IMD administrative database** (${users.length} registered personnel, ${trainees.length} trainees, ${trainers.length} domain faculty, ${courses.length} curricula, and diagnostic telemetry).\n\nAsk me anything about capacity growth, assessment scores, domain readiness, or operational directives.`,
      quickActions: [
        {
          label: "Today's Capacity Growth",
          query: "Based on the today result, how much our organization's capacity growth improved?",
        },
        {
          label: 'Priority Skill Gaps',
          query: 'What are the current high-risk skill gaps and bottlenecks?',
        },
        {
          label: 'Workforce Roster',
          query: 'Show workforce personnel distribution and pending verifications',
        },
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isChatBotOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isChatBotOpen]);

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    // Simulate intelligent query processing across portal snapshot data
    setTimeout(() => {
      const snapshot = {
        users,
        courses,
        competencies,
        assessments,
        trainers,
        trainees,
        announcements,
        auditLogs,
        resources,
      };

      const result: BotResponse = queryKnowledgeEngine(text, snapshot);

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: result.text,
        chart: result.chart,
        quickActions: result.quickActions,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleClear = () => {
    setMessages([
      {
        id: 'cleared-1',
        sender: 'bot',
        text: 'Session history cleared. All database telemetry is connected and live.',
        quickActions: [
          {
            label: "Today's Capacity Growth",
            query: "Based on the today result, how much our organization's capacity growth improved?",
          },
        ],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  // Helper to render simple markdown formatting
  const renderFormattedText = (content: string) => {
    const lines = content.split('\n');
    return (
      <div className="space-y-2 text-xs leading-relaxed">
        {lines.map((line, idx) => {
          if (line.startsWith('### ')) {
            return (
              <h4 key={idx} className="text-sm font-bold text-slate-900 mt-2 mb-1 tracking-tight">
                {line.replace('### ', '')}
              </h4>
            );
          }
          if (line.startsWith('* ') || line.startsWith('- ')) {
            const clean = line.replace(/^[\*\-]\s+/, '');
            return (
              <div key={idx} className="flex items-start gap-2 pl-1">
                <span className="text-indigo-600 font-bold">•</span>
                <span dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(clean) }} />
              </div>
            );
          }
          if (line.match(/^\d+\.\s+/)) {
            return (
              <div key={idx} className="pl-1 font-medium text-slate-800" dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(line) }} />
            );
          }
          if (!line.trim()) {
            return <div key={idx} className="h-1" />;
          }
          return (
            <p key={idx} dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(line) }} />
          );
        })}
      </div>
    );
  };

  const formatInlineMarkdown = (str: string) => {
    return str
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic text-slate-700">$1</em>');
  };

  return (
    <>
      {/* Minimal Floating Launcher Trigger */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isChatBotOpen && (
          <button
            id="open-chatbot-button"
            onClick={() => setIsChatBotOpen(true)}
            className="group relative flex items-center gap-2.5 px-4 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all border border-slate-700/80 cursor-pointer"
            aria-label="Open Capacity AI Assistant"
            title="Capacity AI Copilot • Connected to Database"
          >
            <div className="relative flex items-center justify-center">
              <BotSvgIcon className="w-5 h-5 text-white group-hover:text-indigo-300 transition-colors" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-900 animate-pulse" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold tracking-tight text-white flex items-center gap-1">
                Capacity AI
                <Sparkles className="w-3 h-3 text-indigo-400" />
              </span>
              <span className="text-[10px] text-slate-400 font-medium">Live Data Query</span>
            </div>
          </button>
        )}
      </div>

      {/* Minimalist Chat Drawer / Window */}
      {isChatBotOpen && (
        <div
          id="chatbot-drawer"
          className={`fixed z-50 transition-all duration-300 bg-white rounded-2xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 ${
            isExpanded
              ? 'inset-4 sm:inset-6 md:inset-10 max-w-4xl mx-auto'
              : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-32px)] sm:w-[460px] md:w-[500px] h-[640px] max-h-[88vh]'
          }`}
        >
          {/* Header */}
          <div className="px-4 py-3.5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
                <BotSvgIcon className="w-5 h-5 text-indigo-300" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-bold text-white tracking-tight">Capacity Copilot</h3>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Live Data
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 flex items-center gap-1">
                  <Database className="w-2.5 h-2.5 text-indigo-400" />
                  Connected to complete MoES Admin Core
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-slate-400">
              <button
                onClick={handleClear}
                className="p-1.5 rounded-lg hover:text-white hover:bg-slate-800 transition"
                title="Clear Chat"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 rounded-lg hover:text-white hover:bg-slate-800 transition hidden sm:inline-flex"
                title={isExpanded ? 'Restore View' : 'Expand View'}
              >
                {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setIsChatBotOpen(false)}
                className="p-1.5 rounded-lg hover:text-white hover:bg-slate-800 transition ml-1"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Query Suggestion Banner */}
          <div className="bg-slate-50 px-3 py-2 border-b border-slate-200/80 flex items-center gap-2 overflow-x-auto text-[11px] shrink-0 no-scrollbar">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
              Admin Queries:
            </span>
            <button
              onClick={() =>
                handleSend("Based on the today result, how much our organization's capacity growth improved?")
              }
              className="px-2.5 py-1 bg-white hover:bg-indigo-50 text-indigo-700 font-semibold rounded-lg border border-slate-200 hover:border-indigo-300 whitespace-nowrap transition shadow-2xs cursor-pointer"
            >
              📈 Today's Capacity Growth
            </button>
            <button
              onClick={() => handleSend('What are the current high-risk skill gaps and bottlenecks?')}
              className="px-2.5 py-1 bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 font-medium rounded-lg border border-slate-200 hover:border-indigo-300 whitespace-nowrap transition shadow-2xs cursor-pointer"
            >
              🎯 Priority Skill Gaps
            </button>
            <button
              onClick={() => handleSend('Show workforce personnel distribution and pending verifications')}
              className="px-2.5 py-1 bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 font-medium rounded-lg border border-slate-200 hover:border-indigo-300 whitespace-nowrap transition shadow-2xs cursor-pointer"
            >
              👥 User Directory
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/60">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center text-white shrink-0 mt-0.5 shadow-xs">
                    <BotSvgIcon className="w-4 h-4 text-white" />
                  </div>
                )}

                <div
                  className={`max-w-[90%] rounded-2xl p-3.5 text-xs shadow-xs ${
                    m.sender === 'user'
                      ? 'bg-slate-900 text-white rounded-tr-none'
                      : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-none'
                  }`}
                >
                  {/* Message Text */}
                  {renderFormattedText(m.text)}

                  {/* Embedded Interactive Chart (if provided) */}
                  {m.chart && <InChatChart payload={m.chart} />}

                  {/* Quick Action Navigation Pills */}
                  {m.quickActions && m.quickActions.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap gap-1.5">
                      {m.quickActions.map((qa, qidx) => (
                        <button
                          key={qidx}
                          onClick={() => {
                            if (qa.pageId) {
                              setActivePage(qa.pageId as any);
                            } else if (qa.query) {
                              handleSend(qa.query);
                            }
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-[11px] font-semibold border border-indigo-200/70 transition cursor-pointer"
                        >
                          <span>{qa.label}</span>
                          {qa.pageId ? (
                            <ArrowUpRight className="w-3 h-3 text-indigo-500" />
                          ) : (
                            <ChevronRight className="w-3 h-3 text-indigo-500" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}

                  <div
                    className={`text-[9px] mt-1.5 text-right font-medium ${
                      m.sender === 'user' ? 'text-slate-400' : 'text-slate-400'
                    }`}
                  >
                    {m.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center text-white shrink-0 shadow-xs">
                  <BotSvgIcon className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white border border-slate-200/80 rounded-2xl rounded-tl-none p-3 shadow-xs flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-medium">Evaluating administrative database...</span>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input */}
          <div className="p-3 bg-white border-t border-slate-200 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about capacity growth, today's results, skill gaps, or personnel..."
                className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="px-3.5 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl font-bold text-xs flex items-center gap-1.5 transition shadow-xs cursor-pointer shrink-0"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
            <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1.5 px-1">
              <span>Full read access to active portal tables</span>
              <span>Press Enter to dispatch query</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
