import {
  bio,
  skills,
  education,
  experience,
  research,
  footer,
  contactLinks,
} from "./user-data/data.js";
import { html, render } from "https://unpkg.com/lit-html?module";

import { URLs } from "./user-data/urls.js";

import { selectedProjects } from "../user-data/data.js";

import { publications } from "./user-data/data.js";

const { medium, gitConnected, gitRepo } = URLs;

// async function fetchBlogsFromMedium(url) {
//   try {
//     const response = await fetch(url);
//     const { items, feed } = await response.json();
//     document.getElementById("profile-img").src = feed.image;
//     populateBlogs(items, "blogs");
//   } catch (error) {
//     throw new Error(
//       `Error in fetching the blogs from Medium profile: ${error}`
//     );
//   }
// }


async function fetchReposFromGit(url) {
  try {
    const response = await fetch(url);
    let items = await response.json();

    console.log("All repos:", items.map(repo => repo.name));
    
    items = items.filter(repo =>
      selectedProjects.includes(repo.name)
    );
    
    console.log("Filtered repos:", items.map(repo => repo.name));
    populateRepo(items, "repos");
  } catch (error) {
    throw new Error(`Error in fetching repos: ${error}`);
  }
}


async function fetchGitConnectedData(url) {
  try {
    const response = await fetch(url);
    const { basics } = await response.json();
    mapBasicResponse(basics);
  } catch (error) {
    throw new Error(`Error in fetching the blogs from git connected: ${error}`);
  }
}

function mapBasicResponse(basics) {
  const {
    name,
    label,
    image,
    email,
    phone,
    url,
    summary,
    profiles,
    headline,
    blog,
    yearsOfExperience,
    username,
    locationAsString,
    region,
    karma,
    id,
    followers,
    following,
    picture,
    website,
  } = basics;

  window.parent.document.title = name;
}

function populateBio(items, id) {
  const bioTag = document.getElementById(id);
  const bioTemplate = html` ${items.map((bioItem) => html`<p>${bioItem}</p>`)}`;
  render(bioTemplate, bioTag);
}

function populateSkills(skills, id) {
  const skillsTag = document.getElementById(id);
  if (!skillsTag) return;

  const skillsTemplate = html`
    ${Object.entries(skills).map(
      ([category, items]) => html`
        <div class="col-md-12 animate-box skills-group">
          <h3 class="skills-title">${category}</h3>
          <div class="row">
            ${items.map(
              (item) => html`
                <div class="col-md-3">
                  <div class="progress-wrap">
                    <li class="skill-item">${item}</li>
                  </div>
                </div>
              `
            )}
          </div>
        </div>
      `
    )}
  `;

  render(skillsTemplate, skillsTag);
}
function populateBlogs(items, id) {
  const projectdesign = document.getElementById(id);
  const createCategoryBadges = (categories) => html`
    <div class="categories-div">
      ${categories.map(
        (category) => html` <div class="profile-badge brown-badge">${category}</div> `
      )}
    </div>
  `;

  const blogTemplate = html`
    ${items.slice(0, 3).map(
      (item) => html`
        <div class="blog-card">
          <div class="blog-content">
            <a href="${item.link}" target="_blank" class="blog-link">
              <p class="blog-heading">${item.title}</p>
              <p class="publish-date">${getBlogDate(item.pubDate)}</p>
              <p class="blog-description">
                ${item.content.replace(/<[^>]*>/g, '').trim()}
              </p>
              ${createCategoryBadges(item.categories)}
            </a>
          </div>
        </div>
      `
    )}
  `;

  render(blogTemplate, projectdesign);
}

function populateRepo(items, id) {
  const projectdesign = document.getElementById(id);
  if (!projectdesign || !items?.length) return;

  const repoTemplate = html`
    <div class="repo-wrapper">
      ${items.map(
        (item) => html`
          <div class="repo-card">
            <a
              href="${item.html_url}"
              target="_blank"
              class="repo-link"
            >
              <p class="repo-heading">${item.name}</p>
              <p class="repo-description">
                ${item.description || ""}
              </p>

              <div class="stats-row">
                <div class="language-div">
                  <span class="language-dot"></span>
                  ${item.language || "N/A"}
                </div>
                <div class="stats-div">
                  ⭐ ${item.stargazers_count}
                </div>
                <div class="stats-div">
                  🍴 ${item.forks_count}
                </div>
              </div>
            </a>
          </div>
        `
      )}
    </div>
  `;

  render(repoTemplate, projectdesign);
}


function populatePublications(items, id) {
  const container = document.getElementById(id);
  if (!container || !items?.length) return;

  const publicationTemplate = html`
    ${items.map(
      (pub) => html`
        <div class="blog-card">
          <div class="blog-content">
            <a href="${pub.link}" target="_blank" class="blog-link">
              <p class="blog-heading">${pub.title}</p>
              <p class="publish-date">
                ${pub.venue} · ${pub.year}
              </p>
              <p class="blog-description">
                <strong>Authors:</strong> ${pub.authors}
              </p>
              <p class="blog-description">
                ${pub.description}
              </p>
            </a>
          </div>
        </div>
      `
    )}
  `;

  render(publicationTemplate, container);
}

