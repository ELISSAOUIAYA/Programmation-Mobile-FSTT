const fromSelect = document.getElementById('from-currency'); // Récupérer les éléments du DOM
const toSelect = document.getElementById('to-currency');
const amountInput = document.getElementById('amount');
const convertBtn = document.getElementById('convert-btn');
const resultText = document.getElementById('result-text');

// URL de base de l'API de conversion de devises 
const apiURL = "https://api.frankfurter.app";

// Charger les devises disponibles au démarrage
async function loadCurrencies() { // Récupérer la liste des devises disponibles
    try {
        const response = await fetch(`${apiURL}/currencies`);
        const data = await response.json();
        const currencies = Object.keys(data);
        
        currencies.forEach(currency => {
            const opt1 = new Option(currency, currency);
            const opt2 = new Option(currency, currency);
            fromSelect.add(opt1);
            toSelect.add(opt2);
        });

       // Par défaut, on peut pré-sélectionner EUR -> USD
        fromSelect.value = "EUR";
        toSelect.value = "USD";
    } catch (error) {
        console.error("Erreur devises:", error);
    }
}

// Convertir la devise lors du clic sur le bouton
async function convert() {          // Récupérer les valeurs saisies
    const amount = amountInput.value;
    const from = fromSelect.value;
    const to = toSelect.value;
    //
    if (amount === "" || amount <= 0) return;
    if (from === to) {
        resultText.innerText = `${amount} ${from} = ${amount} ${to}`;
        return;
    }
    // Afficher un message de chargement
    resultText.innerText = "Conversion en cours...";
    // Récupérer le taux de change et calculer le résultat
    try {
        const response = await fetch(`${apiURL}/latest?amount=${amount}&from=${from}&to=${to}`);
        const data = await response.json();
        
        const convertedAmount = data.rates[to];
        resultText.innerText = `${amount} ${from} = ${convertedAmount.toFixed(2)} ${to}`;
    } catch (error) {
        resultText.innerText = "Erreur de conversion.";
        console.error(error);
    }
}

// Événements
convertBtn.addEventListener('click', convert);
loadCurrencies();