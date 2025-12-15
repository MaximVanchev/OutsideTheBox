module.exports = {
  apps: [
    {
      name: 'outside-the-box',
      script: 'server.js',
      cwd: __dirname,
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      autorestart: true,
      restart_delay: 5000,
      max_restarts: 3,
      min_uptime: '10s',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        RESEND_API_KEY: 're_DBEt99Zf_HR7eVV3TKbxQ2bkUfSBXR3aJ',
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
        RESEND_API_KEY: 're_DBEt99Zf_HR7eVV3TKbxQ2bkUfSBXR3aJ',
      },
      out_file: './logs/pm2-out.log',
      error_file: './logs/pm2-error.log',
      merge_logs: true,
      time: true,
    },
  ],
};
