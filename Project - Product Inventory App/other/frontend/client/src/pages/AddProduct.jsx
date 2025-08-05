import { useState } from 'react'
import axios from 'axios'

const AddProduct = () => {
  const [form, setForm] = useState({
    name: '',
    price: '',
    quantity: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post('/api/products', form)
    alert('Product added!')
    setForm({ name: '', price: '', quantity: '' })
  }

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded w-96 space-y-4">
        <h2 className="text-xl font-semibold">Add Product</h2>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product Name"
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          type="number"
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          type="number"
          required
          className="w-full p-2 border rounded"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Add Product
        </button>
      </form>
    </div>
  )
}

export default AddProduct
