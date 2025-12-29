from student_data import students

def calculate_average(marks):
    return sum(marks) / len(marks)

def analyze_students():
    print("\nSTUDENT PERFORMANCE REPORT")
    print("-" * 40)

    for student in students:
        avg = calculate_average(student["marks"])

        print(f"Name: {student['name']}")
        print(f"Marks: {student['marks']}")
        print(f"Average: {avg:.2f}")

        if avg >= 85:
            print("Performance: Excellent")
        elif avg >= 70:
            print("Performance: Good")
        else:
            print("Performance: Needs Improvement")

        print("-" * 40)

if __name__ == "__main__":
    analyze_students()
