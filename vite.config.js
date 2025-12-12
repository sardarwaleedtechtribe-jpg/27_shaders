import glsl from "vite-plugin-glsl";
import restart from "vite-plugin-restart";

export default {
  publicDir: "static",   // now inside the project folder
  server: {
    host: true,
    open: !("SANDBOX_URL" in process.env || "codesaveBox_HOST" in process.env),
  },
  build: {
    outDir: "dist",      // output stays inside project
    emptyOutDir: true,
    sourcemap: true,
  },
  plugins: [
    restart({ restart: ["static/**"] }),
    glsl(),
  ],
};
