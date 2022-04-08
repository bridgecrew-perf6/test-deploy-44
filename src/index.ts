import app from "./server";
import * as Env from "./env";

(async () => {
    try{
        app.listen(Env.port);
        console.log('server start',Env.port)
    } catch(e) {
        console.error(e)
    }
})();