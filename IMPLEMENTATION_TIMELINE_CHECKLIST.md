# IMPLEMENTATION CHECKLIST & LAUNCH TIMELINE
## Rohan Vashist's Personal Portfolio Website

---

## 1. PRE-DEVELOPMENT CHECKLIST

### 1.1 Planning & Strategy (Week 1)

```
DISCOVERY & PLANNING:
☐ Review this entire PRD document (all sections)
☐ Identify your top 5 career goals for portfolio
☐ Choose tech stack (recommendation: Next.js + Supabase)
☐ Decide on CMS approach (JSON files vs Supabase vs Strapi)
☐ Set budget expectations ($0-50 first year)
☐ Define success metrics (visitors, conversions, etc.)
☐ Create project timeline (realistic expectations)
☐ Identify stakeholders (mentors, collaborators)
☐ Schedule feedback sessions with advisor/mentor

CONTENT GATHERING:
☐ Gather all project information
  ├─ MOTION.VER.01 details, screenshots, videos
  ├─ Water Treatment Research paper details
  ├─ Any other projects
  └─ Future project ideas
  
☐ Collect photos
  ├─ Professional headshot
  ├─ Project screenshots (5-8 per project)
  ├─ Lab photos (if applicable)
  ├─ Team/community photos
  └─ Background images for sections
  
☐ Prepare written content
  ├─ Professional bio (2-3 versions: short, medium, long)
  ├─ Project descriptions
  ├─ Skills descriptions
  ├─ Education details
  ├─ Resume/CV (latest version)
  └─ Social links & contact info
  
☐ Organize research/publications
  ├─ Paper titles and status
  ├─ Abstract or summary
  ├─ Links to PDFs/DOI
  ├─ Co-authors information
  └─ Key findings summary

DESIGN DECISIONS:
☐ Choose color scheme
  ├─ Review Recommended: Dark Slate, Bright Blue, Gold
  ├─ Sample on various devices
  ├─ Get feedback from others
  └─ Finalize palette
  
☐ Choose fonts
  ├─ Headings: Poppins or Inter
  ├─ Body: Inter or similar
  ├─ Code: Fira Code or JetBrains Mono
  └─ Test for readability
  
☐ Design reference
  ├─ Collect 5-10 portfolio examples you like
  ├─ Analyze what works
  ├─ Take notes on layouts/patterns
  └─ Create inspiration board

TECHNICAL SETUP:
☐ Register domain
  ├─ Choose domain name
  ├─ Check availability
  ├─ Register (12-month minimum)
  ├─ Configure nameservers (will do after hosting setup)
  └─ Save login credentials
  
☐ Create GitHub account (if new)
  ├─ Set up profile
  ├─ Add bio/link to portfolio
  ├─ Add profile picture
  └─ Join relevant communities
  
☐ Setup development environment
  ├─ Install Node.js (LTS version)
  ├─ Install Git
  ├─ Install code editor (VS Code recommended)
  ├─ Install Git extensions
  └─ Test: node --version works
```

---

## 2. DEVELOPMENT TIMELINE & CHECKLIST

### PHASE 1: FOUNDATION (Weeks 2-3)

#### Week 2: Setup & Architecture

```
DAILY TASKS:

DAY 1 (Monday): Project Initialization
☐ Create GitHub repository (rohan-portfolio)
☐ Clone repo to local machine
☐ Create Next.js project: npx create-next-app@latest
☐ Initialize with: TypeScript, TailwindCSS, App Router
☐ Test local server: npm run dev
☐ Commit initial setup to GitHub
☐ Verify basic page loads at localhost:3000

Deliverable: Working local dev environment

DAY 2 (Tuesday): Folder Structure & Components
☐ Create complete folder structure (see Tech Stack Guide)
☐ Create components:
  ├─ Header.tsx
  ├─ Footer.tsx
  ├─ Navigation.tsx
  ├─ Container.tsx
  └─ [other basic components]
☐ Test components render without errors
☐ Commit to GitHub

Deliverable: Folder structure and basic components

DAY 3 (Wednesday): Data Files & JSON Structure
☐ Create /data directory
☐ Create JSON files:
  ├─ profile.json (your info)
  ├─ projects.json (all projects)
  ├─ skills.json (all skills)
  ├─ research.json (papers)
  ├─ community.json (volunteer work)
  └─ experience.json (timeline/milestones)
☐ Populate with your actual data
☐ Create TypeScript interfaces for type safety
☐ Test data loads correctly in components
☐ Commit to GitHub

Deliverable: All structured content data

DAY 4 (Thursday): Global Styling & Theme
☐ Configure TailwindCSS
☐ Create CSS variables in globals.css
☐ Setup color palette
☐ Setup typography scale
☐ Create reusable utility classes
☐ Test responsive breakpoints (mobile first)
☐ Dark mode setup (optional)
☐ Commit to GitHub

Deliverable: Consistent styling system

DAY 5 (Friday): Layout Components
☐ Create layout.tsx with Header & Footer
☐ Test on all pages
☐ Create reusable section wrappers
☐ Setup spacing/padding system
☐ Test responsive on mobile/tablet/desktop
☐ Fix any layout issues
☐ Commit to GitHub
☐ Deploy to Vercel (test deployment)

Deliverable: Working layouts on all pages
```

