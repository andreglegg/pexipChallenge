const isShape = require('vet/objects/isShape');
const isString = require('vet/strings/isString');
const isNumber = require('vet/numbers/isNumber');
const isBoolean = require('vet/booleans/isBoolean');
const assert = require('vet/utils/assert');
const optional = require('vet/optional');

const isMessage = isShape(
    {
        id: isString,
        userId: isString,
        message: isString,
        isDeleted: isBoolean,
        createdAt: optional(isNumber),
        updatedAt: optional(isNumber),
    }
);

isMessage.assert = assert(isMessage);

module.exports = isMessage;
