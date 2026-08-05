# Frank Feng Portfolio

Personal portfolio website for Frank Feng. This site highlights my background, skills, work and research experience, selected projects, publications, and contact links.

The project is a forked and customized static portfolio template. The README has been rewritten to reflect my own version of the site.

## Features

- Responsive personal portfolio layout
- About, skills, work experience, research experience, education, selected projects, publications, and contact sections
- Dynamic content loaded from `user-data/data.js`
- GitHub project cards loaded from the GitHub API
- Lightweight static-site setup with no build step required

## Tech Stack

- HTML5
- CSS3
- JavaScript ES modules
- lit-html
- Bootstrap
- Font Awesome
- GitHub API

## Project Structure

```text
.
├── index.html
├── index.js
├── css/
├── js/
├── pages/
├── user-data/
│   ├── data.js
│   └── urls.js
└── README.md
```

## Run Locally

Clone the repository and serve it with any simple static file server:

```bash
git clone https://github.com/FrankFengF/Frank-portfolio.git
cd Frank-portfolio
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Updating Content

Most personal content is stored in:

- `user-data/data.js` for bio, skills, experience, education, research, publications, footer, and contact links
- `user-data/urls.js` for GitHub and other external data sources
- `index.html` for page structure, metadata, and section ordering

## Credits

This portfolio was forked from an existing open-source portfolio template and customized for Frank Feng.
