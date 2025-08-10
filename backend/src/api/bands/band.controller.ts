import { Request, Response, RequestHandler } from "express";
import * as bandService from "./band.service";

export const getBands: RequestHandler = async (req, res) => {
  try {
    const bands = await bandService.getBands();

    const filtered = bands.map((band) => ({
      id: band.id,
      name: band.name,
      vocal_names: band.vocal_names || [],
      guitar_names: band.guitar_names || [],
      bass_names: band.bass_names || [],
      drum_names: band.drum_names || [],
      keyboard_names: band.keyboard_names || [],
      other_names: band.other_names || [],
    }));

    res.status(200).json(filtered);
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Error fetching bands", error: err.message });
  }
};

export const getBandById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const band = await bandService.getBandById(id);
    if (band) {
      res.status(200).json(band);
    } else {
      res.status(404).json({ message: "Band not found" });
    }
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Error fetching band", error: err.message });
  }
};

export const createBand: RequestHandler = async (req, res) => {
  try {
    const newBand = await bandService.createBand(req.body);
    res.status(201).json(newBand);
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Error creating band", error: err.message });
  }
};

export const updateBand: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBand = await bandService.updateBand(id, req.body);
    res.status(200).json(updatedBand);
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Error updating band", error: err.message });
  }
};

export const deleteBand: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await bandService.deleteBand(id);
    res.status(204).send();
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Error deleting band", error: err.message });
  }
};
