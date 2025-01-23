import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Guitar from './components/Guitar'
import { useState } from 'react'
import { useEffect } from 'react'
import { db } from './data/db'

function App() {

    const [data, setData] = useState([])

    useEffect(() => {
        setData(db)
    }, [])

    console.log(data)

    return (
        <>
            <Header />
            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>

                <div className="row mt-5">
                    {data.map((guitar) => (
                        <Guitar 
                            key={guitar.id}
                            guitar = {guitar} />
                    ))
                    }
                </div>
            </main>

            <Footer />
        </>
    )
}

export default App
