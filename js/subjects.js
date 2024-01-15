const addSubjectsForm = document.querySelector(".subjects__add-from");
const  subjectTabel = document.querySelector(".subjects__tabel-body");
const subjectEditModalForm = document.querySelector(".js-modal-subject");
const newSubj = subjectEditModalForm.querySelector(".js-subject");
const template = document.querySelector(".subjects__temp").content;
const sobjectText = subjectEditModalForm.querySelector(".js-subject")

// listen form for post
addSubjectsForm.addEventListener("submit",evt =>{
    evt.preventDefault();
    const newSubject = {
        subject_name:addSubjectsForm.children[0].children[0].value
    } 
    // console.log(newSubject);
    Post(CREATE_SUBJECTS_URL,newSubject,getSubject)
    addSubjectsForm.children[0].children[0].value =""
})

// get data
async function getSubject() {
    try {
        const res = await fetch(GET_SUBJECTS_URL);
        const data = await res.json()
        RenderSubjectTabel(data.data,template,subjectTabel)
    } catch (error) {
        console.log(error);
    }    
  
}
getSubject()


// listen SUBJECT LIST for delete and edit function
subjectTabel.addEventListener("click",evt =>{
    const id = evt.target.dataset.id;
    if (evt.target.matches(".subjects__tabel-delbtn")) {
        Delete(DELETE_SUBJECT_URL,id,getSubject)
    }
    if (evt.target.matches(".subjects__tabel-editbtn")) {
        // listen modal form for get new value
        subjectEditModalForm.addEventListener("submit",evt => {
           evt.preventDefault();
           const subjtextValue = sobjectText.value.trim()
           const newSubj = {
                subject_name:subjtextValue
           }
           Edit(UPDATE_SUBJECTS_URL,id,newSubj,getSubject)
           sobjectText.value = ""
        })
    }
})


