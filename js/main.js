// JavaScript principal do site da cafeteria

// Modal de endereço
function initModal() {
    const modal = document.querySelector('.modal');
    const mascaraModal = document.querySelector('.mascara-modal');
    const enderecoLinks = document.querySelectorAll('a[href="#endereco"]');

    if (!modal || !mascaraModal) return;

    function mostrarModal(event) {
        event.preventDefault();
        modal.style.left = '50%';
        mascaraModal.style.visibility = 'visible';
    }

    function esconderModal() {
        modal.style.left = '-30%';
        mascaraModal.style.visibility = 'hidden';
    }

    enderecoLinks.forEach(link => link.addEventListener('click', mostrarModal));
    mascaraModal.addEventListener('click', esconderModal);

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') esconderModal();
    });
}

// Formatação telefone
function initTelefoneFormat() {
    const telefoneInput = document.getElementById('telefone');
    if (!telefoneInput) return;

    telefoneInput.addEventListener('input', (e) => {
        let valor = e.target.value.replace(/\D/g, '');
        let formatado = '';

        if (valor.length > 0) formatado = '(' + valor.substring(0, 2);
        if (valor.length >= 3) formatado += ') ' + valor.substring(2, 6);
        if (valor.length >= 7) formatado += '-' + valor.substring(6, 10);
        if (valor.length > 10)
            formatado = '(' + valor.substring(0, 2) + ') ' +
                valor.substring(2, 7) + '-' + valor.substring(7, 11);

        e.target.value = formatado;
    });
}

// Formulário
function initFormValidation() {
    const form = document.getElementById('contato-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        const nome = document.getElementById('nome').value.trim();
        const telefone = document.getElementById('telefone').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();

        if (nome.length < 2) { alert('Nome inválido.'); e.preventDefault(); return; }
        if (telefone.length < 14) { alert('Telefone inválido.'); e.preventDefault(); return; }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) { alert('Email inválido.'); e.preventDefault(); return; }

        if (mensagem.length < 10) { alert('Mensagem curta.'); e.preventDefault(); }
    });
}

// URL status
function checkUrlStatus() {
    const params = new URLSearchParams(window.location.search);
    const status = params.get("status");
    const msg = params.get("msg");

    if (status === "sucesso") alert("Mensagem enviada com sucesso!");
    else if (status === "erro") alert(msg ? decodeURIComponent(msg) : "Erro ao enviar.");
}

// Smooth scroll
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === "#endereco") return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    initModal();
    initTelefoneFormat();
    initFormValidation();
    checkUrlStatus();
    initSmoothScroll();
});
