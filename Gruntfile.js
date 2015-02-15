module.exports = function(grunt) {

    grunt.initConfig({
        simplemocha: {
            options: {
                globals: ['expect'],
                timeout: 3000,
                ignoreLeaks: false,
                ui: 'tdd',
                reporter: 'tap'
            },
            all: {
                src: ['test/*.js']
            }
        }
    });
    grunt.loadNpmTasks('grunt-simple-mocha');
    grunt.registerTask('default', 'simplemocha');
}