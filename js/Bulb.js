export class Bulb {
    #container;
    #id;
    #color;

    constructor(id, color='red') {
        this.#id = id;
        this.#color = color;
        this.#container = document.createElement('li');
        this.#container.classList.add('lights__bulb');
        this.render();
    }

    getId() {
        return this.#id;
    }

    setColor(color) {
        this.#color = color;
    }

    getContainer() {
        return this.#container;
    }

    render() {
        this.#container.innerHTML = `<div class="lights__bulb_square"></div>
                                        <div class="lights__bulb_round _${this.#color}"></div>
                                        <div class="lights__rope"></div>`; 
    }
}