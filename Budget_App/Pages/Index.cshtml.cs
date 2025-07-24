using Budget_App.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Budget_App.Pages
{
    public class IndexModel : PageModel
    {
        [BindProperty]
        public Expense NewExpense { get; set; }

        public string? Message { get; set; }

        public void OnGet()
        {
            //todo
            NewExpense = new Expense
            {
                Date = DateTime.Now
            };
        }

        public IActionResult OnPost()
        {
            if(!ModelState.IsValid)
            {
                Message = "Please correct a form.";
                return Page();
            }

            //add data to the database
            Message = $"Expense added: {NewExpense.Amount} PLN, date: {NewExpense.Date}, category: {NewExpense?.Category}";

            //Clear the form
            NewExpense = new Expense();

            return Page();
        }

    }
}
