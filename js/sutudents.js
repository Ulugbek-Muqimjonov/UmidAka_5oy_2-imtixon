const addForm = document.querySelector(".students__add-form");
const studentName = addForm.querySelector(".js-sutdent-name")
const studentSurName = addForm.querySelector(".js-sutdent-surname")
const studentPhone = addForm.querySelector(".js-sutdent-number")
const studentParentName = addForm.querySelector(".js-sutdent-parent-name")
const studentParentPhone = addForm.querySelector(".js-sutdent-parent-phone")
const studentGroup = addForm.querySelector(".js-all-group")
const studentAge = addForm.querySelector(".js-sutdent-age");
const studentTabel = document.querySelector(".students__tabel-body")
const studentTabelTemp = document.querySelector(".students__tabel-temp").content;
const searchStudentInp = document.querySelector(".js-search-students");
const modalForm = document.querySelector(".modal-form");

// get group for select
fetch(GET_GROUP_URL)
.then(res => res.json())
.then(data => RenderGroupSellect(data.data,studentGroup))
.catch(error => console.log(error))

// get all students
async function getStudents() {
    try {
        const res = await fetch(GET_STUDENTS_URL)
        const data = await res.json();
        RenderStudentsTabel(data.data,studentTabelTemp,studentTabel)
    } catch (error) {
        console.log(error);
    }
}
getStudents()

// listen form for post STUDENTS
addForm.addEventListener("submit",evt =>{
    evt.preventDefault();
    const obj = {
        first_name:studentName.value.trim(),
        last_name:studentSurName.value.trim().toLowerCase(),
        age:studentAge.value.trim(),
        phone_number:studentPhone.value.trim(),
        parent_name:studentParentName.value.trim(),
        parent_phone_number:studentParentPhone.value.trim(),
        group_id:studentGroup.value
    }
    
    Post(CREATE_STUDENTS_URL,obj,getStudents)
    studentName.value = "";
    studentSurName.value ="";
    studentAge.value = "";
    studentPhone.value = "";
    studentParentName.value = "";
    studentParentPhone.value = ""
})

// listen studentTabel for edit and delete
studentTabel.addEventListener("click",evt => {
    const id = evt.target.dataset.id
    if (evt.target.matches(".js-student-del-btn")) {
        Delete(DELETE_STUDENTS_URL,id,getStudents)
    }
    if (evt.target.matches(".js-student-edit-btn")){
        // listened modalform for get new value
        modalForm.addEventListener("submit",evt =>{
            evt.preventDefault();   
            const edited = {};
            edited.first_name = modalForm.children[0].children[1].value.trim();
            edited.last_name = modalForm.children[1].children[1].value.trim();
            edited.age = modalForm.children[2].children[1].value.trim();
            edited.phone_number = modalForm.children[3].children[1].value.trim();
            
            Edit(UPDATE_STUDENTS_URL,id,edited,getStudents);

            modalForm.children[0].children[1].value ="";
            modalForm.children[1].children[1].value ="";
            modalForm.children[2].children[1].value ="";
            modalForm.children[3].children[1].value ="";
        })
    }
})

// SEARCH STUDENTS  
Search(searchStudentInp,GET_STUDENTS_URL,RenderStudentsTabel,studentTabelTemp,studentTabel)


