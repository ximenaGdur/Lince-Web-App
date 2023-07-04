/* eslint-disable class-methods-use-this */
/** ****************** Imports ******************* */

// Including ws module.
const WebSocket = require('ws');

// Including fs module.
const fs = require('fs');

// eslint-disable-next-line import/extensions
const { serverIp, serverPort } = require('./configServer.js');

/** ****************** Creating constants for script ******************* */
class Server {
  /**
   * Initializing all class atributes.
   */
  constructor() {
    // Next id for room
    this.nextRoomCode = 74512;
    // Maximum number of clients allowed in webpage
    this.maximumClientAmount = 20;
    // Route where top 3 txt is located
    this.filePath = 'top3.txt';

    // Dictionary that stores all rooms and their information
    this.availableRooms = new Map();
    // Dictionary with player scores in order
    this.playerRankingPorRoom = new Map();
    // Dictionary with all available avatar options
    this.avatarRoutes = [
      { description: 'Oso', route: 'bear.png' },
      { description: 'Pollo', route: 'chicken.png' },
      { description: 'Elefante', route: 'elephant.png' },
      { description: 'Erizo', route: 'hedgehog.png' },
      { description: 'Hipopótamo', route: 'hippo.png' },
      { description: 'Koala', route: 'koala.png' },
      { description: 'León', route: 'lion.png' },
      { description: 'Llama', route: 'llama.png' },
      { description: 'Suricata', route: 'meerkat.png' },
      { description: 'Mono', route: 'monkey.png' },
      { description: 'Panda', route: 'panda.png' },
      { description: 'Lora', route: 'parrot.png' },
      { description: 'Pinguino', route: 'penguin.png' },
      { description: 'Polar', route: 'polarBear.png' },
      { description: 'Conejo', route: 'rabbit.png' },
      { description: 'Foca', route: 'seaLion.png' },
      { description: 'Serpiente', route: 'snake.png' },
      { description: 'Tigre', route: 'tiger.png' },
      { description: 'Tortuga', route: 'turtle.png' },
      { description: 'Comadreja', route: 'weasel.png' },
    ];
    // Dictionary with possible colors.
    this.cardColors = ['#E6C700', '#2EB600', '#006DE2', '#DA0012'];
    // Dictionary with all available card options
    this.cardRoutes = [
      { description: 'Sueter', route: 'hoodie.png' },
      { description: 'Pantaloncillo', route: 'shorts.png' },
      { description: 'Camarón', route: 'shrimp.png' },
      { description: 'Zanahoria', route: 'carrot.png' },
      { description: 'Avión', route: 'airplane.png' },
      { description: 'Globo', route: 'balloon.png' },
      { description: 'Bicicleta', route: 'bike.png' },
      { description: 'Bote', route: 'boat.png' },
      { description: 'Excavadora', route: 'bulldozer.png' },
      { description: 'Bus', route: 'bus.png' },
      { description: 'Teléferico', route: 'cableCar.png' },
      { description: 'Carro', route: 'car.png' },
      { description: 'Grúa', route: 'crane.png' },
      { description: 'Helicoptero', route: 'chopper.png' },
      { description: 'Hoverboard', route: 'hoverboard.png' },
      { description: 'Moto', route: 'motorcycle.png' },
      { description: 'Pogo', route: 'pogo.png' },
      { description: 'Cohete', route: 'rocket.png' },
      { description: 'Scooter', route: 'scooter.png' },
      { description: 'Barco', route: 'ship.png' },
      { description: 'Skateboard', route: 'skateboard.png' },
      { description: 'Patines', route: 'skates.png' },
      { description: 'Nave', route: 'spaceship.png' },
      { description: 'Tractor', route: 'tractor.png' },
      { description: 'Tren', route: 'train.png' },
      { description: 'Triciclo', route: 'tricycle.png' },
      { description: 'Camión', route: 'truck.png' },
      { description: 'Uniciclo', route: 'unicycle.png' },
      { description: 'Carreta', route: 'wagon.png' },
      { description: 'Pájaro', route: 'bird.png' },
      { description: 'Gato', route: 'cat.png' },
      { description: 'Camaleón', route: 'chameleon.png' },
      { description: 'Cangrejo', route: 'crab.png' },
      { description: 'Delfín', route: 'dolphin.png' },
      { description: 'Elefante', route: 'elephant.png' },
      { description: 'Zorro', route: 'fox.png' },
      { description: 'Jirafa', route: 'giraffe.png' },
      { description: 'Erizo', route: 'hedgehog.png' },
      { description: 'Gallina', route: 'hen.png' },
      { description: 'Caballo', route: 'horse.png' },
      { description: 'Medusa', route: 'jellyfish.png' },
      { description: 'Canguro', route: 'kangaroo.png' },
      { description: 'Koala', route: 'koala.png' },
      { description: 'Mono', route: 'monkey.png' },
      { description: 'Ratón', route: 'mouse.png' },
      { description: 'Cerdo', route: 'pig.png' },
      { description: 'Conejo', route: 'rabbit.png' },
      { description: 'Escorpión', route: 'scorpion.png' },
      { description: 'Hipocampo', route: 'seahorse.png' },
      { description: 'Tiburón', route: 'shark.png' },
      { description: 'Perezoso', route: 'sloth.png' },
      { description: 'Ardilla', route: 'squirrel.png' },
      { description: 'Tortuga', route: 'turtle.png' },
      { description: 'Ballena', route: 'whale.png' },
      { description: 'Frijoles', route: 'beans.png' },
      { description: 'Brocoli', route: 'broccoli.png' },
      { description: 'Carne', route: 'meat.png' },
      { description: 'Hongo', route: 'mushroom.png' },
      { description: 'Helado', route: 'iceCream.png' },
      { description: 'Espaguetti', route: 'spaguetti.png' },
      { description: 'Hamburguesa', route: 'burger.png' },
      { description: 'Huevo', route: 'friedEgg.png' },
      { description: 'Manzana', route: 'apple.png' },
      { description: 'Patatas', route: 'frenchFries.png' },
      { description: 'Pepino', route: 'cucumber.png' },
      { description: 'Pera', route: 'pear.png' },
      { description: 'Pescado', route: 'friedFish.png' },
      { description: 'Pollo', route: 'chickenLeg.png' },
      { description: 'Pizza', route: 'pizza.png' },
      { description: 'Platanos', route: 'banana.png' },
      { description: 'Queso', route: 'cheese.png' },
      { description: 'Ramen', route: 'ramen.png' },
      { description: 'Sushi', route: 'sushi.png' },
      { description: 'Sandía', route: 'watermelon.png' },
      { description: 'Atún', route: 'tuna.png' },
      { description: 'Tomate', route: 'tomato.png' },
      { description: 'Uvas', route: 'grapes.png' },
      { description: 'Blusón', route: 'dressShirt.png' },
      { description: 'Tacones', route: 'heels.png' },
      { description: 'Overoles', route: 'overall.png' },
      { description: 'Sandalias', route: 'sandals.png' },
      { description: 'Pantalones', route: 'pants.png' },
      { description: 'Blusa', route: 'shirt.png' },
      { description: 'Camiseta', route: 'jersey.png' },
      { description: 'Anteojos', route: 'glasses.png' },
      { description: 'Traje', route: 'suit.png' },
      { description: 'Medias', route: 'socks.png' },
      { description: 'Gorro', route: 'beanie.png' },
      { description: 'Sombrero', route: 'hat.png' },
      { description: 'Tenis', route: 'sneakers.png' },
      { description: 'Vestido', route: 'dress.png' },
      { description: 'Enterizo', route: 'onesie.png' },
      { description: 'Enagua', route: 'skirt.png' },
      { description: 'Camisa', route: 'tshirt.png' },
      { description: 'Bufanda', route: 'scarf.png' },
      { description: 'Guantes', route: 'gloves.png' },
      { description: 'Lazo', route: 'hairBow.png' },
      { description: 'Prensa', route: 'hairClip.png' },
      { description: 'Leggings', route: 'legging.png' },
      { description: 'Reloj', route: 'watch.png' },
      { description: 'Dona', route: 'donut.png' },
      { description: 'Ensalada', route: 'salad.png' },
      { description: 'Kebab', route: 'kebab.png' },
      { description: 'FriedChicken', route: 'friedChicken.png' },
      { description: 'Taco', route: 'taco.png' },
      { description: 'Langosta', route: 'lobster.png' },
      { description: 'Fresa', route: 'strawberry.png' },
      { description: 'Pitahaya', route: 'dragonFruit.png' },
      { description: 'Naranja', route: 'orange.png' },
      { description: 'Piña', route: 'pineapple.png' },
      { description: 'Aguacate', route: 'avocado.png' },
      { description: 'Kiwi', route: 'kiwi.png' },
      { description: 'Coco', route: 'coconut.png' },
      { description: 'Limon', route: 'lemon.png' },
      { description: 'Calabaza', route: 'pumpkin.png' },
      { description: 'Almendra', route: 'almond.png' },
      { description: 'Repollo', route: 'cabbage.png' },
      { description: 'Maiz', route: 'corn.png' },
      { description: 'Ajo', route: 'garlic.png' },
      { description: 'Coliflor', route: 'cauliflower.png' },
      { description: 'Papa', route: 'potato.png' },
      { description: 'Cebolla', route: 'onion.png' },
      { description: 'Tamarindo', route: 'tamarind.png' },
      { description: 'Mongostino', route: 'mangosteen.png' },
      { description: 'Albaricoque', route: 'apricot.png' },
      { description: 'Pulpo', route: 'octopus.png' },
      { description: 'Rana', route: 'frog.png' },
      { description: 'Búho', route: 'owl.png' },
      { description: 'Rata', route: 'rat.png' },
      { description: 'Caracol', route: 'snail.png' },
      { description: 'Murcielago', route: 'bat.png' },
      { description: 'Camello', route: 'camel.png' },
      { description: 'Lora', route: 'parrot.png' },
      { description: 'Grillo', route: 'cricket.png' },
      { description: 'Pavo', route: 'turkey.png' },
      { description: 'Flamenco', route: 'flamingo.png' },
      { description: 'Hipopotamo', route: 'hippopotamus.png' },
      { description: 'Pato', route: 'duck.png' },
      { description: 'Panda', route: 'panda.png' },
      { description: 'Vaca', route: 'cow.png' },
      { description: 'Unicornio', route: 'unicorn.png' },
      { description: 'Pez', route: 'fish.png' },
      { description: 'Tigre', route: 'tiger.png' },
      { description: 'Mariposa', route: 'butterfly.png' },
      { description: 'Babuino', route: 'baboon.png' },
      { description: 'Lobo', route: 'wolf.png' },
      { description: 'EstrellaDeMar', route: 'starfish.png' },
      { description: 'Perro', route: 'dog.png' },
      { description: 'Foca', route: 'seal.png' },
      { description: 'Pinguino', route: 'penguin.png' },
      { description: 'Instagram', route: 'instagram.png' },
      { description: 'Gmail', route: 'gmail.png' },
      { description: 'YouTube', route: 'youtube.png' },
      { description: 'Facebook', route: 'facebook.png' },
      { description: 'Telegram', route: 'telegram.png' },
      { description: 'Whatsapp', route: 'whatsapp.png' },
      { description: 'TikTok', route: 'tiktok.png' },
      { description: 'Google', route: 'google.png' },
      { description: 'PlayStation', route: 'playstation.png' },
      { description: 'Lego', route: 'lego.png' },
      { description: 'Twitter', route: 'twitter.png' },
      { description: 'Snapchat', route: 'snapchat.png' },
      { description: 'Hp', route: 'hp.png' },
      { description: 'Xiaomi', route: 'xiaomi.png' },
      { description: 'Android', route: 'android.png' },
      { description: 'GrandTheftAuto', route: 'grandTheftAuto.png' },
      { description: 'Windows', route: 'windows.png' },
      { description: 'AdobeIllustrator', route: 'adobeIllustrator.png' },
      { description: 'Dropbox', route: 'dropbox.png' },
      { description: 'Discord', route: 'discord.png' },
      { description: 'Reddit', route: 'reddit.png' },
      { description: 'Spotify', route: 'spotify.png' },
      { description: 'LG', route: 'lg.png' },
      { description: 'Konami', route: 'konami.png' },
      { description: 'Dell', route: 'dell.png' },
      { description: 'Linkedin', route: 'linkedin.png' },
      { description: 'Motorola', route: 'motorola.png' },
      { description: 'GoogleDrive', route: 'googleDrive.png' },
      { description: 'Samsung', route: 'samsung.png' },
      { description: 'Huawei', route: 'huawei.png' },
      { description: 'EASports', route: 'EASports.png' },
      { description: 'GoogleMaps', route: 'googleMaps.png' },
      { description: 'Sega', route: 'sega.png' },
      { description: 'AMD', route: 'amd.png' },
      { description: 'Twitch', route: 'twitch.png' },
      { description: 'Skype', route: 'skype.png' },
      { description: 'GoogleTranslate', route: 'googleTranslate.png' },
      { description: 'Wikipedia', route: 'wikipedia.png' },
      { description: 'Paypal', route: 'paypal.png' },
      { description: 'SONY', route: 'sony.png' },
      { description: 'Ubisoft', route: 'ubisoft.png' },
      { description: 'Pinterest', route: 'pinterest.png' },
      { description: 'Tinder', route: 'tinder.png' },
      { description: 'Nintendo', route: 'nintendo.png' },
      { description: 'Philips', route: 'philips.png' },
      { description: 'Cisco', route: 'cisco.png' },
      { description: 'IBM', route: 'ibm.png' },
      { description: 'NVIDIA', route: 'nvidia.png' },
      { description: 'Logitech', route: 'logitech.png' },
      { description: 'Intel', route: 'intel.png' },
    ];

    // Binding methods to the class instance
    this.validateCode = this.validateCode.bind(this);
    this.addToRoom = this.addToRoom.bind(this);
    this.createRoom = this.createRoom.bind(this);
    this.getWaitingRoom = this.getWaitingRoom.bind(this);
    this.setCardsPerRound = this.setCardsPerRound.bind(this);
    this.setMaxTime = this.setMaxTime.bind(this);
    this.setCardsPerPlayer = this.setCardsPerPlayer.bind(this);
    this.toggleAdp1a = this.toggleAdp1a.bind(this);
    this.toggleAdp1b = this.toggleAdp1b.bind(this);
    this.toggleAdp1c = this.toggleAdp1c.bind(this);
    this.toggleAdp2a = this.toggleAdp2a.bind(this);
    this.toggleAdp2b = this.toggleAdp2b.bind(this);
    this.toggleAdp2c = this.toggleAdp2c.bind(this);
    this.toggleAdp3a = this.toggleAdp3a.bind(this);
    this.toggleAdp3b = this.toggleAdp3b.bind(this);
    this.toggleAdp3c = this.toggleAdp3c.bind(this);
    this.startGame = this.startGame.bind(this);
    this.getGameRoom = this.getGameRoom.bind(this);
    this.checkMatch = this.checkMatch.bind(this);
    this.removePlayer = this.removePlayer.bind(this);
    this.finishGame = this.finishGame.bind(this);
  }

