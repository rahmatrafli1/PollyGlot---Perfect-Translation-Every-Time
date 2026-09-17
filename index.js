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

let activeRequest = null;

function showError(message) {
  errorMsg.textContent = message;
  errorMsg.style.display = "block";
}

function hideError() {
  errorMsg.textContent = "";
  errorMsg.style.display = "none";
}

function setLoading(isLoading) {
  translateBtn.disabled = isLoading;
  btnText.style.display = isLoading ? "none" : "inline";
  spinner.style.display = isLoading ? "inline-block" : "none";
}

function switchView(showResult) {
  inputView.classList.toggle("active-view", !showResult);
  resultView.classList.toggle("active-view", showResult);
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

  // Batalkan request sebelumnya jika masih berjalan
  if (activeRequest) {
    activeRequest.abort();
  }

  const controller = new AbortController();
  activeRequest = controller;
  const timeout = setTimeout(() => controller.abort(), 30000);

  setLoading(true);

  try {
    // URL relatif agar tetap menggunakan folder PollyGlot
    const apiUrl = new URL("api/translate", document.baseURI);

    const response = await fetch(apiUrl, {
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

    const rawResponse = await response.text();
    let data = {};

    try {
      data = rawResponse ? JSON.parse(rawResponse) : {};
    } catch {
      throw new Error("The server sent an invalid response.");
    }

    if (!response.ok) {
      throw new Error(data.error || `Server error (${response.status})`);
    }

    const translation =
      data.translation || data.translatedText || data.result || "";

    if (!translation.trim()) {
      throw new Error("The translation result is empty.");
    }

    originalTextDisplay.textContent = text;
    translatedTextDisplay.textContent = translation;
    switchView(true);
  } catch (error) {
    if (error.name !== "AbortError") {
      showError(error.message || "Translation failed. Please try again.");
    }
  } finally {
    clearTimeout(timeout);

    if (activeRequest === controller) {
      activeRequest = null;
      setLoading(false);
    }
  }
});

startOverBtn.addEventListener("click", () => {
  if (activeRequest) {
    activeRequest.abort();
    activeRequest = null;
  }

  sourceText.value = "";
  originalTextDisplay.textContent = "";
  translatedTextDisplay.textContent = "";
  hideError();
  setLoading(false);
  switchView(false);
});
