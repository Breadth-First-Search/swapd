import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import ListSubheader from '@material-ui/core/ListSubheader'
import IconButton from '@material-ui/core/IconButton'
import InfoIcon from '@material-ui/icons/Info'
import {Link} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: '90%',
    height: '40%'
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)'
  }
}))

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default function TopTen(props) {
  const classes = useStyles()
  const {topUsers} = props

  console.log(topUsers)

  return (
    <div className={classes.root}>
      <GridList cellHeight={225} className={classes.gridList} cols={5} rows={2}>
        <GridListTile
          key="Subheader"
          cols={5}
          rows={2}
          style={{height: 'auto'}}
        >
          <ListSubheader component="div">Top Ten</ListSubheader>
        </GridListTile>
        {topUsers.map((user, index) => (
          <GridListTile key={user.id}>
            <img src={user.photo} alt={user.firstName} />
            <Link>
              <GridListTileBar title={user.firstName} actionIcon={index} />
            </Link>
          </GridListTile>
        ))}
      </GridList>
    </div>
  )
}