import app from "./app";
import config from "./config";
import initDb from "./config/db";

initDb();
app.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}`);
});
