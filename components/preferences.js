"use strict"

const x = '{"themes":['+'{"theme":"hello"}]}';
const z = JSON.parse(x);

console.log(z.themes[0].theme);
