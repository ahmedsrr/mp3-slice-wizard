import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import type { ReactNode } from "react";
import Layout from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Home } from "./components/crem/Home";
import { MathsSection } from "./components/crem/MathsSection";
import { TsqSection } from "./components/crem/TsqSection";
import { DissertationSection } from "./components/crem/DissertationSection";
import { ExamenBlanc } from "./components/crem/ExamenBlanc";

const Page = ({ title, children }: { title: string; children: ReactNode }) => (
  <>
    <h1 className="mb-6 text-3xl font-bold font-serif">{title}</h1>
    {children}
  </>
);

const App = () => (
  <TooltipProvider>
    <Sonner position="top-center" />
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/maths" element={<Page title="Mathématiques"><MathsSection /></Page>} />
          <Route path="/tsq" element={<Page title="Texte suivi de questions"><TsqSection /></Page>} />
          <Route path="/dissertation" element={<Page title="Dissertation"><DissertationSection /></Page>} />
          <Route path="/examen" element={<Page title="Examen blanc"><ExamenBlanc /></Page>} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
