# Translations

To get a translation from our database you need to import the Translation component (`import Translation from '@core/translation'`) and pass the WordTranslationKey as a child.

## Simple Translation

```javascript
<Translation>Locations</Translation>
```

## Interpolations

Brackets and curly braces within the WordTranslationKey are automatically resolved correctly.

```javascript
<Translation interpolations={['10']}>Top [0] categories</Translation>
```

```javascript
<Translation interpolations={['Peter', 'Petersburg', someProduct, 'für nichts']}>[0] from [1] looks at [2] for [3]</Translation>
```

## String result

In some cases you need the translation as a string instead of a React component (e.g. when using the html title attribute).

```javascript
import Translation from '@core/translation'
import { TranslationFunc } from '@core/translation/types'
import Head from 'next/head'
import { PureComponent, Fragment, ReactNode } from 'react'

export default class MyComponent extends PureComponent {
  private readonly titleString: string = 'Locations'
  public render(): JSX.Element {
    return (
      <Translation keys={this.titleString}>
        {(getTranslation: TranslationFunc): ReactNode => (
          <Fragment>
            <Head>
              <title>{getTranslation(this.titleString)}</title>
            </Head>
          </Fragment>
        )}
      </Translation>
    )
  }
}
```

## Preload

In some cases you want to preload translations into the apollo cache to have faster component mounts when displaying an initially hidden component.
For this you need to add the translations to preload.js and use like this:

```javascript
import Translation from '@core/translation'
import { Component, Fragment, ReactNode } from 'react'

export default class MyComponent extends PureComponent {
  public render(): JSX.Element {
    return <Translation>Save as shop list</Translation>
  }
}
```
