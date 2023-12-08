import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { AppThunk } from "../store";
import type { Email, Label } from "../types/mail";
import { objFromArray } from "../utils/obj-from-array";

interface MailState {
  emails: {
    byId: Record<string, Email>;
    allIds: string[];
  };
  labels: Label[];
  isSidebarOpen: boolean;
  isComposeOpen: boolean;
}

const initialState: MailState = {
  emails: {
    byId: {},
    allIds: [],
  },
  labels: [],
  isSidebarOpen: true,
  isComposeOpen: false,
};
