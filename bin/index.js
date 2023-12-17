#! /usr/bin/env node

import fs from 'fs';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

yargs(hideBin(process.argv))
	.command('list', 'List all commands', () => {
		console.info("List commands: \n vurl <url> : Fetch the contents of the URL to view \n list : List all commands \n --help : Help \n --version : Version \n")
	}, () => { })
	.command('comp ', ' generate pascal script function', () => { }, (args) => {
		comps(process.argv[3]);
	})
	.demandCommand(1)
	.parse();

function functions(args) {
	console.info(args)
}


function comps(args) {

	fs.readFile('./source/pas/'+args, 'utf8', (err, data) => {
		if (err) {
			console.error(err);
			return;
		}

		const result = data.replaceAll(";","").split(/\r?\n/);

		const tes = combile(result);

		console.log(tes);
		fs.writeFile("./src/ps/" + args.split(".")[0]+".js", tes
			, function (err) {
				if (err) {
					return console.log(err);
				}
				console.log("The file was saved!");
			});
		// fs.readFile('./data/data.json', 'utf8', (err, dat) => {

		// 	let confData = JSON.parse(dat);
		// 	console.log(dat);
		// 	confData.forEach(element => {
		// 		re = re.replaceAll(element.var, element.val);
		// 		console.log(re);
		// 	})
		// 	fs.writeFile("./dist/intro.css", re
		// 	, function (err) {
		// 		if (err) {
		// 			return console.log(err);
		// 		}
		// 		console.log("The file was saved!");
		// 	});
		// });
		

	});
}

function combile(lis){
	let result = '';
	for(let ln in lis){
		console.log(lis[ln]);
		result = result + lis[ln].replace("program ", "var program = function ").replaceAll("begin","(){").replaceAll("end.","}").replaceAll("writeln","console.log") + "\n";
	}
	return result+"\n program();";
}