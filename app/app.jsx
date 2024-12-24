'use client';

import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config as configCore } from "@fortawesome/fontawesome-svg-core";
configCore.autoAddCss = false;

import "./app.css";
import HomePage from "./HomePage";
import { COMMON_CONTEXT, USER_CONTEXT } from "@/src/context";

const App = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <ToastContainer />
        <COMMON_CONTEXT.AuthenticationContext.AuthenticationProvider>
          <HomePage />
          <USER_CONTEXT.SocketContext.SocketProvider>
            <USER_CONTEXT.VoiceContext.AgoraProvider>
              {children}
            </USER_CONTEXT.VoiceContext.AgoraProvider>
          </USER_CONTEXT.SocketContext.SocketProvider>
        </COMMON_CONTEXT.AuthenticationContext.AuthenticationProvider>
      </body>
    </html>
  )
}

export default App