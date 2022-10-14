const ImageFacility = ({ 
data={},
image='/assets/images/vector/frame.png',
className='flex gap-2',imageClass="text-xs h-3 mt-[1px]",
textClass="text-xs"
}) => {
    return(
    <>    
    {
    Object.keys(data).length>0 ?  
            <>
                {data.map((facillity,index)=>(
                    <div className={className} key={index}>
                      <img src={image} className={imageClass} alt="" />
                      <p className={textClass}>{facillity.text}</p>
                    </div>
                ))}
            </>
        :null
    }
    </>
    )
    }
    export default ImageFacility;