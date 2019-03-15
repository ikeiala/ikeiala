let comment 
let commentlist

document.addEventListener('DOMContentLoaded', () => {

  comment = document.getElementById(`textcomment`)
  commentlist = document.getElementById(`commentlist`)


 }, false);

const addEvent = (dayTitle,id,type) => {
  console.log(dayTitle,id,type)
  axios.get(`${url}/user/new/${dayTitle}/${id}/${type}`)
  .then((response) => console.log(response.data.x))
  .catch(err=>console.log(err))
}


const addComment = (dayiId) => {
  console.log(comment.value,dayiId)
  axios.post(`${url}/comment/new/${dayiId}`,{text : comment.value})
  .then(response=>{
    console.log(response)
    let newdiv = document.createElement("div")
    newdiv.className="commentevent"
    newdiv.innerHTML = `<div class="commenteventpic" style="background-image: url(${response.data.pic});background-size:cover; background-position: center"></div><h5>${response.data.author}</h5><p>${response.data.text}</p>`
    commentlist.appendChild(newdiv)
  })
  .catch(err=>console.log(err))
}

