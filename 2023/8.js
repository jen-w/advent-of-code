const part1 = (input) => {
    let i = 0;
    let jumps = 0;
    let curr = "AAA";
    while (curr !== "ZZZ") {
        const map = input.nodeMap.get(curr);
        curr = (input.instruction.charAt(i) === "L") ? map.l : map.r;
        jumps++;
        i++;
        if (i === input.instruction.length) {
            i = 0;
        }
    }
    return jumps;
};

// runs forever
const part2 = (input) => {
    const getLastChar = item => item.charAt(item.length - 1);
    let curr = Array.from(input.nodeMap.keys())
        .filter(item => getLastChar(item) === "A");
    let i = 0;
    let jumps = 0;
    let z = false;
    while (!z) {
        let numZ = 0;
        let newCurr = curr.map(x => {
            const map = input.nodeMap.get(x);
            const location = (input.instruction.charAt(i) === "L") ? map.l : map.r;
            if (getLastChar(location) === "Z") {
                numZ++;
            }
            return location;
        });
        if (numZ === curr.length) {
            z = true;
        }
        curr = newCurr;
        jumps++;
        i++;
        if (i === input.instruction.length) {
            i = 0;
        }
    }
    return jumps;
}
  
import fs from "fs";
fs.readFile(process.argv[2], 'utf8', function(err, data) {
    if (err) throw err;

    const input = data.split('\n');
    const nodeMap = new Map();
    input.slice(2).forEach(line => {
        const args = line.split(" = ");
        const lr = args[1].slice(1, args[1].length - 1).split(", ");
        nodeMap.set(args[0], { l: lr[0], r: lr[1] });
    });
    const prettyInput = { instruction: input[0], nodeMap };
    //console.log(part1(prettyInput));
    console.log(part2(prettyInput));
});
