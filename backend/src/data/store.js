const seedData = {
  members: [
    {
      id: 1,
      fullName: 'Abena Owusu',
      email: 'abena@campus.edu',
      phoneNumber: '+233 24 111 1111',
      department: 'Computer Science',
      faculty: 'Applied Sciences',
      level: '300',
      gender: 'Female',
      whatsappNumber: '+233 24 111 1111',
      howHeard: 'Campus event',
    },
    {
      id: 2,
      fullName: 'Joseph Mensah',
      email: 'joseph@campus.edu',
      phoneNumber: '+233 20 222 2222',
      department: 'Accounting',
      faculty: 'Business',
      level: '200',
      gender: 'Male',
      whatsappNumber: '+233 20 222 2222',
      howHeard: 'Friend',
    },
  ],
  events: [
    {
      id: 1,
      title: 'Campus Prayer Night',
      date: '2026-10-15',
      time: '19:00',
      venue: 'Main Chapel',
      speaker: 'Rev. Daniel Mensah',
      theme: 'Prayer and Revival',
      description: 'A night of worship, prayer and scriptural encouragement for students.',
      imageUrl: 'https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=900&q=80',
      status: 'upcoming',
    },
    {
      id: 2,
      title: 'Leadership Forum',
      date: '2026-10-29',
      time: '17:30',
      venue: 'Faculty Hall',
      speaker: 'Dr. Elsie Addo',
      theme: 'Purpose, Calling and Influence',
      description: 'A forum on leadership and spiritual responsibility.',
      imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
      status: 'upcoming',
    },
  ],
  announcements: [
    {
      id: 1,
      title: 'Campus Fellowship Meeting',
      category: 'Meeting',
      summary: 'Join us for worship, prayer and a practical Bible study on spiritual growth.',
      published: true,
    },
    {
      id: 2,
      title: 'Outreach Day',
      category: 'Outreach',
      summary: 'A campus-wide outreach and gospel sharing event this weekend.',
      published: false,
    },
  ],
  prayerRequests: [
    {
      id: 1,
      name: 'Mary',
      email: 'mary@campus.edu',
      phone: '+233 55 123 4567',
      request: 'Please pray for wisdom during my final exams and for peace in my family.',
      category: 'Academic',
      handled: false,
    },
    {
      id: 2,
      name: 'Kwadwo',
      email: 'kwadwo@campus.edu',
      phone: '+233 57 998 3321',
      request: 'Pray for healing and strength as I recover from illness.',
      category: 'Healing',
      handled: true,
    },
  ],
  testimonials: [
    {
      id: 1,
      name: 'Akosua B.',
      email: 'akosua@campus.edu',
      testimony: 'I found peace, belonging and purpose in this fellowship. My faith has grown stronger.',
      status: 'approved',
    },
    {
      id: 2,
      name: 'Kofi M.',
      email: 'kofi@campus.edu',
      testimony: 'The prayer and Bible study groups helped me through a very difficult season.',
      status: 'pending',
    },
  ],
}

module.exports = {
  store: seedData,
  nextId: (key) => {
    const maxId = Math.max(0, ...seedData[key].map((item) => item.id || 0))
    return maxId + 1
  },
}
