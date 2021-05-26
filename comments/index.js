const express = require('express')
const cors = require('cors')
const {
	randomBytes
} = require('crypto')

const app = express()

app.use(express.json())
app.use(cors())

const commentByPostId = {}

app.get('/posts/:id/comments', (req, res) => {
 res.send(commentByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments', (req, res) => {
	const commentId = randomBytes(4).toString('hex')

	const {
		content
	} = req.body

	const comments = commentByPostId[req.params.id] || []

	comments.push({
		id: commentId,
		content
	})

	commentByPostId[req.params.id] = comments

	res.status(201).send(comments)
})

app.listen(5000, () => {
	console.log('Listening on 5000')
})