#### Week 3: Core Pages

```
DAILY TASKS:

DAY 6 (Monday): Home/Landing Page
☐ Create app/page.tsx (home)
☐ Build hero section
  ├─ Headline
  ├─ Subheading
  ├─ CTA buttons
  └─ Optional: background animation
☐ Build stats section (4 cards)
☐ Build featured projects section (3 projects)
☐ Add CTA section
☐ Test all buttons work
☐ Test responsive design
☐ Commit and test on Vercel

Deliverable: Complete home page

DAY 7 (Tuesday): About Page
☐ Create app/about/page.tsx
☐ Create components:
  ├─ ProfessionalSummary.tsx
  ├─ EducationSection.tsx
  ├─ CompetenciesSummary.tsx
  ├─ Timeline.tsx (optional)
  └─ PersonalTouch.tsx
☐ Populate with actual content
☐ Add resume download button
☐ Test responsive layout
☐ Commit and push

Deliverable: Complete about page

DAY 8 (Wednesday): Projects Page
☐ Create app/projects/page.tsx
☐ Create ProjectCard.tsx component
☐ Create project detail page: app/projects/[id]/page.tsx
☐ Build project listing (grid/cards)
☐ Add filters/sorting (optional)
☐ Test project links work
☐ Test responsive on mobile
☐ Commit and push

Deliverable: Projects listing & detail pages

DAY 9 (Thursday): Skills & Contact Pages
☐ Create app/skills/page.tsx
  ├─ SkillCategory.tsx component
  ├─ SkillBadge.tsx component
  └─ Populate with data
☐ Create app/contact/page.tsx
  ├─ Contact form component
  ├─ Social links section
  ├─ Contact information
  └─ Form styling
☐ Test all pages load correctly
☐ Commit and push

Deliverable: Skills and contact pages

DAY 10 (Friday): Additional Pages & Review
☐ Create app/research/page.tsx (papers)
☐ Create app/community/page.tsx (volunteer work)
☐ Create app/notfound.tsx (404 page)
☐ Test all navigation links work
☐ Test all pages responsive
☐ Perform full site QA
☐ Fix any issues found
☐ Deploy final version to Vercel
☐ Test live site thoroughly

Deliverable: All pages complete and deployed
```

---

### PHASE 2: AUTHENTICATION & ADMIN (Week 4)

#### Week 4: Admin Features

