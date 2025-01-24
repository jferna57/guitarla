import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Guitar from './components/Guitar'
import { useState } from 'react'
import { db } from './data/db'

function App() {

    const [data, setData] = useState(db)
    const [cart, setCart] = useState([])

    function addToCart(item) {
        const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);

        if (existingItemIndex !== -1) {
            const updatedCart = [...cart];
            updatedCart[existingItemIndex].quantity++;
            setCart(updatedCart);
        } else {
            // Si el ítem no existe, lo agrega con cantidad 1
            item.quantity = 1;
            setCart(prevCart => [...prevCart, item]);
        }
    }

    return (
        <>
            <Header 
                cart={cart}
                setCart={setCart}
            />
            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>

                <div className="row mt-5">
                    {data.map((guitar) => (
                        <Guitar
                            key={guitar.id}
                            guitar={guitar}
                            addToCart={addToCart}
                        />
                    ))
                    }
                </div>
            </main>

            <Footer />
        </>
    )
}

export default App
