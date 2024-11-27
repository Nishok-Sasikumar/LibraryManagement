document.getElementById('book-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    // Send book to the backend
    fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, author, isbn }),
    })
        .then(response => response.json())
        .then(book => {
            addBookToTable(book);
            document.getElementById('title').value = '';
            document.getElementById('author').value = '';
            document.getElementById('isbn').value = '';
        });
});

// Function to dynamically add a book to the table
function addBookToTable(book) {
    const table = document.getElementById('book-list').querySelector('tbody');
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td class="actions"><span class="delete-btn" data-id="${book.id}">Delete</span></td>
    `;
    table.appendChild(row);

    row.querySelector('.delete-btn').addEventListener('click', function () {
        const id = this.getAttribute('data-id');
        fetch(`/api/books/${id}`, { method: 'DELETE' }).then(() => row.remove());
    });
}

// Search functionality
document.getElementById('search').addEventListener('input', function (e) {
    const searchTerm = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('#book-list tbody tr');

    rows.forEach(row => {
        const title = row.children[0].textContent.toLowerCase();
        const author = row.children[1].textContent.toLowerCase();
        const isbn = row.children[2].textContent.toLowerCase();

        if (title.includes(searchTerm) || author.includes(searchTerm) || isbn.includes(searchTerm)) {
            row.style.display = ''; // Show the row
        } else {
            row.style.display = 'none'; // Hide the row
        }
    });
});
