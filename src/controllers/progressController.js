import {
  getAllProgressEntries,
  getProgressEntryById,
  createProgressEntry,
  updateProgressEntry,
  deleteProgressEntry,
} from '../services/progressService.js';

export async function getAllProgressEntriesHandler(req, res) {
  const progressEntries = await getAllProgressEntries(req.user.id);
  res.status(200).json(progressEntries);
}

export async function getProgressEntryByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  const progressEntry = await getProgressEntryById(id, req.user.id);
  res.status(200).json(progressEntry);
}

export async function createProgressEntryHandler(req, res) {
  const newProgressEntry = await createProgressEntry(req.body, req.user.id);
  res.status(201).json(newProgressEntry);
}

export async function updateProgressEntryHandler(req, res) {
  const id = parseInt(req.params.id);
  const updatedProgressEntry = await updateProgressEntry(id, req.body, req.user.id);
  res.status(200).json(updatedProgressEntry);
}

export async function deleteProgressEntryHandler(req, res) {
  const id = parseInt(req.params.id);
  const deletedProgressEntry = await deleteProgressEntry(id, req.user.id);
  res.status(200).json(deletedProgressEntry);
}