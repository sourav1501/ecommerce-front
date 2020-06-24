import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import Card from './Card'
import { getCategories, getFilteredProducts } from './apiCore'
import Checkbox from '../core/Checkbox'
import Radiobox from './Radiobox'
import { prices } from './fixedPrices'
const Shop = () => {
    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    })
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(false)
    const [limit, setLimit] = useState(6)
    const [skip, setSkip] = useState(0)
    const [filterdResult, setFilteredResults] = useState([])

    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setCategories(data)
            }
        })
    }
    useEffect(() => {
        init()
        loadFilterResults(skip, limit, myFilters)
    }, [])

    const handleFilters = (filters, filterBy) => {
        // console.log(filters,filterBy)
        const newFilters = { ...myFilters }
        newFilters.filters[filterBy] = filters
        if (filterBy === "price") {
            let priceValues = handlePrice(filters)
            newFilters.filters[filterBy] = priceValues

        }
        loadFilterResults(myFilters.filters)
        setMyFilters(newFilters)
    }

    const handlePrice = value => {
        const data = prices
        let array = []
        for (let key in data) {
            if (data[key]._id == parseInt(value)) {
                array = data[key].array
            }
        }
        return array
    }
    const loadFilterResults = (newFilters) => {
        getFilteredProducts(skip, limit, newFilters).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setFilteredResults(data.data)
            }
        })
    }
    return (
        <Layout title="Shop Page" desciption="Search and find books of your choice " className="container-fluid">

            <div className="row">
                <div className="col-4">
                    <h4>Filtered by categories</h4>

                    <ul>
                        <Checkbox categories={categories} handleFilters={(filters) => handleFilters(filters, "category")} />
                    </ul>
                    <h4>Filtered by price</h4>


                    <Radiobox prices={prices} handleFilters={(filters) => handleFilters(filters, "price")} />

                </div>
                <div className="col-4">
                    <h2 className="mb-4">Products</h2>
                    <div className="row">
                        {filterdResult.map((product, i) => (
                                <Card key={i} product={product} />
                        ))}
                    </div>
                </div>
            </div>


        </Layout>
    )
}

export default Shop
