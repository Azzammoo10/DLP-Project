import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ExecutiveOverview from "./components/ExecutiveOverview";
import Architecture from "./components/Architecture";
import CorrelationModel from "./components/CorrelationModel";
import GovernanceWorkflow from "./components/GovernanceWorkflow";
import OffensiveValidation from "./components/OffensiveValidation";
import ZeroTrust from "./components/ZeroTrust";
import EvolutionRoadmap from "./components/EvolutionRoadmap";
import KpiMaturity from "./components/KpiMaturity";
import BusinessValue from "./components/BusinessValue";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ExecutiveOverview />
        <Architecture />
        <CorrelationModel />
        <GovernanceWorkflow />
        <OffensiveValidation />
        <ZeroTrust />
        <EvolutionRoadmap />
        <KpiMaturity />
        <BusinessValue />
      </main>
      <Footer />
    </>
  );
}

export default App;
