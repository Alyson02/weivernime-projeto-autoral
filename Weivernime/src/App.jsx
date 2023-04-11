import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainContainer from "./components/MainContainer";
import { UserProvider } from "./contexts/UserContext";
import { SearchProvider } from "./contexts/SearchContext";
import AddAnalise from "./pages/AddAnalise";
import Analises from "./pages/Analises";
import Analise from "./pages/Analise";
import Animes from "./pages/Animes";
import Home from "./pages/Home";

export default function App() {
  return (
    <>
      <UserProvider>
        <Router>
          <SearchProvider>
            <Routes>
              {/* with nav and footer */}
              <Route element={<MainContainer />}>
                <Route
                  path="/createAnalise/:animeId"
                  element={
                    <ProtectedRouteGuard>
                      <AddAnalise />
                    </ProtectedRouteGuard>
                  }
                />
                <Route
                  path="/analises"
                  element={
                    <ProtectedRouteGuard>
                      <Analises />
                    </ProtectedRouteGuard>
                  }
                />
                <Route
                  path="/analise/:analiseId"
                  element={
                    <ProtectedRouteGuard>
                      <Analise />
                    </ProtectedRouteGuard>
                  }
                />
                <Route
                  path="/animes"
                  element={
                    <ProtectedRouteGuard>
                      <Animes/>
                    </ProtectedRouteGuard>
                  }
                />
                <Route
                  path="/home"
                  element={
                    <ProtectedRouteGuard>
                      <Home/>
                    </ProtectedRouteGuard>
                  }
                />
              </Route>
            </Routes>
          </SearchProvider>
        </Router>
      </UserProvider>
    </>
  );
}

function ProtectedRouteGuard({ children }) {
  // const token = useToken();

  // if (!token) {
  //   return <Navigate to="" />;
  // }

  return <>{children}</>;
}
