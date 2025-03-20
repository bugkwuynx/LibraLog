import NavigationBar from "./components/navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import Dashboard from "./pages/dashboard";
import BookSearch from "./pages/bookSearch";

function App() {

    return (
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/search" element={<BookSearch />} />
        </Routes>
      </Router>
    );
  }
  
  export default App;
  