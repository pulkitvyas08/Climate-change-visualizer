import React from "react";
import { Box } from '@chakra-ui/react';

import './LandingPage.scss';

export const LandingPage: React.FC = () => {
    return (
        <Box className="landing__container">
            <span className="landing__title">
                Climate Change Visualizer
            </span>
        </Box>
    );
};
