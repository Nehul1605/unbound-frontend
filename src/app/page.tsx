"use client";

import { useEffect, useState, useRef, type MouseEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import HowItWorks from "../components/HowItWorks";

export default function Home() {
  const router = useRouter();
  const [theme, setTheme] = useState("light");
  const [isAnnual, setIsAnnual] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const navbarRef = useRef<HTMLElement>(null);

  // Theme setup
  useEffect(() => {
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

  // Navbar shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!navbarRef.current) return;

      if (window.scrollY > 50) {
        navbarRef.current.style.boxShadow = "var(--shadow-md)";
      } else {
        navbarRef.current.style.boxShadow = "var(--shadow-sm)";
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll
  const smoothScroll = (e: MouseEvent<HTMLElement>, id: string) => {
    e.preventDefault();
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar" ref={navbarRef}>
        <div className="nav-container">
          <div className="logo">Unbound</div>

          <div className="nav-links">
            <a href="#home" onClick={(e) => smoothScroll(e, "#home")}>
              Home
            </a>
            <a href="#features" onClick={(e) => smoothScroll(e, "#features")}>
              Features
            </a>
            <a href="#pricing" onClick={(e) => smoothScroll(e, "#pricing")}>
              Pricing
            </a>
          </div>

          <div style={{ display: "flex", gap: "1rem" }}>
            <button onClick={toggleTheme}>
              {theme === "light" ? "🌙" : "☀️"}
            </button>
            <button onClick={() => setIsAuthOpen(true)}>Sign In</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="home">
        <h1>Transform Your Textbooks Into Interactive Learning</h1>
        <button onClick={() => setIsAuthOpen(true)}>Get Started</button>
        <Image src="/hero-image.png" alt="Hero" width={600} height={400} />
      </section>

      {/* Features */}
      <section id="features">
        <h2>Features</h2>
        <p>AI Tutor, Quizzes, Smart Extraction & more.</p>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* Pricing */}
      <section id="pricing">
        <h2>Pricing</h2>
        <button onClick={() => setIsAnnual(!isAnnual)}>
          {isAnnual ? "Annual Billing" : "Monthly Billing"}
        </button>
      </section>

      {/* Auth Modal */}
      {isAuthOpen && (
        <div className="modal">
          <div className="modal-content">
            <button onClick={() => setIsAuthOpen(false)}>X</button>

            <h2>{isSignUp ? "Create Account" : "Welcome Back"}</h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                router.push("/dashboard");
              }}
            >
              {isSignUp && <input placeholder="Full Name" />}
              <input type="email" placeholder="Email" required />
              <input type="password" placeholder="Password" required />
              <button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</button>
            </form>

            <button onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
