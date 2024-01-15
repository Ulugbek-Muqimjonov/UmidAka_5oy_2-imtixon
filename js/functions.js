                            // All URLS
// 1 WEEKS
const GET_ALL_WEEK_URL = "http://localhost:9090/all-week";
const CREATE_WEEK_URL = "http://localhost:9090/week/create";
const UPDATE_WEEK_URL = "http://localhost:9090/week/update/";
const DELETE_WEEK_URL ="http://localhost:9090/week/delete/";

// 2 SUBJECTS
const CREATE_SUBJECTS_URL = "http://localhost:9090/subject/create";
const GET_SUBJECTS_URL ="http://localhost:9090/all-subject";
const UPDATE_SUBJECTS_URL = "http://localhost:9090/subject/update/";
const DELETE_SUBJECT_URL = "http://localhost:9090/subject/delete/";

// 3 TEACHERS
const CREATE_TEACHERS_URL = "http://localhost:9090/teacher/create";
const GET_TEACHER_URL = "http://localhost:9090/all-teacher";
const UPDATE_TEACHER_URL = "http://localhost:9090/teacher/update/";
const DELETE_TEACHER_URL = "http://localhost:9090/teacher/delete/";

// 4 GROUPS
const CREATE_GROUP__URL = "http://localhost:9090/group/create";
const GET_GROUP_URL = "http://localhost:9090/all-group";
const UPDATE_GROUP_URL = "http://localhost:9090/group/update/";
const DELETE_GROUP_URL = "http://localhost:9090/group/delete/";

// 5  STUDENTS
const CREATE_STUDENTS_URL = "http://localhost:9090/student/create";
const GET_STUDENTS_URL = "http://localhost:9090/all-student";
const UPDATE_STUDENTS_URL = "http://localhost:9090/student/update/";
const DELETE_STUDENTS_URL = "http://localhost:9090/student/delete/";


// CREATA FRAGMENT
const frag = document.createDocumentFragment();


// GET STATISIC FUNCTION
async function getAllpersons(url,node) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        node.textContent = `${data.data.length} ta`;
    } catch (error) {
        console.log(error);
    }
}

// RENDER WEEK FUNCTION
function RenderWeek(arr,node) {
    node.innerHTML ="";
    arr.forEach(item => {
        const optionElement  = document.createElement("option");
        optionElement.value = item.id;
        optionElement.textContent = item.week_name;
        frag.appendChild(optionElement)
    });
    node.appendChild(frag)
}

// RENDER SUBJECT SELLECT OPTION
function RenderSubjectSellect(arr,node) {
   if (arr.length) {
        node.innerHTML ="";
        arr.forEach(item => {
            const optionElement  = document.createElement("option");
            optionElement.value = item.id;
            optionElement.textContent = item.subject_name.toUpperCase();
            frag.appendChild(optionElement)
        });
        node.appendChild(frag)
   }else node.innerHTML = `<option>Xali fanalar yo'q</option>`
}

// RENDER SUBJECTS TABEL FUNCTION
function RenderSubjectTabel(arr,template,node) {
    if (arr.length) {
        node.innerHTML = ""
        arr.forEach(item => {
            const tempClone = template.cloneNode(true);
            tempClone.querySelector(".js-subjects-id").textContent = item.id;
            tempClone.querySelector(".subjects__tabel-subject").textContent = item.subject_name;
            tempClone.querySelector(".subjects__tabel-editbtn").dataset.id = item.id;
            tempClone.querySelector(".subjects__tabel-delbtn").dataset.id = item.id;
            frag.appendChild(tempClone)
        })
        node.appendChild(frag)
    }else node.innerHTML =`<tr class = "null-arr"><td><h2>Fanlar topilmadi  :(</h2></td></tr>`
   
}


// RENDER TEACHERS SELLECT OPTION
function RenderTeacherSellect(arr,node) {
    if (arr.length) {
        node.innerHTML ="";
        arr.forEach(item => {
            const optionElement  = document.createElement("option");
            optionElement.value = item.id;
            optionElement.textContent = item.last_name.charAt(0).toUpperCase() + item.last_name.slice(1) + " " + " "+item.first_name.charAt(0).toUpperCase() + item.first_name.slice(1);
            frag.appendChild(optionElement)
        });
        node.appendChild(frag)
    }else node.innerHTML = `<option>Xali o'qituvchi yo'q</option>`
}

// RENDER TEACHERS TABEL FUNCTION
function RenderTeacherTabel(arr,template,node) {
    if (arr.length) {
        node.innerHTML = "";
        arr.forEach(item =>{
            const tempClone= template.cloneNode(true);

            tempClone.querySelector(".js-teacher-id").textContent = item.id;
            tempClone.querySelector(".js-teacher-name").textContent = item.last_name.charAt([0]).toUpperCase() + item.last_name.slice(1)  +" "+ item.first_name.charAt([0]).toUpperCase() + item.first_name.slice(1);
            tempClone.querySelector(".teachers__img").src = `http://localhost:9090${item.img}`
            tempClone.querySelector(".js-teacher-phone").textContent = item.phone_number;
            tempClone.querySelector(".js-teacher-age").textContent = item.age;
            tempClone.querySelector(".js-teacher-subject").textContent = item.subjects.subject_name;
            tempClone.querySelector(".js-teachers-edit").dataset.id = item.id;
            tempClone.querySelector(".js-teachers-delete").dataset.id = item.id;
        
            frag.appendChild(tempClone)
        })
        node.appendChild(frag)
    }else node.innerHTML =`<tr class = "null-arr"><td><h2>O'qituvchilar topilmadi  :(</h2></td></tr>`
}


