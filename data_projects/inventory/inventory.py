from database import connect_db

def add_item(name, quantity, price):
    conn = connect_db()
    cur = conn.cursor()

    cur.execute(
        "INSERT INTO inventory (name, quantity, price) VALUES (?, ?, ?)",
        (name, quantity, price)
    )

    conn.commit()
    conn.close()
    print("Item added successfully")

def view_items():
    conn = connect_db()
    cur = conn.cursor()

    cur.execute("SELECT * FROM inventory")
    rows = cur.fetchall()

    print("\nID | Name | Quantity | Price")
    print("-" * 35)
    for row in rows:
        print(row)

    conn.close()

def update_item(item_id, quantity):
    conn = connect_db()
    cur = conn.cursor()

    cur.execute(
        "UPDATE inventory SET quantity = ? WHERE id = ?",
        (quantity, item_id)
    )

    conn.commit()
    conn.close()
    print("Item updated successfully")

def delete_item(item_id):
    conn = connect_db()
    cur = conn.cursor()

    cur.execute("DELETE FROM inventory WHERE id = ?", (item_id,))
    conn.commit()
    conn.close()
    print("Item deleted successfully")
