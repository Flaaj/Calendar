import React, { useState, useEffect } from "react";
// components:
import Calendar from "./calendar/Calendar"
import Sidebar from "./sidebar/Sidebar";
// style:
import './_mainContainer.scss'

const MainContainer = () => {
    return (
        <div className="app-wrapper">
            <Calendar />
            <Sidebar />
        </div>
    );
};

export default MainContainer;
