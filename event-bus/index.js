const express = require("express")
const axios = require("axios")

const app = express()
app.use(express.json())


const events = []



app.post("/events", (req, res) => {
  const event = req.body

  events.push(event)

  axios.post("http://posts-clusterip-srv:4000/events", event)
  // axios.post("http://localhost:5000/events", event)
  // axios.post("http://localhost:8000/events", event)
  // axios.post("http://localhost:8001/events", event)
    
  res.send({ status: "Ok" })
})

//create a storage for events so new or existing services can have access to past,
//present and future events
app.get('/events', (req, res ) => {
  res.send(events)
})

app.listen(7000, () => console.log("Listening on 7000"))
