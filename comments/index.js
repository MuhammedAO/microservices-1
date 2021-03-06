const express = require("express")
const cors = require("cors")
const { randomBytes } = require("crypto")
const axios = require("axios")

const app = express()

app.use(express.json())
app.use(cors())

const commentByPostId = {}

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentByPostId[req.params.id] || [])
})

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex")

  const { content } = req.body

  const comments = commentByPostId[req.params.id] || []

  comments.push({
    id: commentId,
    content,
    status: "pending",
  })

  commentByPostId[req.params.id] = comments

  await axios.post("http://event-bus-srv:7000/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId: req.params.id,
      status: "pending",
    },
  })

  res.status(201).send(comments)
})

app.post("/events", async (req, res) => {
  console.log("Recieved Event:", req.body.type)

  const { type, data } = req.body

  if (type === "CommentModerated") {
    const { id, postId, status, content } = data

    const comments = commentByPostId[postId]

    const comment = comments.find((comment) => {
      return (comment.id = id)
    })

    comment.status = status

    await axios.post("http://event-bus-srv:7000/events", {
      type: "CommentUpdated",
      data: {
        id,
        postId,
        status,
        content,
      },
    })
  }

  res.send({})
})

app.listen(5000, () => {
  console.log("Listening on 5000")
})
