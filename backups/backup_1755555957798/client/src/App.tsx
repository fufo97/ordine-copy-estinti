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
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import AdminBlog from "@/pages/AdminBlog";
import SiteUpdates from "@/pages/SiteUpdates";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import CookiePolicy from "@/pages/CookiePolicy";
import GlobalAdminEditProvider from "@/components/GlobalAdminEditProvider";

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
        {/* Admin login page - no navigation bar */}
        <Route path="/admin" component={Admin} />
        
        {/* Admin pages with navigation - /admin prefix */}
        <Route path="/admin/home" component={() => (
          <GlobalAdminEditProvider>
            <div className="bg-[rgb(28,28,28)] min-h-screen flex flex-col">
              <Navigation />
              <main className="flex-1">
                <Home />
              </main>
              <Footer />
            </div>
          </GlobalAdminEditProvider>
        )} />
        <Route path="/admin/diagnosi" component={() => (
          <GlobalAdminEditProvider>
            <div className="bg-[rgb(28,28,28)] min-h-screen flex flex-col">
              <Navigation />
              <main className="flex-1">
                <DiagnosiChirurgica />
              </main>
              <Footer />
            </div>
          </GlobalAdminEditProvider>
        )} />
        <Route path="/admin/servizi" component={() => (
          <GlobalAdminEditProvider>
            <div className="bg-[rgb(28,28,28)] min-h-screen flex flex-col">
              <Navigation />
              <main className="flex-1">
                <Servizi />
              </main>
              <Footer />
            </div>
          </GlobalAdminEditProvider>
        )} />
        <Route path="/admin/contatti" component={() => (
          <GlobalAdminEditProvider>
            <div className="bg-[rgb(28,28,28)] min-h-screen flex flex-col">
              <Navigation />
              <main className="flex-1">
                <Contatti />
              </main>
              <Footer />
            </div>
          </GlobalAdminEditProvider>
        )} />
        <Route path="/admin/blog" component={() => (
          <GlobalAdminEditProvider>
            <div className="bg-[rgb(28,28,28)] min-h-screen flex flex-col">
              <Navigation />
              <main className="flex-1">
                <AdminBlog />
              </main>
              <Footer />
            </div>
          </GlobalAdminEditProvider>
        )} />
        <Route path="/admin/blog/:slug" component={() => (
          <GlobalAdminEditProvider>
            <div className="bg-[rgb(28,28,28)] min-h-screen flex flex-col">
              <Navigation />
              <main className="flex-1">
                <BlogPost />
              </main>
              <Footer />
            </div>
          </GlobalAdminEditProvider>
        )} />
        <Route path="/admin/aggiornamenti" component={() => (
          <GlobalAdminEditProvider>
            <div className="bg-[rgb(28,28,28)] min-h-screen flex flex-col">
              <Navigation />
              <main className="flex-1">
                <SiteUpdates />
              </main>
              <Footer />
            </div>
          </GlobalAdminEditProvider>
        )} />
        <Route path="/admin/privacy-policy" component={() => (
          <GlobalAdminEditProvider>
            <div className="bg-[rgb(28,28,28)] min-h-screen flex flex-col">
              <Navigation />
              <main className="flex-1">
                <PrivacyPolicy />
              </main>
              <Footer />
            </div>
          </GlobalAdminEditProvider>
        )} />
        <Route path="/admin/cookie-policy" component={() => (
          <GlobalAdminEditProvider>
            <div className="bg-[rgb(28,28,28)] min-h-screen flex flex-col">
              <Navigation />
              <main className="flex-1">
                <CookiePolicy />
              </main>
              <Footer />
            </div>
          </GlobalAdminEditProvider>
        )} />
        
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
                <Route path="/blog" component={Blog} />
                <Route path="/blog/:slug" component={BlogPost} />
                <Route path="/privacy-policy" component={PrivacyPolicy} />
                <Route path="/cookie-policy" component={CookiePolicy} />
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
