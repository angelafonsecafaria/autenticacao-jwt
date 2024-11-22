// scripts/set-version.js
const fs = require('fs');
const path = require('path');

// Caminho para o arquivo package.json
const packageJson = require(path.join(__dirname, '../package.json'));  // caminho relativo para a raiz
// Caminho para o arquivo environment.ts
const environmentPath = path.join(__dirname, '../src/environments/environment.ts');

// Template de conteúdo para o environment.ts
const environmentContent = `
  export const environment = {
    production: false,
    appVersion: '${packageJson.version}', // A versão do package.json
    appName: '${packageJson.name}', // O nome do package.json
  };
`;

// Substitui o conteúdo de environment.ts com os dados do package.json
fs.writeFileSync(environmentPath, environmentContent, 'utf8');

console.log(`Versão ${packageJson.version} e nome ${packageJson.name} injetados em environment.ts`);
