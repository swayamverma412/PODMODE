import Header from "/components/Header/Header";
import MainPlayerComponent from "/components/Player/MainPlayerComponent";
import { AuthProvider } from "/context/AuthContext";
import { DashboardProvider } from "/context/DashboardContext";
import { PlayerProvider } from "/context/PlayerContext";
import "/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <PlayerProvider>
          <DashboardProvider>
            <Header />
            <Component {...pageProps} />
            <MainPlayerComponent />
          </DashboardProvider>
        </PlayerProvider>
      </AuthProvider>
    </>
  );
}
