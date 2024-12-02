'use client';

import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config as configCore } from "@fortawesome/fontawesome-svg-core";
configCore.autoAddCss = false;

import { COMMON_CONTEXT, USER_CONTEXT } from "@/src/context";

const App = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <ToastContainer />
        <USER_CONTEXT.SocketContext.SocketProvider>
          <COMMON_CONTEXT.AuthenticationContext.AuthenticationProvider>
            <USER_CONTEXT.VoiceContext.AgoraProvider>
              {children}
            </USER_CONTEXT.VoiceContext.AgoraProvider>
          </COMMON_CONTEXT.AuthenticationContext.AuthenticationProvider>
        </USER_CONTEXT.SocketContext.SocketProvider>
      </body>
    </html>
  )
}

export default App