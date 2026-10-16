let assignments = JSON.parse(
    localStorage.getItem("assignments")
) || [];

const assignmentForm = document.getElementById("assignmentForm");
const assignmentName = document.getElementById("assignmentName");
const assignmentSubject = document.getElementById("assignmentSubject");
const assignmentDueDate = document.getElementById("assignmentDueDate");
const assignmentList = document.getElementById("assignmentList") 

function renderAssignments() {
    assignmentList.innerHTML = "";


    for (const assignment of assignments) {
        const row = document.createElement("tr");
        
        //assignment name cell
        const nameCell = document.createElement("td");
        nameCell.textContent = assignment.name;
        nameCell.className = "px-4 py-4";
        
        //subject name cell
        const subjectCell = document.createElement("td");
        subjectCell.textContent = assignment.subject;
        subjectCell.className = "px-4 py-4";

        // Due date cell
        const dateCell = document.createElement("td");
        dateCell.textContent = assignment.dueDate;
        dateCell.className = "px-4 py-4";

        // Done cell
        const doneCell = document.createElement("td");
        doneCell.textContent = assignment.completed ? "✓" : "X";
        doneCell.className = "px-4 py-4";


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
