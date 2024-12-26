import tkinter as tk
from tkinter import messagebox

class CGPACalculator:
    def __init__(self):
        self.root = tk.Tk()
        self.root.title("CGPA Calculator")
        self.entries = []
        self.grade_label = tk.Label(self.root, text="Grade (A+ to F):")
        self.grade_label.grid(row=0, column=0)

        self.grade_var = tk.StringVar()
        self.grade_menu = tk.OptionMenu(self.root, self.grade_var, "A+", "A", "B+", "B", "C+", "C", "D", "F")
        self.grade_menu.grid(row=0, column=1)
        self.grade_var.set("A+")

        self.credit_label = tk.Label(self.root, text="Credit:")
        self.credit_label.grid(row=1, column=0)

        self.credit_entry = tk.Entry(self.root)
        self.credit_entry.grid(row=1, column=1)

        self.add_button = tk.Button(self.root, text="Add", command=self.add_entry)
        self.add_button.grid(row=2, column=0, columnspan=2)

        self.show_table_button = tk.Button(self.root, text="Show Inputs", command=self.show_inputs)
        self.show_table_button.grid(row=3, column=0, columnspan=2)

        self.calculate_button = tk.Button(self.root, text="Calculate CGPA", command=self.calculate_cgpa)
        self.calculate_button.grid(row=4, column=0, columnspan=2)

        self.delete_button = tk.Button(self.root, text="Delete Entry", command=self.delete_entry)
        self.delete_button.grid(row=5, column=0, columnspan=2)

        self.output_label = tk.Label(self.root, text="", fg="blue")
        self.output_label.grid(row=6, column=0, columnspan=2)

        self.root.mainloop()

    def grade_to_value(self, grade):
        grade_map = {"A+": 10, "A": 9, "B+": 8, "B": 7, "C+": 6, "C": 5, "D": 4, "F": 0}
        return grade_map.get(grade.upper(), None)

    def add_entry(self):
        grade = self.grade_var.get()
        credit = self.credit_entry.get().strip()

        grade_value = self.grade_to_value(grade)
        if grade_value is None:
            messagebox.showerror("Error", "Invalid grade value. Use A+ to F.")
            return

        if not credit.isdigit() or int(credit) <= 0:
            messagebox.showerror("Error", "Credit must be a positive integer.")
            return

        self.entries.append((grade, grade_value, int(credit)))
        self.output_label.config(text=f"Entry added: {grade} ({grade_value}), Credits: {credit}")
        self.credit_entry.delete(0, tk.END)

    def delete_entry(self):
        if not self.entries:
            messagebox.showinfo("Info", "No entries to delete.")
            return

        self.entries.pop()
        self.output_label.config(text="Last entry deleted.")

    def calculate_cgpa(self):
        if not self.entries:
            messagebox.showinfo("Info", "No entries available for CGPA calculation.")
            return

        total_credits = sum(entry[2] for entry in self.entries)
        weighted_sum = sum(entry[1] * entry[2] for entry in self.entries)

        if total_credits == 0:
            messagebox.showerror("Error", "Total credits cannot be zero.")
            return

        cgpa = weighted_sum / total_credits
        self.output_label.config(text=f"CGPA: {cgpa:.2f}")

    def show_inputs(self):
        if not self.entries:
            messagebox.showinfo("Info", "No entries to display.")
            return

        table_window = tk.Toplevel(self.root)
        table_window.title("Entries")

        tk.Label(table_window, text="Grade", borderwidth=2, relief="solid", width=15).grid(row=0, column=0)
        tk.Label(table_window, text="Grade Value", borderwidth=2, relief="solid", width=15).grid(row=0, column=1)
        tk.Label(table_window, text="Credit", borderwidth=2, relief="solid", width=15).grid(row=0, column=2)

        for i, (grade, grade_value, credit) in enumerate(self.entries, start=1):
            tk.Label(table_window, text=grade, borderwidth=2, relief="solid", width=15).grid(row=i, column=0)
            tk.Label(table_window, text=grade_value, borderwidth=2, relief="solid", width=15).grid(row=i, column=1)
            tk.Label(table_window, text=credit, borderwidth=2, relief="solid", width=15).grid(row=i, column=2)

if __name__ == "__main__":
    CGPACalculator()
