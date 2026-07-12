import express from "express";
import cors from "cors";
import dotenv from "dotenv"; 
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import productRoutes from "./routes/productRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import db from "./config/db.js"; 


dotenv.config(); 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__dirname);

const app = express();
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/user/login', loginRoutes);
app.use('/api/cart', cartRoutes);

// const PORT = process.env.PORT || 3000; 
// app.listen(PORT, () => {
//     console.log(`Server is running with success on port ${PORT} !!!`);
// });

if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000; 
    app.listen(PORT, () => {
        console.log(`Server is running with success on port ${PORT} !!!`);
    });
}

export default app; 