  /** ******************** Functions used on script ********************* */

  /**
   * Creates new player and adds it to the room.
   * @param Boolean isHost Whether player is host or not.
   * @returns New player Map with relevant information.
   */
  createPlayer(isHost) {
    const newPlayer = new Map([
      ['avatar', null],
      ['points', 0],
      ['host', isHost],
    ]);
    return newPlayer;
  }

  /**
   * Assigns random avatar to player.
   * @param {Number} code Room code where player will be placed.
   * @returns Randomly generated avatar.
   */
  selectAvatar(code) {
    let playerAvatar = null;
    const roomInfo = this.availableRooms.get(code);
    if (roomInfo && roomInfo.has('players')) {
      const playersMap = roomInfo.get('players');
      if (playersMap) {
        const amountPlayers = Array.from(playersMap.keys()).length;
        if (amountPlayers >= 0 && amountPlayers < 20) {
          playerAvatar = this.avatarRoutes[amountPlayers];
        }
      }
    }
    return playerAvatar;
  }

  /**
   * Creating playerMap with given information.
   * @param {Number} roomCode Code of room.
   * @param {WebSocket} socket Socket to specific client.
   * @param {String} isHost Whether player is host.
   * @returns Created player Map.
   */
  createPlayerMap(roomCode, socket, isHost) {
    const newPlayer = this.createPlayer(isHost);
    newPlayer.set('avatar', this.selectAvatar(roomCode));
    const playerMap = new Map([
      ['playerSocket', socket],
      ['playerInfo', newPlayer],
    ]);
    return playerMap;
  }

