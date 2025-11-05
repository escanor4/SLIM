import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import TableauDeBord from './pages/tableau-de-bord';
import MaintenancePredictive from './pages/maintenance-predictive';
import AnalyseDesPerformances from './pages/analyse-des-performances';
import CyclesSterilisation from './pages/cycles-de-sterilisation';
import CertificatsNumeriques from './pages/certificats-numeriques';
import SuiviDesInstruments from './pages/suivi-des-instruments';
import Login from './pages/login';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Make Login the initial entry point */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />

          {/* Application routes */}
          <Route path="/tableau-de-bord" element={<TableauDeBord />} />
          <Route path="/maintenance-predictive" element={<MaintenancePredictive />} />
          <Route path="/analyse-des-performances" element={<AnalyseDesPerformances />} />
          <Route path="/cycles-de-sterilisation" element={<CyclesSterilisation />} />
          <Route path="/certificats-numeriques" element={<CertificatsNumeriques />} />
          <Route path="/suivi-des-instruments" element={<SuiviDesInstruments />} />

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;