```
DAILY TASKS:

DAY 11 (Monday): NextAuth Setup
☐ Install NextAuth.js dependencies
☐ Create auth configuration file
☐ Create app/api/auth/[...nextauth]/route.ts
☐ Setup email/password authentication
☐ Configure session management
☐ Create login page: app/admin/login/page.tsx
☐ Test authentication flow locally
☐ Commit to GitHub

Deliverable: Working authentication system

DAY 12 (Tuesday): Admin Dashboard Basic
☐ Create app/admin/page.tsx (protected page)
☐ Add authentication check (redirect if not logged in)
☐ Create admin layout with sidebar
☐ Create menu structure
☐ Test protected pages require login
☐ Add logout functionality
☐ Commit to GitHub

Deliverable: Protected admin dashboard

DAY 13 (Wednesday): Edit Profile Form
☐ Create components/admin/ProfileForm.tsx
☐ Create form with fields for:
  ├─ Bio
  ├─ Headline
  ├─ Social links
  ├─ Contact info
  └─ Photo upload
☐ Create API endpoint: app/api/admin/profile/route.ts
☐ Add save functionality
☐ Add success/error messages
☐ Test save and load data
☐ Commit to GitHub

Deliverable: Profile editing capability

DAY 14 (Thursday): Project & Skill Management
☐ Create components/admin/ProjectForm.tsx
☐ Create components/admin/ProjectList.tsx
☐ Create API endpoints:
  ├─ POST /api/admin/projects (create)
  ├─ PUT /api/admin/projects/[id] (update)
  ├─ DELETE /api/admin/projects/[id] (delete)
  └─ GET /api/admin/projects (list)
☐ Create components/admin/SkillManager.tsx
☐ Test all CRUD operations
☐ Commit to GitHub

Deliverable: Project and skill management

DAY 15 (Friday): Admin Testing & Deployment
☐ Complete functionality test:
  ├─ Login/logout works
  ├─ All forms save correctly
  ├─ Changes appear on site
  ├─ Delete functions work
  ├─ Authorization works (only you can edit)
  └─ Session persists correctly
☐ Security audit:
  ├─ Check password handling
  ├─ Verify protected endpoints
  ├─ Check for XSS vulnerabilities
  └─ Verify CSRF protection
☐ Fix any issues
☐ Deploy admin features to Vercel
☐ Test live admin panel
☐ Document login process

Deliverable: Fully functional admin panel
```

---

### PHASE 3: ENHANCEMENT & OPTIMIZATION (Week 5)

#### Week 5: Polish & Deploy

```
DAILY TASKS:

DAY 16 (Monday): SEO & Meta Data
☐ Add SEO metadata to all pages:
  ├─ Title tags (50-60 chars)
  ├─ Meta descriptions (150-160 chars)
  ├─ Open Graph tags
  ├─ Twitter Card tags
  └─ Canonical tags
☐ Create metadata.ts utility
☐ Add sitemap.xml
☐ Add robots.txt
☐ Add RSS feed (optional)
☐ Setup Google Search Console
☐ Test page titles in browser tabs
☐ Commit to GitHub

Deliverable: SEO-optimized pages

DAY 17 (Tuesday): Performance Optimization
☐ Optimize images
  ├─ Compress all images
  ├─ Use Next.js Image component
  ├─ Implement lazy loading
  └─ Test image loading performance
☐ Code splitting & bundle analysis
☐ Remove unused dependencies
☐ Minify CSS/JS
☐ Setup automatic performance monitoring
☐ Run Lighthouse audit
  ├─ Target: Performance > 90
  ├─ Accessibility > 90
  ├─ Best Practices > 90
  ├─ SEO > 90
☐ Fix any issues
☐ Commit to GitHub

Deliverable: High-performance website

DAY 18 (Wednesday): Testing & QA
☐ Manual testing on all devices:
  ├─ iPhone (mobile)
  ├─ iPad (tablet)
  ├─ Desktop (large screens)
  ├─ Chrome, Firefox, Safari
  └─ Different network speeds
☐ Test all functionality:
  ├─ Links work
  ├─ Forms submit
  ├─ Admin panel functions
  ├─ Responsive layouts
  └─ Mobile menu works
☐ Browser compatibility check
☐ Test with screen reader (accessibility)
☐ Test keyboard navigation
☐ Create bug report and fix issues
☐ Commit fixes to GitHub

Deliverable: Thoroughly tested website

DAY 19 (Thursday): Content & Copy Review
☐ Proofread all content:
  ├─ Bio and descriptions
  ├─ Project descriptions
  ├─ Skill names and descriptions
  ├─ Contact page copy
  └─ Blog posts (if any)
☐ Check for:
  ├─ Spelling errors
  ├─ Grammar issues
  ├─ Consistency
  ├─ Tone and style
  └─ Accurate information
☐ Get feedback from someone
☐ Fix any issues
☐ Commit content updates

Deliverable: Polish content

DAY 20 (Friday): Domain Setup & Final Deployment
☐ Configure domain with registrar
  ├─ Update nameservers to Vercel's
  ├─ Or setup DNS records
  ├─ Wait for propagation (can take 24-48 hours)
  └─ Test domain works
☐ Setup SSL (automatic with Vercel)
☐ Test HTTPS works
☐ Setup email forwarding (optional)
☐ Final deployment checks
☐ Monitor deployment for 24-48 hours
☐ Test all features work on live domain
☐ Setup monitoring (uptime, errors)
☐ Create launch announcement

Deliverable: Live website on custom domain!
```

