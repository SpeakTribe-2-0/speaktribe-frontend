import React, { useState, useEffect, useRef } from "react";
import { FiSend, FiUser, FiMenu, FiSettings, FiMessageCircle, FiRefreshCw, FiChevronLeft } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { GoogleGenerativeAI } from "@google/generative-ai";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showTeacherInfo, setShowTeacherInfo] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [conversationStarted, setConversationStarted] = useState(false);
  const [chatHistory, setChatHistory] = useState({});
  const messagesEndRef = useRef(null);
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    level: "",
    learningGoal: "",
    culturalBackground: ""
  });

  const [generativeAI, setGenerativeAI] = useState(null);
  const [model, setModel] = useState(null);

  const teachers = {
    ola: { 
      name: "Ola", 
      language: "Yoruba", 
      color: "#00968741", 
      culture: "yoruba",
      story: "Ola grew up in Lagos and loves sharing Yoruba traditions through storytelling and proverbs. She makes learning fun with cultural anecdotes.",
      avatar: "🌶️"
    },
    abdul: { 
      name: "Abdul", 
      language: "Hausa", 
      color: "#00968741", 
      culture: "hausa",
      story: "Abdul is from Kano and passionate about Hausa poetry and history. He incorporates cultural wisdom into every lesson.",
      avatar: "🌙"
    },
    chidimma: { 
      name: "Chidimma", 
      language: "Igbo", 
      color: "#00968741", 
      culture: "igbo",
      story: "Chidimma hails from Enugu and loves teaching through Igbo folklore and music. She believes language connects hearts.",
      avatar: "💵"
    }
  };

  // Initialize Gemini AI
  useEffect(() => {
    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      setGenerativeAI(genAI);
      setModel(genAI.getGenerativeModel({ model: "gemini-2.0-flash" }));
    } catch (error) {
      console.error("Failed to initialize Gemini AI:", error);
    }

    // Load user data from localStorage
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        const parsedData = JSON.parse(userData);
        setUserDetails(prev => ({
          ...prev,
          firstName: parsedData.firstName || ""
        }));
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
    }
    
    // Load chat history
    try {
      const savedHistory = localStorage.getItem('chatHistory');
      if (savedHistory) {
        setChatHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
    
    // Check if user has completed onboarding
    const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding');
    if (!hasCompletedOnboarding) {
      setShowModal(true);
    }
  }, []);

  // Auto-scroll to bottom with better handling
  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    
    // Use setTimeout to ensure DOM updates
    const timer = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timer);
  }, [messages]);

  // Save chat history to localStorage
  useEffect(() => {
    if (selectedTeacher && messages.length > 0) {
      const updatedHistory = {
        ...chatHistory,
        [selectedTeacher]: messages
      };
      setChatHistory(updatedHistory);
      localStorage.setItem('chatHistory', JSON.stringify(updatedHistory));
    }
  }, [messages, selectedTeacher]);

  const getSuggestions = () => {
    if (!selectedTeacher) return [];
    
    const teacher = teachers[selectedTeacher];
    const suggestions = {
      words: [
        `Teach me basic ${teacher.language} greetings`,
        `What are common ${teacher.language} words for family?`,
        `How do you say "thank you" in ${teacher.language}?`
      ],
      alphabets: [
        `Show me the ${teacher.language} alphabet`,
        `How do you write my name in ${teacher.language}?`,
        `Teach me ${teacher.language} pronunciation rules`
      ],
      sentences: [
        `Help me form simple sentences in ${teacher.language}`,
        `Teach me basic ${teacher.language} grammar`,
        `Show me sentence structure examples`
      ],
      conversation: [
        `Let's have a conversation in ${teacher.language}`,
        `Role-play a market scene in ${teacher.language}`,
        `Practice introductions in ${teacher.language}`
      ]
    };
    
    return suggestions[userDetails.learningGoal] || suggestions.words;
  };

  const handleModalSubmit = () => {
    if (!userDetails.firstName || !userDetails.level || !userDetails.learningGoal || !userDetails.culturalBackground) {
      return;
    }
    
    // Save user data to localStorage
    localStorage.setItem('user', JSON.stringify(userDetails));
    localStorage.setItem('hasCompletedOnboarding', 'true');
    
    // Auto select teacher based on cultural background
    let teacher = "ola";
    if (userDetails.culturalBackground === "hausa") teacher = "abdul";
    if (userDetails.culturalBackground === "igbo") teacher = "chidimma";
    
    setSelectedTeacher(teacher);
    setShowModal(false);
    
    // Load previous chat or create new welcome message
    const previousChat = chatHistory[teacher];
    if (previousChat && previousChat.length > 0) {
      setMessages(previousChat);
      setConversationStarted(true);
    } else {
      const teacherInfo = teachers[teacher];
      const welcomeMessage = {
        id: Date.now(),
        sender: "ai",
        text: `${teacherInfo.avatar} Hello ${userDetails.firstName}! I'm ${teacherInfo.name}, your ${teacherInfo.language} teacher. I'm excited to help you learn ${userDetails.learningGoal} at your ${userDetails.level} level. Let's continue this beautiful journey together!`
      };
      
      setMessages([welcomeMessage]);
      setConversationStarted(true);
    }
  };

  const generateAIResponse = async (prompt) => {
    if (!model || !selectedTeacher) {
      return "I'm having trouble connecting to the AI service. Please check your API key.";
    }
    
    try {
      const teacher = teachers[selectedTeacher];
      
      // Build context from previous messages
      const context = messages.slice(-6).map(msg => 
        `${msg.sender === 'user' ? 'Student' : teacher.name}: ${msg.text}`
      ).join('\n');
      
      const promptWithContext = `
        You are ${teacher.name}, a friendly ${teacher.language} language teacher with ${teacher.culture} cultural background.
        You're teaching ${userDetails.firstName} who is at ${userDetails.level} level and wants to learn ${userDetails.learningGoal}.
        Keep responses very short (1-2 sentences), conversational, and educational. Use simple language.
        Incorporate cultural humor and context appropriate to ${teacher.culture} traditions.
        Focus on teaching words, alphabets, or sentences as requested.
        Respond as if you're a real language teacher with personality and warmth.
        
        Previous conversation:
        ${context}
        
        Student: ${prompt}
        ${teacher.name}:
      `;
      
      const result = await model.generateContent(promptWithContext);
      const response = await result.response;
      const text = response.text();
      
      // Ensure the response is concise
      const sentences = text.split('. ').slice(0, 2);
      return sentences.join('. ') + (sentences.length > 1 ? '.' : '');
      
    } catch (error) {
      console.error("Error generating AI response:", error);
      if (error.message.includes("API key")) {
        return "There's an issue with the API configuration. Please check if the VITE_GEMINI_API_KEY is set in your .env file.";
      }
      return "Sorry, I couldn't process that request. Please try again.";
    }
  };

  const handleSend = async () => {
    if (!input.trim() || !selectedTeacher || isTyping) return;

    const newMessage = { id: Date.now(), sender: "user", text: input };
    setMessages(prev => [...prev, newMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const aiResponse = await generateAIResponse(input);
      setMessages(prev => [
        ...prev,
        { id: Date.now(), sender: "ai", text: aiResponse }
      ]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        { id: Date.now(), sender: "ai", text: "Sorry, I'm having trouble right now. Please try again!" }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    setTimeout(() => {
      const sendButton = document.querySelector('button[aria-label="Send message"]');
      if (sendButton) sendButton.click();
    }, 100);
  };

  const resetConversation = () => {
    setShowModal(true);
    setMessages([]);
    setSelectedTeacher(null);
    setConversationStarted(false);
    // Keep firstName from localStorage, reset other fields
    setUserDetails(prev => ({
      ...prev,
      level: "",
      learningGoal: "",
      culturalBackground: ""
    }));
  };

  const handleTeacherSelect = (teacherKey) => {
    if (selectedTeacher && selectedTeacher !== teacherKey) {
      const confirmSwitch = window.confirm(
        "You have an active conversation. Switching teachers will end your current session. Are you sure you want to continue?"
      );
      if (!confirmSwitch) return;
    }
    
    // Save current chat before switching
    if (selectedTeacher && messages.length > 0) {
      const updatedHistory = {
        ...chatHistory,
        [selectedTeacher]: messages
      };
      setChatHistory(updatedHistory);
      localStorage.setItem('chatHistory', JSON.stringify(updatedHistory));
    }
    
    setSelectedTeacher(teacherKey);
    setSidebarOpen(false);
    
    // Load previous chat or create new welcome message
    const previousChat = chatHistory[teacherKey];
    if (previousChat && previousChat.length > 0) {
      setMessages(previousChat);
      setConversationStarted(true);
    } else {
      const teacherInfo = teachers[teacherKey];
      const welcomeMessage = {
        id: Date.now(),
        sender: "ai",
        text: `${teacherInfo.avatar} Hello ${userDetails.firstName || 'learner'}! I'm ${teacherInfo.name}, your ${teacherInfo.language} teacher. I'm excited to help you learn ${userDetails.learningGoal || 'the language'} at your ${userDetails.level || 'current'} level. Let's begin this beautiful journey together!`
      };
      
      setMessages([welcomeMessage]);
      setConversationStarted(true);
    }
  };

  const openOnboarding = () => {
    setShowModal(true);
  };

  return (
    <>
      {/* Onboarding Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl"
            >
              <motion.h2 
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                className="text-2xl md:text-3xl font-bold text-center mb-6 bg-gradient-to-r from-[#009688] to-[#009688] bg-clip-text text-transparent"
              >
                Welcome to Language Learning!
              </motion.h2>
              
              <div className="space-y-5">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
                  <input
                    type="text"
                    value={userDetails.firstName}
                    onChange={(e) => setUserDetails({...userDetails, firstName: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#009688] focus:border-[#009688] transition-all"
                    placeholder="Enter your name"
                  />
                </motion.div>

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your Learning Level</label>
                  <select
                    value={userDetails.level}
                    onChange={(e) => setUserDetails({...userDetails, level: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#009688] focus:border-[#009688] transition-all"
                  >
                    <option value="">Select your level</option>
                    <option value="beginner">🌱 Beginner</option>
                    <option value="intermediate">🌿 Intermediate</option>
                    <option value="advanced">🌳 Advanced</option>
                  </select>
                </motion.div>

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-2">What do you want to learn?</label>
                  <select
                    value={userDetails.learningGoal}
                    onChange={(e) => setUserDetails({...userDetails, learningGoal: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#009688] focus:border-[#009688] transition-all"
                  >
                    <option value="">Select learning goal</option>
                    <option value="words">📚 Words & Vocabulary</option>
                    <option value="alphabets">🔤 Alphabets & Writing</option>
                    <option value="sentences">📝 Sentences & Grammar</option>
                    <option value="conversation">💬 Conversation Practice</option>
                  </select>
                </motion.div>

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your Cultural Background</label>
                  <select
                    value={userDetails.culturalBackground}
                    onChange={(e) => setUserDetails({...userDetails, culturalBackground: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#009688] focus:border-[#009688] transition-all"
                  >
                    <option value="">Select background</option>
                    <option value="yoruba">🌺 Yoruba</option>
                    <option value="hausa">🌙 Hausa</option>
                    <option value="igbo">🦋 Igbo</option>
                    <option value="other">🌍 Other</option>
                  </select>
                </motion.div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleModalSubmit}
                disabled={!userDetails.firstName || !userDetails.level || !userDetails.learningGoal || !userDetails.culturalBackground}
                className="w-full mt-6 bg-gradient-to-r from-[#009688] to-[#009688] text-white py-3.5 rounded-xl font-semibold hover:from-[#007a6e] hover:to-[#007a6e] disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed transition-all shadow-lg"
              >
                Start Learning Journey ✨
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Teacher Info Modal */}
      <AnimatePresence>
        {showTeacherInfo && selectedTeacher && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowTeacherInfo(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div 
                  className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg"
                  style={{ backgroundColor: teachers[selectedTeacher].color }}
                >
                  {teachers[selectedTeacher].avatar}
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-2" style={{ color: teachers[selectedTeacher].color }}>
                  Meet {teachers[selectedTeacher].name}
                </h3>
                <p className="text-gray-600 mb-3">Your {teachers[selectedTeacher].language} Teacher</p>
                <p className="text-gray-700 leading-relaxed px-2">
                  {teachers[selectedTeacher].story}
                </p>
                <button
                  onClick={() => setShowTeacherInfo(false)}
                  className="mt-6 px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex h-full pt-[5rem] bg-gradient-to-br from-[#009688]/10 via-[#009688]/5 to-[#009688]/15 relative">
        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-x z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Left Sidebar - Language Switcher */}
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: sidebarOpen ? 0 : -300 }}
          transition={{ type: "spring", damping: 20 }}
          className="fixed md:static inset-y-0 left-0 w-64 bg-white/90 backdrop-blur-lg shadow-xl z-30 flex flex-col"
        >
          <div className="p-4 border-b border-gray-200 pt-18">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-800">Languages</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="md:hidden text-gray-500 hover:text-gray-700"
              >
                <FiChevronLeft size={20} />
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-3 ">
              {Object.entries(teachers).map(([key, teacher]) => (
                <motion.div
                  key={key}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleTeacherSelect(key)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all ${
                    selectedTeacher === key 
                      ? 'shadow-lg ring-2 ring-offset-2' 
                      : 'hover:shadow-md'
                  }`}
                  style={{ 
                    backgroundColor: selectedTeacher === key ? `${teacher.color}15` : 'white',
                    ringColor: selectedTeacher === key ? teacher.color : 'transparent'
                  }}
                >
                  <div className="flex items-center">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-md mr-3"
                      style={{ backgroundColor: teacher.color }}
                    >
                      {teacher.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-gray-800 truncate">{teacher.name}</div>
                      <div className="text-sm text-gray-600">{teacher.language}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Teacher Stories Section */}
            <div className="mt-8">
              <h3 className="text-base font-bold text-gray-800 mb-3">Teacher Stories</h3>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-white/50">
                {selectedTeacher ? (
                  <div>
                    <div className="flex items-center mb-2">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm mr-2"
                        style={{ backgroundColor: teachers[selectedTeacher].color }}
                      >
                        {teachers[selectedTeacher].avatar}
                      </div>
                      <span className="font-semibold text-gray-800">{teachers[selectedTeacher].name}</span>
                    </div>
                    <p className="text-xs text-gray-600">
                      {teachers[selectedTeacher].story}
                    </p>
                  </div>
                ) : (
                  <p className="text-xs text-gray-500 italic">
                    Select a teacher to see their story
                  </p>
                )}
              </div>
            </div>
          </div>
          
          {/* User Profile */}
          <div className="p-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-[#009688]/10">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-[#009688] to-[#009688] rounded-full flex items-center justify-center text-white text-base font-bold shadow-md">
                {userDetails.firstName?.charAt(0) || 'U'}
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <div className="font-semibold text-gray-800 truncate">{userDetails.firstName || 'User'}</div>
                <div className="text-xs text-gray-600 capitalize">{userDetails.level || 'Learner'}</div>
              </div>
              <button
                onClick={openOnboarding}
                className="text-gray-500 hover:text-gray-700"
                title="Edit profile"
              >
                <FiSettings size={18} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-white/20 sticky top-0 z-10"
          >
            <div className="flex items-center justify-between p-3 md:p-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 p-2 rounded-lg transition-all"
                aria-label="Toggle menu"
              >
                <FiMenu size={20} />
              </button>
              
              <div className="flex items-center space-x-2 md:space-x-3">
                {selectedTeacher && (
                  <>
                    <div
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm md:text-base shadow-md cursor-pointer hover:scale-110 transition-transform"
                      style={{ backgroundColor: teachers[selectedTeacher].color }}
                      onClick={() => setShowTeacherInfo(true)}
                    >
                      {teachers[selectedTeacher].avatar}
                    </div>
                    <h1 className="text-base md:text-lg font-bold text-gray-800 truncate max-w-[120px] md:max-w-xs">
                      {teachers[selectedTeacher].name} ({teachers[selectedTeacher].language})
                    </h1>
                  </>
                )}
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    if (selectedTeacher) {
                      const confirmReset = window.confirm("This will end your current session. Are you sure?");
                      if (confirmReset) resetConversation();
                    } else {
                      resetConversation();
                    }
                  }}
                  className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 p-2 rounded-lg transition-all"
                  aria-label="Reset conversation"
                >
                  <FiRefreshCw size={20} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 md:p-4 pb-24">
              <div className="max-w-4xl mx-auto space-y-3 md:space-y-4">
                {messages.length === 0 && selectedTeacher && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8"
                  >
                    <div className="inline-block p-4 rounded-full bg-white/80 backdrop-blur-sm shadow-sm mb-4">
                      <div 
                        className="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
                        style={{ backgroundColor: teachers[selectedTeacher].color }}
                      >
                        {teachers[selectedTeacher].avatar}
                      </div>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                      Welcome to your {teachers[selectedTeacher].language} lesson!
                    </h3>
                    <p className="text-gray-600 max-w-md mx-auto ">
                      {teachers[selectedTeacher].story}
                    </p>
                  </motion.div>
                )}
                
                <AnimatePresence>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className="flex items-end max-w-xs md:max-w-md lg:max-w-lg text-[14px]">
                        {msg.sender === "ai" && selectedTeacher && (
                          <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center text-sm mr-2 md:mr-3 mb-1 shadow-md flex-shrink-0 "
                            style={{ backgroundColor: teachers[selectedTeacher].color }}
                          >
                            {teachers[selectedTeacher].avatar}
                          </div>
                        )}
                        <div
                          className={`px-4 py-3 md:px-6 md:py-3 rounded-2xl shadow-sm backdrop-blur-sm ${
                            msg.sender === "user"
                              ? "bg-gradient-to-r from-[#009688] to-[#007a6e] text-white rounded-br-md"
                              : "bg-white/80 text-gray-800 rounded-bl-md border border-white/50"
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Typing indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-end">
                      {selectedTeacher && (
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center text-sm mr-2 md:mr-3 mb-1 shadow-md flex-shrink-0"
                          style={{ backgroundColor: teachers[selectedTeacher].color }}
                        >
                          {teachers[selectedTeacher].avatar}
                        </div>
                      )}
                      <div className="bg-white/80 backdrop-blur-sm px-4 py-3 md:px-6 md:py-3 rounded-2xl rounded-bl-md border border-white/50">
                        <div className="flex space-x-1">
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                            className="w-2 h-2 bg-gray-400 rounded-full"
                          />
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                            className="w-2 h-2 bg-gray-400 rounded-full"
                          />
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                            className="w-2 h-2 bg-gray-400 rounded-full"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-white/20 p-3 md:p-4"
            >
              <div className="max-w-4xl mx-auto">
                {/* Suggestions */}
                {selectedTeacher && !conversationStarted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-wrap gap-2 mb-3 md:mb-4 justify-center"
                  >
                    {getSuggestions().map((suggestion, index) => (
                      <motion.button
                        key={suggestion}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="text-xs md:text-sm bg-white/80 backdrop-blur-sm text-gray-700 px-3 py-2 md:px-4 md:py-2 rounded-full hover:bg-[#009688]/10 hover:text-[#009688] transition-all border border-gray-200 shadow-sm"
                      >
                        {suggestion}
                      </motion.button>
                    ))}
                  </motion.div>
                )}

                {/* Input */}
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                      placeholder={selectedTeacher ? `Message ${teachers[selectedTeacher].name}...` : 'Select a teacher first...'}
                      disabled={!selectedTeacher}
                      className="w-full px-4 py-3 md:py-4 pr-12 md:pr-14 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#009688] focus:border-[#009688] transition-all bg-white/80 backdrop-blur-sm disabled:bg-gray-100 disabled:cursor-not-allowed text-sm md:text-base"
                    />
                    <div className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <FiMessageCircle size={18} />
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSend}
                    disabled={!input.trim() || !selectedTeacher || isTyping}
                    className="bg-gradient-to-r from-[#009688] to-[#007a6e] text-white p-3 md:p-4 rounded-2xl hover:from-[#007a6e] hover:to-[#006b5c] disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed transition-all shadow-lg"
                    aria-label="Send message"
                  >
                    <FiSend size={18} className="md:w-5 md:h-5" />
                  </motion.button>
                </div>

                {/* Learning Progress Indicator */}
                {selectedTeacher && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-center mt-2 md:mt-3 text-xs md:text-sm text-gray-600"
                  >
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: teachers[selectedTeacher].color }}
                      />
                      <span>Learning {userDetails.learningGoal} • {userDetails.level} level</span>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Empty State */}
        {!selectedTeacher && !showModal && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex items-center justify-center p-4 md:p-8 max-mobile:hidden"
          >
            <div className="text-center max-w-md">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="text-5xl md:text-6xl mb-4 md:mb-6"
              >
                📚
              </motion.div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-4">
                Choose Your Language Teacher
              </h2>
              <p className="text-gray-600 mb-5 md:mb-6 text-sm md:text-base">
                Select a teacher from the sidebar to start your learning journey
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSidebarOpen(true)}
                className="bg-gradient-to-r from-[#009688] to-[#007a6e] text-white px-5 py-2.5 md:px-6 md:py-3 rounded-xl hover:from-[#007a6e] hover:to-[#006b5c] transition-all shadow-lg text-sm md:text-base"
              >
                Open Language Panel
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default Chat;