  /**
   * Set default game configuration every time a game is created.
   */
  setDefaultGameConfiguration() {
    const configurations = new Map();
    configurations.set('maxTime', 20);
    configurations.set('cardsPerPlayer', 1);
    configurations.set('cardsPerRound', 100);
    configurations.set('adaptation1a', false);
    configurations.set('adaptation1b', false);
    configurations.set('adaptation1c', true);
    configurations.set('adaptation2a', false);
    configurations.set('adaptation2b', false);
    configurations.set('adaptation2c', true);
    configurations.set('adaptation3a', false);
    configurations.set('adaptation3b', false);
    configurations.set('adaptation3c', true);
    return configurations;
  }

  /**
   * Creates room maps that store player information.
   * @param {String} playerNickname Player's nickname.
   * @param {Map} playerMap Player map with their information.
   * @param {Integer} roomCode Created room code.
   * @returns
   */
  createRoomMap(roomCode) {
    let success = false;
    const playerMap = new Map();
    const roomMap = new Map([
      ['hasStarted', false],
      ['config', this.setDefaultGameConfiguration()],
      ['players', playerMap],
    ]);
    if (roomMap) {
      this.availableRooms.set(roomCode, roomMap);
      success = true;
    }
    return success;
  }

  /**
   * Sends the room code to the client who created a game.
   * @param {WebSocket} socket Client socket.
   * @param {String} roomCode Created room's code.
   */
  sendRoomCode(socket, roomCode) {
    const newMessage = {
      type: 'handleRoomCode',
      sessionCode: roomCode,
    };
    socket.send(JSON.stringify(newMessage));
  }

  /**
   * Returns player map with given nickname, in given room.
   * @param {Number} code Code of room.
   * @param {String} nickname Nickname of player.
   * @returns Player map with their information.
   */
  getPlayersMap(code) {
    let players = null;
    if (code && this.availableRooms.has(code)) {
      const roomInfo = this.availableRooms.get(code);
      if (roomInfo && roomInfo.has('players')) {
        players = roomInfo.get('players');
      }
    }
    return players;
  }

  /**
   *
   * @param {*} roomCode
   * @param {*} playerNickname
   * @param {*} playerMap
   */
  addPlayerToMaps(roomCode, playerNickname, playerMap) {
    const players = this.getPlayersMap(roomCode);
    if (players) {
      // Adding player to main map
      players.set(playerNickname, playerMap);
      // Adding to aditional map for easy access
      if (playerMap.get('playerInfo').has('points')) {
        const playerPoints = playerMap.get('playerInfo').get('points');
        const playerRanks = { nickname: playerNickname, points: playerPoints };
        const roomList = this.playerRankingPorRoom.get(roomCode);
        if (roomList) {
          roomList.push(playerRanks);
        }
      }
    }
  }

  /**
   * Creates new room for host.
   * @param {WebSocket} socket Socket to specific client.
   * @param {Object} message Message received from client.
   */
  createRoom(socket, message) {
    const playerNickname = message.nickname;
    const roomCode = String(this.nextRoomCode);
    this.nextRoomCode += 1;

    if (playerNickname && roomCode) {
      if (this.createRoomMap(roomCode) === true) {
        const playerMap = this.createPlayerMap(roomCode, socket, true);
        if (playerMap) {
          const roomList = [];
          this.playerRankingPorRoom.set(roomCode, roomList);
          this.addPlayerToMaps(roomCode, playerNickname, playerMap);
          // Sending room code
          this.sendRoomCode(socket, roomCode);
        }
      }
    }
  }

  /**
   * Assigns avatar and stores guest in room.
   * @param {WebSocket} socket Socket of player that wants to join room.
   * @param {Object} message Message sent by client.
   */
  addToRoom(socket, message) {
    const playerNickname = message.nickname;
    const roomCode = message.sessionCode;

    if (playerNickname && roomCode) {
      const playersMap = this.getPlayersMap(roomCode);
      if (playersMap) {
        const playerAmount = playersMap.keys.length;
        if (playerAmount <= this.maximumClientAmount) {
          // Creating player map
          const playerMap = this.createPlayerMap(roomCode, socket, false);
          if (playerMap) {
            this.addPlayerToMaps(roomCode, playerNickname, playerMap);
            // Sending room code
            this.sendRoomCode(socket, roomCode);
          }
        }
      }
    }
  }

  /**
   * Checks if room with given code exists.
   * @param {WebSocket} socket Player socket.
   * @param {Object} messageReceived Message player sent.
   */
  validateCode(socket, messageReceived) {
    let codeIsValid = false;
    let hasGameStarted = false;
    if (socket && messageReceived) {
      const receivedCode = messageReceived.sessionCode;
      const roomInfo = this.availableRooms.get(receivedCode);
      if (roomInfo) {
        if (roomInfo) {
          codeIsValid = true;
          hasGameStarted = roomInfo.get('hasStarted');
        }
      }
    }
    const newMessage = {
      type: 'handleCodeValidation',
      isValid: codeIsValid,
      hasStarted: hasGameStarted,
    };
    socket.send(JSON.stringify(newMessage));
  }

