import { createContext, useContext, useEffect, useState } from "react";


export const TaskContext = createContext()

export const useTask = () => useContext(TaskContext)

export const TaskProvider = ({children}) =>{
    const [productos, setproductos] = useState([])
    
    const [car, setcar] = useState([]);
    // MESAGE CAR ADD
    const [msgCar, setMsgCar] = useState(false)
    // Preview del producto escogido
    const [previewAdd, setPreviewAdd] = useState()
    

    useEffect(()=>{
        const shop = JSON.parse(localStorage.getItem('carshop'))||[]
        setcar(shop)
    },[])

    // ADD
    const addCar = (productToAdd)=>{
        setcar((prevCar)=>{
            const updateCar = [...prevCar, productToAdd];
            localStorage.setItem('carshop', JSON.stringify(updateCar))
            return updateCar;
        });
    };
    // DELETE
    const deleteCar = (productDeleteId)=>{
            setcar((prevCar)=>{
                const productosCar = prevCar.filter((e)=> e._id !== productDeleteId)
                localStorage.setItem('carshop', JSON.stringify(productosCar))
                return productosCar
            })
    }
        
    return <TaskContext.Provider value={{productos, setproductos, car, setcar, addCar, deleteCar, msgCar, setMsgCar, previewAdd, setPreviewAdd}}>{children}</TaskContext.Provider>
}

