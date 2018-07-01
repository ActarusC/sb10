import React from 'react'
export default class GamesList extends React.Component {
    render() {
        return (
            <div>
                <h1>Liste des matchs</h1>
                {
                    this.props.data.allGame.edges.map((edge, index) => {
                        const game = edge.node
                        return (
                            <div key={game.id}>{game.Sport} {game.DateHeure} {game.EquipeVis} @ {game.EquipeLoc} </div>
                        )
                    })
                }
            </div>
        );
    }
}


export const query = graphql`
query AllGames {
  allGame {
      edges {
        node {
          Sport,
          DateHeure,
          EquipeLoc,
          EquipeVis,
          id
        }
      }
  }
}
`