  /**
   * Getting top 3 from file and sending it to client.
   * @param {WebSocket} socket Socket of player requesting waiting room.
   */
  getTop3(socket) {
    const playerRanks = [];
    fs.readFile(this.filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        this.addTop3ToArray(playerRanks, data);
        const listString = this.createStringFromList(playerRanks);
        if (listString) {
          const newMessage = {
            type: 'handleTop3',
            players: listString,
          };
          socket.send(JSON.stringify(newMessage));
        }
      }
    });
  }

  /**
   * Figures out if player exists in room.
   * @param {Number} code Code of specific room.
   * @param {String} nickname Nickname of specific player.
   * @returns Boolean value indicating if player exists.
   */
  playerExists(code, nickname) {
    let exists = false;
    if (this.availableRooms.has(code)) {
      const roomInfo = this.availableRooms.get(code);
      if (roomInfo.has('players')) {
        const playersMap = roomInfo.get('players');
        if (playersMap.has(nickname)) {
          exists = true;
        }
      }
    }
    return exists;
  }

  /**
   * Orders array by points.
   * @param {Number} roomCode Unique room code.
   */
  orderPlayersByPoints(roomCode) {
    const roomPlayers = this.playerRankingPorRoom.get(roomCode);
    if (roomPlayers) {
      roomPlayers.sort((a, b) => b.points - a.points);
    }
    return roomPlayers;
  }

  /**
   * Converts Map object into a string in order to send it.
   * @param {Map} playerMap Map object with player's information.
   * @param {Array} playerRanks Array with players ordered by highest score.
   * @returns String with all player information.
   */
  createPlayerStringMap(playerMap, playerRanks) {
    const playerStringMap = {};
    if (playerMap) {
      for (let playerIndex = 0; playerIndex < playerRanks.length; playerIndex += 1) {
        const playerRankMap = playerRanks[playerIndex];
        if (playerRankMap) {
          const playerName = playerRankMap.nickname;
          const playerData = playerMap.get(playerName);
          if (playerData) {
            const playerInfo = playerData.get('playerInfo');
            if (playerInfo) {
              playerStringMap[playerName] = {
                avatar: playerInfo.get('avatar'),
                points: playerInfo.get('points'),
                host: playerInfo.get('host'),
                position: playerIndex + 1,
              };
            }
          }
        }
      }
    }
    return JSON.stringify(playerStringMap);
  }

  /**
   * Broadcasts message to everyone but one player.
   * @param {Object} message Message to be broadcasted.
   * @param {Number} roomCode Room that contains players to which message will be sent.
   * @param {String} excludedPlayerNickname Nickname of player that will be excluded.
   */
  broadcastToOthers(message, roomCode, excludedPlayerNickname) {
    const roomInfo = this.availableRooms.get(roomCode);
    const playersMap = roomInfo.get('players');
    playersMap.forEach((playerData, playerNickname) => {
      if (playerNickname !== excludedPlayerNickname) {
        const socket = playerData.get('playerSocket');
        socket.send(JSON.stringify(message));
      }
    });
  }

  /**
   * Adds player to list for other players in room.
   * @param {String} playerName Player name.
   * @param {Number} roomCode Room code.
   * @param {String} messageType Tipo de mensaje.
   */
  sendUpdatedPlayers(playerName, roomCode) {
    const roomInfo = this.availableRooms.get(roomCode);
    const playersMap = roomInfo.get('players');

    const playerRanks = this.orderPlayersByPoints(roomCode);
    const newMessage = {
      type: 'handlePlayerList',
      players: this.createPlayerStringMap(playersMap, playerRanks),
    };
    this.broadcastToOthers(newMessage, roomCode, playerName);
  }

  /**
   * Converts Map object into a string in order to send it.
   * @param {Map} playerMap Map object with room's configuration.
   * @returns String with all room's configuration.
   */
  createConfigStringMap(roomConfig) {
    const configStringMap = {};
    if (roomConfig) {
      configStringMap.adaptation1a = roomConfig.get('adaptation1a');
      configStringMap.adaptation1b = roomConfig.get('adaptation1b');
      configStringMap.adaptation1c = roomConfig.get('adaptation1c');
      configStringMap.adaptation2a = roomConfig.get('adaptation2a');
      configStringMap.adaptation2b = roomConfig.get('adaptation2b');
      configStringMap.adaptation2c = roomConfig.get('adaptation2c');
      configStringMap.adaptation3a = roomConfig.get('adaptation3a');
      configStringMap.adaptation3b = roomConfig.get('adaptation3b');
      configStringMap.adaptation3c = roomConfig.get('adaptation3c');
      configStringMap.maxTime = roomConfig.get('maxTime');
      configStringMap.cardsPerPlayer = roomConfig.get('cardsPerPlayer');
      configStringMap.cardsPerRound = roomConfig.get('cardsPerRound');
    }
    return JSON.stringify(configStringMap);
  }

  /**
   * Sets amount of card per round to guests in room.
   * @param {WebSocket} socket Socket of player requesting waiting room.
   * @param {Object} message Message sent by client.
   */
  getWaitingRoom(socket, message) {
    const playerNickname = message.nickname;
    const roomCode = message.sessionCode;

    if (playerNickname && roomCode) {
      if (this.playerExists(roomCode, playerNickname) === true) {
        const roomInfo = this.availableRooms.get(roomCode);
        const roomConfig = roomInfo.get('config');
        const playersMap = roomInfo.get('players');
        const playerMap = playersMap.get(playerNickname);
        const playerInfo = playerMap.get('playerInfo');

        playerMap.set('playerSocket', socket);
        this.sendUpdatedPlayers(playerNickname, roomCode, 'handlePlayerList');

        // Sending player personalized waiting room.
        const playerRanks = this.orderPlayersByPoints(roomCode);
        const newMessage = {
          type: 'handleWaitingRoom',
          isHost: playerInfo.get('host'),
          players: this.createPlayerStringMap(playersMap, playerRanks),
          config: this.createConfigStringMap(roomConfig),
        };
        socket.send(JSON.stringify(newMessage));
      }
    }
  }

  /**
   * Sets amount of card per round to guests in room.
   * @param {WebSocket} socket Is not used, but added for consistency.
   * @param {Object} message Message sent by client.
   */
  setCardsPerRound(socket, message) {
    const roomCode = message.sessionCode;
    const playerNickname = message.nickname;
    const cards = message.cardsPerRound;
    if (roomCode && playerNickname && cards) {
      if (this.availableRooms.has(roomCode)) {
        const roomMap = this.availableRooms.get(roomCode);
        const roomConfig = roomMap.get('config');
        if (roomConfig) {
          // Storing configuration
          roomConfig.set('cardsPerRound', cards);
          // Sends to other players in room.
          const newMessage = {
            type: 'handleCardsPerRound',
            cardsPerRound: cards,
          };
          this.broadcastToOthers(newMessage, roomCode, playerNickname);
        }
      }
    }
  }

  /**
   * Sets maximum time per round to guests in room.
   * @param {WebSocket} socket Is not used, but added for consistency.
   * @param {Object} message Message sent by client.
   */
  setMaxTime(socket, message) {
    const roomCode = message.sessionCode;
    const playerNickname = message.nickname;
    const time = message.maxTime;

    if (roomCode && playerNickname && time) {
      if (this.availableRooms.has(roomCode)) {
        const roomMap = this.availableRooms.get(roomCode);
        const roomConfig = roomMap.get('config');
        if (roomConfig) {
          // Storing configuration
          roomConfig.set('maxTime', time);

          // Sends to other players in room.
          const newMessage = {
            type: 'handleMaxTime',
            maxTime: time,
          };
          this.broadcastToOthers(newMessage, roomCode, playerNickname);
        }
      }
    }
  }

  /**
   * Sets amount of card per player to guests in room.
   * @param {WebSocket} socket Is not used, but added for consistency.
   * @param {Object} message Message sent by client.
   */
  setCardsPerPlayer(socket, message) {
    const roomCode = message.sessionCode;
    const playerNickname = message.nickname;
    const cards = message.cardsPerPlayer;

    if (roomCode && playerNickname && cards) {
      if (this.availableRooms.has(roomCode)) {
        const roomMap = this.availableRooms.get(roomCode);
        const roomConfig = roomMap.get('config');
        if (roomConfig) {
          // Storing configuration
          roomConfig.set('cardsPerPlayer', cards);

          // Sends to other players in room.
          const newMessage = {
            type: 'handleCardsPerPlayer',
            cardsPerPlayer: message.cardsPerPlayer,
          };
          this.broadcastToOthers(newMessage, roomCode, playerNickname);
        }
      }
    }
  }

  /**
   * Sets adaptation 1a to guests in room.
   * @param {WebSocket} socket Is not used, but added for consistency.
   * @param {Object} message Message sent by client.
   */
  toggleAdp1a(socket, message) {
    const roomCode = message.sessionCode;
    const playerNickname = message.nickname;

    if (roomCode && playerNickname) {
      if (this.availableRooms.has(roomCode)) {
        const roomMap = this.availableRooms.get(roomCode);
        const roomConfig = roomMap.get('config');

        if (roomConfig) {
          // Storing configuration
          roomConfig.set('adaptation1a', true);
          roomConfig.set('adaptation1b', false);
          roomConfig.set('adaptation1c', false);

          // Sends to other players in room.
          const newMessage = {
            type: 'handleAdp1a',
          };
          this.broadcastToOthers(newMessage, roomCode, playerNickname);
        }
      }
    }
  }

  /**
   * Sets adaptation 1b to guests in room.
   * @param {WebSocket} socket Is not used, but added for consistency.
   * @param {Object} message Message sent by client.
   */
  toggleAdp1b(socket, message) {
    const roomCode = message.sessionCode;
    const playerNickname = message.nickname;

    if (roomCode && playerNickname) {
      if (this.availableRooms.has(roomCode)) {
        const roomMap = this.availableRooms.get(roomCode);
        const roomConfig = roomMap.get('config');

        if (roomConfig) {
          // Storing configuration
          roomConfig.set('adaptation1b', true);
          roomConfig.set('adaptation1a', false);
          roomConfig.set('adaptation1c', false);

          // Sends to other players in room.
          const newMessage = {
            type: 'handleAdp1b',
          };
          this.broadcastToOthers(newMessage, roomCode, playerNickname);
        }
      }
    }
  }

  /**
   * Sets adaptation 1c to guests in room.
   * @param {WebSocket} socket Is not used, but added for consistency.
   * @param {Object} message Message sent by client.
   */
  toggleAdp1c(socket, message) {
    const roomCode = message.sessionCode;
    const playerNickname = message.nickname;

    if (roomCode && playerNickname) {
      if (this.availableRooms.has(roomCode)) {
        const roomMap = this.availableRooms.get(roomCode);
        const roomConfig = roomMap.get('config');

        if (roomConfig) {
          // Storing configuration
          roomConfig.set('adaptation1c', true);
          roomConfig.set('adaptation1a', false);
          roomConfig.set('adaptation1b', false);

          // Sends to other players in room.
          const newMessage = {
            type: 'handleAdp1c',
          };
          this.broadcastToOthers(newMessage, roomCode, playerNickname);
        }
      }
    }
  }

  /**
   * Sets adaptation 2a to guests in room.
   * @param {WebSocket} socket Is not used, but added for consistency.
   * @param {Object} message Message sent by client.
   */
  toggleAdp2a(socket, message) {
    const roomCode = message.sessionCode;
    const playerNickname = message.nickname;

    if (roomCode && playerNickname) {
      if (this.availableRooms.has(roomCode)) {
        const roomMap = this.availableRooms.get(roomCode);
        const roomConfig = roomMap.get('config');

        if (roomConfig) {
          // Storing configuration
          roomConfig.set('adaptation2a', true);
          roomConfig.set('adaptation2b', false);
          roomConfig.set('adaptation2c', false);

          // Sends to other players in room.
          const newMessage = {
            type: 'handleAdp2a',
          };
          this.broadcastToOthers(newMessage, roomCode, playerNickname);
        }
      }
    }
  }

  /**
   * Sets adaptation 2b to guests in room.
   * @param {WebSocket} socket Is not used, but added for consistency.
   * @param {Object} message Message sent by client.
   */
  toggleAdp2b(socket, message) {
    const roomCode = message.sessionCode;
    const playerNickname = message.nickname;

    if (roomCode && playerNickname) {
      if (this.availableRooms.has(roomCode)) {
        const roomMap = this.availableRooms.get(roomCode);
        const roomConfig = roomMap.get('config');

        if (roomConfig) {
          // Storing configuration
          roomConfig.set('adaptation2b', true);
          roomConfig.set('adaptation2a', false);
          roomConfig.set('adaptation2c', false);

          // Sends to other players in room.
          const newMessage = {
            type: 'handleAdp2b',
          };
          this.broadcastToOthers(newMessage, roomCode, playerNickname);
        }
      }
    }
  }

  /**
   * Sets adaptation 2c to guests in room.
   * @param {WebSocket} socket Is not used, but added for consistency.
   * @param {Object} message Message sent by client.
   */
  toggleAdp2c(socket, message) {
    const roomCode = message.sessionCode;
    const playerNickname = message.nickname;

    if (roomCode && playerNickname) {
      if (this.availableRooms.has(roomCode)) {
        const roomMap = this.availableRooms.get(roomCode);
        const roomConfig = roomMap.get('config');

        if (roomConfig) {
          // Storing configuration
          roomConfig.set('adaptation2c', true);
          roomConfig.set('adaptation1a', false);
          roomConfig.set('adaptation1b', false);

          // Sends to other players in room.
          const newMessage = {
            type: 'handleAdp2c',
          };
          this.broadcastToOthers(newMessage, roomCode, playerNickname);
        }
      }
    }
  }

  /**
   * Sets adaptation 3a to guests in room.
   * @param {WebSocket} socket Is not used, but added for consistency.
   * @param {Object} message Message sent by client.
   */
  toggleAdp3a(socket, message) {
    const roomCode = message.sessionCode;
    const playerNickname = message.nickname;

    if (roomCode && playerNickname) {
      if (this.availableRooms.has(roomCode)) {
        const roomMap = this.availableRooms.get(roomCode);
        const roomConfig = roomMap.get('config');

        if (roomConfig) {
          // Storing configuration
          roomConfig.set('adaptation3a', true);
          roomConfig.set('adaptation3b', false);
          roomConfig.set('adaptation3c', false);

          // Sends to other players in room.
          const newMessage = {
            type: 'handleAdp3a',
          };
          this.broadcastToOthers(newMessage, roomCode, playerNickname);
        }
      }
    }
  }

  /**
   * Sets adaptation 3b to guests in room.
   * @param {WebSocket} socket Is not used, but added for consistency.
   * @param {Object} message Message sent by client.
   */
  toggleAdp3b(socket, message) {
    const roomCode = message.sessionCode;
    const playerNickname = message.nickname;

    if (roomCode && playerNickname) {
      if (this.availableRooms.has(roomCode)) {
        const roomMap = this.availableRooms.get(roomCode);
        const roomConfig = roomMap.get('config');

        if (roomConfig) {
          // Storing configuration
          roomConfig.set('adaptation3b', true);
          roomConfig.set('adaptation3a', false);
          roomConfig.set('adaptation3c', false);

          // Sends to other players in room.
          const newMessage = {
            type: 'handleAdp3b',
          };
          this.broadcastToOthers(newMessage, roomCode, playerNickname);
        }
      }
    }
  }

  /**
   * Sets adaptation 3c to guests in room.
   * @param {WebSocket} socket Is not used, but added for consistency.
   * @param {Object} message Message sent by client.
   */
  toggleAdp3c(socket, message) {
    const roomCode = message.sessionCode;
    const playerNickname = message.nickname;

    if (roomCode && playerNickname) {
      if (this.availableRooms.has(roomCode)) {
        const roomMap = this.availableRooms.get(roomCode);
        const roomConfig = roomMap.get('config');

        if (roomConfig) {
          // Storing configuration
          roomConfig.set('adaptation3c', true);
          roomConfig.set('adaptation1a', false);
          roomConfig.set('adaptation1b', false);

          // Sends to other players in room.
          const newMessage = {
            type: 'handleAdp3c',
          };
          this.broadcastToOthers(newMessage, roomCode, playerNickname);
        }
      }
    }
  }

  /**
   * Calculates a random number in a range.
   * @param {Number} min Minimum number in range.
   * @param {Number} max Maximum number in range.
   * @returns A random number.
   */
  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Assigns a random player the host title.
   * @param {Map} playersMap Map with players in a certain room.
   */
  assignNewHost(playersMap) {
    if (playersMap) {
      const playerNicknames = Array.from(playersMap.keys());
      if (playerNicknames) {
        const randomNumber = this.getRandomNumber(1, playerNicknames.length);
        const newHost = playerNicknames[randomNumber - 1];
        if (playersMap.has(newHost)) {
          const hostMap = playersMap.get(newHost);
          const hostInfo = hostMap.get('playerInfo');
          hostInfo.set('host', true);
        }
      }
    }
  }

  /**
   * Finds player with given nickname in given room.
   */
  removePlayerInRanking(roomCode, playerNickname) {
    const roomPlayers = this.playerRankingPorRoom.get(roomCode);
    for (let playerIndex = 0; playerIndex < roomPlayers.length; playerIndex += 1) {
      if (roomPlayers[playerIndex].nickname === playerNickname) {
        roomPlayers.splice(playerIndex, 1);
      }
    }
  }

  /**
   * Removes player in list for other players in room.
   * @param {WebSocket} socket Is not used, but added for consistency.
   * @param {Object} message Message sent by client.
   */
  removePlayer(socket, message) {
    const roomCode = message.sessionCode;
    const playerNickname = message.nickname;

    if (roomCode && playerNickname && this.availableRooms.has(roomCode)) {
      const roomInfo = this.availableRooms.get(roomCode);
      const playersMap = roomInfo.get('players');
      if (playersMap) {
        // Deleting from dictionaries.
        playersMap.delete(playerNickname);
        this.removePlayerInRanking(roomCode, playerNickname);
        // Assigning new host
        this.assignNewHost(playersMap);
        // Sending messages to other players to let them know a player has left.
        this.sendUpdatedPlayers(playerNickname, roomCode);
      }
    }
  }

  /**
   * Assigns random card to player.
   */
  selectNewCard() {
    let cardMap = null;
    const randomNumber = this.getRandomNumber(1, Object.keys(this.cardRoutes).length - 1);
    const card = this.cardRoutes[randomNumber];
    if (card) {
      const randomColor = this.getRandomNumber(0, this.cardColors.length - 1);
      const color = this.cardColors[randomColor];

      cardMap = new Map([
        ['description', card.description],
        ['route', card.route],
        ['border', color],
        ['isAssigned', false],
      ]);
    }
    return cardMap;
  }

  /**
   * Checks if card exists in room.
   * @param {*} card
   * @param {*} roomCode
   * @returns
   */
  checkForCard(newCard, boardCardsMapKeyDescription) {
    let cardExists = false;
    if (boardCardsMapKeyDescription.has(newCard.get('description')) === true) {
      cardExists = true;
    }
    return cardExists;
  }

  /**
   * Selects board cards for room.
   * @param {*} roomCode
   */
  selectGameCards(roomCode) {
    if (this.availableRooms.has(roomCode)) {
      const roomInfo = this.availableRooms.get(roomCode);
      const roomConfig = roomInfo.get('config');
      const amountCardsBoard = roomConfig.get('cardsPerRound');

      const boardCardsMap = new Map();
      const boardCardsMapKeyDescription = new Map();
      for (let cardIndex = 0; cardIndex < amountCardsBoard; cardIndex += 1) {
        let newCard = this.selectNewCard();
        while (this.checkForCard(newCard, boardCardsMapKeyDescription) === true) {
          newCard = this.selectNewCard();
        }
        boardCardsMap.set(cardIndex, newCard);
        boardCardsMapKeyDescription.set(newCard.get('description'), newCard);
      }
      roomInfo.set('board', boardCardsMap);
      roomInfo.set('boardKeyDescription', boardCardsMapKeyDescription);
    }
  }

  /**
   * Retrieves player score from map.
   * @param {*} nickname Player Nickname.
   * @param {*} players Players map.
   * @returns Player's score.
   */
  getPlayerScore(nickname, players) {
    let playerScore = null;
    if (players.has(nickname)) {
      const playerMap = players.get(nickname);
      if (playerMap) {
        const playerInfo = playerMap.get('playerInfo');
        if (playerInfo) {
          playerScore = playerInfo.get('points');
        }
      }
    }
    return playerScore;
  }

  /**
   * Identifies which player has the lowest score.
   * @param {Map} playersMap Map of players to check.
   */
  identifyPlayerPosition(playersMap, isFirst) {
    // Empty map with lowest score info.
    let pickedPlayer = null;
    // Player nicknames.
    const playerNicknames = playersMap.keys();
    // First player nickname.
    let playerNickname = playerNicknames[0];
    // First player map.
    let playerScore = this.getPlayerScore(playerNickname, playersMap);
    // Setting first player's score as lowest.
    pickedPlayer = new Map([
      ['nickname', playerNickname],
      ['score', playerScore],
    ]);

    if (playerScore && pickedPlayer) {
      // Finding lowest score and asigning it to score map.
      for (let playerIndex = 1; playerIndex < playerNicknames.length; playerIndex += 1) {
        playerNickname = playerNicknames[playerIndex];
        playerScore = this.getPlayerScore(playerNickname, playersMap);
        // If current player has a lower score than the lowest score recorded, store it.
        if (playerScore) {
          if ((isFirst === false && pickedPlayer.get('score') > playerScore)
            || (isFirst === true && pickedPlayer.get('score') < playerScore)) {
            pickedPlayer.set('nickname', playerNickname);
            pickedPlayer.set('score', playerScore);
          }
        }
      }
    }
    // Returns a map with information about player with lowest score.
    return playerScore;
  }

  /**
   * Applies extra cards to guests in room.
   * @param {String} roomCode Room code.
   */
  applyExtraCards(roomCode) {
    const roomInfo = this.availableRooms.get(roomCode);
    if (roomInfo) {
      const boardCards = roomInfo.get('board');
      const playersMap = roomInfo.get('players');
      const playerNickname = this.identifyPlayerPosition(playersMap, false);

      playersMap.forEach((playerData, otherPlayerNickname) => {
        const playerInfo = playerData.get('playerInfo');
        if (playerInfo) {
          const playerCards = playerInfo.get('cards');
          if (playerCards && otherPlayerNickname !== playerNickname) {
            // Creating 5 new cards
            this.selectPlayerCards(playerInfo, 5, boardCards);
            // Sends to player.
            const message = {
              type: 'handlePlayerCards',
              playerCards: this.createPlayerCardsStringMap(playerData),
            };
            const socket = playerData.get('playerSocket');
            socket.send(JSON.stringify(message));
          }
        }
      });
    }
  }

  /**
   * Applies blur to guests in room.
   * @param {String} roomCode Code of room where blur will be applied
   */
  applyBlur(roomCode) {
    const roomInfo = this.availableRooms.get(roomCode);
    const playersMap = roomInfo.get('players');
    const loserPlayer = this.identifyPlayerPosition(playersMap, false);
    if (loserPlayer) {
      const loserNickname = loserPlayer.get('nickname');
      // Sends to other players in room.
      const newMessage = {
        type: 'handleBlur',
      };
      this.broadcastToOthers(newMessage, roomCode, loserNickname);
    }
  }

  /**
   * Sets a timeout at a specific time that iniciates a special event to players.
   * @param {Integer} roomCode Code of room in which to apply special event.
   */
  setSpecialEvents(roomCode) {
    const roomInfo = this.availableRooms.get(roomCode);
    if (roomInfo) {
      const configMap = roomInfo.get('config');
      const maxTime = configMap.get('maxTime');
      const specialEventTime = (maxTime - 10) * 1000;

      if (configMap.get('adaptation3a') === true) {
        setTimeout(() => this.applyExtraCards(roomCode), specialEventTime);
      } else if (configMap.get('adaptation3b') === true) {
        setTimeout(() => this.applyBlur(roomCode), specialEventTime);
      }
    }
  }

  /**
   * Selects random player cards.
   * @param {*} playerInfo
   * @param {*} cardAmount
   * @param {*} boardCards
   */
  selectPlayerCards(playerInfo, cardAmount, boardCards) {
    const boardKeys = Array.from(boardCards.keys());
    const playerCardsMap = new Map();
    for (let cardIndex = 0; cardIndex < cardAmount; cardIndex += 1) {
      let randomNumber = this.getRandomNumber(0, boardKeys.length - 1);
      let newCard = boardCards.get(randomNumber);
      if (newCard) {
        while (newCard.get('isAssigned') === true) {
          randomNumber = this.getRandomNumber(0, boardKeys.length - 1);
          newCard = boardCards.get(randomNumber);
        }
        playerCardsMap.set(newCard.get('description'), newCard);
        boardCards.get(randomNumber).set('isAssigned', true);
      }
    }
    playerInfo.set('cards', playerCardsMap);
  }

  /**
   * Starts game for all players in room.
   * @param {Object} message Message sent by client.
   * @param {WebSocket} socket Socket of host requesting start of game.
   */
  startGame(socket, message) {
    const roomCode = message.sessionCode;
    const playerNickname = message.nickname;

    this.selectGameCards(roomCode);
    this.setSpecialEvents(roomCode);

    if (this.availableRooms.has(roomCode)) {
      const roomInfo = this.availableRooms.get(roomCode);
      const roomConfig = roomInfo.get('config');
      const boardCards = roomInfo.get('board');
      const playersMap = roomInfo.get('players');

      if (roomConfig && boardCards && playersMap) {
        const cardAmount = roomConfig.get('cardsPerPlayer');
        playersMap.forEach((playerData) => {
          const playerInfo = playerData.get('playerInfo');
          playerInfo.set('cards', new Map());
          this.selectPlayerCards(playerInfo, cardAmount, boardCards);
        });
        this.availableRooms.get(roomCode).set('hasStarted', true);

        // Prepare cards?
        const newMessage = {
          type: 'handleStartGame',
        };
        this.broadcastToOthers(newMessage, roomCode, playerNickname);
      }
    }
  }

  /**
   * Converts Map object into a string in order to send it.
   * @param {Map} playerMap Map object with player infor.
   * @returns String with all player's cards.
   */
  createPlayerCardsStringMap(playerMap) {
    const playerCardsStringMap = {};
    if (playerMap) {
      const playerInfo = playerMap.get('playerInfo');
      if (playerInfo) {
        const playerCards = playerInfo.get('cards');
        if (playerCards) {
          playerCards.forEach((cardData, cardId) => {
            if (cardData) {
              const playerCardMap = {
                description: cardData.get('description'),
                route: cardData.get('route'),
                border: cardData.get('border'),
              };
              playerCardsStringMap[cardId] = playerCardMap;
            }
          });
        }
      }
    }
    return JSON.stringify(playerCardsStringMap);
  }

  /**
   * Converts Map object into a string in order to send it.
   * @param {Map} board Map object with room's board cards.
   * @returns String with all board's cards.
   */
  createBoardStringMap(board) {
    const boardStringMap = {};
    if (board) {
      board.forEach((cardData, cardId) => {
        if (cardData) {
          boardStringMap[cardId] = {
            description: cardData.get('description'),
            route: cardData.get('route'),
            border: cardData.get('border'),
          };
        }
      });
    }
    return JSON.stringify(boardStringMap);
  }

  /**
   * Sets amount of card per round to guests in room.
   * @param {WebSocket} socket Socket of host requesting start of game.
   * @param {Object} message Message sent by client.
   */
  getGameRoom(socket, message) {
    const playerNickname = message.nickname;
    const roomCode = message.sessionCode;

    if (this.playerExists(roomCode, playerNickname) === true) {
      const roomInfo = this.availableRooms.get(roomCode);
      const playersMap = roomInfo.get('players');
      const configMap = roomInfo.get('config');
      const playerMap = playersMap.get(playerNickname);

      playerMap.set('playerSocket', socket);
      this.sendUpdatedPlayers(playerNickname, roomCode);

      const playerRanks = this.orderPlayersByPoints(roomCode);
      // Sending player personalized waiting room.
      const newMessage = {
        type: 'handleGameRoom',
        config: this.createConfigStringMap(configMap),
        players: this.createPlayerStringMap(playersMap, playerRanks),
        boardCards: this.createBoardStringMap(roomInfo.get('board')),
        playerCards: this.createPlayerCardsStringMap(playerMap),
      };
      socket.send(JSON.stringify(newMessage));
    }
  }

  /**
   * Finds player with given nickname in given room.
   */
  findPlayerInRanking(roomCode, playerNickname) {
    const roomPlayers = this.playerRankingPorRoom.get(roomCode);
    let player = null;
    for (let playerIndex = 0; playerIndex < roomPlayers.length; playerIndex += 1) {
      if (roomPlayers[playerIndex] && roomPlayers[playerIndex].nickname === playerNickname) {
        player = roomPlayers[playerIndex];
      }
    }
    return player;
  }

  /**
   * Change a player's score in a specific room.
   * @param {String} playerNickname Player nickname.
   * @param {Number} roomCode Unique room code.
   * @param {Number} points Points to be added to the player.
   * @returns The new value of the player's points.
   */
  changePlayerScore(playerNickname, roomCode, points) {
    // Changing player score in main dictionary
    const room = this.availableRooms.get(roomCode);
    const players = room.get('players');
    const player = players.get(playerNickname);
    const playerInfo = player.get('playerInfo');
    let playerPoints = playerInfo.get('points');
    playerPoints += points;
    playerInfo.set('points', playerPoints);
    // Changing player score in ranking dictionary
    const playerArray = this.findPlayerInRanking(roomCode, playerNickname);
    if (playerArray) {
      playerArray.points = playerPoints;
    }
    return playerPoints;
  }

  /**
   * Checks if match is correct.
   */
  checkMatch(socket, message) {
    const playerCardId = message.playerCard;
    const boardCardId = message.boardCard;
    const roomCode = message.sessionCode;
    const playerNickname = message.nickname;

    let isCorrect = false;
    let playerPoints = 0;

    if (playerCardId && boardCardId && roomCode && playerNickname) {
      const room = this.availableRooms.get(roomCode);
      if (room) {
        const players = room.get('players');
        if (players) {
          const player = players.get(playerNickname);
          if (player) {
            const playerInfo = player.get('playerInfo');
            if (playerInfo) {
              const cards = playerInfo.get('cards');
              if (cards) {
                // Checks if match is correct and updates score
                if (playerCardId === boardCardId) {
                  isCorrect = true;
                  playerPoints = this.changePlayerScore(playerNickname, roomCode, 100);
                  // Deleting player's card.
                  if (cards.has(playerCardId)) {
                    cards.delete(playerCardId);
                  }
                } else {
                  isCorrect = false;
                  playerPoints = this.changePlayerScore(playerNickname, roomCode, -10);
                }
                const newMessage = {
                  type: 'handleMatchResponse',
                  isCorrectMatch: isCorrect,
                  newScore: playerPoints,
                  playerCards: this.createPlayerCardsStringMap(player),
                };
                // Sending player a message indicating if match is correct.
                socket.send(JSON.stringify(newMessage));
                // If player has no cards left, finish the game.
                if (cards.size === 0) {
                  this.finishGame(socket, message);
                }
                this.sendUpdatedPlayers('', roomCode, 'handlePlayerList');
              }
            }
          }
        }
      }
    }
  }

  /**
   * Adds player ranks extracted from txt file to array.
   * @param {Array} playerRanks Array where data will be stored.
   * @param {String} data Extracted txt content.
   */
  addTop3ToArray(playerRanks, data) {
    const top3Array = data.split(/\r?\n/);
    for (let arrayIndex = 0; arrayIndex < 3; arrayIndex += 1) {
      const playerInfo = top3Array[arrayIndex].split(',');
      playerRanks.push({ nickname: playerInfo[0], points: playerInfo[1] });
    }
  }

  /**
   * Merges two lists into a combined one.
   * @param {*} playerRanks Stored list with room ranking.
   * @param {*} fileContent Contents of txt file with top 3 ranking.
   * @returns Merged list with sorted scores.
   */
  mergeLists(playerRanks, fileContent) {
    const combinedList = JSON.parse(JSON.stringify(playerRanks));
    this.addTop3ToArray(combinedList, fileContent);
    if (combinedList.length >= 2) {
      combinedList.sort((a, b) => b.points - a.points);
    }
    return combinedList;
  }

  /**
   * Creates a string with list contents.
   * @param {Array} combinedList List from which to create string.
   * @returns String with csv style format.
   */
  createStringFromList(combinedList) {
    let string = '';
    for (let arrayIndex = 0; arrayIndex < 3; arrayIndex += 1) {
      const player = combinedList[arrayIndex];
      if (player) {
        string += `${player.nickname},${player.points}\n`;
      }
    }
    return string;
  }

  /**
   * Saves winners if they have the highest score.
   */
  saveToTop3(roomCode) {
    const playerRanks = this.orderPlayersByPoints(roomCode);
    fs.readFile(this.filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        // Adding players of top 3 file to combined list.
        const combinedList = this.mergeLists(playerRanks, data);
        const listString = this.createStringFromList(combinedList);
        fs.writeFile(this.filePath, listString, (writeError) => {
          if (writeError) {
            console.error('Error reemplazando contenidos de archivo: ', writeError);
          } else {
            console.log('El archivo fue escrito de forma exitosa.');
          }
        });
      }
    });
  }

  /**
   * Finishes game for all players in room.
   * @param {WebSocket} socket Socket of host requesting start of game.
   * @param {Object} message Message sent by client.
   */
  finishGame(socket, message) {
    const code = message.sessionCode;
    const roomInfo = this.availableRooms.get(code);
    const playersMap = roomInfo.get('players');
    if (playersMap) {
      const playerRanks = this.orderPlayersByPoints(code);
      const newMessage = {
        type: 'handleTimesUp',
        players: this.createPlayerStringMap(playersMap, playerRanks),
      };

      if (roomInfo.get('hasStarted') === true) {
        this.saveToTop3(code);
        roomInfo.set('hasStarted', false);
      }
      socket.send(JSON.stringify(newMessage));
    }
  }

  /**
   * Closes connection with client.
   */
  closeConnection(socket) {
    /*
    if (availableRooms.has(roomCode)) {
      const roomMap = availableRooms.get(roomCode);
      const roomPlayers = roomMap.get('players');
      if (roomPlayers.has(playerNickname)) {
        removePlayer(message);
      }
    } */
  }
}

