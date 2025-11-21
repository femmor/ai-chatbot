import { useEffect, useState } from "react"

const App = () => {
  const [message, setMessage] = useState("")


  useEffect(() => {
    fetch("/api/status")
      .then((res) => res.json())
      .then((data) => setMessage(data.status))
  }, [])

  return (
    <div>{message}</div>
  )
}
export default App