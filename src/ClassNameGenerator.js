class ClassNameGenerator {
  constructor(isDark) {
    this.isDarkTheme = isDark
  }

  getClassName = name => (this.isDarkTheme ? `${name}-dark` : name)
}

export default ClassNameGenerator
