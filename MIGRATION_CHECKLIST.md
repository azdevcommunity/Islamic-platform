# ✅ Migration Checklist

Use this checklist to track your progress migrating to the new refactored structure.

---

## Phase 1: Setup & Verification

### Initial Setup
- [ ] Review all documentation files
  - [ ] `README_REFACTORING.md`
  - [ ] `FOLDER_STRUCTURE.md`
  - [ ] `REFACTORING_SUMMARY.md`
  - [ ] `IMPLEMENTATION_GUIDE.md`
  - [ ] `QUICK_REFERENCE.md`
  - [ ] `ARCHITECTURE_DIAGRAM.md`

### Dependencies
- [ ] Verify TypeScript is installed
- [ ] Verify all dependencies are up to date
- [ ] Run `npm install` successfully
- [ ] Verify `tsconfig.json` exists

### New Files Verification
- [ ] `src/config/api.ts` exists
- [ ] `src/config/site.ts` exists
- [ ] `src/types/index.ts` exists
- [ ] `src/lib/api-client.ts` exists
- [ ] `src/lib/utils/cn.ts` exists
- [ ] `src/lib/utils/date.ts` exists

### Environment Variables
- [ ] `.env.local` has all required variables
- [ ] `NEXT_PUBLIC_BASE_URL` is set
- [ ] `NEXT_PUBLIC_BASE_URL_YTB` is set
- [ ] Social media URLs are set
- [ ] Domain is set

---

## Phase 2: UI Components Migration

### Core UI Components
- [ ] `src/components/ui/container.tsx` - Tested
- [ ] `src/components/ui/section.tsx` - Tested
- [ ] `src/components/ui/section-header.tsx` - Tested
- [ ] `src/components/ui/loading-spinner.tsx` - Tested
- [ ] `src/components/ui/error-message.tsx` - Tested

### Existing UI Components
- [ ] Review existing `src/components/ui/` components
- [ ] Ensure they work with new structure
- [ ] Update imports if needed

---

## Phase 3: Layout & Navigation

### Navbar
- [ ] `src/components/Navbar/islamic-navbar.tsx` - Reviewed
- [ ] `src/components/Navbar/NavbarClient.tsx` - Reviewed
- [ ] Test desktop navigation
- [ ] Test mobile navigation
- [ ] Test dropdown menus
- [ ] Test sub-of-sub menus

### Footer
- [ ] `src/components/Footer/islamic-footer.tsx` - Reviewed
- [ ] Test all footer links
- [ ] Test social media links
- [ ] Test support button
- [ ] Test responsive layout

### Layout
- [ ] `src/app/(web)/layout.tsx` - Reviewed
- [ ] Test menu data fetching
- [ ] Test layout rendering
- [ ] Test with different pages

---

## Phase 4: Home Page Migration

### Home Page Sections
- [ ] `src/app/(web)/page.tsx` - Reviewed
- [ ] Video Hero Section - Tested
- [ ] Welcome Section - Tested
- [ ] Articles Section - Tested
- [ ] Books Section - Tested
- [ ] Social Stats Section - Tested
- [ ] Testimonials Section - Tested

### Component Testing
- [ ] `src/components/home/articles-section.tsx` - Tested
- [ ] `src/components/home/books-section.tsx` - Tested
- [ ] `src/components/articles/article-card.tsx` - Tested
- [ ] All sections render correctly
- [ ] All animations work
- [ ] All links work

---

## Phase 5: Other Pages Migration

### Articles Page
- [ ] Migrate to TypeScript
- [ ] Use new components
- [ ] Test article listing
- [ ] Test article detail page
- [ ] Test pagination
- [ ] Test categories

### Questions Page
- [ ] Migrate to TypeScript
- [ ] Use new components
- [ ] Test question listing
- [ ] Test question detail page
- [ ] Test search functionality
- [ ] Test filters

### Books Page
- [ ] Migrate to TypeScript
- [ ] Use new components
- [ ] Test book listing
- [ ] Test book details

