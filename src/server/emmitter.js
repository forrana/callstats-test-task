var Emmitter = function () {
    this.array = [
        100,
        101,
        103,
        104,
        110,
        115
    ]
    this.index = 0;
};

Emmitter.prototype.next = function () {
    let element = this.array[this.index];

    this.index < this.array.length ? this.index++ : this.index = -1;

    return this.index > 0 ? element : null;
};

Emmitter.prototype.nextRandom = function () {
    return Math.floor(Math.random() * (200 - 100) + 100);
}

module.exports = new Emmitter();