function populateExp_Edu(items, id) {
  const mainContainer = document.getElementById(id);
  if (!mainContainer || !items?.length) return;

  const detailsTemplate = (details) => html`
    ${details.map(
      (detail) => html` <p class="timeline-text">&blacksquare; ${detail}</p> `
    )}
  `;

  const tagsTemplate = (tags) => html`
    <div class="tags-container">
      ${tags.map((tag) => html`<div class="profile-badge brown-badge">${tag}</div>`)}
    </div>
  `;

  const timelineTemplate = html`
    ${items.map(
      (item) => html`
        <article class="timeline-entry animate-box">
          <div class="timeline-entry-inner">
            <div class="timeline-icon color-2">
              <i class="fa fa-${item.icon}"></i>
            </div>
            <div class="timeline-label">
              <div class="exp-heading">
                <p class="blog-heading">${item.title}</p>
                <span class="publish-date">${item.duration}</span>
              </div>
              <span class="timeline-sublabel">${item.subtitle}</span>
              ${detailsTemplate(item.details)} ${tagsTemplate(item.tags)}
            </div>
          </div>
        </article>
      `
    )}
    <article class="timeline-entry begin animate-box">
      <div class="timeline-entry-inner">
        <div class="timeline-icon color-2"></div>
      </div>
    </article>
  `;

  render(timelineTemplate, mainContainer);
}

function populateLinks(items, id) {
  const footer = document.getElementById(id);
  if (!footer || !items?.length) return;

  const linkTemplate = (data) => html`
    <li>
      <a
        href="${data.link || "#"}"
        @click="${data.func || null}"
      >
        ${data.text}
      </a>
    </li>
  `;

  const columnTemplate = (item) => html`
    <span class="col">
      <p class="col-title">${item.label}</p>
      <nav class="col-list">
        <ul>
          ${item.data.map((data) => linkTemplate(data))}
        </ul>
      </nav>
    </span>
  `;

  const copyrightTemplate = (item) => html`
    <div class="copyright-text no-print">
      ${item.data.map((copyright) => html`<p>${copyright}</p>`)}
    </div>
  `;

  const footerTemplate = html`
    ${items.map(
      (item) => html`
        ${item.label === "copyright-text"
          ? copyrightTemplate(item)
          : columnTemplate(item)}
      `
    )}
  `;

  render(footerTemplate, footer);
}

function populateContactLinks(items, id) {
  const contactLinks = document.getElementById(id);
  if (!contactLinks || !items?.length) return;
  const contactLinkTemplate = (item) => html`
    <li class="profile-card" style="padding: 6px 12px">
      <a href="${item.link}" target="_blank" class="contact-link">
        <i class="${item.icon}"></i>
        <span class="contact-label">${item.label}</span>
      </a>
    </li>
  `;
  const contactLinksTemplate = html`
    <ul class="contact-links-list">
      ${items.map((item) => contactLinkTemplate(item))}
    </ul>
  `;
  render(contactLinksTemplate, contactLinks);
}

function getElement(tagName, className) {
  let item = document.createElement(tagName);
  item.className = className;
  return item;
}

function getBlogDate(publishDate) {
  const elapsed = Date.now() - Date.parse(publishDate);

  // Time conversions in milliseconds
  const msPerSecond = 1000;
  const msPerMinute = msPerSecond * 60;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  if (elapsed < msPerMinute) {
    const seconds = Math.floor(elapsed / msPerSecond);
    return `${seconds} seconds ago`;
  } else if (elapsed < msPerHour) {
    const minutes = Math.floor(elapsed / msPerMinute);
    return `${minutes} minutes ago`;
  } else if (elapsed < msPerDay) {
    const hours = Math.floor(elapsed / msPerHour);
    return `${hours} hours ago`;
  } else if (elapsed < msPerMonth) {
    const days = Math.floor(elapsed / msPerDay);
    return days == 1 ? `${days} day ago` : `${days} days ago`;
  } else if (elapsed < msPerYear) {
    const months = Math.floor(elapsed / msPerMonth);
    return months == 1 ? `${months} month ago` : `${months} months ago`;
  } else {
    const years = Math.floor(elapsed / msPerYear);
    return years == 1 ? `${years} year ago` : `${years} years ago`;
  }
}

populateBio(bio, "bio");

populateSkills(skills, "skills");

populatePublications(publications, "publications");

// fetchBlogsFromMedium(medium);
fetchReposFromGit(gitRepo);
fetchGitConnectedData(gitConnected);

populateExp_Edu(experience, "experience");
populateExp_Edu(research, "research");
populateExp_Edu(education, "education");

populateLinks(footer, "footer");
populateContactLinks(contactLinks, 'contact-links');
