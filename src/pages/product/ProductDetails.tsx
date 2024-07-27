import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Loader from "../../compoentns/loader/Loader";
import ErrorPage from "../../compoentns/ErrorPage";
import { Link } from "react-router-dom";
import axios from "axios";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  images: string[];
}

const ProductDetails = () => {
  const { productId } = useParams();

  // mutation
  const mutation = useMutation({
    mutationFn: async (newProduct): Promise<Product> => {
      return axios.put(`https://dummyjson.com/products/1${productId}`, newProduct)
        
    }
  });

  console.log(mutation.isSuccess)
  const fetchProduct = async (): Promise<Product> => {
    const response = await fetch(`https://dummyjson.com/products/${productId}`);
    const data = await response.json();
    return data;
  };

  const {
    isLoading,
    error,
    data: product,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: fetchProduct, // Pass the fetchProduct function
  });

  console.log(product);

  if (isLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  if (error) {
    return (
      <>
        <ErrorPage />
      </>
    );
  }

  return (
    <div className="mt-6 p-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      <div key={product.id} className="group relative cursor-pointer">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 ">
          <img
            alt={product.title}
            src={product.images[0]}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>

        <div className="mt-4 flex justify-between">
          <p>{product.description}</p>
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700 hover:underline">
              <Link to={`/product1`}>
                <span aria-hidden="true" className="absolute inset-0" />
                {product.title}
              </Link>
            </h3>
            <p className="mt-1 text-sm text-gray-500">{product.rating}</p>
          </div>

          <p className="text-sm font-medium text-gray-900">${product.price}</p>
        </div>
        <button
          className="px-8 p-4 w-full text-white bg-blue-800"
          onClick={() => {
            mutation.mutate({ title: 'Do Laundry' });
          }}
        >
          Update Product
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;