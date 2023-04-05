import cors from 'cors';
import express, { type Application } from 'express';

// import swaggerUi from 'swagger-ui-express';
import { HOTEL_PATH, SERVER_PORT, SERVER_PUBLIC_DIR } from './config/constant';
// import { sequelize as database } from './models';
import { hotelRoutes } from './routes/v1';
// import { swaggerSetup } from './swagger';

// async function dbConnection(): Promise<void> {
// 	return new Promise(async (resolve, reject) => {
// 		try {
// 			await database.authenticate();
// 			console.log('Database online');
// 			resolve();
// 		} catch (error) {
// 			console.trace('error when connecting to the db: ', error);
// 			reject(error);
// 		}
// 	});
// }

function middlewares(app: Application): void {
  app.use(cors());
  app.use(express.json());
  app.use(express.static(SERVER_PUBLIC_DIR));
}

function routes(app: Application): void {
  // eslint-disable-next-line no-console
  console.log({ HOTEL_PATH });
  app.use(HOTEL_PATH, hotelRoutes);
  // app.use(BOOKS_PATH, bookRouter);
  // app.use(DOCUMENTATION_PATH, swaggerUi.serve, swaggerUi.setup(swaggerSetup));
}

function listen(app: Application, port: string): void {
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running on port ${port}`);
  });
}

// function close(app: Application): void {
// 	app.listen().close();
// }

function createServer(): void {
  const app = express();
  routes(app);
  middlewares(app);
  // await dbConnection();
  listen(app, SERVER_PORT);
}

createServer();
