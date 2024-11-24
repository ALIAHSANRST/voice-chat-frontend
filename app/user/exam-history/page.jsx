'use client'

import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import moment from 'moment'

import Loader from '@/src/components/Loader'
import usePageTitle from '@/src/hooks/usePageTitle';
import BaseAPI from '@/src/utils/api'

const ExamHistoryPage = () => {
  usePageTitle('Exam History')

  const [examScores, setExamScores] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getAllScores = async () => {
    try {
      setIsLoading(true)
      const response = await BaseAPI.get('/exam/getAll?page=1&limit=100')
      setExamScores(response.data.exams)
      setIsLoading(false)
    } catch (error) {
      console.log('error')
    }
  }

  useEffect(() => {
    getAllScores()
  }, [])

  return (
    <div className='py-4 container' style={{ minHeight: '100vh' }}>
      <div className="border border-muted rounded-3 bg-white shadow-sm p-4">
        <div className='d-flex justify-content-between align-items-center'>
          <h4 className='fw-medium text-muted m-0 p-0 text-center'>Your Exam History</h4>
          <Button variant='outline-secondary' size='sm' href='/user'>
            Go to Home
          </Button>
        </div>
        <hr className='w-100 p-0 m-0 my-3 text-muted' />
        <div className='row g-3'>
          {examScores.length > 0 ? (
            examScores?.sort((a, b) => new Date(b.date) - new Date(a.date))?.
              map((exam_score, index) => (
                <div
                  key={index}
                  className='col-12 col-md-6 col-lg-4'
                >
                  <div className='border border-muted rounded-3 bg-light p-3'>
                    <p className='mb-0 fw-bold text-muted'>
                      Score: {exam_score.score}
                    </p>
                    <p className='mb-0 text-muted'>
                      <small>
                        {"Attempted At: "}
                        <span className='badge bg-secondary'>
                          {moment(exam_score.date).format('hh:mm A, DD/MM/YYYY')}
                        </span>
                      </small>
                    </p>
                  </div>
                </div>
              ))
          ) : (
            <p>{isLoading ? <Loader /> : 'No scores available'} </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ExamHistoryPage