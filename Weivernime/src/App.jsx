import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainContainer from "./components/MainContainer";
import { SearchProvider } from "./contexts/SearchContext";
import AddAnalise from "./pages/AddAnalise";
import Analises from "./pages/Analises";
import Analise from "./pages/Analise";
import Animes from "./pages/Animes";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { AuthProvider } from "./contexts/Auth";
import { UseAuth } from "./contexts/Auth/useAuth";
import { UserPhotoProvider } from "./contexts/UserPhoto";
import UserPerfil from "./pages/UserPerfil";

export default function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <SearchProvider>
            <UserPhotoProvider>
              <Routes>
                <Route element={<Signin />} path="/" />
                <Route element={<Signup />} path="/signup" />
                {/* with nav and footer */}
                <Route element={<MainContainer />}>
                  <Route path="/analises" element={<Analises />} />
                  <Route path="/analise/:analiseId" element={<Analise />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/userPerfil/:userId" element={<UserPerfil />} />
                  <Route
                    path="/createAnalise/:animeId"
                    element={
                      <ProtectedRouteGuard>
                        <AddAnalise />
                      </ProtectedRouteGuard>
                    }
                  />
                  <Route
                    path="/animes"
                    element={
                      <ProtectedRouteGuard>
                        <Animes />
                      </ProtectedRouteGuard>
                    }
                  />
                </Route>
              </Routes>
            </UserPhotoProvider>
          </SearchProvider>
        </Router>
      </AuthProvider>
    </>
  );
}

function ProtectedRouteGuard({ children }) {
  const auth = UseAuth();

  if (!auth.user) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}
