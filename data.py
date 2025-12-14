import csv

def analyze_students(filename):
    students = []

    with open(filename, 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            maths = int(row['maths'])
            physics = int(row['physics'])
            chemistry = int(row['chemistry'])

            average = (maths + physics + chemistry) / 3

            students.append({
                "name": row['name'],
                "average": average
            })

    # Sort by average marks (descending)
    students.sort(key=lambda x: x['average'], reverse=True)

    print("Student Performance Report\n")
    for s in students:
        print(f"{s['name']} → Average Marks: {s['average']:.2f}")

analyze_students("students.csv")
