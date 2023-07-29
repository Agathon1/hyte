# hyte

Hyte is a webapp which lets you share HTML documents without sharing the file itself OR base64 data URIs.

To use it, you first must zip your HTML document, and encode it in base64.
Then, take the b64 string and append it like so:
`https://iskander0.github.io/hyte/#<b64-string>`

You may then open that url in any browser, and the webapp will decode your document from the hash, and set the contents of the page to your document.

All javascript, CSS, imports, etc work.


NodeJS encoder:
```js
import { paq, unpaq } for "./paq_node.mjs"
import fs from "fs"

function Uint8ArrayTobase64(array) {
  let b = ""
  let len = array.byteLength

  for (let i = 0; i < len; i++) {
    b += String.fromCharCode(array[i])
  }

  return btoa(b)
}

//Call out to templating software, read static file from disk, etc
let my_html = "<html><body><h1>Hello World</h1></body></html>"

let my_html_bytes = new TextEncoder().encode(my_html)

let my_html_compressed = await (paq(my_html_bytes))

console.log("https://iskander0.github.io/hyte/#" + Uint8ArrayToBase64(my_html_compressed))
```

Written in collaboration with ChatGPT4

<br/><br/><br/>

Inspired by : [itty.bitty](https://itty.bitty.site/edit)
