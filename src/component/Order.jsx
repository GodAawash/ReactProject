import { useState } from "react";

export default function Order() {
  const initialPrice = 2950;
  const shipping = 175;
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(initialPrice);
  const [couponApplied, setCouponApplied] = useState(false);

  const updateQuantity = (change) => {
    setQuantity((prev) => Math.max(0, prev + change));
  };

  const applyCoupon = () => {
    if (!couponApplied) {
      setPrice(initialPrice * 0.9);
      setCouponApplied(true);
      alert("Coupon Applied! 10% off");
    } else {
      alert("Coupon already applied!");
    }
  };

  const checkout = () => {
    alert(
      `Proceeding to checkout with total: NPR ${(
        price * quantity +
        shipping
      ).toLocaleString()}.00`
    );
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 shadow-md font-serif">
      <h2 className="text-2xl font-semibold mb-4  ">Shopping Cart</h2>
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center">
          <img
            src="https://caliber-kd-shoes.s3.ap-south-1.amazonaws.com/uploads/2025/02/09144914/746-lt-gry.jpg"
            alt="Product"
            className="w-16 h-16 object-cover mr-4"
          />
          <span className="text-lg">Caliber Shoes Grey Sport Shoes - 41</span>
        </div>
        <span className="text-lg">NPR {initialPrice.toLocaleString()}.00</span>
        <div className="flex items-center">
          <button
            className="bg-gray-300 px-2 py-1"
            onClick={() => updateQuantity(-1)}
          >
            -
          </button>
          <input
            type="text"
            className="w-10 text-center border"
            value={quantity}
            readOnly
          />
          <button
            className="bg-gray-300 px-2 py-1"
            onClick={() => updateQuantity(1)}
          >
            +
          </button>
        </div>
        <span className="text-lg text-red-600">
          NPR {(price * quantity).toLocaleString()}.00
        </span>
      </div>
      <div className="flex justify-between items-center mt-4">
        <input
          type="text"
          placeholder="Coupon code"
          className="border p-2 w-1/2"
          id="coupon"
        />
        <button
          className="bg-red-500 text-white px-4 py-2"
          onClick={applyCoupon}
        >
          Apply Coupon
        </button>
      </div>
      <div className="mt-6">
        <p>Subtotal: NPR {(price * quantity).toLocaleString()}.00</p>
        <p>
          Shipping:{" "}
          <span className="text-red-600">
            NPR {shipping.toLocaleString()}.00
          </span>
        </p>
        <p className="text-xl font-bold">
          Total: NPR {(price * quantity + shipping).toLocaleString()}.00
        </p>
      </div>
      <button
        className="bg-red-600 text-white px-6 py-3 mt-4 w-full"
        onClick={checkout}
      >
        Proceed to Checkout
      </button>
    </div>
  );
}
