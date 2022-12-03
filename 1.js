// Day 1

// Part 1
const mostCalories = (data) => {
    let maximum = 0;
    data.split('\n\n').forEach(elf => {
        maximum = Math.max(maximum, elf.split('\n').reduce((acc, food) => {
            const num = parseInt(food);
            return isNaN(num) ? acc : acc + num;
        }, 0));
    });
    return maximum;
};

// Part 2
class FixedHeap {
    constructor(size) {
        this.size = size;
        this.heap = [];
    }

    get items() {
        return this.heap;
    }

    push(item) {
        this.heap.push(item);
        this.heap.sort();
        if (this.heap.length > this.size) {
            this.heap.shift();
        }
    }
}

const top3 = (data) => {
    // Fixed heap scales better than sorting everything in place.
    const heap = new FixedHeap(3);

    data.split('\n\n').forEach(elf => {
        const totalCalories = elf.split('\n').reduce((acc, food) => {
            const num = parseInt(food);
            return isNaN(num) ? acc : acc + num;
        }, 0);

        heap.push(totalCalories);
    });

    return heap.items.reduce((acc, curr) => acc + curr, 0);
};

const fs = require('fs');
fs.readFile(process.argv[2], 'utf8', function(err, data) {
    if (err) throw err;
    console.log(mostCalories(data));
    console.log(top3(data))
});
