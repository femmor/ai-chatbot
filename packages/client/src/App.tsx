import { useEffect, useState } from "react"

const App = () => {
  const [message, setMessage] = useState("")


  useEffect(() => {
    fetch("/api/status")
      .then((res) => res.json())
      .then((data) => setMessage(data.status))
  }, [])

  return (
    <div className="text-4xl text-green-500">{message}</div>
  )
}
export default App