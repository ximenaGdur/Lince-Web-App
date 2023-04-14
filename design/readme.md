# Wireframes

## Mapa del sitio

La siguiente imágen representa el mapa del sitio:

![Mapa del sitio](siteMap.svg)

Como se puede observar existen dos caminos dependiendo de el rol que se escogió.
En caso de ser un anfitrión, este se encarga de crear una sala y configurar el modo de juego.
Por esto mismo, su sala de espera es diferente para permitirle realizar estos cambios.

En el caso del invitado, este debe ingresar un código de sala proporcionado por su anfitrión.
Su sala de espera permite que este observe los cambios que se realizan al modo de juego.

Al final, ambos roles culminan en la sala del juego.
En esta pantalla pueden jugar ***¡Muy Lentos!*** con sus amigos.

## Página Principal

Esta será la primera pantalla que verá un usuario al ingresar al juego, en esta encontra los botones para poder crear o unirse a una.

### Instruciones del juego

Al dar click en el botón "¿Cómo jugar?" de la barra, se podrán vizualizar las  instrucciones del juego por medio de un video explicativo.
![Instrucciones](homeInstructions.svg)

### Tabla de mejores puntajes

Al dar click en el botón "Clasificación" de la barra, en el cuadro de texto se mostrara un historial de los 3 mejores puntajes que han existido en el juego.

![Mejores puntajes](homeLeaderboard.svg)

### Créditos

Al dar click en el botón "Créditos" de la barra, se mostrará la información al respecto sobre los desarrolladores del juego ***¡Muy Lentos!*** y las debidas referencias de todo material de terceros utilizado para el desarrollo del mismo.

![Créditos](homeCredits.svg)

## Sala de Espera

### Para un anfitrión

En el caso de un anfitrión, este tiene los permisos necesarios para configurar el juego a su gusto.
Además de esto, el anfitrión puede modificar los nombres de los jugadores y al hacer click en el botón de SALIR, terminará la sesión y será redireccionado a la página de inicio.

![Sala de espera para anfitrión](waitingRoomHost.svg)

### Para un invitado

En el caso de un invitado, este puede observar los cambios hechos a la configuración del juego por parte del anfitrión en tiempo real.
Sin emabargo, no puede editar nada. Al hacer click en el botón de SALIR, se saldrá de la sesión y será redireccionado a la página de inicio.

![Sala de espera para invitado](waitingRoomGuest.svg)

### Información disponible al mantener en el mouse sobre el ícono 'i'

Al mantener el mouse sobre el ícono, en caso de una página web, se mostrará más información acerca de ese campo.
Ambos roles de la página (anfitrión e invitado) pueden ver esta información.

![Sala de espera con más información](waitingRoomInit.svg)

## Tablero del juego

Como se observan en las siguientes imágenes, dichas corresponden a imágenes de partidas ya iniciados o en curso donde se puede ver la manta o tablero de imágenes, las fichas que yo como jugador tengo, el tiempo de la partida, los puntajes y posiciones de todos en la misma partida y si existe o se activará algún comodín/mejora/sanción para alguno de los jugadores. Además se puede observar el mensaje de advertencia que le saldría a un jugador en caso de que quiera abandonar una partida antes de que esta termine.

![Pantalla de juego](gameScreen.svg)

![Mensaje de advertencia](gameScreenError.svg)

# Protocolo de paso de mensajes

## Eventos de usuario y red en wireframes

Las siguientes imágenes muestran los eventos principales en cada pantalla de juego.

![Eventos Pantalla Inicio](EventosPantallaInicio.PNG)

![Eventos Sala Espera](EventosSalaEsperaHostGuest.PNG)

![Eventos Juego](EventosPantallaJuego.PNG)

## Estructura de los mensajes JSON

La estructura básica de los mensajes incluye siempre: el tipo de mensaje, el emisor y el destinatario.
Además, los mensajes de los clientes incluyen when, lo cual explica en qué momento se manda el mensaje.
En el caso del servidor, este puede mandarle un objeto html al cliente.

Algunos ejemplos de mensajes se muestran a continuación.

