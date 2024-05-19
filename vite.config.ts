import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000,
		proxy: {
			"/library-mvp-api": {
				target: "http://127.0.0.1:8000",
				changeOrigin: true,
				secure: false,
				rewrite: (path: string) => path.replace(/^\/library-mvp-api/, "api"),
			},
		},
	},
	resolve: {
		alias: {
			"@lims": path.resolve(__dirname, "./src"),
		},
	},
});
