import React from 'react'


let name = "omar"
const MyButton = () => {
  return (
        <div>
            <button onClick={ButtonClicked}>Click Me</button>
            <h1>{name}</h1>
        </div>
    
  )
}
function ButtonClicked(){
    name = "waleed";
}
export default MyButton