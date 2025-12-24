import { supabase } from './supabase.js'

document.addEventListener('DOMContentLoaded', async () => {
  const { data, error } = await supabase
    .from('about_me')
    .select('*')
    .single()

  if (error) {
    console.error('Supabase About Error:', error)
    return
  }

  // Foto
  const photoEl = document.querySelector('.about-photo img')
  photoEl.src = data.photo_url || '/fallback.jpg'

  // Nama
  document.querySelector('.about-text h3').textContent =
    `Hello, I'm ${data.name}`

  // Paragraf
  const paragraphs = document.querySelectorAll('.about-text p')
  paragraphs[0].textContent = data.description1
  paragraphs[1].textContent = data.description2
  paragraphs[2].textContent = data.description3

  // Quote
  document.querySelector('blockquote').textContent =
    `"${data.quote}"`

  // CV
  document.querySelector('.about-buttons .btn').href =
    data.cv_url
})
