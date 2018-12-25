const colors = require('./colors')

const theme = process.env.THEME || 'default'

const {
  allports,
  allports03,
  jaffa,
  monza,
  ferrari,
  mariner,
  mineShaft,
  grassland,
  periwinkleGray,
  nobel,
  scorpion,
  scorpion03,
  apple,
  wildSand,
  blackSqueeze2,
  black,
  alto,
  greenVogue,
  goldenDream,
  sunglow,
  valencia,
  blackSqueeze1,
  gallery
} = colors

const themes = {
  default: {
    fontFamilyDefinition: 'Gibson',
    fontFamily: 'Gibson, Arial, sans-serif',
    primaryColor: wildSand,
    ascendColor: black,
    linkColor: mariner,
    linkHoverColor: greenVogue,
    lightDelimiterColor: alto,
    focusColor: sunglow,
    darkDelimiterColor: nobel,
    overlayColor: scorpion03,
    successColor: apple,
    successBackgroundColor: apple,
    validColor: grassland,
    errorColor: valencia,
    errorBackgroundColor: jaffa,
    infoColor: sunglow,
    infoBackgroundColor: sunglow,
    lightBackgroundColor: scorpion,
    invertedColor: mineShaft,
    skeletonBackground: gallery
  }
}

module.exports = { ...themes[theme], THEME: theme }
