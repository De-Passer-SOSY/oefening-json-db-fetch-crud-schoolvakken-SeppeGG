"use strict";

document.addEventListener("DOMContentLoaded", init());

function init() {
    document.querySelector('#addButton').addEventListener('click', addVak);
    fetchVakken();
}