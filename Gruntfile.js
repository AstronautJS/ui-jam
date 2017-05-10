module.exports = function(grunt) {

  // Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		sass: { 
			dist: {
				files: [{
					expand: true,
					cwd: 'sources/_scss',
					src: ['context.scss'],
					dest: './dist/_css/',
					ext: '.css'
			  	}]
			}
		},

		concat: {
			js: {
				files: {
					'./dist/_js/concated.js': ['./sources/_js/*.js', '!./sources/_js/context.js'],
					'./dist/_js/context.js': ['./dist/_js/concated.js', './sources/_js/context.js']
				}
			}	
		},

		jshint: {
			all: ['./sources/**/*.js']
		}
		
	});

	
	// OLDDEST
  	//grunt.loadNpmTasks('grunt-contrib-uglify');
	
	
	// NEWEST and dinamic modules load
	require('load-grunt-tasks')(grunt);


  	// Default task(s).
 	grunt.registerTask('default', ['sass']);
};
