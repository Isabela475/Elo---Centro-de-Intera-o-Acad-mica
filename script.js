document.addEventListener("DOMContentLoaded", () => {
    //(AC, OP, OB)
  
    const modal = document.getElementById("modalAC"); //mesmo modal para todos
    const modalTitle = modal ? modal.querySelector(".modal-header h3") : null;
    const btnClose = document.getElementById("closeModal");
    const btnCancel = document.getElementById("btnCancelar");

    //para selecionar os botões do cabeçalho
    const btnHeaderAC = document.querySelector(".button_creditos_AC");
    const btnHeaderOP = document.querySelector(".button_creditos_OP");

    //para selecionar os botões da barra direita
    const btnSidebarAC = document.querySelector(".ac-btn");
    const btnSidebarOP = document.querySelector(".op-btn");
    const btnSidebarOB = document.querySelector(".ob-btn");

    //para ocutar o modal
    if (modal) {
        modal.style.display = "none";
    }

    //para abrir o modal e trocar o título
    const openModal = (tipoCredito) => {
        if (modal) {
            if (modalTitle) {
                modalTitle.textContent = `Adicionar Créditos ${tipoCredito}`;
            }
            modal.style.display = "block";
        }
    };

    const closeModal = () => {
        if (modal) modal.style.display = "none";
    };

    //para abrir o modal correspondente ao título
    if (btnHeaderAC) btnHeaderAC.addEventListener("click", () => openModal("AC"));
    if (btnSidebarAC) btnSidebarAC.addEventListener("click", () => openModal("AC"));
    
    if (btnHeaderOP) btnHeaderOP.addEventListener("click", () => openModal("OP"));
    if (btnSidebarOP) btnSidebarOP.addEventListener("click", () => openModal("OP"));
    
    if (btnSidebarOB) btnSidebarOB.addEventListener("click", () => openModal("OB"));

    // Eventos de fechar
    if (btnClose) btnClose.addEventListener("click", closeModal);
    if (btnCancel) btnCancel.addEventListener("click", closeModal);



    //para submeter o formulário e comutar as horas

    const formAdicionarHoras = document.getElementById("formAdicionarHoras");
    
    if (formAdicionarHoras) {
        formAdicionarHoras.addEventListener("submit", (e) => {
            e.preventDefault(); // Impede o recarregamento da página

            const inputHoras = document.getElementById("qtdHoras");
            const horasAdicionadas = parseInt(inputHoras.value, 10);

            if (isNaN(horasAdicionadas) || horasAdicionadas <= 0) return;

            //verifica qual é o tipo de crédito lendo o título
            const tituloModal = modalTitle ? modalTitle.textContent.trim() : "";
            let tipoAtual = "AC";
            if (tituloModal.includes("OP")) tipoAtual = "OP";
            if (tituloModal.includes("OB")) tipoAtual = "OB";

            const atualizarBarra = (classeBarra) => {
                const barraFill = document.querySelector(classeBarra);
                if (!barraFill) return;

                const progressItem = barraFill.closest(".progress-item");
                const spanQty = progressItem.querySelector(".progress-qty");
                
                // Quebra o texto no "/"
                let partes = spanQty.textContent.split("/");
                
                // Remove o que não for número
                let atual = parseInt(partes[0].replace(/\D/g, ''), 10);
                let maximo = parseInt(partes[1].replace(/\D/g, ''), 10);
                
                // Soma as horas
                atual += horasAdicionadas;
                if (atual > maximo) atual = maximo;

                //Atualiza
                spanQty.textContent = `${atual}/${maximo}`;
                
                // Atualiza o tamanho da barra
                let porcentagem = (atual / maximo) * 100;
                barraFill.style.width = `${porcentagem}%`;
            };

            // Atualiza a partir do botão que originou a ação
            if (tipoAtual === "AC") {
                atualizarBarra(".ac-fill");
            } else if (tipoAtual === "OP") {
                atualizarBarra(".op-fill");
            }
            // Se for OB, ele pula os ifs acima, pois OB não tem barra individual
            
            // A barra total é sempre atualizada
            atualizarBarra(".total-fill");
            
            alert(`Sucesso! ${horasAdicionadas} horas de ${tipoAtual} foram computadas.`);
            
            formAdicionarHoras.reset(); 
            closeModal(); 
        });
    }


  
    // Contagem de likes
   
    const likeButtons = document.querySelectorAll(".like-btn");
    
    likeButtons.forEach(btn => {
        btn.addEventListener("click", function() {
            const countSpan = this.querySelector(".like-count");
            if (!countSpan) return;

            let currentCount = parseInt(countSpan.textContent);
            
            if (this.classList.contains("liked")) {
                currentCount--;
                this.classList.remove("liked");
                // this.querySelector("img").src = "assets/icons/empty_heart.png"; 
            } else {
                currentCount++;
                this.classList.add("liked");
                // this.querySelector("img").src = "assets/icons/filled_heart.png"; 
            }
            
            countSpan.textContent = currentCount;
        });
    });


   
    // Enquete
  
    const pollOptions = document.querySelectorAll(".poll-option-btn");
    
    pollOptions.forEach(optionBtn => {
        optionBtn.addEventListener("click", function() {
            const parentContainer = this.closest(".enquete-options");
            
            const allFills = parentContainer.querySelectorAll(".option-fill");
            allFills.forEach(fill => {
                fill.classList.remove("selected-option");
                fill.classList.add("no-selected-option");
            });

            const myFill = this.querySelector(".option-fill");
            if (myFill) {
                myFill.classList.remove("no-selected-option");
                myFill.classList.add("selected-option");
            }
        });
    });

});