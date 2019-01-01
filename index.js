let notes = []
//pasting all notes in container rubbing all perivious notes
function paste(){
  let id = -1
  if(localStorage.getItem('notes')){
    notes = JSON.parse(localStorage.getItem('notes'))
  }
  let container = document.querySelector('.container')
  container.innerHTML = ''
  //.map return an array changing original array and jion ia function which joins the array with the argument passed
  let html = notes.map(note => {
    id++
    return `<li class="li" id="${id}">${note.title}<img id="${id}" class="menu-dot" src="menu-dots.svg">`
  }).reverse().join('')
  container.innerHTML = html
  ifnonotes()
}
//create new Note
function createNew(title, body){
  notes.push({title: title, body: body})
  localStorage.setItem('notes', JSON.stringify(notes))
  window.scrollTo(0, 0)
  paste()
}
//deleting note
function deleteNote(i){
  notes.splice(i, 1)
  localStorage.setItem('notes', JSON.stringify(notes))
  paste()
}
function deleteAll(){
  notes = []
  localStorage.setItem('notes', JSON.stringify(notes))
  paste()
}
//Edit Any Note
function editNote(newtitle, newbody, i){
  notes[i].title = newtitle
  notes[i].body = newbody
  localStorage.setItem('notes', JSON.stringify(notes))
  paste()
}
//checking if there are no notes
function ifnonotes(){
  let container = document.querySelector('.container')
  let deleteAl = document.querySelector('.deleteAll')
  if(!localStorage.getItem('notes')){
    let image = new Image()
    image.id = 'zeroState'
    image.src = 'zero-state.svg'
    container.append(image)
    deleteAl.disabled = true
  }else if(JSON.parse(localStorage.getItem('notes')).length == 0){
    let image = new Image()
    image.id = 'zeroState'
    image.src = 'zero-state.svg'
    container.append(image)
    deleteAl.disabled = true
  }else{
    deleteAl.disabled = false
  }
}
//pasting notes when page gets loaded
paste()
history.pushState("home", "home", './')


let deleteAl = document.querySelector('.deleteAll')
let write = document.querySelector('.write')
let tabNew = document.querySelector('.tabcreatenew')
let title = document.querySelector('.title')
let body =  document.querySelector('.body')
let close = document.querySelector('.close')
let create = document.querySelector('.create')
let all = document.querySelector('#all')
let del = document.querySelector('.del')
let menu = document.querySelector('#menu')
let note = document.querySelector('.note')
let closenote = document.querySelector('.closenote')
let notetitle = document.querySelector('.notetitle')
let notebody = document.querySelector('.notebody')
let edit = document.querySelector('.edit')
let submit = document.querySelector('.submit')


deleteAl.onclick = () => deleteAll()
write.onclick = () => {
  //history.pushState(data, page name, route to show)
  history.pushState("create", "create", './')
  tabNew.style.display = 'block'
}
close.onclick = () => {
  history.pushState("home", "home", './')
  tabNew.style.display = 'none'
  title.value = ''
  body.value = ''
}
create.onclick = () => {
  history.pushState("home", "home", './')
  tabNew.style.display = 'none'
  if(body.value.length<1 & title.value.length<1){
    alert("You have not Written anything in Note's body and evnt not entered Title")
  }else if(body.value.length<1){
    alert("You have not Written anything in Note's body")
  }else if(title.value.length<1){
    let t
    if(body.value.length<20){
      t = body.value
    }else{
      t = body.value[0]
      for(let i=1; i<18; i++){
        t+=body.value[i]
      }
    }
    createNew(t, body.value)
    title.value = ''
    body.value = ''
  }else{
    createNew(title.value, body.value)
    title.value = ''
    body.value = ''
  }
}
closenote.onclick = () => {
  history.pushState("home", "home", './')
  note.style.display = 'none'
  submit.style.display = 'none'
  notetitle.contentEditable = false
  notebody.contentEditable = false
}
edit.onclick = () => {
  history.pushState("edit", "edit", './')
  notetitle.contentEditable = true
  notebody.contentEditable = true
  notetitle.click()
  submit.style.display = 'block'
}
submit.onclick = () =>{
  history.pushState("note", "note", './')
  if(notetitle.innerText.length<1 & notebody.innerText.length<1){
    let t = 'Untitled'
    let b = 'No Body'
    notetitle.innerText = t
    notebody.innerText =  b
    editNote(t, b, submit.id)
  }else if(notebody.innerText.length<1){
    let t = notetitle.innerText
    let b = 'No Body'
    notetitle.innerText = t
    notebody.innerText =  b
    editNote(t, b, submit.id)
  }else if(notetitle.innerText.length<1){
    let t = 'Untitled'
    let b = notebody.innerText
    notetitle.innerText = t
    notebody.innerText =  b
    editNote(t, b, submit.id)
  }else{
    editNote(notetitle.innerText, notebody.innerText, submit.id)
  }
  notetitle.contentEditable = false
  notebody.contentEditable = false
  submit.style.display = 'none'
}

window.onclick = e => {
  if(e.srcElement.classList[0] == 'menu-dot'){
    all.style.display = 'block'
    menu.style.display = 'block'
    del.id = e.srcElement.id
  }
  if(e.srcElement.id == 'all'){
    all.style.display = 'none'
    menu.style.display = 'none'
  }
  if(e.srcElement.classList[0] == 'del'){
    deleteNote(e.srcElement.id)
    all.style.display = 'none'
    menu.style.display = 'none'
  }
  if(e.srcElement.classList[0] == 'li'){
    let i = e.srcElement.id
    history.pushState("note", "note", './')
    note.style.display = 'block'
    notetitle.innerText = notes[i].title
    notebody.innerText = notes[i].body
    submit.id = i
  }
}


//back and forward button working
window.onpopstate = e => {
  let state = e.state
  if(state == 'create'){
    tabNew.style.display = 'block'
  }
  if(state == 'home'){
    tabNew.style.display = 'none'
    note.style.display = 'none'
    submit.style.display = 'none'
    notetitle.contentEditable = false
    notebody.contentEditable = false
  }
  if(state == 'note'){
    note.style.display = 'block'
    notetitle.contentEditable = false
    notebody.contentEditable = false
    submit.style.display = 'none'
  }
  if(state == 'edit'){
    notetitle.contentEditable = true
    notebody.contentEditable = true
    notetitle.click()
  }
}