// Creating new server instance listening in given port.
const server = new WebSocket.Server({ host: serverIp, port: serverPort });
// Creating instance of Game Page class.
const serverInstance = new Server();

/**
 * Identifying message type in order to call appropiate function.
 * @param {Class} pageClass Class with all functions.
 * @param {WebSocket} socket Socket with connection to server.
 * @param {Object} receivedMessage Message received from server.
 * @returns Boolean value that indicates if message was identified or not.
 */
function identifyMessage(socket, receivedMessage) {
  if (socket && receivedMessage) {
    const messageType = receivedMessage.type;
    if (serverInstance[messageType]) {
      serverInstance[messageType](socket, receivedMessage);
    } else {
      console.log('No se reconoce ese mensaje.');
    }
  }
}

/**
 * When a connection is made with a client.
 */
server.on('connection', (clientSocket) => {
  /**
   * When message is received on socket...
   */
  clientSocket.on('message', (message) => {
    const parsedMessage = JSON.parse(message);
    console.log(`Mensaje recibido: ${message}`);

    identifyMessage(clientSocket, parsedMessage);
  });

  /**
   * When socket with client is closed
   */
  clientSocket.on('close', () => {
    serverInstance.closeConnection(clientSocket);
    // TODO: arreglar esto, actualmente no se como detectar de que pagina es el socket
  });
});
