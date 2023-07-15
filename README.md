# hyte

Hyte is a webapp which lets you share HTML documents without sharing the file itself OR base64 data URIs.

To use it, you first must zip your HTML document, and encode it in base64.
Then, take the b64 string and append it like so:
`https://iskander0.github.io/hyte/#<b64-string>`

You may then open that url in any browser, and the webapp will decode your document from the hash, and set the contents of the page to your document.

All javascript, CSS, imports, etc work.

Python encoder:

```
import base64
import gzip

def encode_html(html: str) -> str:
  compressed_html = gzip.compress(bytes(html, encoding="utf-8"))
  base64_html = base64.b64encode(compressed_html).decode("utf-8")

  return base64_html

def main():
  # Call out to PHP, read static file from disk, etc.
  my_html = "<html><body><h1>Hello World</h1></body></html>"

  encoded_html = encode_html(my_html)

  print("https://iskander0.github.io/hyte/#" + encoded_html)
```

Inspired by : [https://itty.bitty.site/edit](IttyBitty)
