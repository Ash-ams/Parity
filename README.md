[Parity](http://abefehr.com/parity/)
======

Parity is a simple numbers puzzle game written in Javascript. It was inspired by OCD-like impulses to make sure the icons on my desktop were all selected the same number of times.

<p align="center">
  <img src="images/screenshot.png" />
</p>

How to play
===========

The game is played by moving a cursor around the board to select different squares in a grid. Each time you select a select a cell by moving the cursor with the arrow keys, the number inside that cell increases by one.

The goal of the game is to make each number on the board equal.

Mobile
======

Parity is mobile-friendly. Simply visit the website on your device's browser to play. It's recommended that you add the page to your home screen if you own an iPhone for a better experience.

Deploying to Netlify
=====================

This project is pre-configured for instant zero-configuration deployment to [Netlify](https://www.netlify.com/):

### Option 1: Git Integration (Recommended)
1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Log in to [Netlify](https://app.netlify.com/) and click **"Add new site" > "Import an existing project"**.
3. Select your repository. Netlify will automatically detect the [`netlify.toml`](file:///c:/MINE/PROJECTS/GD%20Parity/netlify.toml) file:
   - **Build command**: `npm run build`
   - **Publish directory**: `.`
4. Click **"Deploy site"**.

### Option 2: Netlify CLI
1. Install or run Netlify CLI:
   ```bash
   npx netlify deploy --prod
   ```
2. Follow the on-screen prompts to link your site and deploy.

### Local Development & Build
To build the production scripts locally:
```bash
npm run build
```

License
=======
Parity is licensed under the [MIT license.](https://github.com/abejfehr/parity/blob/master/LICENSE.txt)

