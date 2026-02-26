import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ExecutiveOverview from "./components/ExecutiveOverview";

/* Lazy-load sections below the fold for faster initial paint */
const Architecture = lazy(() => import("./components/Architecture"));
const DlpServer = lazy(() => import("./components/DlpServer"));
const DlpAgent = lazy(() => import("./components/DlpAgent"));
const DataClassification = lazy(() => import("./components/DataClassification"));
const CorrelationModel = lazy(() => import("./components/CorrelationModel"));
const CorrelationFlow = lazy(() => import("./components/CorrelationFlow"));
const GovernanceWorkflow = lazy(() => import("./components/GovernanceWorkflow"));
const RiskScenario = lazy(() => import("./components/RiskScenario"));
const OffensiveValidation = lazy(() => import("./components/OffensiveValidation"));
const ZeroTrust = lazy(() => import("./components/ZeroTrust"));
const EvolutionRoadmap = lazy(() => import("./components/EvolutionRoadmap"));
const Footer = lazy(() => import("./components/Footer"));

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ExecutiveOverview />
        <Suspense fallback={<div className="h-screen" />}>
          <Architecture />
          <DlpServer />
          <DlpAgent />
          <DataClassification />
          <CorrelationModel />
          <CorrelationFlow />
          <GovernanceWorkflow />
          <RiskScenario />
          <OffensiveValidation />
          <ZeroTrust />
          <EvolutionRoadmap />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
}

export default App;
