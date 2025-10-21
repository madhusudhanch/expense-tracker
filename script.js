document.addEventListener("DOMContentLoaded", () => {
  const expenseForm = document.getElementById("expense-form");
  const expenseName = document.getElementById("expense-name");
  const expenseAmount = document.getElementById("expense-amount");
  const expenseList = document.getElementById("expense-list");
  const expenseTotal = document.getElementById("expense-total");

  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  let totalAmount = localStorage.getItem("totalAmount") || calculateTotal();

  renderExpenses();
  updateToLocal();

  function saveToLocalStorage() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
    localStorage.setItem("totalAmount", totalAmount);
  }

  function renderExpenses() {
    expenseList.innerHTML = "";
    expenses.forEach((expense) => {
      const li = document.createElement("li");
      li.classList.add("ul-items");
      li.textContent = `
      ${expense.name} - $${expense.amount}
      `;
      const btn = document.createElement("button");
      btn.textContent = "Delete"
      btn.classList.add("del-btn");
      btn.setAttribute("data-id", expense.id)
      expenseList.appendChild(li);
      li.appendChild(btn);
    });
  }

  function calculateTotal() {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }

  function updateToLocal() {
    let totalAmount = calculateTotal();
    expenseTotal.textContent = `$${totalAmount}`;
    localStorage.setItem("totalAmount", totalAmount);
  }

  expenseList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const expenseId = parseInt(e.target.getAttribute("data-id"));
      expenses = expenses.filter((e) => e.id !== expenseId);

      saveToLocalStorage();
      renderExpenses();
      updateToLocal();
    }
  });

  expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = expenseName.value.trim();
    const amount = parseFloat(expenseAmount.value.trim());

    const expenseObj = {
      id: Date.now(),
      name: name,
      amount: amount,
    };
    expenses.push(expenseObj);

    saveToLocalStorage();
    renderExpenses();
    updateToLocal();

    expenseName.value = "";
    expenseAmount.value = "";
  });
});
