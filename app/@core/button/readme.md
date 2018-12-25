# Buttons
You can place whatever you want inside a Button component.
We automatically detect if the first child is a Icon and add the appropriate paddings.

If you need a button styled link check out the link readme.

**Icon dimensions within the default button size are 14x14 according to our design guidelines. Make sure to always provide the appropiate props on the icons (default is 16x16).**

## Default
```javascript
<Button><Cart width={14} height={14} /></Button>
```

## Primary
```javascript
<Button primary>Warenkorb</Button>
```

## Secondary
```javascript
<Button secondary>Warenkorb</Button>
```

## Outline
```javascript
<Button outline><Cart width={14} height={14} />Warenkorb</Button>
```

## Big
```javascript
<Button big><Cart />Warenkorb</Button>
```

## Small
```javascript
<Button small><Cart />Warenkorb</Button>
```

## Disabled
```javascript
<Button primary disabled><Cart width={14} height={14} />Warenkorb</Button>
```
```javascript
<Button primary disabled={!someValue}><Cart width={14} height={14} />Warenkorb</Button>
```

## Block (full width)
```javascript
<Button primary block><Cart width={14} height={14} />Warenkorb</Button>
```

## MobileNoBlock
By default all buttons are fullwidth on the mobile viewport.
```javascript
<Button big mobileNoBlock><Cart /></Button>
```

## Loading state
You can style a button in a loading state by
```javascript
<Button loading>Load More</Button>
```

## Link
If you need a button with link stylings
```javascript
<Button type='link'><Cart />Warenkorb</Button>
```
