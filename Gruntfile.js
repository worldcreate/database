module.exports=function(grunt){
	grunt.initConfig({
		uglify:{
			dist:{
				src:"source/js/script.js",
				dest:"release/js/script-min.js"
			}
		},

		concat:{
			dist:{
				src:[
				'source/js/mainscript.js',
				'source/js/addscript.js'
				],
			dest:'source/js/script.js'
			}
		},

		cssmin:{
			dev:{
				src:['source/css/*.css'],
				dest:'release/css/min.css'
			}
		},

		htmlmin:{
			all:{
				expand:true,
				cwd:'source/',
				src:['*.html'],
				dest:'release/'
			}
		},

		jshint:{
			files:[
				'source/js/*.js'
			],
			options:{
				jshintrc:'.jshintrc'
			}
		},

		copy:{
			main:{
				expand:true,
				cwd:'source/cgi/',
				src:'**',
				dest:'release/cgi/',
				fileter:'isFile'
			}
		},

		'ftp-deploy':{
			build:{
				auth:{
					host:'sv3.php.xdomain.ne.jp',
					port:21,
					authKey:'key1'
				},
				src:'release/',
				dest:'/',
				exclusions:['.*','node_modules/*','Gruntfile.js','package.json']
			}
		}
		/*
		watch:{
			js:{
				files:["source/js/*.js"],
				tasks:['concat','uglify']
			},
			css:{
				files:["source/css/*.css"],
				tasks:['cssmin']
			},
			html:{
				files:["source/*.html"],
				tasks:['htmlmin']
			}
		}
		*/
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-ftp-deploy');

	grunt.registerTask('build',['jshint']);
	grunt.registerTask('release',['htmlmin','cssmin','concat','uglify','copy','ftp-deploy']);
};
