async function changeState(name) {
  const btn = document.getElementById(name);
  const btnText = btn.querySelector("b");
  btnText.innerText = btnText.textContent === "false" ? "true" : "false";
  await fetch("/change_state", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });
}
