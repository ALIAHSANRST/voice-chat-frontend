'use client'
import React, { useEffect, useState } from 'react'
import AdminLayout from "../layout";
import { useAdminContext } from '@/context/adminContext';

const AllScoresAndTranscript = () => {
    const { userResults, loading, getAllUserScores } = useAdminContext()
    const [page, setPage] = useState(0)

    useEffect(() => {
        getAllUserScores({ limit: 10, page })
    }, [page])

    return (
        <div>

            <p>Welcome to the admin dashboard.</p>
        </div>
    );
};

AllScoresAndTranscript.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default AllScoresAndTranscript;
