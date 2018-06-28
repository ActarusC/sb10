module.exports = {
  siteMetadata: {
    title: 'SB10 - Tableau de bord 2018',
  },
  plugins: ['gatsby-plugin-react-helmet',
            {
              resolve: `gatsby-plugin-typography`,
              options: {
                pathToConfigModule: `src/utils/typography.js`,
              },
            },
            {
              resolve: `gatsby-source-gamesapi`,
              options: {
                apiURL: 'https://w8ir5ytsib.execute-api.us-east-1.amazonaws.com/dev/games',
              },
            }
          ],
}
