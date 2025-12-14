import sqlite3

# Connect to database (creates file)
conn = sqlite3.connect("library.db")
cursor = conn.cursor()

# Create table
cursor.execute("""
CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    author TEXT,
    quantity INTEGER
)
""")

conn.commit()

def add_book(title, author, quantity):
    cursor.execute(
        "INSERT INTO books (title, author, quantity) VALUES (?, ?, ?)",
        (title, author, quantity)
    )
    conn.commit()

def view_books():
    cursor.execute("SELECT * FROM books")
    books = cursor.fetchall()
    for book in books:
        print(book)

def issue_book(book_id):
    cursor.execute(
        "UPDATE books SET quantity = quantity - 1 WHERE id = ? AND quantity > 0",
        (book_id,)
    )
    conn.commit()

# Sample usage
add_book("Python Basics", "Guido", 5)
add_book("SQL Made Easy", "Codd", 3)

print("\nLibrary Inventory:")
view_books()

issue_book(1)

print("\nAfter Issuing Book:")
view_books()

conn.close()
