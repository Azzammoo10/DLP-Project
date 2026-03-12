import { lazy, Suspense, useState, useCallback, Component } from "react";
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

/* Error boundary to catch chunk-loading failures and prevent garbled renders */
class ChunkErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error) {
    // Auto-reload on chunk load failure (stale deployment)
    if (
      error?.name === "ChunkLoadError" ||
      error?.message?.includes("Loading chunk") ||
      error?.message?.includes("Failed to fetch dynamically imported module")
    ) {
      window.location.reload();
    }
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[40vh] items-center justify-center">
          <div className="text-center">
            <p className="text-sm text-gray-400">Something went wrong.</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-3 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-light"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const [loading, setLoading] = useState(true);
  const handleSplashDone = useCallback(() => setLoading(false), []);

  return (
    <>
      {loading && <SplashScreen onFinish={handleSplashDone} />}
      {!loading && (
        <div className="animate-fade-in">
          <Navbar />
          <main>
            <Hero />
            <ExecutiveOverview />
        <ChunkErrorBoundary>
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
        </ChunkErrorBoundary>
      </main>
      <ChunkErrorBoundary>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      </ChunkErrorBoundary>
      <ConfidentialityBanner />
        </div>
      )}
    </>
  );
}

export default App;
