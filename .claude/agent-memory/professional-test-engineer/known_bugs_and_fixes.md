---
name: Known Bugs and Fixes Applied
description: Bugs found and fixed in the coaching institute website during initial audit (March 2026)
type: project
---

All bugs below were found and fixed on 2026-03-23.

## Fixed Bugs

### CRITICAL: Auth hooks bypass AuthContext (both login and signup)
- `useLogin.js` called `loginUser` from `authService.jsx` directly, never updating `AuthContext`. After login, `isAuthenticated` stayed `false`, dashboard redirect broke.
- `useSignup.js` had the same problem.
- **Fix:** Both hooks now call `login()` / `signup()` from `useAuth()` (AuthContext), which stores token+user in localStorage and updates state.

### CRITICAL: NotFoundPage - nested `<button>` inside `<button>`
- Line 36-39 wrapped `<Button>` (renders `<button>`) inside a bare `<button>` element. Invalid HTML; "Go Back" button broke in some browsers.
- **Fix:** Replaced outer bare `<button>` with the `<Button>` component directly, passing `onClick` as a prop.

### HIGH: ExploreCoursesPage ignores `?search=` URL query param
- `useExploreCourses.js` initialized `searchQuery` from `location.state?.category` only. Searching from HomePage navigated to `/courses?search=...` but the search bar started empty.
- **Fix:** Added `URLSearchParams(location.search).get('search')` initialization in the same `useEffect`.

### MEDIUM: Notes data category mismatch
- Note ID 6 (Biology PYQ) had `category: 'NEET'` but the filter button in `NOTE_FILTERS` is `'JEE/NEET'`. The note never appeared under JEE/NEET filter.
- **Fix:** Changed `notesData.jsx` ID 6 `category` to `'JEE/NEET'`.

### LOW: Unused imports
- `NotesPage.jsx` imported `ChevronLeft` but never used it.
- `LiveClassroomPage.jsx` imported `HelpCircle` and `Layout` but never used them.
- **Fix:** Removed unused imports from both files.

## Previously Fixed (before this session)
- Missing `Zap` import in HomePage
- Broken Google Fonts link in index.html
- `LoginPage` using undefined `<LoginHeader />` instead of `<AuthHeader />`
- `SignupPage` not importing `<SignupForm />`

---

## Pre-Launch Audit — 2026-03-23 (Second Pass)

### CRITICAL Fixed

**Category URL param ignored on ExploreCoursesPage**
- `useExploreCourses.js`: `?category=IIT JEE` URL params from HomePage cards and Footer links were never read. Added `categoryParam` reading with a mapping table (e.g. "IIT JEE" → "JEE", "NDA / Airforce" → "NDA").

### HIGH Fixed

**Login/Signup: Silent error on failure**
- Added `error` state to `useLogin.js` and `useSignup.js`, display red error banner in `LoginForm.jsx` and `SignupForm.jsx`. Props threaded through LoginPage/SignupPage.

**ForgotPassword: Silent failure when backend is down**
- Added `error` state to `useForgotPassword.js`. Displayed in `ForgotPasswordForm.jsx`. Props threaded through `ForgotPasswordPage.jsx`.

**ContactPage: Shows "Message Sent!" on API failure**
- Changed catch block from `setSubmitted(true)` to `setError(...)` with real contact fallback.

**CourseDetailPage: FALLBACK_COURSE was UPSC (not an A.I.S. offering)**
- Replaced UPSC fallback with IIT JEE 2027 PCM course with A.I.S.-appropriate content.

### MEDIUM Fixed

**Exam questions were generic CS/web-dev content**
- `examQuestionsData.jsx`: Replaced React hooks / HTML / CSS / binary search questions with JEE Physics, Chemistry, Maths, Biology questions appropriate for a coaching institute.

**Favicon was Vite default**
- `index.html`: Changed to `/ais-logo.jpg`.

**SocialLogin "Or Login with Email" on Signup page**
- Added `mode` prop to `SocialLogin`. SignupPage passes `mode="signup"`.

### LOW Fixed

**Footer social icons had `href="#"` dead links**
- Removed Twitter/LinkedIn. Updated Instagram/YouTube with AIS-Meerut handles.

**Footer Privacy/Terms/Refund were `href="#"`**
- Changed to `<Link to="/contact">`.

**SignupForm Terms/Privacy were `href="#"`**
- Changed to `<Link to="/contact">`.

**Production console.log in TestSeriesPage**
- Removed debug log on line 28.

**Unused imports**
- `CustomVideoPlayer.jsx`: removed `SkipForward`
- `LiveChat.jsx`: removed `MoreVertical`
- `HomePage.jsx`: removed `Zap`

**LiveClassroomPage unstyled fallback**
- Replaced raw text fallback with branded dark screen and styled button.

### Key Patterns
- Category values in data (`'JEE'`, `'NDA'`) differ from URL/display strings (`'IIT JEE'`, `'NDA / Airforce'`) — canonical mapping is in `useExploreCourses.js`
- Auth hooks consistently lacked user-visible error state — now fixed across all three auth flows
- `npm run build` passes cleanly after all fixes