```
{
    "Type": "start_game",
    "From": "client",
    "To": "server",
    "When": "when a host client presses the start game button"
}
```

```
{
    "Type": "start_game",
    "From": "server",
    "To": "client",
    "Object":  mainGame.html
}
```

## Simulación de sesión de juego - texto

![Primera parte del mensaje](message1.svg)
![Segunda parte del mensaje](message2.svg)
![Tercera parte del mensaje](message3.svg)
![Cuarta parte del mensaje](message4.svg)

## Simulación de sesión de juego - JSON

![Primera parte del mensaje](captura1.svg)
![Segundo parte del mensaje](captura2.svg)
![Tercero parte del mensaje](captura3.svg)
![Cuarto parte del mensaje](captura4.svg)
![Quinta parte del mensaje](captura5.svg)
![Sexta parte del mensaje](captura6.svg)
![Sétima parte del mensaje](captura7.svg)
![Octava parte del mensaje](captura8.svg)
![Novena parte del mensaje](captura9.svg)

## Máquinas de estados

### Para el servidor

![Máquina de estado Servidor](AutómataServidor.svg)

### Para el cliente

![Máquina de estado Cliente](automataCliente.svg)

### De la página principal

![Máquina de estado Main Page](Aut%C3%B3matasMainPage.svg)

## Algoritmos de las transiciones de la máquina de estados

### Para el cliente

#### returnToMain

```
	userConfirmation = askConfirmation()

	if userConfirmation = yes:
		mainRoomURL = sendMessage(userNickname, "get mainRoom")
		redirectTo(mainRoomURL)
```

#### createSession(userNickname)

```
	userInformation.json << type = "createSession" << from = newNickame << to = server << userNickname = newNickame
	waitingRoomURL, roomId = sendMessage(userNickname, "get userInformation.json")
	configuration.json << roomId
	redirectTo(waitingRoomURL)
```

#### joinSession(userNickname, roomId)

```
	userInformation.json << type = "joinSession" << from = userNickname << to = server << userNickname = newNickame << room = roomId
	waitingRoomURL = sendMessage(userNickname, "get waitingRoomGuest userInformation.json")
	redirectTo(waitingRoomURL)
```

#### changeNickname(newNickame)

```
	configuration.json << type = "changeNickname" << from = userNickname << to = server << userNickname = newNickame
	pageChange = sendMessage(userNickname, "post configuration.json")
	updatePage(pageChange)
```

#### changeMaxTime(chosenTime)

```
	configuration.json << type = "changeMaxTime" << from = userNickname << to = server << maxTime = chosenTime
	pageChange = sendMessage(userNickname, "post configuration.json")
	updatePage(pageChange)
```

#### changeCardsPerPlayer(cardAmount)

```
	configuration.json << type = "changeCardsPerPlayer" << from = userNickname << to = server << cardsPerPlayer = cardAmount 
	pageChange = sendMessage(userNickname, "post configuration.json")
	updatePage(pageChange)
```

#### changeCardsPerRound(cardAmount)

```
	configuration.json << type = "changeCardsPerRound" << from = userNickname << to = server << cardsPerRound  = cardAmount
	pageChange = sendMessage(userNickname, "post configuration.json")
	updatePage(pageChange)
```

#### changeFirstAdaptation(option)

```
	if option  = 0:
		configuration.json << type = "changeFirstAdaptation" << from = userNickname << to = server << firstAdaptationA = yes
	if option = 1:
		configuration.json << type = "changeFirstAdaptation" << from = userNickname << to = server << firstAdaptationB = yes

	pageChange = sendMessage(userNickname, "post configuration.json")
	updatePage(pageChange)
```

#### changeSecondAdaptation(option)

```
	if option  = 0:
		configuration.json << type = "changeSecondAdaptation" << from = userNickname << to = server << secondAdaptationA = yes
	if option = 1:
		configuration.json << type = "changeSecondAdaptation" << from = userNickname << to = server << secondAdaptationB = yes

	pageChange = sendMessage(userNickname, "post configuration.json")
	updatePage(pageChange)
```

