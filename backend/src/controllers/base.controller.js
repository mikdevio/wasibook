import fs from "fs";
import path from "path";
import * as settings from "../settings.js";

export const getItem = async (Model, req, res) => {
  try {
    console.log("obteniendo");
    const id = req.params.id;
    const { populateOptions } = req.query;

    let query = Model.findById(id);

    if (populateOptions) {
      const options = JSON.parse(populateOptions);
      query = query.populate(options);
    }

    const data = await query.exec();

    res.status(200).json({
      data: data,
      message: `${Model.modelName} info found.`,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error.",
      error: error.message,
    });
  }
};

export const getAll = async (Model, req, res) => {
  try {
    const { populateOptions } = req.query;

    let query = Model.find({});

    if (populateOptions) {
      const options = JSON.parse(populateOptions);
      // console.log(options);
      query = query.populate(options);
    }

    const itemList = await query;

    // console.log(itemList);

    res.status(200).json({
      data: itemList,
      message: `All ${Model.modelName}s list.`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error.",
      error: error,
    });
  }
};

export const editItem = async (Model, req, res) => {
  const id = req.params.id;
  try {
    const data = await Model.findById(id).exec();
    res.status(200).json({
      data: data,
      message: `${Model.modelName} info found.`,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error.",
      error: error.message,
    });
  }
};

export const createItem = async (Model, req, res) => {
  try {
    // Obtener los datos del cuerpo de la solicitud
    const data = req.body;

    // Si hay una imagen, procesarla
    if (data["img.data"]) {
      data.img = {
        data: fs.readFileSync(
          path.join(
            settings.__dirname,
            `upload/${Model.modelName}`,
            data["img.data"]
          )
        ),
        contentType: "image/png",
      };
      delete data["img.data"]; // Eliminar la clave original para evitar conflictos
    }

    // Crear una nueva instancia del modelo con los datos proporcionados
    const newItem = new Model(data);

    // Guardar el nuevo ítem en la base de datos
    const result = await newItem.save();

    res.status(200).json({
      data: result,
      message: `${Model.modelName} info saved.`,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message, // Incluir el mensaje de error para depuración
    });
  }
};

export const updateItem = async (Model, req, res) => {
  const itemId = req.params.id;
  try {
    // Crear un objeto con los datos actualizados
    const updateData = req.body;

    // Si hay una imagen, procesarla
    if (updateData["img.data"]) {
      updateData.img = {
        data: fs.readFileSync(
          path.join(
            settings.__dirname,
            `upload/${Model.modelName}`,
            updateData["img.data"]
          )
        ),
        contentType: "image/png",
      };
      delete updateData["img.data"]; // Eliminar la clave original para evitar conflictos
    }

    // Buscar y actualizar el documento
    const updatedItem = await Model.findOneAndUpdate(
      { _id: itemId },
      updateData,
      { new: true }
      // Esta opción devuelve el documento actualizado
    );

    if (!updatedItem) {
      return res.status(404).json({
        status: "error",
        message: `${Model.modelName} not found`,
      });
    }

    res.status(200).json({
      data: updatedItem,
      message: `${Model.modelName} updated successfully`,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const deleteItem = async (Model, req, res) => {
  const itemId = req.params.id;
  try {
    const deletedItem = await Model.findOneAndDelete({ _id: itemId });

    if (!deletedItem) {
      return res.status(404).json({
        status: "error",
        message: `${Model.modelName} not found`,
      });
    }

    res.status(200).json({
      status: "success",
      message: `${Model.modelName} deleted from DB.`,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const generateReport = async (Model, req, res) => {
  try {
    const itemList = await Model.find({});

    // TODO: Add open pdf file functionality here
    // Ejemplo: Generar el PDF con los datos de itemList

    res.status(200).json({
      status: "success",
      message: `${Model.modelName} report generated successfully.`,
    });
  } catch (error) {
    res.status(500).send("Error on PDF report generation.");
  }
};
