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
    let newh5 = document.createElement("h5")
    let newp = document.createElement("p") 
    newh5.innerText = response.data.author
    newp.innerText = response.data.text
    commentlist.appendChild(newh5)
    commentlist.appendChild(newp)
  })
  .catch(err=>console.log(err))
}