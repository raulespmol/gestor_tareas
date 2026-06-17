import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { RequerimientosProvider } from "@/context/RequerimientosContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RequerimientosProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </RequerimientosProvider>
  </StrictMode>
)