#### changeThirdAdaptation(option)

```
	if option  = 0:
		configuration.json << type = "changeThirdAdaptation" << from = userNickname << to = server << thirdAdaptationA = yes
	if option = 1:
		configuration.json << type = "changeThirdAdaptation" << from = userNickname << to = server << thirdAdaptationB = yes

	pageChange = sendMessage(userNickname, "post configuration.json")
	updatePage(pageChange)
```

#### startGame

```
	mainGameURL = sendMessage(userNickname, "get mainGame configuration.json")
	redirectTo(mainGameURL)
```

#### executePlayerEvent(eventType, eventTime)

```
	eventInformation.json << player = userNickname << type = eventType << time = eventTime
	pageChange = sendMessage(userNickname, "post eventInformation.json")
	updatePage(pageChange)
	// con lo que me retorna, actualiza mi pagina y la de los demas
```

#### cardMatched(rowClicked, columnClicked)

```
	matchInformation.json << player = userNickname << matchRow = rowClicked << matchColumn = columnClicked
	valid = sendMessage(userNickname, "post matchInformation.json")
	
	if valid = true
		pageChange = sendMessage(userNickname, "get incrementScore")
		updatePage(pageChange)
	else
		pageChange = sendMessage(userNickname, "get wrongMatch")
		updatePage(pageChange)
```

#### finishGame

```
	finishGameURL = sendMessage(userNickname, "get finishGameURL")
	redirectTo(finishGameURL)
```

### Para el servidor

#### returnToMainReceived(userNickname)

```
	sendMessageTo(userNickname, mainPage.html)
```

#### createSessionReceived(userNickname)

```
	waitingRoomHost.html = assembleWaitingRoomHost()
	sendMessageTo(userNickname, waitingRoomHost.html)
```

#### joinSessionReceived(userNickname)

```
	waitingRoomGuest.html = assembleWaitingRoomGuest()
	sendMessageTo(userNickname, waitingRoomGuest.html)
```

#### nicknameReceived(userNickname)

```
	waitingRoomGuest.html = updateWaitingRoomGuest(userNickname)
	broadcast(waitingRoomGuest.html)
```

#### maxTimeReceived(maxTime)

```
	waitingRoomGuest.html = updateWaitingRoomGuest(maxTime)
	broadcast(waitingRoomGuest.html)
```

#### cardsPerPlayerReceived(cards)

```
	waitingRoomGuest.html = updateWaitingRoomGuest(cards)
	broadcast(waitingRoomGuest.html)
```

#### cardsPerRoundReceived

```
	waitingRoomGuest.html = updateWaitingRoomGuest(cards)
	broadcast(waitingRoomGuest.html)
```

#### firstAdaptationReceived(option)

```
	waitingRoomGuest.html = updateWaitingRoomGuest(option)
	broadcast(waitingRoomGuest.html)
```

#### secondAdaptationReceived(option)

```
	waitingRoomGuest.html = updateWaitingRoomGuest(option)
	broadcast(waitingRoomGuest.html)
```

#### thirdAdaptationReceived(option)

```
	waitingRoomGuest.html = updateWaitingRoomGuest(option)
	broadcast(waitingRoomGuest.html)
```

#### startGameReceived(configu)

```
	waitingRoomGuest.html = assembleGame()
	broadcast(waitingRoomGuest.html)
```

#### playerEventReceived(playerNickname)

```
	waitingRoomGuest.html = updateWaitingRoomGuest(option)
	broadcast(waitingRoomGuest.html)
```

#### matchReceived(playerNickname, x, y, cardInfo)

```
	if cardInfo = getCard(x,y):
		waitingRoomGuest.html = updateWaitingRoomGuest(true, playerNickname, score)
		broadcast(waitingRoomGuest.html)
	else:
		waitingRoomGuest.html = updateWaitingRoomGuest(false)
		sendMessageTo(playerNickname, waitingRoomGuest.html)
```

#### finishGameReceived

```
	if time = 0 || cards = 0:
		endGameURL = assembleEndRoom()
		broadcast(endGameURL)
```