---

## 3. POST-LAUNCH CHECKLIST (Week 6+)

### Immediate Post-Launch (Days 1-7)

```
MONITORING:
☐ Monitor website uptime (first 24 hours critical)
☐ Check error logs for any issues
☐ Monitor performance metrics
☐ Check forms submit correctly
☐ Verify admin panel works
☐ Test contact form emails arrive
☐ Monitor Google Search Console for crawl errors
☐ Check Analytics is tracking correctly

COMMUNICATIONS:
☐ Announce launch on LinkedIn
☐ Announce launch on Twitter
☐ Announce launch on GitHub
☐ Email your network
☐ Update social media profiles with site link
☐ Add site to professional profiles
☐ Share with mentors/advisors

INITIAL OPTIMIZATION:
☐ Review initial analytics data
☐ Fix any reported issues
☐ Make content adjustments if needed
☐ Setup auto-backup system
☐ Document admin procedures
☐ Create quick-start guide for editing
```

### Weekly (First Month)

```
WEEKLY TASKS:
☐ Review analytics
☐ Check for broken links
☐ Monitor uptime
☐ Check error logs
☐ Verify admin functions work
☐ Update "Current" sections with latest info
☐ Share on social media
☐ Engage with visitors (respond to messages)

DOCUMENTATION:
☐ Create admin guide document
☐ Document password reset process
☐ Create backup procedures
☐ Document deployment process
```

### Monthly (Ongoing)

```
MONTHLY CHECKLIST:
☐ Review analytics and traffic
☐ Check and respond to messages
☐ Update portfolio with new projects
☐ Create/share blog content
☐ Social media engagement
☐ Link audit (find broken links)
☐ SEO performance review
☐ Performance audit (Lighthouse)
☐ Backup verification
☐ Security check

UPDATE CONTENT:
☐ Add new projects
☐ Update skills if changed
☐ Add research papers
☐ Update availability status
☐ Refresh resume if needed
☐ Add testimonials (if applicable)
```

### Quarterly

```
QUARTERLY REVIEW:
☐ Deep analytics review
☐ SEO audit
☐ Competitor analysis
☐ Traffic source analysis
☐ User behavior analysis
☐ Conversion funnel review
☐ Design refresh assessment
☐ Content performance review
☐ Security audit
☐ Database optimization (if applicable)

STRATEGIC UPDATES:
☐ Plan new content initiatives
☐ Identify missing sections
☐ Plan feature enhancements
☐ Review and update goals
☐ Plan new projects to showcase
☐ Update messaging if needed
```

---

## 4. DETAILED WEEK-BY-WEEK SCHEDULE

```
WEEK 1 (Planning Week):
├─ Monday: Read PRD, plan scope
├─ Tuesday: Gather content and assets
├─ Wednesday: Design decisions
├─ Thursday: Technical planning
├─ Friday: Finalize plan and create timeline
└─ Deliverable: Complete project plan

WEEK 2 (Foundation):
├─ Monday: Dev environment setup
├─ Tuesday: Project architecture
├─ Wednesday: Data structure
├─ Thursday: Global styling
├─ Friday: Layout components & deploy
└─ Deliverable: Working base structure

WEEK 3 (Core Pages):
├─ Monday: Home page
├─ Tuesday: About page
├─ Wednesday: Projects page
├─ Thursday: Skills & contact
├─ Friday: Additional pages & QA
└─ Deliverable: All pages live

WEEK 4 (Admin Panel):
├─ Monday: Authentication setup
├─ Tuesday: Admin dashboard
├─ Wednesday: Edit profile
├─ Thursday: Project/skill management
├─ Friday: Testing & admin deployment
└─ Deliverable: Admin panel working

WEEK 5 (Polish & Launch):
├─ Monday: SEO optimization
├─ Tuesday: Performance optimization
├─ Wednesday: Full testing
├─ Thursday: Content review
├─ Friday: Domain setup & launch
└─ Deliverable: LIVE WEBSITE!

WEEK 6+ (Maintenance):
├─ Ongoing: Analytics monitoring
├─ Ongoing: Content updates
├─ Ongoing: Engagement
└─ Monthly: Regular maintenance
```

---

## 5. RESOURCES & TOOLS CHECKLIST

### Essential Tools (All Free/Included)

