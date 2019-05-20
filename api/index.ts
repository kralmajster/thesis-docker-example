import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import { Request, Response } from "express";
import { createConnection } from "typeorm";
import { Car } from "../persistence/entity/car";

createConnection(process.env.MONGO_CONNECTION_NAME).then(connection => {
  const cars = connection.getRepository(Car);

  // initializing Express
  const app = express();
  app.use(bodyParser.json());
  app.use(cors());

  // endpoints for entity car
  app
    .route("/car")
    // Get all cars
    .get((req: Request, res: Response) => {
      cars
        .find()
        .then(cars => {
          res.send(cars);
        })
        .catch(error => {
          res.send(JSON.stringify(error));
        });
    })
    // create car
    .post((req: Request, res: Response) => {
      // let car = new Car();
      // car.brand = req.body.brand;
      // car.category = req.body.category;
      // car.make = req.body.make;
      cars
        .save(req.body)
        .then(car => {
          res.send(car);
        })
        .catch(error => {
          res.send(JSON.stringify(error));
        });
    });

  app
    .route("/car/:carId")
    // get specific car by id
    .get((req: Request, res: Response) => {
      cars
        .findOne(req.params.carId)
        .then(car => {
          res.send(car);
        })
        .catch(error => {
          res.send(JSON.stringify(error));
        });
    })
    .put((req: Request, res: Response) => {
      // Update specific car by id
      cars
        .update(req.params.carId, req.body)
        .then(car => {
          res.send(car);
        })
        .catch(error => {
          res.send(JSON.stringify(error));
        });
    })
    .delete((req: Request, res: Response) => {
      // Delete specific car by id
      cars
        .delete(req.params.carId)
        .then(car => {
          res.send(car);
        })
        .catch(error => {
          res.send(JSON.stringify(error));
        });
    });
  // starting Express
  app.listen(3000, () => console.log("Example app listening on port 3000!"));
});
