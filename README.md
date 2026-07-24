# Divya's Portfolio Website

Welcome to the source code for my personal portfolio! This is a modern, VSCode-style interactive website built with Next.js, React, Tailwind CSS, and Framer Motion. 

The website uses a warm and elegant theme, featuring smooth animations and a responsive three-column layout (Sidebar, Explorer, and Main Content).

## How to Update the Portfolio

Everything in this portfolio is data-driven, which makes it very easy to update. You don't need to dive deep into the React components to add a new project or change your resume. Just follow the simple steps below!

### 1. How to Update the Resume (PDF)

If you have a new version of your resume that you want people to download:
1. Name your new resume file exactly: `resume.pdf`
2. Go to the `public/` folder in the project root.
3. Replace the existing `resume.pdf` with your new file.
That's it! Any "Download Resume" buttons on the website will automatically serve your new file.

### 2. How to Add a New Project

Your projects are stored as a list in a single data file.
1. Open the file `src/data/projects.ts`.
2. You will see an array (a list) of project objects.
3. Simply copy an existing project object, paste it at the top of the list (so it shows up first), and change the details like `title`, `description`, `tech`, and `link`.

### 3. How to Add a New Achievement or Publication

Similar to projects, your achievements (Hackathons, Certifications, Publications) are stored in a data file.
1. Open the file `src/data/achievements.ts`.
2. Add a new entry to the `achievements` list. 
3. Make sure to specify the correct `category` (e.g., `"Hackathons"`, `"Publications"`, or `"Certifications"`) so it shows up in the right folder in the Explorer sidebar!

### 4. How to Update Your Experience

1. Open the file `src/data/experience.ts`.
2. Add a new entry with your `role`, `company`, `duration`, and `contributions`.

## Running the Website Locally

To preview your changes on your own computer:
1. Open your terminal in the project folder.
2. Run the command: `npm install` (only needed the first time).
3. Run the command: `npm run dev`
4. Open your browser and go to `http://localhost:3000`

Enjoy updating your portfolio!
