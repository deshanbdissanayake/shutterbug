import React, { createContext, useState, useContext, useEffect } from 'react'
import { setAsync } from '../assets/store/asyncStorage';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isClient, setIsClient] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  //update async storage
  const updateAsyncStorage = async () => {
    try {
        await setAsync('isClient', isClient);
    } catch (error) {
        console.error('Error at appcontext asyncstorage update:', error);
    }
  };

  useEffect(() => {
    updateAsyncStorage()
  }, [isClient])

  return(
    <AppContext.Provider 
        value={{ isLoggedIn, setIsLoggedIn, isPageLoading, setIsPageLoading, showSplashScreen, setShowSplashScreen, isClient, setIsClient }}
    >
        {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
    return useContext(AppContext);
}