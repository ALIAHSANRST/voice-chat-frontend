'use client'
import React from 'react'
import AdminLayout from "../layout";

const Dashboard = () => {
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome to the admin dashboard.</p>
        </div>
    );
};

Dashboard.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default Dashboard;
