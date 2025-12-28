async function translate(sourceElem, destElem) {
  document.getElementById(destElem).innerHTML =
    '<img src="/static/loading.gif">';
  const response = await fetch("/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      text: document.getElementById(sourceElem).innerText,
    }),
  });
  const data = await response.json();

  document.getElementById(destElem).innerText = data.text;
}
