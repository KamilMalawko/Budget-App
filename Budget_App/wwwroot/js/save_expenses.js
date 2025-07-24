document.addEventListener("DOMContentLoaded", saveExpenses);
function saveExpenses() {
	document.getElementById("expenseForm").addEventListener("submit", function (e) {
		e.preventDefault();

		const expense = {
			name: document.querySelector("[name='NewExpense.Name']").value,
			amount: document.querySelector("[name='NewExpense.Amount']").value,
			category: document.querySelector("[name='NewExpense.Category']").value,
			description: document.querySelector("[name='NewExpense.Description']").value,
			date: document.querySelector("[name='NewExpense.Date']").value
		};

		let expenses = JSON.parse(localStorage.getItem("expenses") || "[]");
		expenses.push(expense);
		localStorage.setItem("expenses", JSON.stringify(expenses));

		alert("Saved.");
		this.reset(); // clear the form
	});
}