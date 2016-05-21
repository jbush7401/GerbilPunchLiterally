/**
 * Created by jbush_000 on 5/21/2016.
 */
const uuid = require('node-uuid');

class NameService{
    getPlayerName(){
        return uuid.v4();
    }
}

module.export = NameService;