```
DEVELOPMENT:
☐ Node.js (LTS) - node.js.org
☐ Git - git-scm.com
☐ VS Code - code.visualstudio.com
☐ GitHub Desktop (optional) - github.com/desktop

HOSTING & DEPLOYMENT:
☐ Vercel account - vercel.com (free tier)
☐ GitHub account - github.com (free)
☐ Domain registrar account - namecheap.com or similar

PRODUCTIVITY:
☐ Figma (optional) - figma.com (free tier)
☐ Notion (optional) - notion.so (free)
☐ Trello (optional) - trello.com (free)

MONITORING:
☐ Google Search Console - search.google.com/search-console
☐ Google Analytics - analytics.google.com (GA4)
☐ Vercel Analytics - built into Vercel (free)

OPTIMIZATION:
☐ Lighthouse - built into Chrome DevTools
☐ PageSpeed Insights - pagespeed.web.dev
☐ WebAIM WAVE - wave.webaim.org (accessibility)
```

### Installation Commands

```bash
# Create Next.js project
npx create-next-app@latest rohan-portfolio --typescript --tailwind --app

# Install additional dependencies
npm install next-auth react-icons

# Local development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Deploy to Vercel (after pushing to GitHub)
# Go to vercel.com and import GitHub repo
```

---

## 6. RISK MITIGATION & TROUBLESHOOTING

### Common Issues & Solutions

```
ISSUE: npm install fails
SOLUTION:
- Clear npm cache: npm cache clean --force
- Delete node_modules: rm -rf node_modules
- Reinstall: npm install --legacy-peer-deps
- Check Node version: node --version (use LTS)

ISSUE: Deployment fails on Vercel
SOLUTION:
- Check build logs in Vercel dashboard
- Verify environment variables set
- Test locally: npm run build
- Check for TypeScript errors
- Ensure all imports are correct

ISSUE: Images not showing
SOLUTION:
- Check file path (use /images/...)
- Use Next.js Image component
- Verify image exists in /public folder
- Check image format supported
- Add alt text

ISSUE: Forms not submitting
SOLUTION:
- Check API route exists
- Verify route handler syntax
- Check browser console for errors
- Test API endpoint directly
- Verify CORS (if needed)

ISSUE: Admin login not working
SOLUTION:
- Check NextAuth configuration
- Verify credentials match
- Check session storage
- Clear browser cookies
- Check environment variables set

ISSUE: Slow performance
SOLUTION:
- Run Lighthouse audit
- Check image sizes
- Implement lazy loading
- Remove unused CSS
- Check for large bundles
- Use Vercel Analytics to identify bottlenecks

ISSUE: Mobile layout broken
SOLUTION:
- Test in Chrome DevTools mobile view
- Check media queries
- Verify responsive classes
- Test on actual mobile device
- Check viewport meta tag present
```

---

## 7. TEAM FEEDBACK CHECKPOINTS

### Points to Get Feedback

```
CHECKPOINT 1 (End of Week 1):
- Share project plan with mentor
- Get feedback on:
  ├─ Scope appropriateness
  ├─ Timeline realism
  ├─ Tech stack choice
  └─ Feature prioritization

CHECKPOINT 2 (End of Week 2):
- Share design/layout mockups
- Get feedback on:
  ├─ Design aesthetic
  ├─ Information hierarchy
  ├─ Color scheme
  └─ Navigation structure

CHECKPOINT 3 (End of Week 3):
- Share live website (all pages)
- Get feedback on:
  ├─ Content accuracy
  ├─ Tone and messaging
  ├─ Visual design
  ├─ Usability
  └─ Mobile experience

CHECKPOINT 4 (End of Week 5):
- Share final website before launch
- Get feedback on:
  ├─ Overall quality
  ├─ Any final tweaks
  ├─ Launch readiness
  └─ Announcement strategy

FEEDBACK TEMPLATE:
"I'd love your feedback on [specific area]. 
Please let me know:
1. What works well?
2. What could be improved?
3. Any bugs or issues?
4. Any suggestions?"
```

---

## 8. SUCCESS CRITERIA

### Launch Criteria (Must Have)

