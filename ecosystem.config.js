module.exports = {
  apps: [
    {
      name: "softpulse",
      cwd: __dirname,
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3025",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "600M",
      env: {
        NODE_ENV: "production",
        PORT: 3025,
      },
    },
  ],
};
