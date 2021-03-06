import React, { useState, useEffect } from "react";
// components:
import Calendar from "./calendar/Calendar"
import Sidebar from "./sidebar/Sidebar";

const MainContainer = () => {
    return (
        <div className="app-wrapper">
            <Calendar />
            <Sidebar />
        </div>
    );
};

export default MainContainer;
