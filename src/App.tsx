import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "@/pages/Dashboard/Dashboard";
import Applications from "@/pages/Applications/Applications";
import AddApplication from "@/pages/AddApplication/AddApplication";
import NotFound from "@/pages/NotFound/NotFound";
import Statistics from "./pages/Statistics/Statistics";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/applications" element={<Applications />} />
                <Route path="/applications/new" element={<AddApplication />} />
                <Route path="/statistics" element={<Statistics />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}