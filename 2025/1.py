import math 

def get_password(rotations):
	zero_count = 0
	position = 50

	for r in rotations:
		multiplier = -1 if r[0] == 'L' else 1
		position = (position + (multiplier * int(r[1:]))) % 100

		if position == 0:
			zero_count += 1

	return zero_count

def get_actual_password(rotations):
	zero_count = 0
	position = 50

	for r in rotations:
		multiplier = -1 if r[0] == 'L' else 1
		rotation = int(r[1:])
		
		if rotation > 100:
			# at least 1 full loop
			zero_count += rotation // 100

		starting = position
		unnormalized_position = position + (multiplier * (rotation%100))
		position = unnormalized_position%100
		
		if unnormalized_position < 0 and starting != 0:
			# going left and crossed 0
			zero_count += 1
		elif unnormalized_position > 99:
			# going right and crossed 0
			zero_count += 1
		elif position == 0:
			zero_count += 1

	return zero_count

with open("1.txt") as file:
	lines = [line.rstrip() for line in file]
	print(get_password(lines))
	print(get_actual_password(lines))
