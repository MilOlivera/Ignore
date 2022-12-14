import React, {useState, useEffect} from "react";
import ItemListCss from "../../Assets/css/ItemList.css"
import {Link, Route, Routes, BrowserRouter, useParams} from 'react-router-dom'
import ItemDetailContainer from "../ItemDetailContainer";


const ItemList = () => {

  const onAdd = (cantidad) => {
      console.log(`Compraste ${cantidad} unidades`)
  }

  const {nombreCategoria} = useParams()
 

  const URL = nombreCategoria ? `https://api.mercadolibre.com/sites/MLA/search?q=${nombreCategoria}` : 'https://api.mercadolibre.com/sites/MLA/search?q=notebook';

    const [productos, setProductos] = useState([])
    
    // const prueba = fetch('https://fakestoreapi.com/products')
    // .then(res=>res.json())
    // .then(json=>console.log(json))

    const buscarProductos = async() => {

        try{
            const response = await fetch(URL, {setTimeout: 2000})
            const data = await response.json()
            setProductos(data.results)
        }
        catch(error){
            console.log(error)
        }
    }
    useEffect(() => {
        buscarProductos()
    }, [])

    return(
        <div className='probando'>
        {productos.slice(0,9).map((product) => {

        return(
            <div>

              <div className="cardSection">
                
                <div className="cardImg">
                  <a href='/item/1'>
                    <img src={product.thumbnail} height={200} width={250}/>
                  </a>
                  <p className="cardPrice">$ {product.price}</p>
                </div>
                
                <div className="cardTitle">
                  <h4>{product.title}</h4>
                </div>
                
              <Link to={`/item/${product.id}`}>
                <div className="cardTitle">
                  <button>Ver Detalle</button>
                </div>
              </Link>
              </div>  
            </div>
        )

        })}

        </div>
    )
}

export default ItemList
