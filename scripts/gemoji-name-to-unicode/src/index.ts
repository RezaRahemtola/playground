import fs from "fs";
import { nameToEmoji } from "gemoji";
import glob from "glob";
import { exit } from "process";

glob("/home/reza/poc/wk/**/*.md", (error, files) => {
	let unknownEmojis = false;
	if (error) exit(1);

	files.forEach((file) => {
		const data = fs.readFileSync(file);
		let content = data.toString();

		const matches = content.match(/ :[a-z_]+:/g);

		matches?.forEach((match) => {
			const code = match.replaceAll(":", "");

			if (nameToEmoji[code]) {
				content = content.replaceAll(match, nameToEmoji[code]);
			} else {
				console.error(`Unknown gemoji code ${match} found in ${file}`);
				unknownEmojis = true;
			}
		});

		if (content !== data.toString()) {
			fs.writeFileSync(file, content);
		}
	});

	if (unknownEmojis) exit(1);
});
