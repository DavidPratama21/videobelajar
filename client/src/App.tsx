import { RouterProvider } from "react-router"
import { ToastContainer } from "react-toastify"
import { router } from "./routes/routes"
import './App.css'

function App() {

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default App
