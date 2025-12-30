const box=document.querySelector(".box")
const form=document.querySelector("form")
const dialog=document.querySelector("dialog")
const btnSave = document.querySelector(".btnSave");
const btnCancel = document.querySelector(".btnCancel");
const inputEdit = document.querySelector(".inputEdit");
const searchBtn = document.querySelector(".searchBtn");
const search = document.querySelector(".search");


let data=JSON.parse(localStorage.getItem("tasks"))||[]

function getData(list =data){
    box.innerHTML=""
    list.forEach(el=>{
    let h1=document.createElement("h1")
    let div=document.createElement("div")
    let del=document.createElement("button")
    let edit=document.createElement("button")
    let checkbox=document.createElement("input")
    del.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EA3323"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>`
    edit.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>`
    checkbox.type="checkbox"
    checkbox.checked=el.completed
    h1.innerHTML=el.title
    if(el.completed){
        h1.classList.add("active")
    }
    div.append(h1,del,edit,checkbox)
    del.onclick=()=>DeleteTask(el.id)
    edit.onclick=()=>EditOpen(el.id)
    checkbox.onchange=()=>CompletedTask(el)
    box.appendChild(div)
})}
getData()

let idx=null

form.onsubmit=(event)=>{
    event.preventDefault()
    if(form["inp"].value.trim()!==""){
        const newItem={id:Math.random(),title:form["inp"].value,completed:false}
        data.push(newItem)
        console.log(data)
        getData()
    }
    form["inp"].value=""
    setData()
}

function DeleteTask(id){
   data = data.filter(el=>el.id!==id)
   getData()
    setData()
}


function EditOpen(id){
    const exist=data.find(el=>el.id===id)
    dialog.showModal()
    inputEdit.value=exist.title
    idx=id
}

btnCancel.onclick=()=>{
    dialog.close()
    inputEdit.value=""
    idx=null
}


btnSave.onclick=()=>{
    if(inputEdit.value.trim()!==""&&idx!==null){
        data=data.map(el=>el.id===idx?{...el,title:inputEdit.value}:el)
        dialog.close()
        inputEdit.value=""
        idx =null
        getData()
        setData()
    }
}


function CompletedTask(ele){
    data =data.map(el=>{return el.id===ele.id?{...el,completed:!el.completed}:el})
    getData()
    setData()
}


function setData(){
    localStorage.setItem("tasks",JSON.stringify(data))
}

searchBtn.onclick = () => {
    if (search.value.trim().toLowerCase() !== "") {
        const filtered = data.filter(el => el.title.toLowerCase().includes(search.value.trim().toLowerCase()));
        box.innerHTML = "";

        if (filtered.length > 0) {
            getData(filtered);
        } else {
            let notFound = document.createElement("h2");
            notFound.innerText = `Not Found: ${search.value}`;
            notFound.style.color = "red";
            box.appendChild(notFound);
        }
        let btn = document.createElement("button");
        btn.innerHTML = "Others";
        btn.onclick = () => location.reload();
        box.appendChild(btn);
        search.value = "";
    }
};
