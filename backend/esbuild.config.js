const esbuild = require('esbuild')
const { copy } = require('esbuild-plugin-copy')

// Run the esbuild process
esbuild.build({
  entryPoints: ['../frontend/src/main.jsx'],  // Entry point of the frontend
  bundle: true,  // Bundle all files into one JS file
  minify: true,  // Minify the code for production
  outfile: 'dist/out.js',  // Output bundled JS file in the dist folder
  plugins: [
    copy({
      resolveFrom: 'cwd',  // Make sure paths are resolved from the current working directory
      assets: [
        {
          from: '../frontend/public/*',  // Copy all files from the public directory
          to: './dist/public/',  // Place them in the dist/public folder
        },
      ],
    }),
  ],
// eslint-disable-next-line no-undef
}).catch(() => process.exit(1))  // Exit if the build fails
