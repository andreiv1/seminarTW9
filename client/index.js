const URL = "http://localhost:8080/api"

async function get(url) {
    return (await axios.get(url)).data
}


async function post(url, data) {
    return (await axios.post(url, JSON.stringify(data), {
        headers: { "Content-Type": "application/json" }
    })).data
}


async function addTask() {
    let task = document.getElementById('inputTask').value

    if(!task) {
        alert('Task not empty')
        return
    }

    await post(URL + "/addTask", {title: task, isDone: false})
}

async function loadTable() {
    let data = await get(URL + "/getTasks")
    console.log(data)
    let tableDiv = document.getElementById("tableData")

    if (!data || !tableDiv)
        return;

    let myHTML = []
    myHTML.push("<table id='taskTable'>")
    myHTML.push("<thead>")
    myHTML.push("<tr> <th> Task </th> <th> Status </th> </tr>")
    myHTML.push("</thead>")
    myHTML.push("<tbody>")

    for (let item of data) {
        myHTML.push("<tr>")
        myHTML.push("<td>" + item.title + "</td>")
        myHTML.push("<td>" + '<input type="checkbox" value=' + item.title + "' ");
        if(item.isDone) {
            myHTML.push(" checked>")
        }
        
        myHTML.push("</input></tr>")
    }

    myHTML.push("</tbody>")
    myHTML.push("</table>")

    tableDiv.innerHTML = myHTML.join("")

}

loadTable()

let aboutBtn = document.getElementById('menuAbout')
let taskBtn = document.getElementById('menuTasks')
let contactBtn = document.getElementById('menuContact')

aboutBtn.onclick = function(){
    document.getElementById('about').style.display = 'block';
    document.getElementById('tasks').style.display = 'none';
    document.getElementById('contact').style.display = 'none';
}

taskBtn.onclick = function(){
    document.getElementById('about').style.display = 'none';
    document.getElementById('tasks').style.display = 'block';
    document.getElementById('contact').style.display = 'none';
}

contactBtn.onclick = function(){
    document.getElementById('about').style.display = 'none';
    document.getElementById('tasks').style.display = 'none';
    document.getElementById('contact').style.display = 'block';
}
