import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  //? states
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isAccessToken, setIsAccessToken] = useState(false);
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showCreateNewModal, setShowCreateNewModal] = useState(false);
  const [showBecomeCreator, setShowBecomeCreator] = useState(false);
  //? header states
  const [cookieload, setcookieload] = useState(false);

  //? functions
  function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  function isPublic(pathname) {
    return pathname === "/" || pathname === "/all" || pathname === "/auth";
  }

  //   function isPrivate(pathname) {
  //     return (
  //       pathname === '/contacts' ||
  //       pathname === '/complete-profile' ||
  //       pathname === '/subscription' ||
  //       pathname === '/profile' ||
  //       pathname === '/api_integration' ||
  //       pathname === '/api_integration/customise_order' ||
  //       pathname === '/dashboard' ||
  //       pathname === '/template' ||
  //       pathname === '/agents' ||
  //       pathname === '/health' ||
  //       pathname === '/support' ||
  //       pathname === '/support/[ticketId]' ||
  //       pathname.split('/')[1] === 'inspect' ||
  //       pathname.split('/')[1] === 'agents' ||
  //       pathname == '/orders' ||
  //       pathname == '/chatbot' ||
  //       pathname == '/failed' ||
  //       pathname == '/form' ||
  //       pathname == '/form/analytics' ||
  //       pathname == '/change_password'
  //     )
  //   }

  //   function isReset(pathname) {
  //     return (
  //       pathname === '/reset_password' ||
  //       pathname === '/new_account' ||
  //       pathname === '/privacy'
  //     )
  //   }

  async function logout() {
    console.log("logout");
    setCookie("access-token", "", 7);
    await setUser(null);
  }

  async function login(x) {
    await setCookie("access-token", x, 7);
    await router.push("/dashboard");
    await setUser(null);
  }

  const verifyToken = async (token) => {
    try {
      var config = {
        headers: {
          Authorization: token,
        },
      };

      setIsLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/verify`,
        "",
        config
      );

      console.log(res.data);
      if (res.data.status === true) {
        setUser(res.data.user);
      } else {
        logout();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const verifyToken = async () => {
      try {
        var config = {
          headers: {
            Authorization: getCookie("access-token"),
          },
        };

        setIsLoading(true);
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/verify`,
          "",
          config
        );

        console.log(res.data);
        if (res.data.status === true) {
          setUser(res.data.user.user);
        } else {
          logout();
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    verifyToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        setIsLoading,
        isAccessToken,
        setIsAccessToken,
        user,
        setUser,
        cookieload,
        setcookieload,
        setCookie,
        getCookie,
        logout,
        login,
        showLoginModal,
        setShowLoginModal,
        verifyToken,
        showProfileDropdown,
        setShowProfileDropdown,
        showCreateNewModal,
        setShowCreateNewModal,
        setShowBecomeCreator,
        showBecomeCreator,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useGlobalAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthContext, AuthProvider };
