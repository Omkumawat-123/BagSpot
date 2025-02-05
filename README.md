# BagSpot - E-commerce Website

## Overview
BagSpot is a modern e-commerce website designed for a seamless shopping experience. It provides an intuitive UI/UX, responsive design, and efficient functionality for users to browse, search, and purchase bags online.

## Features
- 🛍️ **Product Listings**: View a wide range of bags with detailed descriptions and pricing.
- 🔍 **Search & Filter**: Easily find the perfect bag using search and category filters.
- 🛒 **Shopping Cart**: Add, update, or remove items from the cart before checkout.
- 💳 **Secure Payments**: Integrated payment gateway for seamless transactions.
- 👤 **User Authentication**: Register, log in, and manage user accounts securely.
- 📦 **Order Management**: Track and manage orders efficiently.

## Tech Stack
### **Frontend**:
- React.js ⚛️
- Tailwind CSS 🎨
- Redux (for state management)

### **Backend**:
- Node.js & Express.js 🚀
- MongoDB (for database storage) 🍃
- JWT Authentication 🔐

### **Other Tools**:
- Cloudinary (for image uploads)
- Stripe (for payment processing)
- Multer (for file handling)

## Installation & Setup
### **1. Clone the repository**
```sh
git clone https://github.com/Omkumawat-123/BagSpot.git
cd BagSpot
```

### **2. Install dependencies**
```sh
npm install
```

### **3. Set up environment variables**
Create a `.env` file in the root directory and configure the required environment variables:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_API_KEY=your_api_key
STRIPE_SECRET_KEY=your_stripe_key
```

### **4. Run the application**
```sh
npm start
```
The frontend runs at `http://localhost:3000` and the backend at `http://localhost:5000`.


## Future Enhancements
- 📱 Mobile app integration
- 📢 Push notifications for order updates
- 📊 Admin dashboard for analytics and reports

## Contributing
Pull requests are welcome! Feel free to fork the repository and submit improvements.

## License
This project is licensed under the MIT License.

---
💡 Developed with ❤️ by Om Kumawat

