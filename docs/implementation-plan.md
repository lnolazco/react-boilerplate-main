# Implementation Plan (Prioritized & Granular)

This plan breaks down the required features from the specs into detailed, actionable steps, prioritized for efficient implementation. Each section is organized by feature and sub-feature, with dependencies and recommended order.

---

## **Priority Order Overview**

1. **Persistence** (Foundational, impacts all features)
2. **Nested Folders** (Requires persistence for correct state management)
3. **Range Selection** (UI/UX enhancement, can be built after core data structures are stable)

---

## 1. Persistence (**Start Here**)

### 1.1. Data Model & Store Updates

- [ ] Refactor MobX store to support serialization/deserialization of folders and images.
- [ ] Define data schema for folders (including parent/child relationships) and images.

### 1.2. Implement Persistence Logic

- [ ] Add logic to save folders and images to browser storage (localStorage or IndexedDB) on every change.
- [ ] Add logic to load folders and images from storage on app startup.
- [ ] Handle data migration/versioning if needed.

### 1.3. UI/UX for Persistence

- [ ] Show loading state while restoring data on startup (if needed).

### 1.4. Deletion Confirm Modals & Related UI

- [ ] Add a confirm modal when deleting a folder.
- [ ] Add a button to delete selected images with a confirm modal.

### 1.5. e2e Tests for Persistence & Deletion

- [ ] Write e2e tests asserting the images and folders are persistent when the page is refreshed.
- [ ] Update the delete folder e2e test to check for the confirm modal and ensure it passes.
- [ ] Write an e2e test asserting images are indeed deleted with their folder (including subfolders).
- [ ] Write an e2e test asserting selected images are indeed deleted after confirmation.

### 1.6. Documentation

- [ ] Update documentation to describe persistence and deletion confirm modal behavior.

---

## 2. Nested Folders (**After Persistence**)

### 2.1. Data Model Enhancements

- [ ] Update folder model to support parentId (for hierarchy).
- [ ] Update MobX store logic to support nested folders (CRUD operations, moving, etc.).
- [ ] Update image model if needed to support nested folder references.

### 2.2. FolderForm Enhancements

- [ ] Update FolderForm modal to allow selecting a parent folder when creating/editing a folder. Follow the designs in this image specs/screenshots/nested-folders-form.png where there is a dropdown to select the parent folder.
  - [ ] Integrate new select component for parent folder selection.
  - [ ] Ensure the select displays the folder hierarchy (tree view).

### 2.3. Radix Select Component

- [ ] Create a select component using the Radix Select primitive for folder selection.
  - [ ] Support tree/hierarchical display.
  - [ ] Write a Storybook story for the select component.

### 2.4. SideNav Hierarchy

- [ ] Refactor SideNav to display folders as a hierarchy/tree, not a flat list.
  - [ ] Implement recursive rendering for nested folders.
  - [ ] Add expand/collapse UI for folder nodes (if needed).

### 2.5. Recursive Deletion

- [ ] When deleting a folder, also delete all its sub-folders and their images recursively.
- [ ] Ensure images in all descendant folders are deleted.

### 2.6. MoveImages Modal

- [ ] Update MoveImages modal to show the folder hierarchy for moving images.

### 2.7. Testing

- [ ] Write unit tests for nested folder operations (CRUD, move, delete).
- [ ] Write e2e tests to assert the folder hierarchy is correctly displayed in the UI.
- [ ] Write e2e test for recursive deletion of folders and images.

### 2.8. Bonus: Infinite Nesting

- [ ] Ensure all logic and UI support arbitrary folder depth.
- [ ] Test edge cases (deeply nested, circular references prevention).

### 2.9. Documentation

- [ ] Update documentation and Storybook as new components or patterns are introduced.

---

## 3. Range Selection (**After Nested Folders**)

### 3.1. Basic Range Selection

- [ ] Implement logic to select a range of images by holding SHIFT after checking an image.
  - [ ] Track last selected index and current selection.
  - [ ] Update selection state accordingly.

### 3.2. Bonus: Deselect Range

- [ ] Allow users to deselect a range by holding SHIFT after unchecking an image.

### 3.3. Bonus: Multiple Ranges

- [ ] Allow users to toggle multiple ranges at once (e.g., select 1,2,3 then 5,6,7).
  - [ ] Ensure selection logic supports non-contiguous ranges.

### 3.4. UI/UX

- [ ] Ensure the range selection UX matches the provided demo GIF.
- [ ] Add visual feedback for selected ranges.

### 3.5. Testing

- [ ] Write unit tests for range selection logic.
- [ ] Write e2e tests for all range selection scenarios (select, deselect, multiple ranges).

### 3.6. Documentation

- [ ] Update documentation to describe range selection behavior.

---

## General Notes

- Each feature should include appropriate unit and e2e tests.
- All UI changes must be accessible and responsive.
- Update documentation and Storybook as new components or patterns are introduced.
- Prioritize foundational changes and dependencies before UI/UX enhancements.
