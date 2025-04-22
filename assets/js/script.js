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

async function addVakken(vakken) {
    let input = document.querySelector('#vakInput');
    let newname = input.value.trim();

    if (newname === ""){
        alert("Vul een naam in");
        return;
    }

    try{
        let response = await fetch("http://localhost:5688/vakken", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({naam: newname})

        });

        if (response.ok){
            input.value = "";
            fetchVakken();
        }
    }
    catch (err){
        console.error("Er is een fout opgetreden",err);

    }
}

async function deleteVak(id) {
    try {
        let response = await fetch(`http://localhost:5688/vakken/${id}`, {
            method: "DELETE"
        });

        if (response.ok) {
            fetchVakken();
        }
    } catch (err) {
        console.error("Er is een fout opgetreden bij het verwijderen:", err);
    }
}

function displayVakken(vakken) {
    let lijst = document.querySelector('#vakList');
    lijst.innerHTML = '';

    vakken.forEach((item) => {
        let li = document.createElement("li");
        li.textContent = vak.naam;

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.addEventListener("click", () => deleteVak(vak.id));

        li.appendChild(deleteBtn);
        lijst.appendChild(li);
    });
}