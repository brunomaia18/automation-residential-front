// Função para atualizar o status da lâmpada e configurar o botão


async function nomeandoButton(){
    const buttonLuz = document.getElementById('buttonLuz');
    const response = await fetch('http://189.107.98.120:9000/home/VerificandoEquipamentos/', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      });
      if (response.ok) {
        const data = await response.json();
        const api_status = data[0]["StatusLampada"];
        if (api_status == true){
            buttonLuz.innerHTML = "DESLIGAR"
        }
        else{
            buttonLuz.innerHTML = "LIGAR"   
        }
    
    }


}
  
  // Chame a função de inicialização quando o aplicativo for carregado

async function atualizarStatusLampada() {
    try {
        const response = await fetch('http://189.107.98.120:9000/home/VerificandoEquipamentos/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
            });
  
        if (response.ok) {
            const data = await response.json();
            const api_status = data[0]["StatusLampada"];
            // console.log('[API STATUS]', api_status);
            const botao = document.getElementById("buttonLuz");
            
            if (api_status == "true"){
                const requestBody = JSON.stringify({ "StatusLampada": "false" });

                const updateResponsetrue = await fetch(`http://189.107.98.120:9000/home/AtualizarEquipamentos/${1}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: requestBody,
                });
                if (updateResponsetrue.ok) {
                    console.log('Lâmpada desligada com sucesso.');
                    botao.innerHTML = "DESLIGADO"
                }
                
            }

            else if(api_status == "false"){
            
                const requestBody = JSON.stringify({ "StatusLampada": "true" });

                const updateResponsefalse = await fetch(`http://189.107.98.120:9000/home/AtualizarEquipamentos/${1}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: requestBody,
                });
                if (updateResponsefalse.ok) {
                    console.log('LAMPADA LIGADA COM SUCESSO.');
                    botao.innerHTML = "LIGADO"
                }
                
            }
        
        } else {
            console.error('Falha na consulta da API:', response.statusText);
        }
        
    } catch (error) {
      console.error('Erro ao atualizar o status da lâmpada:', error);
    }
  }


async function onOffSensor(){
    try {
        const response = await fetch('http://189.107.98.120:9000/home/VerificandoEquipamentos/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
            });
  
        if (response.ok) {
            const data = await response.json();
            const api_status = data[0]["AtivacaoSensorMovimento"];
            // console.log('[API STATUS]', api_status);
            const botao = document.getElementById("buttonPIR");
            
            if (api_status == "true"){
                const requestBody = JSON.stringify({ "AtivacaoSensorMovimento": "false" });

                const updateResponsetrue = await fetch(`http://189.107.98.120:9000/home/AtualizarEquipamentos/${1}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: requestBody,
                });
                if (updateResponsetrue.ok) {
                    console.log('SENSOR desligado com sucesso.');
                    botao.innerHTML = "DESLIGADO"
                }
                
            }

            else if(api_status == "false"){
            
                const requestBody = JSON.stringify({ "AtivacaoSensorMovimento": "true" });

                const updateResponsefalse = await fetch(`http://189.107.98.120:9000/home/AtualizarEquipamentos/${1}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: requestBody,
                });
                if (updateResponsefalse.ok) {
                    console.log('SENSOR LIGADO COM SUCESSO.');
                    botao.innerHTML = "LIGADO"
                }
                
            }
        
        } else {
            console.error('Falha na consulta da API:', response.statusText);
        }
        
    } catch (error) {
      console.error('Erro ao atualizar o status da lâmpada:', error);
    }
}


async function capturarDados(){
    const requestBody = JSON.stringify({ "CapturarMedidaCaixa": "true" });

    const updateResponsetrue = await fetch(`http://189.107.98.120:9000/home/AtualizarEquipamentos/${1}`, {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json',
    },
    body: requestBody,
    });
    if (updateResponsetrue.ok) {
        
        console.log("estou true")
        const requesBodyFalse = JSON.stringify({ "CapturarMedidaCaixa": "false" });
        await delay(3000);
        const updateResponsefalse = await fetch(`http://189.107.98.120:9000/home/AtualizarEquipamentos/${1}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: requesBodyFalse,
        });
        if (updateResponsefalse.ok) {
            console.log("estou false")
            const bottao = document.getElementById("alturaAgua")

            const response = await fetch('http://189.107.98.120:9000/hidro/PorcentagemCaixa/', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
                });
      
            if (response.ok) {
                const data = await response.json();
                const api_status = data[0]["valorOcupadoAgua"];

            bottao.innerHTML = api_status
            }
        }
    }

}

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  window.addEventListener('load', nomeandoButton);