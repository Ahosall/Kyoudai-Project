let result = collected.first().content
                      
if (result.toLowerCase() == ['Sim', 'S', 'Ss']) {
  init();
} else if (result.toLowerCase() == ['Não', 'N', 'Nn']) {
  message.channel.send('Certo então ... *byee*~');
} else {
  message.channel.send('Bom ... eu acho q não neh ? ... *byee*~');
}


message.channel
  .send(`Envia uma mensagem`)
  .then(async msg => {		
    message.channel.awaitMessages(filter, {max: 1, time: 60000, errors: ["time"]})
     .then(collected => {
       let result = collected.first().content
       
       if (result.toLowerCase() == ['Sim', 'S', 'Ss']) {
         // Executa
       } else if (result.toLowerCase() == ['Não', 'N', 'Nn']) {
         // Executa
       } else {
         // Executa
       }
    }).catch((e) => {
      console.log(err)
    });
  });