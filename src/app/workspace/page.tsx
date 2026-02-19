"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function WorkspaceContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fileName = searchParams.get("fileName") || "New Document";

  const [theme, setTheme] = useState("light");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOutlineOpen, setIsOutlineOpen] = useState(true);
  const [messages, setMessages] = useState<
    { role: "user" | "ai"; text: string }[]
  >([
    {
      role: "ai",
      text: `Hello! I am your AI assistant. I've analyzed "${fileName}". Ask me anything about it.`,
    },
  ]);
  const [input, setInput] = useState("");

  const outlineItems = [
    { id: 1, title: "Executive Summary", page: 1 },
    { id: 2, title: "Key Topics", page: 1 },
    { id: 3, title: "Introduction", page: 2 },
    { id: 4, title: "Methodology", page: 5 },
    { id: 5, title: "Results", page: 8 },
    { id: 6, title: "Conclusion", page: 12 },
  ];

  useEffect(() => {
    // Sync theme on mount
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const currentTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
    setTheme(currentTheme);
    document.documentElement.setAttribute("data-theme", currentTheme);

    // Simulate PDF finish rendering
    setTimeout(() => {
      setIsLoaded(true);
    }, 1500);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const handleLogout = () => {
    router.push("/");
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user" as const, text: input }];
    setMessages(newMessages);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "This is a simulated response based on the document context.",
        },
      ]);
    }, 1000);
  };

  return (
    <div className="dashboard-container workspace-layout">
      {/* Sidebar - Reused for consistency */}
      <aside className="sidebar">
        <div className="sidebar-top">
          <button
            className="sidebar-btn"
            aria-label="Add New"
            onClick={() => router.push("/dashboard")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
          </button>
          <button
            className={`sidebar-btn ${isOutlineOpen ? "active" : ""}`}
            aria-label="Toggle Outline"
            onClick={() => setIsOutlineOpen(!isOutlineOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
          </button>
          <button
            className="sidebar-btn"
            aria-label="Workplace"
            onClick={() => router.push("/dashboard")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
              <path d="M14 3v5h5M16 13H8M16 17H8M10 9H8" />
            </svg>
          </button>
        </div>

        <div className="sidebar-bottom">
          <button
            className="sidebar-btn"
            aria-label="Settings"
            onClick={() => router.push("/settings")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
          </button>

          <button
            className="sidebar-btn"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
          >
            {theme === "light" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            )}
          </button>

          <button
            className="sidebar-btn"
            onClick={handleLogout}
            aria-label="Sign Out"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </button>
        </div>
      </aside>

      {/* Document Outline Panel */}
      <aside className={`outline-panel ${isOutlineOpen ? "open" : ""}`}>
        <div className="outline-header">
          <h3>{fileName}</h3>
          <span className="outline-subtitle">Table of Contents</span>
        </div>
        <div className="outline-content">
          <ul>
            {outlineItems.map((item) => (
              <li key={item.id} className="outline-item">
                <span className="page-number">p.{item.page}</span>
                <span className="item-title">{item.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main Document Area */}
      <main className="document-viewer">
        {isLoaded ? (
          <div className="pdf-content">
            {/* Simulated PDF Page */}
            <div className="pdf-page">
              <h1>{fileName.replace(".pdf", "")}</h1>
              <p>This is the converted web view of your uploaded document.</p>
              <div className="text-block">
                <h2>Executive Summary</h2>
                <p>
                  Based on the analysis of <strong>{fileName}</strong>, this
                  document contains key insights and structured data relevant to
                  your query. The conversion process has optimized the text for
                  readability and AI interaction.
                </p>
              </div>
              <div className="text-block">
                <h3>Key Topics</h3>
                <p>• Introduction and Overview</p>
                <p>• Methodology and Approach</p>
                <p>• Results and Findings</p>
                <p>• Conclusion and Recommendations</p>
              </div>
              <div className="text-block">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="pdf-placeholder">
            <div className="spinner"></div>
            <p>Rendering PDF...</p>
          </div>
        )}
      </main>

      {/* AI Chat Interface */}
      <aside className="chat-interface">
        <div className="chat-header">
          <h3>AI Assistant</h3>
        </div>
        <div className="chat-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`chat-message ${msg.role}`}>
              <div className="message-content">{msg.text}</div>
            </div>
          ))}
        </div>
        <form className="chat-input-area" onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="Ask about the document..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" aria-label="Send">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </aside>
    </div>
  );
}

export default function Workspace() {
  return (
    <Suspense
      fallback={
        <div className="dashboard-container">
          <div className="spinner"></div>
        </div>
      }
    >
      <WorkspaceContent />
    </Suspense>
  );
}
