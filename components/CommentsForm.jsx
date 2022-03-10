import React, { useEffect, useState, useRef } from 'react'

import { submitComment } from '../services'
const CommentsForm = ({ slug }) => {
  const [error, setError] = useState(false)
  const [localStorage, setLocalStorage] = useState(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const commentEl = useRef()
  const nameEl = useRef()
  const emailEl = useRef()
  const storeDataEl = useRef()

  useEffect(() => {
    nameEl.current.value = window.localStorage.getItem('name')
    emailEl.current.value = window.localStorage.getItem('email')
  }, [])

  const handleCommentSubmission = () => {
    setError(false)

    const { value: comment } = commentEl.current
    const { value: name } = nameEl.current
    const { value: email } = emailEl.current
    const { checked: storeData } = storeDataEl.current

    if (!comment || !name || !email) {
      setError(true)
      return
    }

    const commentObj = { name, email, comment, slug }

    if (storeData) {
      window.localStorage.setItem('name', name)
      window.localStorage.setItem('email', email)
    } else {
      window.localStorage.removeItem('name', name)
      window.localStorage.removeItem('email', email)
    }

    submitComment(commentObj).then((res) => {
      setShowSuccessMessage(true)

      setTimeout(() => {
        setShowSuccessMessage(false)
      }, 3000)
    })
  }
  return (
    <div className="mb-8 rounded-lg bg-white p-8 pb-12 shadow-lg">
      <h3 className="mb-8 text-xl font-semibold">Comments Form</h3>
      <div className="mb-4 grid grid-cols-1 gap-4">
        <textarea
          name="comment"
          id="comment"
          ref={commentEl}
          placeholder="comment"
          className="w-full rounded-lg bg-gray-100 p-4 outline-none focus:ring focus:ring-gray-200"
        />
      </div>
      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <input
          type="text"
          ref={nameEl}
          placeholder="name"
          name="name"
          className="w-full rounded-lg bg-gray-100 py-2 px-4 outline-none focus:ring focus:ring-gray-200"
        />
        <input
          type="text"
          ref={emailEl}
          placeholder="email"
          name="email"
          className="w-full rounded-lg bg-gray-100 py-2 px-4 outline-none focus:ring focus:ring-gray-200"
        />
      </div>
      <div className="mb-4 grid grid-cols-1 gap-4">
        <div>
          <input
            type="checkbox"
            id="storeData"
            ref={storeDataEl}
            name="storeData"
            value="true"
          />
          <label
            htmlFor="storeData"
            className="ml-2 cursor-pointer text-gray-500"
            for="storeData"
          >
            Save my e-mail and name for the next time I comment!
          </label>
        </div>
      </div>
      {error && <p>All fields are requried!</p>}
      <div className="mt-8">
        <button
          type="button"
          onClick={handleCommentSubmission}
          className="trasition ease inline-block cursor-pointer rounded-full bg-pink-600 py-3 px-8 text-lg text-white duration-700 hover:bg-indigo-900"
        >
          Post the Comment
        </button>
        {showSuccessMessage && (
          <span className="float-right mt-3 text-xl font-semibold text-green-500">
            Comment submitted for review
          </span>
        )}
      </div>
    </div>
  )
}

export default CommentsForm
