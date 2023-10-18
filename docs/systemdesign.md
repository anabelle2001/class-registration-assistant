```mermaid
graph LR
    CofC[CofC's Ellucian Course Database]
    SQL[SQLite DB]
    Bun[Bun Server]
    Browser[Web Browser]
    Python[Python Scraper]

 
    Bun -->|Commands| Python
    Python -->|Sends JSON| Bun

    Python -->|Query| CofC
    CofC -->|Respose| Python

    Bun <-->|Cache Course Data| SQL


    Bun --> |Serve Static Webpages to| Browser
    Bun <--> |AJAX API for Section Data| Browser

```