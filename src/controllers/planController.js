import {
  getAllPlans,
  getPlanById,
  createPlan,
  updatePlan,
  deletePlan,
} from '../services/planService.js';

export async function getAllPlansHandler(req, res) {
  const plans = await getAllPlans(req.user.id);
  res.status(200).json(plans);
}

export async function getPlanByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  const plan = await getPlanById(id, req.user.id);
  res.status(200).json(plan);
}

export async function createPlanHandler(req, res) {
  const newPlan = await createPlan(req.body, req.user.id);
  res.status(201).json(newPlan);
}

export async function updatePlanHandler(req, res) {
  const id = parseInt(req.params.id);
  const updatedPlan = await updatePlan(id, req.body, req.user.id);
  res.status(200).json(updatedPlan);
}

export async function deletePlanHandler(req, res) {
  const id = parseInt(req.params.id);
  const deletedPlan = await deletePlan(id, req.user.id);
  res.status(200).json(deletedPlan);
}