'use client'
import { SocketContext } from '@/context/SocketContext'
import React, { useContext, useEffect, useState } from 'react'

const Transcipt = ({ setTranscript, transcript }) => {
    const { socket } = useContext(SocketContext)

    useEffect(() => {
        if (socket) {
            socket.on('transcript', (data) => {
                console.log(data, 'data')
                setTranscript(prev => (prev + " " + data))
            })
            return () => {
                socket.off('transcript')
                setTranscript('')
            }
        }
    }, [socket])

    return (
        <div>{transcript}</div>
    )
}

export default Transcipt