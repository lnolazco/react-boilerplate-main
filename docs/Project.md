# Project Overview

## Name

Photoroom Web Assignment (Image Gallery)

## Purpose

A React-based image gallery app that allows users to upload images, organize them into folders, and automatically remove image backgrounds using the Photoroom API. The project demonstrates skills in React, MobX, modern UI/UX, and e2e testing.

---

## Main Features

- **Image Upload & Background Removal:** Users can upload images, which are sent to the Photoroom API for background removal. Processed images are displayed in the gallery.
- **Folder Management:** Users can create, rename, delete, and navigate folders. Images can be moved between folders.
- **Image Selection:** Users can select single or multiple images, including range selection (per spec).
- **Move Images:** Selected images can be moved to other folders via a dialog.
- **Responsive UI:** Modern, accessible, and responsive design using TailwindCSS.
- **(Planned) Persistence:** Images and folders should persist across page reloads (per spec, not yet implemented).
- **(Planned) Nested Folders:** Support for infinitely nestable folders (per spec).

---

## Architecture

- **Monorepo Structure:**
  - `packages/app`: Main application (React, MobX, TanStack Router, TailwindCSS).
  - `packages/ui`: Shared UI component library (Button, Dialog, Input, etc.).
- **State Management:**
  - Uses MobX (`ImageStore`) for managing images and folders.
  - All UI updates are reactive to MobX state changes.
- **Routing:**
  - Uses TanStack Router for client-side navigation.
  - Main routes: `/` (all images), `/folders/:folderId` (images in folder).
- **Styling:**
  - TailwindCSS for all styling.
  - Custom font loading and dark theme.
- **Testing:**
  - Playwright for end-to-end (e2e) tests.
  - Storybook for UI component development/testing.

---

## Key Components

- **AppLayout:** Main layout, handles navigation and responsive design.
- **SideNav:** Displays folder list, allows folder creation, and navigation.
- **ImagesList:** Shows images in the current folder, supports selection and moving images.
- **FolderForm:** Modal form for creating or renaming folders.
- **MoveImages:** Dialog for moving selected images to a different folder.

---

## How It Works

1. **Image Upload:**
   - User uploads images via drag-and-drop or file picker.
   - Images are sent to the Photoroom API for background removal.
   - Processed images are stored in the MobX store and displayed in the gallery.
2. **Folder Management:**
   - Users can create, rename, and delete folders.
   - Images can be moved between folders.
3. **Image Selection & Moving:**
   - Users can select multiple images (with range selection planned).
   - Selected images can be moved to another folder using the Move dialog.
4. **Navigation:**
   - Users can navigate between the main gallery and specific folders.
5. **Persistence:**
   - (Planned) Images and folders should persist using browser storage (not yet implemented).

---

## Running the Project

1. **Install dependencies:**
   ```sh
   nvm use
   npm install && npm install -ws
   (cd packages/app && npx playwright install)
   ```
2. **Run the app:**
   ```sh
   npm run dev -w=app
   ```
3. **Run Storybook (UI library):**
   ```sh
   npm run dev -w=@repo/ui
   ```
4. **Run e2e tests:**
   ```sh
   npm run e2e -w=app
   npm run e2e:ui -w=app
   ```

---

## Specs and Future Work

- See `/specs` for detailed requirements:
  - [Nested folders](../specs/nested-folders.md)
  - [Persistence](../specs/persistence.md)
  - [Range selection](../specs/range-selection.md)
- **Note:** As of this analysis, persistence and nested folders are not yet implemented in the codebase, but are required by the assignment specs.

---

## Additional Notes

- The project is designed for clarity, maintainability, and modern best practices.
- All UI is built with accessibility and responsiveness in mind.
- For any questions or issues, refer to the assignment README or contact the maintainers as instructed.
