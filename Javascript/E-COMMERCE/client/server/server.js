// Importar dependencias con ES modules
import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { MercadoPagoConfig, Preference } from 'mercadopago';

// Cargar variables de entorno
dotenv.config();

// Para obtener __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configurar Mercado Pago (nuevo SDK)
const ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;
console.log('ACCESS_TOKEN loaded:', ACCESS_TOKEN ? `${ACCESS_TOKEN.slice(0,8)}...` : 'NOT_SET');

const client = new MercadoPagoConfig({ 
    accessToken: ACCESS_TOKEN
});
const preference = new Preference(client);

// Configurar middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));
app.use(cors());

app.get('/', (req, res) => {
    const indexPath = path.resolve(__dirname, "..", "index.html");
    res.sendFile(indexPath);
});

app.post("/create_preference", async (req, res) => {
    try {
        const { price, quantity, description } = req.body;
        
        // Detectar base URL: si el host es localhost usar http://localhost:8080,
        // en cualquier otro caso asumimos que es un host público (ngrok, localtunnel, etc.)
        const hostHeader = req.get('host') || '';
        const isLocalhost = hostHeader.includes('localhost') || hostHeader.includes('127.0.0.1');
        const baseUrl = isLocalhost ? `http://localhost:8080` : `https://${hostHeader}`;
        
        const preferenceData = {
            items: [
                {
                    title: description || "Compra de Ecommerce",
                    unit_price: parseFloat(price),
                    quantity: parseInt(quantity),
                },
            ],
            // Redirigir automáticamente al back_url cuando el pago sea aprobado
            auto_return: 'approved',
            
            back_urls: {
                success: `${baseUrl}/?payment=success`,
                failure: `${baseUrl}/?payment=failure`,
                pending: `${baseUrl}/?payment=pending`,
            },
            
        };

        const result = await preference.create({ body: preferenceData });
        console.log('MercadoPago result:', result);

        res.json({ 
            id: result.id,
            init_point: result.init_point,
            sandbox_init_point: result.sandbox_init_point
        });
        
    } catch (error) {
        console.error('Error en create_preference:', error);
        res.status(500).json({ 
            error: 'Error interno del servidor',
            details: error.message 
        });
    }
});

app.listen(8080, () => {
    console.log("Server listening on port 8080");
});