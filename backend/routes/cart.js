const express = require("express");
const router = express.Router();

const Cart = require("../models/cart.model");

router.put("/", (req, res) => {
  const { userId, cart, totalQtyCart, totalPriceCart } = req.body;

  let info = {
    alert: "",
  };

  const info1 = {
    success: "",
  };

  console.log(userId, cart, totalQtyCart, totalPriceCart);

  if (!userId || !cart || !totalQtyCart || !totalPriceCart) {
    info.alert = "Something went wrong, try one more time";
    return res.status(400).json(info);
  }

  if (Boolean(!info.alert)) {
    Cart.findOne({ userId: userId })
      .then((response) => {
        if (response) {
          response.userId = userId;
          response.cart = cart;
          response.totalQtyCart = totalQtyCart;
          response.totalPriceCart = totalPriceCart;
          response.save((err, data) => {
            if (err) {
              return res.status(500).json(err);
            }
            info1.success = "Cart updated sucessfully";
            return res.status(200).json(info1);
          });
        } else {
          const cartData = {
            userId: userId,
            cart: cart,
            totalQtyCart: totalQtyCart,
            totalPriceCart: totalPriceCart,
          };

          const newCart = new Cart(cartData);

          newCart.save((err, data) => {
            if (err) {
              info.alert = "Server error,during saving in database new cart";
              console.log(err);
              return res.status(500).json(info);
            }

            console.log(data);

            const info2 = {
              success: "Product added to cart",
            };

            return res.status(200).json(data);
          });
        }
      })
      .catch((err) => {
        if (err) {
          info.alert = "Server error,during saving in database new cart catch";
          console.log(err);
          return res.status(500).json(info);
        }
      });
  }
});

// router.put("/", (req, res) => {
//   const { userId, cart, totalQtyCart, totalPriceCart } = req.body;
//   Cart.findOneAndUpdate(
//     { userId: userId },
//     {
//       $set: {
//         userId: userId,
//         cart: cart,
//         totalQtyCart: totalQtyCart,
//         totalPriceCart: totalPriceCart,
//       },
//     },
//     (err, data) => {
//       if (err) {
//         return res.status(500).json("To jest błąd podczas update server");
//       }else{

//       }
//     }
//   );
// });

router.get("/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  Cart.findOne({ userId: id }, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }

    return res.status(200).json(data);
  });
});

router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  const info1 = {
    alert: "",
  };
  const info2 = {
    success: "",
  };
  Cart.findOneAndDelete({ userId: id }).exec((err, data) => {
    if (err) {
      info1.alert = "Something went wrong, when delete cart";
      return res.status(500).json(info1);
    }
    info2.success = "Cart succesfully deleted";
    return res.status(200).json(info2);
  });
});

module.exports = router;
