//Bug de encriptação corrigido.


$.getJSON("/src/js/dbacess.json", function (data) {
    if(data.dba === 0) {
  
      $(function () {
        var socket = io();
  
  
        socket.emit('ondb', 1)
      
  
        setTimeout(function () {
    
  
          $.getJSON("/getdb", function (data) { //Puxa o banco de dados.
  
            const data2 = document.cookie; //Puxa todo valor que está nos cookies
            
            //Fiz isso aqui:
            //Porque eu não consegui usar o document.cookie.* então fiz essa gambiarra mesmo.
            const us2 = data2.split(";")[0]
            const userData2 = us2.split("=").pop();
            const token = window.localStorage.getItem("authentication")
            if (data[userData2]) {  //Verifica se o nome de usuario que está nos cookies existe no banco de dados.
              const dbtoken = data[userData2].password; //Se o usuario existir ele vai armazenar o token do usuario nesta variavel.
              if (token === dbtoken) { //Verifica se o token que está nos cookies é igual a do banco de dados.
                
                
                //Se for ele vai parar de rodar o script
                //Assim deixando o usuario entrar na pagina de cliente.
                socket.emit('ondb', 0) //controle de acesso.
                return; //Para o script.
              } else { //Se a senha for invalida ele vai redirecionar para a pagina de login falhado
                socket.emit('ondb', 0) //controle de acesso.
                window.location.replace("/errorlogin"); //Redireciona o usuario.
              }
            } else { //Se o usuario não existir ele vai redirecionar pra tela de login falhado.
                socket.emit('ondb', 0) //controle de acesso.
              window.location.replace("/errorlogin"); //Redireciona o usuario.
            }
          });
  
          
  
        }, 500); 
  
    
  
  
  
  
      })
  
  
    }
  
  
  });
  
  
  
  
  
  //Fim do codigo.