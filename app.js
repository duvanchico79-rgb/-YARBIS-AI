
const messages = document.querySelector("#messages");
const entry = document.querySelector("#entry");
const notice = document.querySelector("#notice");
const sendBtn = document.querySelector("#send");

let conversation = [];
let busy = false;

function add(text, who = "bot") {
  const div = document.createElement("div");
  div.className = "msg " + who;

  const name = document.createElement("b");
  name.textContent = who === "bot" ? "YARBIS :" : "TÚ :";

  const p = document.createElement("p");
  p.textContent = text;

  div.append(name, p);
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

async function reply(message) {
  try {
    busy = true;
    sendBtn.disabled = true;
    notice.textContent = "YARBIS está pensando...";

    const response = await fetch("https://damp-feather-b214.duvanchico-79.workers.dev/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: message,
        history: conversation
      })
    });

    if (!response.ok) {
      throw new Error("Error del servidor: " + response.status);
    }

    const data = await response.json();

    if (!data.reply) {
      throw new Error("El servidor no devolvió una respuesta.");
    }

    conversation.push(
      { role: "user", content: message },
      { role: "assistant", content: data.reply }
    );

    if (conversation.length > 30) {
      conversation = conversation.slice(-30);
    }

    add(data.reply, "bot");

    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(data.reply);
      speech.lang = "es-CO";
      speechSynthesis.speak(speech);
    }

    notice.textContent = "YARBIS conectado.";

  } catch (error) {
    console.error(error);
    notice.textContent =
      "No se pudo conectar con el cerebro de YARBIS. Revisa el servidor.";
  } finally {
    busy = false;
    sendBtn.disabled = false;
    entry.focus();
  }
}

function send() {
  const message = entry.value.trim();

  if (!message || busy) return;

  add(message, "user");
  entry.value = "";

  reply(message);
}

sendBtn.addEventListener("click", send);

entry.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    send();
  }
});

// Reconocimiento de voz
document.querySelector("#mic").addEventListener("click", () => {
  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    notice.textContent =
      "Tu navegador no admite reconocimiento de voz.";
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "es-CO";
  recognition.interimResults = false;

  recognition.onstart = () => {
    notice.textContent = "Escuchando...";
  };

  recognition.onresult = event => {
    entry.value = event.results[0][0].transcript;
    send();
  };

  recognition.onerror = () => {
    notice.textContent = "Error al utilizar el micrófono.";
  };

  recognition.start();
});

// Instalación en Android
let installPrompt;

const installBtn = document.querySelector("#install");

window.addEventListener("beforeinstallprompt", event => {
  event.preventDefault();
  installPrompt = event;
  installBtn.hidden = false;
});

installBtn.addEventListener("click", async () => {
  if (!installPrompt) return;

  await installPrompt.prompt();
  await installPrompt.userChoice;

  installPrompt = null;
  installBtn.hidden = true;
});

// Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js")
      .catch(error => console.error(
        "Error del Service Worker:", error
      ));
  });
}

add("Hola, soy YARBIS AI 2.0. Estoy preparado para conectarme a mi cerebro de inteligencia artificial.");
