import { BulbsList } from "./BulbsList.js";

window.onload = () => {
    const bulbsList = new BulbsList();
    bulbsList.render();

    setTimeout(function changeColorsRecursively() {
        bulbsList.changeColors();
        setTimeout(changeColorsRecursively, bulbsList.getInterval());
    }, bulbsList.getInterval());

    window.addEventListener('resize', () => bulbsList.render());
}