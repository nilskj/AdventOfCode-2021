const assert = require('assert/strict');

/**
 * Use native node assert
 * input is assertion error options
 * @param options
 */
function assertStrictEqual(options) {
	const { message } = new assert.AssertionError(options);
	try {
		assert.strictEqual(options.actual, options.expected);
	} catch (err) {
		assert(err instanceof assert.AssertionError);
		assert.strictEqual(err.name, 'AssertionError');
		assert.strictEqual(err.message, message);
		assert.strictEqual(err.actual, options.actual);
		assert.strictEqual(err.expected, options.expected);
		assert.strictEqual(err.code, 'ERR_ASSERTION');
		assert.strictEqual(err.operator, "strictEqual");
		assert.strictEqual(err.generatedMessage, true);
	}
}

/**
 * Quickly strictly assert
 * @param actual
 * @param expected
 */
function is(actual, expected) {
	assertStrictEqual({
		actual,
		expected
	})
}

module.exports = {
	assert: assertStrictEqual,
	is
}
