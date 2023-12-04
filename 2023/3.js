const part1 = (input) => {
    const hasAdjacentSymbol = (x, yStart, yEnd) => {
        for (let i = x-1; i <= x+1; i++) {
            for (let j = yStart-1; j <= yEnd+1; j++) {
                if (i >= 0 && j >= 0 && i < input.length && j < input[0].length) {
                    if (input[i][j] !== "." && isNaN(input[i][j])) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    
    return input.reduce((result, line, row) => {
        let colStart = -1;
        return result + line.reduce((acc, char, col) => {
            if (!isNaN(char)) {
                // Keep track of first digit.
                if (colStart === -1) {
                    colStart = col;
                }
                // Check if end of number.
                if ((col === (line.length -1)) || isNaN(line[col + 1])) {
                    const oldColStart = colStart;
                    colStart = -1;
                    if (hasAdjacentSymbol(row, oldColStart, col)) {
                        return acc + Number(line.slice(oldColStart, col+1).join(""));
                    }
                }
            }
            return acc;
        }, 0);
    }, 0);
};

const part2 = (input) => {
    // Returns start and end columns of number affiliated with provided coordinates.
    const getNumberCoords = (x, y) => {
        const line = input[x];

        let left = y;
        while (left > 0 && !isNaN(line[left-1])) {
            left--;
        }

        let right = y;
        while ((right < (line.length -1)) && !isNaN(line[right+1])) {
            right++;
        }

        return [left, right];
    }

    // Returns 0 if the coordinates do not point to a valid gear.
    const getGearRatio = (x, y) => {
        let parts = [];
        for (let i = x-1; i <= x+1; i++) {
            const line = input[i];
            for (let j = y-1; j <= y+1; j++) {
                if (i >= 0 && j >= 0 && i < input.length && j < line.length) {
                    if (!isNaN(input[i][j])) {
                        const numberCoords = getNumberCoords(i, j);
                        parts.push(Number(line.slice(numberCoords[0], numberCoords[1] + 1).join("")));
                        j = numberCoords[1];
                    }
                }
            }
        }
        return parts.length === 2 ? parts[0] * parts[1] : 0;
    };
    
    return input.reduce((result, line, row) => {
        return result + line.reduce((acc, char, col) => {
            return acc + (char === "*" ? getGearRatio(row, col) : 0);
        }, 0);
    }, 0);
};
  
const fs = require('fs');
fs.readFile(process.argv[2], 'utf8', function(err, data) {
    if (err) throw err;

    const input = data.split('\n').map(line => line.split(""));
    console.log(part1(input));
    console.log(part2(input));
});
