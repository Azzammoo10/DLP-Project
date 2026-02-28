import { lazy, Suspense, useState, useCallback } from "react";
import SplashScreen from "./components/SplashScreen";
import ConfidentialityBanner from "./components/ConfidentialityBanner";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ExecutiveOverview from "./components/ExecutiveOverview";

/* Lazy-load sections below the fold for faster initial paint */
const Architecture = lazy(() => import("./components/Architecture"));
const DlpServer = lazy(() => import("./components/DlpServer"));
const DlpAgent = lazy(() => import("./components/DlpAgent"));
const DataClassification = lazy(() => import("./components/DataClassification"));
const HybridDlp = lazy(() => import("./components/HybridDlp"));
const DlpPolicies = lazy(() => import("./components/DlpPolicies"));
const CorrelationModel = lazy(() => import("./components/CorrelationModel"));
const CorrelationFlow = lazy(() => import("./components/CorrelationFlow"));
const GovernanceWorkflow = lazy(() => import("./components/GovernanceWorkflow"));
const RiskScenario = lazy(() => import("./components/RiskScenario"));
const OffensiveValidation = lazy(() => import("./components/OffensiveValidation"));
const SocPlaybooks = lazy(() => import("./components/SocPlaybooks"));
const ZeroTrust = lazy(() => import("./components/ZeroTrust"));
const EvolutionRoadmap = lazy(() => import("./components/EvolutionRoadmap"));
const Footer = lazy(() => import("./components/Footer"));

function App() {
  const [loading, setLoading] = useState(true);
  const handleSplashDone = useCallback(() => setLoading(false), []);

  return (
    <>
      {loading && <SplashScreen onFinish={handleSplashDone} />}
      {!loading && (
        <>
          <Navbar />
          <main>
            <Hero />
            <ExecutiveOverview />
        <Suspense fallback={<div className="h-screen" />}>
          {/* 1. Strategy — 2-phase approach (Linux lab → Purview trial) */}
          <HybridDlp />
          {/* 2. Architecture — overall technical design */}
          <Architecture />
          {/* 3. What we protect — classification & policies */}
          <DataClassification />
          <DlpPolicies />
          {/* 4. How — server, agents, correlation, governance */}
          <DlpServer />
          <DlpAgent />
          <CorrelationModel />
          <CorrelationFlow />
          <GovernanceWorkflow />
          {/* 5. Validate — risk, pentest, SOC response */}
          <RiskScenario />
          <OffensiveValidation />
          <SocPlaybooks />
          {/* 6. Remediate + future */}
          <ZeroTrust />
          <EvolutionRoadmap />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <ConfidentialityBanner />
        </>
      )}
    </>
  );
}

export default App;
