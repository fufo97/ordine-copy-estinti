import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "@/components/Navigation";
import Home from "@/pages/Home";
import DiagnosiChirurgica from "@/pages/DiagnosiChirurgica";
import Servizi from "@/pages/Servizi";
import Contatti from "@/pages/Contatti";
import Admin from "@/pages/Admin";

function Router() {
  return (
    <div className="bg-[rgb(28,28,28)] min-h-screen">
      <Navigation />
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
    </div>
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