// RENDER GROUP SELLECT OPTION
function RenderGroupSellect(arr,node) {
    if (arr.length) {
        node.innerHTML ="";
        arr.forEach(item => {
            const optionElement  = document.createElement("option");
            optionElement.value = item.id;
            optionElement.textContent = item.group_name.toUpperCase();
            frag.append(optionElement)
        });
        node.appendChild(frag) 
    }else node.innerHTML = `<option>Xali guruh yo'q</option>`
    
}

// RENDER GROUPCARDS FUNCTION
function RenderGroupCards(arr,template,node) {
   if (arr.length) {
    node.classList.remove("null-list")
    node.innerHTML = "";
    arr.forEach(item => {
        const tempClone =template.cloneNode(true);
        
        tempClone.querySelector(".js-group-subject").textContent = item?.subjects?.subject_name
        tempClone.querySelector(".group__item-title").textContent = item.group_name.charAt([0]).toUpperCase() + item.group_name.slice(1);
        tempClone.querySelector(".group__item-teacher-img").src = `http://localhost:9090${item.teachers.img}`;
        
        tempClone.querySelector(".js-teacher-name").textContent = item?.teachers?.first_name.charAt([0]).toUpperCase() + item?.teachers?.first_name.slice(1) + "  " + item?.teachers?.last_name.charAt([0]).toUpperCase() + item?.teachers?.last_name.slice(1);
        
        tempClone.querySelector(".js-tacher-tel").textContent = `(+998) ${item?.teachers?.phone_number}`
        
        tempClone.querySelector(".js-group-subject").textContent = item?.subjects?.subject_name.charAt([0]).toUpperCase() + item?.subjects?.subject_name.slice(1);
        
        tempClone.querySelector(".js-lesson-day").textContent = item?.weeks?.week_name;
        
        tempClone.querySelector(".js-lesson-time").textContent = item.group_time_start + "-" + item.group_time_stop;
        
        tempClone.querySelector(".js-students-count").textContent = `${item.students.length} ta`;
        
        tempClone.querySelector(".js-delet-group").dataset.id = item.id
        
        tempClone.querySelector(".js-edit-group").dataset.id = item.id
        
        frag.appendChild(tempClone)
    })
    node.appendChild(frag)
   }else {
    node.classList.add("null-list")
    node.innerHTML =`<div class = "null-arr" width ="100%"><h2>Guruhlar topilmadi  :(</h2></div>`
    }
}

// RENDER STUDENTS TABEL FUNCTION
function RenderStudentsTabel(arr,template,node) {
    if (arr.length) {
        node.innerHTML = "";
        arr.forEach(item =>{
            const tempClone = template.cloneNode(true);
            tempClone.querySelector(".js-student-id").textContent = item.id;
            tempClone.querySelector(".js-sutudent-name").textContent = item.last_name.charAt([0]).toUpperCase() + item.last_name.slice(1)  +"  "+ item.first_name.charAt([0]).toUpperCase() + item.first_name.slice(1) 
            tempClone.querySelector(".js-student-tel").textContent = `(+998) ${item.phone_number}`
            tempClone.querySelector(".js-student-subject").textContent = item?.groups?.group_name.toUpperCase();
            tempClone.querySelector(".js-student-parent-name").textContent = item.parent_name.charAt([0]).toUpperCase() + item.parent_name.slice(1);
            tempClone.querySelector(".js-student-parent-tel").textContent = `(+998) ${item.parent_phone_number}`;
            tempClone.querySelector(".js-student-edit-btn").dataset.id = item.id;
            tempClone.querySelector(".js-student-del-btn").dataset.id = item.id;
            frag.appendChild(tempClone)
        })
        node.appendChild(frag)
    }else node.innerHTML =`<tr class = "null-arr"><td><h2>O'quvchilar topilmadi  :(</h2></td></tr>`
}



// POST FUNCTIONS
async function Post(url,obj,func) {
    try {
        const res = await fetch(url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(obj)
        });
        const data = await res.json();
        console.log(data);
        func();
    } catch (error) {
        console.log(error);
    }
}

// POST FORMDATA FUNCTION
async function postFormData(url,obj,func) {
    try {
        const res = await fetch(url,{
            method:"POST",
            body:obj
        })
        const data = await res.json();
        console.log(data);
        func()
    } catch (error) {
        console.log(error);
    }
}

// DELETE FUNCTION
async function Delete(url,id,func) {
    try {
        const res = await fetch(url + id, {
            method:"DELETE",
        });
        const data = await res.json();
        console.log(data);
        func()
    } catch (error) {
        
    }
}

// EDIT FUNCTION
async function Edit(url,id,obj,func) {
    try {
        const res = await fetch(url + id,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(obj)
        });
        const data = await res.json();
        console.log(data);
        func()
    } catch (error) {
        console.log(error);
    }
}

// EDIT FORMDATE
async function EditFormdata(url,id,obj,func) {
    try {
        const res = await fetch(url + id,{
            method:"PUT",
            body:obj
        });
        const data = await res.json()
        console.log(data);
        func()
    } catch (error) {
        console.log(error);
    }
}


// SERARCH FUNCTION
function Search(inp,url,func,temp,node) {
    inp.addEventListener("keyup",() =>{
        const val = inp.value.trim();
         fetch(url + `?name=` + val)
         .then(res => res.json())
         .then(data => func(data.data,temp,node))
         .catch(error => console.log(error))
    })
}