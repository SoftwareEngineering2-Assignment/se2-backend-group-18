module.exports = {
  apps: [
    {
      name: 'se2-backend-18',
      script: 'npm',
      args: 'start',
      env: {
        PORT: 3018,
        SERVER_SECRET: ${{ secrets.SERVER_SECRET }},
        MONGODB_URI: ${{ secrets.MONGODB_URI }},
        PLATFORM_URI: 'http://localhost:3002',
        SERVER_URI: 'http://localhost:3000',
        SERVER_EMAIL: 'karanikio@auth.gr',
        SENDGRID_API_KEY: ${{ secrets.SENDGRID_API_KEY }}
      },
    },
  ],
};
