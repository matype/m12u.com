---
title: Styleguide
date: 2025-08-30
description: Just a styleguide page, no need to read.
---

## Styleguide

Markdown Conversion Test Sample (CommonMark-only)

> **Purpose**: Verify Markdown → HTML conversion using only core CommonMark features.  
> No GFM (tables, task lists, strikethrough, autolink literals beyond angle-bracket form), no footnotes, no custom extensions, no math engines.

---

## Basic text and emphasis

This is a paragraph with **bold**, _italic_, and **_bold + italic_** text, plus `inline code`.
Hard line break comes here␠␠  
…and this is the next line after two spaces.

Autolinks: <https://example.com> and <user@example.com>

Inline link: [Example site](https://example.com "title attribute example").

Emoji as plain Unicode: 😀 🎉 👍

---

## Headings

# H1 heading

## H2 heading

### H3 heading

#### H4 heading

##### H5 heading

###### H6 heading

---

## Blockquotes

> A single-level blockquote with a paragraph.
>
> It can span multiple lines and paragraphs.
>
> - You can include lists
> - inside a quote
> - like this
>
> > A nested blockquote.

---

## Lists

### Unordered list

- Dash marker
- Another item
  - Nested level 2
    - Nested level 3

You can also use other markers:

- Asterisk marker

* Plus marker

### Ordered list

1. First item
2. Second item
3. Third item with nested list
   1. Nested ordered item
   2. Another nested item

> Note: Many renderers renumber ordered lists automatically.

---

## Code blocks

Fenced code block (with an info string):

```js
// JavaScript sample
export function greet(name) {
  return `Hello, ${name}!`
}
console.log(greet("world"))
```

Indented code block (4 spaces):

    SELECT id, name
    FROM users
    WHERE active = true;

---

## Links and images

Inline image:

![mochachocomaru](../images/mochachocomaru.jpg)

---

## Escaping and special characters

Literal characters: \* \_ \` \# \[ \] \( \) \> \+ \- \! \|  
Backslash itself: `\\`  
Quotes: 'single', "double".
