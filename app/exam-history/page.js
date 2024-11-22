'use client'
import Loader from '@/Components/Loader'
import baseApi from '@/utilis/api'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

const page = () => {
    const [scores, setScores] = useState([])
    const [loading, setLoading] = useState(false)
    const getAllScores = async () => {
        try {
            setLoading(true)
            const response = await baseApi.get('/scores/getAll')
            setScores(response.data?.exam_scores)
            setLoading(false)
        } catch (error) {
            console.log('error')
        }
    }
    useEffect(() => {
        getAllScores()
    }, [])

    return (
        <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '400px', margin: '1rem auto' }}>
            {scores.length > 0 ? (
                scores?.sort((a, b) => new Date(b.date) - new Date(a.date))?.
                    map((exam_score, index) => (
                        <div
                            key={index}
                            style={{
                                marginBottom: '1rem',
                                padding: '0.5rem',
                                backgroundColor: '#f9f9f9',
                                borderRadius: '4px',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                            }}
                        >
                            <p style={{ margin: 0, fontWeight: 'bold', color: '#333' }}>
                                Score: {exam_score.score}
                            </p>
                            <p style={{ margin: '0.5rem 0 0', fontSize: '0.9rem', color: '#666' }}>
                                Date: {moment(exam_score.date).format('MM-DD-YYYY')}
                            </p>
                        </div>
                    ))
            ) : (
                <p>{loading ? <Loader /> : 'No scores available'} </p>
            )}
        </div>
    )
}

export default page