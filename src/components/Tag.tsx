import React from "react"
import { navigate } from "gatsby"
import { Chip } from "@material-ui/core";


type TagProps = {
  name: string,
  count?: number,
  selected?: boolean
}
const Tag :React.VFC<TagProps> = ({name, count, selected = false}) => {

  const navigateToTag = e => {
    navigate(`/tag/${name}`)
    e.stopPropagation()
    e.preventDefault()
  }

  const label = name + (count ? ` ${count}` : "")
 
  return (
    
    <Chip
      onClick={navigateToTag}
      label={label}
      size="small"
      clickable
      variant={selected ? "default" : "outlined"}
    />
  )
}

export default Tag