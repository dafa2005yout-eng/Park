import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import "./styles.css";

import Home from "./routes/index";
import Quest from "./routes/quest";
import LocationDetail from "./routes/locations.$id";

function ScrollAndReveal() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (els.length === 0) return;
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [location.pathname]);
  return null;
}

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <p className="mt-4 text-sm text-muted-foreground">Страница не найдена</p>
        <a href="#/" className="mt-6 inline-block underline">На главную</a>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <ScrollAndReveal />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quest" element={<Quest />} />
        <Route path="/locations/:id" element={<LocationDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>,
);
