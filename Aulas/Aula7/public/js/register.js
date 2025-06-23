const form = document.getElementById('cadastro');
form.addEventListener("submit", async (e) =>{
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try{
        const res = await fetch('http://localhost:3000/api/users',{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
        if(res.ok){
            alert("Usuario criado com sucesso");
        }else{
            const data = res.json();
            alert(data.message || "Erro ao registrar usuario")
        }
    }catch(error){
        alert("Erro bizonho!")
        console.error("Erro ao criar usuario:", error)
    }
})