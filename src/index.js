import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ContactUs from "./components/ContactUs";
import BookingPage from './components/BookingPage';
import { DarkModeProvider } from "./components/DarkModeContext";

const router = createBrowserRouter([
  {
    path: "/",
    element:<App/>
  },
  {
    path: "/contact",
    element: <ContactUs/>
  },
  {
    path:"/book",
    element:<BookingPage />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DarkModeProvider>
      <RouterProvider router={router} />
    </DarkModeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
