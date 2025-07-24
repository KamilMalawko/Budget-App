document.addEventListener("DOMContentLoaded", displayExpenses);

function displayExpenses() {
	const expenses = JSON.parse(localStorage.getItem("expenses") || "[]");
	const tableBody = document.getElementById("expenseTableBody");
	tableBody.innerHTML = "";

	expenses.forEach(exp => {

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
		`;

		tableBody.appendChild(row);
	});
}
displayExpenses();