'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import localFont from "next/font/local";
import "./globals.css";
import { AgoraProvider } from "@/context/voiceContext";
import { SocketProvider } from "@/context/SocketContext";
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '@/context/authContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/Components/Header';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  // const router = useRouter();

  // useEffect(() => {
  //   const user = JSON.parse(sessionStorage.getItem('user'))
  //   const token = sessionStorage.getItem('token')

  //   if (token) {
  //     if (user.user.role === 'admin') {
  //       router.push('/admin/dashboard')
  //     } else {
  //       if (router.pathname === '/') {
  //         router.push('/test')
  //       }
  //     }
  //   } else {
  //     router.push('/login')
  //   }
  // }, [])

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ToastContainer />
        <SocketProvider>
          <AuthProvider>
            <AgoraProvider>
              <Header />
              {children}
            </AgoraProvider>
          </AuthProvider>
        </SocketProvider>
      </body>
    </html>
  );
}
