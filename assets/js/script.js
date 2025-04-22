"use strict";

document.addEventListener("DOMContentLoaded", init());

function init() {
    document.querySelector('#addButton').addEventListener('click', addVak);
    fetchVakken();
}

async function fetchVakken() {
    try{
        let response = await fetch("http://localhost:5688/vakken");
        let vakken = await response.json();
        displayVakken(vakken);
    }
    catch (err){
        console.error("Er is een fout opgetreden",err);
    }
}