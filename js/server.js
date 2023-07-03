/* eslint-disable class-methods-use-this */
/** ****************** Imports ******************* */

// import { ip , port } from 'config.js';
// const configuration = require('./config.js');

// Including ws module.
const WebSocket = require('ws');

// Including fs module.
const fs = require('fs');

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
        101: { description: 'Dona', route: 'donut.png' },
        102: { description: 'Ensalada', route: 'salad.png' },
        103: { description: 'Kebab', route: 'kebab.png' },
        104: { description: 'FriedChicken', route: 'friedChicken.png' },
        105: { description: 'Taco', route: 'taco.png' },
        106: { description: 'Langosta', route: 'lobster.png' },
        107: { description: 'Fresa', route: 'strawberry.png' },
        108: { description: 'Pitahaya', route: 'dragonFruit.png' },
        109: { description: 'Naranja', route: 'orange.png' },
        110: { description: 'Piña', route: 'pineapple.png' },
        111: { description: 'Aguacate', route: 'avocado.png' },
        112: { description: 'Kiwi', route: 'kiwi.png' },
        113: { description: 'Coco', route: 'coconut.png' },
        114: { description: 'Limon', route: 'lemon.png' },
        115: { description: 'Calabaza', route: 'pumpkin.png' },
        116: { description: 'Almendra', route: 'almond.png' },
        117: { description: 'Repollo', route: 'cabbage.png' },
        118: { description: 'Maiz', route: 'corn.png' },
        119: { description: 'Ajo', route: 'garlic.png' },
        120: { description: 'Coliflor', route: 'cauliflower.png' },
        121: { description: 'Papa', route: 'potato.png' },
        122: { description: 'Cebolla', route: 'onion.png' },
        123: { description: 'Tamarindo', route: 'tamarind.png' },
        124: { description: 'Mongostino', route: 'mangosteen.png' },
        125: { description: 'Albaricoque', route: 'apricot.png' },
        126: { description: 'Pulpo', route: 'octopus.png' },
        127: { description: 'Rana', route: 'frog.png' },
        128: { description: 'Búho', route: 'owl.png' },
        129: { description: 'Rata', route: 'rat.png' },
        130: { description: 'Caracol', route: 'snail.png' },
        131: { description: 'Murcielago', route: 'bat.png' },
        132: { description: 'Camello', route: 'camel.png' },
        133: { description: 'Lora', route: 'parrot.png' },
        134: { description: 'Grillo', route: 'cricket.png' },
        135: { description: 'Pavo', route: 'turkey.png' },
        136: { description: 'Flamenco', route: 'flamingo.png' },
        137: { description: 'Hipopotamo', route: 'hippopotamus.png' },
        138: { description: 'Pato', route: 'duck.png' },
        139: { description: 'Panda', route: 'panda.png' },
        140: { description: 'Vaca', route: 'cow.png' },
        141: { description: 'Unicornio', route: 'unicorn.png' },
        142: { description: 'Pez', route: 'fish.png' },
        143: { description: 'Tigre', route: 'tiger.png' },
        144: { description: 'Mariposa', route: 'butterfly.png' },
        145: { description: 'Babuino', route: 'baboon.png' },
        146: { description: 'Lobo', route: 'wolf.png' },
        147: { description: 'EstrellaDeMar', route: 'starfish.png' },
        148: { description: 'Perro', route: 'dog.png' },
        149: { description: 'Foca', route: 'seal.png' },
        150: { description: 'Pinguino', route: 'penguin.png' },
        151: { description: 'Instagram', route: 'instagram.png' },
        152: { description: 'Gmail', route: 'gmail.png' },
        153: { description: 'YouTube', route: 'youtube.png' },
        154: { description: 'Facebook', route: 'facebook.png' },
        155: { description: 'Telegram', route: 'telegram.png' },
        156: { description: 'Whatsapp', route: 'whatsapp.png' },
        157: { description: 'TikTok', route: 'tiktok.png' },
        158: { description: 'Google', route: 'google.png' },
        159: { description: 'PlayStation', route: 'playstation.png' },
        160: { description: 'Lego', route: 'lego.png' },
        161: { description: 'Twitter', route: 'twitter.png' },
        162: { description: 'Snapchat', route: 'snapchat.png' },
        163: { description: 'Hp', route: 'hp.png' },
        164: { description: 'Xiaomi', route: 'xiaomi.png' },
        165: { description: 'Android', route: 'android.png' },
        166: { description: 'GrandTheftAuto', route: 'grandTheftAuto.png' },
        167: { description: 'Windows', route: 'windows.png' },
        168: { description: 'AdobeIllustrator', route: 'adobeIllustrator.png' },
        169: { description: 'Dropbox', route: 'dropbox.png' },
        170: { description: 'Discord', route: 'discord.png' },
        171: { description: 'Reddit', route: 'reddit.png' },
        172: { description: 'Spotify', route: 'spotify.png' },
        173: { description: 'LG', route: 'lg.png' },
        174: { description: 'Konami', route: 'konami.png' },
        175: { description: 'Dell', route: 'dell.png' },
        176: { description: 'Linkedin', route: 'linkedin.png' },
        177: { description: 'Motorola', route: 'motorola.png' },
        178: { description: 'GoogleDrive', route: 'googleDrive.png' },
        179: { description: 'Samsung', route: 'samsung.png' },
        180: { description: 'Huawei', route: 'huawei.png' },
        181: { description: 'EASports', route: 'EASports.png' },
        182: { description: 'GoogleMaps', route: 'googleMaps.png' },
        183: { description: 'Sega', route: 'sega.png' },
        184: { description: 'AMD', route: 'amd.png' },
        185: { description: 'Twitch', route: 'twitch.png' },
        186: { description: 'Skype', route: 'skype.png' },
        187: { description: 'GoogleTranslate', route: 'googleTranslate.png' },
        188: { description: 'Wikipedia', route: 'wikipedia.png' },
        189: { description: 'Paypal', route: 'paypal.png' },
        190: { description: 'SONY', route: 'sony.png' },
        191: { description: 'Ubisoft', route: 'ubisoft.png' },
        192: { description: 'Pinterest', route: 'pinterest.png' },
        193: { description: 'Tinder', route: 'tinder.png' },
        194: { description: 'Nintendo', route: 'nintendo.png' },
        195: { description: 'Philips', route: 'philips.png' },
        196: { description: 'Cisco', route: 'cisco.png' },
        197: { description: 'IBM', route: 'ibm.png' },
        198: { description: 'NVIDIA', route: 'nvidia.png' },
        199: { description: 'Logitech', route: 'logitech.png' },
        200: { description: 'Intel', route: 'intel.png' },
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
    this.toggleAdp2a = this.toggleAdp2a.bind(this);
    this.toggleAdp2b = this.toggleAdp2b.bind(this);
    this.toggleAdp3a = this.toggleAdp3a.bind(this);
    this.toggleAdp3b = this.toggleAdp3b.bind(this);
    this.startGame = this.startGame.bind(this);
    this.getGameRoom = this.getGameRoom.bind(this);
    this.checkMatch = this.checkMatch.bind(this);
    this.removePlayer = this.removePlayer.bind(this);
    this.finishGame = this.finishGame.bind(this);
  }

  /** ******************** Functions used on script ********************* */

  /**
   * Creates new player and adds it to the room.
   * @param {Number} playerPosition Player's position in ranking.
   * @param Boolean isHost Whether player is host or not.
   * @returns New player Map with relevant information.
   */
  createPlayer(playerPosition, isHost) {
    const newPlayer = new Map([
      ['position', playerPosition],
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
        if (amountPlayers <= 20) {
          const playerIndex = amountPlayers - 1;
          playerAvatar = this.avatarRoutes[playerIndex];
        }
      }
    }
    return playerAvatar;
  }

  /**
   * Creating playerMap with given information.
   * @param {Number} roomCode Code of room.
   * @param {String} playerNickname Nickname of player.
   * @param {WebSocket} socket Socket to specific client.
   * @returns Created player Map.
   */
  createPlayerMap(roomCode, socket) {
    const newPlayer = this.createPlayer(1, true);
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
    configurations.set('cardsPerPlayer', 5);
    configurations.set('cardsPerRound', 100);
    configurations.set('adaptation1a', false);
    configurations.set('adaptation1b', false);
    configurations.set('adaptation2a', false);
    configurations.set('adaptation2b', false);
    configurations.set('adaptation3a', false);
    configurations.set('adaptation3b', false);
    return configurations;
  }

  printRooms() {
    this.availableRooms.forEach((roomData, roomCode) => {
      console.log(`[${roomCode}]: `);
      console.log(`typeof: ${typeof (roomCode)}: `);

      const configMap = roomData.get('config');
      console.log(`config: ${JSON.stringify(Array.from(configMap))}`);

      console.log('players:');
      const playerMap = roomData.get('players');
      playerMap.forEach((playerData, playerName) => {
        console.log(`
        ---- ${playerName} ----
        `);
        console.log(`playerSocket: ${playerData.get('playerSocket')}`);
        console.log(`avatar: ${JSON.stringify(playerData.get('playerInfo').get('avatar'))}`);
        console.log(`points: ${playerData.get('playerInfo').get('points')}`);
        console.log(`host: ${playerData.get('playerInfo').get('host')}`);
      });
    });
  }

  /**
   * Creates room maps that store player information.
   * @param {String} playerNickname Player's nickname.
   * @param {Map} playerMap Player map with their information.
   * @param {Integer} roomCode Created room code.
   * @returns
   */
  createRoomMaps(playerNickname, playerMap, roomCode) {
    let success = false;
    const playerInfo = playerMap.get('playerInfo');
    if (playerInfo) {
      const playerPoints = playerInfo.get('points');
      const playersMap = new Map([
        [playerNickname, playerMap],
      ]);
      if (playersMap) {
        const roomMap = new Map([
          ['isStarted', false],
          ['config', this.setDefaultGameConfiguration()],
          ['players', playersMap],
        ]);
        // Adding to aditional map for easy access
        if (roomMap) {
          const roomList = [];
          const playerRanks = { nickname: playerNickname, points: playerPoints };
          roomList.push(playerRanks);
          this.playerRankingPorRoom.set(roomCode, roomList);
          this.availableRooms.set(roomCode, roomMap);
          success = true;
        }
      }
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
   * Creates new room for host.
   * @param {WebSocket} socket Socket to specific client.
   * @param {Object} message Message received from client.
   */
  createRoom(socket, message) {
    const playerNickname = message.nickname;
    const roomCode = String(this.nextRoomCode);
    this.nextRoomCode += 1;
    console.log(`this.nextRoomCode: ${this.nextRoomCode}`);

    if (playerNickname && roomCode) {
      console.log('playerNickname && roomCode');
      const playerMap = this.createPlayerMap(roomCode, socket);
      if (playerMap) {
        if (this.createRoomMaps(playerNickname, playerMap, roomCode) === true) {
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
    const roomInfo = this.availableRooms.get(roomCode);
    const playersMap = roomInfo.get('players');

    const playerPosition = playersMap.size + 1;
    const newPlayer = this.createPlayer(playerPosition, false);
    newPlayer.set('avatar', this.selectAvatar(roomCode, playerNickname));

    if (this.availableRooms.has(roomCode) === true) {
      if (playersMap.keys.length <= this.maximumClientAmount) {
        const playerMap = new Map([
          ['playerSocket', socket],
          ['playerInfo', newPlayer],
        ]);
        playersMap.set(playerNickname, playerMap);

        // Adding to aditional map for easy access
        const roomList = this.playerRankingPorRoom.get(roomCode);
        const playerRanks = { nickname: playerNickname, points: newPlayer.get('points') };
        roomList.push(playerRanks);

        this.sendRoomCode(socket, roomCode);
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
      console.log('validateCode: ');
      console.log(`receivedCode: ${receivedCode}`);
      this.printRooms();
      if (roomInfo) {
        console.log(`roomInfo: ${roomInfo}`);
        if (roomInfo) {
          codeIsValid = true;
          console.log(`codeIsValid: ${codeIsValid}`);
          hasGameStarted = roomInfo.get('isStarted');
        }
      }
    }
    const newMessage = {
      type: 'handleCodeValidation',
      isValid: codeIsValid,
      isStarted: hasGameStarted,
    };
    socket.send(JSON.stringify(newMessage));
  }

  /**
   * Figures out if player exists in room.
   * @param {Number} code Code of specific room.
   * @param {String} nickname Nickname of specific player.
   * @returns Boolean value indicating if player exists.
   */
  playerExists(code, nickname) {
    let exists = false;
    console.log(`code: ${code}`);
    if (this.availableRooms.has(code)) {
      console.log('code && nickname');
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
   * Converts Map object into a string in order to send it.
   * @param {Map} playerMap Map object with player's information.
   * @returns String with all player information.
   */
  createPlayerStringMap(playerMap) {
    const playerStringMap = {};
    if (playerMap) {
      playerMap.forEach((playerData, playerNickname) => {
        if (playerData) {
          const playerInfo = playerData.get('playerInfo');
          if (playerInfo) {
            playerStringMap[playerNickname] = {
              position: playerInfo.get('position'),
              avatar: playerInfo.get('avatar'),
              points: playerInfo.get('points'),
              host: playerInfo.get('host'),
            };
          }
        }
      });
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
    const newMessage = {
      type: 'handlePlayerList',
      players: this.createPlayerStringMap(playersMap),
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
      configStringMap.adaptation2a = roomConfig.get('adaptation2a');
      configStringMap.adaptation2b = roomConfig.get('adaptation2b');
      configStringMap.adaptation3a = roomConfig.get('adaptation3a');
      configStringMap.adaptation3b = roomConfig.get('adaptation3b');
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
    console.log('getWaitingRoom');
    const playerNickname = message.nickname;
    const roomCode = message.sessionCode;

    if (playerNickname && roomCode) {
      console.log(`roomCode: ${roomCode}`);
      if (this.playerExists(roomCode, playerNickname) === true) {
        console.log(`playerExists: ${this.playerExists(roomCode, playerNickname)}`);
        const roomInfo = this.availableRooms.get(roomCode);
        const roomConfig = roomInfo.get('config');
        const playersMap = roomInfo.get('players');
        const playerMap = playersMap.get(playerNickname);
        const playerInfo = playerMap.get('playerInfo');

        playerMap.set('playerSocket', socket);
        this.sendUpdatedPlayers(playerNickname, roomCode, 'handlePlayerList');

        // Sending player personalized waiting room.
        const newMessage = {
          type: 'handleWaitingRoom',
          isHost: playerInfo.get('host'),
          players: this.createPlayerStringMap(playersMap),
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
        playersMap.delete(playerNickname);
        // TODO: update ranking
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
    const randomNumber = this.getRandomNumber(1, Object.keys(this.cardRoutes).length);
    const card = this.cardRoutes[randomNumber];

    const randomColor = this.getRandomNumber(0, this.cardColors.length - 1);
    const color = this.cardColors[randomColor];

    const cardMap = new Map([
      ['description', card.description],
      ['route', card.route],
      ['border', color],
    ]);

    return cardMap;
  }

  /**
   * Checks if card exists in room.
   * @param {*} card
   * @param {*} roomCode
   * @returns
   */
  checkForCard(card, roomCode) {
    // TODO: complete
    let cardExists = false;

    cardExists = true;

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
      const cardsBoard = roomConfig.get('cardsPerRound');

      const boardCardsMap = new Map();
      for (let cardIndex = 0; cardIndex < cardsBoard; cardIndex += 1) {
        const newCard = this.selectNewCard();
        if (this.checkForCard(newCard, boardCardsMap) === true) {
          boardCardsMap.set(cardIndex, newCard);
        }
      }
      roomInfo.set('board', boardCardsMap);
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
    const playersMap = roomInfo.get('players');
    const playerNickname = this.identifyPlayerPosition(playersMap, false);

    // TODO: try if it works

    playersMap.forEach((playerData, otherPlayerNickname) => {
      if (otherPlayerNickname !== playerNickname) {
        const newCards = {
          1: this.selectNewCard(),
          2: this.selectNewCard(),
          3: this.selectNewCard(),
          4: this.selectNewCard(),
        };
        // TODO: add to player
        // Sends to player.
        const message = {
          type: 'handlePlayerCards',
          extraCards: JSON.stringify(newCards),
        };
        const socket = playerData.get('playerSocket');
        socket.send(JSON.stringify(message));
      }
    });
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
      const specialEventTime = (maxTime / 2) * 1000;

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
      const randomNumber = this.getRandomNumber(0, boardKeys.length - 1);
      const newCard = boardCards.get(randomNumber);
      if (newCard) {
        if (this.checkForCard(newCard, playerCardsMap)) {
          playerCardsMap.set(newCard.get('description'), newCard);
        }
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
          this.selectPlayerCards(playerInfo, cardAmount, boardCards);
        });
        this.availableRooms.get(roomCode).set('isStarted', true);

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

      // Sending player personalized waiting room.
      const newMessage = {
        type: 'handleGameRoom',
        config: this.createConfigStringMap(configMap),
        players: this.createPlayerStringMap(playersMap),
        boardCards: this.createBoardStringMap(roomInfo.get('board')),
        playerCards: this.createPlayerCardsStringMap(playerMap),
      };
      socket.send(JSON.stringify(newMessage));
    }
  }

  /**
   * Change a player's score in a specific room.
   * @param {String} playerNickname Player nickname.
   * @param {Number} roomCode Unique room code.
   * @param {Number} points Points to be added to the player.
   * @returns The new value of the player's points.
   */
  changePlayerScore(playerNickname, roomCode, points) {
    const room = this.availableRooms.get(roomCode);
    const players = room.get('players');
    const player = players.get(playerNickname);
    const playerInfo = player.get('playerInfo');
    let playerPoints = playerInfo.get('points');
    playerPoints += points;
    playerInfo.set('points', playerPoints);

    const roomPlayers = this.playerRankingPorRoom.get(roomCode);
    for (let playerIndex = 0; playerIndex < roomPlayers.length; playerIndex += 1) {
      if (roomPlayers[playerIndex].nickname === playerNickname) {
        roomPlayers[playerIndex].points = playerPoints;
      }
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
   * Orders array by points.
   * @param {Number} roomCode Unique room code.
   */
  orderPlayersByPoints(roomCode) {
    const roomPlayers = this.playerRankingPorRoom.get(roomCode);
    if (roomPlayers) {
      roomPlayers.sort((a, b) => a.quantity - b.quantity);
      console.log(`roomPlayers: ${JSON.stringify(roomPlayers)}`);
    }
  }

  /**
   * Saves winners if they have the highest score.
   * @param {Map} playersMap Player Map with specific room's players.
   */
  saveToTop3(roomCode, playersMap) {
    this.orderPlayersByPoints(roomCode);
    fs.readFile('top3.txt', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const top3Array = data.split(/\r?\n/);
        const topScorePlayer = new Map([
          ['nickname', ''],
          ['score', ''],
        ]);
        /* for (let arrayIndex = 0; arrayIndex < top3Array.length; arrayIndex += 1) {
          const splitLine = top3Array[arrayIndex].split(',');
          if (winnerPlayer.score < splitLine[1]) {

          }
        } */
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

    const newMessage = {
      type: 'handleTimesUp',
      players: this.createPlayerStringMap(playersMap),
    };

    this.saveToTop3(code, playersMap);
    socket.send(JSON.stringify(newMessage));
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

  /**
   * Returns player map with given nickname, in given room.
   * @param {Number} code Code of room.
   * @param {String} nickname Nickname of player.
   * @returns Player map with their information.
   */
  getPlayerMap(code, nickname) {
    let player = null;
    if (code && nickname && this.availableRooms.has(code)) {
      const roomInfo = this.availableRooms.get(code);
      if (roomInfo && roomInfo.has('players')) {
        const playersMap = roomInfo.get('players');
        if (playersMap && playersMap.has(nickname)) {
          player = playersMap.get(nickname);
        }
      }
    }
    return player;
  }
}

// Creating new server instance listening in given port.
const server = new WebSocket.Server({ port: 8009 });
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
  const messageType = receivedMessage.type;
  if (serverInstance[messageType]) {
    serverInstance[messageType](socket, receivedMessage);
  } else {
    console.log('No se reconoce ese mensaje.');
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
