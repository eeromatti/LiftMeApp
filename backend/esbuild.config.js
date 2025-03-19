const esbuild = require('esbuild')
const copyPlugin = require('esbuild-plugin-copy').copy

esbuild.build({
  entryPoints: ['../frontend/src/main.jsx'], 
  bundle: true,
  outfile: 'dist/out.js', 
  plugins: [
    copyPlugin({
      resolveFrom: 'cwd', 
      assets: {
        from: ['../frontend/public/*'], 
        to: ['./dist/public/'], 
      },
    }),
  ],
// eslint-disable-next-line no-undef
}).catch(() => process.exit(1))
