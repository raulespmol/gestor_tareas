import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { RequerimientosProvider } from "@/context/RequerimientosContext";
import { useRequerimientos } from "@/context/RequerimientosContext";
import { PagosProvider } from "@/context/PagosContext"
import { CatalogosProvider } from "@/context/CatalogosContext"

const Providers = ({ children }: { children: React.ReactNode }) => {
  const { actualizarMontos } = useRequerimientos();
  return (
    <PagosProvider onPagoAgregado={actualizarMontos}>
      {children}
    </PagosProvider>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RequerimientosProvider>
      <CatalogosProvider>
        <ThemeProvider>
          <Providers>
            <App />
          </Providers>
        </ThemeProvider>
      </CatalogosProvider>
    </RequerimientosProvider>
  </StrictMode>
)
