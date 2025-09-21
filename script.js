document.addEventListener('DOMContentLoaded', ()=>{
  const navBtns = document.querySelectorAll('.nav-btn')
  const sections = document.querySelectorAll('.section')
  const goApp = document.getElementById('go-app')

  function showSection(id){
    sections.forEach(s=> s.id===id ? s.classList.remove('hidden') : s.classList.add('hidden'))
    navBtns.forEach(b=> b.dataset.section===id ? b.classList.add('active') : b.classList.remove('active'))
  }

  navBtns.forEach(b=> b.addEventListener('click', ()=> showSection(b.dataset.section)))
  goApp && goApp.addEventListener('click', ()=> showSection('app'))

  // simple client list
  const form = document.getElementById('client-form')
  const list = document.getElementById('client-list')

  form && form.addEventListener('submit', e=>{
    e.preventDefault()
    const name = document.getElementById('name').value.trim()
    const email = document.getElementById('email').value.trim()
    if(!name || !email) return alert('Llena los campos')
    const li = document.createElement('li')
    li.innerHTML = `<span>${name} — ${email}</span><button class="primary" style="padding:6px">Eliminar</button>`
    li.querySelector('button').addEventListener('click', ()=> li.remove())
    list.prepend(li)
    form.reset()
  })
})
