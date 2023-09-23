"use client";

// Import statements
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

// Sample products
const dummyProducts = [
  {
    id: 1,
    name: 'Product A',
    price: 50,
    image: '/path/to/imageA.jpg',
    description: 'This is a brief description of Product A.',
    color: 'Red',
    size: 'M',
  },
  {
    id: 2,
    name: 'Product B',
    price: 60,
    image: '/path/to/imageB.jpg',
    description: 'This is a brief description of Product B.',
    color: 'Blue',
    size: 'L',
  },
];

const CartPage: React.FC = () => {
  const [quantities, setQuantities] = useState<{ [id: number]: number }>({
    1: 1,
    2: 1,
  });

  // Calculate the total price based on product prices and their quantities
  const totalPrice = dummyProducts.reduce(
    (acc, product) => acc + product.price * (quantities[product.id] || 0),
    0
  );

  return (
    <div className="my-5">
      <h1 className="font-bold my-5">Your Cart</h1>
      {dummyProducts.map((product) => (
          <Card className="flex flex-col md:flex-row items-center justify-between p-2 my-5" key={product.id}>
            <div className="flex flex-col md:flex-row  items-center gap-5">
              <img src={product.image} alt={product.name} className="h-24 w-24 object-cover pt-2" />
              <CardHeader>
                <CardTitle className="hover:underline hover:cursor-pointer">{product.name}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
                <p className="text-sm text-gray-400">Color: {product.color}</p>
                <p className="text-sm text-gray-400">Size: {product.size}</p>
                <p className="text-sm text-gray-400">${product.price}</p>
              </CardHeader>
            </div>

            <CardContent>
              <div className="ml-3 gap-5 flex items-center">
                <Button
                  className="font-bold text-xl"
                  variant="outline"
                  onClick={() => setQuantities({
                    ...quantities,
                    [product.id]: (quantities[product.id] || 1) - 1,
                  })}
                  disabled={quantities[product.id] === 1}
                >
                  -
                </Button>
                <span className="mx-2">{quantities[product.id]}</span>
                <Button
                  className="font-bold text-xl"
                  variant="outline"
                  onClick={() => setQuantities({
                    ...quantities,
                    [product.id]: (quantities[product.id] || 1) + 1,
                  })}
                >
                  +
                </Button>
              </div>
            </CardContent>

            <CardFooter>
              <Button variant="destructive">Remove</Button>
            </CardFooter>
          </Card>
        ))}

      {/* Displaying the total price */}
      <div className="flex justify-between items-center mt-6 mb-4">
        <h2 className="text-xl font-semibold">Total Amount:</h2>
        <span className="text-lg">${totalPrice.toFixed(2)}</span>
      </div>

      <div className="flex justify-end pt-2">
        <Button>Order</Button>
      </div>
    </div>
  );
}

export default CartPage;