### About Page
- [ ] Migrate to TypeScript
- [ ] Use new components
- [ ] Test content rendering
- [ ] Test responsive layout

### Contact Page
- [ ] Migrate to TypeScript
- [ ] Use new components
- [ ] Test form submission
- [ ] Test validation

### Videos Page
- [ ] Migrate to TypeScript
- [ ] Use new components
- [ ] Test video listing
- [ ] Test video player

---

## Phase 6: API Integration

### API Client
- [ ] Replace `HttpClient` with `apiClient`
- [ ] Update all GET requests
- [ ] Update all POST requests
- [ ] Update all PUT requests
- [ ] Update all DELETE requests

### Configuration Usage
- [ ] Replace hardcoded URLs with `apiConfig`
- [ ] Replace hardcoded site info with `siteConfig`
- [ ] Update all API endpoint references
- [ ] Update all revalidation times

### Error Handling
- [ ] Add try-catch blocks
- [ ] Use `ErrorMessage` component
- [ ] Test error scenarios
- [ ] Test loading states

---

## Phase 7: Utilities Migration

### Date Utilities
- [ ] Replace `DateUtil.formatDate` with `formatDate`
- [ ] Update all date formatting calls
- [ ] Test date display

### Class Name Utilities
- [ ] Use `cn()` for className merging
- [ ] Update conditional classes
- [ ] Test responsive classes

### Other Utilities
- [ ] Review `src/util/` directory
- [ ] Migrate remaining utilities to `src/lib/`
- [ ] Update all imports

---

## Phase 8: Type Safety

### Type Definitions
- [ ] Review `src/types/index.ts`
- [ ] Add missing types
- [ ] Update existing types
- [ ] Ensure all entities are typed

### Component Props
- [ ] Add types to all component props
- [ ] Add types to all state variables
- [ ] Add types to all functions
- [ ] Add types to all API responses

### TypeScript Errors
- [ ] Fix all TypeScript errors
- [ ] Run `npm run build` successfully
- [ ] No type errors in IDE

---

## Phase 9: Code Cleanup

### Remove Legacy Code
- [ ] Remove `src/util/Const.js`
- [ ] Remove `src/util/DateUtil.js`
- [ ] Remove `src/util/HttpClient.js`
- [ ] Remove `src/layouts/` directory
- [ ] Remove old component versions

### Remove Dead Code
- [ ] Remove unused imports
- [ ] Remove commented code
- [ ] Remove console.logs
- [ ] Remove unused variables
- [ ] Remove unused functions

### Code Quality
- [ ] Run ESLint
- [ ] Fix linting errors
- [ ] Format code consistently
- [ ] Add missing comments

---

## Phase 10: Testing

### Manual Testing
- [ ] Test all pages load
- [ ] Test all links work
- [ ] Test all forms submit
- [ ] Test all images load
- [ ] Test all animations work

### Responsive Testing
- [ ] Test on mobile (< 640px)
- [ ] Test on tablet (640px - 1024px)
- [ ] Test on desktop (> 1024px)
- [ ] Test on large screens (> 1440px)

### Browser Testing
- [ ] Test on Chrome
- [ ] Test on Firefox
- [ ] Test on Safari
- [ ] Test on Edge

### Performance Testing
- [ ] Run Lighthouse audit
- [ ] Performance score > 90
- [ ] Accessibility score > 90
- [ ] Best Practices score > 90
- [ ] SEO score > 90

---

## Phase 11: SEO & Accessibility

### SEO
- [ ] All pages have proper metadata
- [ ] All images have alt text
- [ ] All links have descriptive text
- [ ] Sitemap is correct
- [ ] Robots.txt is correct
- [ ] Structured data is valid

### Accessibility
- [ ] All interactive elements are keyboard accessible
- [ ] All forms have proper labels
- [ ] All buttons have proper ARIA labels
- [ ] Color contrast is sufficient
- [ ] Focus indicators are visible
- [ ] Screen reader tested

