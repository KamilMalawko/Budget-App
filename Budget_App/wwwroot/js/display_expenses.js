document.addEventListener("DOMContentLoaded", displayExpenses);

function displayExpenses() {
	const expenses = JSON.parse(localStorage.getItem("expenses") || "[]");
	const tableBody = document.getElementById("expenseTableBody");
	tableBody.innerHTML = "";

	expenses.forEach((exp, index) => {

		// Date format set to DD/MM/YYYY
		console.log("Date raw: ", exp.date);
		const dateObj = new Date(exp.date);

		const day = (dateObj.getDate() < 10 ? "0" : "") + dateObj.getDate();
		const month = (dateObj.getMonth() + 1 < 10 ? "0" : "") + (dateObj.getMonth() + 1);
		const year = dateObj.getFullYear();

		const formatted_date = day + "/" + month + "/" + year;

		// Set time format to HH:MM
		const hours = (dateObj.getHours() < 10 ? "0" : "") + dateObj.getHours();
		const minutes = (dateObj.getMinutes() < 10 ? "0" : "") + dateObj.getMinutes();
		

		const formatted_time = hours + ":" + minutes;

		//combine everything together into the table
		const row = document.createElement("tr");

		row.innerHTML = `
			<td>${exp.name}</td>
			<td>${exp.amount}</td>
			<td>${exp.category}</td>
			<td>${exp.description}</td>
			<td>${formatted_date}</td>
			<td>${formatted_time}</td>
			<td><button class="edit-button" data-index="${index}">Edit</button></td>
			<td><button class="delete-button" data-index="${index}">Delete</button></td>
		`;

		tableBody.appendChild(row);
	});

	// Edit existing expenses
	document.querySelectorAll(".edit-button").forEach(button => {
		button.addEventListener("click", (e) => {
			const index = e.target.getAttribute("data-index");
			const expenses = JSON.parse(localStorage.getItem("expenses") || "[]");
			const expense = expenses[index];

			// Set data in a form
			document.querySelector('input[name="NewExpense.Name"]').value = expense.name;
			document.querySelector('input[name="NewExpense.Amount"]').value = expense.amount;
			document.querySelector('input[name="NewExpense.Category"]').value = expense.category;
			document.querySelector('input[name="NewExpense.Description"]').value = expense.description;
			document.querySelector('input[name="NewExpense.Date"]').value = expense.date;

			// Remember which element is being edited
			document.getElementById("expenseForm").setAttribute("data-edit-index", index);
			});
	});

	//Delete expenses
	document.querySelectorAll(".delete-button").forEach(button => {
		button.addEventListener("click", (e) => {
			const index = e.target.getAttribute("data-index");
			let expenses = JSON.parse(localStorage.getItem("expenses") || "[]");

			if (confirm("Are you sure you want to delete an expense?")) {
				expenses.splice(index, 1);
				localStorage.setItem("expenses", JSON.stringify(expenses));
				displayExpenses();
			}
		});
	});
}
//displayExpenses();