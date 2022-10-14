
const Facilities = ({ data={},icon='fa-solid fa-check',className='my-5' }) => {
return(
<>    
{
Object.keys(data).length>0 ?  
        <div className={className}>
            {data.map((facillity,index)=>(
                <div className="flex gap-1 py-1" key={index}>
                    <span className="text-green-300"><i className={icon}></i></span>
                    <p className="text-xs ">
                        {facillity.text}
                    </p>
                </div>
            ))}
        </div>
    :null
}
</>
)
}
export default Facilities;