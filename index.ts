import concurrently from "concurrently";

concurrently([
    {
        name: "server",
        command: "bun dev",
        cwd: "./packages/server",
        prefixColor: "cyan"
    },
    {
        name: "client",
        command: "bun dev",
        cwd: "./packages/client",
        prefixColor: "green"
    }
], {
    killOthersOn: ["failure", "success"],
    restartTries: 3
})