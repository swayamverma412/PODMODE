import MainScreen from "/components/Landingpage/MainScreen";
import Loader from "/components/UI/Loader";
import { useGlobalAuthContext } from "/context/AuthContext";

export default function Home() {
  const { isLoading } = useGlobalAuthContext();
  return isLoading ? (
    <Loader />
  ) : (
    <div className="flex items-center justify-center w-full ">
      <div className="w-full max-w-[1400px] flex items-center justify-between px-8 pt-20">
        <div className="tablet:w-[700px] w-full rounded-full absolute top-0 left-0 h-[700px] bg-white/5 blur-3xl "></div>
        <MainScreen />
      </div>
    </div>
  );
}
