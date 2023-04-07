import cors from 'cors';
import express, { type Application } from 'express';

// import swaggerUi from 'swagger-ui-express';
import { HOTEL_PATH, SERVER_PORT, SERVER_PUBLIC_DIR } from './config/constant';
// import { sequelize as database } from './models';
import { hotelRoutes } from './routes/v1';
import { sequelize } from './database/configuration';

async function dbConnection(): Promise<void> {
  try {
    await sequelize.authenticate();
    console.log('Database online');
  } catch (error) {
    console.trace('error when connecting to the db: ', error);
    throw error;
  }
}

function middleware(app: Application): void {
  app.use(cors());
  app.use(express.json());
  app.use(express.static(SERVER_PUBLIC_DIR));
}

function routes(app: Application): void {
  console.log({ HOTEL_PATH });
  app.use(HOTEL_PATH, hotelRoutes);
  // app.use(DOCUMENTATION_PATH, swaggerUi.serve, swaggerUi.setup(swaggerSetup));
}

function listen(app: Application, port: string): void {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

function close(app: Application): void {
  app.listen().close();
}

async function createServer(): Promise<void> {
  const app = express();
  await dbConnection();
  middleware(app);
  routes(app);
  listen(app, SERVER_PORT);
}

void createServer();
