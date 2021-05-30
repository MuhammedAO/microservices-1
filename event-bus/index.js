const express = require("express")
const axios = require("axios")

const app = express()
app.use(express.json())

app.post("/events", (req, res) => {
  const event = req.body

  axios.post("http://localhost:4000/events", event)
  axios.post("http://localhost:5000/events", event)
  axios.post("http://localhost:8000/events", event)
  axios.post("http://localhost:8001/events", event)
    
  res.send({ status: "Ok" })
})

app.listen(7000, () => console.log("Listening on 7000"))
