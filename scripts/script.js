const loadLessons = ()=>{
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res=>res.json())
    .then(json=>displayLesson(json.data)
    )
}

const loadLevelWord=(id)=>{
    console.log(id);
    
}
const displayLesson =(lessons)=>{
    // console.log(lessons);
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML=""

    for(let lesson of lessons){
        // console.log(lesson);
        const lessonDiv = document.createElement("div");
        lessonDiv.innerHTML=`
         <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}</button>
        `
        levelContainer.append(lessonDiv);
    }
}
loadLessons()