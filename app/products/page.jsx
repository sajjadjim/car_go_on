import React from 'react'

export default async function ProductsPage() {

    const res = await fetch('http://localhost:3000/api/items',{
        cache: 'force-cache'
    });
    const products = await res.json();

return (
    <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Products</h1>
        <ul className="space-y-6">
            {products.data.map(product => (
                <li
                    key={product._id}
                    className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
                >
                    <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
                    <p className="text-gray-700 mb-2">{product.description}</p>
                    <p className="text-sm text-gray-500 mb-1">
                        <strong className="font-medium text-gray-800">Category:</strong> {product.category}
                    </p>
                    <p className="text-sm text-gray-500 mb-1">
                        <strong className="font-medium text-gray-800">Status:</strong> {product.status}
                    </p>
                    <p className="text-sm text-gray-400">
                        <strong className="font-medium text-gray-800">Created At:</strong> {new Date(product.createdAt).toLocaleString()}
                    </p>
                </li>
            ))}
        </ul>
    </div>
)
}
