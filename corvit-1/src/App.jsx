import { useEffect, useState } from 'react'
import './App.css'
import AppRoutes from "./routes/AppRoutes"
import { Crisp } from 'crisp-sdk-web';

function App() {
  useEffect(() => {
    window.$crisp = [];
    window.CRISP_READY_TRIGGER = function() {
      $crisp.push(["set", "text:custom", ["bottom", "30"]]);
      $crisp.push(["set", "text:custom", ["right", "30"]]);
    };
    Crisp.configure("147efdd2-8915-4727-8210-6806adff57a3"); 
  }, []);


return <AppRoutes/>
  
}

export default App