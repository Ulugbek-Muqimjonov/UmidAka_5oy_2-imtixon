const allStudents =document.querySelector(".js-all-students");
const allTeachers = document.querySelector(".js-all-teachers");
const allSublects = document.querySelector(".js-all-subjects");
const allGroups = document.querySelector(".js-all-groups");

getAllpersons(GET_STUDENTS_URL,allStudents);
getAllpersons(GET_TEACHER_URL,allTeachers);
getAllpersons(GET_SUBJECTS_URL,allSublects);
getAllpersons(GET_GROUP_URL,allGroups);
