const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");

// Configurações de estilo
const styles = {
  title: chalk.cyan.bold,
  success: chalk.green.bold,
  warning: chalk.yellow.bold,
  error: chalk.red.bold,
  info: chalk.blue.bold,
  highlight: chalk.magenta.bold,
  text: chalk.white,
};

// Função para exibir título estilizado
function showTitle() {
  console.clear();
  console.log(
    styles.title(
      figlet.textSync("Terminal Futurista", { horizontalLayout: "full" })
    )
  );
}

// Função para simular um delay
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Função: Hackear servidor fictício
async function hackServer() {
  console.clear();
  console.log(styles.warning("Conectando ao servidor..."));
  await delay(2000);

  console.log(styles.success("Acesso concedido!"));
  console.log("Informações do servidor:");
  console.log(
    styles.info("IP: 192.168.0.42\nStatus: Online\nSegurança: Vulnerável")
  );

  await delay(1000);
  console.log(styles.warning("Dados sendo extraídos..."));
  await delay(3000);

  console.log(styles.success("Hack concluído com sucesso!"));
  await delay(2000);
  await mainMenu();
}

// Função: Resolver puzzle
async function solvePuzzle() {
  console.clear();
  console.log(styles.highlight("Puzzle: Resolva o enigma abaixo!"));

  console.log(
    styles.text(
      "Eu falo sem boca e ouço sem ouvidos. Não tenho corpo, mas ganho vida com o vento. O que sou eu?"
    )
  );

  const { answer } = await inquirer.prompt([
    {
      type: "input",
      name: "answer",
      message: "Digite sua resposta:",
    },
  ]);

  if (answer.toLowerCase() === "eco") {
    console.log(styles.success("Resposta correta!"));
  } else {
    console.log(styles.error("Resposta errada. Tente novamente mais tarde."));
  }

  await delay(2000);
  await mainMenu();
}

// Função: Gerenciar inventário
async function manageInventory() {
  console.clear();
  let inventory = ["Chip Neural", "Chave Mestra", "Rastreamento GPS"];

  console.log(styles.info("Inventário atual:"));
  inventory.forEach((item, index) => {
    console.log(`${index + 1}. ${item}`);
  });

  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "O que deseja fazer?",
      choices: ["Adicionar item", "Remover item", "Voltar"],
    },
  ]);

  if (action === "Adicionar item") {
    const { newItem } = await inquirer.prompt([
      {
        type: "input",
        name: "newItem",
        message: "Digite o nome do novo item:",
      },
    ]);

    inventory.push(newItem);
    console.log(styles.success(`Item "${newItem}" adicionado ao inventário!`));
  } else if (action === "Remover item") {
    const { itemToRemove } = await inquirer.prompt([
      {
        type: "list",
        name: "itemToRemove",
        message: "Selecione o item para remover:",
        choices: inventory,
      },
    ]);

    inventory = inventory.filter((item) => item !== itemToRemove);
    console.log(styles.error(`Item "${itemToRemove}" removido do inventário!`));
  }

  await delay(2000);
  await mainMenu();
}

// Menu principal
async function mainMenu() {
  showTitle();

  const choices = [
    "Hackear servidor fictício",
    "Resolver puzzle",
    "Gerenciar inventário",
    "Sair",
  ];

  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "O que você deseja fazer?",
      choices,
    },
  ]);

  switch (action) {
    case choices[0]:
      await hackServer();
      break;
    case choices[1]:
      await solvePuzzle();
      break;
    case choices[2]:
      await manageInventory();
      break;
    case choices[3]:
      console.log(styles.success("Até a próxima, operador!"));
      process.exit();
  }
}

// Inicialização
(async () => {
  await mainMenu();
})();