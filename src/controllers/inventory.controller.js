import prisma from "../config/prisma.js";
import { successResponse, errorResponse } from "../utils/response.js";

// getInventories,
export const getInventories = async (req, res) => {
  const inventories = await prisma.inventory.findMany();
  return successResponse(res, "get inventory successful", inventories);
};

// getInventory,
export const getInventory = async (req, res) => {
  const { id } = req.params;
  const inventory = await prisma.inventory.findUnique({ where: { id } });

  if (!inventory) {
    return errorResponse(res, "id not found", null, 401);
  } else {
    return successResponse(res, "get inventory by id successful", inventory);
  }
};

// createInventory,
export const createInventory = async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description)
    return errorResponse(res, "Data tidak boleh kosong", null, 401);

  const inventory = await prisma.inventory.create({
    data: { name, description },
  });

  return successResponse(res, "inventory created", inventory);
};

// updateInventory,
export const updateInventory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  if (!name || !description)
    return errorResponse(res, "Data tidak boleh kosong", null, 401);

  const inventory = await prisma.inventory.update({
    where: { id },
    data: { name, description },
  });

  return successResponse(res, "inventory updated", inventory);
};

// deleteInventory,
export const deleteInventory = async (req, res) => {
  const { id } = req.params;

  const inventory = await prisma.inventory.delete({
    where: { id },
  });

  return successResponse(res, "inventory deleted", inventory);
};
