module.exports = function(grunt) {

  // Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		//taksName: {}
	});

	
	// OLDDEST
  	//grunt.loadNpmTasks('grunt-contrib-uglify');
	
	
	// NEWEST and dinamic modules load
	require('load-grunt-tasks')(grunt);


  	// Default task(s).
 	grunt.registerTask('default', ['uglify']);
};
