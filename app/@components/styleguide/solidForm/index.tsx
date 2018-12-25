import gridCss from '@postcss/utils/grid.css'
import React from 'react'
import Form from './sample'

export default (): JSX.Element => (
  <>
    <h2>Solid Form</h2>
    <div className={gridCss.col12}>
      <Form />
    </div>
  </>
)
