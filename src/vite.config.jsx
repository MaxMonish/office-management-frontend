import React from "react";
import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import PageLoader from "../../components/common/PageLoader";

export default defineConfig({
  plugins: [react()],
});
