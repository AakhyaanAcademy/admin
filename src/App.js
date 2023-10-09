import { lazy, Suspense } from 'react'
import { Route, Routes } from "react-router-dom"
import "./App.css"
import McqClient from "./pages/McqClient";
import { MathJaxContext } from 'better-react-mathjax'
const Admin = lazy(() => import("./pages/Admin"))

function App() {
  const config = {
    "fast-preview": {
      disabled: true
    },
    tex2jax: {
      inlineMath: [
        ["$", "$"],
        ["\\(", "\\)"]
      ],
      displayMath: [
        ["$$", "$$"],
        ["\\[", "\\]"]
      ]
    },
    messageStyle: "none"
  }

  return (
    <div className="w-full h-screen font-sans">
      <MathJaxContext
        version={2}
        config={config}
        onStartup={(mathJax) => (mathJax.Hub.processSectionDelay = 0)}
      >
        <Suspense
          fallback={
            <div className="flex flex-col text-white bg-background w-screen h-screen relative">
              <div className="m-auto">Loading...</div>
            </div>
          }>
          <Routes>
            <Route path="*" element={<Admin />} />
            <Route path="/mcqs/view/:id" element={<McqClient />} />
          </Routes>
        </Suspense>
      </MathJaxContext>
    </div>
  );
}

export default App;
