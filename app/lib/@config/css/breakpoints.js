/*
  Breakpoint definitions
  xs: 0 - 575px
  sm: 576px - 767px
  md: 768px - 991px
  lg: 992px - 1199px
  xl: 1200px - Infinity
--------------------------------------------------------------------------------- */
module.exports = {
  xs: { min: 0, max: '699px' },
  sm: { min: '700px', max: '991px' },
  md: { min: '992px', max: '1199px' },
  lg: { min: '1200px', max: '1399px' },
  xl: { min: '1400px', max: Infinity }
}
