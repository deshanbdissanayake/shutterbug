import React, { createContext, useState, useContext } from 'react'

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [showSplashScreen, setShowSplashScreen] = useState(false);
  return(
    <AppContext.Provider 
        value={{ isLoggedIn, setIsLoggedIn, isPageLoading, setIsPageLoading, showSplashScreen, setShowSplashScreen }}
    >
        {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
    return useContext(AppContext);
}