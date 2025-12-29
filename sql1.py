from inventory import add_item, view_items, update_item, delete_item
from database import create_table

def menu():
    print("\n===== Inventory Management System =====")
    print("1. Add Item")
    print("2. View Items")
    print("3. Update Item")
    print("4. Delete Item")
    print("5. Exit")

def main():
    create_table()

    while True:
        menu()
        choice = input("Enter choice: ")

        if choice == "1":
            name = input("Item name: ")
            qty = int(input("Quantity: "))
            price = float(input("Price: "))
            add_item(name, qty, price)

        elif choice == "2":
            view_items()

        elif choice == "3":
            item_id = int(input("Enter item ID: "))
            qty = int(input("New quantity: "))
            update_item(item_id, qty)

        elif choice == "4":
            item_id = int(input("Enter item ID: "))
            delete_item(item_id)

        elif choice == "5":
            print("Exiting...")
            break

        else:
            print("Invalid choice!")

if __name__ == "__main__":
    main()
