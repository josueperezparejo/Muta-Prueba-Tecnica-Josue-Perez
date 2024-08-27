import { Route, Routes } from "react-router-dom"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<p className='font-bold text-2xl'>Home Page</p>} />

        <Route path="/pokemon" element={<p className='font-bold text-2xl'>Pokemon Page!</p>} />

        <Route path="/*" element={<p className='font-bold text-2xl'>Home Page Default</p>} />
      </Routes>
    </>
  )
}

export default App
