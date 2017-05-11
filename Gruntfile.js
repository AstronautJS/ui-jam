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
		},

		copy: {
		 	html: {
				files: [
					{
						filter: 'isFile',
						flatten: true,
						expand: true,
						src: [
							'./sources/index.html',
						],
						dest: './dist'
					}
				],
		  	},
			template: {
				files: [
					{
						filter: 'isFile',
						flatten: true,
						expand: true,
						src: [
							'./sources/_templates/**',
						],
						dest: './dist/_templates/'
					}
				],
		  	},
            image: {
				files: [
					{
						filter: 'isFile',
						flatten: true,
						expand: true,
						src: [
							'./sources/_img/**',
						],
						dest: './dist/_img/'
					}
				],
		  	}
		}
	});

	
	// NEWEST and dinamic modules load
	require('load-grunt-tasks')(grunt);


  	// Default task(s).
 	grunt.registerTask('default', [
        'copy:html',
        'copy:template',
        'copy:image',
        'sass',
        'jshint',
        'concat:js'
    ]);
};
