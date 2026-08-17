const API_BASE = 'http://localhost:8000/api'

function setToken(token, username){
  localStorage.setItem('token', token)
  localStorage.setItem('username', username)
}

function getToken(){
  return localStorage.getItem('token')
}

document.getElementById('btnLogin').addEventListener('click', async ()=>{
  const u=document.getElementById('username').value
  const p=document.getElementById('password').value
  const res = await fetch('http://localhost:8000/api/login/',{
    method:'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({username:u,password:p})
  })
  if(!res.ok){ alert('login failed'); return }
  const data = await res.json()
  setToken(data.token, u)
  showApp(u)
  loadExpenses()
})

document.getElementById('logout').addEventListener('click', ()=>{
  localStorage.removeItem('token')
  localStorage.removeItem('username')
  document.getElementById('app').style.display='none'
  document.getElementById('login').style.display='block'
})

document.getElementById('add').addEventListener('click', async ()=>{
  const amount = document.getElementById('amount').value
  const description = document.getElementById('description').value
  const category = document.getElementById('category').value
  const token = getToken()
  const res = await fetch(API_BASE + '/expenses/',{
    method:'POST',
    headers:{'Content-Type':'application/json','Authorization':'Token '+token},
    body: JSON.stringify({amount,description,category})
  })
  if(!res.ok){ alert('create failed'); return }
  document.getElementById('amount').value=''
  document.getElementById('description').value=''
  document.getElementById('category').value=''
  loadExpenses()
})

document.getElementById('btnSearch').addEventListener('click', ()=>{
  loadExpenses()
})

document.querySelectorAll('.cat').forEach(b=>b.addEventListener('click', (e)=>{
  const cat = e.target.dataset.cat
  document.querySelectorAll('.cat').forEach(x=>x.disabled=false)
  e.target.disabled=true
  loadExpenses()
}))

function showApp(username){
  document.getElementById('login').style.display='none'
  document.getElementById('app').style.display='block'
  document.getElementById('who').textContent = username
}

async function loadExpenses(){
  const token = getToken()
  if(!token) return
  const q = new URLSearchParams()
  const search = document.getElementById('search').value
  if(search) q.set('search', search)
  const activeCat = Array.from(document.querySelectorAll('.cat')).find(b=>b.disabled)
  if(activeCat && activeCat.dataset.cat) q.set('category', activeCat.dataset.cat)
  const url = API_BASE + '/expenses/?' + q.toString()
  const res = await fetch(url, { headers: { 'Authorization': 'Token '+token } })
  if(!res.ok){ alert('fetch failed'); return }
  const data = await res.json()
  const ul = document.getElementById('list')
  ul.innerHTML = ''
  data.results.forEach(e=>{
    const li = document.createElement('li')
    li.textContent = `${e.created_at} — ${e.category} — $${e.amount} — ${e.description}`
    ul.appendChild(li)
  })
}

// auto-login if token exists
if(getToken()){
  showApp(localStorage.getItem('username'))
  loadExpenses()
}
