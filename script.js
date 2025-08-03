document.getElementById("risForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const P1 = parseInt(document.getElementById("p1").value);
  const P2 = parseFloat(document.getElementById("p2").value);
  const E1 = parseFloat(document.getElementById("e1").value);
  const E2 = parseFloat(document.getElementById("e2").value);

  const RIS = (((P2 + E1 + E2) * P1) + 1000) / 10000;
  const RISRounded = RIS.toFixed(2);

  let dps = "Non défini";
  if (RIS <= 0.5) dps = "PAPS";
  else if (RIS <= 1.5) dps = "PETITE ENVERGURE";
  else if (RIS <= 3) dps = "MOYENNE ENVERGURE";
  else dps = "GRANDE ENVERGURE";

  const result = `
    <strong>RIS estimé :</strong> <span style="font-size:1.5em">${RISRounded}</span><br>
    <strong>Type de DPS recommandé :</strong> ${dps}<br>
    <small>Formule : ((P2 + E1 + E2) × P1 + 1000) ÷ 10000</small>
  `;
  document.getElementById("result").innerHTML = result;

  const entry = `P1: ${P1}, P2: ${P2}, E1: ${E1}, E2: ${E2}, RIS: ${RISRounded} → ${dps}`;
  saveToHistory(entry);
  displayHistory();
});

function saveToHistory(entry) {
  const history = JSON.parse(localStorage.getItem("risHistory")) || [];
  history.unshift(entry);
  localStorage.setItem("risHistory", JSON.stringify(history.slice(0, 10))); // Max 10 entrées
}

function displayHistory() {
  const history = JSON.parse(localStorage.getItem("risHistory")) || [];
  const list = document.getElementById("history");
  list.innerHTML = "";
  history.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
}

displayHistory();
