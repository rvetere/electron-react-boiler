const colors = require('./colors')

const theme = process.env.THEME || 'galaxus'

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
  digitec: {
    portalId: 25,
    fontFamilyDefinition: 'Roboto',
    fontFamily: 'Roboto, Arial, sans-serif',
    primaryColor: allports,
    ascendColor: monza,
    linkColor: allports,
    linkHoverColor: monza,
    lightDelimiterColor: periwinkleGray,
    darkDelimiterColor: nobel,
    overlayColor: allports03,
    successColor: grassland,
    successBackgroundColor: grassland,
    validColor: grassland,
    errorColor: monza,
    errorBackgroundColor: ferrari,
    infoColor: goldenDream,
    infoBackgroundColor: goldenDream,
    lightBackgroundColor: blackSqueeze2,
    invertedColor: allports,
    skeletonBackground: blackSqueeze1
  },
  galaxus: {
    portalId: 22,
    fontFamilyDefinition: 'Gibson',
    fontFamily: 'Gibson, Arial, sans-serif',
    primaryColor: scorpion,
    ascendColor: black,
    linkColor: mariner,
    linkHoverColor: greenVogue,
    lightDelimiterColor: alto,
    darkDelimiterColor: nobel,
    overlayColor: scorpion03,
    successColor: apple,
    successBackgroundColor: apple,
    validColor: grassland,
    errorColor: valencia,
    errorBackgroundColor: jaffa,
    infoColor: sunglow,
    infoBackgroundColor: sunglow,
    lightBackgroundColor: wildSand,
    invertedColor: mineShaft,
    skeletonBackground: gallery
  }
}

module.exports = { ...themes[theme], THEME: theme }
