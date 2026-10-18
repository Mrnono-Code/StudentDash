let assignments = JSON.parse(
    localStorage.getItem("assignments")
) || [];

const assignmentForm = document.getElementById("assignmentForm");
const assignmentName = document.getElementById("assignmentName");
const assignmentSubject = document.getElementById("assignmentSubject");
const assignmentDueDate = document.getElementById("assignmentDueDate");
const assignmentList = document.getElementById("assignmentList") 
let sortAscending = true;
const sortDueDate = document.getElementById("sortDueDate");

function renderAssignments() {
    // Sort incomplete assignments first, then by due date
    assignments.sort(function(a, b) {
        if (a.completed !== b.completed) {
            return a.completed ? 1 : -1;
        }

        if (sortAscending) {
            return a.dueDate.localeCompare(b.dueDate);
        } else {
            return b.dueDate.localeCompare(a.dueDate);
        }
    });
    assignmentList.innerHTML = "";


    for (const assignment of assignments) {
        const row = document.createElement("tr");
        
        //assignment name cell
        const nameCell = document.createElement("td");
        nameCell.textContent = assignment.name;
        
        //subject name cell
        const subjectCell = document.createElement("td");
        subjectCell.textContent = assignment.subject;
        subjectCell.className = "px-4 py-4";

        // Due date cell
        const dateCell = document.createElement("td");
        const [year, month, day] = assignment.dueDate.split("-");
        dateCell.textContent = `${month}/${day}/${year.slice(-2)}`;
        dateCell.className = "px-4 py-4";

        // Done cell
        const doneCell = document.createElement("td");
        doneCell.textContent = assignment.completed ? "Done" : "Not done";
        doneCell.className = "px-4 py-4";
        doneCell.addEventListener("click", function(){
            assignment.completed = !assignment.completed;
            localStorage.setItem("assignments", JSON.stringify(assignments));
            renderAssignments();
        })

        // Remove button cell
        const removeCell = document.createElement("td");
        removeCell.className = "px-4 py-4";

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.className =
            "rounded-xl bg-pink-100 px-3 py-2 text-pink-800 hover:bg-pink-200";

        removeButton.addEventListener("click", function() {
            const index = assignments.indexOf(assignment);

            assignments.splice(index, 1);

            localStorage.setItem("assignments", JSON.stringify(assignments));

            renderAssignments();
        });

        // Put the button inside its cell
        removeCell.appendChild(removeButton);

        // Put all cells into the row
        row.append(nameCell, subjectCell, dateCell, doneCell, removeCell);

        // Add the row to the table
        assignmentList.appendChild(row);

        //Done functionality 
        if (assignment.completed) {
            nameCell.className = "bg-green-100 text-green-800"; 
            subjectCell.className = "bg-green-100 text-green-800";
            dateCell.className = "bg-green-100 text-green-800";
            doneCell.className = "bg-green-100 text-green-800";
            removeCell.className = "bg-green-100 text-green-800";
        } else {
            nameCell.className = "px-4 py-4";
        }
        

    }


}
renderAssignments();

assignmentForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = assignmentName.value;
    const subject = assignmentSubject.value;
    const dueDate = assignmentDueDate.value;

    const newAssignment = {
        name: name,
        subject: subject,
        dueDate: dueDate,
        completed: false
    };

    assignments.push(newAssignment);

    localStorage.setItem("assignments", JSON.stringify(assignments));

    renderAssignments();
    assignmentForm.reset();


});

//Sorting function
function sortAssignments() {

    renderAssignments();
}
sortDueDate.addEventListener("click", function() {
    sortAssignments();
    sortAscending = !sortAscending;
});