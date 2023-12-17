#! /usr/bin/env node

import fs from 'fs';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

yargs(hideBin(process.argv))
	.command('list', 'List all commands', () => {
		console.info("List commands: \n vurl <url> : Fetch the contents of the URL to view \n list : List all commands \n --help : Help \n --version : Version \n")
	}, () => { })
	.command('vurl <url>', 'fetch the contents of the URL to view', () => { }, (args) => {
		console.info(args)
	})
	.command('add <filename>', 'Add new function', () => { }, (args) => {
		functions(args)
	})
	.command('read <filename>', 'read JSON', () => { }, (args) => {

	})
	.command('import <projectDir>', 'read JSON', () => { }, (args) => {

	})
	.command('encode <filename>', ' encode function', () => { }, (args) => {

	})
	.command('gencss ', ' generate css style function', () => { }, (args) => {
		gencss(args);
	})
	.demandCommand(1)
	.parse();

function functions(args) {
	console.info(args)
}


function gencss(args) {

	fs.readFile('./source/dcss/intro.dcss', 'utf8', (err, data) => {
		if (err) {
			console.error(err);
			return;
		}

		let re = data;
		fs.readFile('./data/data.json', 'utf8', (err, dat) => {

			let confData = JSON.parse(dat);
			console.log(dat);
			confData.forEach(element => {
				re = re.replaceAll(element.var, element.val);
				console.log(re);
			})
			fs.writeFile("./dist/intro.css", re
			, function (err) {
				if (err) {
					return console.log(err);
				}
				console.log("The file was saved!");
			});
		});
		

	});
}
