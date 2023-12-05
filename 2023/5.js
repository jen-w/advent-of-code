const part1 = (input) => {
    return input[0][0].reduce((min, seed) => {
        return Math.min(min, input.slice(1).reduce((dest, map) => {
            const match = map.find(arg => {
                return dest >= arg[1] && (dest < (arg[1] + arg[2]));
            });
            return match ? (match[0] + (dest - match[1])) : dest;
        }, seed));
    }, Infinity);
};

const part2 = (input) => {
    // Returns [overlap start, overlap end, [uncaptured start, range].
    const getOverlap = (start, end, mapStart, mapEnd) => {
        // Further `start` must be within other range.
        let overlapStart = Math.max(start, mapStart);

        let otherEnd = overlapStart === start ? mapEnd : end;
        if (overlapStart > otherEnd) { // No overlap.
            return undefined;
        }

        let overlapEnd = Math.min(end, mapEnd);

        // Get non-overlapping ranges within [start, end].
        let uncaptured = [];
        if (start < overlapStart) {
            uncaptured.push([start, overlapStart - start]);
        }
        if (end > overlapEnd) {
            uncaptured.push([overlapEnd + 1, end - overlapEnd]);
        }

        return [overlapStart, overlapEnd, uncaptured === [] ? undefined : uncaptured];
    };

    let min = Infinity;
    for (let i = 0; i < input[0][0].length; i += 2) {
        // dests = list of [start, range] pairs
        const locations = input.slice(1).reduce((dests, map, p) => {
             const newDests = [];
             while (dests.length > 0) {
                const dest = dests.shift();
                const start = dest[0];
                const end = start + dest[1] - 1;

                // Check for overlapping ranges.
                let overlap = undefined;
                let currMap = undefined;
                for (let mapIndex = 0; mapIndex < map.length; mapIndex++) {
                    currMap = map[mapIndex];
                    overlap = getOverlap(start, end, currMap[1], currMap[1] + currMap[2] - 1);
                    if (overlap) break;
                }
                
                if (overlap) {
                    const offset = overlap[0] - currMap[1];
                    newDests.push([currMap[0] + offset, overlap[1] - overlap[0] + 1]);
                    if (overlap[2]) {
                        // Retry with current `map`.
                        overlap[2].forEach(x => dests.push(x));
                    }
                } else {
                    newDests.push(dest);
                }
             }
             return newDests;
        }, [[input[0][0][i], input[0][0][i + 1]]]);

        min = Math.min(min, ...locations.map(l => l[0]));
    }
    return min;
};
  
const fs = require('fs');
fs.readFile(process.argv[2], 'utf8', function(err, data) {
    if (err) throw err;

    const input = data.split('\n\n').map((info) => {
        const args = info.split(':');
        const name = args[0].split(' ')[0];
        const entries = args[1].split('\n').map(line => {
            return line.split(" ").filter(num => num).map(num => Number(num));
        }).filter(list => list.length > 0);

        return entries;
    });

    console.log(part1(input));
    console.log(part2(input));
});
