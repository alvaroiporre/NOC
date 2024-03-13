import { envs } from "./config/plugins/envs.plugin";
import { Server } from "./presentation/server";
const main = () => {
  Server.start();
}

(async () => {
  //main()
  console.log(envs);
})();

