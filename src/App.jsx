import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import HomePage from "./pages/common/HomePage";
import HRDashboardPage from "./pages/hr/HRDashboardPage";
import EmployeeDashboardPage from "./pages/employee/EmployeeDashboardPage";
import HRAttendancePage from "./pages/hr/HRAttendancePage";
import EmployeeAttendancePage from "./pages/employee/EmployeeAttendancePage";
import HRTaskPage from "./pages/hr/HRTaskPage";
import EmployeeTaskPage from "./pages/employee/EmployeeTaskPage";
import HRLeavePage from "./pages/hr/HRLeavePage";
import EmployeeLeavePage from "./pages/employee/EmployeeLeavePage";
import HRCalendarPage from "./pages/hr/HRCalendarPage";
import EmployeeCalendarPage from "./pages/employee/EmployeeCalendarPage";
import ChatPage from "./pages/common/ChatPage";
import ProfilePage from "./pages/profile/ProfilePage";
import EmployeeDirectoryPage from "./pages/hr/EmployeeDirectoryPage";
import EmployeeDetailsPage from "./pages/hr/EmployeeDetailsPage";
import {useEffect} from "react";
// import socket from "../../frontend/src/socket";
import socket from "./socket";


import {AuthProvider} from "./context/AuthContext";
import ProtectedRoute from "./context/ProtectedRoute";

function App(){
    return (
    <BrowserRouter>
    <AuthProvider>
        <Routes>
            {/* Public */}
            <Route path = "/" element = {<HomePage />} />
            <Route path = "/login" element = {<Login />} />
            <Route path = "/register" element={<Register />} />
            
            {/* Protected */}
            <Route path = "/hr/dashboard" element = {<ProtectedRoute roleRequired = "HR"> <HRDashboardPage /> </ProtectedRoute>} />
            <Route path = "/employee/dashboard" element = {<ProtectedRoute roleRequired = "Employee"> <EmployeeDashboardPage /> </ProtectedRoute>} />
            
            <Route path = "/hr/attendance" element = {<ProtectedRoute roleRequired = "HR"> <HRAttendancePage /> </ProtectedRoute>} />
            <Route path = "/employee/attendance" element = {<ProtectedRoute roleRequired = "Employee"> <EmployeeAttendancePage /> </ProtectedRoute>} />
            
            <Route path = "/hr/tasks" element = {<ProtectedRoute roleRequired = "HR"> <HRTaskPage /> </ProtectedRoute>} />
            <Route path = "/employee/tasks" element = {<ProtectedRoute roleRequired = "Employee"> <EmployeeTaskPage /> </ProtectedRoute>} />
            
            <Route path = "/hr/leaves" element = {<ProtectedRoute roleRequired = "HR"> <HRLeavePage /> </ProtectedRoute>} />
            <Route path = "/employee/leaves" element = {<ProtectedRoute roleRequired = "Employee"> <EmployeeLeavePage /> </ProtectedRoute>} />
            
            <Route path = "/hr/calendar" element = {<ProtectedRoute roleRequired = "HR"> <HRCalendarPage /> </ProtectedRoute>} />
            <Route path = "/employee/calendar" element = {<ProtectedRoute roleRequired = "Employee"> <EmployeeCalendarPage /> </ProtectedRoute>} />
            
            <Route path = "/hr/chat" element = {<ProtectedRoute roleRequired = "HR"> <ChatPage /> </ProtectedRoute> } />
            <Route path = "/employee/chat" element = {<ProtectedRoute roleRequired = "Employee"> <ChatPage /> </ProtectedRoute> } />
            
            <Route path = "/profile" element = {<ProtectedRoute> <ProfilePage /> </ProtectedRoute> } />
            
            <Route path = "/hr/employees" element = {<ProtectedRoute roleRequired = "HR"> <EmployeeDirectoryPage /> </ProtectedRoute> } />
            <Route path = "/hr/employees/:id" element = {<ProtectedRoute roleRequired = "HR"> <EmployeeDetailsPage /> </ProtectedRoute> } />
            
            <Route path = "/employee/dashboard" element = {<ProtectedRoute> <EmployeeDashboardPage/> </ProtectedRoute> } />
            
        </Routes>
    </AuthProvider>
    </BrowserRouter>
    );
}

export default App;