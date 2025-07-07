
// Translations object
const translations = {
    pt: {
        extensionTitle: "ManyChat Agent Prefixer",
        labelTitulo: "Prefixo:",
        labelNome: "Nome do agente:",
        labelEnabled: "Ativar",
        placeholderTitulo: "Ex: Suporte",
        placeholderNome: "Ex: João",
        refreshNote: "Após ativar, atualize a página 2x",
        profilesNote: "Se você usa múltiplos perfis, o prefixo será aplicado para todos os perfis."
    },
    en: {
        extensionTitle: "ManyChat Agent Prefixer",
        labelTitulo: "Prefix:",
        labelNome: "Agent name:",
        labelEnabled: "Enable",
        placeholderTitulo: "Ex: Support",
        placeholderNome: "Ex: John",
        refreshNote: "After enabling, refresh the page 2x",
        profilesNote: "If you use multiple profiles, the prefix will be applied to all profiles."
    },
    es: {
        extensionTitle: "ManyChat Agent Prefixer",
        labelTitulo: "Prefijo:",
        labelNome: "Nombre del agente:",
        labelEnabled: "Activar",
        placeholderTitulo: "Ej: Soporte",
        placeholderNome: "Ej: Juan",
        refreshNote: "Después de activar, actualiza la página 2x",
        profilesNote: "Si usas múltiples perfiles, el prefijo se aplicará a todos los perfiles."
    }
};

// Function to get browser language
function getBrowserLanguage() {
    const lang = navigator.language || navigator.userLanguage;
    if (lang.startsWith('pt')) return 'pt';
    if (lang.startsWith('es')) return 'es';
    return 'en'; // Default to English
}

// Function to apply translations
function applyTranslations(lang) {
    const t = translations[lang];
    
    document.getElementById('extension-title').textContent = t.extensionTitle;
    document.getElementById('label-titulo').textContent = t.labelTitulo;
    document.getElementById('label-nome').textContent = t.labelNome;
    document.getElementById('label-enabled').textContent = t.labelEnabled;
    document.getElementById('titulo').placeholder = t.placeholderTitulo;
    document.getElementById('nome').placeholder = t.placeholderNome;
    document.getElementById('refresh-note').textContent = t.refreshNote;
    document.getElementById('profiles-note').textContent = t.profilesNote;
}

document.addEventListener("DOMContentLoaded", () => {
    // Apply translations based on browser language
    const language = getBrowserLanguage();
    applyTranslations(language);
    
    const nomeInput = document.getElementById("nome");
    const tituloInput = document.getElementById("titulo");
    const enabledCheckbox = document.getElementById("enabled");

    chrome.storage.sync.get(["nome", "titulo", "enabled"], (data) => {
        nomeInput.value = data.nome || "";
        tituloInput.value = data.titulo || "";
        enabledCheckbox.checked = data.enabled || false;
    });

    nomeInput.addEventListener("input", () => {
        chrome.storage.sync.set({ nome: nomeInput.value });
    });

    tituloInput.addEventListener("input", () => {
        chrome.storage.sync.set({ titulo: tituloInput.value });
    });

    enabledCheckbox.addEventListener("change", () => {
        chrome.storage.sync.set({ enabled: enabledCheckbox.checked });
    });
});
