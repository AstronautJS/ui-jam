module.exports = function(grunt) {
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
		},

     	watch: {
		 	scripts: {
				files: ['./sources/**/*.js', './sources/**/*.scss'],
				tasks: ['default'],
				options: {
			  		spawn: false,
				},
		  	},
		}
	});

	
	// NEWEST and dinamic modules load
	require('load-grunt-tasks')(grunt);


  	// Default task(s).
 	grunt.registerTask('default', ['sass', 'jshint', 'concat:js']);
};