```
TECHNICAL:
✓ All pages load without errors
✓ Navigation works on all pages
✓ Admin panel fully functional
✓ Contact form submits successfully
✓ Mobile responsive (tested on actual devices)
✓ Lighthouse score > 85 (all categories)
✓ No console errors
✓ Site loads < 3 seconds

CONTENT:
✓ All information accurate and current
✓ No spelling/grammar errors
✓ Professional tone throughout
✓ All projects described
✓ All skills listed
✓ Contact information correct
✓ Resume/CV current

DEPLOYMENT:
✓ Domain works and resolves correctly
✓ SSL certificate valid (HTTPS)
✓ Uptime monitoring active
✓ Email notifications setup
✓ Backups configured
✓ SEO basics implemented
```

### 30-Day Metrics Goals

```
TRAFFIC:
- Target: 100-300 visitors
- Measure: Google Analytics

ENGAGEMENT:
- Target: 2-3 min avg session duration
- Target: <60% bounce rate
- Measure: Google Analytics

CONVERSION:
- Target: 1-2 contact form submissions
- Measure: Form submission tracking

SEARCH VISIBILITY:
- Target: Appear in search for "Rohan Vashist"
- Target: A few impressions in GSC
- Measure: Google Search Console

PERFORMANCE:
- Target: Lighthouse score > 90
- Target: Page load < 2 seconds
- Measure: Lighthouse, Vercel Analytics
```

---

## 9. LAUNCH DAY CHECKLIST

```
MORNING (2 hours before launch):
☐ Final build test locally
☐ Final deployment to Vercel
☐ Verify domain resolves
☐ Test all pages load
☐ Test admin login
☐ Test contact form
☐ Run Lighthouse audit one more time
☐ Check for any console errors

LAUNCH TIME:
☐ Announce on LinkedIn (post)
☐ Announce on Twitter (tweet)
☐ Announce on GitHub (README update)
☐ Share with network (email/message)
☐ Update profile links on other sites

POST-LAUNCH (First 24 hours):
☐ Monitor uptime closely
☐ Check error logs every few hours
☐ Respond to any feedback
☐ Fix any issues that appear
☐ Monitor analytics
☐ Verify emails being sent correctly

FIRST WEEK:
☐ Daily monitoring
☐ Weekly analytics review
☐ Content updates if needed
☐ Share on social media
☐ Engage with visitors
☐ Fix bugs/issues promptly
```

---

## 10. MAINTENANCE SCHEDULE (After Launch)

### Weekly (30 minutes)
```
☐ Check uptime status
☐ Review contact messages (if any)
☐ Update "Currently" sections if needed
☐ Check for broken links
☐ Monitor error logs
```

### Monthly (2-3 hours)
```
☐ Review analytics
  ├─ Traffic sources
  ├─ Top pages
  ├─ User behavior
  └─ Conversion rates
☐ Content audit
  ├─ Check accuracy
  ├─ Proofread for errors
  ├─ Update outdated info
  └─ Add new projects/info
☐ Performance check
  ├─ Run Lighthouse
  ├─ Check page speed
  ├─ Review Core Web Vitals
  └─ Optimize if needed
☐ Security check
  ├─ Update dependencies
  ├─ Check for vulnerabilities
  ├─ Review access logs
  └─ Verify backups
☐ SEO review
  ├─ Check Search Console
  ├─ Monitor rankings
  ├─ Check for crawl errors
  └─ Optimize underperforming pages
```

### Quarterly (4-6 hours)
```
☐ Strategic review
  ├─ Review goals vs reality
  ├─ Analyze competitor sites
  ├─ Identify opportunities
  └─ Plan improvements
☐ Design audit
  ├─ Assess design freshness
  ├─ Check mobile experience
  ├─ Test on new devices
  └─ Plan refresh if needed
☐ Content strategy review
  ├─ Analyze content performance
  ├─ Identify content gaps
  ├─ Plan new content
  └─ Update content calendar
☐ Technical upgrade
  ├─ Update dependencies
  ├─ Review Next.js version
  ├─ Test compatibility
  └─ Plan major updates
```

---

## 11. QUICK REFERENCE COMMANDS

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm start            # Start production server
npm test             # Run tests (if configured)

# Git
git add .           # Stage all changes
git commit -m ""    # Commit with message
git push origin main # Push to GitHub
git pull origin main # Pull latest changes

# Deployment
# Go to vercel.com, import GitHub repo
# Vercel auto-deploys on GitHub push

# Environment Variables
# Create .env.local file in project root
# Add: NEXTAUTH_SECRET=your-secret-here
# Add: DATABASE_URL=your-db-url (if using DB)

