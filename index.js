const translateBtn = document.getElementById("translateBtn");
const startOverBtn = document.getElementById("startOverBtn");
const sourceText = document.getElementById("sourceText");
const errorMsg = document.getElementById("errorMsg");
const inputView = document.getElementById("inputView");
const resultView = document.getElementById("resultView");
const originalTextDisplay = document.getElementById("originalTextDisplay");
const translatedTextDisplay = document.getElementById("translatedTextDisplay");
const btnText = translateBtn.querySelector(".btn-text");
const spinner = translateBtn.querySelector(".spinner");

function showError(message) {
  errorMsg.textContent = message;
  errorMsg.style.display = "block";
}

function hideError() {
  errorMsg.style.display = "none";
}

function setLoading(isLoading) {
  translateBtn.disabled = isLoading;
  btnText.style.display = isLoading ? "none" : "inline";
  spinner.style.display = isLoading ? "inline-block" : "none";
}

function switchView(showResult) {
  if (showResult) {
    inputView.classList.remove("active-view");
    resultView.classList.add("active-view");
  } else {
    resultView.classList.remove("active-view");
    inputView.classList.add("active-view");
  }
}

translateBtn.addEventListener("click", async () => {
  hideError();
  const text = sourceText.value.trim();
  const language = document.querySelector(
    'input[name="language"]:checked',
  ).value;

  if (!text) {
    showError("Please enter some text to translate.");
    return;
  }

  setLoading(true);

  try {
    const response = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, language }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Something went wrong.");
    }

    originalTextDisplay.textContent = text;
    translatedTextDisplay.textContent = data.translation;
    switchView(true);
  } catch (err) {
    showError(err.message || "Failed to translate. Please try again.");
  } finally {
    setLoading(false);
  }
});

startOverBtn.addEventListener("click", () => {
  sourceText.value = "";
  hideError();
  switchView(false);
});
