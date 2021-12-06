import { Bulb } from "./Bulb.js";

export class BulbsList {
    #bulbs;
    #container;
    #currentColorIndex;
    #settings = { 
        colors: ['red', 'yellow', 'green', 'blue', 'purple'], 
        bulbMargin: 50,
        interval: 1000
    }

    constructor() {
        this.#container = document.querySelector('.lights');
        this.#bulbs = [];
        this.#currentColorIndex = 0;
    }

    findBulbsCount () {
        const margin = this.#settings.bulbMargin;
        return Math.ceil((window.innerWidth - margin / 2) / margin) + 2;
    }

    getBulbsCount () {
        return this.#bulbs.length;
    }

    getInterval () {
        return this.#settings.interval;
    }

    generate () {
        const colors = this.#settings.colors;
        const bulbsCount = this.findBulbsCount();
        this.#bulbs.length = 0;
        for (let i = 0; i < bulbsCount; i++) {
            this.#bulbs.push(new Bulb(i, colors[i % colors.length]));
        }
    }

    append() {
        this.#container.innerHTML = '<li class="lights__bulb"><div class="lights__rope"></div></li>';
        for (let i in this.#bulbs) {
            this.#container.append(this.#bulbs[i].getContainer());
        }
    }

    changeColors () {
        this.#currentColorIndex++;

        const colors = this.#settings.colors;
        const interval = Math.floor(this.#settings.interval / 2);
        const findColor = i => colors[(i * 2 + this.#currentColorIndex) % colors.length];
        const findRandomColor = () => colors[Math.floor(Math.random() * colors.length)];
        const changeColor = (bulb, i) => {
            const color = findColor(bulb.getId());
            bulb.setColor(color);
            bulb.render();
        }

        const bulbs = this.#bulbs.reduce((acc, el) => {
            const i = el.getId();
            i % 2 === 0 ? acc.evens.push(el) : acc.odds.push(el);
            return acc;   
        }, {evens: [], odds: []});        

        bulbs.evens.forEach(bulb => changeColor(bulb));
        setTimeout(() => {
            bulbs.odds.forEach(bulb => changeColor(bulb));
        }, interval);
    }

    render () {
        this.generate();
        this.append();
        this.changeColors();
    }
    
}