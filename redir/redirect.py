from sys import argv
from re import match, sub
from pathlib import Path

#this is the root directory, where all these child directories come from. This is useful so that userrs can get the full shortened link
root = "https://nnnNNnnn.info/redir"

#get target
if len(argv) < 2:
  exit()
target = argv[1]

#format page content
content = f"""
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="refresh" content="0; url={target}" />
    <title>Redirecting...</title>
  </head>
  <body>
    <p>If you are not redirected automatically, <a href="{target}">click here</a>.</p>
  </body>
</html>
"""

#get slug
slug = ""
if len(argv) > 2:
  slug = argv[2]
  if match(r".*\d$", slug):
    slug = sub(r"\d*$", "", slug)

slugs = {f.name for f in Path('.').iterdir() if f.is_dir()}
slugs.add("") # dummy page to prevent trying to write to ""

if slug in slugs:
  count = 0
  for s in slugs:
    if match(slug + r"\d*$", s):
      count += 1
  slug = slug + str(count)

#create page
page = Path(slug) / "index.html"
page.parent.mkdir()
page.write_text(content)

#update index.html
with open("index.html", "a") as index:
  index.write(f'<a href="{root}/{slug}">{target}</a>\n')

print(f"redirecting {root}/{slug}  ->  {target}")