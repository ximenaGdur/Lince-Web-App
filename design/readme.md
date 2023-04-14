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

## Estructura de los mensajes JSON

## Simulación de sesión de juego - texto

## Simulación de sesión de juego - JSON

## Máquinas de estados

## Algoritmos de las transiciones de la máquina de estados

### Para el cliente

#### returnToMain:
```
```

#### createSession(userNickname):
```
```

#### joinSession(userNickname, roomId:
```
```

#### changeNickname(newNickame):
```
```

#### changeMaxTime(maxTime):
```
```

#### changeChipsPerPlayer:
```
	
```

#### changeChipsPerRound:
```
	
```

#### changeFirstAdaptation:
```
	
```

#### changeSecondAdaptation:
```
	
```

#### changeThirdAdaptation:
```
	
```

#### startGame:
```
	
```

#### executePlayerEvent:
```
	
```

#### pieceMatched:
```
	
```

#### incrementScore:
```
	
```

#### finishGame:
```
	
```

### Para el servidor

#### returnToMainReceived:
```
	
```

#### createSessionReceived:
```
	
```

#### joinSessionReceived:
```
	
```

#### nicknameReceived:
```
	
```

#### maxTimeReceived:
```
	
```

#### chipsPerPlayerReceived:
```
	
```

#### chipsPerRoundReceived:
```
	
```

#### firstAdaptationReceived:
```
	
```

#### secondAdaptationReceived:
```
	
```

#### thirdAdaptationReceived:
```
	
```

#### startGameReceived:
```
	
```

#### playerEventReceived:
```
	
```

#### matchReceived:
```
	
```

#### scoreReceived:
```
	
```

#### finishGameReceived:
```
	
```