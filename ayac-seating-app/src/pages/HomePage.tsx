import { useState } from "react"
import { MdOutlineHelpOutline } from "react-icons/md";
import VerificationForm from "../components/VerificationForm";


const HomePage = () => {

  const [ help, setHelp ] = useState(false)

  const toggleHelp = () => {
    setHelp(!help)
  }


  return (
    <div className="relative min-h-screen flex flex-col pt-24 px-4">

      {help && (
        <div className="absolute top-4 left-2 w-[300px] bg-gray-800/40 border border-gray-400 backdrop-filter backdrop-blur-sm text-white p-4 rounded-lg shadow-lg z-1000">
          <h2 className="text-sm font-semibold mb-2">Help</h2>
          <p className="mb-2 text-xs">To verify if a participant is registered, enter the participant's fullname or firstname.</p>
        </div>
      )}

      <img src="/BTL1-removebg-preview.png" alt="AYAC 2025 Logo" className="absolute w-120 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-15" />

      <div className="relative w-full flex flex-col bg-gray-800/10 p-3 border-gray-600 backdrop-filter backdrop-blur-sm border border-gray-600 rounded-3xl rounded-bl-none z-10 mb-8">
        <span className="absolute top-4 right-4">
          <button onClick={toggleHelp} className="text-gray-400 text-xl hover:text-white">
            <MdOutlineHelpOutline />
          </button>
        </span>
        <h1 className="text-4xl font-bold mb-4">AYAC 2025</h1>
        <p className="text-lg">Verify registered youths by entering their fullname or firstname.</p>
      </div>

      <VerificationForm />

    </div>
  )
}

export default HomePage