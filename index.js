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
  const selectedLanguage = document.querySelector(
    'input[name="language"]:checked',
  );

  if (!text) {
    showError("Please enter some text to translate.");
    return;
  }

  if (!selectedLanguage) {
    showError("Please select a language.");
    return;
  }

  setLoading(true);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);

  try {
    const response = await fetch("/api/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        text,
        language: selectedLanguage.value,
      }),
      signal: controller.signal,
    });

    const contentType = response.headers.get("content-type") || "";
    const data = contentType.includes("application/json")
      ? await response.json()
      : {};

    if (!response.ok) {
      throw new Error(data.error || `Server error (${response.status})`);
    }

    if (!data.translation) {
      throw new Error("Translation result is empty.");
    }

    originalTextDisplay.textContent = text;
    translatedTextDisplay.textContent = data.translation;
    switchView(true);
  } catch (err) {
    if (err.name === "AbortError") {
      showError("Request timed out. Please try again.");
    } else {
      showError(err.message || "Failed to translate. Please try again.");
    }
  } finally {
    clearTimeout(timeout);
    setLoading(false);
  }
});

startOverBtn.addEventListener("click", () => {
  sourceText.value = "";
  hideError();
  switchView(false);
});
