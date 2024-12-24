'use client';

import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config as configCore } from "@fortawesome/fontawesome-svg-core";
configCore.autoAddCss = false;

import "./app.css";
import { COMMON_CONTEXT, USER_CONTEXT } from "@/src/context";

const App = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <COMMON_CONTEXT.TranslationContext.TranslationProvider>
          <ToastContainer />
          <COMMON_CONTEXT.AuthenticationContext.AuthenticationProvider>
            <USER_CONTEXT.SocketContext.SocketProvider>
              <USER_CONTEXT.VoiceContext.AgoraProvider>
                {children}
              </USER_CONTEXT.VoiceContext.AgoraProvider>
            </USER_CONTEXT.SocketContext.SocketProvider>
          </COMMON_CONTEXT.AuthenticationContext.AuthenticationProvider>
        </COMMON_CONTEXT.TranslationContext.TranslationProvider>
      </body>
    </html>
  )
}

export default App