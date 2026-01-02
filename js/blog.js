// Filtro de posts
function filtrarPosts() {
    let input = document.getElementById("filtro").value.toLowerCase();
    let posts = document.getElementsByClassName("post-item");

    for (let post of posts) {
        let titulo = post.querySelector(".post-title").innerText.toLowerCase();
        post.style.display = titulo.includes(input) ? "" : "none";
    }
}

// Carregar artigo individual (?id=X)
function carregarArtigo() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    document.querySelectorAll(".artigo").forEach(el => el.style.display = "none");

    if (id) {
        const artigo = document.getElementById("artigo" + id);
        if (artigo) artigo.style.display = "block";
    }
}

// Like / Dislike
function criarSistemaLikeDislike(id) {
    const likeKey = `likeCount_${id}`;
    const dislikeKey = `dislikeCount_${id}`;
    const likedKey = `liked_${id}`;
    const dislikedKey = `disliked_${id}`;

    let likeCount = parseInt(localStorage.getItem(likeKey)) || 0;
    let dislikeCount = parseInt(localStorage.getItem(dislikeKey)) || 0;
    let liked = localStorage.getItem(likedKey) === "true";
    let disliked = localStorage.getItem(dislikedKey) === "true";

    const likeBtn = document.getElementById(`likeBtn${id}`);
    const dislikeBtn = document.getElementById(`dislikeBtn${id}`);
    const likeCountDisplay = document.getElementById(`likeCount${id}`);
    const dislikeCountDisplay = document.getElementById(`dislikeCount${id}`);

    function updateDisplay() {
        likeCountDisplay.textContent = likeCount;
        dislikeCountDisplay.textContent = dislikeCount;
        likeBtn.classList.toggle("active", liked);
        dislikeBtn.classList.toggle("active", disliked);
    }

    function saveState() {
        localStorage.setItem(likeKey, likeCount);
        localStorage.setItem(dislikeKey, dislikeCount);
        localStorage.setItem(likedKey, liked);
        localStorage.setItem(dislikedKey, disliked);
    }

    likeBtn.addEventListener("click", () => {
        if (!liked) {
            likeCount++;
            if (disliked) { dislikeCount--; disliked = false; }
            liked = true;
        } else {
            likeCount--; liked = false;
        }
        saveState(); updateDisplay();
    });

    dislikeBtn.addEventListener("click", () => {
        if (!disliked) {
            dislikeCount++;
            if (liked) { likeCount--; liked = false; }
            disliked = true;
        } else {
            dislikeCount--; disliked = false;
        }
        saveState(); updateDisplay();
    });

    updateDisplay();
}

// Inicializar blog
document.addEventListener("DOMContentLoaded", () => {
    carregarArtigo();
    criarSistemaLikeDislike(1);
    criarSistemaLikeDislike(2);
});
// Mostrar artigos com botão "Ver Mais"
function initArtigos() {
  const artigos = document.querySelectorAll(".post-list .post-item");
  const btn = document.getElementById("btn-ver-mais");

  // Se não houver artigos suficientes (mais de 3) ou o botão, não faz nada
  if (artigos.length <= 3 || !btn) {
    if (btn) {
      btn.style.display = "none"; // Garante que o botão não apareça se não tiver mais artigos
    }
    return;
  }

  // Oculta todos os artigos após o segundo
  for (let i = 3; i < artigos.length; i++) {
    artigos[i].style.display = "none";
  }

  let artigosAtuais = 3;

  btn.addEventListener("click", () => {
    // Mostra o próximo artigo
    if (artigosAtuais < artigos.length) {
      artigos[artigosAtuais].style.display = "flex";
      artigosAtuais++;
    }

  });
}
// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    initModal();
    initTelefoneFormat();
    initFormValidation();
    checkUrlStatus();
    initSmoothScroll();
    initArtigos(); // <<< adiciona aqui
});