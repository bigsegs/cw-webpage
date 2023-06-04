import React from 'react'
import Carousel from 'react-bootstrap/Carousel'

export const WorkImageCarousel=({imageArray})=>{
return(
<Carousel  slide={false} fade ={true} controls={false} indicators={false} >
    {imageArray.map(({url,label},index)=>{
        return(
        <Carousel.Item key={index}>
            <img className="d-block w-100"
            src={url}
            alt={label}
            style={{objectFit:"cover",maxHeight:"300px", maxWidth:"300px"}}
            />
            <Carousel.Caption>
                <h3>{label}</h3>
            </Carousel.Caption>
        </Carousel.Item>
        )
    })}
</Carousel>

)

}
