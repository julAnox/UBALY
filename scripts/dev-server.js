const { spawn } = require("child_process");
const path = require("path");
const os = require("os");

const isWindows = os.platform() === "win32";

async function setupBackend() {
  console.log("Инициализирую бэкенд...\n");

  return new Promise((resolve) => {
    const pythonCmd = isWindows ? "python" : "python3";
    const backendDir = path.join(__dirname, "..", "backend");

    const initProcess = spawn(pythonCmd, ["init_db.py"], {
      cwd: backendDir,
      stdio: "inherit",
    });

    initProcess.on("close", (code) => {
      if (code === 0) {
        console.log("\nБэкенд инициализирован\n");
      } else {
        console.log(
          "\nБэкенд инициализация не удалась, но фронтенд будет запущен\n",
        );
      }
      resolve();
    });

    initProcess.on("error", () => {
      console.log("\nБэкенд недоступен, но фронтенд будет запущен\n");
      resolve();
    });
  });
}

async function startServers() {
  console.log("\nЗапускаю серверы...\n");

  const npmCmd = isWindows ? "npm.cmd" : "npm";
  const frontendProcess = spawn(npmCmd, ["run", "dev:frontend"], {
    cwd: path.join(__dirname, ".."),
    stdio: "inherit",
    shell: isWindows,
  });

  setTimeout(() => {
    const pythonCmd = isWindows ? "python" : "python3";
    const backendDir = path.join(__dirname, "..", "backend");

    const versionCheck = spawn(pythonCmd, ["--version"]);

    versionCheck.on("close", (code) => {
      if (code === 0) {
        console.log("\nЗапускаю Django....\n");

        const backendProcess = spawn(
          pythonCmd,
          ["manage.py", "runserver", "0.0.0.0:8000"],
          {
            cwd: backendDir,
            stdio: "inherit",
          },
        );

        backendProcess.on("error", () => {
          console.log("Django не запустился");
        });
      }
    });

    versionCheck.on("error", () => {
      console.log("Python недоступен, пропускаю Django\n");
    });
  }, 2000);

  frontendProcess.on("error", (err) => {
    console.error("Ошибка запуска Next.js:", err);
    process.exit(1);
  });

  process.on("SIGINT", () => {
    console.log("\n\n📴 Завершаю серверы...");
    frontendProcess.kill();
    process.exit(0);
  });
}

async function main() {
  try {
    const pythonCmd = isWindows ? "python" : "python3";
    const versionProcess = spawn(pythonCmd, ["--version"]);

    versionProcess.on("error", () => {
      console.error("Python не установлен. Пожалуйста установите Python 3.8+");
      process.exit(1);
    });

    versionProcess.on("close", async (code) => {
      if (code === 0) {
        await setupBackend();
      } else {
        console.log("Python не установлен. Запускаю только фронтенд...\n");
      }

      await startServers();
    });
  } catch (error) {
    console.error("Ошибка:", error.message);
    process.exit(1);
  }
}

main();
