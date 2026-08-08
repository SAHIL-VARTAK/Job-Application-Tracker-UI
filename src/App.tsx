import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import AddApplication from "@/pages/AddApplication/AddApplication";
import Applications from "@/pages/Applications/Applications";
import Dashboard from "@/pages/Dashboard/Dashboard";
import NotFound from "@/pages/NotFound/NotFound";
import Statistics from "./pages/Statistics/Statistics";

const Router = window.location.protocol === "file:" ? HashRouter : BrowserRouter;

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/applications" element={<Applications />} />
                <Route path="/applications/new" element={<AddApplication />} />
                <Route path="/statistics" element={<Statistics />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}
