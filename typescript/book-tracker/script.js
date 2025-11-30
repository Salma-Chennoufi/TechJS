const API_URL = "http://localhost:3000/books";
const form = document.getElementById("bookForm");
const booksDiv = document.getElementById("books");


function loadBooks() {
  fetch(API_URL)
    .then(res => res.json())
    .then(books => {
      booksDiv.innerHTML = "";

      let totalBooksRead = 0;
      let totalPagesRead = 0;

      books.forEach(b => {
        const percent = Math.round((b.pagesRead / b.pages) * 100);
        if (b.finished) totalBooksRead++;
        totalPagesRead += b.pagesRead;

        const div = document.createElement("div");
        div.className = "p-4 bg-white shadow rounded flex justify-between";

        div.innerHTML = `
          <div>
            <h2 class="font-bold">${b.title} – ${b.author}</h2>
            <p>${b.pagesRead}/${b.pages} pages (${percent}%)</p>
            <p>Status: ${b.status} | Format: ${b.format}</p>
          </div>

          <button onclick="deleteBook('${b._id}')"
            class="bg-red-500 text-white p-2 rounded">Delete</button>
        `;
        booksDiv.appendChild(div);
      });

      const globalDiv = document.createElement("div");
      globalDiv.className = "mt-4 p-4 bg-gray-200 rounded";
      globalDiv.innerHTML = `
        <strong>Total books read:</strong> ${totalBooksRead} <br>
        <strong>Total pages read:</strong> ${totalPagesRead}
      `;
      booksDiv.appendChild(globalDiv);
    });
}


form.addEventListener("submit", (e) => {
  e.preventDefault();

  const book = {
    title: title.value,
    author: author.value,
    pages: Number(pages.value),
    pagesRead: Number(pagesRead.value),
    status: status.value,
    format: format.value,
    price: Number(price.value),
    suggestedBy: suggestedBy.value,
  };

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book)
  })
    .then(() => {
      form.reset();
      loadBooks();
    });
});


function deleteBook(id) {
  fetch(`${API_URL}/${id}`, { method: "DELETE" })
    .then(() => loadBooks());
}


loadBooks();
