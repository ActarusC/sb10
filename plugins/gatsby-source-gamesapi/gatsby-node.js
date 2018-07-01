const fetch = require('node-fetch')
//const queryString = require('query-string')
const crypto = require('crypto')

exports.sourceNodes = (
  { boundActionCreators, createNodeId },
  configOptions
) => {
  const { createNode } = boundActionCreators

  // Gatsby adds a configOption that's not needed for this plugin, delete it
  delete configOptions.plugins


  // Helper function that processes a game to match Gatsby's node structure
  const processGame = game => {
    const nodeId = game.Sport + game.id
    const nodeContent = JSON.stringify(game)
    const nodeContentDigest = crypto
      .createHash('md5')
      .update(nodeContent)
      .digest('hex')

    const nodeData = Object.assign({}, game, {
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: `Game`,
        content: nodeContent,
        contentDigest: nodeContentDigest,
      },
    })

    return nodeData
  }

  const apiUrl = configOptions.apiURL

  // Gatsby expects sourceNodes to return a promise
  return (
    // Fetch a response from the apiUrl
    fetch(apiUrl)
      // Parse the response as JSON
      .then(response => response.json())
      // Process the JSON data into a node
      .then(data => {
        // For each query result (or 'hit')
        data.forEach(game => {
          const nodeData = processGame(game)
          // Use Gatsby's createNode helper to create a node from the node data
          createNode(nodeData)
        })
        console.log("Ajouté " + data.length);
      })
  )
}