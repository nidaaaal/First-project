import axios from "axios";
import { useEffect, useState } from "react";

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [sortedOrders, setSortedOrders] = useState({});
  const [favouriteOrders, setFavouriteOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://json-server-cn80.onrender.com/orders")
      .then((res) => {
        const ordersData = res.data;
        setOrders(ordersData);
        processOrders(ordersData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setError(err);
        setLoading(false);
      });
  }, []);

  const processOrders = (ordersData) => {
    const sortedByRecent = [...ordersData].reverse();

    const categorySortedOrders = {};
    sortedByRecent.forEach((order) => {
      order.items.forEach((item) => {
        if (!categorySortedOrders[item.category]) {
          categorySortedOrders[item.category] = [];
        }
        categorySortedOrders[item.category].push({
          ...item,
          orderId: order.id,
          totalAmount: order.totalAmount,
        });
      });
    });
    setSortedOrders(categorySortedOrders);

    const productCount = {};
    ordersData.forEach((order) => {
      order.items.forEach((item) => {
        if (!productCount[item.name]) {
          productCount[item.name] = { ...item, count: 0 };
        }
        productCount[item.name].count += item.quantity;
      });
    });

    const mostOrdered = Object.values(productCount)
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);
    setFavouriteOrders(mostOrdered);
  };

  return { orders, sortedOrders, favouriteOrders, loading, error };
};
