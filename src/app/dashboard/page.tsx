"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

interface DocFile {
  name: string;
  date: string;
  type: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [theme, setTheme] = useState("light");
  const [activeTab, setActiveTab] = useState<"upload" | "history">("upload");

  // Mock history data
  const [historyFiles, setHistoryFiles] = useState<DocFile[]>([
    { name: "Biology_Notes_Ch3.pdf", date: "2 hours ago", type: "PDF" },
    { name: "Chemistry_Lab_Report.pdf", date: "Yesterday", type: "PDF" },
    { name: "History_Essay_Draft.pdf", date: "3 days ago", type: "PDF" },
    { name: "Math_Assignment_5.pdf", date: "Last week", type: "PDF" },
  ]);

  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Sync theme on mount
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const currentTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
    setTheme(currentTheme);
    document.documentElement.setAttribute("data-theme", currentTheme);
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

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      setIsUploading(true);
      // Simulate upload and conversion delay
      const fileToUpload = selectedFiles[0];
      setTimeout(() => {
        // Add the new file to the list (optional, might not need state update if redirecting)
        setFiles((prev) => [...prev, fileToUpload]);
        // Pass filename to workspace via query param
        router.push(
          `/workspace?fileName=${encodeURIComponent(fileToUpload.name)}`,
        );
      }, 2000);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-top">
          <button
            className={`sidebar-btn ${activeTab === "upload" ? "active" : ""}`}
            aria-label="Add New"
            onClick={() => setActiveTab("upload")}
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
            className={`sidebar-btn ${activeTab === "history" ? "active" : ""}`}
            aria-label="History"
            onClick={() => setActiveTab("history")}
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

      {/* Main Content */}
      <main className="main-content">
        <header className="main-header">
          <div className="user-greeting">
            <div className="user-icon">
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
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <span>Hey, User</span>
          </div>
        </header>

        <div className="content-area">
          <div className="content-top-bar">
            <h1 className="content-title">
              {activeTab === "upload" ? "Upload New" : "My Library"}
            </h1>
            <div className="search-bar">
              <input type="text" placeholder="Search" />
            </div>
          </div>

          {activeTab === "history" ? (
            <div className="files-grid">
              {historyFiles.length > 0 ? (
                historyFiles.map((file, index) => (
                  <div
                    key={index}
                    className="file-item"
                    onClick={() =>
                      router.push(
                        `/workspace?fileName=${encodeURIComponent(file.name)}`,
                      )
                    }
                  >
                    <div className="file-preview">
                      <span className="file-type">{file.type}</span>
                    </div>
                    <div className="file-info">
                      <span className="file-name">{file.name}</span>
                      <span className="file-date">{file.date}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <p>No history found.</p>
                </div>
              )}
            </div>
          ) : (
            // Upload View
            <>
              <div
                className="files-grid"
                style={{ marginBottom: "2rem", minHeight: "auto" }}
              >
                {files.length > 0 &&
                  files.map((file, index) => (
                    <div key={index} className="file-item">
                      <div className="file-preview">
                        <span className="file-type">NEW</span>
                      </div>
                      <div className="file-info">
                        <span className="file-name">{file.name}</span>
                        <span className="file-date">Just now</span>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="upload-area">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  ref={fileInputRef}
                />
                {isUploading ? (
                  <div className="upload-status">
                    <div className="spinner"></div>
                    <p>Uploading & Converting...</p>
                  </div>
                ) : (
                  <>
                    <button className="upload-btn" onClick={handleUploadClick}>
                      Select PDF File
                    </button>
                    <p className="upload-hint">or drop PDF here</p>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
