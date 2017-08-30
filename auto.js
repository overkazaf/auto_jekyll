const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const execSync = cp.execSync;
const exec = cp.exec;
const moment = require('moment');

// VPS的blog存放地址
const VPS_PATH = 'root@159.203.118.69:/root/sites/johnblog/_posts';

const args = process.argv;
const file = args[2];

// 本地原始文件的存放目录
const __file_prefix = './raw/';
const categories = Array.prototype.slice.call(args, 3);
const [title, format] = file.split('.');
console.log('Waiting to execute scp command...');


const date = new Date();
const formatedDate = moment().format('YYYY-MM-DD hh:mm:ss');

const padstr = `---
layout: post
title:  "${title}"
date:   ${formatedDate} +0800
categories: ${categories}
---
`;

try {
	fs.readFile(__file_prefix + file, 'utf-8', function (err, content) {
		const markdown = `${padstr}\r\n${content}\r\n`;
		const [date] = formatedDate.split(' ');
		const targetPath = path.join(__dirname, `posts/${date}-${file}`);

		fs.writeFile(targetPath, markdown, function(err) {
			if (err) {
				throw err;
			}

			const scpCommand = `scp ${targetPath} ${VPS_PATH}`;
			const child = exec(scpCommand);

			child.stdout.pipe(process.stdout);
			child.stderr.pipe(process.stderr);
		});
	});
} catch (e) {
	throw e;
}


