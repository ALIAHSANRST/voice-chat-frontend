import localFont from "next/font/local";
import "./globals.css";
import { AgoraProvider } from "@/context/voiceContext";
import { SocketProvider } from "@/context/SocketContext";

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

export const metadata = {
  title: "Voice chat app",
  description: "This is voice chat app for testing purposes",
};

export default function RootLayout({ children }) {
  const user = { usr_id_pk: 'exampleUserId' };

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SocketProvider user={user}>
          <AgoraProvider>
            {children}
          </AgoraProvider>
        </SocketProvider>
      </body>
    </html>
  );
}
