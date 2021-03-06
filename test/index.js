const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const awesomeLint = require('awesome-lint');
const Lab = require('lab');

const lab = Lab.script();
exports.lab = lab;

lab.before(done => {
	helpers.run(path.join(__dirname, '../app'))
		.withPrompts({
			title: 'Awesome Awesomeness',
			description: 'A curated list of awesomeness',
			username: 'Awesomov Awesomovic',
			email: 'awe@so.me'
		})
		.on('end', done);
});

lab.test('all files are created', done => {
	assert.file([
		'.gitattributes',
		'code-of-conduct.md',
		'contributing.md',
		'readme.md'
	]);
	done();
});

lab.experiment('code-of-conduct.md', () => {
	lab.test('contains email', done => {
		assert.fileContent('code-of-conduct.md', 'awe@so.me');
		done();
	});
});

lab.experiment('readme.md', () => {
	lab.test('contains title', done => {
		assert.fileContent('readme.md', 'Awesome Awesomeness');
		done();
	});

	lab.test('contains description', done => {
		assert.fileContent('readme.md', 'A curated list of awesomeness');
		done();
	});

	lab.test('contains username', done => {
		assert.fileContent('readme.md', 'Awesomov Awesomovic');
		done();
	});
});

lab.test('lint', done => {
	awesomeLint().then(vfile => {
		if (vfile.messages.length === 0) {
			done();
		} else {
			done(new Error(vfile.messages));
		}
	}).catch(done);	// If there's an error, pass it to `done()`
});
