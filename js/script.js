function compreaqui(){
    window.location.href = 'https://www.amazon.com.br/Filhos-do-Quarto-Elisabete-Baptista/dp/6584690075/ref=sr_1_1?dib=eyJ2IjoiMSJ9.Uieed_YXjYYRmqHh556o8CcXIMkpwB1vZbl7tj81nINVeiVjFBWq6HUoim1RUH0zJG0NeHi4TnGglYfTfbfOsjnH1y0vM3PRp70Qr79fPf9QuzJO-8oPu62fLC37ABzVGGDuLCd2FgZvzwDVnOiz1sEmnA81wm8tALoL4akmxGdcUmniE4wwz4jWrC1qfMWAkG2sqFPN6BPBxrpUjIUPnuYaRac3Ivlsl7jDIVy558JNza-HNyJ9_0g5DjbM_WJjngGTUcDbHmwYPOoKYQ6o7gTZZvBxwP6Fpjdsskj-EGY.qzy7LppNpNaAA5DzNjiH4LeDc77nZjzoPknumpBbD34&dib_tag=se&keywords=os+filhos+do+quarto&qid=1761045931&sr=8-1'
}

function cvv(){
    window.location.href = 'https://www.cvv.org.br/'
}



const questions = [
    {
        question: "1. Sua postura em relação à documentação de provas (e-mails, mensagens, etc.) é:",
        options: [
            { text: "Estou registrando TUDO (data, hora, local, conteúdo) fora da rede da empresa.", value: 3 },
            { text: "Guardo alguns e-mails, mas não anoto os detalhes dos encontros ou falas verbais.", value: 1 },
            { text: "Não considero importante guardar provas no momento.", value: 0 },
        ],
        name: "q1"
    },
    {
        question: "2. Quando você sofre um ataque ou humilhação, sua reação imediata é:",
        options: [
            { text: "Busco uma testemunha ou me retiro, anotando imediatamente o ocorrido no meu diário de fatos.", value: 3 },
            { text: "Confronto a pessoa, mas sem registrar ou ter testemunhas.", value: 1 },
            { text: "Me calo e evito a pessoa, tentando ignorar o que aconteceu.", value: 0 },
        ],
        name: "q2"
    },
    {
        question: "3. Você tem procurado conversar sobre o assédio com sua rede de apoio?",
        options: [
            { text: "Sim. Compartilho a situação com familiares, amigos e, se possível, colegas de confiança.", value: 3 },
            { text: "Só converso com familiares para não 'expor' a situação no trabalho ou me sinto culpado(a) ao falar.", value: 1 },
            { text: "Me isolei completamente e não conto a ninguém, por vergonha ou medo.", value: 0 },
        ],
        name: "q3"
    },
    {
        question: "4. Como você tem cuidado da sua saúde mental e emocional (sono, alimentação, lazer)?",
        options: [
            { text: "Busquei (ou estou buscando) ajuda profissional (psicólogo(a)) e mantenho minhas rotinas de autocuidado.", value: 3 },
            { text: "Tento me distrair com hobbies, mas ignoro o estresse e o impacto emocional que estou sentindo.", value: 1 },
            { text: "Estou com dificuldades sérias no sono, apetite, e me sinto esgotado(a).", value: 0 },
        ],
        name: "q4"
    }
];

let currentQuestionIndex = 0;
let score = 0;

// Elementos do DOM
const questionsContainer = document.getElementById('questions-container');
const nextButton = document.getElementById('next-button');
const resultContainer = document.getElementById('result-container');
const quizForm = document.getElementById('quiz-form');
const currentQDisplay = document.getElementById('current-q');
const totalQDisplay = document.getElementById('total-q');
const progressBar = document.getElementById('progress-bar');

// 1. Inicia o Quiz
function initQuiz() {
    totalQDisplay.textContent = questions.length;
    renderQuestion();
    nextButton.addEventListener('click', handleNext);
}

// 2. Renderiza a pergunta atual
function renderQuestion() {
    if (currentQuestionIndex < questions.length) {
        const q = questions[currentQuestionIndex];
        
        // Atualiza o contador e a barra de progresso
        currentQDisplay.textContent = currentQuestionIndex + 1;
        const progressPercentage = (currentQuestionIndex / questions.length) * 100;
        progressBar.style.width = `${progressPercentage}%`;

        // Monta o HTML da pergunta
        questionsContainer.innerHTML = `
            <p class="fs-4 fw-bold text-light">${q.question}</p>
            ${q.options.map((opt, optIndex) => `
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="${q.name}" id="${q.name}-${optIndex}" value="${opt.value}">
                    <label class="form-check-label" for="${q.name}-${optIndex}">
                        ${opt.text}
                    </label>
                </div>
            `).join('')}
        `;
        
        // Atualiza o texto do botão para a última pergunta
        if (currentQuestionIndex === questions.length - 1) {
            nextButton.textContent = "Ver Devolutiva Final";
        } else {
            nextButton.textContent = "Continuar";
        }

    } else {
        // Se todas as perguntas foram respondidas
        calculateAndDisplayResult();
    }
}

