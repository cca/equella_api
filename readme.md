# VAULT Public Search API

A small client-side JavaScript library wrapping the EQUELLA search API for CCA's VAULT. Performs a search on all public items so users will _not_ see items visible only within the college, their department, etc.

Depends on jQuery. Only tested with jQuery 1.4.1.

Example (only available on CCA campus): http://vm-lib-www-dev-01/vapir.html

## Usage

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.4.1/jquery.min.js"></script>
<script src="/path/to/vapir.min.js"></script>
<script>
vapir(query, target, opts);
// e.g.
vapir('california', '#results');
// query is an un-encoded string, target is a DOM selector
// opts is an object that proxies the EQUELLA search API options
</script>
```

## Setup

Steps distilled from the _EQUELLA REST API Guide_ (here's [the PDF for version 6.2](http://support.equella.com/downloads/6.2/Documentation/EQUELLA%206.2%20REST%20API%20Guide.pdf)).

To obtain an OAUTH token & set up the script:

- Create an OAUTH client at "/access/oauthadmin.do"
- Use OAUTH flow "Implicit Grant"
- Select an arbitrary redirect URI on one of your servers
- Visit this URL (where ... = your EQUELLA root & your `[redirect URL]` and `[client ID]` are filled in)

> .../oauth/authorise?response_type=token&client_id=[client id]&redirect_uri=[redirect URL]

https://vault.cca.edu/oauth/authorise?response_type=token&client_id=9688d4a0-c140-41e6-99db-86f46b3328c1&redirect_uri=http://vm-lib-www-dev-01/vapir.html

- Sign in _as the user whose search results you want to power the API_, you'll be redirected. Copy the `access_token` parameter out of the URL
- Replace the value of `'X-Authorization-Token'` in vapir.js with your token
- Replace the `url` value (first variable) with your EQUELLA instance's URL

## Developing

If you have npm, uglify-js, and sass installed you can minify vapir.js and compile vapir.scss to CSS with `npm run build`. There are more commands in the `scripts` section of the package.json.
