// Day 7

// Part 1
const getSize = (tree) => {
    if (!tree || !tree.children || tree.children.length == 0) {
        return 0;
    }

    let result = 0;
    if (tree.size < 100000) {
        result = tree.size;
    }

    return tree.children.reduce((acc, curr) => acc + getSize(curr), result);
};

// Part 2
const getClosestSize = (tree) => {
    const DISK_SPACE_AVAILABLE = 70000000;
    const UNUSED_SPACE_REQUIRED = 30000000;

    // Calculate remaining space required.
    const required = UNUSED_SPACE_REQUIRED - (DISK_SPACE_AVAILABLE - tree.size);

    // Find the size of the smallest dir that meets the space requirement.
    const queue = [tree];
    let min = DISK_SPACE_AVAILABLE;
    while (queue.length > 0) {
        const item = queue.pop();
        
        if (item.children) {
            if (item.size >= required) {
                min = Math.min(item.size, min);
            }
            queue.unshift(...item.children);
        }
    }

    return min;
};

// Each node has: children = [] of nodes, size = number, parent = node.
const buildTree = (output) => {
    let root = null;
    let currDir = null;

    output.forEach(line => {
        if (line.startsWith("$ cd ..")) {
            currDir = currDir.parent;
        } else if (line.startsWith("$ cd")) {
            const newNode = { children: [], size: 0, parent: currDir };
            if (!root) {
                root = newNode;
            } else {
                currDir.children.push(newNode);
            }
            currDir = newNode;
        } else if (line.startsWith("dir") || line.startsWith("$ ls")) {
            // ignore
        } else {
            // assumes won't be retread
            const size = Number(line.split(" ")[0]);
            currDir.children.push({ name: line.split(" ")[1], size: size });

            let temp = currDir;
            while (temp) {
                temp.size = temp.size + size;
                temp = temp.parent;
            }
        }
    });

    return root;
}

const fs = require('fs');
fs.readFile(process.argv[2], 'utf8', function(err, data) {
    if (err) throw err;

    const tree = buildTree(data.split('\n').filter(item => !!item));
    
    console.log(getSize(tree));
    console.log(getClosestSize(tree));
});
