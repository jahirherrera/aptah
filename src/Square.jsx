
export  function Square({children, row, column,change }){

   


    function changing(){
        change(row,column);
    }

    return(
        <div onClick={changing} className='square'>
            {children}
        </div>
    )
}