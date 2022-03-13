import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { LandingPage } from '@pages/LandingPage/LandingPage';
import { Navbar } from '@components/layouts/Navbar/Navbar';

export const AppRoutes = () => {
    return (
        <div className="AppRouter">
            <Navbar />
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                </Routes>
            </Router>
        </div>
    )
};
