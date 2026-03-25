import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, Plus, Trash2, MessageSquare, Bot, User, 
  Sparkles, Copy, Check, Terminal, Shield, Zap,
  AlertTriangle
} from 'lucide-react';
import { useChatStore } from '../store/chatStore';
import { useAuthStore } from '../store/authStore';
import { streamMessage } from '../services/aiService';
import toast from 'react-hot-toast';

export default function ChatPage() {
  const [input, setInput] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  const { 
    conversations, 
    activeConversationId, 
    isGenerating,
    createConversation, 
    setActiveConversation,
    addMessage,
    deleteConversation,
    setGenerating,
    updateLastMessage
  } = useChatStore();
  
  const { user, updateTokens } = useAuthStore();

  const activeConversation = conversations.find(c => c.id === activeConversationId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation?.messages]);

  const handleNewChat = () => {
    createConversation();
  };

  const handleSend = async () => {
    if (!input.trim() || isGenerating) return;

    // Check token limit
    if (user && user.tokensUsed >= user.tokensLimit) {
      toast.error('Token limitinə çatdınız! Planınızı yüksəldin.');
      return;
    }

    let conversationId = activeConversationId;
    if (!conversationId) {
      conversationId = createConversation();
    }

    const userMessage = input.trim();
    setInput('');

    // Add user message
    addMessage(conversationId, {
      role: 'user',
      content: userMessage
    });

    // Add empty assistant message
    addMessage(conversationId, {
      role: 'assistant',
      content: '',
      model: 'ARN-AI-v1'
    });

    setGenerating(true);

    try {
      const conversationHistory = activeConversation?.messages.map(m => ({
        role: m.role,
        content: m.content
      })) || [];

      const tokensUsed = await streamMessage(
        userMessage,
        (text) => {
          updateLastMessage(conversationId!, text);
        },
        conversationHistory
      );

      updateTokens(tokensUsed);
    } catch (error) {
      console.error('AI error:', error);
      updateLastMessage(conversationId!, 'Xəta baş verdi. Yenidən cəhd edin.');
      toast.error('AI cavab verə bilmədi');
    } finally {
      setGenerating(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    toast.success('Kopyalandı!');
  };

  const quickPrompts = [
    { icon: Terminal, text: 'Nmap ilə port skan necə edilir?' },
    { icon: Shield, text: 'SQL Injection nədir?' },
    { icon: Zap, text: 'Burp Suite ilə proxy qurmaq' },
    { icon: AlertTriangle, text: 'OWASP Top 10 haqqında' },
  ];

  return (
    <div className="h-full flex">
      {/* Sidebar - Conversations */}
      <div className="w-64 bg-[#0f0f15] border-r border-white/10 flex flex-col hidden lg:flex">
        <div className="p-4">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-medium hover:opacity-90 transition-opacity"
          >
            <Plus className="w-5 h-5" />
            Yeni Söhbət
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {conversations.map((conv) => (
            <motion.button
              key={conv.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => setActiveConversation(conv.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-colors group ${
                conv.id === activeConversationId
                  ? 'bg-indigo-500/20 text-white'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <MessageSquare className="w-4 h-4 flex-shrink-0" />
              <span className="flex-1 truncate text-sm">{conv.title}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteConversation(conv.id);
                }}
                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 rounded transition-all"
              >
                <Trash2 className="w-4 h-4 text-red-400" />
              </button>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          {!activeConversation || activeConversation.messages.length === 0 ? (
            // Empty State
            <div className="h-full flex flex-col items-center justify-center p-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center max-w-2xl"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-float">
                  <Bot className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-3">ARN AI Pentest Assistant</h2>
                <p className="text-gray-400 mb-8">
                  Kibertəhlükəsizlik və pentest haqqında sual verin. Mən sizə kömək etməyə hazıram!
                </p>

                {/* Quick Prompts */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {quickPrompts.map((prompt, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setInput(prompt.text)}
                      className="flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-indigo-500/50 rounded-xl transition-all text-left group"
                    >
                      <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center group-hover:bg-indigo-500/30 transition-colors">
                        <prompt.icon className="w-5 h-5 text-indigo-400" />
                      </div>
                      <span className="text-sm text-gray-300">{prompt.text}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>
          ) : (
            // Messages List
            <div className="p-4 space-y-6">
              <AnimatePresence>
                {activeConversation.messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-4 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    {/* Avatar */}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      message.role === 'user' 
                        ? 'bg-gradient-to-br from-indigo-500 to-purple-600' 
                        : 'bg-gradient-to-br from-emerald-500 to-teal-600'
                    }`}>
                      {message.role === 'user' ? (
                        <User className="w-5 h-5 text-white" />
                      ) : (
                        <Bot className="w-5 h-5 text-white" />
                      )}
                    </div>

                    {/* Message Content */}
                    <div className={`flex-1 max-w-3xl ${message.role === 'user' ? 'text-right' : ''}`}>
                      <div className={`inline-block px-5 py-4 rounded-2xl ${
                        message.role === 'user'
                          ? 'bg-indigo-500/20 border border-indigo-500/30'
                          : 'bg-white/5 border border-white/10'
                      }`}>
                        {message.role === 'assistant' && message.content === '' && isGenerating ? (
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                          </div>
                        ) : (
                          <div className={`markdown-content text-left ${message.role === 'user' ? 'text-gray-200' : 'text-gray-300'}`}>
                            {message.content.split('\n').map((line, i) => {
                              // Handle code blocks
                              if (line.startsWith('```')) {
                                return null;
                              }
                              // Handle headers
                              if (line.startsWith('**') && line.endsWith('**')) {
                                return <p key={i} className="font-bold text-indigo-300 my-2">{line.replace(/\*\*/g, '')}</p>;
                              }
                              // Handle code inline
                              if (line.includes('`')) {
                                const parts = line.split(/(`[^`]+`)/g);
                                return (
                                  <p key={i} className="my-1">
                                    {parts.map((part, j) => 
                                      part.startsWith('`') && part.endsWith('`') 
                                        ? <code key={j} className="bg-black/50 px-2 py-0.5 rounded text-emerald-400 font-mono text-sm">{part.slice(1, -1)}</code>
                                        : part
                                    )}
                                  </p>
                                );
                              }
                              // Handle list items
                              if (line.startsWith('- ') || line.startsWith('• ')) {
                                return <p key={i} className="my-1 pl-4">• {line.slice(2)}</p>;
                              }
                              // Handle numbered lists
                              if (/^\d+\.\s/.test(line)) {
                                return <p key={i} className="my-1 pl-4">{line}</p>;
                              }
                              return line ? <p key={i} className="my-1">{line}</p> : <br key={i} />;
                            })}
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      {message.role === 'assistant' && message.content && (
                        <div className="mt-2 flex items-center gap-2">
                          <button
                            onClick={() => copyToClipboard(message.content, message.id)}
                            className="flex items-center gap-1 px-2 py-1 text-xs text-gray-500 hover:text-white hover:bg-white/10 rounded transition-colors"
                          >
                            {copiedId === message.id ? (
                              <Check className="w-3 h-3 text-green-500" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                            {copiedId === message.id ? 'Kopyalandı' : 'Kopyala'}
                          </button>
                          {message.model && (
                            <span className="text-xs text-gray-600">
                              <Sparkles className="w-3 h-3 inline mr-1" />
                              {message.model}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-white/10 bg-[#0f0f15]/80 backdrop-blur-lg">
          <div className="max-w-4xl mx-auto">
            {/* Token Warning */}
            {user && user.tokensUsed >= user.tokensLimit * 0.9 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-xl mb-4 text-yellow-400 text-sm"
              >
                <AlertTriangle className="w-4 h-4" />
                Token limitinə yaxınlaşırsınız! ({user.tokensUsed}/{user.tokensLimit})
              </motion.div>
            )}

            <div className="relative flex items-end gap-3">
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Sualınızı yazın..."
                  rows={1}
                  className="w-full px-5 py-4 pr-14 bg-white/5 border border-white/10 rounded-2xl resize-none focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder:text-gray-500"
                  style={{ minHeight: '56px', maxHeight: '200px' }}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isGenerating}
                  className="absolute right-3 bottom-3 p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
                >
                  {isGenerating ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <p className="text-center text-xs text-gray-600 mt-3">
              ARN AI pentest və security üzrə məsləhət verir. Həmişə etik qaydalarına əməl edin.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
