import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Vehicle from "./models/Vehicle.js";
import multer from "multer";
import cors from "cors"
// vehicle types - 1 , 2, 3
// 1 - two wheeler, 2 - four wheeler 3 - All
// Surya Palanisamy16:44
// 1. Add api
// 2.get all brands Api
// 3.get brand details by id
dotenv.config();
const app = express();
const PORT = 8000;


app.use(cors());
app.use(express.json());
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Set the destination folder for uploaded files
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + '-' + file.originalname);
    },
  });
  const upload = multer({ storage });

app.get("/", (req, res) => {
  res.send("Hello Express");
});

app.post("/addvehicle", async (req, res) => {
  const { title, vehicleType, address, mobile, websiteURL, logo, banner } =
    req.body;
  try {
    const newVehicle = new Vehicle({
      title,
      vehicleType,
      address,
      mobile,
      websiteURL,
      logo,
      banner,
    });

    const savedVehicle = await newVehicle.save();

    if (!savedVehicle) {
      res.status(404).json({ error: "Not Added " });
    } else {
      res.status(201).json(savedVehicle);
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to add a new vehicle." });
  }
});

// app.post('/addvehicle', upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'banner', maxCount: 1 }]), async (req, res) => {
//     const { title, vehicleType, address, mobile, websiteURL } = req.body;
//     const logo = req.files['logo'][0].filename; // Uploaded logo file name
//     const banner = req.files['banner'][0].filename; // Uploaded banner file name
  
//     try {
//       const newVehicle = new Vehicle({
//         title,
//         vehicleType,
//         address,
//         mobile,
//         websiteURL,
//         logo,
//         banner,
//       });
  
//       const savedVehicle = await newVehicle.save();
  
//       if (!savedVehicle) {
//         res.status(404).json({ error: 'Not Added ' });
//       } else {
//         res.status(201).json(savedVehicle);
//       }
//     } catch (err) {
//       res.status(500).json({ error: 'Failed to add a new vehicle.' });
//     }
//   });

app.get("/getAllBrand", async(req,res) =>{
    const allVehicleDetails = await Vehicle.find();
    res.status(200).json(allVehicleDetails);
})

app.get("/getBrandById/:id",async(req,res) =>{
    const id = req.params.id;
    const vehicleDetails = await Vehicle.findById(id);
    res.status(200).json(vehicleDetails)
});
app.get("/getVehicleByTitle/:title", async (req, res) => {
    const title = req.params.title;
    try {
      const vehicle = await Vehicle.findOne({ title });
  
      if (!vehicle) {
        return res.status(404).json({ error: "Vehicle not found" });
      }
  
      res.status(200).json(vehicle);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch the vehicle by title" });
    }
  });
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server is running at ${PORT}`))
  )
  .catch((error) => console.log(`${error} did not connect...`));
