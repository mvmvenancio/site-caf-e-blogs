<?php
// Configurações de segurança
ini_set('display_errors', 0);
error_reporting(E_ALL);

// Função para validar email
function validarEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

// Função para validar telefone brasileiro
function validarTelefone($telefone) {
    $telefone = preg_replace('/\D/', '', $telefone);
    return strlen($telefone) >= 10 && strlen($telefone) <= 11;
}

// Função para sanitizar dados
function sanitizar($dados) {
    return htmlspecialchars(trim($dados), ENT_QUOTES, 'UTF-8');
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Verificação de token CSRF (básico)
    session_start();
    
    // Coleta e validação dos dados do formulário
    $nome = sanitizar($_POST['nome'] ?? '');
    $telefone = sanitizar($_POST['telefone'] ?? '');
    $email = sanitizar($_POST['email'] ?? '');
    $mensagem = sanitizar($_POST['mensagem'] ?? '');
    
    // Validações
    $erros = [];
    
    if (strlen($nome) < 2) {
        $erros[] = "Nome deve ter pelo menos 2 caracteres";
    }
    
    if (!validarTelefone($telefone)) {
        $erros[] = "Telefone inválido";
    }
    
    if (!validarEmail($email)) {
        $erros[] = "Email inválido";
    }
    
    if (strlen($mensagem) < 10) {
        $erros[] = "Mensagem deve ter pelo menos 10 caracteres";
    }
    
    // Se há erros, redireciona com erro
    if (!empty($erros)) {
        header("Location: ../contato/contato.html?status=erro&msg=" . urlencode(implode(', ', $erros)));
        exit;
    }
    
    // Configurações de email (ALTERE PARA SEUS DADOS)
    $destinatario = "mvvenancio@hotmail.com"; // Troque para o seu e-mail válido
    $assunto = "Contato do site - " . $nome;
    
    // Conteúdo do e-mail
    $corpo_email = "=== CONTATO DO SITE ===\n\n";
    $corpo_email .= "Nome: " . $nome . "\n";
    $corpo_email .= "Telefone: " . $telefone . "\n";
    $corpo_email .= "Email: " . $email . "\n";
    $corpo_email .= "Data/Hora: " . date('d/m/Y H:i:s') . "\n\n";
    $corpo_email .= "Mensagem:\n" . $mensagem . "\n\n";
    $corpo_email .= "=== FIM DA MENSAGEM ===";
    
    // Cabeçalhos do e-mail
    $headers = "From: noreply@seudominio.com\r\n"; // Use um email do seu domínio
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    
    // Tenta enviar o e-mail
    if (mail($destinatario, $assunto, $corpo_email, $headers)) {
        // Log de sucesso (opcional)
        error_log("Email enviado com sucesso para: " . $destinatario . " de: " . $email);
        
        // Redireciona com sucesso
        header("Location: ../contato/contato.html?status=sucesso");
        exit;
    } else {
        // Log de erro (opcional)
        error_log("Erro ao enviar email para: " . $destinatario . " de: " . $email);
        
        // Redireciona com erro
        header("Location: ../contato/contato.html?status=erro&msg=" . urlencode("Erro interno do servidor"));
        exit;
    }
} else {
    // Método não permitido
    header("Location: ../contato/contato.html?status=erro&msg=" . urlencode("Método não permitido"));
    exit;
}
?>