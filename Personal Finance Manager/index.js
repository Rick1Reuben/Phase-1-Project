// Sample transaction data
let transactionsData = [{
    "id": 1,
    "type": "income",
    "category": "Salary",
    "amount": 30000,
    "date": "2024-04-10"
  },
  {
    "id": 2,
    "type": "expense",
    "category": "Groceries",
    "amount": 2500,
    "date": "2024-04-09"
  },
  {
    "id": 3,
    "type": "expense",
    "category": "Rent",
    "amount": 10500,
    "date": "2024-04-08"
  },
  {
    "id": 4,
    "type": "income",
    "category": "Freelance Work",
    "amount": 3000,
    "date": "2024-04-07"
  },
  {
    "id": 5,
    "type": "expense",
    "category": "Transportation",
    "amount": 2100,
    "date": "2024-04-06"
  }];

 

// Function to add a new transaction
function addTransaction(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    // Get form values
    const type = formData.get('type');
    const category = formData.get('category');
    const amount = parseFloat(formData.get('amount'));
    const date = formData.get('date');

    if (!type || !category || isNaN(amount) || !date) {
        alert('Please fill in all fields!');
        return;
    }

    const newTransaction = {
        type,
        category,
        amount,
        date
    };

    transactionsData.push(newTransaction);

    form.reset();

    displayTransactions();
}


// Function to display transactions in the table
function displayTransactions() {
    const tableBody = document.querySelector('#transactions-table tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    // Looping through transactionsData creating a row for each transaction
    transactionsData.forEach((transaction, index) => {
        const row = tableBody.insertRow();
        row.innerHTML = `
            <td>${transaction.type}</td>
            <td>${transaction.category}</td>
            <td>${transaction.amount.toFixed(2)}</td>
            <td>${transaction.date}</td>
            <td>
                <button class="edit-btn" data-index="${index}">Edit</button>
                <button class="delete-btn" data-index="${index}">Delete</button>
            </td>
        `;
    });
}

// Function to edit a transaction
function editTransaction(index) {
    const transaction = transactionsData[index];

    document.getElementById('type').value = transaction.type;
    document.getElementById('category').value = transaction.category;
    document.getElementById('amount').value = transaction.amount.toFixed(2);
    document.getElementById('date').value = transaction.date;

}

// Add event listener for edit buttons
document.querySelector('#transactions-table').addEventListener('click', function(event) {
    if (event.target.classList.contains('edit-btn')) {
        const index = parseInt(event.target.dataset.index);
        editTransaction(index);
    }
});

// Function to delete a transaction
function deleteTransaction(index) {
    transactionsData.splice(index, 1);
    displayTransactions();
}

// Event listener for delete buttons
document.querySelector('#transactions-table').addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
        const index = parseInt(event.target.dataset.index);
        deleteTransaction(index);
    }
});

// Event listener for form submission
document.querySelector('#transaction-form').addEventListener('submit', addTransaction);

// Display transactions on page load
window.addEventListener('DOMContentLoaded', displayTransactions);

// My server ain't serving
    // Function to add a transaction to the server
    async function addTransactionToServer(transaction) {
        try {
            const response = await fetch('', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(transaction),
            });

            if (!response.ok) {
                throw new Error('');
            }

            return await response.json();
        } catch (error) {
            console.error(':', error);
        }
    }

    // Function to retrieve all transactions from the server
    async function getAllTransactionsFromServer() {
        try {
            const response = await fetch('');

            if (!response.ok) {
                throw new Error('');
            }

            return await response.json();
        } catch (error) {
            console.error(':', error);
            return [];
        }
    }