# Dependencies
npm install         # Install all dependencies
npm update          # Update all packages
npm outdated        # Check outdated packages
```

---

## FINAL NOTES

### Remember:
- ✅ **Start Simple** - Don't overcomplicate it
- ✅ **Timeline is Flexible** - Adjust based on your pace
- ✅ **Quality Over Speed** - Better to launch late than launch broken
- ✅ **Test Thoroughly** - Test before deployment
- ✅ **Get Feedback** - Share with others, get opinions
- ✅ **Keep Iterating** - This is version 1.0, not 1.0 final
- ✅ **Have Fun** - Enjoy the process!

### Next Steps:
1. **This Week:** Read all PRD documents
2. **Next Week:** Start Week 1 planning
3. **Following Week:** Begin development
4. **In 5 Weeks:** Launch your amazing portfolio! 🚀

---

**You've got this! Your portfolio is going to be incredible.** 💪

---

## PORTFOLIO PRD - EXECUTIVE SUMMARY & QUICK START GUIDE
## Rohan Vashist's Personal Portfolio Website

**Created:** May 2026 | **Status:** Ready for Implementation | **Timeline:** 5 weeks to launch

---

## WHAT YOU'RE BUILDING

A **secure, self-owned personal portfolio website** that showcases your expertise in:
- Energy Engineering (hydrogen, biomass, electrochemistry)
- Full-Stack Web Development
- Research & Publications
- Community Leadership

**Key Principle:** Only you can edit content. Complete data ownership. Professional + Personal.

---

## COMPLETE DOCUMENT PACKAGE

You now have 5 comprehensive PRD documents:

### 📋 Document 1: PRD_ROHAN_VASHIST_PORTFOLIO.md
**Complete Product Requirements Document** - 1500+ lines
- Detailed specifications for every page
- Feature requirements
- Design specifications
- Security & privacy requirements
- Content management details
- [FUTURE FIELDS] for extensibility

**When to use:** Reference this for complete requirements and detailed specifications

---

### 💻 Document 2: TECH_STACK_GUIDE.md
**Technical Implementation Guide** - Complete setup instructions
- 3 tech stack options (recommended: Next.js)
- Step-by-step setup (npm commands, code examples)
- Component examples (ProjectCard, ContactForm, etc.)
- Deployment checklist
- Learning resources

**When to use:** Follow this when building the actual website

---

### 🎨 Document 3: VISUAL_REFERENCE_GUIDE.md
**Design & UX Specifications** - Wireframes and design tokens
- Visual site maps and wireframes
- Color palette (with code)
- Typography scale
- Spacing system (8px grid)
- Responsive breakpoints
- Interaction patterns
- Reusable design tokens

**When to use:** Reference when designing pages and components

---

### 📝 Document 4: CONTENT_STRATEGY_SEO_GUIDE.md
**Content & SEO Strategy** - Full 12-month plan
- 4 content pillars (Energy, Dev, Sustainability, Career)
- 12-month content calendar with article ideas (40+ article topics)
- Blog article structure & templates
- Keyword research & strategy
- On-page SEO checklist
- Analytics setup
- Content maintenance schedule

**When to use:** Plan and create content after launch

---

### ✅ Document 5: IMPLEMENTATION_TIMELINE_CHECKLIST.md
**Launch Timeline & Checklists** - Week-by-week breakdown
- Pre-development checklist (Week 1)
- Daily development tasks (Weeks 2-5)
- Post-launch monitoring
- Risk mitigation & troubleshooting
- Quick reference commands
- Success metrics

**When to use:** Follow this day-by-day during development

---

## QUICK REFERENCE: KEY DECISIONS

### Tech Stack (Recommended)

```
Frontend:    Next.js 14+ with React
Styling:     TailwindCSS
Backend:     Next.js API Routes (no separate backend needed)
Database:    JSON files + GitHub (simple) OR Supabase (scalable)
Auth:        NextAuth.js (password protected)
Hosting:     Vercel (auto-deploy from GitHub)
Domain:      Namecheap.com (~$12/year)

