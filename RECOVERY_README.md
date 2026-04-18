# Synchores WordPress Recovery Log

## Scope
This document records the important actions taken to bring the WordPress site back online and restore as much media/rendering as possible.

Date: 2026-04-17
Domain: https://synchores.com
Server type: VPS + Nginx + WordPress + MySQL + Cloudflare

## 1) Outage Root Cause
- Nginx backend server block pointed to a deleted path.
- WordPress routing could not find valid bootstrap files from the configured root.

## 2) Nginx Recovery Actions
- Updated WordPress-serving root in Nginx from deleted path to live install path:
  - from `/home/user/htdocs/srv1480853.hstgr.cloud`
  - to `/var/www/synchores`
- Removed forced `/wp-login.php` and `/wp-admin` redirects to server hostname that caused domain mismatch behavior.
- Validated config and reloaded Nginx.

## 3) WordPress URL Recovery
- Corrected WordPress options:
  - `home` => `https://synchores.com`
  - `siteurl` => `https://synchores.com`
- Confirmed DB readability and attachment catalog presence.

## 4) Safety and Rollback
Pre-change safety backups were created before additive recovery tasks:
- Files backup: `synchores-files-pre-additive.tgz`
- DB backup: `synchores-db-pre-additive.sql`
Location:
- `/home/synchores-lance/safe-restore-backups/2026-04-17-102859/`

## 5) Filesystem and Permissions Fixes
To allow runtime generation and plugin/media operations:
- Ensured WordPress uploads path exists.
- Corrected ownership/permissions under uploads for web runtime user:
  - owner/group => `www-data:www-data`
  - directories => `775`
  - files => `664`
- Verified write capability as web user.

## 6) Elementor Rendering Fixes
- Confirmed frontend requested generated Elementor CSS files that returned 404.
- Flushed Elementor CSS cache.
- Enabled Elementor inline fallback mode option to avoid hard dependency on generated CSS files while recovery continued.

## 7) Plugin Dependency Recovery
Only core Elementor was active at one point, causing skeleton rendering for addon widgets.
Restored and activated key dependencies used by templates:
- `essential-addons-for-elementor-lite`
- `happy-elementor-addons`
- `embedpress`
- `fluentform`
- `premium-addons-for-elementor`
- `header-footer-elementor`

## 8) Header/Nav Diagnosis
- Header template content exists in Elementor library (`header`, post ID 17).
- No active Header/Footer Builder header assignment existed during checks.
- Result: nav/header absent on frontend despite template content existing.

Recommended assignment (admin):
1. Appearance -> Header Footer Builder
2. Add New -> Type: Header -> Display: Entire Website -> User Roles: All
3. Edit with Elementor -> insert existing `header` template -> Update

## 9) Media Recovery Findings
Attachment records in DB exist, but many files were physically missing from uploads.

Latest measured status:
- `attachments_total = 143`
- `attachments_existing_files = 15`
- `attachments_missing_files = 128`

## 10) Media Recovery Work Completed
- Built missing-file manifest from `_wp_attached_file` records.
- Performed exact filename match against provided local folders.
- Uploaded matched files only (safe, additive recovery).
- Restored matched files to exact expected `wp-content/uploads/YYYY/MM/` paths.
- Reapplied ownership/permissions after import.
- Recounted existing vs missing after import.

## 11) What Was Intentionally Not Changed
- No destructive reset of repo/server state.
- No broad content redesign.
- No mass unsafe DB rewrite of post/page structures.
- No removal of existing site components unrelated to recovery.

## 12) Current Practical Status
- Site outage (plain 404) resolved.
- Domain mapping corrected.
- Core rendering stack restored with dependencies.
- Partial media restored.
- Full media restoration still requires additional source files (backup/old machine/archive/export).

## 13) Next Recommended Action
- Continue batch media restore using additional source folders/zips.
- Keep exact path/filename matching to avoid wrong asset mapping.
- Recount after each batch until missing count is minimized.

## 14) Header/Footer Implementation (Completed)
- Verified active menu locations in theme:
  - `menu-1` (Header)
  - `menu-2` (Footer)
- Assigned menus:
  - `menu-1` => `header-synchores`
  - `menu-2` => `header-synchores-main-menu`
- Created Header Footer Elementor posts:
  - Header assignment post ID `2167`
  - Footer assignment post ID `2168`
- Applied required HFE targeting metadata:
  - `ehf_template_type` set to `type_header` / `type_footer`
  - `ehf_target_include_locations` set to global (`basic-global`)
  - `ehf_target_exclude_locations` empty
  - `ehf_target_user_roles` empty

## 15) Footer Render Root Cause and Final Fix
Observed issue:
- Header shortcode rendered correctly.
- Footer source template rendered correctly.
- Footer assignment (`2168`) rendered empty (`0` length) despite having data.

Root cause:
- `_elementor_data` in post `2168` became JSON-corrupted during earlier clone attempts (escape sequences/quotes changed), so Elementor could not parse and render it.

Fix implemented:
- Performed exact database-level copy of `_elementor_data` from source footer template (`107`) to footer assignment (`2168`).
- Set `_elementor_template_type` and cleared stale generated Elementor meta cache fields on `2168`.
- Flushed WordPress cache and Elementor CSS cache.

Validation:
- `_elementor_data` checksum now matches exactly between `107` and `2168`.
- Shortcode render test:
  - `[hfe_template id="2168"]` => non-zero output (`13554`)
  - `[hfe_template id="107"]` => non-zero output (`13552`)
- Live frontend contains footer signals (`CONTACT US`, `FOLLOW US`, address fragment), indicating footer is now rendering.

## 16) Header Navigation Implementation (Menu-Aligned)
Problem observed:
- Header template (`2167`) was built with standalone Elementor button widgets (`HOME`, `OFFERINGS`, `ABOUT US`, `CONTACT US`) rather than a dynamic nav-menu widget.
- Because of that structure, changing WordPress menu items did not automatically update header navigation links.

Implementation applied:
- Read live menu items from `header-synchores` menu.
- Mapped header button text labels to menu item URLs by title match.
- Updated button link URLs directly inside header `_elementor_data`.
- Cleared Elementor generated meta cache keys on the header and flushed CSS/cache.

Verified result after implementation:
- `HOME => https://synchores.com/`
- `OFFERINGS => https://synchores.com/#home-offerings`
- `ABOUT US => https://synchores.com/#home-aboutus`
- `CONTACT US => https://synchores.com/#home-contactus`

## 17) Auto-Sync Attempt and Blocker
- Attempted to install a small MU plugin for automatic re-sync whenever menu is edited.
- Blocked by filesystem permissions:
  - `mkdir: cannot create directory 'wp-content/mu-plugins': Permission denied`

Practical implication:
- Current header links are fixed and aligned now.
- Automatic future sync cannot be installed until write permission is granted to create files in `wp-content/mu-plugins`.
