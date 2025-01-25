import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Guitar from './components/Guitar'
import { useCart } from './hooks/cart'


function App() {

    const {
        data,
        cart,
        addToCart,
        removeItemFromCart,
        increaseQuantity,
        reduceQuantity,
        clearCart,
        isEmpyCart,
        cartTotal,
    } = useCart()

    return (
        <>
            <Header
                cart={cart}
                increaseQuantity={increaseQuantity}
                reduceQuantity={reduceQuantity}
                removeItemFromCart={removeItemFromCart}
                clearCart={clearCart}
                isEmpyCart={isEmpyCart}
                cartTotal={cartTotal}
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
