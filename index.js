require('dotenv').config();
const path = require('path');
const axios = require('axios');
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(process.env.TOKEN, { polling: true });

bot.onText(/\/start/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];

  bot.sendMessage(
    chatId,
    `
    This bot can help you to get the vehicle information based on the VIN. If you are new to the VIN BOT, please see /help.

    You can control this bot by sending these commands:
    
    /start - start
    /menu - menu
    /help - help
    /stop - stop
    `
  );
});

bot.onText(/\/menu/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];

  bot.sendMessage(
    chatId,
    `
    Please select the car information you want to check (command + VIN):

    You can control this bot by sending these commands:
    
    /1 - basic information
    /2 - interior options
    /3 - exterior options
    /4 - mechanical options
    /5 - additional options
    /6 - package options
    /7 - safety options
    /8 - interior colors
    /9 - exterior colors
    `
  );
});

bot.onText(/\/1 (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const VIN = match[1];
  const url = `https://auto.dev/api/vin/${VIN}?apikey=${process.env.API_KEY}`;
  axios
    .get(url)
    .then((response) => {
      console.log(response.data);
      if (response.data.status === 'NOT_FOUND') {
        bot.sendMessage(
          chatId,
          `Hello ${msg.from.first_name}!\n\nSomething went wrong: ${response.data.message}`
        );
      } else {
        bot.sendMessage(
          chatId,
          `Hello ${msg.from.first_name}!\n\nBelow is the requested information for the following VIN: ${VIN}`
        );
        if (response.data.engine.name !== 'Electric Drive') {
          bot.sendMessage(
            chatId,
            `Make: ${response.data.make.name} \nModel: ${response.data.model.name} \nEngine: ${response.data.engine.name} ${response.data.engine.compressorType} ${response.data.engine.configuration}${response.data.engine.cylinder} \nFuel: ${response.data.engine.fuelType} \nHorse Power: ${response.data.engine.horsepower} \nTorque: ${response.data.engine.torque} \nTransmission: ${response.data.transmission.numberOfSpeeds} Speed ${response.data.transmission.transmissionType} \nDrivetrain: ${response.data.drivenWheels} \nBase Price: $${response.data.price.baseMsrp} \nYear: ${response.data.years[0].year}`
          );
        } else {
          bot.sendMessage(
            chatId,
            `Make: ${response.data.make.name} \nModel: ${response.data.model.name} \nEngine: ${response.data.engine.name} \nFuel: ${response.data.engine.fuelType} \nHorse Power: ${response.data.engine.horsepower} \nTorque: ${response.data.engine.torque} \nTransmission: ${response.data.transmission.numberOfSpeeds} Speed ${response.data.transmission.transmissionType} \nDrivetrain: ${response.data.drivenWheels} \nBase Price: $${response.data.price.baseMsrp} \nYear: ${response.data.years[0].year}`
          );
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

bot.onText(/\/2 (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const VIN = match[1];
  const url = `https://auto.dev/api/vin/${VIN}?apikey=${process.env.API_KEY}`;
  axios
    .get(url)
    .then((response) => {
      let intoption = `Hello ${msg.from.first_name}! Below are the interior options: \n`;
      response.data.options[0].options.forEach((option) => {
        intoption += `${option.name}\n`;
      });
      bot.sendMessage(chatId, intoption);
    })
    .catch((error) => {
      console.log(error);
    });
});

bot.onText(/\/3 (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const VIN = match[1];
  const url = `https://auto.dev/api/vin/${VIN}?apikey=${process.env.API_KEY}`;
  axios
    .get(url)
    .then((response) => {
      let extoption = `Hello ${msg.from.first_name}! Below are the exterior options: \n`;
      response.data.options[1].options.forEach((option) => {
        extoption += `${option.name}\n`;
      });
      bot.sendMessage(chatId, extoption);
    })
    .catch((error) => {
      console.log(error);
    });
});

bot.onText(/\/4 (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const VIN = match[1];
  const url = `https://auto.dev/api/vin/${VIN}?apikey=${process.env.API_KEY}`;
  axios.get(url).then((response) => {
    let mecoption = `Hello ${msg.from.first_name}! Below are the mechanical options: \n`;
    response.data.options[2].options.forEach((option) => {
      mecoption += `${option.name}\n`;
    });
    bot.sendMessage(chatId, mecoption);
  });
});

bot.onText(/\/5 (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const VIN = match[1];
  const url = `https://auto.dev/api/vin/${VIN}?apikey=${process.env.API_KEY}`;
  axios.get(url).then((response) => {
    let addoption = `Hello ${msg.from.first_name}! Below are the additional options: \n`;
    response.data.options[3].options.forEach((option) => {
      addoption += `${option.name}\n`;
    });
    bot.sendMessage(chatId, addoption);
  });
});

bot.onText(/\/6 (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const VIN = match[1];
  const url = `https://auto.dev/api/vin/${VIN}?apikey=${process.env.API_KEY}`;
  axios.get(url).then((response) => {
    let pacoption = `Hello ${msg.from.first_name}! Below are the package options: \n`;
    response.data.options[4].options.forEach((option) => {
      pacoption += `${option.name}\n`;
    });
    bot.sendMessage(chatId, pacoption);
  });
});

bot.onText(/\/7 (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const VIN = match[1];
  const url = `https://auto.dev/api/vin/${VIN}?apikey=${process.env.API_KEY}`;
  axios.get(url).then((response) => {
    let safoption = `Hello ${msg.from.first_name}! Below are the safety options: \n`;
    response.data.options[5].options.forEach((option) => {
      safoption += `${option.name}\n`;
    });
    bot.sendMessage(chatId, safoption);
  });
});

bot.onText(/\/8 (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const VIN = match[1];
  const url = `https://auto.dev/api/vin/${VIN}?apikey=${process.env.API_KEY}`;
  axios.get(url).then((response) => {
    let intcolor = `Hello ${msg.from.first_name}! Below are the interior color options: \n`;
    console.log(response.data);
    response.data.colors[0].options.forEach((option) => {
      intcolor += `${option.name}\n`;
    });
    bot.sendMessage(chatId, intcolor);
  });
});

bot.onText(/\/9 (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const VIN = match[1];
  const url = `https://auto.dev/api/vin/${VIN}?apikey=${process.env.API_KEY}`;
  axios.get(url).then((response) => {
    let extcolor = `Hello ${msg.from.first_name}! Below are the exterior color options: \n`;
    response.data.colors[1].options.forEach((option) => {
      extcolor += `${option.name}\n`;
    });
    bot.sendMessage(chatId, extcolor);
  });
});

bot.onText(/^\/(?![1-9])(.*)/, (msg, match) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    'I am Sorry, I do not understand that command. Please type /help for the list of commands.'
  );
});

bot.on('polling_error', console.log);
