const subjects = document.querySelector(".js-teachers-subject");
const teacherAddForm = document.querySelector(".js-teachers-add-form");
const teacherName = teacherAddForm.querySelector(".js-teacher-name");
const teacherSurName = teacherAddForm.querySelector(".js-teacher-surname");
const teacherNumber = teacherAddForm.querySelector(".js-teacher-number");
const teacherAge = teacherAddForm.querySelector(".js-teacher-age");
const teacherSubject = teacherAddForm.querySelector(".js-teachers-subject");
const teacherImg = teacherAddForm.querySelector(".teachders__add-img");
const teachersTabel = document.querySelector(".teachers__table-body");
const serachInp = document.querySelector(".js-search-teachers");
const teacherTemp  = document.querySelector(".teachers__temp").content;
const teacherModal = document.querySelector(".js-teacher-modal-form");

// get all subjects for sellect subject
fetch(GET_SUBJECTS_URL)
.then(res => res.json())
.then(data => RenderSubjectSellect(data.data,subjects))

// get data
async function getTeachers() {
  try {
    const res = await fetch(GET_TEACHER_URL)
    const data = await res.json()
    RenderTeacherTabel(data.data,teacherTemp,teachersTabel)
  } catch (error) {
    console.log(error);
  }
}
getTeachers()


// listen form for post Teacher
teacherAddForm.addEventListener("submit",evt =>{
  let formData = new FormData();
  evt.preventDefault();
  formData.append("first_name",teacherName.value.trim())
  formData.append("last_name",teacherSurName.value.trim().toLowerCase())
  formData.append("age",teacherAge.value.trim())
  formData.append("phone_number",teacherNumber.value.trim())
  formData.append("subject_id",teacherSubject.value.trim())
  formData.append("img",teacherImg.files[0]);
  
  postFormData(CREATE_TEACHERS_URL,formData,getTeachers)
  
  teacherName.value ="";
  teacherSurName.value = "";
  teacherNumber.value ="";
  teacherAge.value ="";
  teacherSubject.value = "";
})

// listened teachersTabel for edit and delete 
teachersTabel.addEventListener("click",evt =>{
  const id = evt.target.dataset.id;
    if (evt.target.matches(".js-teachers-delete")) {
      Delete(DELETE_TEACHER_URL,id,getTeachers) 
    }
    if(evt.target.matches(".js-teachers-edit")) {
      // listen modal for get new value
      teacherModal.addEventListener("submit",evt => {
        evt.preventDefault();
        const formdate = new FormData();
        formdate.append("first_name",teacherModal.children[0].children[1].value.trim());
        formdate.append("age",teacherModal.children[1].children[1].value.trim());
        formdate.append("img",teacherModal.children[2].children[1].files[0]); 
        EditFormdata(UPDATE_TEACHER_URL,id,formdate,getTeachers)
      })
    }
})

// search 
Search(serachInp,GET_TEACHER_URL,RenderTeacherTabel,teacherTemp,teachersTabel)