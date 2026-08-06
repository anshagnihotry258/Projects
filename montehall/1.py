import random

doors = int(input("Enter the number of doors: "))

a = int(input("Enter the power (simulations = 10^a): "))

runs = 10 ** a

stay_wins = 0
switch_wins = 0

for _ in range(runs):

    car = random.randint(1, doors)

    choice = random.randint(1, doors)

    if choice == car:
        stay_wins += 1
    else:
        switch_wins += 1

print("\nRESULTS")
print("-" * 30)

print(f"Doors              : {doors}")
print(f"Total Simulations  : {runs:,}")

print(f"Stay Wins          : {stay_wins:,}")
print(f"Switch Wins        : {switch_wins:,}")

print("\nProbabilities")

print(f"Stay   : {stay_wins / runs * 100:.4f}%")
print(f"Switch : {switch_wins / runs * 100:.4f}%")

print("\nTheoretical")

print(f"Stay   : {100 / doors:.4f}%")
print(f"Switch : {(doors - 1) * 100 / doors:.4f}%")