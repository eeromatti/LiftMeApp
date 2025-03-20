const esbuild = require('esbuild')
const { copy } = require('esbuild-plugin-copy')

// Run the esbuild process
esbuild.build({
  entryPoints: ['../frontend/src/main.jsx'], // Entry point of the frontend
  bundle: true,  // Bundle all files into one JS file
  minify: true,  // Minify the code for production
  outfile: 'dist/out.js', // Output bundled JS file in the dist folder
  loader: {
    '.css': 'css', // Ensure CSS is properly bundled into JS
  },
  plugins: [
    copy({
      resolveFrom: 'cwd', // Make sure paths are resolved from the current working directory
      assets: [
        { from: '../frontend/public/*', to: './dist' },
        { from: '../frontend/src/styles.css', to: './dist' },
        { from: '../frontend/node_modules/maplibre-gl/dist/maplibre-gl.css', to: './dist' }, // MapLibre CSS
      ],
    }),
  ],
// eslint-disable-next-line no-undef
}).catch(() => process.exit(1))  // Exit if the build fails
