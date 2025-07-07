(function () {
    chrome.storage.sync.get(["nome", "titulo", "enabled"], ({ nome, titulo, enabled }) => {
        if (!enabled || !nome || !titulo) return;

        const prefixo = `*${titulo} - ${nome}*`;

        const startObserver = setInterval(() => {
            const textarea = document.querySelector('textarea[name="whatsappMessageInput"]');
            const botaoEnviar = document.querySelector('button._primary_gx9r5_94');

            if (!textarea || !botaoEnviar) return;

            clearInterval(startObserver);

            textarea.addEventListener("keydown", (e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                    const textoOriginal = textarea.value.trim();
                    if (textoOriginal.startsWith(prefixo)) return;
                    e.preventDefault();

                    const novoTexto = `${prefixo}\n${textoOriginal}`;
                    textarea.value = novoTexto;
                    textarea.dispatchEvent(new InputEvent("input", { bubbles: true }));

                    setTimeout(() => {
                        const botao = document.querySelector('button._primary_gx9r5_94');
                        if (botao) botao.click();
                    }, 200);
                }
            });

            document.addEventListener("click", (e) => {
                const clickedButton = e.target.closest('button');
                if (clickedButton) {
                    const buttonText = clickedButton.textContent.toLowerCase();
                    const isSendButton = buttonText.includes('whatsapp') || 
                                       buttonText.includes('enviar') || 
                                       buttonText.includes('send') ||
                                       buttonText.includes('fechar') ||
                                       buttonText.includes('close') ||
                                       clickedButton.classList.contains('_primary_gx9r5_94');
                    
                    if (isSendButton) {
                        const textarea = document.querySelector('textarea[name="whatsappMessageInput"]');
                        if (textarea && textarea.value.trim()) {
                            const textoOriginal = textarea.value.trim();
                            if (!textoOriginal.startsWith(prefixo)) {
                                e.preventDefault();
                                e.stopPropagation();
                                
                                const novoTexto = `${prefixo}\n${textoOriginal}`;
                                textarea.value = novoTexto;
                                textarea.dispatchEvent(new InputEvent("input", { bubbles: true }));
                                
                                setTimeout(() => {
                                    clickedButton.click();
                                }, 100);
                            }
                        }
                    }
                }
            }, true);
        }, 1000);
    });
})();