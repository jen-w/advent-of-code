const MAP = {
    "-": [[0, -1], [0, 1]],
    "|": [[-1, 0], [1, 0]],
    "7": [[0, -1], [1, 0]],
    "J": [[-1, 0], [0, -1]],
    "L": [[-1, 0], [0, 1]],
    "F": [[0, 1], [1, 0]]
};

const part1 = (input) => {
    // find s
    let sRow, sCol;
    for (let i = 0; i < input.length; i++) {
        sCol = input[i].findIndex(x => x === "S");
        if (sCol !== -1) {
            sRow = i;
            break;
        }
    }
    
    // travel the path in both directions until they meet
    const next2 = [[-1, 0], [0, -1], [0, 1], [1, 0]].filter(dir => {
        return input[sRow + dir[0]][sCol + dir[1]] !== ".";
    });
    let franz = [sRow + next2[0][0], sCol + next2[0][1]];
    let charli = [sRow + next2[1][0], sCol + next2[1][1]];
    let prev = [[sRow, sCol], [sRow, sCol]];

    let fturn = true;
    let count = 1;
    while (franz[0] !== charli[0] || franz[1] !== charli[1]) {
        const curr = fturn ? franz : charli;
        const exclude = fturn ? prev[0] : prev[1];
        const next = MAP[input[curr[0]][curr[1]]].filter(x => {            
            return (exclude[0] !== (curr[0] + x[0])) || (exclude[1] !== (curr[1] + x[1]));
        })[0];

        if (fturn) {
            prev[0] = franz;
            franz = [franz[0] + next[0], franz[1] + next[1]];
            count++;
        } else {
            prev[1] = charli;
            charli = [charli[0]+ next[0], charli[1]+ next[1]];
        }
        fturn = !fturn;
    }
    return count;
};

const part2 = (input) => {
    return input;
}
  
import fs from "fs";
fs.readFile(process.argv[2], 'utf8', function(err, data) {
    if (err) throw err;

    const input = data.split('\n').map(line => line.split(""));
    console.log(part1(input));
    //console.log(part2(input));
});
