let {min} = require('../../utils/utils')

function solve(input, part) {
    let containers = input.map(s => Number(s));
    let perms = Array.from(distribute([], containers, 150, 0));
    if (part === 1) {
        return perms.length;
    }
    let m = min(perms,f => f.length);
    return perms.filter(a => a.length === m).length;
}

function* distribute(used, pool, target, runningTotal)
{
    if (pool.length > 0) {
        let h = pool[0];
        let tail = pool.slice(1);
        if (h + runningTotal === target)
            yield Array(...used,h);
        else if (h + runningTotal < target)
            yield* distribute(Array(...used,h), tail, target, h + runningTotal);
        yield* distribute(used, tail, target, runningTotal);
    }
}

function expected(part) {
    return part == 1 ? 4372 : 4;
}

module.exports = {solve,expected};