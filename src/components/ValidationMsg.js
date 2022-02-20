import React from "react"

const ValidationMsg = ({ validMsg }) => {
  return (
    <div style={{ color: validMsg.color, paddingTop: "5px" }}>
      {validMsg.msg}
    </div>
  )
}

export default ValidationMsg
