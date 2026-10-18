const upcomingAssignments = document.getElementById("upcomingAssignments");
const remainingCount = document.getElementById("remainingCount");
const completedCount = document.getElementById("completedCount");
const emptyMessage = document.getElementById("emptyMessage");


let assignments = JSON.parse(localStorage.getItem("assignments")) || [];
 


     function renderDashboard() {
        const completed = assignments.filter(assignment => assignment.completed);
        const remaining = assignments.filter(assignment => !assignment.completed);
    

        completedCount.textContent = completed.length;
        remainingCount.textContent = remaining.length;

        emptyMessage.hidden = remaining.length > 0;
        upcomingAssignments.innerHTML = "";

        const sortedAssignments = [...remaining].sort((a, b) => {
            return new Date(a.dueDate) - new Date(b.dueDate);
        });

        const upcoming = sortedAssignments.slice(0,3);

        upcoming.forEach(assignment => {
            const item = document.createElement("div");
            item.className = "rounded-xl bg-sky-50 p-4";
            item.textContent = `${assignment.name} - Due: ${assignment.dueDate}`;

            upcomingAssignments.appendChild(item);
        })

    }

    renderDashboard();