Cost: FREE (except domain)
Setup Time: 4-5 weeks
Maintenance: Minimal
```

### Site Structure (Main Pages)

```
1. HOME - Hero + Featured Work
2. ABOUT - Bio + Education + Timeline
3. EXPERTISE - Energy Engineering + Tech Skills
4. PROJECTS - MOTION.VER.01 + Water Treatment Paper + [Future]
5. RESEARCH - Published Papers + Interests
6. COMMUNITY - MY Bharat + [Future Initiatives]
7. CONTACT - Contact Form + Social Links
8. [ADMIN] - Edit Mode (auth required)
```

### Design Palette

```
Primary:     #2D3748 (Dark Slate) - Headers, Text
Secondary:  #00B4D8 (Bright Blue) - Links, Buttons
Accent:     #FFB703 (Warm Gold) - Highlights
Background: #F7FAFC (Light Gray)
Text:       #1A202C (Dark Gray)
```

---

## 5-WEEK IMPLEMENTATION ROADMAP

### ⏰ Week 1: Planning & Setup
```
By End of Week: Local dev environment ready, all content gathered
Tasks: Review PRD, register domain, setup GitHub, Node.js install
Deliverable: Project plan + development environment
```

### ⏰ Week 2: Foundation & Architecture
```
By End of Week: Working base structure deployed to Vercel
Tasks: Create Next.js project, folder structure, global styling
Deliverable: Basic site framework live
```

### ⏰ Week 3: Build Core Pages
```
By End of Week: All main pages complete (Home, About, Projects, etc.)
Tasks: Build each page with actual content
Deliverable: All pages accessible with content
```

### ⏰ Week 4: Admin Panel & Auth
```
By End of Week: Admin dashboard fully functional
Tasks: Setup authentication, create edit forms, API endpoints
Deliverable: Owner-only editing capability
```

### ⏰ Week 5: Polish & Launch
```
By End of Week: Website LIVE on custom domain! 🎉
Tasks: SEO, performance optimization, testing, domain setup
Deliverable: Professional, production-ready portfolio
```

---

## SITE PAGES CHECKLIST

### Core Pages (MVP - Must Have)
- [x] **Home/Landing** - Hero + featured work + CTA
- [x] **About** - Bio, education, timeline, personal touch
- [x] **Expertise** - Energy + technical skills breakdown
- [x] **Projects** - MOTION.VER.01 + Water Treatment Paper
- [x] **Research** - Published papers + interests
- [x] **Community** - MY Bharat program details
- [x] **Contact** - Contact form + social links
- [x] **Admin** - Edit mode (auth protected)

### Future Pages (Can Add Later)
- [ ] Blog/Articles (40+ article ideas planned)
- [ ] Speaking Engagements
- [ ] Resources/Tools
- [ ] Testimonials
- [ ] E-Books / Guides
- [ ] Video Portfolio

---

## CONTENT INVENTORY

### To Gather Before Starting
```
WRITTEN CONTENT:
☐ Professional bio (short, medium, long versions)
☐ All project descriptions & details
☐ Research paper abstracts & findings
☐ Skills descriptions & proficiency levels
☐ Education details
☐ Community work descriptions
☐ Current resume/CV

VISUAL ASSETS:
☐ Professional headshot
☐ Project screenshots (5-8 per project)
☐ Lab photos (if applicable)
☐ Background/hero images
☐ Project logos/icons (if applicable)

INFORMATION:
☐ All social media links
☐ Email address
☐ Phone number (optional)
☐ Graduation year & dates
☐ Project timelines
☐ Publication dates & DOIs
```

---

## CUSTOMIZATION POINTS (THE [FUTURE FIELDS])

Throughout the PRD, you'll find **[FUTURE FIELD]** markers indicating places to customize:

### Homepage
- [FUTURE FIELD]: Update headline/subheadline
- [FUTURE FIELD]: Add/update stats
- [FUTURE FIELD]: Edit featured items

### Projects
- [FUTURE FIELD]: Add new projects (template provided)
- [FUTURE FIELD]: Upload screenshots/videos
- [FUTURE FIELD]: Update project status

### Skills
- [FUTURE FIELD]: Add new skills
- [FUTURE FIELD]: Update proficiency levels
- [FUTURE FIELD]: Add certifications

### Content
- [FUTURE FIELD]: Write blog articles
- [FUTURE FIELD]: Add research papers
- [FUTURE FIELD]: Document learnings
- [FUTURE FIELD]: Add testimonials

### Technical
- [FUTURE FIELD]: Switch to different CMS
- [FUTURE FIELD]: Add e-commerce
- [FUTURE FIELD]: Implement advanced analytics
- [FUTURE FIELD]: Scale infrastructure
```
