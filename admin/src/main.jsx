import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AdminContextProvider from "./context/AdminContext.jsx";
import AppContextProvider from "./context/AppContext.jsx";
import AdvocateContextProvider from "./context/AdvocateContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AdminContextProvider>
      <AdvocateContextProvider>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </AdvocateContextProvider>
    </AdminContextProvider>
  </BrowserRouter>,
);
