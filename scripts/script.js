const loadLessons = ()=>{
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res=>res.json())
    .then(json=>displayLesson(json.data)
    )
}
const removeActive=()=>{
      const lessonsButton = document.querySelectorAll(".lesson-btn");
      lessonsButton.forEach((btn)=>btn.classList.remove("active"));
}
const loadLevelWord=(id)=>{
    // console.log(id);
    fetch(`https://openapi.programming-hero.com/api/level/${id}`)
    .then(res=>res.json())
    .then(data=>{
        removeActive();
        const clickBtn = document.getElementById(`lesson-btn-${id}`);
        clickBtn.classList.add("active");
        displayWords(data.data)
    }
    )
    
}
const displayWords = (words)=>{
    // console.log(words);
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML=""

    if(words.length == 0){
        wordContainer.innerHTML = `
           <div class="text-center space-y-4 col-span-full">
                    <img class="mx-auto" src="./image/alert-error.png" />
                    <p>এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                    <h2 class="font-medium text-4xl">নেক্সট Lesson এ যান</h2>
            </div>
        `
        return;
    }
    words.forEach(word=>{
        // console.log(word);
// "id": 4,
// "level": 5,
// "word": "Diligent",
// "meaning": "পরিশ্রমী",
// "pronunciation": "ডিলিজেন্ট"
        const createCard = document.createElement('div');
        createCard.innerHTML=`
                 <div class="bg-gray-50 text-center space-y-4 rounded-lg h-full py-10 px-5">
                    <h3 class="text-3xl font-bold">${word.word ? word.word :"অর্থ পাওয়া যায়নি"}</h3>
                    <p class="text-lg font-medium">Meaning /Pronounciation</p>
                    <div class="text-2xl font-hind font-semibold">"${word.meaning ? word.meaning : 'শব্দটির অর্থ পাওয়া যায়নি'} / ${word.pronunciation ? word.pronunciation : 'উচ্চারণ পাওয়া যায়নি'}"</div>
                    <div class="flex justify-between items-center mt-13">
                        <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                        <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-low"></i></button>
                    </div>
                </div>
        `
        wordContainer.append(createCard);
    })
    
}
const displayLesson =(lessons)=>{
    // console.log(lessons);
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML=""

    for(let lesson of lessons){
        // console.log(lesson);
        const lessonDiv = document.createElement("div");
        lessonDiv.innerHTML=`
         <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}</button>
        `
        levelContainer.append(lessonDiv);
    }
}
loadLessons()