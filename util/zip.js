/**
 * zip like python
 * @param rows
 * @returns {*}
 */
const zip = rows => rows[0].map((_, c) => rows.map(row => row[c]));

module.exports = zip;
