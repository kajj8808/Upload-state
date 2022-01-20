console.log(">");
async function changeState(name) {
  await fetch("/change_state", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });
}
