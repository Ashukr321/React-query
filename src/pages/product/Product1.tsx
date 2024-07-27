import React from "react";
import Loader from "../../compoentns/loader/Loader";
import ErrorPage from "../../compoentns/ErrorPage";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  images: string[];
}

const fetchData = async (): Promise<Product[]> => {
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();
  return data.products;
};

const Product1: React.FC = () => {
  const {
    isLoading,
    error,
    data: products,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchData,
    // staleTime:10000
  });

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {

    return (
      <div>
        <ErrorPage />
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl text-center mb-4 font-bold tracking-tight text-gray-900">
          LIST OF PRODUCTS
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map(product => (
            <div key={product.id} className="group relative cursor-pointer">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
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
                    <Link to={`/product1/${product.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.title}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.rating}</p>
                </div>

                <p className="text-sm font-medium text-gray-900">
                  ${product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product1;
