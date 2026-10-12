import {configureStore} from '@reduxjs/toolkit';
import files from '../features/files/filesSlice';
import folders from '../features/folders/foldersSlice';
import settings from '../features/settings/settingsSlice';
import workspace from '../features/workspace/workspaceSlice';
// REST API is the primary source of truth; localStorage is intentionally not used.
export const store=configureStore({reducer:{files,folders,settings,workspace}});
