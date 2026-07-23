import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"

import { RequerimientosProvider } from "@/context/RequerimientosContext";
import { CatalogosProvider } from "@/context/CatalogosContext"

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <RequerimientosProvider >
      <CatalogosProvider>
        {children}
      </CatalogosProvider>
    </RequerimientosProvider>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <Providers>
        <App />
      </Providers>
    </ThemeProvider>
  </StrictMode>
)