---

## Phase 12: Performance Optimization

### Images
- [ ] All images use Next.js Image component
- [ ] All images have proper sizes
- [ ] Above-the-fold images have priority
- [ ] Images are lazy-loaded
- [ ] Images are optimized

### Code Splitting
- [ ] Heavy components use dynamic imports
- [ ] Routes are properly split
- [ ] Bundle size is optimized

### Caching
- [ ] ISR is configured correctly
- [ ] Revalidation times are set
- [ ] Static pages are cached
- [ ] API responses are cached

---

## Phase 13: Documentation

### Code Documentation
- [ ] All components have JSDoc comments
- [ ] All functions have JSDoc comments
- [ ] All types have comments
- [ ] Complex logic is explained

### Project Documentation
- [ ] README is updated
- [ ] API documentation is complete
- [ ] Component documentation is complete
- [ ] Setup instructions are clear

---

## Phase 14: Deployment

### Pre-Deployment
- [ ] All tests pass
- [ ] Build succeeds
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Environment variables are set

### Deployment
- [ ] Deploy to staging
- [ ] Test on staging
- [ ] Deploy to production
- [ ] Test on production
- [ ] Monitor for errors

### Post-Deployment
- [ ] Check analytics
- [ ] Check error logs
- [ ] Check performance metrics
- [ ] Check user feedback

---

## Phase 15: Monitoring & Maintenance

### Monitoring
- [ ] Set up error tracking (e.g., Sentry)
- [ ] Set up performance monitoring
- [ ] Set up uptime monitoring
- [ ] Set up analytics

### Maintenance
- [ ] Schedule regular updates
- [ ] Schedule regular audits
- [ ] Schedule regular backups
- [ ] Document maintenance procedures

---

## Additional Improvements (Optional)

### Testing
- [ ] Add unit tests
- [ ] Add integration tests
- [ ] Add E2E tests
- [ ] Set up CI/CD for tests

### Development Tools
- [ ] Add Storybook
- [ ] Add Prettier
- [ ] Add Husky (git hooks)
- [ ] Add lint-staged

### Features
- [ ] Add dark mode
- [ ] Add internationalization (i18n)
- [ ] Add PWA support
- [ ] Add offline support

---

## Progress Tracking

### Overall Progress
- [ ] Phase 1: Setup (0/4 sections)
- [ ] Phase 2: UI Components (0/2 sections)
- [ ] Phase 3: Layout & Navigation (0/3 sections)
- [ ] Phase 4: Home Page (0/2 sections)
- [ ] Phase 5: Other Pages (0/6 sections)
- [ ] Phase 6: API Integration (0/3 sections)
- [ ] Phase 7: Utilities (0/3 sections)
- [ ] Phase 8: Type Safety (0/3 sections)
- [ ] Phase 9: Code Cleanup (0/3 sections)
- [ ] Phase 10: Testing (0/4 sections)
- [ ] Phase 11: SEO & Accessibility (0/2 sections)
- [ ] Phase 12: Performance (0/3 sections)
- [ ] Phase 13: Documentation (0/2 sections)
- [ ] Phase 14: Deployment (0/3 sections)
- [ ] Phase 15: Monitoring (0/2 sections)

### Estimated Time
- **Total Phases**: 15
- **Estimated Time**: 2-3 weeks
- **Start Date**: ___________
- **Target Completion**: ___________

---

## Notes

Use this space to track issues, blockers, or important decisions:

```
Date: ___________
Issue: ___________
Resolution: ___________

Date: ___________
Issue: ___________
Resolution: ___________

Date: ___________
Issue: ___________
Resolution: ___________
```

---

## Sign-Off

- [ ] All phases completed
- [ ] All tests passed
- [ ] Documentation updated
- [ ] Deployed to production
- [ ] Team trained on new structure

**Completed by**: ___________
**Date**: ___________
**Approved by**: ___________

---

**Good luck with your migration! 🚀**
