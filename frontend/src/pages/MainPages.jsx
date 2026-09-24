import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { announcementData, dashboardStats, galleryItems, leaders, ministries, pastEvents, resources, stats, testimonials, upcomingEvents, worshipVerse } from '../data/siteData'
import { api } from '../services/api'

function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <div className="section-head">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {subtitle ? <p>{subtitle}</p> : null}
    </div>
  )
}

export function HomePage() {
  return (
    <>
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">A place to belong • A place to grow</span>
            <h1>Growing in Christ. Building Community. Impacting Campus.</h1>
            <p>
              We are a vibrant Christian campus fellowship helping students know Christ,
              find belonging and live with purpose throughout university life.
            </p>
            <div className="hero-actions">
              <Link to="/join" className="primary-btn">Join Fellowship</Link>
              <Link to="/events" className="secondary-btn">Upcoming Events</Link>
            </div>
          </div>

          <div className="hero-visual">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
              alt="Students in fellowship gathering"
            />
          </div>
        </div>
      </section>

      <section className="welcome-section">
        <div className="container narrow">
          <SectionHeader
            eyebrow="Welcome"
            title="A caring community for students who want to grow in faith"
            subtitle="Our fellowship is a space where students can worship, study the Bible, pray together and build lasting friendships rooted in Christ."
          />
        </div>
      </section>

      <section className="next-meeting-section">
        <div className="container next-meeting-card">
          <div>
            <span className="eyebrow">Next Fellowship Meeting</span>
            <h3>Sunday Worship & Bible Study</h3>
          </div>

          <div className="meeting-grid">
            <div>
              <strong>Date</strong>
              <span>Sunday, 8th October</span>
            </div>
            <div>
              <strong>Time</strong>
              <span>9:00 AM</span>
            </div>
            <div>
              <strong>Venue</strong>
              <span>Main Student Center</span>
            </div>
            <div>
              <strong>Meeting Type</strong>
              <span>Worship, Prayer & Teaching</span>
            </div>
          </div>

          <Link to="/events" className="secondary-btn">View Events</Link>
        </div>
      </section>

      <section className="section-block">
        <div className="container">
          <SectionHeader eyebrow="Upcoming Events" title="Be part of what God is doing this semester" />
          <div className="card-grid events-grid">
            {upcomingEvents.map((event) => (
              <article key={event.id} className="event-card">
                <img src={event.image} alt={event.title} />
                <div className="event-card-body">
                  <h3>{event.title}</h3>
                  <ul className="meta-list">
                    <li>{event.date}</li>
                    <li>{event.time}</li>
                    <li>{event.venue}</li>
                  </ul>
                  <p>{event.description}</p>
                  <Link to={`/events/${event.id}`} className="secondary-btn">View Details</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block alt-bg">
        <div className="container about-split">
          <div>
            <SectionHeader eyebrow="About Fellowship" title="Helping students grow spiritually and live purposefully." />
            <p>
              We believe every student should have a place to belong, a community to grow in and a faith that shapes their life on campus and beyond.
            </p>
            <Link to="/about" className="primary-btn">Learn More</Link>
          </div>

          <div className="stats-grid">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-card">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="container">
          <SectionHeader eyebrow="Ministries" title="Find your place to serve and grow" />
          <div className="card-grid ministries-grid">
            {ministries.slice(0, 6).map((ministry) => (
              <article key={ministry.name} className="ministry-card">
                <div className="ministry-icon">{ministry.icon}</div>
                <h3>{ministry.name}</h3>
                <p>{ministry.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block verse-block">
        <div className="container verse-panel">
          <span className="eyebrow">Weekly Encouragement</span>
          <blockquote>{worshipVerse.text}</blockquote>
          <small>{worshipVerse.reference}</small>
        </div>
      </section>

      <section className="section-block">
        <div className="container">
          <SectionHeader eyebrow="Testimonies" title="Stories of grace and belonging" />
          <div className="card-grid testimonial-grid">
            {testimonials.map((item) => (
              <article key={item.name} className="testimonial-card">
                <p>“{item.text}”</p>
                <strong>{item.name}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container cta-panel">
          <div>
            <span className="eyebrow">Find your place</span>
            <h2>Find a place to belong, grow in faith and serve others.</h2>
          </div>
          <Link to="/join" className="primary-btn">Join Fellowship</Link>
        </div>
      </section>
    </>
  )
}

export function AboutPage() {
  const values = [
    'Faith in Jesus Christ as Lord and Savior',
    'Biblical teaching and prayerful dependence on God',
    'Love, unity and authentic community',
    'Service, discipleship and campus influence',
    'Integrity, excellence and compassion',
  ]

  return (
    <div className="page-content container">
      <SectionHeader eyebrow="About Us" title="Who we are" subtitle="We are a Christian student fellowship committed to helping university students grow in faith and live for Christ on campus." />

      <div className="content-grid two-columns">
        <div>
          <h3>Our History</h3>
          <p>
            Campus Fellowship began as a small group of students seeking biblical community and spiritual maturity.
            Over the years, it has grown into a welcoming fellowship where students from different faculties come together
            to worship, learn and serve.
          </p>
        </div>
        <div>
          <h3>Our Vision</h3>
          <p>
            To raise spiritually mature, discipled and mission-minded students who influence their campuses and communities for Christ.
          </p>
        </div>
      </div>

      <div className="content-grid two-columns">
        <div>
          <h3>Our Mission</h3>
          <p>
            To nurture students in the knowledge of Christ, strengthen their faith and equip them to serve God with wisdom, courage and compassion.
          </p>
        </div>
        <div>
          <h3>Our Objectives</h3>
          <p>
            To disciple members, host spiritual meetings, support outreach efforts, encourage student welfare and create an environment of belonging.
          </p>
        </div>
      </div>

      <div className="value-block">
        <h3>Our Core Values</h3>
        <ul className="check-list">
          {values.map((value) => (
            <li key={value}>{value}</li>
          ))}
        </ul>
      </div>

      <div className="value-block">
        <h3>What We Believe</h3>
        <p>
          We believe in the Bible as the inspired Word of God, the Trinity, salvation through Jesus Christ, the power of prayer,
          the sanctifying work of the Holy Spirit and the hope of Christ’s return. We believe every believer is called to love God,
          live in holiness and be a witness to the world.
        </p>
      </div>

      <div className="president-message">
        <div className="image-wrap">
          <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80" alt="Fellowship president" />
        </div>
        <div>
          <span className="eyebrow">Message from the President</span>
          <h3>Welcome to the fellowship</h3>
          <p>
            The Christian Campus Fellowship is more than a meeting place—it is a family for students who want to live with conviction,
            wisdom and purpose. We invite every student to come and discover a community where faith grows and lives are transformed.
          </p>
        </div>
      </div>
    </div>
  )
}

export function LeadershipPage() {
  return (
    <div className="page-content container">
      <SectionHeader eyebrow="Leadership" title="Meet our fellowship executives" subtitle="Our leaders serve with humility, vision and a strong commitment to discipleship, prayer and student welfare." />

      <div className="card-grid leadership-grid">
        {leaders.map((leader) => (
          <article key={leader.position} className="leader-card">
            <img src={leader.image} alt={leader.name} />
            <div className="leader-body">
              <h3>{leader.name}</h3>
              <span>{leader.position}</span>
              <p>{leader.bio}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export function MinistriesPage() {
  return (
    <div className="page-content container">
      <SectionHeader eyebrow="Ministries" title="Our ministries and departments" subtitle="Each ministry is designed to help students grow in faith, serve with purpose and contribute to campus life." />

      <div className="card-grid ministry-page-grid">
        {ministries.map((ministry) => (
          <article key={ministry.name} className="ministry-detail-card">
            <div className="ministry-icon">{ministry.icon}</div>
            <h3>{ministry.name}</h3>
            <p>{ministry.description}</p>
            <div className="mini-meta">
              <strong>Coordinator:</strong> {ministry.coordinator}
            </div>
            <div className="mini-meta">
              <strong>Meeting:</strong> {ministry.meetingInfo}
            </div>
            <Link to="/contact" className="text-link">Learn More</Link>
          </article>
        ))}
      </div>
    </div>
  )
}

export function EventsPage() {
  return (
    <div className="page-content container">
      <SectionHeader eyebrow="Events" title="Upcoming and past events" subtitle="Join us for worship, fellowship, service and spiritual growth opportunities throughout the semester." />

      <div className="event-listing">
        <div>
          <h3>Upcoming events</h3>
          <div className="stacked-events">
            {upcomingEvents.map((event) => (
              <article key={event.id} className="event-detail-card">
                <img src={event.image} alt={event.title} />
                <div>
                  <h4>{event.title}</h4>
                  <ul className="meta-list compact">
                    <li>{event.date}</li>
                    <li>{event.time}</li>
                    <li>{event.venue}</li>
                  </ul>
                  <p><strong>Speaker:</strong> {event.speaker}</p>
                  <p><strong>Theme:</strong> {event.theme}</p>
                  <p>{event.description}</p>
                  <Link to={`/events/${event.id}`} className="primary-btn">Register</Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div>
          <h3>Past events</h3>
          <div className="stacked-events">
            {pastEvents.map((event) => (
              <article key={event.title} className="event-detail-card muted-card">
                <img src={event.image} alt={event.title} />
                <div>
                  <h4>{event.title}</h4>
                  <ul className="meta-list compact">
                    <li>{event.date}</li>
                    <li>{event.venue}</li>
                  </ul>
                  <p><strong>Speaker:</strong> {event.speaker}</p>
                  <p><strong>Theme:</strong> {event.theme}</p>
                  <p>{event.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function EventDetailsPage() {
  const { id } = useParams()
  const event = [...upcomingEvents, ...pastEvents].find((item) => item.id === id || item.title === id)

  if (!event) {
    return (
      <div className="page-content container center-content">
        <h2>Event not found</h2>
        <Link to="/events" className="primary-btn">Back to events</Link>
      </div>
    )
  }

  return (
    <div className="page-content container detail-page">
      <div className="detail-header">
        <img src={event.image} alt={event.title} />
        <div>
          <span className="eyebrow">Event Details</span>
          <h2>{event.title}</h2>
          <ul className="meta-list">
            <li>{event.date}</li>
            <li>{event.time}</li>
            <li>{event.venue}</li>
          </ul>
          <p><strong>Speaker:</strong> {event.speaker}</p>
          <p><strong>Theme:</strong> {event.theme}</p>
          <p>{event.description}</p>
          <button type="button" className="primary-btn">Register Now</button>
        </div>
      </div>
    </div>
  )
}

export function JoinPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    department: '',
    faculty: '',
    level: '',
    gender: '',
    whatsappNumber: '',
    howHeard: '',
  })
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  function validateForm() {
    const nextErrors = {}
    if (!formData.fullName.trim()) nextErrors.fullName = 'Full name is required.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) nextErrors.email = 'Please enter a valid email.'
    if (!formData.phoneNumber.trim()) nextErrors.phoneNumber = 'Phone number is required.'
    if (!formData.department.trim()) nextErrors.department = 'Department is required.'
    if (!formData.faculty.trim()) nextErrors.faculty = 'Faculty is required.'
    if (!formData.level.trim()) nextErrors.level = 'Level is required.'
    if (!formData.whatsappNumber.trim()) nextErrors.whatsappNumber = 'WhatsApp number is required.'

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (!validateForm()) return

    try {
      await api.submitMember(formData)
      setSuccessMessage('Registration submitted successfully. We will contact you soon!')
      setFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
        department: '',
        faculty: '',
        level: '',
        gender: '',
        whatsappNumber: '',
        howHeard: '',
      })
      setErrors({})
    } catch (error) {
      setSuccessMessage(error.message)
    }
  }

  return (
    <div className="page-content container form-page">
      <SectionHeader eyebrow="Join Fellowship" title="Become part of our campus community" subtitle="We are excited to welcome you into a fellowship of faith, prayer, relationships and purpose." />
      <form className="form-card" onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          <label>
            <span>Full Name</span>
            <input name="fullName" value={formData.fullName} onChange={handleChange} />
            {errors.fullName ? <small>{errors.fullName}</small> : null}
          </label>
          <label>
            <span>Email</span>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
            {errors.email ? <small>{errors.email}</small> : null}
          </label>
          <label>
            <span>Phone Number</span>
            <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
            {errors.phoneNumber ? <small>{errors.phoneNumber}</small> : null}
          </label>
          <label>
            <span>WhatsApp Number</span>
            <input name="whatsappNumber" value={formData.whatsappNumber} onChange={handleChange} />
            {errors.whatsappNumber ? <small>{errors.whatsappNumber}</small> : null}
          </label>
          <label>
            <span>Department</span>
            <input name="department" value={formData.department} onChange={handleChange} />
            {errors.department ? <small>{errors.department}</small> : null}
          </label>
          <label>
            <span>Faculty</span>
            <input name="faculty" value={formData.faculty} onChange={handleChange} />
            {errors.faculty ? <small>{errors.faculty}</small> : null}
          </label>
          <label>
            <span>Level</span>
            <input name="level" value={formData.level} onChange={handleChange} />
            {errors.level ? <small>{errors.level}</small> : null}
          </label>
          <label>
            <span>Gender</span>
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </label>
          <label className="full-width">
            <span>How did you hear about us?</span>
            <input name="howHeard" value={formData.howHeard} onChange={handleChange} placeholder="Friend, social media, campus event, etc." />
          </label>
        </div>

        {successMessage ? <div className="success-banner">{successMessage}</div> : null}
        <button type="submit" className="primary-btn form-btn">Submit</button>
      </form>
    </div>
  )
}

export function PrayerPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    request: '',
    category: 'General Prayer',
  })
  const [successMessage, setSuccessMessage] = useState('')

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      await api.submitPrayer(formData)
      setSuccessMessage('Your request has been submitted. Your request will be treated with care and confidentiality.')
      setFormData({ name: '', email: '', phone: '', request: '', category: 'General Prayer' })
    } catch (error) {
      setSuccessMessage(error.message)
    }
  }

  return (
    <div className="page-content container form-page">
      <SectionHeader eyebrow="Prayer Request" title="Bring your requests before God" subtitle="We stand with you in prayer and will handle every request with care and confidentiality." />
      <form className="form-card" onSubmit={handleSubmit}>
        <div className="form-grid">
          <label>
            <span>Name (Optional)</span>
            <input name="name" value={formData.name} onChange={handleChange} />
          </label>
          <label>
            <span>Email / Phone (Optional)</span>
            <input name="email" value={formData.email} onChange={handleChange} placeholder="Email or phone number" />
          </label>
          <label className="full-width">
            <span>Request Category</span>
            <select name="category" value={formData.category} onChange={handleChange}>
              <option>General Prayer</option>
              <option>Healing</option>
              <option>Guidance</option>
              <option>Family</option>
              <option>Academic</option>
              <option>Spiritual Growth</option>
            </select>
          </label>
          <label className="full-width">
            <span>Prayer Request</span>
            <textarea name="request" rows="6" value={formData.request} onChange={handleChange} required />
          </label>
        </div>

        {successMessage ? <div className="success-banner">{successMessage}</div> : null}
        <p className="small-note">Your request will be treated with care and confidentiality.</p>
        <button type="submit" className="primary-btn form-btn">Submit Request</button>
      </form>
    </div>
  )
}

export function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredResources = resources.filter((resource) =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="page-content container">
      <SectionHeader eyebrow="Resources" title="Christian resources for your spiritual growth" subtitle="Explore sermons, study materials, devotionals and downloadable resources to help you grow in your faith." />

      <div className="resource-toolbar">
        <input
          type="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search resources..."
          aria-label="Search resources"
        />
      </div>

      <div className="card-grid resource-grid">
        {filteredResources.map((item) => (
          <article key={item.title} className="resource-card">
            <span className="resource-tag">{item.type}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <button type="button" className="secondary-btn">Open</button>
          </article>
        ))}
      </div>
    </div>
  )
}

export function MediaPage() {
  return (
    <div className="page-content container">
      <SectionHeader eyebrow="Media" title="Photos and videos from fellowship life" subtitle="A glimpse into worship, outreach, retreats, testimonies and moments of faith on campus." />

      <div className="gallery-grid">
        {galleryItems.map((item, index) => (
          <figure key={`${item.title}-${index}`} className="gallery-item">
            <img src={item.image} alt={item.title} />
            <figcaption>{item.title}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}

export function TestimoniesPage() {
  const [formData, setFormData] = useState({ name: '', email: '', testimony: '' })
  const [successMessage, setSuccessMessage] = useState('')

  function handleChange(event) {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    try {
      await api.submitTestimony(formData)
      setSuccessMessage('Thank you for sharing your testimony. It is awaiting admin review before it appears publicly.')
      setFormData({ name: '', email: '', testimony: '' })
    } catch (error) {
      setSuccessMessage(error.message)
    }
  }

  return (
    <div className="page-content container form-page">
      <SectionHeader eyebrow="Testimonies" title="Share what God has done" subtitle="We would love to hear how God has been at work in your life. Testimonies are reviewed before public approval." />

      <div className="form-layout">
        <form className="form-card" onSubmit={handleSubmit}>
          <div className="form-grid">
            <label>
              <span>Name</span>
              <input name="name" value={formData.name} onChange={handleChange} required />
            </label>
            <label>
              <span>Email (Optional)</span>
              <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </label>
            <label className="full-width">
              <span>Testimony</span>
              <textarea rows="6" name="testimony" value={formData.testimony} onChange={handleChange} required />
            </label>
          </div>
          {successMessage ? <div className="success-banner">{successMessage}</div> : null}
          <button type="submit" className="primary-btn form-btn">Submit Testimony</button>
        </form>

        <div className="testimony-list">
          {testimonials.map((item) => (
            <div key={item.name} className="testimonial-card compact">
              <p>“{item.text}”</p>
              <strong>{item.name}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function NewsPage() {
  return (
    <div className="page-content container">
      <SectionHeader eyebrow="News & Announcements" title="Updates from the fellowship" subtitle="Stay informed about meetings, outreach, student notices and church events from the fellowship community." />

      <div className="announcement-list">
        {announcementData.map((item) => (
          <article key={item.title} className="announcement-card">
            <span className="announcement-tag">{item.category}</span>
            <h3>{item.title}</h3>
            <small>{item.date}</small>
            <p>{item.summary}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

export function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [successMessage, setSuccessMessage] = useState('')

  function handleChange(event) {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    try {
      await api.submitContact(formData)
      setSuccessMessage('Your message has been sent successfully. We will get back to you soon.')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      setSuccessMessage(error.message)
    }
  }

  return (
    <div className="page-content container form-page">
      <SectionHeader eyebrow="Contact" title="We would love to hear from you" subtitle="Reach out for questions, prayer support or partnership opportunities." />

      <div className="contact-layout">
        <div className="contact-card">
          <h3>Fellowship Contact</h3>
          <ul className="contact-list">
            <li>Address: University Campus, Main Student Center</li>
            <li>Phone: +233 24 000 0000</li>
            <li>Email: hello@campusfellowship.org</li>
            <li>WhatsApp: +233 54 000 0000</li>
            <li>Meeting Days: Sundays & Wednesdays</li>
          </ul>

          <div className="map-box">Map / Location Section</div>
        </div>

        <form className="form-card" onSubmit={handleSubmit}>
          <div className="form-grid">
            <label>
              <span>Name</span>
              <input name="name" value={formData.name} onChange={handleChange} required />
            </label>
            <label>
              <span>Email</span>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </label>
            <label className="full-width">
              <span>Message</span>
              <textarea rows="6" name="message" value={formData.message} onChange={handleChange} required />
            </label>
          </div>
          {successMessage ? <div className="success-banner">{successMessage}</div> : null}
          <button type="submit" className="primary-btn form-btn">Send Message</button>
        </form>
      </div>
    </div>
  )
}

export function AdminLoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      const data = await api.loginAdmin(form)
      localStorage.setItem('ccf-admin-token', data.token || 'demo-admin-token')
      navigate('/admin/dashboard')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="page-content container form-page">
      <SectionHeader eyebrow="Admin Login" title="Secure access" subtitle="Restricted to fellowship administrators and coordinators." />
      <form className="form-card admin-login" onSubmit={handleSubmit}>
        <label>
          <span>Admin Email</span>
          <input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required />
        </label>
        <label>
          <span>Password</span>
          <input type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required />
        </label>
        {error ? <div className="error-banner">{error}</div> : null}
        <button type="submit" className="primary-btn form-btn">Login</button>
      </form>
    </div>
  )
}

export function AdminDashboardPage() {
  const navigate = useNavigate()
  const [dashboard, setDashboard] = useState({
    stats: dashboardStats,
    members: [],
    events: [],
    announcements: [],
    prayerRequests: [],
    testimonials: [],
  })
  const [activeTab, setActiveTab] = useState('overview')
  const [error, setError] = useState('')
  const [memberForm, setMemberForm] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    department: '',
    faculty: '',
    level: '',
    gender: '',
    whatsappNumber: '',
    howHeard: '',
  })
  const [eventForm, setEventForm] = useState({
    title: '',
    date: '',
    time: '',
    venue: '',
    speaker: '',
    theme: '',
    description: '',
    imageUrl: '',
  })
  const [announcementForm, setAnnouncementForm] = useState({
    title: '',
    category: 'Meeting',
    summary: '',
    published: false,
  })

  async function loadDashboard() {
    try {
      const response = await api.getDashboard()
      setDashboard(response)
    } catch (err) {
      setError(err.message)
    }
  }

  function handleLogout() {
    localStorage.removeItem('ccf-admin-token')
    navigate('/admin/login')
  }

  useEffect(() => {
    loadDashboard()
  }, [])

  async function handleMemberSubmit(event) {
    event.preventDefault()
    try {
      await api.addMember(memberForm)
      setMemberForm({
        fullName: '',
        email: '',
        phoneNumber: '',
        department: '',
        faculty: '',
        level: '',
        gender: '',
        whatsappNumber: '',
        howHeard: '',
      })
      await loadDashboard()
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleEventSubmit(event) {
    event.preventDefault()
    try {
      await api.addEvent(eventForm)
      setEventForm({
        title: '',
        date: '',
        time: '',
        venue: '',
        speaker: '',
        theme: '',
        description: '',
        imageUrl: '',
      })
      await loadDashboard()
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleAnnouncementSubmit(event) {
    event.preventDefault()
    try {
      await api.addAnnouncement(announcementForm)
      setAnnouncementForm({ title: '', category: 'Meeting', summary: '', published: false })
      await loadDashboard()
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleDeleteMember(id) {
    try {
      await api.deleteMember(id)
      await loadDashboard()
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleDeleteEvent(id) {
    try {
      await api.deleteEvent(id)
      await loadDashboard()
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleDeleteAnnouncement(id) {
    try {
      await api.deleteAnnouncement(id)
      await loadDashboard()
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleTogglePrayer(id) {
    try {
      await api.togglePrayerRequest(id)
      await loadDashboard()
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleToggleTestimony(id, status) {
    try {
      await api.updateTestimonyStatus(id, status)
      await loadDashboard()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="page-content container admin-dashboard">
      <div className="dashboard-heading-row">
        <SectionHeader eyebrow="Admin Dashboard" title="Leadership & operations center" subtitle="Manage members, events, announcements, prayer requests and testimonies from one place." />
        <button type="button" className="secondary-btn" onClick={handleLogout}>Logout</button>
      </div>
      {error ? <div className="error-banner">{error}</div> : null}

      <div className="stats-grid dashboard-grid">
        {(dashboard.stats || []).map((item) => (
          <div key={item.label} className="stat-card dashboard-card">
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      <div className="admin-tab-bar">
        {['overview', 'members', 'events', 'announcements', 'prayer', 'testimonies'].map((tab) => (
          <button
            key={tab}
            type="button"
            className={activeTab === tab ? 'tab-button active' : 'tab-button'}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="admin-panels">
          <div className="admin-panel">
            <h3>Member Management</h3>
            <ul>
              <li>Add members</li>
              <li>View members ({dashboard.members.length})</li>
              <li>Search members</li>
              <li>Edit members</li>
              <li>Delete members</li>
              <li>Export member data</li>
            </ul>
          </div>
          <div className="admin-panel">
            <h3>Event Management</h3>
            <ul>
              <li>Create events</li>
              <li>Edit events</li>
              <li>Delete events ({dashboard.events.length})</li>
              <li>View registrations</li>
            </ul>
          </div>
          <div className="admin-panel">
            <h3>Announcements</h3>
            <ul>
              <li>Create announcements</li>
              <li>Edit announcements</li>
              <li>Delete announcements</li>
              <li>Publish / unpublish ({dashboard.announcements.filter((item) => item.published).length})</li>
            </ul>
          </div>
          <div className="admin-panel">
            <h3>Prayer Requests</h3>
            <ul>
              <li>View requests ({dashboard.prayerRequests.length})</li>
              <li>Mark as handled</li>
              <li>Delete entries</li>
            </ul>
          </div>
        </div>
      )}

      {activeTab === 'members' && (
        <div className="admin-section-grid">
          <form className="form-card" onSubmit={handleMemberSubmit}>
            <h3>Add Member</h3>
            <div className="form-grid">
              <label><span>Full Name</span><input value={memberForm.fullName} onChange={(event) => setMemberForm({ ...memberForm, fullName: event.target.value })} /></label>
              <label><span>Email</span><input type="email" value={memberForm.email} onChange={(event) => setMemberForm({ ...memberForm, email: event.target.value })} /></label>
              <label><span>Phone Number</span><input value={memberForm.phoneNumber} onChange={(event) => setMemberForm({ ...memberForm, phoneNumber: event.target.value })} /></label>
              <label><span>WhatsApp Number</span><input value={memberForm.whatsappNumber} onChange={(event) => setMemberForm({ ...memberForm, whatsappNumber: event.target.value })} /></label>
              <label><span>Department</span><input value={memberForm.department} onChange={(event) => setMemberForm({ ...memberForm, department: event.target.value })} /></label>
              <label><span>Faculty</span><input value={memberForm.faculty} onChange={(event) => setMemberForm({ ...memberForm, faculty: event.target.value })} /></label>
              <label><span>Level</span><input value={memberForm.level} onChange={(event) => setMemberForm({ ...memberForm, level: event.target.value })} /></label>
              <label><span>Gender</span><select value={memberForm.gender} onChange={(event) => setMemberForm({ ...memberForm, gender: event.target.value })}><option value="">Select</option><option>Female</option><option>Male</option><option>Prefer not to say</option></select></label>
              <label className="full-width"><span>How did you hear about us?</span><input value={memberForm.howHeard} onChange={(event) => setMemberForm({ ...memberForm, howHeard: event.target.value })} /></label>
            </div>
            <button type="submit" className="primary-btn form-btn">Save Member</button>
          </form>

          <div className="admin-list-panel">
            <h3>Members</h3>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Level</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {(dashboard.members || []).map((member) => (
                  <tr key={member.id}>
                    <td>{member.fullName}</td>
                    <td>{member.department}</td>
                    <td>{member.level}</td>
                    <td><button type="button" className="secondary-btn small-btn" onClick={() => handleDeleteMember(member.id)}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'events' && (
        <div className="admin-section-grid">
          <form className="form-card" onSubmit={handleEventSubmit}>
            <h3>Create Event</h3>
            <div className="form-grid">
              <label><span>Title</span><input value={eventForm.title} onChange={(event) => setEventForm({ ...eventForm, title: event.target.value })} /></label>
              <label><span>Date</span><input type="date" value={eventForm.date} onChange={(event) => setEventForm({ ...eventForm, date: event.target.value })} /></label>
              <label><span>Time</span><input value={eventForm.time} onChange={(event) => setEventForm({ ...eventForm, time: event.target.value })} /></label>
              <label><span>Venue</span><input value={eventForm.venue} onChange={(event) => setEventForm({ ...eventForm, venue: event.target.value })} /></label>
              <label><span>Speaker</span><input value={eventForm.speaker} onChange={(event) => setEventForm({ ...eventForm, speaker: event.target.value })} /></label>
              <label><span>Theme</span><input value={eventForm.theme} onChange={(event) => setEventForm({ ...eventForm, theme: event.target.value })} /></label>
              <label className="full-width"><span>Image URL</span><input value={eventForm.imageUrl} onChange={(event) => setEventForm({ ...eventForm, imageUrl: event.target.value })} /></label>
              <label className="full-width"><span>Description</span><textarea rows="4" value={eventForm.description} onChange={(event) => setEventForm({ ...eventForm, description: event.target.value })} /></label>
            </div>
            <button type="submit" className="primary-btn form-btn">Save Event</button>
          </form>

          <div className="admin-list-panel">
            <h3>Upcoming Events</h3>
            <div className="stacked-list">
              {(dashboard.events || []).map((event) => (
                <div key={event.id} className="mini-list-item">
                  <div>
                    <strong>{event.title}</strong>
                    <small>{event.date} • {event.venue}</small>
                  </div>
                  <button type="button" className="secondary-btn small-btn" onClick={() => handleDeleteEvent(event.id)}>Delete</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'announcements' && (
        <div className="admin-section-grid">
          <form className="form-card" onSubmit={handleAnnouncementSubmit}>
            <h3>Create Announcement</h3>
            <div className="form-grid">
              <label><span>Title</span><input value={announcementForm.title} onChange={(event) => setAnnouncementForm({ ...announcementForm, title: event.target.value })} /></label>
              <label><span>Category</span><select value={announcementForm.category} onChange={(event) => setAnnouncementForm({ ...announcementForm, category: event.target.value })}><option>Meeting</option><option>Outreach</option><option>Notice</option><option>Program</option></select></label>
              <label className="full-width"><span>Summary</span><textarea rows="4" value={announcementForm.summary} onChange={(event) => setAnnouncementForm({ ...announcementForm, summary: event.target.value })} /></label>
              <label className="checkbox-row"><input type="checkbox" checked={announcementForm.published} onChange={(event) => setAnnouncementForm({ ...announcementForm, published: event.target.checked })} /> Publish immediately</label>
            </div>
            <button type="submit" className="primary-btn form-btn">Save Announcement</button>
          </form>

          <div className="admin-list-panel">
            <h3>Announcements</h3>
            <div className="stacked-list">
              {(dashboard.announcements || []).map((item) => (
                <div key={item.id} className="mini-list-item">
                  <div>
                    <strong>{item.title}</strong>
                    <small>{item.category} • {item.published ? 'Published' : 'Draft'}</small>
                  </div>
                  <div className="admin-actions">
                    <button type="button" className="secondary-btn small-btn" onClick={() => api.toggleAnnouncement(item.id).then(loadDashboard).catch((err) => setError(err.message))}>{item.published ? 'Unpublish' : 'Publish'}</button>
                    <button type="button" className="secondary-btn small-btn" onClick={() => handleDeleteAnnouncement(item.id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'prayer' && (
        <div className="admin-list-panel wide-panel">
          <h3>Prayer Requests</h3>
          <div className="stacked-list">
            {(dashboard.prayerRequests || []).map((item) => (
              <div key={item.id} className="mini-list-item">
                <div>
                  <strong>{item.name || 'Anonymous'}</strong>
                  <small>{item.category} • {item.handled ? 'Handled' : 'Pending'}</small>
                  <p>{item.request}</p>
                </div>
                <div className="admin-actions">
                  <button type="button" className="secondary-btn small-btn" onClick={() => handleTogglePrayer(item.id)}>{item.handled ? 'Mark Pending' : 'Mark Handled'}</button>
                  <button type="button" className="secondary-btn small-btn" onClick={() => api.deletePrayerRequest(item.id).then(loadDashboard).catch((err) => setError(err.message))}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'testimonies' && (
        <div className="admin-list-panel wide-panel">
          <h3>Testimonies</h3>
          <div className="stacked-list">
            {(dashboard.testimonials || []).map((item) => (
              <div key={item.id} className="mini-list-item">
                <div>
                  <strong>{item.name}</strong>
                  <small>{item.status}</small>
                  <p>{item.testimony}</p>
                </div>
                <div className="admin-actions">
                  <button type="button" className="secondary-btn small-btn" onClick={() => handleToggleTestimony(item.id, item.status === 'approved' ? 'pending' : 'approved')}>{item.status === 'approved' ? 'Set Pending' : 'Approve'}</button>
                  <button type="button" className="secondary-btn small-btn" onClick={() => api.deleteTestimony(item.id).then(loadDashboard).catch((err) => setError(err.message))}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
