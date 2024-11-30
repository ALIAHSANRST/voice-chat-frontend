import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config as configCore } from "@fortawesome/fontawesome-svg-core";
configCore.autoAddCss = false;

import { AuthenticationProvider } from "@/src/context/AuthenticationContext";
import { SocketProvider } from "@/src/context/SocketContext";
import { AgoraProvider } from "@/src/context/VoiceContext";

export const metadata = {
  title: "Globalie",
  description: 'Globalie is ... TBD',
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <ToastContainer />
        <SocketProvider>
          <AuthenticationProvider>
            <AgoraProvider>
              {children}
            </AgoraProvider>
          </AuthenticationProvider>
        </SocketProvider>
      </body>
    </html>
  )
}

export default RootLayout