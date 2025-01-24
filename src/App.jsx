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

    function removeItemFromCart(guitarId) {
        const updatedCart = cart.filter(guitar => guitar.id !== guitarId);
        setCart(updatedCart);
    }

    function increaseQuantity(guitarId) {
        const updatedCart = cart.map(guitar => {
            if (guitar.id === guitarId) {
                guitar.quantity++;
            }
            return guitar;
        });
        // Imprimir por consola el valor del carrito
        setCart(updatedCart);
    }

    function reduceQuantity(guitarId) {
        const updatedCart = cart.map(guitar => {
            if (guitar.id === guitarId) {
                guitar.quantity--;
            }
            return guitar;
        });
        // Elimina el ítem si la cantidad es igual o menor a 0
        setCart(updatedCart.filter(guitar => guitar.quantity > 0));
    }

    function clearCart() {
        setCart([]);
    }

    return (
        <>
            <Header 
                cart={cart}
                setCart={setCart}
                increaseQuantity={increaseQuantity}
                reduceQuantity={reduceQuantity}
                removeItemFromCart={removeItemFromCart}
                clearCart={clearCart}
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