// 3. Lida com o clique no botão "Continuar"
function handleNext() {
    const q = questions[currentQuestionIndex];
    const selectedOption = document.querySelector(`input[name="${q.name}"]:checked`);

    if (!selectedOption) {
        alert("Por favor, selecione uma opção para continuar.");
        return;
    }

    // Adiciona a pontuação
    score += parseInt(selectedOption.value);
    
    // Avança para a próxima pergunta
    currentQuestionIndex++;
    renderQuestion();
}

// 4. Calcula o resultado final e exibe a devolutiva
function calculateAndDisplayResult() {
    const maxScore = questions.length * 3;
    
    // Esconde o formulário de perguntas
    quizForm.style.display = 'none';
    
    // Finaliza a barra de progresso
    progressBar.style.width = `100%`;

    let title, message, actionPlan, alertClass;

    // Lógica para as Devolutivas
    if (score >= maxScore * 0.75) { // 75% ou mais
        title = "Ótima Postura de Enfrentamento e Autocuidado!";
        message = "Você demonstrou consciência, proatividade e cuidado consigo mesmo(a). Você está adotando ou tem clareza sobre as atitudes necessárias para enfrentar o assédio e proteger sua saúde. Seu foco agora é manter-se firme e avançar com a formalização da denúncia, se for seu desejo.";
        actionPlan = `
            <p class="fw-bold text-white">Ações recomendadas:</p>
            <ul>
                <li>**Denúncia Formal:** Use as provas que reuniu e procure os canais internos (RH/Ouvidoria) ou externos (Sindicato/Advogado Trabalhista).</li>
                <li>**Autocuidado Contínuo:** Mantenha a terapia e a rede de apoio. O processo é desgastante, e seu bem-estar deve vir sempre em primeiro lugar.</li>
                <li>**Mantenha o Limite:** Não ceda à pressão ou à culpa. O problema é do agressor, não seu.</li>
            </ul>
        `;
        alertClass = "alert-success";

    } else if (score >= maxScore * 0.4) { // 40% a 74%
        title = "Postura Cautelosa, Mas com Pontos de Atenção Críticos.";
        message = "Você tem clareza em alguns pontos, mas há lacunas que expõem você ou dificultam o enfrentamento. O risco é que o assédio afete severamente sua saúde antes que você consiga agir eficazmente.";
        actionPlan = `
            <p class="fw-bold text-white">Ações recomendadas:</p>
            <ul>
                <li>**PRIORIDADE: Documentação Imediata.** Se não está registrando, comece AGORA um diário de fatos detalhado (fora da empresa). Sem provas, a defesa é muito difícil.</li>
                <li>**Busque Ajuda Externa:** Procure o sindicato de sua categoria ou um advogado trabalhista para orientação jurídica sobre o que você já possui.</li>
                <li>**Não se Isole:** Compartilhe a situação com sua rede de apoio e, essencialmente, comece a terapia para fortalecer sua saúde mental.</li>
            </ul>
        `;
        alertClass = "alert-warning";

    } else { // Abaixo de 40%
        title = "Alerta Vermelho: É Necessário Agir e Se Cuidar Urgente!";
        message = "Suas respostas indicam que você pode estar em uma fase de isolamento ou negação, o que é uma reação comum ao trauma, mas extremamente perigosa. É crucial agir imediatamente para proteger sua saúde física e mental.";
        actionPlan = `
            <p class="fw-bold text-white">Ações urgentes:</p>
            <ul>
                <li>**ROMPA O SILÊNCIO HOJE:** Conte para alguém de sua total confiança. O sigilo do assédio favorece o agressor.</li>
                <li>**AGENDE A TERAPIA:** Sua saúde mental não pode esperar. Busque um psicólogo(a) ou psiquiatra.</li>
                <li>**COMECE O DIÁRIO DE FATOS:** Anote tudo retroativamente (quem, quando, o quê). Mesmo que pareça tarde, qualquer registro ajuda.</li>
                <li>**Evite Ficar a Sós:** Procure sempre ter testemunhas em interações com o agressor.</li>
            </ul>
        `;
        alertClass = "alert-danger";
    }

    // Estrutura HTML da Devolutiva
    resultContainer.innerHTML = `
        <div class="alert ${alertClass} p-4">
            <h3 class="alert-heading text-center">${title}</h3>
            <hr>
            <p class="lead">${message}</p>
            <h4 class="mt-4">Plano de Ação e Autocuidado:</h4>
            ${actionPlan}
        </div>
        
        <div class="disclaimer text-center">
            <p><strong>ATENÇÃO:</strong> Esta devolutiva não é um laudo médico, diagnóstico ou aconselhamento jurídico. É apenas um conselho de quem está disposto a colaborar para a sua melhora e orientar sobre as melhores práticas de autocuidado e enfrentamento. Busque sempre o auxílio de profissionais especializados (advogados, psicólogos e médicos).</p>
        </div>
        
        <div class="text-center mt-4">
            <button class="btn custom-btn" onclick="location.reload()">Refazer Quiz</button>
        </div>
    `;

    // Exibe o resultado e rola a tela
    resultContainer.style.display = 'block';
    resultContainer.scrollIntoView({ behavior: 'smooth' });
}

// Inicializa o quiz quando a página carrega
document.addEventListener('DOMContentLoaded', initQuiz);