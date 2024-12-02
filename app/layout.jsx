import App from './app';

export const metadata = {
  title: "Globalie",
  description: 'Globalie is ... TBD',
}

const RootLayout = ({ children }) => {
  return (
    <App>
      {children}
    </App>
  )
}

export default RootLayout