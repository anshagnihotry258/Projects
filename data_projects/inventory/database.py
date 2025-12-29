import sqlite3

def connect_db():
    return sqlite3.connect("inventory.db")

def create_table():
    conn = connect_db()
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS inventory (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        price REAL NOT NULL
    )
    """)

    conn.commit()
    conn.close()

