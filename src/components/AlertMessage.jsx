import { useState, useEffect } from 'react'
import { AlertCircle, X } from 'lucide-react'

export const AlertMessage = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onClose()
    }, 5000)

    return () => clearTimeout(timer)
  }, [onClose])

  if (!isVisible) return null

  return (
    <div className="w-full animate-fade-in mt-3">
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md flex items-start">
        <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
        <div className="flex-grow">
          <p className="font-bold">Error</p>
          <p>{message}</p>
        </div>
        <button
          onClick={() => {
            setIsVisible(false)
            onClose()
          }}
          className="ml-2 text-red-700 hover:text-red-900 transition-colors duration-200"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}