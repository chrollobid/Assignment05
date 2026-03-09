
const loadIssues = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res)=> res.json())
    .then((json) => {
        allIssues = json.data;
        displayIssues(allIssues);
    })
};

const loadDetails =async (id)=>{
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayDetails(details.data)
};
const displayDetails =(issue) =>{
    console.log(issue)
    const detailsBox = document.getElementById('details-container');
    detailsBox.innerHTML=`
    <div>
                <h1 class="font-semibold">${issue.title}</h1>
            </div>
            <div class="flex gap-1">
                 <button class="text-[10px] px-4 py-[2px] rounded-xl border">${issue.status}</button> 
                <p class="  text-[10px]">opened by ${issue.author}</p>
                <p  class="  text-[10px]">${issue.updatedAt}</p>
            </div>

            <div>
                <button class="text-[10px] px-4 py-[2px] rounded-xl border">${issue.labels[0]}</button>
                <button class="text-[10px] px-4 py-[2px] rounded-xl border">${issue.labels[1]}</button>
            </div>

            <div>
                <p  class="text-[10px] ct">${issue.description}</p>
            </div>

            <div class="w-full bg-[#64748b10] flex gap-10">
                <div><p class="ct text-[10px] font-semibold">Assignee: ${issue.assignee}: <br><span> </span></p></div>
                <div><p class="ct text-[10px] font-semibold">Priority: <br> <button  class="text-[10px] px-4 py-[4px] rounded-xl  bg-red-700 px-4 text-white border">${issue.priority}</button></p></div>
            </div>
    `;
    document.getElementById('word_modal').showModal();
}
// {
//     "id": 1,
//     "title": "Fix navigation menu on mobile devices",
//     "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
//     "status": "open",
//     "labels": [
//         "bug",
//         "help wanted"
//     ],
//     "priority": "high",
//     "author": "john_doe",
//     "assignee": "jane_smith",
//     "createdAt": "2024-01-15T10:30:00Z",
//     "updatedAt": "2024-01-15T10:30:00Z"
// }


const displayIssues = (issues)=>{
   
    document.getElementById("total-issues").innerText = issues.length;
    const issueContainer =document.getElementById("issue-container" );
    issueContainer.innerHTML='';

    for(let issue of issues){

        
        const borderColor = issue.priority === "low" ?
        "border-t-purple-500":"border-t-green-500";

       
        const hlwColor =(issue.labels[1] === "help wanted" || !issue.labels[1]) ?
        "bg-orange-100 text-yellow-700": "bg-green-100 text-green-700";

        const bugColor = issue.labels[0] === "bug"?
        "bg-red-100 px-4 text-red-700":"bg-green-100 text-green-700";

   
        const iconColor=issue.priority === "low"?
        'src="./assets/Closed- Status .png"': ' src="./assets/Open-Status.png" '


        const cardDiv = document.createElement('div');
        console.log(issue)
        cardDiv.innerHTML=`
        <div onclick="loadDetails(${issue.id})" class=" h-full bg-white shadow rounded p-2 border-t-2 ${borderColor} space-y-2">
            <div class="flex justify-between items-center"><img class="w-3 h-3" ${iconColor} alt="">
            <button class="  rounded-lg bg-red-200 px-4 text-red-700 text-[10px] ">${issue.priority}</button>
            </div>

            <h2>${issue.title}</h2>
            <p class="ct text-[10px]">${issue.description}</p>

            <div class="py-2">
                <button class=" ${bugColor} uppercase rounded-lg  text-[10px] ">${issue.labels[0]}</button>
                <button class=" uppercase rounded-lg  px-4 ${hlwColor} text-[10px] ">${issue.labels[1] ?? 'HELP WANTED'}</button>
            </div>
            <hr>

            <p class="ct text-[10px] py-1">${issue.id}.Author: ${issue.author} </p>
            <p class="ct text-[10px]">${issue.createdAt}</p>
         </div>
        `
        issueContainer.appendChild(cardDiv)
    }

}

loadIssues()

// Btn task

document.getElementById("all-btn").addEventListener("click", () => {

    displayIssues(allIssues);
    activeBtn("all-btn");

});

document.getElementById("open-btn").addEventListener("click", () => {

    const openIssues = allIssues.filter(issue => issue.priority !== "low");

    displayIssues(openIssues);
    activeBtn("open-btn");

});

document.getElementById("close-btn").addEventListener("click", () => {

    const closedIssues = allIssues.filter(issue => issue.priority === "low");

    displayIssues(closedIssues);
    activeBtn("close-btn");

});

function activeBtn(id){

    const buttons = document.querySelectorAll(".select-btn");

    buttons.forEach(btn=>{
        btn.classList.remove('btn-primary', 'text-white');
    });

    document.getElementById(id).classList.add("btn-primary", "text-white");
    document.getElementById(id).classList.remove("btn-soft", "text-black")

}

document.getElementById('btn-search').addEventListener('click', () => {
    const input = document.getElementById('input-search')
    const searchValue = input.value.trim().toLowerCase()
    console.log(searchValue);
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
    .then((res) => res.json())
    .then((data)=>{
        const allIssue = data.data;
        console.log(allIssue)
        const filterIssues = allIssue.filter((issues) => issues.title.toLowerCase().includes(searchValue));
        displayIssues(filterIssues)
    })
})