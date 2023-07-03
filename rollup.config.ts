export default {
  onwarn: (warning, warn) => {
    if (
      warning.code === 'CIRCULAR_DEPENDENCY' &&
      /[/\\]node_modules[/\\]pdfmake[/\\]/.test(warning.importer)
    ) {
      return
    }
    warn(warning)
  },
}
