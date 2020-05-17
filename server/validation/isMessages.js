const isArrayOf = require('vet/arrays/isArrayOf');
const isMessage = require('./isMessage');

const isMessages = isArrayOf(isMessage);

module.exports = isMessages;
