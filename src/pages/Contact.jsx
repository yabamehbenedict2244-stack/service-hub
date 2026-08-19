import { useState } from 'react'
import Button from '../components/Button'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // No backend endpoint specified for contact messages; this simply
    // confirms receipt in the UI. Wire this up to Firestore or an
    // email service if you want messages persisted.
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="container-narrow">
        <h1 className="page-title">Thanks for reaching out!</h1>
        <div className="card">We received your message and will get back to you soon.</div>
      </div>
    )
  }

  return (
    <div className="container-narrow">
      <h1 className="page-title">Contact Us</h1>
      <form className="card" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows={5} required value={form.message} onChange={handleChange} />
        </div>
        <Button type="submit" variant="primary" fullWidth>Send message</Button>
      </form>
    </div>
  )
}
