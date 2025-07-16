import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import DiagnosiChirurgica from "@/pages/DiagnosiChirurgica";
import Servizi from "@/pages/Servizi";
import Contatti from "@/pages/Contatti";
import Admin from "@/pages/Admin";

// Component to handle scroll to top on route change
function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        {/* Admin route - no navigation bar */}
        <Route path="/admin" component={Admin} />
        
        {/* Regular pages with navigation */}
        <Route>
          <div className="bg-[rgb(28,28,28)] min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-1">
              <Switch>
                <Route path="/" component={Home} />
                <Route path="/diagnosi" component={DiagnosiChirurgica} />
                <Route path="/servizi" component={Servizi} />
                <Route path="/contatti" component={Contatti} />
                <Route>
                  <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-4xl font-bold text-[hsl(47,85%,55%)] mb-4">404</h1>
                      <p className="text-gray-300">Pagina non trovata</p>
                    </div>
                  </div>
                </Route>
              </Switch>
            </main>
            <Footer />
          </div>
        </Route>
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
