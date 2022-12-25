// Day 5

// Skip the input parsing for this part and hardcode because iono about all that.
const INITIAL_STACKS = [
    "", // 0
    "NRJTZBDF", // 1
    "HJNSR", // 2
    "QZFGJNRC", // 3
    "QTRGNVF", // 4
    "FQTL", // 5
    "NGRBZWCQ", // 6
    "MHNSLCF", // 7
    "JTMQND", // 8
    "SGP", // 9
].map(stack => stack.split(''));

// Part 1 & 2
const getResultingTopCrates = (moves, isOldMachine) => {
    const resultingStacks = moves.reduce((acc, curr) => {
        const cratesToMove = curr[0];
        const start = curr[1];
        const destination = curr[2];

        const removed = acc[start].splice(0, cratesToMove);
        if (isOldMachine) {
            removed.reverse();
        }
        acc[destination].unshift(...removed);

        return acc;
    }, [...INITIAL_STACKS].map(stack => [...stack]));


    resultingStacks.shift();
    return resultingStacks.reduce((acc, curr) => acc + curr[0], '');
};

const fs = require('fs');
fs.readFile(process.argv[2], 'utf8', function(err, data) {
    if (err) throw err;

    // Each item undergoes the following transformation: "move 3 from 9 to 4" => [3, 9, 4].
    const input = data.split('\n')
                      .filter(item => !!item && item.startsWith("move"))
                      .map(item => item.split(" ").reduce((acc, curr) => {
                            const converted = Number(curr);
                            if (!isNaN(converted)) {
                                acc.push(converted);
                            }
                            return acc;
                          }, []));

    console.log(getResultingTopCrates(input, true));
    console.log(getResultingTopCrates(input));
});
