/**
 * Created by jbush_000 on 5/19/2016.
 */
const ServerConfig = {
    maxX: 780,
    maxY: 480,
    SPAWN_SPEED: 2000,
    Gerbil_Colors: {red: 'red', blue: 'blue', green: 'green', yellow: 'orange'},
    IO: {
        DEFAULT_CONNECTION: 'connection',
        DISCONNECT: 'disconnect',
        INCOMING: {
            MOUSE_CLICK: 'mouse click',
            RESTART_GAME: 'restart game',
            NEW_PLAYER: 'new player'
        },
        OUTGOING: {
            GERBIL_SPAWN: 'gerbil spawn',
            PLAYER_LIST: 'player list',
            PLAYER_NAME: 'player name',
            GAME_TICK: 'game tick'
        }
    }
};

module.exports = ServerConfig;