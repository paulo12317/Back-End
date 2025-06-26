// Aguarda o carregamento completo do DOM antes de executar a lógica principal
document.addEventListener("DOMContentLoaded", function () {
    // Referências aos elementos da página
    const createForm = document.getElementById('criarPokemon')
    const tabelaPokemon = document.querySelector(".tablePokemon"); 
    const hiddenId = document.getElementById("hiddenId"); // Campo oculto para armazenar o ID do Pokemon ao editar
    const mensagemSucesso = document.getElementById("mensagemSucesso");
  
    const apiBase = "http://localhost:3000/api/pokemon";

  
    /**
     * Busca os Pokemon da API e preenche dinamicamente a tabela com os resultados.
     * Exibe uma linha indicando ausência de Pokemon, caso nenhum seja retornado.
     */
    async function listarPokemon() {
      try {
        const res = await fetch(apiBase);
        const data = await res.json();
  
        if (!data || data.length === 0) {
          tabelaPokemon.innerHTML = `<tr><td colspan="5" style="text-align:center;">Nenhum Pokemon encontrado.</td></tr>`;
          return;
        }

        tabelaPokemon.innerHTML = data.map((pokemon) => `
          <tr>
            <td>${pokemon.id ?? "-"}</td>
            <td>${pokemon.name}</td>
            <td>${pokemon.tipo1}</td>
            <td>${pokemon.tipo2}</td>
            <td>${pokemon.level}</td>
            <td>
              <button class="editar" data-id="${pokemon.id}">Editar</button>
              <button class="excluir" data-id="${pokemon.id}">Excluir</button>
            </td>
          </tr>
        `).join("");
      } catch (err) {
        alert("Erro ao listar os Pokemons", false);
      }
    }
  
    /**
     * Detecta se é um novo pokemon ou uma edição com base no campo oculto.
     * Valida os campos antes do envio e atualiza a tabela após sucesso.
     */
    async function salvarPokemon(e) {
      e.preventDefault();
  
      const id = hiddenId.value;
      const name = createForm.querySelector('input[name="name"]').value.trim();
      const tipo1 = createForm.querySelector('input[name="tipo1"]').value.trim();
      const tipo2 = createForm.querySelector('input[name="tipo2"]').value.trim();
      const level = parseInt(createForm.querySelector('input[name="level"]').value);
  
      if (!name || !tipo1 || !level) {
        alert("Preencha todos os campos.", false);
        return;
      }
  
      try {
        let res, data;
  
        if (id) {
          // Atualiza um Pokemon existente (PUT)
          res = await fetch(`${apiBase}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, tipo1, tipo2, level }),
          });
          data = await res.json();
  
          if (res.ok) {
            alert("Pokemon atualizado com sucesso");
          } else {
            alert(data.message || "Erro ao atualizar", false);
          }
        } else {
          // Cria um novo Pokemon (POST)
          alert("criado")
          res = await fetch(apiBase, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, tipo1, tipo2, level }),
          });
          data = await res.json();
  
          if (res.ok) {
            alert("Pokemon criado com sucesso");
          } else {
            alert(data.message || "Erro ao criar", false);
          }
        }
  
        // Após sucesso: limpa o formulário, atualiza lista
        createForm.reset();
        hiddenId.value = "";
        listarPokemon();
      } catch (err) {
        alert("Erro de rede: " + err.message, false);
      }
    }
  
    /**
     * Envia uma requisição DELETE para remover um Pokemon por ID,
     * após confirmação do user
     */
    async function deletarPokemon(id) {
      alert("ou")
      if (!confirm("Tem certeza que deseja deletar este Pokemon?")) return;
  
      try {
        const res = await fetch(`${apiBase}/${id}`, { method: "DELETE" });
  
        if (res.status === 204) {
          alert("Pokemon deletado com sucesso");
          listarPokemon();
        } else {
          const data = await res.json();
          alert(data.message || "Erro ao deletar", false);
        }
      } catch (err) {
        alert("Erro ao deletar Pokemon", false);
      }
    }

    /**
     * Carrega os dados de um  Pokemon específico na tela de edição,
     * preenchendo os campos do form.
     */
    async function carregarPokemonEdit(id) {
      try {
        const res = await fetch(`${apiBase}/${id}`);
        if (!res.ok) throw new Error("Pokemon não encontrado");
        const pokemon = await res.json();
  
        hiddenId.value = pokemon.id;
        createForm.querySelector('input[name="name"]').value = pokemon.name;
        createForm.querySelector('input[name="tipo1"]').value = pokemon.tipo1;
        createForm.querySelector('input[name="tipo2"]').value = pokemon.tipo2;
        createForm.querySelector('input[name="level"]').value = pokemon.level;

        alert(`Editando pokemon ID ${pokemon.id}`);
      } catch (error) {
        alert(error.message, false);
      }
    }

    document.addEventListener("DOMContentLoaded", () => {
  
      // document.querySelectorAll(".editar").onclick = () => {
      //     const id = parseInt(prompt("Digite o ID do Pokémon a editar:"), 10);
      //     carregarPokemonEdit(id);
      // };
  
      // document.querySelector("excluir").onclick = () => {
      //     const id = parseInt(prompt("Digite o ID do Pokémon a excluir:"), 10);
      //     deletarPokemon(id);
      // };
  
      listarTodos();
  })

    // Evento de envio do formulário (criar/editar)
    createForm.addEventListener("submit", salvarPokemon);

    // Carrega todos os Pokemon ao iniciar a página
    listarPokemon();
  });
