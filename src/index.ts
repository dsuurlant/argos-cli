import yargs from "yargs";
import { run } from "./run";
import { upload } from "./upload";

yargs(process.argv.slice(2))
    .scriptName("argos")
    .command<Parameters<typeof run>[0]>(
        "run <path>",
        "",
        (yargs) => {
            yargs
                .positional("path", {
                    type: "string",
                })
                .option("revision", {
                    alias: "r",
                    demandOption: true,
                    type: "string",
                })
                .option("samples", {
                    alias: "s",
                    default: 1,
                    type: "number",
                })
                .example([
                    ["$0 run ./my_project.yml -r my_revision", ""],
                    ["$0 run ./my_project.yml -r my_revision -t 2", ""],
                ]);
        },
        run,
    )
    .command<Parameters<typeof upload>[0]>(
        "upload <paths...>",
        "",
        (yargs) => {
            yargs
                .positional("paths", {})
                .option("url", {
                    alias: "u",
                    default: "http://localhost:3001",
                    type: "string",
                })
                .example([
                    ["$0 upload tmp/my_project/my_revision-*.json", ""],
                    ["$0 upload tmp/**/*.json -- -u http://example.com", ""],
                ]);
        },
        upload,
    )
    .strict()
    .version(false)
    .help().argv;
