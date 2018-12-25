# Links

You can pass either a string with an url or an ApiRoute object (see linkFragment.graphql).
When passing an ApiRoute we're generating the effective route with the same logic as in the monolith to guarantee a fallback site in case it's not yet isomorphic.

If you use text in combination with an Icon spacings are automatically added.

**Never use an `<a>` tag directly, always use the Link component so we can change the routing logic in one place**

## Url as string

```javascript
<Link link={'/it'}>
  <Translation>More job vacancies</Translation>
</Link>
```

## Url as object

```javascript
<Link
  link={{
    sectorId: 's1',
    type: 'type',
    actionName: 'actionname',
    actionValue: { id: 'id', name: 'name' },
    parameters: [{ key: 'key', value: 'value' }],
    anchor: 'anchor'
  }}
>
  <Translation>More job vacancies</Translation>
</Link>

// -> '/de/s1/type/actionname/name-id?key=value#anchor'
```

## Link to route that isn't isomorphic yet

```javascript
<Link external link={'/'}>
  This Link leads to a non isomorphic page!
</Link>
```

## Prefetch

The JS for the route gets fetched once the current route was loaded and the Brwoser goes in idle mode.
**This only takes effect in production mode!**

```javascript
<Link prefetch link={'/site'}>
  <Translation>More job vacancies</Translation>
</Link>
```

## Replace instead of Push

In some cases you might want to replace the url instead of pushing a new route in the history

```javascript
<Link replace link={'/it'}>
  <Cart />
</Link>
```

## External links

```javascript
<Link target="_blank" link={'www.mysite.com'}>
  <Cart />
</Link>
```

## Fullsize

When using fullsize links make sure to include a description where the link is leading due to accessibility reasons.

```javascript
<Link fullSize link={'/it'}>
  <span className="ssrOnly">
    <Translation>Show location details</Translation>
  </span>
</Link>
```

## With Button stylings

For more possibilites check out the Button readme

```javascript
<Link button primary link={'/it'}>
  <Cart />
  <Translation>More job vacancies</Translation>
</Link>
```
