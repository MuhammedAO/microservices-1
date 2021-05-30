import React,{useState, useEffect} from "react"
import axios from 'axios'

const CommentList = ({comments}) => {
  // const [comments, setComments] = useState([])

  // const fetchComments = async () => {
  //   const res = await axios.get(`http://localhost:5000/posts/${postId}/comments`)

  //   setComments(res.data)

  // }

  // useEffect(() => {
  //   fetchComments()
  // }, [])

  const renderedComments = comments.map(comment => {
    return (
      <li key={comment.id}>{comment.content}</li>
    )
  })

  return (
  <ul>
  {renderedComments}
  </ul>
  )
}

export default CommentList
