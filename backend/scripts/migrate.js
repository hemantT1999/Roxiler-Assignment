require("dotenv").config();
const { exec } = require("child_process");

const dbUrl = process.env.DATABASE_URL;
console.log("DATABASE_URL:", process.env.DATABASE_URL);
const command = `npx sequelize-cli db:migrate --env production`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});
