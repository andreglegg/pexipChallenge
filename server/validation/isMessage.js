const isShape = require('vet/objects/isShape');
const isString = require('vet/strings/isString');
const assert = require('vet/utils/assert');
const optional = require('vet/optional');

const isMessage = isShape(
    {
        id: isString,
        userId: isString,
        message: isString,
        createdAt: optional(isString),
        updatedAt: optional(isString),
    }
);

isMessage.assert = assert(isMessage);

module.exports = isMessage;
