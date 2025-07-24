document.addEventListener("DOMContentLoaded", saveExpenses);
function saveExpenses() {
	document.getElementById("expenseForm").addEventListener("submit", function (e) {
		e.preventDefault();

		/*const expense = {
			name: document.querySelector("[name='NewExpense.Name']").value,
			amount: document.querySelector("[name='NewExpense.Amount']").value,
			category: document.querySelector("[name='NewExpense.Category']").value,
			description: document.querySelector("[name='NewExpense.Description']").value,
			date: document.querySelector("[name='NewExpense.Date']").value
		};*/

		const form = e.target;

		const name = form.elements["NewExpense.Name"].value;
		const amount = form.elements["NewExpense.Amount"].value;
		const category = form.elements["NewExpense.Category"].value;
		const description = form.elements["NewExpense.Description"].value;
		const date = form.elements["NewExpense.Date"].value;

		const newExpense = {
			name,
			amount,
			category,
			description,
			date
		};

		const expenses = JSON.parse(localStorage.getItem("expenses") || "[]");
		const editIndexAttr = form.getAttribute("data-edit-index");
		const editIndex = editIndexAttr !== null ? parseInt(editIndexAttr) : null;

		if (editIndex !== null && !isNaN(editIndex)) {
			//Edit existing expense
			expenses[editIndex] = newExpense;
			form.removeAttribute("data-edit-index");
		}
		else {
			//Add new expense
			expenses.push(newExpense);
		}

		localStorage.setItem("expenses", JSON.stringify(expenses));
		form.reset();
		displayExpenses();

		alert("Saved.");
		
	});
}