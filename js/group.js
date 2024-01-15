const days = document.querySelector(".js-group-day");   
const allTeachers = document.querySelector(".js-all-tachers");
const addGropForm = document.querySelector(".js-add-group-form");
const groupName = addGropForm.querySelector(".js-add-group")
const groupStart = addGropForm.querySelector(".js-group-start-time")
const groupEndTieme = addGropForm.querySelector(".js-group-end-time")
const groupTeacher = addGropForm.querySelector(".js-all-tachers")
const groupDay = addGropForm.querySelector(".js-group-day")
const groupSubject = addGropForm.querySelector(".js-all-subjects");
const groupCardList = document.querySelector(".group__all-gruop-list")
const temp = document.querySelector(".group__group-card-template").content;
const searchinp = document.querySelector(".js-search-group");
const editModal = document.querySelector(".js-group-edit-modal");

// get all week days and render select
fetch(GET_ALL_WEEK_URL)
.then(res =>res.json())
.then(data => RenderWeek(data.data,days))

// get all teachers and render select
fetch(GET_TEACHER_URL)
.then(res => res.json())
.then(data => RenderTeacherSellect(data.data,allTeachers))

// get all subject and render select
fetch(GET_SUBJECTS_URL)
.then(res => res.json())
.then(data =>  RenderSubjectSellect(data.data,groupSubject))

// get all groups
async function  getGroups() {
    try {
        const res = await fetch(GET_GROUP_URL)
        const data = await res.json();
        console.log(data);
        RenderGroupCards(data.data,temp,groupCardList)
    } catch (error) {
        console.log(error);
    }
}
getGroups()
// listen form for post group
addGropForm.addEventListener("submit",evt =>{
    evt.preventDefault();
    const newGroup = {
        group_name:groupName.value.trim(),
        group_time_start:groupStart.value.trim(),
        group_time_stop:groupEndTieme.value.trim(),
        subject_id:groupSubject.value,
        week_id:groupDay.value,
        teacher_id:groupTeacher.value
    }   
    Post(CREATE_GROUP__URL,newGroup,getGroups);
    groupName.value ="";
    groupStart.value ="";
    groupEndTieme.value ="";    
})

groupCardList.addEventListener("click",evt => {
    const id = evt.target.dataset.id;
    if (evt.target.matches(".js-delet-group")) {
        Delete(DELETE_GROUP_URL,id,getGroups)
    }
    if (evt.target.matches(".js-edit-group")) {
        editModal.addEventListener("submit",evt => {
            evt.preventDefault();
            const newgroup = {};
            newgroup.group_name = editModal.children[0].children[1].value.trim();
            newgroup.group_time_start = editModal.children[1].children[1].value;
            newgroup.group_time_stop = editModal.children[2].children[1].value;
           
            Edit(UPDATE_GROUP_URL,id,newgroup,getGroups)

            editModal.children[0].children[1].value = ""
            editModal.children[1].children[1].value = ""
            editModal.children[2].children[1].value = ""
        })
    }
})

